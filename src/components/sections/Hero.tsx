import Link from "next/link";
import { hero } from "@/data/troop";
import { photo } from "@/data/photos";

/**
 * Full-bleed photographic hero: one picture, one line, one next step. The
 * photo settles into place and the words rise in turn, once, on load.
 */
export function Hero() {
  const p = photo(hero.photo);

  return (
    <section className="relative isolate overflow-hidden bg-navy-dark text-white">
      <div className="grain absolute inset-0 -z-10">
        {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized JPEGs, no optimizer */}
        <img
          src={p.src}
          srcSet={`${p.small} 960w, ${p.src} ${p.width}w`}
          sizes="100vw"
          alt={p.alt}
          width={p.width}
          height={p.height}
          fetchPriority="high"
          decoding="async"
          className="kenburns h-full w-full object-cover"
          style={{ objectPosition: hero.position }}
        />
        <div className="absolute inset-0 veil-hero" />
      </div>

      <div className="shell flex min-h-[clamp(560px,84vh,840px)] flex-col justify-end pb-16 pt-32 md:pb-24">
        <h1 className="rise rise-1 max-w-4xl font-slab text-[clamp(44px,8.4vw,104px)] font-bold uppercase leading-[0.92] tracking-[-1px] !text-white drop-shadow-[0_3px_24px_rgba(0,0,0,0.35)]">
          {hero.title}
        </h1>
        <p className="rise rise-2 mt-6 mb-0 max-w-xl text-[clamp(17px,1.5vw,20px)] leading-relaxed text-balance text-white/90">
          {hero.body}
        </p>
        <div className="rise rise-3 mt-9">
          <Link href={hero.cta.href} className="pill pill-white">
            {hero.cta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
