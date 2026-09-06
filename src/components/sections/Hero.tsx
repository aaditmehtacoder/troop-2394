"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { heroSlides } from "@/data/troop";
import { photo } from "@/data/photos";
import type { TroopEvent } from "@/data/troop";
import { formatRange } from "@/components/site/EventCard";

const INTERVAL = 8000;

/**
 * Full-bleed photographic hero. Slides crossfade while the active picture
 * slowly pushes in; the copy rises line by line each time the slide changes.
 * Autoplay pauses on hover, on focus, and when the tab is hidden.
 */
export function Hero({ events }: { events: TroopEvent[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback(
    (n: number) => setI(((n % heroSlides.length) + heroSlides.length) % heroSlides.length),
    [],
  );

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
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

  const slide = heroSlides[i];

  return (
    <section
      className="relative isolate overflow-hidden bg-navy-dark text-white"
      aria-roledescription="carousel"
      aria-label="Troop 2/394 highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* pictures */}
      <div className="grain absolute inset-0">
        {heroSlides.map((s, n) => {
          const p = photo(s.photo);
          const on = n === i;
          return (
            <div
              key={s.photo}
              className="absolute inset-0 transition-opacity duration-[1400ms] ease-out"
              style={{ opacity: on ? 1 : 0 }}
              aria-hidden={!on}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized JPEGs, no optimizer */}
              <img
                src={p.src}
                alt=""
                width={p.width}
                height={p.height}
                loading={n === 0 ? "eager" : "lazy"}
                fetchPriority={n === 0 ? "high" : "auto"}
                decoding="async"
                className={`h-full w-full object-cover ${on ? "kenburns" : ""}`}
                style={{ objectPosition: s.position ?? "center" }}
              />
              <div className="absolute inset-0 veil-hero" />
            </div>
          );
        })}
      </div>

      {/* copy, anchored to the bottom left */}
      <div className="relative z-10 flex min-h-[clamp(600px,88vh,860px)] flex-col justify-end">
        <div className="shell pb-16 pt-32 md:pb-24">
          <div key={i} className="max-w-4xl">
            <p className="rise rise-1 rule-gold mb-4 font-slab text-[12px] font-bold uppercase tracking-[2.6px] text-white/85">
              {slide.eyebrow}
            </p>
            <h1 className="rise rise-2 font-slab text-[clamp(40px,8vw,96px)] font-bold uppercase leading-[0.94] tracking-[-1px] !text-white drop-shadow-[0_3px_24px_rgba(0,0,0,0.45)]">
              {slide.title}
            </h1>
            <p className="rise rise-3 mt-6 mb-0 max-w-xl text-[17px] leading-7 text-white/90">{slide.body}</p>
            <div className="rise rise-4 mt-9 flex flex-wrap items-center gap-3">
              <Link href={slide.cta.href} className="pill pill-white">
                {slide.cta.label}
              </Link>
              <Link href={slide.secondary.href} className="pill pill-ghost">
                {slide.secondary.label}
              </Link>
            </div>
          </div>

          {/* slide controls */}
          <div className="mt-12 flex items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              {heroSlides.map((s, n) => (
                <button
                  key={s.photo}
                  type="button"
                  onClick={() => go(n)}
                  aria-label={`Go to slide ${n + 1}: ${s.title}`}
                  aria-current={n === i}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    n === i ? "w-12 bg-gold" : "w-5 bg-white/45 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
            <p className="m-0 font-slab text-[12px] font-bold tracking-[2px] text-white/70">
              {String(i + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}
            </p>
          </div>
        </div>

        {/* what is next, on a loop */}
        {events.length > 0 ? <Ticker events={events} /> : null}
      </div>
    </section>
  );
}

function Ticker({ events }: { events: TroopEvent[] }) {
  const items = events.slice(0, 8);
  const row = (
    <>
      {items.map((e) => (
        <Link
          key={e.date + e.title}
          href="/calendar"
          className="flex shrink-0 items-center gap-3 px-7 font-slab text-[13px] font-bold uppercase tracking-[1.4px] text-white/85 transition hover:text-gold"
        >
          <span className="text-gold">{formatRange(e)}</span>
          <span>{e.title}</span>
          <span aria-hidden className="ml-4 text-white/30">✦</span>
        </Link>
      ))}
    </>
  );
  return (
    <div className="marquee-wrap relative z-10 border-t border-white/15 bg-navy/85 py-3.5 backdrop-blur-sm">
      <div className="shell flex items-center">
        <span className="mr-2 shrink-0 rounded-full bg-gold px-3 py-1 font-slab text-[11px] font-bold uppercase tracking-[1.6px] text-navy">
          Next up
        </span>
        <div className="overflow-hidden">
          <div className="marquee flex w-max">
            {row}
            <span aria-hidden className="contents">
              {row}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
