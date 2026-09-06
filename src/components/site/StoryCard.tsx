import Link from "next/link";
import type { Post } from "@/lib/content";
import { coverFor } from "@/lib/covers";

const kindTone: Record<string, string> = {
  "Trip report": "bg-forest text-white",
  "Summer camp": "bg-gold text-navy",
  Service: "bg-blue text-white",
  Milestone: "bg-red text-white",
  News: "bg-navy text-white",
};

function when(iso: string) {
  const d = new Date(`${iso}T12:00:00`);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

/** A story from the blog: a real picture of the place when we have one. */
export function StoryCard({ post, big = false }: { post: Post; big?: boolean }) {
  const cover = coverFor({ location: post.location, title: post.title, coverUrl: post.coverUrl });
  const tone = kindTone[post.kind] ?? kindTone.News;
  const d = new Date(`${post.date}T12:00:00`);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group photo-zoom flex h-full flex-col overflow-hidden rounded-xl border border-hair bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className={`relative overflow-hidden ${big ? "h-64 md:h-80" : "h-48"}`}>
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
          <div className="contours relative flex h-full w-full flex-col justify-end bg-navy p-5 text-white">
            <span className="font-slab text-[clamp(52px,8vw,76px)] font-bold leading-none">
              {d.toLocaleDateString("en-US", { day: "numeric" })}
            </span>
            <span className="mt-1 font-slab text-[12px] font-bold uppercase tracking-[1.6px] text-gold">
              {d.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </span>
          </div>
        )}
        <span
          className={`absolute left-4 top-4 rounded-full px-2.5 py-1 font-slab text-[10px] font-bold uppercase tracking-[1.2px] ${tone}`}
        >
          {post.kind}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="m-0 text-[12.5px] text-mute">
          {when(post.date)}
          {post.author ? ` · ${post.author}` : ""}
        </p>
        <h3
          className={`mt-1.5 mb-0 font-slab font-bold leading-snug text-navy transition group-hover:text-blue ${
            big ? "text-[24px]" : "text-[18px]"
          }`}
        >
          {post.title}
        </h3>
        <p className="mt-2 mb-0 line-clamp-2 text-[14px] leading-6 text-mute">{post.excerpt}</p>
      </div>
    </Link>
  );
}
