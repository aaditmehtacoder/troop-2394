"use client";

import { useState } from "react";

/**
 * Ways to reach an address when clicking a `mailto:` link does nothing.
 *
 * A mailto link hands the message to whatever mail program the computer has
 * set as its default. Plenty of people read Gmail in a browser and have no such
 * program, and on their machine the link silently does nothing. The site cannot
 * fix that, so it offers two ways round it: copy the address, or open Gmail's
 * own compose window with the address filled in.
 */
export function gmailComposeUrl(to: string, subject?: string, body?: string): string {
  const q = new URLSearchParams({ view: "cm", fs: "1", to });
  if (subject) q.set("su", subject);
  if (body) q.set("body", body);
  return `https://mail.google.com/mail/?${q.toString()}`;
}

export function EmailActions({
  email,
  subject,
  className = "",
}: {
  email: string;
  subject?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState<"idle" | "done" | "failed">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied("done");
    } catch {
      setCopied("failed");
    }
    setTimeout(() => setCopied("idle"), 2500);
  }

  const action =
    "inline-flex min-h-[32px] items-center rounded text-[13px] text-blue underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue/40";

  return (
    <span className={`flex flex-wrap items-center gap-x-3 ${className}`}>
      <button type="button" onClick={copy} className={action}>
        Copy address
      </button>
      <span aria-hidden className="text-mute/60">
        ·
      </span>
      <a href={gmailComposeUrl(email, subject)} target="_blank" rel="noopener noreferrer" className={action}>
        Write in Gmail
      </a>
      <span role="status" aria-live="polite" className="text-[13px] text-forest">
        {copied === "done" ? "Copied" : copied === "failed" ? "Select the address above to copy it" : ""}
      </span>
    </span>
  );
}
