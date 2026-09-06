import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { HashSession } from "./HashSession";

/**
 * Where every sign-in link lands: Google, and the confirmation email a new
 * family gets. Supabase uses three different shapes depending on the flow, so
 * this page handles all three.
 *
 *   ?code=…                   OAuth / PKCE. Exchanged for a session here.
 *   ?token_hash=…&type=…      The newer email link. Verified here.
 *   #access_token=…           The classic confirmation email. The fragment
 *                             never reaches the server, so a small client
 *                             component reads it in the browser.
 */
export const dynamic = "force-dynamic";

type Search = Promise<Record<string, string | string[] | undefined>>;

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export default async function AuthCallbackPage({ searchParams }: { searchParams: Search }) {
  const params = await searchParams;

  const raw = one(params.next) ?? "/members";
  const next = raw.startsWith("/") && !raw.startsWith("//") ? raw : "/members";

  const error = one(params.error_description) ?? one(params.error);
  if (error) redirect(`/login?oauth=${encodeURIComponent(error)}`);

  const code = one(params.code);
  const tokenHash = one(params.token_hash);
  const type = one(params.type);

  if (code || tokenHash) {
    const supabase = await createClient();
    if (!supabase) redirect("/login?oauth=not_configured");

    if (code) {
      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
      if (exchangeError) redirect("/login?oauth=exchange_failed");
    } else if (tokenHash) {
      const { error: verifyError } = await supabase.auth.verifyOtp({
        type: (type as "signup" | "email" | "recovery" | "invite" | "magiclink") ?? "email",
        token_hash: tokenHash,
      });
      if (verifyError) redirect("/login?oauth=exchange_failed");
    }

    redirect(next);
  }

  // No query parameters. The token may still be in the fragment, which only the
  // browser can see, so hand off to the client.
  return <HashSession next={next} />;
}
