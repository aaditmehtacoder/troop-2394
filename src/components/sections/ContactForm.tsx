"use client";

import { useState } from "react";
import { IconCheck } from "@/components/brand/Marks";
import { troop } from "@/data/troop";

type Status = "idle" | "sent";

/**
 * No backend on a unit website, the form composes a mailto: so it works the
 * day the site goes live. Swap the handler for a form service later if you want
 * submissions in a dashboard.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    scoutAge: "",
    topic: "Joining the troop",
    message: "",
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `[Troop 2/394 website] ${form.topic}, ${form.name}`;
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
  };

  const field =
    "w-full rounded-lg border border-hair bg-white px-4 py-3 text-[15px] text-ink transition placeholder:text-mute/70 focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/25";
  const label = "mb-1.5 block font-slab text-[12px] font-bold uppercase tracking-[1.2px] text-navy";

  return (
    <form onSubmit={onSubmit} className="rounded-xl border border-hair bg-white p-8 shadow-sm">
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

      <button type="submit" className="pill pill-navy mt-7 w-full sm:w-auto">
        Send message
      </button>

      {status === "sent" && (
        <p
          role="status"
          className="mt-5 mb-0 flex items-center gap-2.5 rounded-lg bg-forest/10 px-4 py-3 text-[14px] text-forest"
        >
          <IconCheck className="h-5 w-5 shrink-0" />
          Your email app should have opened with the message ready. If it did not, write to{" "}
          {troop.contact.email}.
        </p>
      )}

      <p className="mt-5 mb-0 text-[12.5px] leading-5 text-mute">
        This form opens your own email app, nothing is stored on this website. You can also
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
