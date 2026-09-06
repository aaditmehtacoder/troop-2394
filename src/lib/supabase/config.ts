/**
 * Supabase connection details, read once and validated here so every other
 * module can assume they exist.
 *
 * The publishable key is meant to be public. It identifies the project, it
 * does not grant access. Row-level security policies in `supabase/schema.sql`
 * are what decide who may read and write. Never ship the service_role key.
 */

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";

/** True when the project is wired up. Pages degrade gracefully when it is not. */
export const supabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_KEY);

/**
 * Absolute site origin, needed so Google knows where to send people back.
 *
 * In the browser the page's own origin is always the right answer: it is
 * correct on localhost, on a Vercel preview, and on the production domain,
 * without anyone having to remember an environment variable. Only on the
 * server, where there is no window, do we fall back to configuration.
 */
export function siteUrl(): string {
  if (typeof window !== "undefined") return window.location.origin;

  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  if (fromEnv) return fromEnv.replace(/\/$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`;

  return "http://localhost:3000";
}
