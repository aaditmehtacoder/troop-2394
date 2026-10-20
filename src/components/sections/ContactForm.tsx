"use client";

import { useEffect, useRef, useState } from "react";
import { IconCheck } from "@/components/brand/Marks";
import { gmailComposeUrl } from "@/components/site/EmailActions";
import { contactTopics } from "@/data/contact";
import { apiErrorText } from "@/lib/api-error";
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
 * It says "submitted" only when the server says the mail provider accepted the
 * message. Anything else is an error, the fields stay filled in, and the visitor
 * gets the troop's address plus a ready-made draft of what they wrote. It used
 * to open their mail program and declare success, which on a computer with no
 * mail program meant a cheerful message and nothing sent.
 */
const initial = {
  name: "",
  email: "",
  scoutAge: "",
  topic: contactTopics[0] as string,
  message: "",
};

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState(initial);
  /** Blocks a second submit before React has re-rendered the disabled button. */
  const inFlight = useRef(false);
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

  /** The visitor's own words, ready to send from their own mail if the form cannot. */
  const draftSubject = `[${troop.name} website] ${form.topic}`;
  const draftBody = [
    `Name: ${form.name}`,
    form.scoutAge ? `Scout's age / grade: ${form.scoutAge}` : null,
    "",
    form.message,
  ]
    .filter((line) => line !== null)
    .join("\n");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inFlight.current) return;
    inFlight.current = true;
    setError(null);
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website, token: await captchaToken() }),
      });
      // Not every answer comes from our route: the firewall answers a
      // rate-limited request itself, with an error object rather than a string.
      const data: unknown = await res.json().catch(() => null);

      if (res.ok && (data as { ok?: unknown } | null)?.ok === true) {
        setForm(initial);
        setStatus("sent");
        return;
      }
      setError(
        apiErrorText(data, res.status, {
          rateLimited: "That is a lot of messages. Please try again in ten minutes.",
          fallback: `Your message did not send. Please email ${troop.contact.email} instead.`,
        }),
      );
      setStatus("error");
    } catch {
      setError(
        `We could not reach the website, so your message was not sent. Check your connection and try again, or email ${troop.contact.email}.`,
      );
      setStatus("error");
    } finally {
      inFlight.current = false;
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
            {contactTopics.map((t) => (
              <option key={t}>{t}</option>
            ))}
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

      {/* Always in the DOM, so screen readers announce what lands in it. */}
      <div role="status" aria-live="polite">
        {status === "sent" && (
          <p className="mt-5 mb-0 flex items-center gap-2.5 rounded-lg bg-forest/10 px-4 py-3 text-[14px] text-forest">
            <IconCheck className="h-5 w-5 shrink-0" />
            Thank you. Your message has been submitted to the troop, and a volunteer will reply to
            the address you gave.
          </p>
        )}
      </div>

      <div role="alert">
        {status === "error" && error && (
          <div className="mt-5 rounded-lg bg-red/10 px-4 py-3 text-[14px] leading-6 text-red">
            <p className="m-0">{error}</p>
            <p className="mt-2 mb-0 text-ink">
              What you wrote is still in the form. To send it yourself:{" "}
              <a
                href={`mailto:${troop.contact.email}?subject=${encodeURIComponent(
                  draftSubject,
                )}&body=${encodeURIComponent(draftBody)}`}
                className="text-blue underline underline-offset-4"
              >
                open it in your email program
              </a>{" "}
              or{" "}
              <a
                href={gmailComposeUrl(troop.contact.email, draftSubject, draftBody)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue underline underline-offset-4"
              >
                in Gmail
              </a>
              . It is not sent until you press Send there.
            </p>
          </div>
        )}
      </div>

      <p className="mt-5 mb-0 text-[12.5px] leading-5 text-mute">
        Your message is emailed to troop volunteers and nothing is stored on this website. You
        can also write to{" "}
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
