"use client";

import { useActionState } from "react";
import { signupAction, type FormState } from "@/lib/auth/actions";
import { fieldClass, labelClass } from "@/components/auth/AuthShell";
import { FormMessage, SubmitButton } from "@/components/auth/FormMessage";

const RELATIONSHIPS = [
  "Parent or guardian",
  "Scout in Troop 394",
  "Scout in Troop 2394",
  "Registered adult leader",
  "Committee member",
  "Merit badge counselor",
  "Alum or friend of the troop",
];

export function SignupForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(signupAction, null);

  return (
    <form action={action}>
      {state?.error && <FormMessage kind="error">{state.error}</FormMessage>}

      <div>
        <label className={labelClass} htmlFor="name">
          Full name
        </label>
        <input
          id="name"
          name="name"
          required
          minLength={2}
          maxLength={80}
          autoComplete="name"
          className={fieldClass}
          placeholder="Jordan Rivera"
        />
      </div>

      <div className="mt-5">
        <label className={labelClass} htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={160}
          autoComplete="email"
          className={fieldClass}
          placeholder="you@example.com"
        />
      </div>

      <div className="mt-5">
        <label className={labelClass} htmlFor="relationship">
          How are you connected to the troop?
        </label>
        <select id="relationship" name="relationship" required defaultValue="" className={fieldClass}>
          <option value="" disabled>
            Choose one…
          </option>
          {RELATIONSHIPS.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={10}
            maxLength={200}
            autoComplete="new-password"
            className={fieldClass}
            placeholder="At least 10 characters"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="confirm">
            Confirm password
          </label>
          <input
            id="confirm"
            name="confirm"
            type="password"
            required
            minLength={10}
            maxLength={200}
            autoComplete="new-password"
            className={fieldClass}
            placeholder="Type it again"
          />
        </div>
      </div>

      <div className="mt-7">
        <SubmitButton pending={pending}>Request an account</SubmitButton>
      </div>

      <p className="mt-5 mb-0 text-[12.5px] leading-5 text-mute">
        Accounts are approved by a troop leader before they become active — nobody gets into the
        members area automatically. We store your name, email, and how you&rsquo;re connected to
        the troop, and nothing else.
      </p>
    </form>
  );
}
