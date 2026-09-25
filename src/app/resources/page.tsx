import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHead } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { CTABand } from "@/components/site/CTABand";
import { IconArrow, IconCheck } from "@/components/brand/Marks";
import { dues, gearShops, packingList, troop } from "@/data/troop";
import { pageHeroPhoto } from "@/data/photos";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Forms, downloads, the new family guide, dues and fundraising, and every official Scouting link a Troop 394 family needs.",
};

const newFamilyChecklist = [
  "Attend a troop meeting, no forms needed",
  "Complete the BSA youth application (we hand you one at your first meeting)",
  "Fill out Annual Health & Medical Record Parts A and B",
  "Buy a Scouts BSA Handbook, the only day-one purchase",
  "Create a Scoutbook login for the parent and the Scout",
  "Get a field uniform shirt, neckerchief, and slide before the first Court of Honor",
  "Borrow a pack and sleeping bag from the troop for the first two campouts",
  "At least one parent: take Youth Protection Training (free, 90 minutes, online)",
  "Join the troop email list and the parent group chat",
  "Put the next campout on your family calendar",
];

const fundraisers = [
  {
    t: "Popcorn sale",
    when: "September – November",
    d: "The council's flagship fundraiser. A Scout's commission goes straight into their own account for camp fees and gear.",
  },
  {
    t: "Wreath & greenery sale",
    when: "November – December",
    d: "Runs alongside popcorn. Historically our best per-hour return for Scouts who prefer a short season.",
  },
  {
    t: "Spring service fundraiser",
    when: "April",
    d: "The troop takes on a paid work project, yard clean-ups or an event crew, and splits proceeds into Scout accounts.",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="For Troop 394 families"
        title="Resources"
        lede="Everything you need in one place, forms, official links, dues, fundraising, and a checklist for brand new families."
        photo={pageHeroPhoto.resources}
        crumb="Resources"
      />

      {/* The forms themselves live behind the members' area. */}
      <Section>
        <div className="mx-auto max-w-2xl rounded-lg border border-hair bg-shell p-8 text-center">
          <h2 className="mt-0 font-slab text-[20px] font-bold text-navy">
            Forms and official links
          </h2>
          <p className="mx-auto mt-2 mb-6 max-w-xl text-[15px] leading-7 text-slate">
            Health forms, permission slips, Scoutbook and the council&rsquo;s own pages are in the
            members&rsquo; area, so families have one place to look rather than two.
          </p>
          <Link href="/members" className="pill pill-navy pill-sm">
            Open the members&rsquo; area
          </Link>
        </div>
      </Section>

      {/* NEW FAMILIES */}
      <Section id="new-families" className="bg-shell">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHead align="left" title="New family guide" />
            <Reveal delay={70}>
              <div className="prose-troop mt-6">
                <p>
                  The first month is the confusing one. Here is the whole list, in order, nothing
                  on it is expensive and most of it is free.
                </p>
                <p className="mb-0">
                  Every new family is paired with a veteran family for their first three months.
                  Ask them the small questions; that is what they are there for.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={110}>
            <ol className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-hair">
              {newFamilyChecklist.map((c, i) => (
                <li
                  key={c}
                  className="flex gap-3.5 border-b border-hair py-3.5 last:border-0 last:pb-0 first:pt-0"
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-blue/10 font-slab text-[11px] font-bold text-blue">
                    {i + 1}
                  </span>
                  <span className="text-[14.5px] leading-6 text-slate">{c}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Section>

      {/* DUES */}
      <Section id="dues">
        <SectionHead
          title="Dues &amp; fundraising"
          lede="Scouting is one of the least expensive youth activities there is, and no Scout in Troop 394 has ever been turned away over money."
        />

        <div className="mt-11 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <div className="rounded-xl border border-hair bg-white p-8 shadow-sm">
              <h3 className="font-slab text-[13px] font-bold uppercase tracking-[1.6px] text-blue">
                Registration
              </h3>
              <p className="mt-4 mb-0 font-slab text-[44px] font-bold leading-none text-navy">
                ${dues.joinCost}
              </p>
              <p className="mt-5 mb-0 text-[13.5px] leading-6 text-mute">{dues.note}</p>
            </div>
          </Reveal>

          <div className="space-y-5">
            {fundraisers.map((f, i) => (
              <Reveal key={f.t} delay={(i + 1) * 90}>
                <div className="rounded-lg border-l-4 border-blue bg-blue/[0.05] p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className="font-slab text-[18px] font-bold text-navy">{f.t}</h3>
                    <span className="rounded-full bg-white px-3 py-1 text-[11.5px] font-bold uppercase tracking-[1px] text-mute">
                      {f.when}
                    </span>
                  </div>
                  <p className="mt-2.5 mb-0 text-[14px] leading-6 text-slate">{f.d}</p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={360}>
              <div className="flex gap-3 rounded-lg bg-shell p-6">
                <IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue" />
                <p className="mb-0 text-[14px] leading-6 text-slate">
                  <strong className="text-navy">Scout accounts.</strong> A Scout&rsquo;s
                  fundraising commission goes into their own account and can be spent on dues,
                  campouts, summer camp, or gear. A motivated Scout can fund their entire year.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* LINKS BAND */}
      <Section id="links" className="bg-navy">
        <SectionHead
          tone="white"
          title="Council &amp; district"
          lede={`Troop 394 is chartered in the ${troop.district.name} of the ${troop.council.name}, which serves ${troop.district.serves}.`}
        />
        <div className="mx-auto mt-11 grid max-w-4xl gap-5 md:grid-cols-2">
          {[
            {
              t: troop.council.name,
              d: `Council #${troop.council.number} · ${troop.council.serviceCenter} · ${troop.council.phone}`,
              href: troop.council.url,
            },
            {
              t: troop.district.name,
              d: "Roundtables, Camporee, Klondike, and district advancement.",
              href: troop.district.url,
            },
          ].map((c, i) => (
            <Reveal key={c.href} delay={i * 100}>
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-lg bg-white/[0.07] p-7 ring-1 ring-white/15 transition hover:bg-white/[0.13]"
              >
                <h3 className="font-slab text-[18px] font-bold !text-white">{c.t}</h3>
                <p className="mt-2 mb-0 flex-1 text-[13.5px] leading-6 text-white/75">{c.d}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 font-slab text-[12px] font-bold uppercase tracking-[1.2px] text-white">
                  Visit
                  <IconArrow className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="packing" className="bg-shell/60">
        <SectionHead
          eyebrow="Straight from the troop's own list"
          title="What to pack"
          lede="The troop has used this list for years. Borrow before you buy anything."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <PackList title="In your pocket" items={packingList.pocket} />
          <PackList title="Camping kit" items={packingList.camping} />
          <PackList title="Clothing" items={packingList.clothing} />
          <PackList title="Leave at home" items={packingList.leaveAtHome} tone="red" />
        </div>

        <p className="mt-7 mb-0 text-[15px] leading-7 text-mute">{packingList.tentNote}</p>
      </Section>

      <Section id="gear">
        <SectionHead
          eyebrow="Local shops"
          title="Where families buy gear"
          lede="Several of these give Scouts a discount. Ask at the till and show the uniform."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {gearShops.map((g, i) => (
            <Reveal key={g.name} delay={i * 50}>
              <div className="h-full rounded-xl border border-hair bg-white p-6">
                <h3 className="mb-1.5 font-slab text-[17px] font-bold text-navy">{g.name}</h3>
                <p className="m-0 text-[14px] font-medium text-forest">{g.note}</p>
                <p className="m-0 mt-1 text-[14px] text-mute">{g.where}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTABand
        title="Still can't find it?"
        body="The committee would rather answer a question twice than have a family miss a deadline. Email us and we will point you at the right form."
        primary={{ label: "Contact the troop", href: "/contact" }}
        secondary={{ label: "Safety information", href: "/safety" }}
        photo="uvas-2"
      />
    </>
  );
}

function PackList({
  title,
  items,
  tone = "navy",
}: {
  title: string;
  items: readonly string[];
  tone?: "navy" | "red";
}) {
  return (
    <div className="rounded-xl border border-hair bg-white p-6">
      <h3
        className={`mb-3 font-slab text-[16px] font-bold ${tone === "red" ? "text-red" : "text-navy"}`}
      >
        {title}
      </h3>
      <ul className="m-0 list-none space-y-2 p-0">
        {items.map((it) => (
          <li key={it} className="flex gap-2.5 text-[14.5px] leading-6 text-slate">
            <span aria-hidden className={tone === "red" ? "text-red" : "text-blue"}>
              {tone === "red" ? "\u00d7" : "\u2022"}
            </span>
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}
