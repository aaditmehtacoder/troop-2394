import "server-only";

import nodemailer, { type Transporter } from "nodemailer";
import { troop } from "@/data/troop";

/**
 * ============================================================================
 * OUTBOUND MAIL
 * ============================================================================
 * One send function, two possible providers, and a site that still works when
 * neither is configured.
 *
 *   1. GMAIL   the troop's own troop394sc@gmail.com over SMTP, authenticated
 *              with a Google app password. Nothing to sign up for, nothing to
 *              pay for, and the sent mail lands in the troop's own Sent folder
 *              where the next committee can read it. This is the default.
 *   2. RESEND  an API key, for if the troop ever moves to its own domain and
 *              wants the deliverability of a real sending service.
 *   3. NONE    the contact form falls back to opening the visitor's own mail
 *              client, which is what it did before any of this existed.
 *
 * `server-only` at the top is load-bearing: it makes the build fail rather
 * than let this module, and the app password inside it, reach the browser.
 */

export type Provider = "gmail" | "resend" | "none";

export type Mail = {
  to: string | string[];
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
};

export type SendResult =
  | { ok: true; provider: Exclude<Provider, "none"> }
  | { ok: false; reason: "not_configured" }
  | { ok: false; reason: "send_failed"; detail: string };

/**
 * Google prints app passwords in four spaced groups ("abcd efgh ijkl mnop").
 * Pasted as shown, SMTP auth fails with a 535 that says nothing useful, so
 * strip whitespace rather than make someone lose an evening to it.
 */
function appPassword(): string {
  return (process.env.GMAIL_APP_PASSWORD ?? "").replace(/\s+/g, "");
}

function gmailUser(): string {
  return (process.env.GMAIL_USER ?? "").trim();
}

export function provider(): Provider {
  if (gmailUser() && appPassword()) return "gmail";
  if (process.env.RESEND_API_KEY) return "resend";
  return "none";
}

export function isConfigured(): boolean {
  return provider() !== "none";
}

/**
 * The address mail is sent *from*.
 *
 * Gmail will not let you forge this: whatever we pass, Google rewrites the
 * envelope to the authenticated account. So we name the account explicitly and
 * only dress up the display name, which Gmail does honour.
 */
function fromHeader(): string {
  const explicit = process.env.CONTACT_FROM?.trim();
  if (explicit) return explicit;
  const p = provider();
  if (p === "gmail") return `${troop.name} website <${gmailUser()}>`;
  return `${troop.name} website <onboarding@resend.dev>`;
}

/* -------------------------------------------------------------------------
   Gmail over SMTP
   ---------------------------------------------------------------------- */

/**
 * Held at module scope so a warm serverless instance reuses the connection
 * instead of paying for a TLS handshake and an AUTH round trip on every
 * message. `pool` keeps one socket alive; more than one would be pointless at
 * the handful of messages a week this form sees.
 */
let transporter: Transporter | null = null;

function gmailTransport(): Transporter {
  if (transporter) return transporter;
  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // implicit TLS. Port 587 + STARTTLS also works if 465 is blocked.
    auth: { user: gmailUser(), pass: appPassword() },
    pool: true,
    maxConnections: 1,
    maxMessages: 50,
    // A stuck socket must not hold a serverless function open to its timeout.
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });
  return transporter;
}

async function sendViaGmail(mail: Mail): Promise<SendResult> {
  try {
    await gmailTransport().sendMail({
      from: fromHeader(),
      to: mail.to,
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
      replyTo: mail.replyTo,
    });
    return { ok: true, provider: "gmail" };
  } catch (err) {
    // Reset the pool: a failure here is usually a dead socket or a rejected
    // password, and both want a fresh transport next time.
    transporter = null;
    return { ok: false, reason: "send_failed", detail: describe(err) };
  }
}

/* -------------------------------------------------------------------------
   Resend
   ---------------------------------------------------------------------- */

async function sendViaResend(mail: Mail): Promise<SendResult> {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromHeader(),
        to: Array.isArray(mail.to) ? mail.to : [mail.to],
        reply_to: mail.replyTo,
        subject: mail.subject,
        text: mail.text,
        html: mail.html,
      }),
      cache: "no-store",
    });
    if (!res.ok) {
      return { ok: false, reason: "send_failed", detail: `resend ${res.status}` };
    }
    return { ok: true, provider: "resend" };
  } catch (err) {
    return { ok: false, reason: "send_failed", detail: describe(err) };
  }
}

function describe(err: unknown): string {
  if (err && typeof err === "object" && "message" in err) {
    return String((err as { message: unknown }).message);
  }
  return String(err);
}

/* -------------------------------------------------------------------------
   The one entry point
   ---------------------------------------------------------------------- */

export async function sendMail(mail: Mail): Promise<SendResult> {
  switch (provider()) {
    case "gmail":
      return sendViaGmail(mail);
    case "resend":
      return sendViaResend(mail);
    default:
      return { ok: false, reason: "not_configured" };
  }
}

/**
 * Proves the credentials work without sending anything, for the setup check in
 * `npm run check:email`. Gmail answers an SMTP NOOP, so a pass here means the
 * app password is good.
 */
export async function verifyTransport(): Promise<
  { ok: true; provider: Provider } | { ok: false; detail: string }
> {
  const p = provider();
  if (p === "none") return { ok: false, detail: "No mail provider configured." };
  if (p === "resend") return { ok: true, provider: p }; // nothing to handshake with
  try {
    await gmailTransport().verify();
    return { ok: true, provider: p };
  } catch (err) {
    transporter = null;
    return { ok: false, detail: describe(err) };
  }
}
