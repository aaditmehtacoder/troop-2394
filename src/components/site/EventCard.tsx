import type { TroopEvent } from "@/data/troop";

const kindTone: Record<TroopEvent["kind"], string> = {
  Campout: "bg-forest/12 text-forest ring-forest/25",
  Meeting: "bg-navy/10 text-navy ring-navy/20",
  Service: "bg-blue/12 text-blue-dark ring-blue/25",
  Ceremony: "bg-gold/25 text-[#7a6212] ring-gold/50",
  Training: "bg-mute/12 text-slate ring-mute/25",
  "High Adventure": "bg-red/10 text-red ring-red/25",
};

export function formatRange(e: TroopEvent) {
  const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", timeZone: "UTC" };
  const start = new Date(e.date + "T12:00:00Z");
  const s = start.toLocaleDateString("en-US", opts);
  if (!e.endDate) return s;
  const end = new Date(e.endDate + "T12:00:00Z");
  const sameMonth = start.getUTCMonth() === end.getUTCMonth();
  return `${s}–${end.toLocaleDateString("en-US", sameMonth ? { day: "numeric", timeZone: "UTC" } : opts)}`;
}

export function EventCard({ event }: { event: TroopEvent }) {
  const d = new Date(event.date + "T12:00:00Z");
  return (
    <article className="group flex gap-5 rounded-lg border border-hair bg-white p-5 transition duration-300 hover:-translate-y-0.5 hover:border-blue/40 hover:shadow-lg">
      <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-lg bg-navy text-white">
        <span className="font-slab text-[10.5px] font-bold uppercase tracking-[1.4px] text-white/75">
          {d.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" })}
        </span>
        <span className="font-slab text-[24px] font-bold leading-none">
          {d.toLocaleDateString("en-US", { day: "numeric", timeZone: "UTC" })}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[1px] ring-1 ${kindTone[event.kind]}`}
          >
            {event.kind}
          </span>
          <span className="text-[12.5px] text-mute">{formatRange(event)}</span>
        </div>

        <h3 className="mt-2 font-slab text-[17px] font-bold leading-snug text-navy transition group-hover:text-blue">
          {event.title}
        </h3>
        <p className="mt-1 mb-0 text-[13.5px] text-mute">{event.location}</p>
        {event.note && (
          <p className="mt-2 mb-0 text-[13.5px] leading-6 text-slate">{event.note}</p>
        )}
      </div>
    </article>
  );
}
