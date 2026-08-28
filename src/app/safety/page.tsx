import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHead } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { CTABand } from "@/components/site/CTABand";
import { IconCheck, IconShield, IconPhone, IconMail } from "@/components/brand/Marks";
import { troop } from "@/data/troop";

export const metadata: Metadata = {
  title: "Scouting Safely",
  description:
    "Troop 2/394's safety commitment — Youth Protection Training, two-deep leadership, health forms, and how to report a concern.",
};

const commitments = [
  {
    t: "Every adult is trained and screened",
    d: "Youth Protection Training and a criminal background check are required before any adult is registered — and YPT is renewed every two years, no exceptions.",
  },
  {
    t: "Two-deep leadership, always",
    d: "At least two registered adult leaders, one of them 21 or older, are present at every meeting, campout, and activity. One-on-one contact between an adult and a Scout is prohibited.",
  },
  {
    t: "Separate accommodations",
    d: "Adults and youth sleep in separate tents. Scouts tent with a Scout of similar age. Separate shower and restroom facilities are used at all times.",
  },
  {
    t: "Parents may attend anything",
    d: "There are no closed activities. A parent or guardian may observe any Troop 2/394 meeting or activity at any time, unannounced.",
  },
  {
    t: "Digital contact stays in the open",
    d: "Adult–Scout communication happens in group channels with another adult present. No private messaging between an adult and a Scout.",
  },
  {
    t: "Trained for the activity",
    d: "Swim and boating activities follow Safe Swim Defense and Safety Afloat. Climbing follows Climb On Safely. Trek leaders carry current Wilderness First Aid and CPR.",
  },
];

export default function SafetyPage() {
  return (
    <>
      <PageHero
        eyebrow="Non-negotiable"
        title="Scouting Safely"
        lede="In Scouting we will not compromise the safety of our youth, volunteers, and employees. This page is the short version of what that means in Troop 2/394."
        scene="night"
        crumb="Safety"
      />

      <Section>
        <SectionHead
          title="Our safety commitment"
          lede="These are not troop preferences. They are Scouting America's Barriers to Abuse, and they are enforced here without exception."
        />
        <div className="mt-11 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {commitments.map((c, i) => (
            <Reveal key={c.t} delay={i * 80}>
              <div className="flex h-full flex-col rounded-lg border border-hair bg-white p-7 transition hover:border-blue/40 hover:shadow-lg">
                <span className="mb-4 grid h-11 w-11 place-items-center rounded-full bg-navy text-white">
                  <IconShield className="h-5.5 w-5.5" />
                </span>
                <h3 className="font-slab text-[17px] font-bold leading-snug text-navy">{c.t}</h3>
                <p className="mt-2.5 mb-0 text-[14px] leading-6 text-slate">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="youth-protection" className="bg-shell">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHead align="left" title="Youth Protection Training" />
            <Reveal delay={70}>
              <div className="prose-troop mt-6">
                <p>
                  Youth Protection Training is required for every registered adult in Troop 2/394 —
                  Scoutmasters, committee members, merit badge counselors, and anyone driving to a
                  campout or staying overnight.
                </p>
                <p>
                  It takes about ninety minutes, it is free, and it is done online at{" "}
                  <a
                    className="text-blue underline underline-offset-4"
                    href="https://my.scouting.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    my.scouting.org
                  </a>
                  . Certification expires after two years.
                </p>
                <p className="mb-0">
                  Parents are strongly encouraged to take it even if they never register. It is the
                  clearest explanation you will find of what to watch for and what to do.
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <a
                href="https://www.scouting.org/training/youth-protection/"
                target="_blank"
                rel="noopener noreferrer"
                className="pill pill-outline mt-7"
              >
                Take Youth Protection Training
              </a>
            </Reveal>
          </div>

          <div id="two-deep">
            <SectionHead align="left" title="Two-deep leadership" />
            <Reveal delay={90}>
              <ul className="mt-6 space-y-3.5">
                {[
                  "Two registered adult leaders at every activity, one aged 21 or over",
                  "One-on-one contact between adults and Scouts is prohibited — in person, online, and by phone",
                  "All adults present at a Scouting activity must be registered and YPT-current",
                  "At least one adult of the same gender as the Scouts is present on overnight activities",
                  "Adults and Scouts use separate sleeping and restroom facilities",
                  "Any adult may — and must — intervene if a rule is being broken",
                ].map((t) => (
                  <li key={t} className="flex gap-3 text-[15px] leading-6 text-slate">
                    <IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue" />
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section id="health-forms">
        <SectionHead
          title="Health forms"
          lede="The Annual Health and Medical Record is required for every Scout and every adult. No form, no campout — this one is not flexible."
        />
        <div className="mt-11 grid gap-6 md:grid-cols-3">
          {[
            {
              t: "Parts A & B",
              d: "Informed consent and a health history. Required for every Scout and adult, every year, for any activity.",
              who: "Everyone, annually",
            },
            {
              t: "Part C",
              d: "A physical exam signed by a licensed health-care provider. Required for any event longer than 72 hours — summer camp, treks, and jamborees.",
              who: "Summer camp & high adventure",
            },
            {
              t: "Where it goes",
              d: `Give the completed form to the Advancement Chair or bring it to a ${troop.meeting.day} meeting. The troop keeps copies in a locked box that travels with the trailer.`,
              who: "Turn in before the trip",
            },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 90}>
              <div className="h-full rounded-lg border-l-4 border-blue bg-blue/[0.05] p-7">
                <p className="mb-2 font-slab text-[11px] font-bold uppercase tracking-[1.4px] text-blue">
                  {c.who}
                </p>
                <h3 className="font-slab text-[18px] font-bold text-navy">{c.t}</h3>
                <p className="mt-2.5 mb-0 text-[14px] leading-6 text-slate">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={140}>
          <div className="mt-10 text-center">
            <a
              href="https://www.scouting.org/health-and-safety/ahmr/"
              target="_blank"
              rel="noopener noreferrer"
              className="pill pill-navy"
            >
              Download the health record
            </a>
          </div>
        </Reveal>
      </Section>

      {/* REPORT */}
      <Section id="report" className="bg-navy">
        <SectionHead
          tone="white"
          title="Report a concern"
          lede="If you see or suspect abuse or a violation of Youth Protection policy, you are required to act. Do not investigate it yourself, and do not wait to be sure."
        />

        <div className="mx-auto mt-11 grid max-w-4xl gap-5 md:grid-cols-3">
          <Reveal>
            <div className="h-full rounded-lg bg-red p-7 text-center">
              <p className="mb-1 font-slab text-[11px] font-bold uppercase tracking-[1.6px] text-white/80">
                Immediate danger
              </p>
              <p className="mb-2 font-slab text-[32px] font-bold leading-none !text-white">911</p>
              <p className="mb-0 text-[13px] leading-5 text-white/85">
                Call local law enforcement first, always.
              </p>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <div className="h-full rounded-lg bg-white/[0.09] p-7 text-center ring-1 ring-white/20">
              <p className="mb-1 font-slab text-[11px] font-bold uppercase tracking-[1.6px] text-white/70">
                Scouts First Helpline
              </p>
              <a
                href="tel:18447268871"
                className="mb-2 block font-slab text-[19px] font-bold !text-white underline-offset-4 hover:underline"
              >
                1-844-SCOUTS1
              </a>
              <p className="mb-0 text-[13px] leading-5 text-white/80">
                Staffed 24/7 by Scouting America. Call for any youth safety concern.
              </p>
            </div>
          </Reveal>

          <Reveal delay={180}>
            <div className="h-full rounded-lg bg-white/[0.09] p-7 text-center ring-1 ring-white/20">
              <p className="mb-1 font-slab text-[11px] font-bold uppercase tracking-[1.6px] text-white/70">
                Troop 2/394
              </p>
              <a
                href={`mailto:${troop.contact.scoutmasterEmail}`}
                className="mb-2 block break-words font-slab text-[14px] font-bold !text-white underline-offset-4 hover:underline"
              >
                {troop.contact.scoutmasterEmail}
              </a>
              <p className="mb-0 text-[13px] leading-5 text-white/80">
                Reach the Scoutmaster and Committee Chair directly.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={230}>
          <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-3">
            <a
              href="https://www.scouting.org/health-and-safety/incident-report/"
              target="_blank"
              rel="noopener noreferrer"
              className="pill pill-white"
            >
              <IconMail className="h-4 w-4" />
              File an incident report
            </a>
            <a href={`tel:${troop.contact.phone.replace(/[^0-9+]/g, "")}`} className="pill pill-ghost">
              <IconPhone className="h-4 w-4" />
              Call the troop
            </a>
          </div>
        </Reveal>
      </Section>

      <CTABand
        title="Read the Guide to Safe Scouting"
        body="Every activity Troop 2/394 runs is governed by it. It is worth twenty minutes of any Scout parent's time."
        primary={{ label: "Guide to Safe Scouting", href: "https://www.scouting.org/health-and-safety/gss/" }}
        secondary={{ label: "All resources", href: "/resources" }}
        scene="ridge"
      />
    </>
  );
}
