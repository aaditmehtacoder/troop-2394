"use client";

import { useEffect, useState } from "react";
import { testimonials } from "@/data/troop";
import { IconArrow } from "@/components/brand/Marks";

/** Quote carousel with dot pagination, mirroring the scouting.org testimonial Swiper. */
export function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const t = setInterval(() => setI((v) => (v + 1) % testimonials.length), 8000);
    return () => clearInterval(t);
  }, [paused]);

  const t = testimonials[i];
  const initials = t.name
    .split(" ")
    .map((w) => w[0])
    .join("");

  return (
    <div
      className="relative mx-auto max-w-3xl text-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="What families say"
    >
      <div
        aria-hidden
        className="mx-auto mb-6 font-slab text-[64px] leading-[0.6] text-blue/25"
      >
        &ldquo;
      </div>

      <blockquote key={i} className="animate-in fade-in duration-500">
        <p className="mb-0 font-slab text-[clamp(18px,2.6vw,26px)] font-medium leading-[1.45] text-navy">
          {t.quote}
        </p>
      </blockquote>

      <div className="mt-7 flex items-center justify-center gap-3.5">
        <span
          aria-hidden
          className="grid h-12 w-12 place-items-center rounded-full bg-navy font-slab text-[15px] font-bold text-white"
        >
          {initials}
        </span>
        <span className="text-left">
          <span className="block font-slab text-[15px] font-bold text-navy">{t.name}</span>
          <span className="block text-[13px] text-mute">{t.role}</span>
        </span>
      </div>

      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          type="button"
          aria-label="Previous quote"
          onClick={() => setI((v) => (v - 1 + testimonials.length) % testimonials.length)}
          className="grid h-9 w-9 place-items-center rounded-full border border-hair text-mute transition hover:border-blue hover:text-blue"
        >
          <IconArrow className="h-4 w-4 rotate-180" />
        </button>

        <div className="flex gap-2">
          {testimonials.map((q, n) => (
            <button
              key={q.name}
              type="button"
              onClick={() => setI(n)}
              aria-label={`Quote ${n + 1} of ${testimonials.length}`}
              aria-current={n === i}
              className={`h-2.5 rounded-full transition-all ${
                n === i ? "w-7 bg-navy" : "w-2.5 bg-hair hover:bg-mute"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Next quote"
          onClick={() => setI((v) => (v + 1) % testimonials.length)}
          className="grid h-9 w-9 place-items-center rounded-full border border-hair text-mute transition hover:border-blue hover:text-blue"
        >
          <IconArrow className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
