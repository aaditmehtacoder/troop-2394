import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHead({
  eyebrow,
  title,
  lede,
  align = "center",
  tone = "navy",
}: {
  eyebrow?: string;
  title: string;
  lede?: ReactNode;
  align?: "center" | "left";
  tone?: "navy" | "white";
}) {
  const isCenter = align === "center";
  return (
    <Reveal className={isCenter ? "text-center" : ""}>
      {eyebrow && (
        <p
          className={`mb-2 font-slab text-[12px] font-bold uppercase tracking-[2px] ${
            tone === "white" ? "text-white/70" : "text-blue"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2 className={`h-section ${tone === "white" ? "!text-white" : ""}`}>{title}</h2>
      {lede && (
        <p
          className={`mt-4 mb-0 text-[16px] leading-7 ${isCenter ? "mx-auto max-w-3xl" : "max-w-3xl"} ${
            tone === "white" ? "text-white/85" : "text-mute"
          }`}
        >
          {lede}
        </p>
      )}
    </Reveal>
  );
}

export function Section({
  children,
  className = "",
  bleed = false,
  id,
}: {
  children: ReactNode;
  className?: string;
  bleed?: boolean;
  id?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-[130px] py-16 md:py-20 ${className}`}>
      {bleed ? children : <div className="shell">{children}</div>}
    </section>
  );
}

/** Small navy rule used under headings on interior pages. */
export function Rule({ tone = "blue" }: { tone?: "blue" | "white" }) {
  return (
    <span
      aria-hidden
      className={`mt-5 block h-[3px] w-14 rounded-full ${tone === "white" ? "bg-white/60" : "bg-blue"}`}
    />
  );
}
