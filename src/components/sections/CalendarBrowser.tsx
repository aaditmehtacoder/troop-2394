"use client";

import { useMemo, useState } from "react";
import { eventTag, type EventTag, type TroopEvent } from "@/data/troop";
import { EventCard } from "@/components/site/EventCard";

/** Four words, not seven. Most months only ever show two of them. */
const TAGS: (EventTag | "All")[] = ["All", "Outing", "Meeting", "Service", "Ceremony"];

function monthKey(iso: string) {
  const d = new Date(iso + "T12:00:00Z");
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
}

/** Filterable, month-grouped list. `events` comes from the database, with the
 *  committed calendar as the fallback (see lib/content.ts). */
export function CalendarBrowser({ events }: { events: TroopEvent[] }) {
  const [kind, setKind] = useState<(typeof TAGS)[number]>("All");

  const groups = useMemo(() => {
    const filtered = kind === "All" ? events : events.filter((e) => eventTag(e.kind) === kind);
    const map = new Map<string, TroopEvent[]>();
    for (const e of filtered) {
      const k = monthKey(e.date);
      const list = map.get(k);
      if (list) list.push(e);
      else map.set(k, [e]);
    }
    return [...map.entries()];
  }, [kind, events]);

  const total =
    kind === "All" ? events.length : events.filter((e) => eventTag(e.kind) === kind).length;

  // Only offer a filter when there is something behind it.
  const available = TAGS.filter((k) => k === "All" || events.some((e) => eventTag(e.kind) === k));

  return (
    <div>
      <div
        role="group"
        aria-label="Filter events by type"
        className="flex flex-wrap justify-center gap-2.5"
      >
        {available.map((k) => {
          const on = k === kind;
          return (
            <button
              key={k}
              type="button"
              onClick={() => setKind(k)}
              aria-pressed={on}
              className={`rounded-full border px-4 py-2 font-slab text-[12px] font-bold uppercase tracking-[1px] transition ${
                on
                  ? "border-navy bg-navy text-white"
                  : "border-hair bg-white text-mute hover:border-blue hover:text-blue"
              }`}
            >
              {k}
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="mt-5 text-center text-[13.5px] text-mute">
        Showing {total} {total === 1 ? "event" : "events"}
        {kind !== "All" && ` in ${kind}`}.
      </p>

      <div className="mt-10 space-y-12">
        {groups.map(([month, events]) => (
          <div key={month}>
            <div className="mb-5 flex items-center gap-4">
              <h3 className="shrink-0 font-slab text-[13px] font-bold uppercase tracking-[2px] text-blue">
                {month}
              </h3>
              <span className="h-px flex-1 bg-hair" aria-hidden />
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {events.map((e) => (
                <EventCard key={e.title + e.date} event={e} />
              ))}
            </div>
          </div>
        ))}

        {groups.length === 0 && (
          <p className="py-16 text-center text-[15px] text-mute">
            No events of that type on the calendar yet.
          </p>
        )}
      </div>
    </div>
  );
}
