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

/**
 * The troop's real colours, read off the neckerchief patch itself.
 *
 * The patch is the only mark the troop has ever had ("the best thing we have
 * for a logo", troop email, Sept 2026). These hex values were sampled from a
 * 300ppi scan of it, so the drawing below and the site's accents agree with
 * the cloth rather than with a guess.
 */
export const patch = {
  red: "#A02113",
  redDeep: "#74150B",
  sky: "#4E9BB8",
  skyLight: "#63AECA",
  green: "#2A5F4A",
  flame: "#C8391F",
  flameBlue: "#22478A",
  gold: "#D8912F",
  log: "#7B2C18",
  logDeep: "#521305",
  stone: "#9A98A1",
  stoneDeep: "#75737C",
  ink: "#111014",
} as const;

/* The kerchief outline, and the ground as the part of it below the horizon.
   GROUND's two curves are RIM's own lower edges, split at y=53, so the green
   meets the rim exactly. That is why none of this needs a <clipPath>: a clip
   needs an id, and a repeated id breaks the moment the mark renders twice. */
const RIM = "M8 30C26 6 94 6 112 30C99 48.5 76.5 69 60 81.5C43.5 69 21 48.5 8 30Z";
const GROUND = "M27.64 53H92.36C81.61 63.92 69.76 74.11 60 81.5C50.24 74.11 38.39 63.92 27.64 53Z";

/** One flame tongue, tip up, base at the origin. Scaled and fanned out below. */
const TONGUE = "M0 0C-3.2-4.4-3.5-9.8 0-16C3.5-9.8 3.2-4.4 0 0Z";

/**
 * Troop 2/394's neckerchief patch: SCCC · TROOP 394 over a campfire.
 *
 * Vector rather than the photograph because this runs at 32px in a favicon and
 * 42px in the header, where a scan of embroidery is mush. The photo earns its
 * place large, on the About page, where the stitching is the point.
 *
 * `lettering` off drops the two lines of type. Below roughly 80px they close
 * up into a smear, so small lockups show the mark alone and let the wordmark
 * beside it carry the number.
 */
export function TroopPatch({
  className,
  lettering = true,
  ...props
}: SVGProps<SVGSVGElement> & { lettering?: boolean }) {
  return (
    <svg
      viewBox="0 0 120 88"
      className={className}
      {...props}
      role="img"
      aria-label="Troop 2/394 neckerchief patch"
    >
      {/* Sky and ground are filled out to the rim's centre line and the rim is
          stroked over the top of them, so there is no seam to line up. */}
      <path d={RIM} fill={patch.sky} />
      <path d={GROUND} fill={patch.green} />

      {/* campfire: stones, logs, then flames fanned from a shared pivot.
          It carries about a third of the patch's width on the cloth, so it is
          drawn that big here too — scaled down it just looks like a candle. */}
      <g>
        <ellipse cx="45" cy="59" rx="7" ry="3.8" fill={patch.stoneDeep} />
        <ellipse cx="75" cy="59" rx="7" ry="3.8" fill={patch.stoneDeep} />
        <ellipse cx="52.5" cy="60" rx="7.5" ry="4.2" fill={patch.stone} />
        <ellipse cx="67.5" cy="60" rx="7.5" ry="4.2" fill={patch.stone} />
        <ellipse cx="60" cy="59.5" rx="7" ry="4" fill={patch.stone} />
      </g>
      <g>
        <rect
          x="-15"
          y="-2.6"
          width="30"
          height="5.6"
          rx="2.8"
          fill={patch.log}
          transform="translate(60 56) rotate(-10)"
        />
        <rect
          x="-13.5"
          y="-2.3"
          width="27"
          height="5"
          rx="2.5"
          fill={patch.logDeep}
          transform="translate(60 57.6) rotate(9)"
        />
      </g>
      <g fill={patch.flame}>
        <path d={TONGUE} transform="translate(60 54) rotate(-52)" />
        <path d={TONGUE} transform="translate(60 54) rotate(-30) scale(1.3)" />
        <path d={TONGUE} transform="translate(60 54) scale(1.6)" />
        <path d={TONGUE} transform="translate(60 54) rotate(30) scale(1.3)" />
        <path d={TONGUE} transform="translate(60 54) rotate(52)" />
      </g>
      <g fill={patch.flameBlue}>
        <path d={TONGUE} transform="translate(60 55) rotate(-34) scale(0.85)" />
        <path d={TONGUE} transform="translate(60 55) scale(1.2)" />
        <path d={TONGUE} transform="translate(60 55) rotate(34) scale(0.85)" />
      </g>
      <g fill={patch.gold}>
        <path d={TONGUE} transform="translate(60 56) rotate(-15) scale(0.55)" />
        <path d={TONGUE} transform="translate(60 56) scale(0.82)" />
        <path d={TONGUE} transform="translate(60 56) rotate(15) scale(0.55)" />
      </g>

      {/* the universal badge of Scouting, sitting on the ground below the fire */}
      <g transform="translate(60 63) scale(0.115) translate(-50 0)">
        <FleurDeLis width="100" height="122" style={{ color: patch.ink }} />
      </g>

      {lettering && (
        <g
          fill={patch.red}
          textAnchor="middle"
          fontFamily="var(--font-slab), 'Roboto Slab', Georgia, serif"
          fontWeight="700"
        >
          <text x="60" y="30" fontSize="9.5" letterSpacing="2.6">
            SCCC
          </text>
          <text x="60" y="45.5" fontSize="14.5" letterSpacing="0.6">
            TROOP 394
          </text>
        </g>
      )}

      <path
        d={RIM}
        fill="none"
        stroke={patch.red}
        strokeWidth="6"
        strokeLinejoin="round"
      />
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
      <TroopPatch lettering={false} style={{ width: 54, height: 40, flexShrink: 0 }} />
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
