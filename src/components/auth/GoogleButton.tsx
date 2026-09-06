"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { siteUrl } from "@/lib/supabase/config";

/**
 * Google is off until the provider is switched on in Supabase (Authentication
 * → Providers → Google) AND NEXT_PUBLIC_GOOGLE_SIGNIN=true is set. Until then
 * the button stays hidden instead of sending people to an error page.
 */
export const googleSignInEnabled = process.env.NEXT_PUBLIC_GOOGLE_SIGNIN === "true";

/**
 * Sign in with Google.
 *
 * Supabase redirects to Google, Google redirects back to /auth/callback, and
 * that route turns the code into a session. Nothing secret lives in here.
 */
export function GoogleButton({
  next = "/members",
  label = "Continue with Google",
}: {
  next?: string;
  label?: string;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function signIn() {
    setError(null);
    const supabase = createClient();
    if (!supabase) {
      setError("Google sign-in is not configured on this site yet.");
      return;
    }

    setBusy(true);
    // Ask for the Google URL first instead of redirecting blind, so a provider
    // that is not enabled yet shows a message here rather than a JSON error page.
    const { data, error: authError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${siteUrl()}/auth/callback?next=${encodeURIComponent(next)}`,
        skipBrowserRedirect: true,
      },
    });

    if (authError || !data?.url) {
      setError(
        /not enabled|unsupported provider/i.test(authError?.message ?? "")
          ? "Google sign-in is not switched on yet. Use your email and password."
          : (authError?.message ?? "Google sign-in did not start. Please try again."),
      );
      setBusy(false);
      return;
    }

    window.location.assign(data.url);
  }

  if (!googleSignInEnabled) return null;

  return (
    <div>
      <button
        type="button"
        onClick={signIn}
        disabled={busy}
        className="flex w-full items-center justify-center gap-3 rounded-lg border border-hair bg-white px-4 py-3 font-slab text-[14px] font-bold uppercase tracking-[0.6px] text-ink transition hover:border-mute/60 hover:bg-shell disabled:opacity-60"
      >
        <GoogleMark />
        {busy ? "Opening Google…" : label}
      </button>
      {error ? (
        <p className="mt-2 text-center text-[13px] text-red">{error}</p>
      ) : null}
    </div>
  );
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 18 18" className="h-[18px] w-[18px]" aria-hidden="true">
      <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62Z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18Z" />
      <path fill="#FBBC05" d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3.01-2.33Z" />
      <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.46 3.44 1.35l2.58-2.58C13.46.9 11.43 0 9 0A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58Z" />
    </svg>
  );
}
