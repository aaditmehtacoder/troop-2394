"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { heroSlides, troop } from "@/data/troop";
import { Scene } from "@/components/brand/Scenes";
import { FleurDeLis } from "@/components/brand/Marks";

const INTERVAL = 7000;

/**
 * Full-bleed autoplaying hero, mirroring the Elementor Swiper on scouting.org:
 * background scene + dark veil + centred mark + H2 + pill CTA + dot pagination.
 * Autoplay pauses on hover, on focus within, and when the tab is hidden.
 */
export function Hero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((n: number) => setI(((n % heroSlides.length) + heroSlides.length) % heroSlides.length), []);

  useEffect(() => {
    if (paused) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    timer.current = setInterval(() => setI((v) => (v + 1) % heroSlides.length), INTERVAL);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused]);

  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return (
    <section
      className="relative isolate overflow-hidden"
      aria-roledescription="carousel"
      aria-label="Troop 2/394 highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="relative h-[clamp(520px,78vh,720px)] w-full">
        {heroSlides.map((s, n) => (
          <div
            key={s.title}
            className="absolute inset-0 transition-opacity duration-[900ms] ease-out"
            style={{ opacity: n === i ? 1 : 0 }}
            aria-hidden={n !== i}
          >
            <Scene name={s.scene} className="absolute inset-0 h-full w-full object-cover" />
          </div>
        ))}

        {/* content */}
        <div className="relative z-10 flex h-full items-center">
          <div className="shell w-full text-center">
            <FleurDeLis className="mx-auto mb-6 h-14 w-auto text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]" />

            {heroSlides.map((s, n) => {
              // Only the active slide's headline is the page <h1>; the others
              // keep the same styling as plain divs so the page has exactly one.
              const Headline = n === i ? "h1" : "div";
              return (
              <div
                key={s.title}
                className={`transition-all duration-700 ${
                  n === i
                    ? "relative translate-y-0 opacity-100"
                    : "pointer-events-none absolute inset-x-0 translate-y-3 opacity-0"
                }`}
                aria-hidden={n !== i}
              >
                <p className="mb-3 font-slab text-[12px] font-bold uppercase tracking-[2.4px] text-white/80">
                  {s.eyebrow}
                </p>
                <Headline className="mx-auto max-w-4xl font-slab text-[clamp(30px,5.6vw,54px)] font-bold leading-[1.1] !text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.4)]">
                  {s.title}
                </Headline>
                <p className="mx-auto mt-5 mb-0 max-w-2xl text-[16px] leading-7 text-white/90 drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)]">
                  {s.body}
                </p>
                <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                  <Link href={s.cta.href} className="pill pill-white">
                    {s.cta.label}
                  </Link>
                  <Link href={s.secondary.href} className="pill pill-ghost">
                    {s.secondary.label}
                  </Link>
                </div>
              </div>
              );
            })}
          </div>
        </div>

        {/* pagination */}
        <div className="absolute inset-x-0 bottom-7 z-10 flex items-center justify-center gap-2.5">
          {heroSlides.map((s, n) => (
            <button
              key={s.title}
              type="button"
              onClick={() => go(n)}
              aria-label={`Go to slide ${n + 1}: ${s.title}`}
              aria-current={n === i}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                n === i ? "w-8 bg-white" : "w-2.5 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>

      {/* meeting strip below the hero */}
      <div className="bg-navy py-4 text-white">
        <div className="shell flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-center font-slab text-[13px] font-bold uppercase tracking-[1.4px]">
          <span>
            {troop.meeting.cadence} · {troop.meeting.time}
          </span>
          <span className="hidden h-4 w-px bg-white/30 sm:block" aria-hidden />
          <span>{troop.meeting.venue}</span>
          <span className="hidden h-4 w-px bg-white/30 sm:block" aria-hidden />
          <Link href="/contact" className="text-white underline-offset-4 hover:underline">
            Visitors always welcome →
          </Link>
        </div>
      </div>
    </section>
  );
}
