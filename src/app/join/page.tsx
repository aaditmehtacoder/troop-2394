import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHead } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { CTABand } from "@/components/site/CTABand";
import { IconCheck, IconClock, IconMail, IconPin } from "@/components/brand/Marks";
import { dues, faqs, feederPack, joinSteps, troop } from "@/data/troop";
import { PhotoTile } from "@/components/photo/PhotoTile";
import { pageHeroPhoto } from "@/data/photos";

export const metadata: Metadata = {
  title: "Join Troop 2/394",
  description: `How to join Scouts BSA Troop 2/394 in ${troop.city}, California, visit a meeting, come on a campout, and get registered. Costs, requirements, and answers to the questions every new family asks.`,
};

export default function JoinPage() {
  return (
    <>
      <PageHero
        eyebrow={`${troop.city}, California`}
        title="Join Troop 2/394"
        lede={`Any ${troop.meeting.day}, ${troop.meeting.time}. No forms, no uniform, no commitment, walk in and watch a meeting.`}
        photo={pageHeroPhoto.join}
        crumb="Join"
      />

      {/* HOW */}
      <Section>
        <SectionHead
          title="How to join"
          lede="Five steps, and the first two cost nothing."
        />

        <ol className="mt-12 space-y-5">
          {joinSteps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 90}>
              <div className="flex gap-6 rounded-lg border border-hair bg-white p-7 transition hover:border-blue/40 hover:shadow-lg">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-navy font-slab text-[18px] font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-slab text-[20px] font-bold text-navy">{s.title}</h3>
                  <p className="mt-2 mb-0 text-[15px] leading-7 text-slate">{s.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* WHERE / WHEN */}
      <Section className="bg-shell">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHead align="left" title="When and where we meet" />
            <Reveal delay={70}>
              <ul className="mt-7 space-y-5">
                <li className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-navy text-white">
                    <IconClock className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-slab text-[15px] font-bold text-navy">
                      {troop.meeting.cadence}
                    </span>
                    <span className="block text-[14.5px] text-slate">{troop.meeting.time}</span>
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-navy text-white">
                    <IconPin className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-slab text-[15px] font-bold text-navy">
                      {troop.meeting.venue}
                    </span>
                    <span className="block text-[14.5px] text-slate">{troop.meeting.address}</span>
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-navy text-white">
                    <IconMail className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-slab text-[15px] font-bold text-navy">
                      Tell us you&rsquo;re coming
                    </span>
                    <a
                      href={`mailto:${troop.contact.newMemberEmail}`}
                      className="block text-[14.5px] text-blue underline-offset-4 hover:underline"
                    >
                      {troop.contact.newMemberEmail}
                    </a>
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-navy text-white">
                    <IconClock className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-slab text-[15px] font-bold text-navy">
                      Or just turn up
                    </span>
                    <span className="block text-[14.5px] text-slate">
                      Any {troop.meeting.day}, {troop.meeting.time}. No forms, no uniform, no
                      commitment.
                    </span>
                  </span>
                </li>
              </ul>
            </Reveal>
          </div>

          <Reveal delay={110}>
            <div className="overflow-hidden rounded-xl shadow-xl">
              <PhotoTile photo="pinnacles-hiker" className="h-[400px]" position="center 30%" />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* WHO */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHead align="left" title="Who can join" />
            <Reveal delay={70}>
              <div className="prose-troop mt-6">
                <p>
                  Scouts BSA is for youth who have{" "}
                  <strong className="text-navy">
                    completed the fifth grade, or are 11 years old, or have earned the Arrow of
                    Light
                  </strong>{" "}, through age 17.
                </p>
                <p>
                  Younger children join a Cub Scout pack instead. If your child is in kindergarten
                  through fifth grade, tell us and we will connect you with a pack in{" "}
                  {troop.city}.
                </p>
                <p className="mb-0">
                  Youth over 18 who want to stay involved can register as an adult leader, or join
                  a Venturing crew (co-ed, ages 14–20).
                </p>
              </div>
            </Reveal>
          </div>

          {/* COST */}
          <Reveal delay={110}>
            <div id="cost" className="scroll-mt-[130px] rounded-xl border border-hair bg-white p-8 shadow-sm">
              <h3 className="font-slab text-[13px] font-bold uppercase tracking-[1.6px] text-blue">
                What it costs
              </h3>
              <p className="mt-4 mb-0 font-slab text-[42px] font-bold leading-none text-navy">
                ${dues.joinCost}
                <span className="ml-2 align-middle font-sans text-[14px] font-normal text-mute">
                  per year
                </span>
              </p>

              <p className="mt-5 mb-0 text-[13.5px] leading-6 text-mute">{dues.note}</p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* LINKED TROOP + FEEDER PACK */}
      <Section id="linked-troop">
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col rounded-xl border-l-4 border-forest bg-white p-8 shadow-sm ring-1 ring-hair">
              <p className="mb-2 font-slab text-[11px] font-bold uppercase tracking-[1.4px] text-forest">
                Our linked troop
              </p>
              <h2 className="font-slab text-[22px] font-bold text-navy">
                Troop {troop.linkedTroop.number}
              </h2>
              <p className="mt-3 mb-0 flex-1 text-[15px] leading-7 text-slate">
                {troop.linkedTroop.note} Scouts BSA troops are single-gender, so the two run as
                one linked program, same night, same place, same campouts, which is why we
                brand ourselves Troop {troop.displayNumber}.
              </p>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <div className="flex h-full flex-col rounded-xl border-l-4 border-gold bg-white p-8 shadow-sm ring-1 ring-hair">
              <p className="mb-2 font-slab text-[11px] font-bold uppercase tracking-[1.4px] text-[#7a6212]">
                Younger than fifth grade?
              </p>
              <h2 className="font-slab text-[22px] font-bold text-navy">{feederPack.name}</h2>
              <p className="mt-3 mb-0 flex-1 text-[15px] leading-7 text-slate">{feederPack.note}</p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* FOR PARENTS */}
      <Section id="for-parents" className="bg-navy text-white">
        <div className="grid items-start gap-12 lg:grid-cols-[1.15fr_1fr]">
          <Reveal>
            <div>
              <p className="rule-gold mb-3 font-slab text-[12px] font-bold uppercase tracking-[2.4px] text-gold">
                For parents
              </p>
              <h2 className="mt-0 mb-5 font-slab text-[clamp(26px,3.6vw,38px)] font-bold uppercase leading-tight !text-white">
                We need you too
              </h2>
              <div className="space-y-4 text-[16px] leading-7 text-white/85">
                <p className="m-0">
                  Scouting is not a drop-off activity. The Scouts plan and run the programme
                  themselves, which is the whole point, but none of it happens without adults
                  behind them: drivers to a trailhead, a second adult on every outing, someone to
                  count the money, someone to keep the trailer stocked.
                </p>
                <p className="m-0">
                  So we ask for one thing when a family joins, and we ask it plainly:{" "}
                  <strong className="font-semibold text-white">
                    every Scout comes with one parent who volunteers.
                  </strong>{" "}
                  Not every week, and not on a committee unless you want to be. One job you can
                  actually do, in a year that has room for it.
                </p>
                <p className="m-0">
                  Parents who take a turn tend to say the same thing afterwards: they got to see
                  their own child somewhere the child was in charge, which is not something you
                  get many chances at.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <div className="rounded-xl bg-white/[0.07] p-7 ring-1 ring-white/15">
              <h3 className="mt-0 mb-1 font-slab text-[18px] font-bold !text-white">
                What that can look like
              </h3>
              <p className="mt-0 mb-5 text-[14px] leading-6 text-white/70">
                Pick one. Any one of these covers it for the year.
              </p>
              <ul className="m-0 grid list-none gap-2.5 p-0">
                {[
                  "Drive to one outing and stay the weekend",
                  "Be the second adult on a campout, so it can go ahead at all",
                  "Cook or shop for one weekend of food",
                  "Run one merit badge in the thing you already do for a living",
                  "Help at the pancake breakfast, the troop's own fundraiser",
                  "Keep the calendar, the roster, or the trailer in order",
                ].map((v) => (
                  <li key={v} className="flex gap-3 text-[15px] leading-6 text-white/90">
                    <IconCheck className="mt-1 h-4 w-4 shrink-0 text-gold" />
                    {v}
                  </li>
                ))}
              </ul>
              <p className="mb-0 mt-6 text-[14px] leading-6 text-white/70">
                Every adult who works with Scouts takes free Youth Protection Training first, and
                no adult is ever alone with a Scout who is not their own. That is the rule, and it
                is not negotiable.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-shell">
        <SectionHead
          title="Questions every new family asks"
          lede="If yours is not here, email us. We would rather answer it than have you guess."
        />
        <div className="mx-auto mt-11 max-w-3xl space-y-3">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 60}>
              <details className="group rounded-lg border border-hair bg-white px-6 py-1 transition hover:border-blue/40 open:shadow-md">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-slab text-[16.5px] font-bold text-navy marker:hidden [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span
                    aria-hidden
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-hair text-[18px] leading-none text-blue transition group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mb-5 mt-0 text-[15px] leading-7 text-slate">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-11 text-center">
            <Link href="/contact" className="pill pill-navy">
              Ask us anything
            </Link>
          </div>
        </Reveal>
      </Section>

      <CTABand
        title="The next meeting is this week"
        body={`${troop.meeting.cadence}, ${troop.meeting.time}, at ${troop.meeting.venue}. Come as you are.`}
        primary={{ label: "Get directions", href: "/contact#directions" }}
        secondary={{ label: "See the calendar", href: "/calendar" }}
        photo="campfire"
      />
    </>
  );
}
