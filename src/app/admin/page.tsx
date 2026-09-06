import type { Metadata } from "next";
import Link from "next/link";
import { AdminApp } from "./AdminApp";
import { SupabaseAuthForm } from "@/components/auth/SupabaseAuthForm";
import { getProfile, isStaff } from "@/lib/supabase/profile";
import { supabaseConfigured } from "@/lib/supabase/config";
import { troop } from "@/data/troop";

export const metadata: Metadata = {
  title: "Admin",
  description: "Edit the troop website.",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const profile = supabaseConfigured ? await getProfile() : null;

  return (
    <section className="bg-shell/50 py-12 sm:py-16">
      <div className="shell">
        <header className="mb-9 border-b border-hair pb-7">
          <p className="mb-2 font-slab text-[11px] font-bold uppercase tracking-[1.6px] text-blue">
            {troop.name} website
          </p>
          <h1 className="h-section mb-2">Admin</h1>
          <p className="m-0 max-w-2xl text-[16px] leading-7 text-mute">
            Everything on the public site that changes during the year lives here. Add a trip
            report, put next month&rsquo;s campout on the calendar, or add a new Eagle Scout to the
            honor roll.
          </p>
        </header>

        {!supabaseConfigured ? (
          <Card title="Not connected yet">
            <p className="m-0 text-[15px] leading-7 text-mute">
              Set the Supabase keys in <code className="rounded bg-shell px-1.5 py-0.5">.env.local</code>,
              run <code className="rounded bg-shell px-1.5 py-0.5">supabase/schema.sql</code> once in the
              Supabase SQL editor, then reload this page.
            </p>
          </Card>
        ) : !profile ? (
          <Card title="Sign in to continue">
            <p className="mb-6 text-[15px] leading-7 text-mute">
              Use the account a troop leader knows you by.
            </p>
            <div className="max-w-sm">
              <SupabaseAuthForm mode="signin" next="/admin" />
            </div>
            <p className="mt-5 mb-0 text-[14px] text-mute">
              No account yet?{" "}
              <Link href="/signup" className="text-blue hover:underline">
                Create one
              </Link>
              .
            </p>
          </Card>
        ) : !isStaff(profile) ? (
          <Card title="Waiting for access">
            <p className="mb-4 text-[15px] leading-7 text-mute">
              You are signed in as{" "}
              <strong className="text-ink">{profile.email ?? profile.full_name ?? "your account"}</strong>,
              but this account cannot edit the site yet.
            </p>
            <p className="mb-0 text-[15px] leading-7 text-mute">
              A troop admin can grant access by running this once in the Supabase SQL editor:
            </p>
            <pre className="mt-3 overflow-x-auto rounded-lg bg-navy px-4 py-3 text-[13px] leading-6 text-white">
{`update public.profiles
   set role = 'admin'
 where email = '${profile.email ?? "you@example.com"}';`}
            </pre>
          </Card>
        ) : (
          <AdminApp name={profile.full_name ?? profile.email ?? "a troop leader"} />
        )}

        <p className="mt-10 text-[14px] text-mute">
          <Link href="/" className="text-blue hover:underline">
            Back to the site
          </Link>
        </p>
      </div>
    </section>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="max-w-2xl rounded-xl border border-hair bg-white p-7 sm:p-8">
      <h2 className="h-four mb-3">{title}</h2>
      {children}
    </div>
  );
}
