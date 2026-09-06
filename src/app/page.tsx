import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { PhotoMosaic } from "@/components/sections/PhotoMosaic";
import { Testimonials } from "@/components/sections/Testimonials";
import { CountUp } from "@/components/sections/CountUp";
import { StoryCard } from "@/components/site/StoryCard";
import { EventCard } from "@/components/site/EventCard";
import { CTABand } from "@/components/site/CTABand";
import { Section, SectionHead } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { IconArrow } from "@/components/brand/Marks";
import { differenceStats, programTiles, troop } from "@/data/troop";
import { getEvents, getFeaturedPosts } from "@/lib/content";

/** A short colour rule at the top of each card, instead of a block of colour. */
const accent = {
  red: "bg-red",
  forest: "bg-forest",
  blue: "bg-blue",
} as const;

export default async function Home() {
  const [events, posts] = await Promise.all([getEvents(), getFeaturedPosts()]);
  const today = new Date().toISOString().slice(0, 10);
  const future = events.filter((e) => (e.endDate ?? e.date) >= today);
  const upcoming = (future.length > 0 ? future : events).slice(0, 3);
  const stories = posts;

  return (
    <>
      <Hero events={future} />

      {/* ============ WHERE WE GO ============ */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            align="left"
            eyebrow="A campout every month"
            title="Where we go"
            lede="Beaches, rivers, granite and snow. Pictures of the places we camp; the stories are in the Scouts' own words."
          />
          <Reveal>
            <Link href="/outdoors" className="pill pill-outline shrink-0">
              Every outing
            </Link>
          </Reveal>
        </div>
        <div className="mt-10">
          <PhotoMosaic />
        </div>
      </Section>

      {/* ============ NUMBERS ============ */}
      <section className="bg-navy py-14 text-white md:py-16">
        <div className="shell grid grid-cols-2 gap-8 md:grid-cols-4">
          {differenceStats.map((s, i) => (
            <Reveal key={s.label} delay={i * 90}>
              <div className="border-l-[3px] border-gold pl-5">
                <CountUp
                  value={s.value}
                  className="block font-slab text-[clamp(40px,6vw,64px)] font-bold leading-none"
                />
                <span className="mt-2 block text-[13px] uppercase tracking-[1.4px] text-white/70">
                  {s.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ STORIES ============ */}
      <Section className="bg-shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead align="left" eyebrow="Written by the Scouts" title="From the trail" />
          <Reveal>
            <Link href="/blog" className="pill pill-outline shrink-0">
              All stories
            </Link>
          </Reveal>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {stories.map((p, i) => (
            <Reveal key={p.slug} delay={i * 90} className="h-full">
              <StoryCard post={p} showDate={false} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============ COMING UP ============ */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead align="left" eyebrow="This season" title="What's coming up" />
          <Reveal>
            <Link href="/calendar" className="pill pill-outline shrink-0">
              Full calendar
            </Link>
          </Reveal>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {upcoming.map((e, i) => (
            <Reveal key={e.date + e.title} delay={i * 90}>
              <EventCard event={e} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============ FIND YOUR PLACE ============ */}
      <Section>
        <SectionHead
          align="left"
          eyebrow="Where you fit"
          title="Find your place"
          lede={`Every one of these starts the same way: come to a meeting on a ${troop.meeting.day}.`}
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {programTiles.map((p, i) => (
            <Reveal key={p.name} delay={i * 80} className="h-full">
              <Link
                href={p.href}
                className="group flex h-full flex-col rounded-xl border border-hair bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-blue/40 hover:shadow-lg"
              >
                <span className={`mb-5 block h-1 w-10 rounded-full ${accent[p.tone]}`} />
                <span className="font-slab text-[20px] font-bold leading-tight text-navy transition group-hover:text-blue">
                  {p.name}
                </span>
                <span className="mt-1 block text-[13px] uppercase tracking-[0.8px] text-mute">
                  {p.who}
                </span>
                <span className="mt-3 block flex-1 text-[14.5px] leading-6 text-slate">
                  {p.blurb}
                </span>
                <span className="mt-5 inline-flex items-center gap-2 font-slab text-[12px] font-bold uppercase tracking-[1px] text-blue">
                  Learn more
                  <IconArrow className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============ A VOICE ============ */}
      <Section>
        <Testimonials />
      </Section>

      {/* ============ JOIN ============ */}
      <CTABand
        photo="campfire"
        title="Come see for yourself"
        body={`${troop.meeting.cadence}, ${troop.meeting.time}, at ${troop.meeting.venue}. No forms, no uniform, no commitment.`}
        primary={{ label: "How to join", href: "/join" }}
        secondary={{ label: "Ask a question", href: "/contact" }}
      />
    </>
  );
}
