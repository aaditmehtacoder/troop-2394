import { createClient, getSupabaseUser } from "./server";

export type ProfileRole = "viewer" | "member" | "leader" | "admin";

export type Profile = {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  role: ProfileRole;
};

/**
 * The signed-in person and their troop role.
 *
 * Roles come from the `profiles` table, not from the Google token, so a leader
 * can promote or demote someone and it takes effect on the next request.
 */
export async function getProfile(): Promise<Profile | null> {
  const user = await getSupabaseUser();
  if (!user) return null;

  const supabase = await createClient();
  if (!supabase) return null;

  const { data } = await supabase
    .from("profiles")
    .select("id, email, full_name, avatar_url, role")
    .eq("id", user.id)
    .maybeSingle();

  if (data) return data as Profile;

  // Signed in, but the profile row has not appeared yet (the trigger runs on
  // insert into auth.users). Treat them as a viewer rather than as nobody.
  return {
    id: user.id,
    email: user.email ?? null,
    full_name: (user.user_metadata?.full_name as string) ?? null,
    avatar_url: (user.user_metadata?.avatar_url as string) ?? null,
    role: "viewer",
  };
}

/** Leaders and admins may edit content. */
export function isStaff(profile: Profile | null): boolean {
  return profile?.role === "leader" || profile?.role === "admin";
}
