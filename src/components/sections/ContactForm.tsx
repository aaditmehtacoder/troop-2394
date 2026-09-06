"use client";

import { useEffect, useState } from "react";
import { IconCheck } from "@/components/brand/Marks";
import { troop } from "@/data/troop";

type Status = "idle" | "sending" | "sent" | "error";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
  }
}

/**
 * The form posts to /api/contact, which checks reCAPTCHA and a rate limit and
 * then emails the troop.
 *
 * If the server has no mail key yet it answers 501, and we fall back to the old
 * behaviour of opening the visitor's own mail client. Either way the message
 * gets somewhere, which is the only thing the person filling it in cares about.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    scoutAge: "",
    topic: "Joining the troop",
    message: "",
  });
  /** Honeypot. Real people never see it, so they never fill it in. */
  const [website, setWebsite] = useState("");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  // reCAPTCHA v3 is invisible: load it only when a key is configured.
  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY || document.getElementById("recaptcha-v3")) return;
    const el = document.createElement("script");
    el.id = "recaptcha-v3";
    el.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    el.async = true;
    document.head.appendChild(el);
  }, []);

  async function captchaToken(): Promise<string | undefined> {
    if (!RECAPTCHA_SITE_KEY || !window.grecaptcha) return undefined;
    return new Promise((resolve) => {
      window.grecaptcha!.ready(() => {
        window
          .grecaptcha!.execute(RECAPTCHA_SITE_KEY!, { action: "contact" })
          .then(resolve)
          .catch(() => resolve(undefined));
      });
    });
  }

  /** What we did before there was a server: hand the message to their mail app. */
  function openMailClient() {
    const subject = `[${troop.name} website] ${form.topic}, ${form.name}`;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.scoutAge ? `Scout's age / grade: ${form.scoutAge}` : null,
      `Topic: ${form.topic}`,
      "",
      form.message,
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:${troop.contact.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setStatus("sent");
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website, token: await captchaToken() }),
      });

      if (res.ok) return setStatus("sent");

      // No mail key on the server yet: fall back rather than fail.
      if (res.status === 501) return openMailClient();

      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setError(data.error ?? "The message did not send. Please email us directly.");
      setStatus("error");
    } catch {
      openMailClient();
    }
  };

  const field =
    "w-full rounded-lg border border-hair bg-white px-4 py-3 text-[15px] text-ink transition placeholder:text-mute/70 focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/25";
  const label = "mb-1.5 block font-slab text-[12px] font-bold uppercase tracking-[1.2px] text-navy";

  return (
    <form onSubmit={onSubmit} className="relative rounded-xl border border-hair bg-white p-8 shadow-sm">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="cf-name">
            Your name
          </label>
          <input
            id="cf-name"
            required
            value={form.name}
            onChange={set("name")}
            className={field}
            placeholder="Jordan Rivera"
            autoComplete="name"
          />
        </div>
        <div>
          <label className={label} htmlFor="cf-email">
            Email
          </label>
          <input
            id="cf-email"
            type="email"
            required
            value={form.email}
            onChange={set("email")}
            className={field}
            placeholder="you@example.com"
            autoComplete="email"
          />
        </div>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="cf-age">
            Scout&rsquo;s age or grade <span className="font-normal normal-case tracking-normal text-mute">(optional)</span>
          </label>
          <input
            id="cf-age"
            value={form.scoutAge}
            onChange={set("scoutAge")}
            className={field}
            placeholder="6th grade"
          />
        </div>
        <div>
          <label className={label} htmlFor="cf-topic">
            What&rsquo;s this about?
          </label>
          <select id="cf-topic" value={form.topic} onChange={set("topic")} className={field}>
            <option>Joining the troop</option>
            <option>Visiting a meeting</option>
            <option>Volunteering as an adult</option>
            <option>Merit badge counseling</option>
            <option>Supporting the troop</option>
            <option>Something else</option>
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label className={label} htmlFor="cf-message">
          Message
        </label>
        <textarea
          id="cf-message"
          required
          rows={5}
          value={form.message}
          onChange={set("message")}
          className={field}
          placeholder="Tell us a bit about your Scout, or ask us anything."
        />
      </div>

      {/* Honeypot: off-screen, not hidden, so a bot's form filler still sees it. */}
      <div aria-hidden className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
        <label htmlFor="cf-website">Leave this field empty</label>
        <input
          id="cf-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="pill pill-navy mt-7 w-full disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? "Sending\u2026" : "Send message"}
      </button>

      {status === "sent" && (
        <p
          role="status"
          className="mt-5 mb-0 flex items-center gap-2.5 rounded-lg bg-forest/10 px-4 py-3 text-[14px] text-forest"
        >
          <IconCheck className="h-5 w-5 shrink-0" />
          Thank you. Your message is on its way to the troop, and someone will reply to the
          address you gave.
        </p>
      )}

      {status === "error" && error && (
        <p
          role="alert"
          className="mt-5 mb-0 rounded-lg bg-red/10 px-4 py-3 text-[14px] leading-6 text-red"
        >
          {error} You can always write to {troop.contact.email}.
        </p>
      )}

      <p className="mt-5 mb-0 text-[12.5px] leading-5 text-mute">
        Your message is emailed to the troop and nothing is stored on this website. You can also
        write to{" "}
        <a
          href={`mailto:${troop.contact.email}`}
          className="text-blue underline underline-offset-4"
        >
          {troop.contact.email}
        </a>{" "}
        directly.
      </p>
    </form>
  );
}
