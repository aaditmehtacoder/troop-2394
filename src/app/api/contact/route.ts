import { rateLimit } from "@/lib/rate-limit";
import { troop } from "@/data/troop";
import { contactTopics } from "@/data/contact";
import { isConfigured, sendMail } from "@/lib/email";
import { contactAcknowledgement, contactNotification } from "@/lib/email/templates";

/**
 * The contact form actually sends.
 *
 * It used to hand off to `mailto:` whenever the server had no mail key, and
 * then tell the visitor their message was "on its way" whether or not their
 * computer had a mail program to open. Nothing was sent. Now the answer is
 * either "the provider accepted it" or an honest error.
 *
 * Where it goes: CONTACT_TO, a comma-separated list kept on the server so the
 * recipients never reach the browser. Unset, it is the troop's own address.
 *
 * Gates before anything is sent, because the address is public:
 *
 *   1. a size cap on the request body,
 *   2. a honeypot field no human fills in,
 *   3. reCAPTCHA v3, when RECAPTCHA_SECRET_KEY is set,
 *   4. a per-IP rate limit. The one here is per serverless instance, so it is
 *      only a backstop; the real limit is a Vercel Firewall rule on this path,
 *      counted at the edge for every instance at once.
 *
 * Two messages go out per submission: the enquiry, and a fixed-text
 * acknowledgement to whoever sent it. See `src/lib/email` for the providers.
 */

/** Gmail can take a while to say yes; give it room inside the function. */
export const maxDuration = 60;

const PER_HOUR = 5;
const PER_DAY = 20;
const MAX_BODY_BYTES = 16 * 1024;
const MAX_MESSAGE = 4000;
const MAX_NAME = 120;
const MAX_EMAIL = 254;
const MAX_AGE = 80;

/** Deliberately plain: one @, a dot after it, nothing that could close a header. */
const EMAIL = /^[^\s@<>()",;:\\[\]]+@[^\s@<>()",;:\\[\]]+\.[^\s@<>()",;:\\[\]]+$/;

/** Below this, reCAPTCHA thinks it is a bot. Google's own suggested default. */
const SCORE_THRESHOLD = 0.5;

/** The troop address is shown with every failure, so a family always has a way through. */
const fallback = `Please email ${troop.contact.email} instead.`;

function reply(status: number, body: Record<string, unknown>, headers?: HeadersInit) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

function clientKey(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

/** Where enquiries go. Server-only on purpose: no NEXT_PUBLIC_ prefix. */
function recipients(): string[] {
  const list = (process.env.CONTACT_TO ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter((s) => EMAIL.test(s));
  return list.length ? list : [troop.contact.email];
}

async function passesRecaptcha(token: string | undefined): Promise<{ ok: boolean; why?: string }> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return { ok: true }; // not configured, the other gates still apply
  if (!token) return { ok: false, why: "missing_token" };

  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
      cache: "no-store",
      signal: AbortSignal.timeout(5_000),
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
  name?: unknown;
  email?: unknown;
  scoutAge?: unknown;
  topic?: unknown;
  message?: unknown;
  token?: unknown;
  /** Hidden field. A browser leaves it empty; a bot fills everything in. */
  website?: unknown;
};

/**
 * Control characters, CR and LF above all, have no business in a name or an
 * address. In a header they would start a new line, which is how someone adds
 * their own headers to a message, so they are refused rather than tidied.
 */
const CONTROL = /[\u0000-\u001f\u007f]/;

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/** Reads at most MAX_BODY_BYTES, whatever Content-Length claims. */
async function readBody(request: Request): Promise<Body | "too_large" | "bad"> {
  const declared = Number(request.headers.get("content-length") ?? 0);
  if (declared > MAX_BODY_BYTES) return "too_large";
  const raw = await request.text().catch(() => null);
  if (raw === null) return "bad";
  if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) return "too_large";
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? (parsed as Body) : "bad";
  } catch {
    return "bad";
  }
}

export async function POST(request: Request) {
  const requestId = crypto.randomUUID();

  const body = await readBody(request);
  if (body === "too_large") return reply(413, { error: "That message is too long.", requestId });
  if (body === "bad") return reply(400, { error: "Something went wrong reading the form. Please try again.", requestId });

  // 1. honeypot. Answer like a success so a bot cannot tell it was caught.
  if (text(body.website)) return reply(200, { ok: true, requestId });

  const name = text(body.name);
  const email = text(body.email);
  const scoutAge = text(body.scoutAge);
  const message = text(body.message);
  const topic = contactTopics.find((t) => t === text(body.topic)) ?? "Something else";

  if (!name || !email || !message) {
    return reply(400, { error: "Please fill in your name, email and message.", requestId });
  }
  if ([name, email, scoutAge].some((v) => CONTROL.test(v))) {
    return reply(400, { error: "Please keep your name, email and age on one line each.", requestId });
  }
  if (name.length > MAX_NAME || scoutAge.length > MAX_AGE) {
    return reply(400, { error: "One of the fields is too long.", requestId });
  }
  if (email.length > MAX_EMAIL || !EMAIL.test(email)) {
    return reply(400, { error: "That email address does not look right.", requestId });
  }
  if (message.length > MAX_MESSAGE) {
    return reply(400, { error: `Please keep the message under ${MAX_MESSAGE} characters.`, requestId });
  }

  // 2. reCAPTCHA
  const captcha = await passesRecaptcha(typeof body.token === "string" ? body.token : undefined);
  if (!captcha.ok) {
    return reply(400, {
      error: "We could not verify that you are a person. Please reload the page and try again.",
      requestId,
    });
  }

  // 3. rate limit (backstop; see above)
  const ip = clientKey(request);
  for (const [key, limit, windowMs, when] of [
    [`contact:hour:${ip}`, PER_HOUR, 60 * 60_000, "a little later"],
    [`contact:day:${ip}`, PER_DAY, 24 * 60 * 60_000, "tomorrow"],
  ] as const) {
    const verdict = rateLimit(key, limit, windowMs);
    if (!verdict.ok) {
      return reply(
        429,
        { error: `That is a lot of messages. Please try again ${when}.`, requestId },
        { "Retry-After": String(verdict.retryAfterSeconds) },
      );
    }
  }

  if (!isConfigured()) {
    console.error(`[contact] ${requestId} no mail provider configured`);
    return reply(503, {
      error: `The online form is not connected to email right now, so your message was not sent. ${fallback}`,
      code: "not_configured",
      requestId,
    });
  }

  const enquiry = { name, email, scoutAge: scoutAge || undefined, topic, message };

  // The one that matters. Reply-To is the visitor, so hitting reply in Gmail
  // answers the family rather than the website. From stays the sending account.
  const notification = contactNotification(enquiry);
  const sent = await sendMail({
    to: recipients(),
    replyTo: email,
    subject: notification.subject,
    text: notification.text,
    html: notification.html,
  });

  if (!sent.ok) {
    if (sent.reason === "not_configured") {
      return reply(503, {
        error: `The online form is not connected to email right now, so your message was not sent. ${fallback}`,
        code: "not_configured",
        requestId,
      });
    }
    console.error(`[contact] ${requestId} ${sent.reason}: ${sent.detail}`);
    if (sent.reason === "timeout") {
      // It may have gone. Say so, rather than invite a duplicate.
      return reply(504, {
        error: `We could not confirm your message was sent. Before sending it again, ${fallback.toLowerCase()}`,
        code: "uncertain",
        requestId,
      });
    }
    return reply(502, { error: `Your message did not send. ${fallback}`, code: "send_failed", requestId });
  }

  console.info(`[contact] ${requestId} accepted by ${sent.provider} as ${sent.messageId}`);

  // The acknowledgement is a courtesy. If it fails the troop still has the
  // enquiry, so log it and report the enquiry as submitted.
  const ack = contactAcknowledgement(enquiry);
  const acked = await sendMail({
    to: email,
    replyTo: troop.contact.email,
    subject: ack.subject,
    text: ack.text,
    html: ack.html,
  });
  if (acked.ok) {
    console.info(`[contact] ${requestId} acknowledgement accepted as ${acked.messageId}`);
  } else {
    console.error(`[contact] ${requestId} acknowledgement ${acked.reason}`);
  }

  return reply(200, { ok: true, acknowledged: acked.ok, requestId });
}
