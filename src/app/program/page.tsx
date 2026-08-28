import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHead } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { CTABand } from "@/components/site/CTABand";
import { Scene } from "@/components/brand/Scenes";
import { IconClock, IconPin, IconCheck } from "@/components/brand/Marks";
import { troop } from "@/data/troop";

export const metadata: Metadata = {
  title: "Our Program",
  description: `What Troop 2/394 actually does week to week — meetings, the patrol method, leadership development, and service in ${troop.city}.`,
};

const meetingAgenda = [
  { time: "7:00", item: "Opening", detail: "Flag ceremony, Oath and Law, uniform inspection." },
  { time: "7:10", item: "Patrol corners", detail: "Patrols meet, plan the next campout, assign duty rosters." },
  { time: "7:25", item: "Skills instruction", detail: "Taught by a Scout, not an adult. Knots, first aid, navigation, cooking." },
  { time: "7:55", item: "Game or interpatrol activity", detail: "Competition between patrols — usually loud, always a skill in disguise." },
  { time: "8:15", item: "Scoutmaster minute", detail: "Two minutes of something worth thinking about on the way home." },
  { time: "8:30", item: "Closing", detail: "Announcements, retire the colours, done." },
];

const leadershipTracks = [
  { name: "Introduction to Leadership Skills for Troops (ILST)", who: "Every Scout with a position", detail: "Run in-troop each spring after elections. The baseline course for any position of responsibility." },
  { name: "National Youth Leadership Training (NYLT)", who: "Ages 13+, First Class and above", detail: "A week-long council course. The single biggest jump in confidence we see in a Scout." },
  { name: "National Advanced Youth Leadership Experience (NAYLE)", who: "NYLT graduates", detail: "Held at the national high adventure bases. Leadership under real backcountry pressure." },
  { name: "Order of the Arrow", who: "Elected by their peers", detail: "Scouting's national honor society, recognizing Scouts who best live the Oath and Law." },
];

export default function ProgramPage() {
  return (
    <>
      <PageHero
        eyebrow="How the troop works"
        title="Our Program"
        lede="A Scout-led troop, organized by patrols, out of doors. Here is what that looks like on an ordinary Tuesday and an ordinary month."
        scene="ridge"
        crumb="Program"
      />

      {/* MEETINGS */}
      <Section id="meetings">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <SectionHead align="left" title="Weekly meetings" />
            <Reveal delay={70}>
              <div className="mt-6 flex flex-wrap gap-6">
                <span className="inline-flex items-center gap-2.5 text-[15px] text-slate">
                  <IconClock className="h-5 w-5 text-blue" />
                  {troop.meeting.day}s, {troop.meeting.time}
                </span>
                <span className="inline-flex items-center gap-2.5 text-[15px] text-slate">
                  <IconPin className="h-5 w-5 text-blue" />
                  {troop.meeting.venue}
                </span>
              </div>
              <div className="prose-troop mt-6">
                <p>
                  Meetings run for ninety minutes and follow the same shape every week. A Scout
                  runs the agenda; the Scoutmaster speaks for about two minutes, at the end.
                </p>
                <p className="mb-0">
                  Guests are welcome at any meeting. Wear whatever you own — a uniform is not
                  expected until a Scout has joined.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={110}>
            <ol className="overflow-hidden rounded-xl border border-hair">
              {meetingAgenda.map((r, i) => (
                <li
                  key={r.item}
                  className={`flex gap-5 px-6 py-5 ${i % 2 ? "bg-shell" : "bg-white"}`}
                >
                  <span className="w-14 shrink-0 font-slab text-[14px] font-bold text-blue">
                    {r.time}
                  </span>
                  <span>
                    <span className="block font-slab text-[15.5px] font-bold text-navy">
                      {r.item}
                    </span>
                    <span className="mt-1 block text-[13.5px] leading-6 text-slate">
                      {r.detail}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Section>

      {/* PATROL METHOD */}
      <Section id="patrol-method" className="bg-shell">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="overflow-hidden rounded-xl shadow-xl">
              <Scene name="camping" className="h-[400px] w-full" vivid />
            </div>
          </Reveal>
          <div>
            <SectionHead align="left" title="The patrol method" />
            <Reveal delay={80}>
              <div className="prose-troop mt-6">
                <p>
                  Scouting&rsquo;s founder called the patrol method &ldquo;the one essential
                  feature&rdquo; — not a technique, but the whole system. A patrol of six to ten
                  Scouts elects its own leader, keeps its own gear, plans its own menu, and cooks
                  its own food.
                </p>
                <p>
                  On a campout the adults camp separately. Patrols pitch their own tents, run
                  their own duty roster, and eat what they cooked, whether or not it worked. That
                  is where the learning is.
                </p>
                <p className="mb-0">
                  Patrols compete against each other at Camporee and Klondike, which does more
                  for skills practice than any amount of adult instruction.
                </p>
              </div>
            </Reveal>
            <Reveal delay={130}>
              <ul className="mt-7 space-y-3">
                {[
                  "Patrols elect their own Patrol Leader every six months",
                  "Each patrol owns its cook kit, stove, and dining fly",
                  "The Patrol Leaders' Council sets the troop calendar, not the adults",
                  "New Scouts spend their first year in a patrol with a Troop Guide",
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

      {/* LEADERSHIP */}
      <Section id="leadership">
        <SectionHead
          title="Leadership development"
          lede="Holding a position is the start, not the end. Troop 2/394 sends Scouts through a formal leadership track that runs from an in-troop course all the way to the national high adventure bases."
        />
        <div className="mt-11 grid gap-6 md:grid-cols-2">
          {leadershipTracks.map((t, i) => (
            <Reveal key={t.name} delay={i * 90}>
              <div className="h-full rounded-lg border border-hair bg-white p-7 transition hover:border-blue/40 hover:shadow-lg">
                <p className="mb-2 font-slab text-[11px] font-bold uppercase tracking-[1.4px] text-blue">
                  {t.who}
                </p>
                <h3 className="font-slab text-[18px] font-bold leading-snug text-navy">{t.name}</h3>
                <p className="mt-3 mb-0 text-[14px] leading-6 text-slate">{t.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* SERVICE */}
      <Section id="service" className="bg-navy">
        <SectionHead
          tone="white"
          title="Service &amp; community"
          lede={`"Do a Good Turn Daily" is the Scout slogan, and Troop 2/394 has always treated it as work rather than a motto — service projects for the Elks Lodge that charters us, for local institutions, and for whichever cause a Life Scout takes on for their Eagle project.`}
        />
        <div className="mt-11 grid gap-6 md:grid-cols-3">
          {[
            {
              t: "Scouting for Food",
              d: "The council-wide food drive each fall. Scouts bag-drop a neighborhood one Saturday and collect the following week.",
            },
            {
              t: "Eagle Scout projects",
              d: "Every Life Scout plans and leads a project that benefits a school, park, library, or nonprofit. The troop turns out to help.",
            },
            {
              t: "Conservation & trail work",
              d: "Trail maintenance at council camps and local open space, plus Leave No Trace practice on every outing.",
            },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 100}>
              <div className="h-full rounded-lg bg-white/[0.07] p-7 ring-1 ring-white/15">
                <h3 className="font-slab text-[18px] font-bold !text-white">{c.t}</h3>
                <p className="mt-3 mb-0 text-[14px] leading-6 text-white/80">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTABand
        title="See a meeting for yourself"
        body="Reading about the patrol method is one thing. Watching a 13-year-old run a room of forty is another."
        primary={{ label: "Join Troop 2/394", href: "/join" }}
        secondary={{ label: "View the calendar", href: "/calendar" }}
        scene="forest"
      />
    </>
  );
}
