import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/auth/AuthShell";
import { SupabaseAuthForm } from "@/components/auth/SupabaseAuthForm";
import { getProfile } from "@/lib/supabase/profile";
import { supabaseConfigured } from "@/lib/supabase/config";
import { troop } from "@/data/troop";
import { pageHeroPhoto } from "@/data/photos";

export const metadata: Metadata = {
  title: "Create an Account",
  description: `Create an account for the ${troop.name} members area.`,
  robots: { index: false, follow: false },
};

export default async function SignupPage() {
  if (supabaseConfigured) {
    const profile = await getProfile();
    if (profile) redirect("/members");
  }

  return (
    <AuthShell
      title="Create an Account"
      lede="For Scouts, parents and leaders of Troop 394 and Troop 2394."
      photo={pageHeroPhoto.signup}
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-white underline underline-offset-4">
            Sign in
          </Link>
          <span className="mx-2 opacity-50">&middot;</span>
          <Link href="/" className="underline underline-offset-4 hover:text-white">
            Back to the site
          </Link>
        </>
      }
    >
      <SupabaseAuthForm mode="signup" next="/members" />
      <p className="mt-5 mb-0 text-center text-[13px] leading-6 text-mute">
        Accounts are for troop families. Editing the site stays with leaders, so a new account
        starts read only.
      </p>
    </AuthShell>
  );
}
