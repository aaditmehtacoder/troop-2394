"use client";

import { useActionState } from "react";
import { loginAction, type FormState } from "@/lib/auth/actions";
import { fieldClass, labelClass } from "@/components/auth/AuthShell";
import { FormMessage, SubmitButton } from "@/components/auth/FormMessage";

export function LoginForm({ next, notice }: { next?: string; notice?: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(loginAction, null);

  return (
    <form action={action}>
      {notice && !state?.error && <FormMessage kind="notice">{notice}</FormMessage>}
      {state?.error && <FormMessage kind="error">{state.error}</FormMessage>}

      {next && <input type="hidden" name="next" value={next} />}

      <div>
        <label className={labelClass} htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          autoFocus
          className={fieldClass}
          placeholder="you@example.com"
        />
      </div>

      <div className="mt-5">
        <label className={labelClass} htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className={fieldClass}
          placeholder="••••••••••"
        />
      </div>

      <div className="mt-7">
        <SubmitButton pending={pending}>Sign in</SubmitButton>
      </div>

      <p className="mt-5 mb-0 text-center text-[12.5px] leading-5 text-mute">
        Forgotten your password? There is no reset email yet — ask a troop leader to set you a
        new one.
      </p>
    </form>
  );
}
