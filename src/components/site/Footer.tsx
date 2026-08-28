import Link from "next/link";
import { resourceLinks, troop } from "@/data/troop";
import { TroopBadge, IconMail, IconPhone, IconPin } from "@/components/brand/Marks";

const columns = [
  {
    heading: "The Troop",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Program", href: "/program" },
      { label: "Advancement", href: "/advancement" },
      { label: "Outdoors", href: "/outdoors" },
      { label: "Calendar", href: "/calendar" },
    ],
  },
  {
    heading: "Families",
    links: [
      { label: "Join Troop 2/394", href: "/join" },
      { label: "New Family Guide", href: "/resources#new-families" },
      { label: "Forms & Downloads", href: "/resources" },
      { label: "Dues & Fundraising", href: "/resources#dues" },
      { label: "Support the Troop", href: "/support" },
    ],
  },
  {
    heading: "Safety",
    links: [
      { label: "Our Commitment", href: "/safety" },
      { label: "Youth Protection", href: "/safety#youth-protection" },
      { label: "Health Forms", href: "/safety#health-forms" },
      { label: "Report a Concern", href: "/safety#report" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-navy text-white">
      {/* CTA band */}
      <div className="border-b border-white/15">
        <div className="shell flex flex-col items-center gap-6 py-12 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <h2 className="h-sub !text-white">Ready to see what a Tuesday night looks like?</h2>
            <p className="mt-2 mb-0 max-w-xl text-[15px] leading-6 text-white/80">
              Visit any troop meeting — no forms, no uniform, no commitment. Just come and watch
              the Scouts run it themselves.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap justify-center gap-3">
            <Link href="/join" className="pill pill-white">
              Join the Troop
            </Link>
            <Link href="/contact" className="pill pill-ghost">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Link columns */}
      <div className="shell grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <TroopBadge className="h-14 w-14 shrink-0" />
            <div>
              <div className="font-slab text-[20px] font-bold leading-tight">{troop.longName}</div>
              <div className="text-[12px] uppercase tracking-[1.6px] text-white/70">
                {troop.city}, {troop.stateAbbr} · Est. {troop.founded}
              </div>
            </div>
          </div>

          <p className="mt-5 mb-0 max-w-sm text-[14px] leading-6 text-white/75">
            Linked Scouts BSA troops in {troop.city} — Troop 394 and Troop 2394 — chartered by
            the {troop.charterOrg.name}, in the {troop.district.name} of the{" "}
            {troop.council.name}.
          </p>

          <ul className="mt-5 space-y-2.5 text-[14px] text-white/85">
            <li className="flex items-start gap-2.5">
              <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-white/60" />
              <span>
                {troop.meeting.venue}
                <br />
                {troop.meeting.address}
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <IconMail className="h-4 w-4 shrink-0 text-white/60" />
              <a className="underline-offset-4 hover:underline" href={`mailto:${troop.contact.email}`}>
                {troop.contact.email}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <IconPhone className="h-4 w-4 shrink-0 text-white/60" />
              <a
                className="underline-offset-4 hover:underline"
                href={`tel:${troop.contact.phone.replace(/[^0-9+]/g, "")}`}
              >
                {troop.contact.phone}
              </a>
            </li>
          </ul>
        </div>

        {columns.map((col) => (
          <nav key={col.heading} aria-label={`Footer — ${col.heading}`}>
            <h3 className="font-slab text-[13px] font-bold uppercase tracking-[1.4px] !text-white/95">
              {col.heading}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[14px] text-white/75 underline-offset-4 transition hover:text-white hover:underline"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* Official links strip */}
      <div className="border-t border-white/15 py-6">
        <div className="shell">
          <h3 className="font-slab text-[12px] font-bold uppercase tracking-[1.6px] !text-white/70">
            Official Scouting resources
          </h3>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
            {resourceLinks.slice(0, 6).map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-white/70 underline-offset-4 transition hover:text-white hover:underline"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Legal */}
      <div className="border-t border-white/15 py-6">
        <div className="shell flex flex-col items-center justify-between gap-3 text-center text-[12.5px] text-white/60 md:flex-row md:text-left">
          <p className="mb-0">
            © {year} {troop.longName}, {troop.city}, {troop.stateAbbr}. An independently
            maintained unit website.
          </p>
          <p className="mb-0">
            Not an official publication of Scouting America ·{" "}
            <a
              href="https://www.scouting.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 hover:text-white hover:underline"
            >
              scouting.org
            </a>{" "}
            ·{" "}
            <a
              href={troop.council.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 hover:text-white hover:underline"
            >
              {troop.council.abbr}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
