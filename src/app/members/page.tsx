import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { getProfile, isStaff } from "@/lib/supabase/profile";
import { supabaseConfigured } from "@/lib/supabase/config";
import { troop, troopForms } from "@/data/troop";
import { pageHeroPhoto } from "@/data/photos";

export const metadata: Metadata = {
  title: "Members",
  description: "The members area for Troop 2/394 families.",
  robots: { index: false, follow: false },
};

export default async function MembersPage() {
  if (!supabaseConfigured) redirect("/login");
  const profile = await getProfile();
  if (!profile) redirect("/login?next=%2Fmembers");

  const staff = isStaff(profile);
  const firstName = (profile.full_name ?? profile.email ?? "there").split(/[\s@]/)[0];

  return (
    <>
      <PageHero
        eyebrow="Members area"
        title={`Welcome, ${firstName}`}
        lede="Forms, the calendar, and everything families ask for in one place."
        photo={pageHeroPhoto.members}
        crumb="Members"
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          <Tile href="/calendar" title="Calendar" body="Every campout, meeting and court of honor for the year." />
          <Tile href="/feed" title="Troop feed" body="Notices, what is coming up, and the latest trip reports." />
          <Tile href="/resources" title="Forms and links" body="Health forms, permission slips, and the Guide to Safe Scouting." />
        </div>

        {staff ? (
          <div className="mt-10 rounded-xl border border-blue/30 bg-blue/5 p-7">
            <h2 className="h-four mb-2">You can edit the site</h2>
            <p className="mb-5 max-w-2xl text-[15px] leading-7 text-mute">
              Add a trip report, put the next campout on the calendar, or add a Scout to the Eagle
              honor roll. Changes go live as soon as you save.
            </p>
            <Link href="/admin" className="pill pill-navy pill-sm">
              Open the admin dashboard
            </Link>
          </div>
        ) : (
          <div className="mt-10 rounded-xl border border-hair bg-shell/50 p-7">
            <h2 className="h-four mb-2">Signed in as {profile.email}</h2>
            <p className="m-0 max-w-2xl text-[15px] leading-7 text-mute">
              Editing the site is limited to troop leaders. If you should have access, ask a troop
              admin to raise your role.
            </p>
          </div>
        )}

        <div className="mt-10">
          <h2 className="h-four mb-4">Troop forms</h2>
          <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2">
            {troopForms.map((f) => (
              <li key={f.label} className="rounded-lg border border-hair bg-white px-4 py-3.5">
                <p className="m-0 font-slab text-[15px] font-bold text-navy">{f.label}</p>
                <p className="m-0 mt-1 text-[14px] leading-6 text-mute">{f.note}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 mb-0 text-[14px] text-mute">
            Ask a leader at any Tuesday meeting, or call {troop.contact.phone}.
          </p>
        </div>

        <div className="mt-10 border-t border-hair pt-6">
          <SignOutButton />
        </div>
      </Section>
    </>
  );
}

function Tile({ href, title, body }: { href: string; title: string; body: string }) {
  return (
    <Link
      href={href}
      className="group rounded-xl border border-hair bg-white p-6 transition hover:border-blue/40 hover:shadow-md"
    >
      <h2 className="h-four mb-2 text-[20px] transition group-hover:text-blue">{title}</h2>
      <p className="m-0 text-[15px] leading-7 text-mute">{body}</p>
    </Link>
  );
}
