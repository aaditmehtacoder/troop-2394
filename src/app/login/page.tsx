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
  title: "Sign In",
  description: `Sign in to the ${troop.name} members area.`,
  robots: { index: false, follow: false },
};

const OAUTH_MESSAGES: Record<string, string> = {
  missing_code: "Google did not send us back a sign-in code. Please try again.",
  exchange_failed: "That sign-in link has expired. Please try again.",
  not_configured: "Accounts are not set up on this site yet.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; signedout?: string; oauth?: string }>;
}) {
  const params = await searchParams;

  if (supabaseConfigured) {
    const profile = await getProfile();
    if (profile) redirect("/members");
  }

  const next =
    params.next?.startsWith("/") && !params.next.startsWith("//") ? params.next : "/members";

  const notice = params.signedout ? "You are signed out. See you at the next meeting." : undefined;
  const oauthError = params.oauth
    ? (OAUTH_MESSAGES[params.oauth] ?? "Google sign-in did not complete. Please try again.")
    : undefined;

  return (
    <AuthShell
      title="Members Area"
      lede={`Sign in to see troop forms, the full calendar, and the feed for ${troop.name}.`}
      photo={pageHeroPhoto.login}
      footer={
        <>
          New here?{" "}
          <Link href="/signup" className="font-medium text-white underline underline-offset-4">
            Create an account
          </Link>
          <span className="mx-2 opacity-50">&middot;</span>
          <Link href="/" className="underline underline-offset-4 hover:text-white">
            Back to the site
          </Link>
        </>
      }
    >
      {notice ? (
        <p className="mb-5 rounded-lg bg-forest/10 px-3.5 py-2.5 text-[14px] leading-6 text-forest">
          {notice}
        </p>
      ) : null}
      {oauthError ? (
        <p className="mb-5 rounded-lg bg-red/10 px-3.5 py-2.5 text-[14px] leading-6 text-red">
          {oauthError}
        </p>
      ) : null}

      <SupabaseAuthForm mode="signin" next={next} />
    </AuthShell>
  );
}
