import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHead } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { CTABand } from "@/components/site/CTABand";
import { CalendarBrowser } from "@/components/sections/CalendarBrowser";
import { IconClock, IconPin } from "@/components/brand/Marks";
import { troop } from "@/data/troop";

export const metadata: Metadata = {
  title: "Calendar",
  description:
    "Troop 2/394's 2026–2027 program year: weekly meetings, monthly campouts, courts of honor, service projects, summer camp, and high adventure.",
};

export default function CalendarPage() {
  return (
    <>
      <PageHero
        eyebrow="2026–2027 program year"
        title="Troop Calendar"
        lede="Everything the troop has planned. Dates occasionally shift — the Patrol Leaders' Council owns this calendar and reviews it monthly."
        scene="trail"
        crumb="Calendar"
      />

      <Section>
        <Reveal>
          <div className="mb-12 grid gap-5 rounded-xl border border-hair bg-shell p-7 sm:grid-cols-2">
            <div className="flex gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-navy text-white">
                <IconClock className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-slab text-[15px] font-bold text-navy">Weekly meetings</h2>
                <p className="mt-1 mb-0 text-[14px] leading-6 text-slate">
                  {troop.meeting.cadence}, {troop.meeting.time}. No meeting on school holidays or
                  the weekend of a campout.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-navy text-white">
                <IconPin className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-slab text-[15px] font-bold text-navy">Where</h2>
                <p className="mt-1 mb-0 text-[14px] leading-6 text-slate">
                  {troop.meeting.venue}
                  <br />
                  {troop.meeting.address}
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <SectionHead
          title="What's on"
          lede="Filter by activity type. Campouts leave Friday evening and return Sunday afternoon unless noted."
        />

        <div className="mt-11">
          <CalendarBrowser />
        </div>
      </Section>

      <CTABand
        title="Want to come along?"
        body="Prospective families are welcome at any meeting, and on a campout as guests. Email us the week before so we can plan food and transport."
        primary={{ label: "Contact the troop", href: "/contact" }}
        secondary={{ label: "How to join", href: "/join" }}
        scene="forest"
      />
    </>
  );
}
