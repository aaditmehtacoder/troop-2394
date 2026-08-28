import { IconArrow, IconCheck } from "@/components/brand/Marks";
import { resourceLinks, gearList, dues, troop } from "@/data/troop";

export const metadata = { title: "Forms" };

const beforeEveryCampout = [
  "Permission slip signed and returned at the meeting before the campout",
  "Annual Health & Medical Record Parts A & B on file and current",
  "Campout fee paid — or arranged with the Scoutmaster",
  "Driver? Current licence, insurance, and Youth Protection Training",
  "Ten Essentials packed, plus whatever the trip note asks for",
];

const beforeSummerCamp = [
  "Health Record Part C — the physical, signed by a provider",
  "Merit badge choices submitted to the Scoutmaster",
  "Camp fee paid in full by the deadline",
  "Swim check completed, or plan to take it on arrival",
  "Any medication logged with the adult leader carrying the lockbox",
];

export default function FormsPage() {
  return (
    <div>
      <header className="mb-9">
        <p className="mb-1 font-slab text-[12px] font-bold uppercase tracking-[2px] text-blue">
          Paperwork, in one place
        </p>
        <h1 className="h-section !text-[clamp(26px,4vw,36px)]">Forms &amp; Checklists</h1>
        <p className="mt-3 mb-0 max-w-2xl text-[15px] leading-7 text-slate">
          Always download forms fresh rather than reusing last year&rsquo;s PDF — Scouting America
          revises them, and an out-of-date medical form is the most common reason a Scout gets
          turned away at camp.
        </p>
      </header>

      <section>
        <h2 className="font-slab text-[13px] font-bold uppercase tracking-[1.6px] text-blue">
          Official forms &amp; systems
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {resourceLinks.map((l) => (
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

      <section className="mt-11 grid gap-6 lg:grid-cols-2">
        {[
          { title: "Before every campout", items: beforeEveryCampout },
          { title: "Before summer camp", items: beforeSummerCamp },
        ].map((c) => (
          <div key={c.title} className="rounded-xl bg-white p-7 ring-1 ring-hair">
            <h2 className="font-slab text-[13px] font-bold uppercase tracking-[1.6px] text-blue">
              {c.title}
            </h2>
            <ul className="mt-5 space-y-3">
              {c.items.map((t) => (
                <li key={t} className="flex gap-3 text-[14.5px] leading-6 text-slate">
                  <IconCheck className="mt-0.5 h-4.5 w-4.5 shrink-0 text-blue" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mt-11">
        <h2 className="font-slab text-[13px] font-bold uppercase tracking-[1.6px] text-blue">
          Packing &amp; uniform
        </h2>
        <div className="mt-4 grid gap-5 md:grid-cols-3">
          {gearList.map((g) => (
            <div key={g.category} className="rounded-lg bg-white p-6 ring-1 ring-hair">
              <h3 className="font-slab text-[15px] font-bold text-navy">{g.category}</h3>
              <ul className="mt-4 space-y-2">
                {g.items.map((it) => (
                  <li key={it} className="flex gap-2.5 text-[13.5px] leading-6 text-slate">
                    <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-11 rounded-xl border-l-4 border-blue bg-blue/[0.05] p-7">
        <h2 className="font-slab text-[17px] font-bold text-navy">Dues &amp; cost</h2>
        <p className="mt-2 mb-0 text-[15px] leading-7 text-slate">
          Scouting America lists <strong className="text-navy">${dues.joinCost}</strong> for a
          youth to join {troop.name}. {dues.note}
        </p>
      </section>
    </div>
  );
}
