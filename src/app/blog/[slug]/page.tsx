import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { StoryCard } from "@/components/site/StoryCard";
import { Backdrop } from "@/components/photo/Backdrop";
import { getPost, getPosts } from "@/lib/content";
import { coverFor } from "@/lib/covers";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post not found" };
  return { title: post.title, description: post.excerpt };
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const all = await getPosts();
  const more = all.filter((p) => p.slug !== post.slug).slice(0, 3);
  const cover = coverFor({ location: post.location, title: post.title, coverUrl: post.coverUrl });
  const eyebrow = `${post.kind} · ${formatFull(post.date)}`;

  return (
    <>
      {cover?.key ? (
        <PageHero eyebrow={eyebrow} title={post.title} photo={cover.key} crumb="Blog" />
      ) : cover ? (
        <section className="relative isolate overflow-hidden">
          <Backdrop src={cover.src} veil="hero" priority />
          <div className="shell flex min-h-[clamp(360px,48vh,520px)] flex-col justify-end pb-12 pt-24">
            <p className="rise rise-1 rule-gold mb-3 font-slab text-[12px] font-bold uppercase tracking-[2.4px] text-white/85">{eyebrow}</p>
            <h1 className="rise rise-2 max-w-4xl font-slab text-[clamp(36px,6.4vw,72px)] font-bold uppercase leading-[0.98] !text-white">{post.title}</h1>
          </div>
        </section>
      ) : (
        <section className="bg-navy text-white">
          <div className="shell flex min-h-[300px] flex-col justify-end pb-12 pt-24">
            <p className="rise rise-1 rule-gold mb-3 font-slab text-[12px] font-bold uppercase tracking-[2.4px] text-white/85">{eyebrow}</p>
            <h1 className="rise rise-2 max-w-4xl font-slab text-[clamp(36px,6.4vw,72px)] font-bold uppercase leading-[0.98] !text-white">{post.title}</h1>
          </div>
        </section>
      )}

      <Section>
        <div className="mx-auto max-w-[720px]">
          <p className="mb-8 flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-hair pb-6 font-slab text-[12px] font-bold uppercase tracking-[1.2px] text-mute">
            <span className="text-blue">By {post.author}</span>
            {post.location ? (
              <>
                <span aria-hidden className="text-hair">&bull;</span>
                <span>{post.location}</span>
              </>
            ) : null}
          </p>

          <p className="mb-8 font-slab text-[20px] leading-8 text-navy">{post.excerpt}</p>

          <div className="prose-troop">
            {post.body.map((para, i) => (
              <p key={i} className="mb-5 text-[17px] leading-8 text-ink">
                {para}
              </p>
            ))}
          </div>

          {post.source ? (
            <p className="mt-8 border-t border-hair pt-5 text-[13px] leading-6 text-mute">
              Source: {post.source}
            </p>
          ) : null}

          <p className="mt-9">
            <Link href="/blog" className="pill pill-outline pill-sm">
              All stories
            </Link>
          </p>
        </div>
      </Section>

      {more.length > 0 ? (
        <Section className="bg-shell/60">
          <h2 className="h-four mb-6">More from the troop</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {more.map((p) => (
              <StoryCard key={p.slug} post={p} />
            ))}
          </div>
        </Section>
      ) : null}
    </>
  );
}

function formatFull(iso: string): string {
  const d = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}
