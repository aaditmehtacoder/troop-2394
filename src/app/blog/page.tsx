import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHead } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { StoryCard } from "@/components/site/StoryCard";
import { getFeaturedPosts } from "@/lib/content";
import { pageHeroPhoto } from "@/data/photos";
import { troop } from "@/data/troop";

export const metadata: Metadata = {
  title: "Stories",
  description: `Three stories written by the Scouts of ${troop.name}. The full archive is in the members' area.`,
};

/**
 * Three stories, chosen by the troop, and no dates on them.
 *
 * A visitor does not want an archive; they want to know what the troop is like.
 * So this page is a sample, not a feed: whichever three the troop picks, in the
 * Scouts' own words. Everything else lives behind the members' area.
 */
export default async function BlogPage() {
  const posts = await getFeaturedPosts();

  return (
    <>
      <PageHero
        eyebrow="Written by the Scouts"
        title="Stories"
        lede="What a year in the troop actually looks like, written by the Scouts who were there."
        photo={pageHeroPhoto.blog}
        crumb="Stories"
      />

      <Section>
        <SectionHead
          title="Three from the Scouts"
          lede="A campout, a week at summer camp, and a service project. Every word is a Scout's own."
        />

        <div className="mt-11 grid gap-6 md:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 90} className="h-full">
              <StoryCard post={post} showDate={false} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-12 rounded-lg border border-hair bg-shell p-8 text-center">
            <h3 className="mt-0 font-slab text-[19px] font-bold text-navy">
              Every other story is in the members&rsquo; area
            </h3>
            <p className="mx-auto mt-2 mb-6 max-w-xl text-[15px] leading-7 text-slate">
              Forty-odd trip reports going back to 2015, the full calendar, and the troop&rsquo;s
              forms. Scouts and their parents can sign in with Google.
            </p>
            <Link href="/members" className="pill pill-navy">
              Go to the members&rsquo; area
            </Link>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
