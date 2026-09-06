/**
 * Seed Supabase with the researched Troop 2/394 content.
 *
 *   SUPABASE_SECRET_KEY=... node scripts/seed.mjs
 *
 * Idempotent: every table is matched on a natural key, so running it twice
 * updates rather than duplicates. It never deletes anything you have added.
 */

import { blogPosts } from "../src/data/blog.ts";
import {
  calendar,
  eagleHonorRoll,
  eagleProjects,
  eagleProjectNicky,
  resourceLinks,
  troopForms,
  outingHistory,
} from "../src/data/troop.ts";

const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://lcvnmggzpuffurozokua.supabase.co";
const KEY = process.env.SUPABASE_SECRET_KEY;

if (!KEY) {
  console.error("Set SUPABASE_SECRET_KEY (the service_role key) before running.");
  process.exit(1);
}

async function upsert(table, rows, onConflict) {
  if (rows.length === 0) return;
  const url = `${URL_BASE}/rest/v1/${table}?on_conflict=${onConflict}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      apikey: KEY,
      Authorization: `Bearer ${KEY}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify(rows),
  });
  if (!res.ok) {
    console.error(`  ${table}: HTTP ${res.status} ${(await res.text()).slice(0, 300)}`);
  } else {
    console.log(`  ${table}: ${rows.length} rows`);
  }
}

/* ------------------------------------------------------------------ posts */
const posts = blogPosts.map((p) => ({
  slug: p.slug,
  title: p.title,
  excerpt: p.excerpt,
  body: p.body.join("\n\n"),
  author: p.author,
  kind: p.kind,
  event_date: p.date,
  source_url: p.source ? null : null,
  published: true,
}));

/* ----------------------------------------------------------------- events */
const events = calendar.map((e) => ({
  title: e.title,
  kind: e.kind,
  starts_on: e.date,
  ends_on: e.endDate ?? null,
  location: e.location,
  note: e.note ?? null,
  published: true,
}));

/* ----------------------------------------------------------------- eagles */
const projectByName = new Map();
for (const p of [...eagleProjects, eagleProjectNicky]) {
  projectByName.set(p.name, { project: p.headline, source_url: p.source });
}
const eagles = eagleHonorRoll.map((e) => {
  const extra = projectByName.get(e.name) ?? projectByName.get(e.name.replace(/^Nicholas/, "Nick"));
  return {
    name: e.name,
    year: e.year,
    troop: e.troop,
    project: extra?.project ?? null,
    source_url: extra?.source_url ?? null,
    published: true,
  };
});

/* -------------------------------------------------------------- resources */
const resources = [
  // Troop forms are handed out at meetings; without a real file there is no link to seed.
  ...troopForms.filter((f) => f.href && f.href !== "#").map((f, i) => ({
    label: f.label,
    href: f.href,
    category: "Troop form",
    description: f.note,
    sort: i,
    published: true,
  })),
  ...resourceLinks.map((l, i) => ({
    label: l.label,
    href: l.href,
    category: /health|safety|protection/i.test(l.label)
      ? "Health and safety"
      : /merit|eagle|scoutbook/i.test(l.label)
        ? "Advancement"
        : /council|district|camp/i.test(l.label)
          ? "Council"
          : "Other",
    description: l.note,
    sort: 100 + i,
    published: true,
  })),
];

/* ----------------------------------------------------------------- albums */
const albums = outingHistory.flatMap((y) =>
  y.outings.map((title) => ({
    title: `${y.year} ${title}`,
    year: y.year,
    published: true,
  })),
);

/* ---------------------------------------------------------- announcements */
const announcements = [
  {
    title: "Visitors are welcome at any Tuesday meeting",
    body: "No forms, no uniform, no commitment. Come and watch the Scouts run their own meeting, Tuesdays at 7:00 PM.",
    link: "/join",
    pinned: true,
    published: true,
  },
];

console.log("Seeding Troop 2/394 content");
await upsert("posts", posts, "slug");
await upsert("events", events, "title,starts_on");
await upsert("eagles", eagles, "name,year");
await upsert("resources", resources, "label");
await upsert("albums", albums, "title");
await upsert("announcements", announcements, "title");
console.log("Done.");
