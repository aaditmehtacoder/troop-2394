import { getEvents } from "@/lib/content";
import { eventTag, troop } from "@/data/troop";
import { siteUrl } from "@/lib/supabase/config";

/**
 * The troop calendar as a subscribable feed.
 *
 * A family adds this URL once in Google Calendar (Other calendars → From URL)
 * and every campout the PLC adds afterwards turns up on their phone. That is
 * worth more than a page they have to remember to check, so this is the thing
 * the calendar page points at.
 *
 * All-day events, because nothing here has a meaningful start time except the
 * Tuesday meeting, and a wrong time is worse than none.
 */
export const dynamic = "force-dynamic";
export const revalidate = 0;

/** ICS wants YYYYMMDD with no separators. */
function stamp(iso: string): string {
  return iso.replace(/-/g, "");
}

/** DTEND on an all-day event is exclusive, so a one-day event ends tomorrow. */
function dayAfter(iso: string): string {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return stamp(d.toISOString().slice(0, 10));
}

/** RFC 5545: escape, then fold to 75 octets. */
function line(name: string, value: string): string {
  const escaped = value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
  const full = `${name}:${escaped}`;
  if (full.length <= 75) return full;

  const parts = [full.slice(0, 75)];
  let rest = full.slice(75);
  while (rest.length > 74) {
    parts.push(` ${rest.slice(0, 74)}`);
    rest = rest.slice(74);
  }
  if (rest) parts.push(` ${rest}`);
  return parts.join("\r\n");
}

export async function GET() {
  const events = await getEvents();
  const origin = siteUrl();
  const now = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const body: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Troop 394 Santa Clara//Troop Calendar//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    line("X-WR-CALNAME", `${troop.name} Calendar`),
    line("X-WR-CALDESC", `Campouts, meetings and courts of honor for ${troop.longName}.`),
    "X-PUBLISHED-TTL:PT12H",
    "REFRESH-INTERVAL;VALUE=DURATION:PT12H",
  ];

  for (const e of events) {
    const uid = `${stamp(e.date)}-${e.title.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}@troop394sc`;
    body.push(
      "BEGIN:VEVENT",
      line("UID", uid),
      `DTSTAMP:${now}`,
      `DTSTART;VALUE=DATE:${stamp(e.date)}`,
      `DTEND;VALUE=DATE:${e.endDate ? dayAfter(e.endDate) : dayAfter(e.date)}`,
      line("SUMMARY", e.title),
      line("CATEGORIES", eventTag(e.kind)),
      ...(e.location ? [line("LOCATION", e.location)] : []),
      ...(e.note ? [line("DESCRIPTION", e.note)] : []),
      line("URL", `${origin}/calendar`),
      "TRANSP:TRANSPARENT",
      "END:VEVENT",
    );
  }

  body.push("END:VCALENDAR");

  return new Response(body.join("\r\n") + "\r\n", {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'inline; filename="troop-394.ics"',
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
