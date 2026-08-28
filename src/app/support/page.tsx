import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHead } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { CTABand } from "@/components/site/CTABand";
import { IconArrow, IconCheck } from "@/components/brand/Marks";
import { troop } from "@/data/troop";

export const metadata: Metadata = {
  title: "Support the Troop",
  description:
    "Ways to support Scouts BSA Troop 2/394 — camperships, gear, merit badge counseling, and volunteering your time.",
};

const ways = [
  {
    t: "Fund a campership",
    amount: "A week",
    d: "Sends one Scout to a full week of summer camp who could not otherwise go. This is the single highest-leverage gift to the troop — summer camp is where first-year Scouts decide to stay.",
    tone: "navy",
  },
  {
    t: "Sponsor a Scout's year",
    amount: "$165",
    d: "Covers a Scout's national registration, council fee, and troop dues for a full program year.",
    tone: "blue",
  },
  {
    t: "Outfit a new Scout",
    amount: "$220",
    d: "Handbook, field uniform, pack, and sleeping bag for a Scout joining without gear.",
    tone: "forest",
  },
  {
    t: "Keep the trailer rolling",
    amount: "Any amount",
    d: "Tents, stoves, Dutch ovens, and the trailer that hauls them. Troop gear is used forty weekends a year and wears out honestly.",
    tone: "tan",
  },
] as const;

const toneClass = {
  navy: "border-navy",
  blue: "border-blue",
  forest: "border-forest",
  tan: "border-gold",
} as const;

const nonMoney = [
  {
    t: "Counsel a merit badge",
    d: "You already know something a Scout wants to learn — welding, programming, law, medicine, cooking, chess. Register as a counselor and give two evenings a year.",
  },
  {
    t: "Drive to a campout",
    d: "The most-needed and least-glamorous contribution there is. Two hours of driving, a background check, and Youth Protection Training.",
  },
  {
    t: "Sit on a board of review",
    d: "Three adults, thirty minutes, once a month. You do not need Scouting experience — you need to be willing to listen to a nervous twelve-year-old.",
  },
  {
    t: "Join the committee",
    d: "Treasurer, advancement, activities, fundraising, or membership. A few hours a month keeps the whole thing running.",
  },
];

export default function SupportPage() {
  return (
    <>
      <PageHero
        eyebrow="Every dollar stays local"
        title="Support Troop 2/394"
        lede="This troop is run entirely by volunteers. What you give goes to camperships, gear, and getting Scouts outdoors — nothing else."
        scene="eagle"
        crumb="Support"
      />

      <Section>
        <SectionHead
          title="Ways to give"
          lede="We do not run a general fund. Every gift is tied to something specific, and we will tell you exactly what it paid for."
        />

        <div className="mt-11 grid gap-6 md:grid-cols-2">
          {ways.map((w, i) => (
            <Reveal key={w.t} delay={i * 90}>
              <div
                className={`flex h-full flex-col rounded-lg border-l-4 bg-white p-8 shadow-sm ring-1 ring-hair transition hover:-translate-y-1 hover:shadow-lg ${toneClass[w.tone]}`}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="font-slab text-[21px] font-bold text-navy">{w.t}</h3>
                  <span className="font-slab text-[24px] font-bold leading-none text-blue">
                    {w.amount}
                  </span>
                </div>
                <p className="mt-3 mb-0 flex-1 text-[15px] leading-7 text-slate">{w.d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-11 rounded-xl bg-shell p-8 text-center">
            <h3 className="h-four">Ready to give?</h3>
            <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-7 text-slate">
              Contact the troop treasurer and we will set it up — check, transfer, or an employer
              matching program. Gifts to the troop through our chartered organization may be
              tax-deductible; ask and we will send you the details.
            </p>
            <a href={`mailto:${troop.contact.email}?subject=Supporting%20Troop%20394`} className="pill pill-navy mt-7">
              Contact the treasurer
              <IconArrow className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </Section>

      <Section className="bg-navy">
        <SectionHead
          tone="white"
          title="Give time instead"
          lede="Honestly, this is worth more than money. The constraint on how many Scouts Troop 2/394 can serve is adults, not dollars."
        />
        <div className="mt-11 grid gap-6 md:grid-cols-2">
          {nonMoney.map((n, i) => (
            <Reveal key={n.t} delay={i * 90}>
              <div className="flex h-full gap-4 rounded-lg bg-white/[0.07] p-7 ring-1 ring-white/15 transition hover:bg-white/[0.12]">
                <IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-white/70" />
                <div>
                  <h3 className="font-slab text-[17px] font-bold !text-white">{n.t}</h3>
                  <p className="mt-2 mb-0 text-[14px] leading-6 text-white/80">{n.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="h-sub">Also worth supporting</h2>
            <p className="mt-4 text-[15px] leading-7 text-slate">
              Troop 2/394 is one unit inside a much larger organization. If you would rather give at
              the council or national level, both do work we depend on — council camps, training,
              and the professional staff who keep units chartered.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={troop.council.url}
                target="_blank"
                rel="noopener noreferrer"
                className="pill pill-outline"
              >
                {troop.council.abbr}
              </a>
              <a
                href="https://donations.scouting.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="pill pill-outline"
              >
                Scouting America
              </a>
            </div>
          </div>
        </Reveal>
      </Section>

      <CTABand
        title="Thank you"
        body={`Troop 2/394 has been running on volunteer time and local generosity since ${troop.founded}. It genuinely does not work any other way.`}
        primary={{ label: "Contact us", href: "/contact" }}
        secondary={{ label: "About the troop", href: "/about" }}
        scene="camping"
      />
    </>
  );
}
