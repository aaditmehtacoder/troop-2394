/**
 * ============================================================================
 * READING CONTENT
 * ============================================================================
 * Every page asks this module, never Supabase directly.
 *
 * The rule is the same everywhere: if the database has rows, use them; if it
 * is empty or not configured, fall back to the researched content committed in
 * src/data. That way the site is complete on a fresh clone with no keys, and it
 * becomes editable the moment Supabase is connected.
 * ==========================================================================*/

import { createClient } from "@/lib/supabase/server";
import { blogPostsByDate, type BlogPost } from "@/data/blog";
import { calendar, type TroopEvent } from "@/data/troop";

/* --------------------------------------------------------------- posts --- */

export type Post = BlogPost & { id?: string; coverUrl?: string | null };

type PostRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string | null;
  author: string | null;
  kind: string | null;
  event_date: string | null;
  cover_url: string | null;
  source_url: string | null;
  created_at: string;
};

/* ------------------------------------------------- who and what we show --- */

/**
 * Stories on the public site are the Scouts' own writing. Posts by adults in
 * the troop stay in the members' archive rather than on the front of the site.
 *
 * These are first names, because that is all a byline keeps. No Scout who
 * writes for the troop shares one; check here before adding a name.
 */
const LEADER_AUTHORS = new Set(["David", "Michelle", "Mark"]);

/** Not shown anywhere, on the public site or in the members' archive. */
const HIDDEN_SLUGS = new Set(["new-youth-leadership-and-fall-2026-schedule"]);

/**
 * The handful of stories a visitor sees, chosen by the troop rather than by
 * date: one campout, one week at summer camp, one service project. Everything
 * else is in the members' area.
 */
export const FEATURED_SLUGS = [
  "white-water-rafting-2026",
  "camp-hi-sierra-2025",
  "adopt-a-campsite-2026",
];

/**
 * Surnames that have appeared in troop content, and what they collapse to.
 *
 * This runs on the way out, not on the way in, because the content can come
 * from the database as easily as from src/data: somebody typing a full name
 * into the admin should not be able to put a Scout's surname on a public page.
 * Add to this list rather than editing the row.
 */
const SURNAMES: [RegExp, string][] = [
  [/\bAdriana\s+Chapa\b/g, "Adriana"],
  [/\bNicky\s+Chapa\b/g, "Nicky"],
  [/\bEamonn(\s+Michael)?\s+Donnelly\b/g, "Eamonn"],
  [/\bSreeya(\s+J\.?)?\s+Nair\b/g, "Sreeya"],
  [/\bJoshua(\s+Alexander)?\s+Mechlin\b/g, "Joshua"],
  [/\bJosh\s+Mechlin\b/g, "Josh"],
  [/\bSkylar(\s+A\.?)?\s+Mechlin\b/g, "Skylar"],
  [/\bZachary\s+Mechlin\b/g, "Zachary"],
  [/\bCharaka\s+Kudituwakku\b/g, "Charaka"],
  [/\bRobert\s+Ray\b/g, "Robert"],
  [/\bNicholas\s+Morris\b/g, "Nicholas"],
  [/\bNick\s+Morris\b/g, "Nick"],
  [/\bAminah\s+Hedges\b/g, "Aminah"],
  [/\bSofia\s+Orosa\b/g, "Sofia"],
  [/\bBen\s+Caldwell\b/g, "Ben"],
  [/\bMr\.?\s+Scharberg\b/g, "one of our leaders"],
  [/\bDavid\s+Scharberg\b/g, "David"],
  [/\bMichelle\s+Ray\b/g, "Michelle"],
  [/\bMark\s+Plummer,?\s*ASM\b/g, "Mark"],
  // Any surname left over on its own, after the pairs above have run.
  [/\b(Chapa|Donnelly|Mechlin|Kudituwakku|Scharberg|Orosa|Hedges|Caldwell)\b/g, ""],
];

/** First names only, in every string a page can render. */
export function stripSurnames(text: string): string {
  let out = text;
  for (const [re, to] of SURNAMES) out = out.replace(re, to);
  return out.replace(/\s{2,}/g, " ").replace(/\s+([,.;:])/g, "$1").trim();
}

/** Scouts are credited by first name. Never a surname, never a title. */
export function byline(author: string): string {
  const first = author.split(/[\s,]+/)[0]?.trim() ?? "";
  return first && first.toLowerCase() !== "a" ? first : "A Scout";
}

/** The database has no location column; the committed post of the same slug does. */
const staticBySlug = new Map(blogPostsByDate.map((p) => [p.slug, p]));

function rowToPost(r: PostRow): Post {
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    date: r.event_date ?? r.created_at.slice(0, 10),
    author: r.author ?? "Troop 394",
    kind: (r.kind as BlogPost["kind"]) ?? "Trip report",
    location: staticBySlug.get(r.slug)?.location ?? "",
    excerpt: r.excerpt ?? "",
    body: (r.body ?? "").split(/\n{2,}|\n/).map((s) => s.trim()).filter(Boolean),
    source: r.source_url ?? "",
    coverUrl: r.cover_url,
  };
}

/** Everything a page can show, with the name rules already applied. */
function clean(p: Post): Post {
  return {
    ...p,
    author: byline(p.author),
    title: stripSurnames(p.title),
    excerpt: stripSurnames(p.excerpt),
    body: p.body.map(stripSurnames),
  };
}

export async function getPosts(): Promise<Post[]> {
  const supabase = await createClient();
  if (!supabase) return blogPostsByDate.filter((p) => !HIDDEN_SLUGS.has(p.slug)).map(clean);

  const { data, error } = await supabase
    .from("posts")
    .select("id, slug, title, excerpt, body, author, kind, event_date, cover_url, source_url, created_at")
    .eq("published", true)
    .order("event_date", { ascending: false, nullsFirst: false });

  const posts =
    error || !data || data.length === 0 ? blogPostsByDate : (data as PostRow[]).map(rowToPost);

  return posts.filter((p) => !HIDDEN_SLUGS.has(p.slug)).map(clean);
}

/**
 * The full archive, Scouts and adults alike. Members' area only.
 */
export async function getArchivePosts(): Promise<Post[]> {
  return getPosts();
}

/**
 * What a visitor sees: the troop's three chosen stories, Scout-written.
 * Falls back to the newest Scout-written posts if a chosen slug is missing,
 * so the page is never empty after an edit in the admin.
 */
export async function getFeaturedPosts(): Promise<Post[]> {
  const all = await getPosts();
  const scouts = all.filter((p) => !LEADER_AUTHORS.has(p.author) && byline(p.author) !== "");
  const picked = FEATURED_SLUGS.map((slug) => scouts.find((p) => p.slug === slug)).filter(
    (p): p is Post => Boolean(p),
  );
  if (picked.length === FEATURED_SLUGS.length) return picked;

  const extra = scouts.filter((p) => !picked.some((q) => q.slug === p.slug));
  return [...picked, ...extra].slice(0, FEATURED_SLUGS.length);
}

export async function getPost(slug: string): Promise<Post | null> {
  const posts = await getPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

/* -------------------------------------------------------------- events --- */

type EventRow = {
  id: string;
  title: string;
  kind: string;
  starts_on: string;
  ends_on: string | null;
  location: string | null;
  note: string | null;
};

export async function getEvents(): Promise<TroopEvent[]> {
  const supabase = await createClient();
  if (!supabase) return [...calendar];

  const { data, error } = await supabase
    .from("events")
    .select("id, title, kind, starts_on, ends_on, location, note")
    .eq("published", true)
    .order("starts_on", { ascending: true });

  if (error || !data || data.length === 0) return [...calendar];

  return (data as EventRow[]).map((r) => ({
    date: r.starts_on,
    endDate: r.ends_on ?? undefined,
    title: r.title,
    kind: r.kind as TroopEvent["kind"],
    location: r.location ?? "",
    note: r.note ?? undefined,
  }));
}

/* ------------------------------------------------------- announcements --- */

export type Announcement = {
  id: string;
  title: string;
  body: string | null;
  link: string | null;
  pinned: boolean;
  created_at: string;
};

export async function getAnnouncements(): Promise<Announcement[]> {
  const supabase = await createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("announcements")
    .select("id, title, body, link, pinned, created_at")
    .eq("published", true)
    .order("pinned", { ascending: false })
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data as Announcement[];
}
