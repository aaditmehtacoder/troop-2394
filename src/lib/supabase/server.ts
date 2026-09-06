import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { SUPABASE_KEY, SUPABASE_URL, supabaseConfigured } from "./config";

/**
 * Supabase for server components, server actions, and route handlers.
 *
 * Next 16's `cookies()` is async, so this helper is too. Writing cookies is
 * only allowed in actions and route handlers, in a server component the set
 * call throws, which we swallow because the session refresh that triggers it
 * will be retried on the next request that *can* write.
 */
export async function createClient() {
  if (!supabaseConfigured) return null;
  const jar = await cookies();

  return createServerClient(SUPABASE_URL, SUPABASE_KEY, {
    cookies: {
      getAll() {
        return jar.getAll();
      },
      setAll(list) {
        try {
          for (const { name, value, options } of list) jar.set(name, value, options);
        } catch {
          // Called from a server component, safe to ignore, see above.
        }
      },
    },
  });
}

/** The signed-in Supabase user, or null. Never throws. */
export async function getSupabaseUser() {
  const supabase = await createClient();
  if (!supabase) return null;
  const { data, error } = await supabase.auth.getUser();
  if (error) return null;
  return data.user ?? null;
}
