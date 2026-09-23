import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { rateLimit } from "@/lib/rate-limit";
import { troop } from "@/data/troop";
import { isConfigured, sendMail } from "@/lib/email";
import { contactAcknowledgement, contactNotification } from "@/lib/email/templates";

/**
 * The contact form actually sends.
 *
 * It used to hand off to `mailto:`, which opens whatever mail client the
 * visitor happens to have configured, and on a school Chromebook or a phone
 * without a mail app that is a dead end. This posts the message instead.
 *
 * Three gates before anything is sent, because the address is public:
 *
 *   1. a honeypot field no human fills in,
 *   2. reCAPTCHA v3, when RECAPTCHA_SECRET_KEY is set,
 *   3. a per-IP rate limit.
 *
 * Two messages go out per submission: the enquiry to the troop, and an
 * acknowledgement to whoever sent it. See `src/lib/email` for the providers.
 *
 * With no provider configured the route answers 501 and the form falls back to
 * opening the visitor's mail client, so the page still works on a fresh clone
 * with no keys.
 */

const PER_HOUR = 5;
const PER_DAY = 20;
const MAX_MESSAGE = 4000;
const MAX_FIELD = 200;

/** Below this, reCAPTCHA thinks it is a bot. Google's own suggested default. */
const SCORE_THRESHOLD = 0.5;

async function clientKey(): Promise<string> {
  const h = await headers();
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown"
  );
}

async function passesRecaptcha(token: string | undefined): Promise<{ ok: boolean; why?: string }> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return { ok: true }; // not configured, the other two gates still apply
  if (!token) return { ok: false, why: "missing_token" };

  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
      cache: "no-store",
    });
    const data = (await res.json()) as { success?: boolean; score?: number };
    if (!data.success) return { ok: false, why: "rejected" };
    if (typeof data.score === "number" && data.score < SCORE_THRESHOLD) {
      return { ok: false, why: "low_score" };
    }
    return { ok: true };
  } catch {
    // If Google is unreachable, do not lock a real family out of the form.
    return { ok: true };
  }
}

type Body = {
  name?: string;
  email?: string;
  scoutAge?: string;
  topic?: string;
  message?: string;
  token?: string;
  /** Hidden field. A browser leaves it empty; a bot fills everything in. */
  website?: string;
};

/**
 * A header is one line by definition. Anything that looks like a second line is
 * someone trying to add their own headers to the message we build, so the
 * newline goes rather than the whole submission.
 */
function oneLine(value: string, limit = MAX_FIELD): string {
  return value.replace(/[\r\n]+/g, " ").trim().slice(0, limit);
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as Body;

  // 1. honeypot. Answer 200 so a bot cannot tell it was caught.
  if (body.website) return NextResponse.json({ ok: true });

  const name = oneLine(body.name ?? "");
  const email = oneLine(body.email ?? "");
  const scoutAge = oneLine(body.scoutAge ?? "", 80);
  const topic = oneLine(body.topic ?? "General") || "General";
  const message = (body.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Please fill in your name, email and message." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "That email address does not look right." }, { status: 400 });
  }
  if (message.length > MAX_MESSAGE) {
    return NextResponse.json({ error: "That message is too long." }, { status: 400 });
  }

  // 2. reCAPTCHA
  const captcha = await passesRecaptcha(body.token);
  if (!captcha.ok) {
    return NextResponse.json(
      { error: "We could not verify that you are a person. Please reload the page and try again." },
      { status: 400 },
    );
  }

  // 3. rate limit
  const ip = await clientKey();
  const hourly = rateLimit(`contact:hour:${ip}`, PER_HOUR, 60 * 60_000);
  if (!hourly.ok) {
    return NextResponse.json(
      { error: "That is a lot of messages. Please try again a little later." },
      { status: 429, headers: { "Retry-After": String(hourly.retryAfterSeconds) } },
    );
  }
  const daily = rateLimit(`contact:day:${ip}`, PER_DAY, 24 * 60 * 60_000);
  if (!daily.ok) {
    return NextResponse.json(
      { error: "That is a lot of messages. Please try again tomorrow." },
      { status: 429, headers: { "Retry-After": String(daily.retryAfterSeconds) } },
    );
  }

  if (!isConfigured()) {
    // The form knows what to do with this: open the visitor's mail client.
    return NextResponse.json({ error: "not_configured" }, { status: 501 });
  }

  const enquiry = { name, email, scoutAge: scoutAge || undefined, topic, message };

  // The one that matters. Reply-To is the visitor, so hitting reply in Gmail
  // answers the family rather than the website.
  const notification = contactNotification(enquiry);
  const sent = await sendMail({
    to: troop.contact.email,
    replyTo: email,
    subject: notification.subject,
    text: notification.text,
    html: notification.html,
  });

  if (!sent.ok) {
    if (sent.reason === "not_configured") {
      return NextResponse.json({ error: "not_configured" }, { status: 501 });
    }
    console.error("[contact] send failed:", sent.detail);
    return NextResponse.json(
      { error: "The message did not send. Please email us directly." },
      { status: 502 },
    );
  }

  // The acknowledgement is a courtesy. If it fails the troop still has the
  // enquiry, so log it and tell the visitor their message went through.
  const ack = contactAcknowledgement(enquiry);
  const acked = await sendMail({
    to: email,
    replyTo: troop.contact.email,
    subject: ack.subject,
    text: ack.text,
    html: ack.html,
  });
  if (!acked.ok) console.error("[contact] acknowledgement failed:", acked);

  return NextResponse.json({ ok: true, acknowledged: acked.ok });
}
