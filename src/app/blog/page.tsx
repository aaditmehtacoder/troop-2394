import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { StoryCard } from "@/components/site/StoryCard";
import { getPosts } from "@/lib/content";
import { pageHeroPhoto } from "@/data/photos";
import { troop } from "@/data/troop";

export const metadata: Metadata = {
  title: "Troop Blog",
  description: `Trip reports written by the Scouts of ${troop.name}: campouts, summer camp, service, and Eagle Scouts.`,
};

export default async function BlogPage() {
  const posts = await getPosts();
  const [lead, ...rest] = posts;

  return (
    <>
      <PageHero
        eyebrow="Written by the Scouts"
        title="Stories"
        lede="Every outing, in the Scouts' own words."
        photo={pageHeroPhoto.blog}
        crumb="Blog"
      />

      <Section>
        {lead ? (
          <Reveal>
            <StoryCard post={lead} big />
          </Reveal>
        ) : null}

        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 80} className="h-full">
              <StoryCard post={post} />
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
