import { Backdrop } from "@/components/photo/Backdrop";
import { Reveal } from "@/components/site/Reveal";
import { testimonials } from "@/data/troop";

/**
 * One Scout's own words over one of the troop's own photographs: the quiet
 * beat between the pictures above and the stories below.
 */
export function ScoutQuote() {
  // The Eagle Scout's line the troop kept for the home page.
  const q = testimonials[0];

  return (
    <section className="relative isolate overflow-hidden py-28 md:py-40">
      {/* A night photo is dark already; the standard band veil turned it
          black. A lighter wash keeps the trees and the lodge lights. */}
      <Backdrop photo="camp-night" veil="none" position="center 80%" drift />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[rgb(0_24_56/0.42)]" />
      <Reveal className="shell">
        <figure className="m-0 mx-auto max-w-4xl text-center">
          <blockquote className="m-0">
            <p className="mb-0 font-slab text-[clamp(26px,3.6vw,44px)] font-medium leading-[1.25] text-balance !text-white">
              &ldquo;{q.quote}&rdquo;
            </p>
          </blockquote>
          <figcaption className="mt-8">
            <span className="block font-slab text-[14px] font-bold uppercase tracking-[2px] text-gold">
              {q.name}
            </span>
            <span className="mt-1 block text-[13px] text-white/70">{q.role}</span>
          </figcaption>
        </figure>
      </Reveal>
    </section>
  );
}
