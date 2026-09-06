"use client";

import { useEffect, useRef, useState } from "react";

/** A number that counts up the first time it scrolls into view. */
export function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const target = Number(value.replace(/[^0-9.]/g, ""));
  const suffix = value.replace(/[0-9.,]/g, "");
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(Number.isFinite(target) ? 0 : target);

  useEffect(() => {
    const el = ref.current;
    if (!el || !Number.isFinite(target)) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        if (reduce) {
          setN(target);
          return;
        }
        const start = performance.now();
        const dur = 1400;
        const tick = (t: number) => {
          const k = Math.min(1, (t - start) / dur);
          const eased = 1 - Math.pow(1 - k, 3);
          setN(Math.round(target * eased));
          if (k < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  return (
    <span ref={ref} className={className}>
      {Number.isFinite(target) ? n : value}
      {suffix}
    </span>
  );
}
