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

/** The database has no location column; the committed post of the same slug does. */
const staticBySlug = new Map(blogPostsByDate.map((p) => [p.slug, p]));

function rowToPost(r: PostRow): Post {
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    date: r.event_date ?? r.created_at.slice(0, 10),
    author: r.author ?? "Troop 2/394",
    kind: (r.kind as BlogPost["kind"]) ?? "Trip report",
    location: staticBySlug.get(r.slug)?.location ?? "",
    excerpt: r.excerpt ?? "",
    body: (r.body ?? "").split(/\n{2,}|\n/).map((s) => s.trim()).filter(Boolean),
    source: r.source_url ?? "",
    coverUrl: r.cover_url,
  };
}

export async function getPosts(): Promise<Post[]> {
  const supabase = await createClient();
  if (!supabase) return blogPostsByDate;

  const { data, error } = await supabase
    .from("posts")
    .select("id, slug, title, excerpt, body, author, kind, event_date, cover_url, source_url, created_at")
    .eq("published", true)
    .order("event_date", { ascending: false, nullsFirst: false });

  if (error || !data || data.length === 0) return blogPostsByDate;
  return (data as PostRow[]).map(rowToPost);
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
