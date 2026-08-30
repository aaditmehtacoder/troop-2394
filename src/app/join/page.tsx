import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHead } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { CTABand } from "@/components/site/CTABand";
import { Scene } from "@/components/brand/Scenes";
import { IconClock, IconMail, IconPhone, IconPin } from "@/components/brand/Marks";
import { dues, faqs, feederPack, joinSteps, troop } from "@/data/troop";

export const metadata: Metadata = {
  title: "Join Troop 2/394",
  description: `How to join Scouts BSA Troop 2/394 in ${troop.city}, California — visit a meeting, come on a campout, and get registered. Costs, requirements, and answers to the questions every new family asks.`,
};

export default function JoinPage() {
  return (
    <>
      <PageHero
        eyebrow={`${troop.city}, California`}
        title="Join Troop 2/394"
        lede={`Any ${troop.meeting.day}, ${troop.meeting.time}. No forms, no uniform, no commitment — walk in and watch a meeting.`}
        scene="forest"
        crumb="Join"
      />

      {/* HOW */}
      <Section>
        <SectionHead
          title="How to join"
          lede="Five steps, and the first two cost nothing. Most families take about a month to work through them."
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
                    <IconPhone className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-slab text-[15px] font-bold text-navy">
                      Or just call
                    </span>
                    <a
                      href={`tel:${troop.contact.phone.replace(/[^0-9+]/g, "")}`}
                      className="block text-[14.5px] text-blue underline-offset-4 hover:underline"
                    >
                      {troop.contact.phone}
                    </a>
                  </span>
                </li>
              </ul>
            </Reveal>
          </div>

          <Reveal delay={110}>
            <div className="overflow-hidden rounded-xl shadow-xl">
              <Scene name="leadership" className="h-[400px] w-full" vivid />
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
                  </strong>{" "}
                  — through age 17.
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

              <ul className="mt-6 divide-y divide-hair border-y border-hair">
                {dues.breakdown.map((b) => (
                  <li key={b.item} className="flex items-center justify-between gap-4 py-3">
                    <span className="text-[14px] text-slate">{b.item}</span>
                    <span className="font-slab text-[14px] font-bold text-navy">${b.amount}</span>
                  </li>
                ))}
              </ul>

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
                one linked program — same night, same place, same campouts — which is why we
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
              <p className="mt-3 mb-0 flex-1 text-[15px] leading-7 text-slate">
                {feederPack.note} The pack is chartered by {feederPack.charterOrg}, serves{" "}
                {feederPack.serves}, and meets at {feederPack.meets}.
              </p>
              <a
                href={feederPack.url}
                target="_blank"
                rel="noopener noreferrer"
                className="pill pill-outline mt-6 self-start"
              >
                Visit Pack 54
              </a>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-shell">
        <SectionHead
          title="Questions every new family asks"
          lede="If yours is not here, email us — we would rather answer it than have you guess."
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
        scene="camping"
      />
    </>
  );
}
