import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHead } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { CTABand } from "@/components/site/CTABand";
import { CalendarBrowser } from "@/components/sections/CalendarBrowser";
import { siteUrl } from "@/lib/supabase/config";
import { IconClock, IconPin } from "@/components/brand/Marks";
import { troop } from "@/data/troop";
import { pageHeroPhoto } from "@/data/photos";
import { getEvents } from "@/lib/content";

export const metadata: Metadata = {
  title: "Calendar",
  description:
    "Troop 394's 2026–2027 program year: weekly meetings, monthly campouts, courts of honor, service projects, summer camp, and high adventure.",
};

export default async function CalendarPage() {
  const events = await getEvents();

  return (
    <>
      <PageHero
        eyebrow="2026–2027 program year"
        title="Troop Calendar"
        lede="What the Patrol Leaders' Council has confirmed so far. Months are added as they are planned, and dates occasionally shift."
        photo={pageHeroPhoto.calendar}
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
          <CalendarBrowser events={events} />

          <div className="mt-12 rounded-lg border border-hair bg-shell p-7 sm:p-8">
            <h3 className="mt-0 font-slab text-[19px] font-bold text-navy">
              Put the troop calendar in your own
            </h3>
            <p className="mt-2 mb-6 max-w-2xl text-[15px] leading-7 text-slate">
              Subscribe once and every campout the Patrol Leaders&rsquo; Council adds afterwards
              turns up on your phone. In Google Calendar, choose{" "}
              <strong className="text-navy">Other calendars &rarr; From URL</strong> and paste the
              address below. It works the same in Apple Calendar and Outlook.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/calendar.ics"
                className="pill pill-navy pill-sm"
                aria-label="Download the troop calendar file"
              >
                Download the calendar file
              </a>
              <code className="select-all rounded-md border border-hair bg-white px-3 py-2 text-[13px] text-slate">
                {`${siteUrl()}/calendar.ics`}
              </code>
            </div>
          </div>
        </div>
      </Section>

      <CTABand
        title="Want to come along?"
        body="Prospective families are welcome at any meeting, and on a campout as guests. Email us the week before so we can plan food and transport."
        primary={{ label: "Contact the troop", href: "/contact" }}
        secondary={{ label: "How to join", href: "/join" }}
        photo="lake-shore"
      />
    </>
  );
}
