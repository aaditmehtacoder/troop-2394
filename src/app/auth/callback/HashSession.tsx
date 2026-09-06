"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

/**
 * Reads the tokens Supabase leaves in the URL fragment after a confirmation
 * email, stores the session, and moves on. Runs only when the server found no
 * code to exchange.
 */
export function HashSession({ next }: { next: string }) {
  const router = useRouter();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
      const access_token = hash.get("access_token");
      const refresh_token = hash.get("refresh_token");
      const hashError = hash.get("error_description") ?? hash.get("error");

      if (hashError) {
        router.replace(`/login?oauth=${encodeURIComponent(hashError)}`);
        return;
      }

      const supabase = access_token && refresh_token ? createClient() : null;
      if (!access_token || !refresh_token) {
        if (!cancelled) setFailed(true);
        return;
      }
      if (!supabase) {
        router.replace("/login?oauth=not_configured");
        return;
      }

      const { error } = await supabase.auth.setSession({ access_token, refresh_token });
      if (cancelled) return;

      // Clear the tokens out of the address bar before moving on.
      window.history.replaceState(null, "", window.location.pathname);
      if (error) {
        router.replace("/login?oauth=exchange_failed");
        return;
      }
      router.replace(next);
      router.refresh();
    }

    void run();
    return () => {
      cancelled = true;
    };
  }, [next, router]);

  return (
    <section className="flex min-h-[60vh] items-center justify-center px-5 text-center">
      <div>
        <p className="font-slab text-[13px] font-bold uppercase tracking-[1.6px] text-blue">
          {failed ? "That link did not work" : "Signing you in"}
        </p>
        <p className="mt-3 mb-0 text-[15px] leading-7 text-mute">
          {failed
            ? "The link may have expired or already been used. Try signing in, or ask a leader to send a new invitation."
            : "One moment."}
        </p>
        {failed ? (
          <a href="/login" className="pill pill-navy mt-7">
            Go to sign in
          </a>
        ) : null}
      </div>
    </section>
  );
}
