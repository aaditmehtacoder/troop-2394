import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHead } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { CTABand } from "@/components/site/CTABand";
import { FleurDeLis, IconCheck } from "@/components/brand/Marks";
import { adultRoles, patrolStructure, troop, troopMission, youthPositions } from "@/data/troop";
import { PhotoTile } from "@/components/photo/PhotoTile";
import { pageHeroPhoto, photo } from "@/data/photos";

export const metadata: Metadata = {
  title: "About Our Troop",
  description: `Who we are: ${troop.longName} of ${troop.city}, California. Patrols, youth leadership, adult volunteers, and troop history.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={`${troop.city}, California`}
        title="About Our Troop"
        lede={`${troop.longName} is a Scout-led troop in ${troop.city}, chartered in the ${troop.district.name} of the ${troop.council.name}.`}
        photo={pageHeroPhoto.about}
        crumb="About"
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <SectionHead align="left" title="Who we are" />
            <Reveal delay={70}>
              <div className="prose-troop mt-6 max-w-none">
                <p>{troopMission}</p>
                <p>
                  In practice that means a Scout in Troop 2/394 spends {troop.meeting.day} evenings
                  with their patrol, one weekend a month in the field, and a week each July at
                  summer camp. They will plan a menu, cook it over a fire, navigate with a map
                  and compass, teach a younger Scout the skill they learned last year, and stand
                  in front of the troop to run a meeting.
                </p>
                <p className="mb-0">
                  Adults do three things: keep it safe, keep it moving, and stay out of the way.
                  Our program is genuinely youth-led, which means it is sometimes messier than an
                  adult would run it, and that is the point.
                </p>
              </div>
            </Reveal>

            <Reveal delay={130}>
              <dl className="mt-9 grid gap-5 sm:grid-cols-2">
                {[
                  ["Chartered", `${troop.founded}`],
                  ["Council", troop.council.name],
                  ["District", troop.district.name],
                  ["Meets", `${troop.meeting.cadence}, ${troop.meeting.time}`],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-lg border border-hair bg-shell p-5">
                    <dt className="font-slab text-[11px] font-bold uppercase tracking-[1.6px] text-blue">
                      {k}
                    </dt>
                    <dd className="mt-1.5 mb-0 text-[15px] leading-6 text-navy">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={110}>
            <div className="overflow-hidden rounded-xl shadow-xl">
              {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized JPEGs, no optimizer */}
<img src={photo("grant-trail").small} alt={photo("grant-trail").alt} loading="lazy" className="h-[420px] w-full object-cover" />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* PATROLS */}
      <Section id="patrols" className="bg-shell">
        <SectionHead
          title="Our patrols"
          lede="The patrol is the basic unit of the troop. Six to ten Scouts who camp together, cook together, and compete together, with their own name, flag, and elected leader."
        />
        <div className="mt-11 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {patrolStructure.map((p, i) => (
            <Reveal key={p.name} delay={i * 90}>
              <div className="flex h-full flex-col rounded-lg bg-white p-6 shadow-sm ring-1 ring-hair transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                <FleurDeLis className="mb-4 h-10 w-auto text-blue" />
                <h3 className="font-slab text-[19px] font-bold leading-snug text-navy">{p.name}</h3>
                <p className="mt-3 mb-0 flex-1 text-[14px] leading-6 text-slate">{p.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* YOUTH LEADERSHIP */}
      <Section id="youth-leadership">
        <SectionHead
          title="Youth leadership"
          lede="Every position below is held by a Scout, elected or appointed by their peers. These are not honorary titles, each one carries real responsibility for how the troop runs."
        />
        <div className="mt-11 grid gap-5 md:grid-cols-2">
          {youthPositions.map((p, i) => (
            <Reveal key={p.role} delay={i * 70}>
              <div className="flex gap-4 rounded-lg border border-hair bg-white p-6 transition hover:border-blue/40 hover:shadow-md">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-blue/10 text-blue">
                  <IconCheck className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-slab text-[17px] font-bold text-navy">{p.role}</h3>
                  <p className="mt-0.5 mb-0 font-slab text-[12px] font-bold uppercase tracking-[1px] text-blue">
                    {p.holder}
                  </p>
                  <p className="mt-1.5 mb-0 text-[14px] leading-6 text-slate">{p.blurb}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ADULT LEADERS */}
      <Section id="adult-leaders" className="bg-navy">
        <SectionHead
          tone="white"
          title="Adult volunteers"
          lede="Troop 2/394 runs on parents. Every registered adult completes Youth Protection Training and a background check before their first campout, and training is free."
        />
        <div className="mt-11 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {adultRoles.map((r, i) => (
            <Reveal key={r.role} delay={i * 70}>
              <div className="h-full rounded-lg bg-white/[0.07] p-6 ring-1 ring-white/15 transition hover:bg-white/[0.12]">
                <h3 className="font-slab text-[16px] font-bold !text-white">{r.role}</h3>
                <p className="mt-2 mb-0 text-[13.5px] leading-6 text-white/75">{r.blurb}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={140}>
          <div className="mt-11 text-center">
            <p className="mx-auto mb-6 max-w-2xl text-[15px] leading-7 text-white/85">
              You do not need to have been a Scout. If you can drive a carload to a trailhead, sit
              on a board of review, or counsel a merit badge in the thing you already do for a
              living, we have a place for you.
            </p>
            <Link href="/contact" className="pill pill-white">
              Talk to the committee
            </Link>
          </div>
        </Reveal>
      </Section>

      {/* HISTORY */}
      <Section id="history">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="overflow-hidden rounded-xl shadow-xl">
              <PhotoTile photo="sequoia-2" className="h-[380px]" />
            </div>
          </Reveal>
          <div>
            <SectionHead align="left" title="Troop history" />
            <Reveal delay={80}>
              <div className="prose-troop mt-6">
                <p>
                  Troop 394 was chartered in <strong className="text-navy">March 1993</strong> by
                  the Santa Clara Elks Lodge #2347, and formed for a simple reason: to give the
                  youth of {troop.city} the best Scouting experience possible. It has met on
                  Tuesday nights ever since. Troop 2394 was added when Scouts BSA opened to
                  girls, and the two run as one linked program, Troop 2/394.
                </p>
                <p>
                  Within its first five years the troop was already recognised as one of the
                  higher-achieving units in the area, earning honours at council and district
                  events and taking the{" "}
                  <strong className="text-navy">Quality Unit Award every year</strong> for
                  activities, advancement, membership, and training.
                </p>
                <p>
                  The trip log tells the rest of the story: an overnight bicycle ride over the
                  mountains to the ocean, a 25-mile day ride to Lexington Reservoir, kayaking,
                  ski trips, the Bear Paw snow campout near Bear Valley, the Pioneer District
                  Camporee, Yosemite in the rain, Moro Rock and the General Sherman tree in
                  Sequoia, wilderness survival on the Monterey coast, service projects at the Elks
                  Lodge, and a week at Camp Hi-Sierra every single July.
                </p>
                <p className="mb-0">
                  What has not changed is the method. The troop&rsquo;s own operating guide still
                  puts it plainly: troop, patrol, and Patrol Leaders&rsquo; Council meetings,
                  camping trips, and day trips are run by the youth leaders, not by the adults.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <CTABand
        title="Come meet the troop"
        body={`We meet ${troop.meeting.cadence.toLowerCase()} at ${troop.meeting.time}. Visitors are welcome any week, just walk in.`}
        primary={{ label: "How to join", href: "/join" }}
        secondary={{ label: "Contact us", href: "/contact" }}
        photo="grant-hills"
      />
    </>
  );
}
