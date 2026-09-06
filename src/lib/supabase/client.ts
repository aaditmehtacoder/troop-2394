"use client";

import { createBrowserClient } from "@supabase/ssr";
import { SUPABASE_KEY, SUPABASE_URL, supabaseConfigured } from "./config";

/**
 * The browser-side Supabase client. Used for signing in with Google and for
 * the live editing screens in the admin dashboard.
 *
 * Returns null when the project is not configured yet, so a half-set-up site
 * renders a helpful message instead of crashing.
 */
export function createClient() {
  if (!supabaseConfigured) return null;
  return createBrowserClient(SUPABASE_URL, SUPABASE_KEY);
}
