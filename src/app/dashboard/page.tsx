import Link from "next/link";
import { getCurrentUser } from "@/lib/auth/session";
import { isAdmin, listUsers } from "@/lib/auth/store";
import { EventCard, formatRange } from "@/components/site/EventCard";
import { IconArrow, IconClock, IconPin } from "@/components/brand/Marks";
import { calendar, resourceLinks, troop } from "@/data/troop";

export const metadata = { title: "Overview" };

function upcoming(limit: number) {
  // The seeded calendar runs across a fixed program year, so fall back to the
  // start of the list once every date is in the past.
  const now = Date.now();
  const ahead = calendar.filter((e) => new Date(`${e.endDate ?? e.date}T23:59:59Z`).getTime() >= now);
  return (ahead.length ? ahead : calendar).slice(0, limit);
}

export default async function DashboardHome({
  searchParams,
}: {
  searchParams: Promise<{ welcome?: string }>;
}) {
  const [user, params] = await Promise.all([getCurrentUser(), searchParams]);
  if (!user) return null; // the layout has already redirected

  const events = upcoming(4);
  const next = events[0];
  const admin = isAdmin(user.role);
  const pendingCount = admin ? (await listUsers()).filter((u) => u.role === "pending").length : 0;

  const firstName = user.name.split(" ")[0];

  return (
    <div>
      {params.welcome === "admin" && (
        <div className="mb-7 rounded-lg border-l-4 border-forest bg-forest/[0.08] p-6">
          <h2 className="font-slab text-[17px] font-bold text-navy">
            You&rsquo;re set up as the administrator
          </h2>
          <p className="mt-2 mb-0 text-[14.5px] leading-6 text-slate">
            Yours is the first account, so it can approve everyone else. As people request
            accounts they&rsquo;ll appear under{" "}
            <Link href="/dashboard/members" className="text-blue underline underline-offset-4">
              Members
            </Link>{" "}
            for you to approve.
          </p>
        </div>
      )}

      <header>
        <p className="mb-1 font-slab text-[12px] font-bold uppercase tracking-[2px] text-blue">
          Members area
        </p>
        <h1 className="h-section !text-[clamp(26px,4vw,36px)]">Welcome back, {firstName}</h1>
        <p className="mt-3 mb-0 max-w-2xl text-[15px] leading-7 text-slate">
          Everything a {troop.name} family needs in one place — the calendar, the forms, and who
          to ask.
        </p>
      </header>

      {admin && pendingCount > 0 && (
        <Link
          href="/dashboard/members"
          className="mt-7 flex items-center justify-between gap-4 rounded-lg border border-blue/30 bg-blue/[0.06] p-5 transition hover:border-blue hover:shadow-md"
        >
          <span className="text-[15px] leading-6 text-slate">
            <strong className="text-navy">
              {pendingCount} {pendingCount === 1 ? "person is" : "people are"} waiting for approval
            </strong>{" "}
            — review and let them in.
          </span>
          <IconArrow className="h-5 w-5 shrink-0 text-blue" />
        </Link>
      )}

      {/* Next up */}
      {next && (
        <section className="mt-9">
          <h2 className="font-slab text-[13px] font-bold uppercase tracking-[1.6px] text-blue">
            Next up
          </h2>
          <div className="mt-4 overflow-hidden rounded-xl bg-navy p-7 text-white">
            <p className="mb-1 font-slab text-[12px] font-bold uppercase tracking-[1.6px] text-white/65">
              {next.kind}
            </p>
            <h3 className="font-slab text-[clamp(20px,3vw,26px)] font-bold !text-white">
              {next.title}
            </h3>
            <div className="mt-4 flex flex-wrap gap-x-7 gap-y-2 text-[14px] text-white/85">
              <span className="inline-flex items-center gap-2">
                <IconClock className="h-4 w-4 text-white/60" />
                {formatRange(next)}
              </span>
              <span className="inline-flex items-center gap-2">
                <IconPin className="h-4 w-4 text-white/60" />
                {next.location}
              </span>
            </div>
            {next.note && (
              <p className="mt-4 mb-0 max-w-2xl text-[14px] leading-6 text-white/75">{next.note}</p>
            )}
          </div>
        </section>
      )}

      {/* Meeting reminder */}
      <section className="mt-9 grid gap-5 sm:grid-cols-2">
        <div className="rounded-lg bg-white p-6 ring-1 ring-hair">
          <h2 className="flex items-center gap-2 font-slab text-[14px] font-bold text-navy">
            <IconClock className="h-4.5 w-4.5 text-blue" />
            Weekly meeting
          </h2>
          <p className="mt-2 mb-0 text-[14px] leading-6 text-slate">
            {troop.meeting.cadence}, {troop.meeting.time}.
            <br />
            {troop.meeting.summerCadence} in summer.
          </p>
          <p className="mt-2 mb-0 text-[13px] leading-5 text-mute">{troop.meeting.arriveNote}</p>
        </div>
        <div className="rounded-lg bg-white p-6 ring-1 ring-hair">
          <h2 className="flex items-center gap-2 font-slab text-[14px] font-bold text-navy">
            <IconPin className="h-4.5 w-4.5 text-blue" />
            Where
          </h2>
          <p className="mt-2 mb-0 text-[14px] leading-6 text-slate">
            {troop.meeting.venue}
            <br />
            {troop.meeting.address}
          </p>
          <p className="mt-2 mb-0 text-[13px] leading-5 text-mute">
            Committee meets the {troop.meeting.committeeMeeting.toLowerCase()}.
          </p>
        </div>
      </section>

      {/* Upcoming */}
      <section className="mt-11">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="font-slab text-[13px] font-bold uppercase tracking-[1.6px] text-blue">
            Coming up
          </h2>
          <Link
            href="/dashboard/calendar"
            className="inline-flex items-center gap-1.5 font-slab text-[12px] font-bold uppercase tracking-[1.2px] text-navy hover:text-blue"
          >
            Full calendar
            <IconArrow className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid gap-4 xl:grid-cols-2">
          {events.map((e) => (
            <EventCard key={e.title + e.date} event={e} />
          ))}
        </div>
      </section>

      {/* Quick links */}
      <section className="mt-11">
        <h2 className="font-slab text-[13px] font-bold uppercase tracking-[1.6px] text-blue">
          The links you actually need
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {resourceLinks.slice(0, 6).map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3 rounded-lg bg-white p-5 ring-1 ring-hair transition hover:ring-blue/40"
            >
              <span className="min-w-0 flex-1">
                <span className="block font-slab text-[14.5px] font-bold leading-snug text-navy group-hover:text-blue">
                  {l.label}
                </span>
                <span className="mt-1 block text-[13px] leading-5 text-mute">{l.note}</span>
              </span>
              <IconArrow className="mt-0.5 h-4 w-4 shrink-0 -rotate-45 text-mute group-hover:text-blue" />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
