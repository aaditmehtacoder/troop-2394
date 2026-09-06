import { HashSession } from "./HashSession";

/**
 * The classic confirmation-email flow, where Supabase leaves the tokens in the
 * URL fragment. A fragment never reaches the server, so /auth/callback hands
 * the browser here and this client component reads it.
 */
export const dynamic = "force-dynamic";

export const metadata = { robots: { index: false, follow: false } };

type Search = Promise<Record<string, string | string[] | undefined>>;

export default async function HashCallbackPage({ searchParams }: { searchParams: Search }) {
  const params = await searchParams;
  const raw = Array.isArray(params.next) ? params.next[0] : params.next;
  const next = raw && raw.startsWith("/") && !raw.startsWith("//") ? raw : "/members";
  return <HashSession next={next} />;
}
