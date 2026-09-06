import { photo, type Photo, type PhotoKey } from "@/data/photos";

/**
 * Pick a cover picture for a story or an event from where it happened.
 *
 * Only real matches: a post about Sunset Beach gets Sunset Beach. Anything
 * else (the Elks Lodge, mini golf, a court of honor) gets no photo, and the
 * card is typographic instead of showing a picture of somewhere else.
 * A `cover_url` set in the admin dashboard always wins.
 */
const rules: [RegExp, PhotoKey][] = [
  [/sunset (state )?beach/i, "sunset-beach-2"],
  [/hi-?sierra|long barn|stanislaus|bear ?paw/i, "hi-sierra"],
  [/camp lotus|american river|raft/i, "rafting-aerial"],
  [/yosemite/i, "yosemite"],
  [/sequoia|kings canyon/i, "sequoia-2"],
  [/pinnacles/i, "pinnacles"],
  [/grant (county|ranch)|joseph d\. grant/i, "grant-lake"],
  [/uvas/i, "uvas"],
];

export type Cover = Pick<Photo, "src" | "small" | "alt"> & { key?: PhotoKey };

export function coverFor(item: { location?: string; title?: string; coverUrl?: string | null }): Cover | null {
  if (item.coverUrl) return { src: item.coverUrl, small: item.coverUrl, alt: item.title ?? "" };
  const hay = `${item.location ?? ""} ${item.title ?? ""}`;
  for (const [re, key] of rules) if (re.test(hay)) return { ...photo(key), key };
  return null;
}
