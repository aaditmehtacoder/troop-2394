import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHead } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { CTABand } from "@/components/site/CTABand";
import { FleurDeLis, IconArrow, IconCheck } from "@/components/brand/Marks";
import {
  eagleHonorRoll,
  eagleProjectNicky,
  eagleProjects,
  eagleSteps,
  ranks,
  troop,
} from "@/data/troop";
import { pageHeroPhoto } from "@/data/photos";

export const metadata: Metadata = {
  title: "Advancement",
  description:
    "The Trail to Eagle in Troop 2/394, ranks, merit badges, boards of review, and Eagle Scout projects.",
};

const meritBadgeGroups = [
  {
    group: "Eagle-required",
    badges: [
      "First Aid",
      "Citizenship in the Community",
      "Citizenship in the Nation",
      "Citizenship in the World",
      "Citizenship in Society",
      "Communication",
      "Cooking",
      "Personal Fitness",
      "Emergency Preparedness or Lifesaving",
      "Environmental Science or Sustainability",
      "Personal Management",
      "Swimming, Hiking, or Cycling",
      "Camping",
      "Family Life",
    ],
  },
  {
    group: "Popular at Troop 2/394",
    badges: [
      "Wilderness Survival",
      "Orienteering",
      "Climbing",
      "Kayaking",
      "Astronomy",
      "Programming",
      "Robotics",
      "Welding",
      "Fish & Wildlife Management",
      "Search & Rescue",
      "Backpacking",
      "Space Exploration",
    ],
  },
];

export default function AdvancementPage() {
  return (
    <>
      <PageHero
        eyebrow="Scout to Eagle"
        title="Advancement"
        lede="Advancement is one of Scouting's eight methods, not the point of the program, but the visible record of a Scout growing into it."
        photo={pageHeroPhoto.advancement}
        crumb="Advancement"
      />

      {/* RANKS */}
      <Section id="ranks">
        <SectionHead
          title="The seven ranks"
          lede="A Scout advances at their own pace. The first four ranks are about outdoor skills; the last three are about leadership and service."
        />

        <div className="mt-12">
          <ol className="relative space-y-4 before:absolute before:left-[27px] before:top-4 before:bottom-4 before:w-[2px] before:bg-hair md:before:left-[31px]">
            {ranks.map((r, i) => (
              <Reveal as="li" key={r.name} delay={i * 70}>
                <div className="relative flex gap-5">
                  <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full bg-navy text-white ring-4 ring-white md:h-16 md:w-16">
                    <FleurDeLis className="h-7 w-auto text-white" />
                  </span>
                  <div className="flex-1 rounded-lg border border-hair bg-white p-6 transition hover:border-blue/40 hover:shadow-md">
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <h3 className="font-slab text-[21px] font-bold text-navy">{r.name}</h3>
                      <span className="rounded-full bg-shell px-3 py-1 text-[11.5px] font-bold uppercase tracking-[1px] text-mute">
                        Typically {r.typical}
                      </span>
                    </div>
                    <p className="mt-2 mb-0 text-[15px] leading-6 text-slate">{r.blurb}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      {/* MERIT BADGES */}
      <Section id="merit-badges" className="bg-shell">
        <SectionHead
          title="Merit badges"
          lede="There are more than 135 merit badges. Twenty-one are needed for Eagle, fourteen of them from a required list. Each one is earned with a registered counselor, often a parent in the troop who does that work for a living."
        />

        <div className="mt-11 grid gap-8 lg:grid-cols-2">
          {meritBadgeGroups.map((g, i) => (
            <Reveal key={g.group} delay={i * 110}>
              <div className="h-full rounded-lg bg-white p-7 shadow-sm ring-1 ring-hair">
                <h3 className="font-slab text-[13px] font-bold uppercase tracking-[1.6px] text-blue">
                  {g.group}
                </h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {g.badges.map((b) => (
                    <li
                      key={b}
                      className="rounded-full border border-hair bg-shell px-3.5 py-1.5 text-[13px] text-slate transition hover:border-blue/40 hover:text-navy"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <div className="mt-10 text-center">
            <a
              href="https://www.scouting.org/skills/merit-badges/"
              target="_blank"
              rel="noopener noreferrer"
              className="pill pill-outline"
            >
              All merit badge requirements
            </a>
          </div>
        </Reveal>
      </Section>

      {/* BOARDS OF REVIEW */}
      <Section id="boards-of-review">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHead align="left" title="Scoutmaster conferences &amp; boards of review" />
            <Reveal delay={70}>
              <div className="prose-troop mt-6">
                <p>
                  Every rank ends the same way: a Scoutmaster conference, then a board of review.
                  Neither is a test. The conference is a conversation about how Scouting is going.
                  The board is three adults from the committee asking what the Scout learned and
                  what they want to do next.
                </p>
                <p className="mb-0">
                  Troop 2/394 holds boards of review on the{" "}
                  <strong className="text-navy">first {troop.meeting.day} of every month</strong>{" "}
                  so no Scout waits more than four weeks. Sign up with the Advancement Chair the
                  week before.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={110}>
            <div className="rounded-lg border-l-4 border-blue bg-blue/[0.06] p-7">
              <h3 className="font-slab text-[17px] font-bold text-navy">
                How to prepare for a board of review
              </h3>
              <ul className="mt-5 space-y-3">
                {[
                  "Bring your handbook with every requirement signed off",
                  "Wear the full field uniform. This is the one time it matters",
                  "Be able to say the Oath and Law, and say what one point means to you",
                  "Come with a plan for your next rank, even a rough one",
                  "Relax. Nobody has ever failed a board of review for being nervous.",
                ].map((t) => (
                  <li key={t} className="flex gap-3 text-[14.5px] leading-6 text-slate">
                    <IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* EAGLE */}
      <Section id="eagle" className="bg-navy">
        <SectionHead
          tone="white"
          title="The Trail to Eagle"
          lede="Roughly six percent of Scouts reach Eagle. Every Life Scout in Troop 2/394 is assigned an Eagle mentor from the committee the day they earn Life, because the drop-off happens in the gap, not on the project."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {eagleSteps.map((s, i) => (
            <Reveal key={s.step} delay={i * 80}>
              <div className="flex h-full flex-col rounded-lg bg-white/[0.07] p-6 ring-1 ring-white/15 transition hover:bg-white/[0.12]">
                <span className="mb-3 font-slab text-[28px] font-bold leading-none text-white/35">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-slab text-[16px] font-bold leading-snug !text-white">
                  {s.step}
                </h3>
                <p className="mt-2 mb-0 text-[13.5px] leading-6 text-white/75">{s.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Real Troop 2/394 Eagle projects, as reported by The Silicon Valley Voice. */}
        <div className="mt-14">
          <Reveal>
            <h3 className="text-center font-slab text-[13px] font-bold uppercase tracking-[2px] text-white/70">
              Eagle projects from our own troop
            </h3>
          </Reveal>
          <div className="mt-7 grid gap-6 lg:grid-cols-2">
            {eagleProjects.map((e, i) => (
              <Reveal key={e.name} delay={i * 110}>
                <article className="flex h-full flex-col rounded-lg bg-white p-8 shadow-lg">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h4 className="font-slab text-[21px] font-bold text-navy">{e.name}</h4>
                    <span className="rounded-full bg-shell px-3 py-1 text-[11.5px] font-bold uppercase tracking-[1px] text-mute">
                      Eagle {e.year}
                    </span>
                  </div>
                  <p className="mt-2 mb-0 font-slab text-[15.5px] font-bold leading-snug text-blue">
                    {e.headline}
                  </p>
                  <p className="mt-4 mb-0 flex-1 text-[14.5px] leading-7 text-slate">{e.detail}</p>
                  <p className="mt-5 mb-0 border-t border-hair pt-4 text-[13px] leading-6 text-mute">
                    {e.honor}{" "}
                    <a
                      href={e.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue underline underline-offset-4"
                    >
                      Silicon Valley Voice
                    </a>
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={130}>
          <div className="mt-6 rounded-lg border-l-4 border-gold bg-white/[0.09] p-7">
            <p className="mb-1 font-slab text-[11px] font-bold uppercase tracking-[1.4px] text-white/65">
              {eagleProjectNicky.year} · Reported by The Silicon Valley Voice
            </p>
            <h4 className="font-slab text-[19px] font-bold !text-white">
              {eagleProjectNicky.name}, {eagleProjectNicky.headline}
            </h4>
            <p className="mt-3 mb-0 text-[14px] leading-7 text-white/80">
              {eagleProjectNicky.detail}
            </p>
            <p className="mt-3 mb-0 text-[14px] italic leading-7 text-white/70">
              &ldquo;{eagleProjectNicky.quote}&rdquo;
            </p>
            <p className="mt-3 mb-0 text-[12.5px] text-white/55">{eagleProjectNicky.honor}</p>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-12 rounded-lg bg-white/[0.06] p-8 ring-1 ring-white/15">
            <h3 className="font-slab text-[22px] font-bold !text-white">Eagle honor roll</h3>
            <p className="mt-2 mb-6 max-w-2xl text-[15px] leading-7 text-white/75">
              Every Eagle Scout we can source, from the troop&rsquo;s own records and the
              council&rsquo;s published recognition programmes. If a name is missing, tell us and we
              will put it right.
            </p>

            <ul className="m-0 grid list-none gap-x-8 gap-y-2 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {eagleHonorRoll.map((e) => (
                <li
                  key={`${e.name}-${e.year}`}
                  className="flex items-baseline justify-between gap-3 border-b border-white/10 py-2"
                >
                  <span className="text-[15px] text-white/90">
                    {e.name}
                    {e.troop === "2394" ? (
                      <span className="ml-1.5 text-[12px] text-gold">2394</span>
                    ) : null}
                  </span>
                  <span className="shrink-0 font-slab text-[13px] font-bold text-white/55">
                    {e.year}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>


        <Reveal delay={160}>
          <div className="mt-12 rounded-lg bg-white/[0.07] p-8 text-center ring-1 ring-white/15">
            <p className="mx-auto mb-6 max-w-2xl text-[15px] leading-7 text-white/85">
              The single most common reason a Scout misses Eagle is running out of clock. Every
              requirement must be complete before the Scout&rsquo;s 18th birthday. Start the
              project workbook at Life, not at seventeen.
            </p>
            <a
              href="https://www.scouting.org/programs/scouts-bsa/advancement-and-awards/eagle-scout-workbook/"
              target="_blank"
              rel="noopener noreferrer"
              className="pill pill-white"
            >
              Eagle Scout workbook
              <IconArrow className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </Section>

      <CTABand
        title="Track it all in Scoutbook"
        body="Advancement, attendance, merit badge progress, and payments all live in Scoutbook. Every Scout and parent gets an account on their first night."
        primary={{ label: "Open Scoutbook", href: "https://scoutbook.scouting.org/" }}
        secondary={{ label: "Forms & resources", href: "/resources" }}
        photo="glacier-point"
      />
    </>
  );
}
