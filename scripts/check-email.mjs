#!/usr/bin/env node
/**
 * Proves the mail setup before you trust it to a real family's enquiry.
 *
 *   npm run check:email                 # verify the credentials only
 *   npm run check:email -- you@example.com   # ...and send a real test message
 *
 * Reads .env.local the same way `next dev` does, so there is nothing to export
 * by hand.
 */

import { loadEnvConfig } from "@next/env";
import nodemailer from "nodemailer";

loadEnvConfig(process.cwd());

const user = (process.env.GMAIL_USER ?? "").trim();
const pass = (process.env.GMAIL_APP_PASSWORD ?? "").replace(/\s+/g, "");
const resend = process.env.RESEND_API_KEY;
const to = process.argv[2];

function die(message) {
  console.error(`\n  ✗ ${message}\n`);
  process.exit(1);
}

if (!user && !pass && resend) {
  console.log("\n  Provider: Resend (RESEND_API_KEY is set, no Gmail credentials).");
  console.log("  Nothing to handshake with — the key is checked when a message is sent.\n");
  process.exit(0);
}

if (!user || !pass) {
  die(
    "No mail provider configured.\n" +
      "    Set GMAIL_USER and GMAIL_APP_PASSWORD in .env.local.\n" +
      "    The app password comes from https://myaccount.google.com/apppasswords\n" +
      "    (2-Step Verification has to be on for that page to exist).",
  );
}

if (pass.length !== 16) {
  console.warn(
    `\n  ! GMAIL_APP_PASSWORD is ${pass.length} characters once spaces are stripped.` +
      "\n    Google's app passwords are 16. Check you pasted the password and not the account one.",
  );
}

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: { user, pass },
  connectionTimeout: 10_000,
});

console.log(`\n  Provider: Gmail SMTP as ${user}`);

try {
  await transport.verify();
  console.log("  ✓ Credentials accepted by smtp.gmail.com");
} catch (err) {
  const msg = String(err?.message ?? err);
  if (/535|BadCredentials|Username and Password not accepted/i.test(msg)) {
    die(
      `Google rejected the credentials.\n    ${msg}\n\n` +
        "    Usually one of:\n" +
        "      · the app password was revoked or mistyped\n" +
        "      · GMAIL_USER is not the account the password belongs to\n" +
        "      · 2-Step Verification was turned off, which voids app passwords",
    );
  }
  die(`Could not reach Gmail.\n    ${msg}`);
}

if (!to) {
  console.log("  → Pass an address to send a real test: npm run check:email -- you@example.com\n");
  process.exit(0);
}

try {
  const info = await transport.sendMail({
    from: `Troop 394 website <${user}>`,
    to,
    subject: "Troop 394 website — mail test",
    text: "If you are reading this, the website can send email. Nothing else to do.",
  });
  console.log(`  ✓ Test message sent to ${to} (${info.messageId})\n`);
} catch (err) {
  die(`Verified, but sending failed.\n    ${String(err?.message ?? err)}`);
} finally {
  transport.close();
}
