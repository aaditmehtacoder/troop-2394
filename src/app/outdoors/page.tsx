import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHead } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { CTABand } from "@/components/site/CTABand";
import { Scene, SceneTile } from "@/components/brand/Scenes";
import { IconCheck, IconPin } from "@/components/brand/Marks";
import { gearList, highAdventureBases, localTrips, summerCamp } from "@/data/troop";

export const metadata: Metadata = {
  title: "Outdoors",
  description:
    "Troop 2/394's outdoor program — a campout every month, a week at Camp Hi-Sierra each July, high adventure, gear lists, and Leave No Trace.",
};

const lnt = [
  { n: "Plan ahead and prepare", d: "Check the weather, know the regulations, and pack for what you will actually meet." },
  { n: "Travel and camp on durable surfaces", d: "Stay on the trail. Camp on rock, gravel, or established sites — never on fragile meadow." },
  { n: "Dispose of waste properly", d: "Pack it in, pack it out. Everything. Cathole 200 feet from water." },
  { n: "Leave what you find", d: "Take photographs. Leave rocks, plants, and artifacts where they are." },
  { n: "Minimize campfire impacts", d: "Use a stove. If you build a fire, use an existing ring and burn it to white ash." },
  { n: "Respect wildlife", d: "Observe from a distance. Store food so animals never learn to associate people with a meal." },
  { n: "Be considerate of other visitors", d: "Keep noise down, yield on the trail, and camp out of sight of others where you can." },
];

export default function OutdoorsPage() {
  return (
    <>
      <PageHero
        eyebrow="50+ nights a year under the stars"
        title="The Outdoors"
        lede="Scouting happens outdoors. Troop 2/394 runs a campout every month of the year, a week of summer camp each July, and a high adventure trek each summer for older Scouts."
        scene="lake"
        crumb="Outdoors"
      />

      {/* CAMPING PROGRAM */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHead align="left" title="A campout every month" />
            <Reveal delay={70}>
              <div className="prose-troop mt-6">
                <p>
                  Once a month, every month — rain, heat, or snow. Scouts leave{" "}
                  <span className="text-navy">Friday evening</span> and return{" "}
                  <span className="text-navy">Sunday afternoon</span>. Patrols plan the menu, shop
                  for it, cook it, and clean up after it.
                </p>
                <p>
                  Adults camp in a separate area and are there for safety, transport, and coaching
                  — not to run the kitchen. A first-year Scout who has never lit a stove will have
                  cooked dinner for eight people by their third campout.
                </p>
                <p className="mb-0">
                  Cost is typically <strong className="text-navy">$25–$45</strong> per campout,
                  covering food, campsite fees, and fuel. Nobody is left behind for cost.
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={110}>
            <div className="overflow-hidden rounded-xl shadow-xl">
              <Scene name="camping" className="h-[400px] w-full" vivid />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* WHERE WE GO */}
      <Section className="bg-shell">
        <SectionHead
          title="Where we camp"
          lede="Northern California is the whole reason this program works. Everything below is within a half day's drive."
        />
        <div className="mt-11 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {localTrips.map((t, i) => (
            <Reveal key={t.name} delay={i * 80}>
              <div className="group flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-hair transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="h-36 overflow-hidden">
                  <SceneTile
                    name={(["forest", "trail", "lake", "ridge", "night", "camping"] as const)[i % 6]}
                    className="h-full w-full transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-slab text-[18px] font-bold leading-snug text-navy">
                    {t.name}
                  </h3>
                  <p className="mt-1 mb-0 inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[1px] text-mute">
                    <IconPin className="h-3.5 w-3.5" />
                    {t.location}
                  </p>
                  <p className="mt-3 mb-0 flex-1 text-[14px] leading-6 text-slate">{t.blurb}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* SUMMER CAMP */}
      <Section id="summer-camp">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="overflow-hidden rounded-xl shadow-xl">
              <Scene name="lake" className="h-[400px] w-full" vivid />
            </div>
          </Reveal>
          <div>
            <SectionHead align="left" eyebrow="Every July" title="Summer camp" />
            <Reveal delay={80}>
              <div className="prose-troop mt-6">
                <p>
                  Six nights at <strong className="text-navy">{summerCamp.name}</strong>, the
                  council&rsquo;s camp since {summerCamp.since}. {summerCamp.setting}
                </p>
                <p>
                  It is the closest Scouting America camp to Yosemite, set in a historic logging
                  camp and run as a fully themed frontier town. Scouts sleep in patrol sites and
                  work merit badges on something close to a school schedule — cooking, camping,
                  wilderness survival, nature, weather — with shooting sports, sailing, welding,
                  and the observatory in between.
                </p>
                <p>
                  There is a campfire every night, and the week ends with the camp-wide games.{" "}
                  <strong className="text-navy">
                    Troop 394 has taken first place two years running.
                  </strong>
                </p>
                <p className="mb-0">
                  Summer camp does more for a first-year Scout than the other eleven months
                  combined. Talk to the Scoutmaster about cost — the troop&rsquo;s standing policy
                  is that money never keeps a Scout home.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* 2027 camp sessions & fees, as published by the camp */}
      <Section className="bg-shell">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <SectionHead align="left" eyebrow="Planning ahead" title="Camp Hi-Sierra 2027" />
            <Reveal delay={70}>
              <p className="mt-5 mb-0 text-[15px] leading-7 text-slate">
                The camp publishes its sessions a year ahead. Troop 2/394 expects to be at{" "}
                <strong className="text-navy">{summerCamp.troopWeek}</strong> — check with the
                Scoutmaster before booking a family holiday around it.
              </p>
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {summerCamp.weeks2027.map((w) => (
                  <li
                    key={w.week}
                    className="flex items-baseline justify-between gap-3 rounded-lg bg-white px-4 py-3 ring-1 ring-hair"
                  >
                    <span className="font-slab text-[13px] font-bold uppercase tracking-[1px] text-blue">
                      Week {w.week}
                    </span>
                    <span className="text-[14px] text-slate">{w.dates}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 mb-0 text-[13px] leading-6 text-mute">
                Published by the camp at{" "}
                <a
                  href={summerCamp.reserveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue underline underline-offset-4"
                >
                  camphi-sierra.org
                </a>
                . Camp questions go to {summerCamp.contact}.
              </p>
            </Reveal>
          </div>

          <Reveal delay={110}>
            <div className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-hair">
              <h3 className="font-slab text-[13px] font-bold uppercase tracking-[1.6px] text-blue">
                2027 fees
              </h3>
              <ul className="mt-5 divide-y divide-hair border-y border-hair">
                {[
                  ["Youth, in council (with deposit)", `$${summerCamp.fees2027.youthInCouncil}`],
                  ["Youth, booked before 15 Nov", `$${summerCamp.fees2027.youthBeforeNov15}`],
                  ["Youth, booked after 15 Nov", `$${summerCamp.fees2027.youthAfterNov15}`],
                  ["Adult leader", `$${summerCamp.fees2027.adult}`],
                ].map(([k, v]) => (
                  <li key={String(k)} className="flex items-center justify-between gap-4 py-3">
                    <span className="text-[14px] text-slate">{k}</span>
                    <span className="font-slab text-[14px] font-bold text-navy">{v}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 mb-0 text-[13px] leading-6 text-mute">
                {summerCamp.fees2027.adultNote} No Scout is kept home over cost — ask the
                Scoutmaster.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* HIGH ADVENTURE */}
      <Section id="high-adventure" className="bg-navy">
        <SectionHead
          tone="white"
          title="High adventure"
          lede="At fourteen, a Scout becomes eligible for the four national high adventure bases. Troop 2/394 sends a crew to one of them — or a Sierra trek of our own — every summer."
        />
        <div className="mt-11 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {highAdventureBases.map((b, i) => (
            <Reveal key={b.name} delay={i * 90}>
              <a
                href={b.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-lg bg-white/[0.07] ring-1 ring-white/15 transition hover:bg-white/[0.13]"
              >
                <div className="h-32 overflow-hidden">
                  <SceneTile
                    name={(["ridge", "lake", "forest", "eagle"] as const)[i % 4]}
                    className="h-full w-full transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-slab text-[15.5px] font-bold uppercase leading-snug tracking-[0.6px] !text-white">
                    {b.name}
                  </h3>
                  <p className="mt-1 mb-0 text-[11.5px] uppercase tracking-[1px] text-white/60">
                    {b.location}
                  </p>
                  <p className="mt-3 mb-0 flex-1 text-[13px] leading-6 text-white/80">{b.blurb}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
        <Reveal delay={150}>
          <p className="mx-auto mt-10 mb-0 max-w-2xl text-center text-[15px] leading-7 text-white/80">
            High adventure crews are formed roughly eighteen months ahead — Philmont in particular
            runs a lottery. If your Scout is thirteen, now is the time to raise your hand.
          </p>
        </Reveal>
      </Section>

      {/* GEAR */}
      <Section id="gear" className="bg-shell">
        <SectionHead
          title="Gear &amp; packing"
          lede="Do not buy anything before your Scout's first two campouts. Borrow from the troop, find out what they actually use, then spend the money once."
        />
        <div className="mt-11 grid gap-6 md:grid-cols-3">
          {gearList.map((g, i) => (
            <Reveal key={g.category} delay={i * 100}>
              <div className="h-full rounded-lg bg-white p-7 shadow-sm ring-1 ring-hair">
                <h3 className="font-slab text-[13px] font-bold uppercase tracking-[1.6px] text-blue">
                  {g.category}
                </h3>
                <ul className="mt-5 space-y-2.5">
                  {g.items.map((it) => (
                    <li key={it} className="flex gap-2.5 text-[14px] leading-6 text-slate">
                      <IconCheck className="mt-0.5 h-4.5 w-4.5 shrink-0 text-blue" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* LNT */}
      <Section id="leave-no-trace">
        <SectionHead
          title="Leave No Trace"
          lede="Every Scout in Troop 2/394 learns the seven principles and is expected to live them on every outing — not just recite them for a rank requirement."
        />
        <ol className="mt-11 grid gap-5 md:grid-cols-2">
          {lnt.map((p, i) => (
            <Reveal as="li" key={p.n} delay={i * 60}>
              <div className="flex h-full gap-4 rounded-lg border border-hair bg-white p-6 transition hover:border-forest/40 hover:shadow-md">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-forest/12 font-slab text-[15px] font-bold text-forest">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-slab text-[16px] font-bold text-navy">{p.n}</h3>
                  <p className="mt-1.5 mb-0 text-[14px] leading-6 text-slate">{p.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      <CTABand
        title="The next campout is always close"
        body="Prospective families are welcome to come along on a campout as guests before they ever fill out an application. It is the honest way to find out if this fits."
        primary={{ label: "See the calendar", href: "/calendar" }}
        secondary={{ label: "Join the troop", href: "/join" }}
        scene="night"
      />
    </>
  );
}
