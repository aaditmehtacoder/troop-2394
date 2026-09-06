import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Where every sign-in link lands: Google, and the confirmation email a new
 * family gets.
 *
 * This has to be a route handler and not a page. Exchanging the code produces
 * the session cookies, and Next only allows a cookie to be written from a
 * route handler or a server action. This used to be a server component page,
 * where the write throws and the helper swallows it, so the exchange looked
 * like it worked, the browser was sent to /members with no session, and
 * /members sent it straight back to /login. Sign-in appeared to do nothing.
 *
 * Supabase uses three shapes depending on the flow:
 *
 *   ?code=…                OAuth / PKCE. Exchanged here.
 *   ?token_hash=…&type=…   The newer email link. Verified here.
 *   #access_token=…        The classic confirmation email. A fragment never
 *                          reaches the server, so we hand it to the browser.
 */
export const dynamic = "force-dynamic";

/** Only ever redirect inside this site. */
function safeNext(raw: string | null): string {
  return raw && raw.startsWith("/") && !raw.startsWith("//") ? raw : "/members";
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const next = safeNext(url.searchParams.get("next"));

  const failed = url.searchParams.get("error_description") ?? url.searchParams.get("error");
  if (failed) {
    return NextResponse.redirect(new URL(`/login?oauth=${encodeURIComponent(failed)}`, url.origin));
  }

  const code = url.searchParams.get("code");
  const tokenHash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type");

  if (code || tokenHash) {
    const supabase = await createClient();
    if (!supabase) return NextResponse.redirect(new URL("/login?oauth=not_configured", url.origin));

    if (code) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) return NextResponse.redirect(new URL("/login?oauth=exchange_failed", url.origin));
    } else if (tokenHash) {
      const { error } = await supabase.auth.verifyOtp({
        type: (type as "signup" | "email" | "recovery" | "invite" | "magiclink") ?? "email",
        token_hash: tokenHash,
      });
      if (error) return NextResponse.redirect(new URL("/login?oauth=exchange_failed", url.origin));
    }

    // The cookies the exchange set are on the outgoing response, because this
    // is a route handler. That is the whole point of the file.
    return NextResponse.redirect(new URL(next, url.origin));
  }

  // No query parameters. The tokens may still be in the fragment, which only
  // the browser can see, so send a page that forwards it somewhere that can
  // read it. `location.hash` survives this because we build the URL in JS.
  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Signing you in</title>
<meta name="robots" content="noindex"></head>
<body style="font:15px/1.6 system-ui,-apple-system,sans-serif;padding:3rem;text-align:center;color:#33373d">
<p>Signing you in&hellip;</p>
<script>
  var next = ${JSON.stringify(next)};
  location.replace("/auth/callback/hash?next=" + encodeURIComponent(next) + location.hash);
</script>
<noscript><p>Please enable JavaScript, or <a href="/login">sign in again</a>.</p></noscript>
</body></html>`;

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  });
}
