import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import { canAccessDashboard, isAdmin } from "@/lib/auth/store";
import { logoutAction } from "@/lib/auth/actions";
import { TroopBadge, IconArrow } from "@/components/brand/Marks";
import { troop } from "@/data/troop";
import { DashboardNav } from "./DashboardNav";

export const metadata: Metadata = {
  title: { default: "Members Area", template: `%s | ${troop.name} Members` },
  robots: { index: false, follow: false, nocache: true },
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // The authoritative gate. Every /dashboard route renders inside this layout,
  // so nothing below it can be reached without a valid, approved session.
  const user = await getCurrentUser();

  if (!user) redirect("/login?next=/dashboard");
  if (!canAccessDashboard(user.role)) redirect("/login?pending=1");

  const roleLabel =
    user.role === "admin" ? "Administrator" : user.role === "leader" ? "Troop leader" : "Member";

  return (
    <div className="bg-shell">
      {/* Members bar */}
      <div className="border-b border-hair bg-navy text-white">
        <div className="shell flex flex-wrap items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-3">
            <TroopBadge numerals={false} className="h-10 w-10 shrink-0" />
            <div>
              <p className="mb-0 font-slab text-[15px] font-bold leading-tight">Members Area</p>
              <p className="mb-0 text-[12px] uppercase tracking-[1.4px] text-white/65">
                {troop.name} · {troop.city}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="mb-0 text-[14px] font-medium leading-tight">{user.name}</p>
              <p className="mb-0 text-[12px] text-white/65">{roleLabel}</p>
            </div>
            <form action={logoutAction}>
              <button type="submit" className="pill pill-ghost pill-sm">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="shell grid gap-8 py-10 lg:grid-cols-[228px_1fr]">
        <DashboardNav showMembers={isAdmin(user.role)} />

        <div className="min-w-0">{children}</div>
      </div>

      <div className="border-t border-hair bg-white py-6">
        <div className="shell flex flex-wrap items-center justify-between gap-3 text-[13px] text-mute">
          <p className="mb-0">
            This area is for {troop.name} families and registered leaders. Please don&rsquo;t share
            what&rsquo;s on it outside the troop.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-slab text-[12px] font-bold uppercase tracking-[1.2px] text-blue"
          >
            Public site
            <IconArrow className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
