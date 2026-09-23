import "server-only";

import { troop } from "@/data/troop";

/**
 * ============================================================================
 * EMAIL TEMPLATES
 * ============================================================================
 * Tables and inline styles, deliberately. Gmail strips <style> blocks, Outlook
 * renders with Word, and neither supports flexbox, grid or SVG. This is the
 * ugly-looking HTML that actually arrives looking right.
 *
 * The patch is a PNG at an absolute URL for the same reason: the site's mark is
 * an inline SVG, and every major client would drop it.
 */

const NAVY = "#003f87";
const NAVY_DEEP = "#002a5c";
const GOLD = "#e1c04c";
const INK = "#212121";
const MUTE = "#5c6166";
const HAIR = "#e3e6ea";

/** Escapes text before it goes anywhere near an HTML attribute or body. */
function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Keeps a visitor's line breaks without letting their markup through. */
function paragraphs(value: string): string {
  return esc(value)
    .split(/\n{2,}/)
    .map(
      (block) =>
        `<p style="margin:0 0 14px;line-height:1.6;color:${INK};font-size:15px;">${block.replace(
          /\n/g,
          "<br />",
        )}</p>`,
    )
    .join("");
}

export function siteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://troop394santaclara.org";
  return raw.replace(/\/+$/, "");
}

/**
 * Header, footer and the bits every message shares.
 *
 * `preheader` is the grey line of text a mail client shows next to the subject
 * in the inbox list. Left unset, clients scrape the first thing they find,
 * which is usually the alt text of the logo.
 */
function layout({
  title,
  preheader,
  body,
}: {
  title: string;
  preheader: string;
  body: string;
}): string {
  const url = siteUrl();
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="color-scheme" content="light only" />
<title>${esc(title)}</title>
</head>
<body style="margin:0;padding:0;background:#f2f4f6;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f2f4f6;">
<tr><td align="center" style="padding:28px 14px;">

<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:100%;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 1px 3px rgba(16,24,40,.09);">

  <tr>
    <td style="background:${NAVY};padding:22px 28px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr>
          <td width="86" valign="middle" style="padding-right:14px;">
            <img src="${url}/images/brand/troop-patch-email.png" width="76" alt="${esc(troop.name)} neckerchief patch" style="display:block;width:76px;height:auto;border:0;" />
          </td>
          <td valign="middle">
            <div style="font-family:Georgia,'Roboto Slab',serif;font-size:21px;font-weight:700;color:#ffffff;line-height:1.2;">${esc(troop.longName)}</div>
            <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:rgba(255,255,255,.76);padding-top:5px;">${esc(troop.city)}, ${esc(troop.state)} &middot; Est. ${troop.founded}</div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr><td style="height:4px;background:${GOLD};font-size:0;line-height:0;">&nbsp;</td></tr>

  <tr>
    <td style="padding:30px 28px 26px;font-family:Arial,Helvetica,sans-serif;">
      ${body}
    </td>
  </tr>

  <tr>
    <td style="border-top:1px solid ${HAIR};padding:20px 28px 26px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:${MUTE};">
      <div style="font-weight:700;color:${INK};padding-bottom:4px;">${esc(troop.longName)}</div>
      <div>${esc(troop.meeting.venue)} &middot; ${esc(troop.city)}, ${esc(troop.stateAbbr)}</div>
      <div>${esc(troop.district.name)}, ${esc(troop.council.name)}</div>
      <div style="padding-top:10px;">
        <a href="${url}" style="color:${NAVY};text-decoration:underline;">${esc(url.replace(/^https?:\/\//, ""))}</a>
        &nbsp;&middot;&nbsp;
        <a href="mailto:${esc(troop.contact.email)}" style="color:${NAVY};text-decoration:underline;">${esc(troop.contact.email)}</a>
      </div>
    </td>
  </tr>
</table>

<div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#8a9099;padding-top:16px;">Sent by the ${esc(troop.name)} website.</div>

</td></tr>
</table>
</body>
</html>`;
}

/* -------------------------------------------------------------------------
   1. What the troop receives
   ---------------------------------------------------------------------- */

export type ContactMessage = {
  name: string;
  email: string;
  scoutAge?: string;
  topic: string;
  message: string;
};

export function contactNotification(m: ContactMessage): { subject: string; text: string; html: string } {
  const subject = `[${troop.name} website] ${m.topic}, from ${m.name}`;

  const text = [
    `New message from the ${troop.name} website.`,
    "",
    `Name:    ${m.name}`,
    `Email:   ${m.email}`,
    m.scoutAge ? `Scout:   ${m.scoutAge}` : null,
    `Topic:   ${m.topic}`,
    "",
    m.message,
    "",
    "—",
    `Reply straight to this email and it goes to ${m.name}.`,
  ]
    .filter((line) => line !== null)
    .join("\n");

  const row = (label: string, value: string, link?: string) => `
    <tr>
      <td style="padding:7px 14px 7px 0;font-size:12px;letter-spacing:.6px;text-transform:uppercase;color:${MUTE};white-space:nowrap;vertical-align:top;">${esc(label)}</td>
      <td style="padding:7px 0;font-size:15px;color:${INK};vertical-align:top;">${
        link ? `<a href="${esc(link)}" style="color:${NAVY};">${esc(value)}</a>` : esc(value)
      }</td>
    </tr>`;

  const html = layout({
    title: subject,
    preheader: `${m.name} wrote about ${m.topic}.`,
    body: `
      <div style="font-size:12px;letter-spacing:1.4px;text-transform:uppercase;color:${MUTE};padding-bottom:6px;">New enquiry</div>
      <h1 style="margin:0 0 18px;font-family:Georgia,'Roboto Slab',serif;font-size:23px;line-height:1.25;color:${NAVY_DEEP};">${esc(m.topic)}</h1>

      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;margin-bottom:20px;">
        ${row("From", m.name)}
        ${row("Email", m.email, `mailto:${m.email}`)}
        ${m.scoutAge ? row("Scout", m.scoutAge) : ""}
      </table>

      <div style="border-left:3px solid ${GOLD};padding:2px 0 2px 16px;margin-bottom:22px;">
        ${paragraphs(m.message)}
      </div>

      <table role="presentation" cellpadding="0" cellspacing="0" border="0">
        <tr><td style="background:${NAVY};border-radius:6px;">
          <a href="mailto:${esc(m.email)}?subject=${encodeURIComponent(`Re: ${m.topic}`)}"
             style="display:inline-block;padding:12px 22px;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;">Reply to ${esc(m.name)}</a>
        </td></tr>
      </table>

      <p style="margin:18px 0 0;font-size:13px;color:${MUTE};line-height:1.6;">Replying to this email also works &mdash; it is addressed back to ${esc(m.email)}.</p>
    `,
  });

  return { subject, text, html };
}

/* -------------------------------------------------------------------------
   2. What the visitor receives
   ---------------------------------------------------------------------- */

/**
 * An acknowledgement, not a newsletter. A family who writes in on a Saturday
 * should not spend the weekend wondering whether the form worked, and the
 * meeting details are the thing they most likely wanted anyway.
 */
export function contactAcknowledgement(m: ContactMessage): { subject: string; text: string; html: string } {
  const subject = `We got your message — ${troop.longName}`;
  const url = siteUrl();

  const text = [
    `Hi ${m.name},`,
    "",
    `Thanks for writing to ${troop.longName}. A volunteer reads every message and`,
    "will get back to you, usually within a few days.",
    "",
    "You are welcome at a meeting before deciding anything:",
    `  ${troop.meeting.day}s, ${troop.meeting.time}`,
    `  ${troop.meeting.venue}, ${troop.meeting.address}`,
    "",
    "For your records, this is what you sent:",
    "",
    m.message,
    "",
    "—",
    `${troop.longName} · ${url}`,
    "This address is not monitored for replies; write to us at",
    `${troop.contact.email} instead.`,
  ].join("\n");

  const html = layout({
    title: subject,
    preheader: `Thanks for writing. A volunteer will reply, usually within a few days.`,
    body: `
      <h1 style="margin:0 0 14px;font-family:Georgia,'Roboto Slab',serif;font-size:24px;line-height:1.25;color:${NAVY_DEEP};">Thanks, ${esc(m.name)} &mdash; we got it.</h1>

      <p style="margin:0 0 14px;font-size:15px;line-height:1.65;color:${INK};">
        A volunteer reads every message that comes through the website and will get back to you, usually within a few days. We are all parents and Scouts here, so it is occasionally slower in a camping week.
      </p>

      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f6f8fa;border:1px solid ${HAIR};border-radius:8px;margin:20px 0;">
        <tr><td style="padding:18px 20px;">
          <div style="font-size:12px;letter-spacing:1.3px;text-transform:uppercase;color:${MUTE};padding-bottom:8px;">You are welcome to visit first</div>
          <div style="font-size:16px;font-weight:700;color:${INK};line-height:1.5;">${esc(troop.meeting.day)}s, ${esc(troop.meeting.time)}</div>
          <div style="font-size:14px;color:${INK};line-height:1.6;padding-top:2px;">${esc(troop.meeting.venue)}<br />${esc(troop.meeting.address)}</div>
          <div style="font-size:13px;color:${MUTE};line-height:1.6;padding-top:8px;">No need to book, and nothing to buy. Come and watch.</div>
        </td></tr>
      </table>

      <table role="presentation" cellpadding="0" cellspacing="0" border="0">
        <tr><td style="background:${NAVY};border-radius:6px;">
          <a href="${url}/join" style="display:inline-block;padding:12px 22px;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;">How joining works</a>
        </td></tr>
      </table>

      <div style="border-top:1px solid ${HAIR};margin:26px 0 0;padding-top:18px;">
        <div style="font-size:12px;letter-spacing:1.3px;text-transform:uppercase;color:${MUTE};padding-bottom:8px;">What you sent</div>
        <div style="font-size:13px;color:${MUTE};padding-bottom:6px;">Topic: ${esc(m.topic)}</div>
        <div style="border-left:3px solid ${HAIR};padding-left:14px;color:${MUTE};">
          ${paragraphs(m.message).replace(new RegExp(`color:${INK}`, "g"), `color:${MUTE}`)}
        </div>
      </div>
    `,
  });

  return { subject, text, html };
}
