import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { PhotoMosaic } from "@/components/sections/PhotoMosaic";
import { ScoutQuote } from "@/components/sections/ScoutQuote";
import { StoryPreview } from "@/components/site/StoryPreview";
import { Reveal } from "@/components/site/Reveal";
import { IconArrow } from "@/components/brand/Marks";
import { getFeaturedPosts } from "@/lib/content";

/**
 * Pictures first, words last: the hero, the places the troop goes, one
 * Scout's words, and the three stories the troop chose. The invitation to
 * visit is the footer's, on every page, so the home page does not repeat it.
 */
export default async function Home() {
  const stories = await getFeaturedPosts();

  return (
    <>
      <Hero />

      <section className="py-20 md:py-28">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
            <Reveal>
              <h2 className="h-section">A campout every month</h2>
            </Reveal>
            <Reveal>
              <Link
                href="/outdoors"
                className="group inline-flex items-center gap-2 font-slab text-[13px] font-bold uppercase tracking-[1.4px] text-navy transition hover:text-blue"
              >
                Where we go
                <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
          <div className="mt-10 md:mt-12">
            <PhotoMosaic />
          </div>
        </div>
      </section>

      <ScoutQuote />

      <section className="bg-shell py-20 md:py-28">
        <div className="shell">
          <Reveal>
            <h2 className="h-section">Written by the Scouts</h2>
          </Reveal>
          <div className="mt-10 grid gap-x-8 gap-y-12 md:mt-12 md:grid-cols-3">
            {stories.map((p, i) => (
              <Reveal key={p.slug} delay={i * 90}>
                <StoryPreview post={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
