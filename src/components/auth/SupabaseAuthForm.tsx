"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { siteUrl } from "@/lib/supabase/config";
import { GoogleButton, googleSignInEnabled } from "./GoogleButton";
import { fieldClass, labelClass } from "./AuthShell";

type Mode = "signin" | "signup";

/**
 * Email and password against Supabase, with Google alongside it.
 *
 * Supabase does the password hashing and the email confirmation, so nothing
 * sensitive is handled here. On sign-up the project may be set to require a
 * confirmation email, which is why the success message covers both cases.
 */
export function SupabaseAuthForm({ mode, next = "/members" }: { mode: Mode; next?: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setNotice(null);

    const supabase = createClient();
    if (!supabase) {
      setError("Accounts are not configured on this site yet.");
      return;
    }

    if (mode === "signup" && password.length < 8) {
      setError("Please use a password of at least 8 characters.");
      return;
    }

    setBusy(true);

    if (mode === "signup") {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name || null },
          emailRedirectTo: `${siteUrl()}/auth/callback?next=${encodeURIComponent(next)}`,
        },
      });

      setBusy(false);
      if (signUpError) return setError(signUpError.message);

      if (data.session) {
        router.push(next);
        router.refresh();
      } else {
        setNotice("Account created. Check your email for a confirmation link, then sign in.");
      }
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (signInError) return setError(signInError.message);

    router.push(next);
    router.refresh();
  }

  return (
    <div>
      {googleSignInEnabled ? (
        <>
          <GoogleButton next={next} label={mode === "signup" ? "Sign up with Google" : "Continue with Google"} />
          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-hair" />
            <span className="font-slab text-[11px] font-bold uppercase tracking-[1.2px] text-mute">or</span>
            <span className="h-px flex-1 bg-hair" />
          </div>
        </>
      ) : null}

      <form onSubmit={submit} className="space-y-4">
        {mode === "signup" ? (
          <div>
            <label htmlFor="sb-name" className={labelClass}>Your name</label>
            <input
              id="sb-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              className={fieldClass}
            />
          </div>
        ) : null}

        <div>
          <label htmlFor="sb-email" className={labelClass}>Email</label>
          <input
            id="sb-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="sb-password" className={labelClass}>Password</label>
          <input
            id="sb-password"
            type="password"
            required
            minLength={mode === "signup" ? 8 : undefined}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={mode === "signup" ? "new-password" : "current-password"}
            className={fieldClass}
          />
          {mode === "signup" ? (
            <p className="mt-1.5 mb-0 text-[13px] text-mute">At least 8 characters.</p>
          ) : null}
        </div>

        {error ? (
          <p role="alert" className="m-0 rounded-lg bg-red/10 px-3.5 py-2.5 text-[14px] leading-6 text-red">
            {error}
          </p>
        ) : null}
        {notice ? (
          <p role="status" className="m-0 rounded-lg bg-forest/10 px-3.5 py-2.5 text-[14px] leading-6 text-forest">
            {notice}
          </p>
        ) : null}

        <button type="submit" disabled={busy} className="pill pill-navy w-full disabled:opacity-60">
          {busy ? "Working…" : mode === "signup" ? "Create account" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
