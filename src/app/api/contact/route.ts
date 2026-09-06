import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { rateLimit } from "@/lib/rate-limit";
import { troop } from "@/data/troop";

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
 * Sending needs RESEND_API_KEY. Without it the route answers 501 and the form
 * falls back to opening the visitor's mail client, so the page still works on
 * a fresh clone with no keys.
 */

const PER_HOUR = 5;
const PER_DAY = 20;
const MAX_MESSAGE = 4000;

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

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as Body;

  // 1. honeypot. Answer 200 so a bot cannot tell it was caught.
  if (body.website) return NextResponse.json({ ok: true });

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();
  const topic = (body.topic ?? "General").trim();

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

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // The form knows what to do with this: open the visitor's mail client.
    return NextResponse.json({ error: "not_configured" }, { status: 501 });
  }

  const from = process.env.CONTACT_FROM ?? "Troop 394 website <onboarding@resend.dev>";
  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    body.scoutAge ? `Scout's age or grade: ${body.scoutAge.trim()}` : null,
    `Topic: ${topic}`,
    "",
    message,
  ].filter(Boolean);

  const send = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [troop.contact.email],
      reply_to: email,
      subject: `[${troop.name} website] ${topic}, from ${name}`,
      text: lines.join("\n"),
    }),
    cache: "no-store",
  });

  if (!send.ok) {
    return NextResponse.json(
      { error: "The message did not send. Please email us directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
