import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { getAnnouncements, getArchivePosts, getEvents } from "@/lib/content";
import { troop } from "@/data/troop";
import { getProfile } from "@/lib/supabase/profile";
import { supabaseConfigured } from "@/lib/supabase/config";
import { pageHeroPhoto } from "@/data/photos";

export const metadata: Metadata = {
  title: "Troop Feed",
  description: `Everything happening in ${troop.name} right now: notices, the next campouts, and the newest trip reports.`,
  robots: { index: false, follow: false },
};

type Item = {
  key: string;
  date: string;
  tag: string;
  tone: "blue" | "gold" | "forest" | "navy";
  title: string;
  body?: string;
  href?: string;
  meta?: string;
};

/**
 * The troop's noticeboard, and the full run of trip reports behind it.
 *
 * Members only: the public site shows three stories the troop chose, and this
 * is where the rest of them live.
 */
export default async function FeedPage() {
  if (!supabaseConfigured) redirect("/login");
  if (!(await getProfile())) redirect("/login?next=%2Ffeed");

  const [announcements, events, posts] = await Promise.all([
    getAnnouncements(),
    getEvents(),
    getArchivePosts(),
  ]);

  const today = new Date().toISOString().slice(0, 10);

  const pinned: Item[] = announcements
    .filter((a) => a.pinned)
    .map((a) => ({
      key: `pin-${a.id}`,
      date: a.created_at.slice(0, 10),
      tag: "Notice",
      tone: "gold",
      title: a.title,
      body: a.body ?? undefined,
      href: a.link ?? undefined,
    }));

  const upcoming: Item[] = events
    .filter((e) => (e.endDate ?? e.date) >= today)
    .slice(0, 6)
    .map((e) => ({
      key: `ev-${e.date}-${e.title}`,
      date: e.date,
      tag: e.kind,
      tone: "blue",
      title: e.title,
      body: e.note,
      meta: e.location,
      href: "/calendar",
    }));

  const recent: Item[] = posts.slice(0, 6).map((p) => ({
    key: `post-${p.slug}`,
    date: p.date,
    tag: p.kind,
    tone: "forest",
    title: p.title,
    body: p.excerpt,
    meta: p.author ? `Written by ${p.author}` : undefined,
    href: `/blog/${p.slug}`,
  }));

  const news: Item[] = announcements
    .filter((a) => !a.pinned)
    .map((a) => ({
      key: `an-${a.id}`,
      date: a.created_at.slice(0, 10),
      tag: "Notice",
      tone: "navy",
      title: a.title,
      body: a.body ?? undefined,
      href: a.link ?? undefined,
    }));

  return (
    <>
      <PageHero
        eyebrow="What is happening now"
        title="Troop Feed"
        lede="Notices, the next few campouts, and the latest word from the Scouts."
        photo={pageHeroPhoto.feed}
        crumb="Feed"
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="min-w-0">
            {pinned.length > 0 ? (
              <Group title="Pinned" items={pinned} />
            ) : null}
            <Group title="Coming up" items={upcoming} empty="Nothing on the calendar yet." />
            <Group title="Latest from the Scouts" items={recent} empty="No posts yet." />
            {news.length > 0 ? <Group title="Notices" items={news} /> : null}
          </div>

          <aside className="lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-xl border border-hair bg-shell/50 p-6">
              <h2 className="h-four mb-3 text-[19px]">Every Tuesday</h2>
              <p className="mb-1 text-[15px] leading-7 text-ink">{troop.meeting.time}</p>
              <p className="mb-4 text-[15px] leading-7 text-mute">
                {troop.meeting.venue}
                <br />
                {troop.meeting.address}
              </p>
              <Link href="/join" className="pill pill-navy pill-sm w-full">
                Visit a meeting
              </Link>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}

function Group({ title, items, empty }: { title: string; items: Item[]; empty?: string }) {
  return (
    <div className="mb-11 last:mb-0">
      <h2 className="mb-4 font-slab text-[12px] font-bold uppercase tracking-[1.8px] text-mute">
        {title}
      </h2>

      {items.length === 0 ? (
        <p className="m-0 text-[15px] text-mute">{empty}</p>
      ) : (
        <ul className="m-0 list-none space-y-3 p-0">
          {items.map((item) => (
            <li key={item.key}>
              <Card item={item} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const toneClass = {
  blue: "bg-blue/10 text-blue",
  gold: "bg-gold/25 text-[#7a610f]",
  forest: "bg-forest/10 text-forest",
  navy: "bg-navy/10 text-navy",
} as const;

function Card({ item }: { item: Item }) {
  const inner = (
    <>
      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
        <span
          className={`rounded-full px-2.5 py-1 font-slab text-[10px] font-bold uppercase tracking-[1.1px] ${toneClass[item.tone]}`}
        >
          {item.tag}
        </span>
        <span className="text-[13px] text-mute">{formatShort(item.date)}</span>
        {item.meta ? (
          <>
            <span aria-hidden className="text-hair">&bull;</span>
            <span className="text-[13px] text-mute">{item.meta}</span>
          </>
        ) : null}
      </div>

      <h3 className="mt-2 mb-0 font-slab text-[18px] font-bold leading-snug text-navy">
        {item.title}
      </h3>
      {item.body ? (
        <p className="mt-1.5 mb-0 text-[15px] leading-7 text-mute">{item.body}</p>
      ) : null}
    </>
  );

  const base = "block rounded-xl border border-hair bg-white p-5 transition";

  return item.href ? (
    <Link href={item.href} className={`${base} hover:border-blue/40 hover:shadow-md`}>
      {inner}
    </Link>
  ) : (
    <div className={base}>{inner}</div>
  );
}

function formatShort(iso: string): string {
  const d = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
