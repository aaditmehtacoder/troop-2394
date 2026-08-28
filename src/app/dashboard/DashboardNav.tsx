"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconCalendar, IconCheck, IconMap, IconStar } from "@/components/brand/Marks";

const items = [
  { href: "/dashboard", label: "Overview", Icon: IconStar },
  { href: "/dashboard/calendar", label: "Calendar", Icon: IconCalendar },
  { href: "/dashboard/forms", label: "Forms", Icon: IconMap },
];

export function DashboardNav({ showMembers }: { showMembers: boolean }) {
  const pathname = usePathname();
  const all = showMembers
    ? [...items, { href: "/dashboard/members", label: "Members", Icon: IconCheck }]
    : items;

  return (
    <nav aria-label="Members area" className="lg:sticky lg:top-[136px] lg:self-start">
      <ul className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
        {all.map(({ href, label, Icon }) => {
          const active = pathname === href;
          return (
            <li key={href} className="shrink-0">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-2.5 whitespace-nowrap rounded-lg px-4 py-2.5 font-slab text-[13px] font-bold uppercase tracking-[1px] transition ${
                  active
                    ? "bg-navy text-white"
                    : "bg-white text-mute ring-1 ring-hair hover:text-navy"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
