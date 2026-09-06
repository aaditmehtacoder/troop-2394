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

/** Absolute site origin, needed so Google knows where to send people back. */
export function siteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  if (typeof window !== "undefined") return window.location.origin;
  return "http://localhost:3000";
}
