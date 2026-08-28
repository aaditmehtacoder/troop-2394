import type { SVGProps } from "react";

/**
 * Original artwork for Troop 2/394. The fleur-de-lis is a centuries-old heraldic
 * charge used by Scouting worldwide; this is our own drawing of it, so the site
 * ships self-contained and hotlinks nothing.
 */

export function FleurDeLis({ className, ...props }: SVGProps<SVGSVGElement>) {
  // Classic three-lobed construction: a tall centre petal plus two shorter
  // petals rotated out from a shared pivot, with the band drawn last so it
  // crosses in front of all three junctions.
  return (
    <svg viewBox="0 0 100 122" className={className} aria-hidden="true" {...props}>
      <g fill="currentColor">
        <g transform="rotate(-55 50 74)" opacity="0.92">
          <path d="M50 24c-6 11-10 21-10 30 0 8 4 15 10 20 6-5 10-12 10-20 0-9-4-19-10-30Z" />
        </g>
        <g transform="rotate(55 50 74)" opacity="0.92">
          <path d="M50 24c-6 11-10 21-10 30 0 8 4 15 10 20 6-5 10-12 10-20 0-9-4-19-10-30Z" />
        </g>
        <path d="M50 4c-7 16-12 30-12 44 0 11 5 19 12 26 7-7 12-15 12-26 0-14-5-28-12-44Z" />
        <rect x="24" y="64" width="52" height="11" rx="5.5" />
        <path d="M45 75h10v25H45z" />
        <path d="M25 100h50c0 8-13 13-25 20-12-7-25-12-25-20Z" opacity="0.92" />
      </g>
    </svg>
  );
}

/** Circular troop badge: fleur-de-lis over the troop number. */
export function TroopBadge({
  className,
  number = "2/394",
  numerals = true,
  ...props
}: SVGProps<SVGSVGElement> & { number?: string; numerals?: boolean }) {
  // Below ~64px the numerals turn to mush, so small lockups render the mark
  // alone and let the adjacent wordmark carry the number.
  return (
    <svg viewBox="0 0 120 120" className={className} {...props} role="img" aria-label={`Troop ${number} badge`}>
      <circle cx="60" cy="60" r="58" fill="#003f87" />
      <circle cx="60" cy="60" r="54" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.65" />
      <circle cx="60" cy="60" r="48" fill="none" stroke="#ce1126" strokeWidth="3" />
      <g transform={`translate(60 ${numerals ? 15 : 24}) scale(${numerals ? 0.5 : 0.62}) translate(-50 0)`}>
        <FleurDeLis width="100" height="122" style={{ color: "#ffffff" }} />
      </g>
      {numerals && (
        <text
          x="60"
          y="102"
          textAnchor="middle"
          fill="#ffffff"
          fontFamily="Georgia, 'Roboto Slab', serif"
          fontWeight="700"
          fontSize="23"
          letterSpacing="-0.2"
          textLength="62"
          lengthAdjust="spacingAndGlyphs"
        >
          {number}
        </text>
      )}
    </svg>
  );
}

/** Horizontal lockup used in the header and footer. */
export function TroopLockup({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  const fg = tone === "light" ? "#ffffff" : "#003f87";
  const sub = tone === "light" ? "rgba(255,255,255,0.78)" : "#515354";
  return (
    <span className={className} style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
      <TroopBadge numerals={false} style={{ width: 42, height: 42, flexShrink: 0 }} />
      <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.05 }}>
        <span
          style={{
            fontFamily: "var(--font-slab)",
            fontWeight: 700,
            fontSize: 19,
            letterSpacing: "0.4px",
            color: fg,
            whiteSpace: "nowrap",
          }}
        >
          Troop 2/394
        </span>
        <span
          style={{
            fontFamily: "var(--font-slab)",
            fontWeight: 400,
            fontSize: 10.5,
            letterSpacing: "1.6px",
            textTransform: "uppercase",
            color: sub,
            whiteSpace: "nowrap",
          }}
        >
          Santa Clara · California
        </span>
      </span>
    </span>
  );
}

/* --------------------------------- icons -------------------------------- */

type IconProps = SVGProps<SVGSVGElement>;
const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconCompass(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
      <circle cx="12" cy="12" r="9" {...base} />
      <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" {...base} />
    </svg>
  );
}

export function IconShield(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
      <path d="M12 3 4.5 6v6c0 4.4 3.1 7.9 7.5 9 4.4-1.1 7.5-4.6 7.5-9V6L12 3Z" {...base} />
      <path d="m9 12 2.2 2.2L15.5 10" {...base} />
    </svg>
  );
}

export function IconStar(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
      <path d="m12 3.5 2.7 5.6 6.1.85-4.45 4.3 1.07 6.05L12 17.4l-5.42 2.9 1.07-6.05L3.2 9.95l6.1-.85L12 3.5Z" {...base} />
    </svg>
  );
}

export function IconTent(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
      <path d="M12 4 3 19h18L12 4Z" {...base} />
      <path d="M12 4v15M12 19l4-7M12 19l-4-7" {...base} />
    </svg>
  );
}

export function IconCalendar(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" {...base} />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" {...base} />
    </svg>
  );
}

export function IconMap(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
      <path d="M9 4 3.5 6.2v13.3L9 17.3l6 2.2 5.5-2.2V4L15 6.2 9 4Z" {...base} />
      <path d="M9 4v13.3M15 6.2v13.3" {...base} />
    </svg>
  );
}

export function IconMail(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" {...base} />
      <path d="m3.8 7 8.2 6 8.2-6" {...base} />
    </svg>
  );
}

export function IconPhone(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
      <path
        d="M6 3.5h3l1.5 4-2 1.4a12 12 0 0 0 6.6 6.6l1.4-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4 5.7 2 2 0 0 1 6 3.5Z"
        {...base}
      />
    </svg>
  );
}

export function IconChevron(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
      <path d="m7 10 5 5 5-5" {...base} />
    </svg>
  );
}

export function IconArrow(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
      <path d="M4 12h15M13 6l6 6-6 6" {...base} />
    </svg>
  );
}

export function IconSearch(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
      <circle cx="11" cy="11" r="6.5" {...base} />
      <path d="m16 16 4.5 4.5" {...base} />
    </svg>
  );
}

export function IconMenu(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
      <path d="M4 7h16M4 12h16M4 17h16" {...base} />
    </svg>
  );
}

export function IconClose(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
      <path d="m6 6 12 12M18 6 6 18" {...base} />
    </svg>
  );
}

export function IconCheck(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
      <path d="m5 12.5 4.5 4.5L19 7" {...base} />
    </svg>
  );
}

export function IconPin(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" {...base} />
      <circle cx="12" cy="10" r="2.6" {...base} />
    </svg>
  );
}

export function IconClock(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
      <circle cx="12" cy="12" r="8.5" {...base} />
      <path d="M12 7.5V12l3 2" {...base} />
    </svg>
  );
}
