import Link from "next/link";
import type { Post } from "@/lib/content";
import { coverFor } from "@/lib/covers";
import { PhotoPlaceholder } from "@/components/photo/PhotoPlaceholder";

/** Browsers break lines at a hyphen, which leaves "Camp Hi-" on one line and
 *  "Sierra" on the next. Keep hyphenated words whole. */
function keepHyphenated(text: string) {
  return text.split(/(\S+-\S+)/).map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="whitespace-nowrap">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

/**
 * A story as its picture, its title and who wrote it, nothing more. The home
 * page shows the troop's three chosen stories this way; the words are in the
 * story itself, one click away.
 */
export function StoryPreview({ post }: { post: Post }) {
  const cover = coverFor({
    slug: post.slug,
    location: post.location,
    title: post.title,
    coverUrl: post.coverUrl,
  });
  const by = post.author === "A Scout" ? "a Scout" : post.author;

  return (
    <Link href={`/blog/${post.slug}`} className="group photo-zoom block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-navy">
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element -- pre-sized JPEGs, no optimizer
          <img
            src={cover.small}
            alt={cover.alt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        ) : (
          <PhotoPlaceholder seed={post.slug} compact className="h-full w-full" />
        )}
      </div>
      <h3 className="mt-5 mb-0 font-slab text-[21px] font-bold leading-snug text-balance text-navy transition group-hover:text-blue">
        {keepHyphenated(post.title)}
      </h3>
      <p className="mt-1.5 mb-0 text-[14px] text-mute">By {by}</p>
    </Link>
  );
}
