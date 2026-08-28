import { CalendarBrowser } from "@/components/sections/CalendarBrowser";
import { troop } from "@/data/troop";

export const metadata = { title: "Calendar" };

export default function MemberCalendar() {
  return (
    <div>
      <header className="mb-8">
        <p className="mb-1 font-slab text-[12px] font-bold uppercase tracking-[2px] text-blue">
          2026–2027 program year
        </p>
        <h1 className="h-section !text-[clamp(26px,4vw,36px)]">Troop Calendar</h1>
        <p className="mt-3 mb-0 max-w-2xl text-[15px] leading-7 text-slate">
          The Patrol Leaders&rsquo; Council owns this calendar and reviews it monthly, so dates
          occasionally move. Campouts leave Friday evening and return Sunday afternoon unless the
          note says otherwise.
        </p>
        <p className="mt-3 mb-0 max-w-2xl text-[14px] leading-6 text-mute">
          Meetings run {troop.meeting.cadence.toLowerCase()} at {troop.meeting.time}, and{" "}
          {troop.meeting.summerCadence.toLowerCase()}.
        </p>
      </header>

      <CalendarBrowser />
    </div>
  );
}
