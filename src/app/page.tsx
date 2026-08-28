import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { Testimonials } from "@/components/sections/Testimonials";
import { Section, SectionHead } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { EventCard } from "@/components/site/EventCard";
import { Scene, SceneTile } from "@/components/brand/Scenes";
import {
  FleurDeLis,
  IconCompass,
  IconShield,
  IconStar,
  IconTent,
  IconArrow,
} from "@/components/brand/Marks";
import {
  calendar,
  differenceCards,
  differenceStats,
  highAdventureBases,
  programTiles,
  scoutLaw,
  scoutOath,
  troop,
  troopMission,
  valuePillars,
} from "@/data/troop";

const tileTone = {
  gold: "bg-gold text-[#4a3c0c]",
  red: "bg-red text-white",
  forest: "bg-forest text-white",
  navy: "bg-[#1b2a4a] text-white",
  periwinkle: "bg-[#4a6fbf] text-white",
} as const;

const pillarIcon = {
  compass: IconCompass,
  shield: IconShield,
  star: IconStar,
  tent: IconTent,
} as const;

export default function Home() {
  const upcoming = calendar.slice(0, 4);

  return (
    <>
      <Hero />

      {/* ============ TROOP 394 IS THE DIFFERENCE ============ */}
      <Section>
        <SectionHead
          title="Troop 2/394 is the difference"
          lede={`A Scout-led program built on character, leadership, and the outdoors — right here in ${troop.city}.`}
        />

        <Reveal delay={80}>
          <h3 className="h-four mt-8 text-center">
            What a Scout in Troop 2/394 actually does:
          </h3>
        </Reveal>

        <div className="mt-10 grid gap-7 md:grid-cols-3">
          {differenceCards.map((c, i) => (
            <Reveal as="article" key={c.title} delay={i * 110}>
              <div className="group h-full overflow-hidden rounded-lg border border-hair bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="relative h-48 overflow-hidden">
                  <SceneTile
                    name={c.scene}
                    className="h-full w-full transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h4 className="h-four !text-[21px]">{c.title}</h4>
                  <p className="mt-3 mb-0 text-[15px] leading-7 text-slate">{c.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <dl className="mt-14 grid grid-cols-2 gap-6 rounded-lg border border-hair bg-shell px-6 py-9 md:grid-cols-4">
            {differenceStats.map((s) => (
              <div key={s.label} className="text-center">
                <dt className="sr-only">{s.label}</dt>
                <dd className="m-0">
                  <span className="block font-slab text-[clamp(30px,4.4vw,42px)] font-bold leading-none text-navy">
                    {s.value}
                  </span>
                  <span className="mt-2 block text-[13px] leading-5 text-mute">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Section>

      {/* ============ THE PROGRAMS (tan band) ============ */}
      <Section className="bg-tan">
        <SectionHead
          title="The Troop 2/394 program"
          lede="Five ways to be part of Troop 2/394 — whichever one fits your Scout and your family."
        />

        <div className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {programTiles.map((p, i) => (
            <Reveal key={p.name} delay={i * 90}>
              <Link
                href={p.href}
                className={`group flex h-full flex-col rounded-xl p-6 transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${tileTone[p.tone]}`}
              >
                <FleurDeLis
                  className={`mb-4 h-11 w-auto ${p.tone === "gold" ? "text-[#4a3c0c]" : "text-white"} opacity-90`}
                />
                <h3
                  className={`font-slab text-[20px] font-medium leading-tight ${
                    p.tone === "gold" ? "!text-[#4a3c0c]" : "!text-white"
                  }`}
                >
                  {p.name}
                </h3>
                <p
                  className={`mt-1 mb-0 text-[13px] font-medium ${
                    p.tone === "gold" ? "text-[#4a3c0c]/80" : "text-white/80"
                  }`}
                >
                  {p.age}
                </p>
                <p
                  className={`mt-3 mb-0 flex-1 text-[13.5px] leading-6 ${
                    p.tone === "gold" ? "text-[#4a3c0c]/90" : "text-white/85"
                  }`}
                >
                  {p.blurb}
                </p>
                <span
                  className={`mt-5 inline-flex items-center gap-1.5 font-slab text-[12px] font-bold uppercase tracking-[1.2px] ${
                    p.tone === "gold" ? "text-[#4a3c0c]" : "text-white"
                  }`}
                >
                  Learn more
                  <IconArrow className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={140}>
          <div className="mt-12 text-center">
            <h3 className="h-four">Not sure which one fits?</h3>
            <p className="mx-auto mt-2 max-w-xl text-[15px] text-slate">
              Come to a meeting and ask. Our Scoutmaster will walk your family through it in ten
              minutes.
            </p>
            <Link href="/program" className="pill pill-navy mt-6">
              Explore the program
            </Link>
          </div>
        </Reveal>
      </Section>

      {/* ============ "BE PREPARED" split band ============ */}
      <section className="grid lg:grid-cols-2">
        <div className="relative isolate flex min-h-[420px] items-center justify-center overflow-hidden px-8 py-16">
          <Scene name="night" className="absolute inset-0 -z-10 h-full w-full" />
          <div className="text-center">
            <FleurDeLis className="mx-auto mb-7 h-20 w-auto text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]" />
            <p className="mb-2 font-slab text-[13px] font-bold uppercase tracking-[3px] text-white/80">
              Scout&rsquo;s Motto
            </p>
            <p className="mb-0 font-slab text-[clamp(30px,5vw,44px)] font-bold !text-white">
              &ldquo;Be Prepared&rdquo;
            </p>
            <p className="mt-4 mb-0 font-slab text-[13px] uppercase tracking-[2px] text-white/70">
              {troop.slogan}
            </p>
          </div>
        </div>

        <div className="bg-shell px-8 py-16 lg:px-14">
          <div className="mx-auto max-w-xl">
            <h2 className="h-sub">Our Mission</h2>
            <p className="mt-3 text-[15px] leading-7 text-slate">{troopMission}</p>

            <h2 className="h-sub mt-9">Scout Law</h2>
            <p className="mt-3 text-[15px] leading-7 text-slate">
              A Scout is{" "}
              {scoutLaw.map((w, i) => (
                <span key={w}>
                  <span className="font-medium text-navy">{w.toLowerCase()}</span>
                  {i < scoutLaw.length - 1 ? ", " : "."}
                  {i === scoutLaw.length - 2 ? "and " : ""}
                </span>
              ))}
            </p>

            <h2 className="h-sub mt-9">Scout Oath</h2>
            <p className="mt-3 mb-0 text-[15px] leading-7 text-slate">
              &ldquo;{scoutOath}&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ============ WELCOME ============ */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHead
              align="left"
              title={`Welcome to Troop ${troop.displayNumber}`}
              lede={`Every youth in ${troop.city} is welcome at a safe, fun place to learn, explore, and grow.`}
            />

            <Reveal delay={80}>
              <div className="mt-8 space-y-4">
                <div className="rounded-lg bg-blue/[0.07] p-6">
                  <p className="mb-0 text-[15px] leading-7 text-slate">
                    <strong className="text-navy">Troop 2/394 is Scout-led.</strong> Our Senior
                    Patrol Leader plans meetings, the Patrol Leaders&rsquo; Council sets the
                    calendar, and patrols cook their own food on every campout. Adults train,
                    supervise, and drive — the Scouts do the leading.
                  </p>
                </div>
                <div className="rounded-lg bg-tan-light p-6">
                  <p className="mb-0 text-[15px] leading-7 text-slate">
                    <strong className="text-navy">
                      We are committed to a welcoming, safe environment
                    </strong>{" "}
                    where Scouts can express themselves, share experiences, and become the best
                    version of themselves by learning from and respecting each other.
                  </p>
                </div>
                <div className="rounded-lg bg-shell p-6">
                  <p className="mb-0 text-[15px] leading-7 text-slate">
                    <strong className="text-navy">We are part of something larger.</strong>{" "}
                    Troop 2/394 is chartered in the {troop.district.name} of the{" "}
                    {troop.council.name}, serving {troop.district.serves}.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <div className="overflow-hidden rounded-xl shadow-xl">
              <Scene name="trail" className="h-[460px] w-full" vivid />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ============ VALUE PILLARS ============ */}
      <Section className="bg-shell">
        <SectionHead
          title="The value of Scouting"
          lede="Discovery is at the heart of Scouting. Whether it is a campout, a service project, or a hike on the trail, every adventure uncovers a little more about who a Scout is."
        />

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {valuePillars.map((p, i) => {
            const Icon = pillarIcon[p.icon];
            return (
              <Reveal key={p.title} delay={i * 100}>
                <div className="flex gap-5 rounded-lg bg-white p-7 shadow-sm ring-1 ring-hair transition duration-300 hover:shadow-lg">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-navy text-white">
                    <Icon className="h-7 w-7" />
                  </span>
                  <div>
                    <h3 className="h-sub !text-[22px]">{p.title}</h3>
                    <p className="mt-2 mb-0 text-[15px] leading-7 text-slate">{p.body}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* ============ TESTIMONIALS ============ */}
      <Section>
        <Testimonials />
      </Section>

      {/* ============ QUICK ACTIONS ============ */}
      <Section className="bg-navy" bleed>
        <div className="shell">
          <div className="grid gap-px overflow-hidden rounded-xl bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Join", href: "/join", note: "Bring your Scout to a meeting" },
              { label: "Volunteer", href: "/about#adult-leaders", note: "Parents, we need you" },
              { label: "Support", href: "/support", note: "Fund a Scout's summer camp" },
              { label: "Calendar", href: "/calendar", note: "See what's coming up" },
            ].map((a, i) => (
              <Reveal key={a.href} delay={i * 90}>
                <Link
                  href={a.href}
                  className="group flex h-full flex-col items-center justify-center gap-2 bg-navy px-6 py-11 text-center transition hover:bg-navy-dark"
                >
                  <span className="font-slab text-[24px] font-bold text-white">{a.label}</span>
                  <span className="text-[13.5px] text-white/70">{a.note}</span>
                  <IconArrow className="mt-1 h-5 w-5 text-white/50 transition-transform group-hover:translate-x-1 group-hover:text-white" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ============ UPCOMING ============ */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            align="left"
            eyebrow="2026–2027 program year"
            title="What's coming up"
            lede="One campout a month, every month. Guests are welcome at any meeting."
          />
          <Reveal>
            <Link href="/calendar" className="pill pill-outline shrink-0">
              Full calendar
            </Link>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {upcoming.map((e, i) => (
            <Reveal key={e.title} delay={i * 90}>
              <EventCard event={e} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============ HIGH ADVENTURE ============ */}
      <Section className="bg-shell">
        <SectionHead
          title="National High Adventure Bases"
          lede="Older Scouts in Troop 2/394 aim for one of these. We run a crew to a national base or a Sierra trek every summer."
        />

        <div className="mt-11 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {highAdventureBases.map((b, i) => (
            <Reveal key={b.name} delay={i * 100}>
              <a
                href={b.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-hair transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="h-36 overflow-hidden">
                  <SceneTile
                    name={(["ridge", "lake", "forest", "eagle"] as const)[i % 4]}
                    className="h-full w-full transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-slab text-[16px] font-bold uppercase leading-snug tracking-[0.6px] text-navy transition group-hover:text-blue">
                    {b.name}
                  </h3>
                  <p className="mt-1 mb-0 text-[12px] uppercase tracking-[1px] text-mute">
                    {b.location}
                  </p>
                  <p className="mt-3 mb-0 flex-1 text-[13.5px] leading-6 text-slate">{b.blurb}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={140}>
          <div className="mt-11 text-center">
            <Link href="/outdoors#high-adventure" className="pill pill-navy">
              Our high adventure program
            </Link>
          </div>
        </Reveal>
      </Section>

      {/* ============ JOIN BAND ============ */}
      <section className="relative isolate overflow-hidden py-20">
        <Scene name="camping" className="absolute inset-0 -z-10 h-full w-full" />
        <div className="shell text-center">
          <Reveal>
            <FleurDeLis className="mx-auto mb-6 h-14 w-auto text-white" />
            <h2 className="h-section !text-white">Come see for yourself</h2>
            <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-7 text-white/90">
              {troop.meeting.cadence}, {troop.meeting.time}, at {troop.meeting.venue}. No forms,
              no uniform, no commitment — walk in and watch the Scouts run their own meeting.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link href="/join" className="pill pill-white">
                How to join
              </Link>
              <Link href="/contact" className="pill pill-ghost">
                Ask a question
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
