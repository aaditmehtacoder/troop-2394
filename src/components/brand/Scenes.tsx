/**
 * Original layered-SVG landscape art. These stand in for the full-bleed photos
 * on scouting.org, same visual job (a deep outdoor backdrop that white type
 * sits on top of), but drawn in-house so nothing is hotlinked and every page
 * ships without a single image request.
 */

export type SceneName =
  | "forest"
  | "ridge"
  | "lake"
  | "camping"
  | "leadership"
  | "eagle"
  | "trail"
  | "night";

/** sky stops: [top, middle, horizon] */
const skies: Record<SceneName, [string, string, string]> = {
  forest: ["#0d4433", "#1a7d5a", "#7fc79f"],
  ridge: ["#06305e", "#1263a6", "#7cc0ee"],
  lake: ["#052f4c", "#0f6b93", "#8fd2e4"],
  camping: ["#1b1233", "#4a2f63", "#e08a52"],
  leadership: ["#062a52", "#155fa5", "#8dc4ea"],
  eagle: ["#2a1a0c", "#96501f", "#f5bd72"],
  trail: ["#15412c", "#3a8049", "#bcdf95"],
  night: ["#040a1a", "#0f2247", "#3d68a5"],
};

/**
 * Integer hash, bitwise ops and Math.imul are exact 32-bit integer operations,
 * so this produces bit-identical output on the server and in the browser.
 * (A Math.sin-based PRNG does not: engines differ in the last mantissa bits,
 * which shows up as a React hydration mismatch.)
 */
function rand(i: number, seed: number): number {
  let x = (i + 1 + seed * 7919) | 0;
  x = (x ^ 61) ^ (x >>> 16);
  x = (x + (x << 3)) | 0;
  x = x ^ (x >>> 4);
  x = Math.imul(x, 0x27d4eb2d);
  x = x ^ (x >>> 15);
  return (x >>> 0) / 4294967296;
}

/** Round to 2dp so serialised path strings are identical on both sides. */
const r2 = (v: number) => Math.round(v * 100) / 100;

function Trees({
  y,
  count,
  seed,
  scale = 1,
  opacity = 1,
}: {
  y: number;
  count: number;
  seed: number;
  scale?: number;
  opacity?: number;
}) {
  const trees = [];
  for (let i = 0; i < count; i++) {
    const x = r2((1200 / count) * i + rand(i, seed) * (1200 / count) * 0.8);
    const h = r2((46 + rand(i + 90, seed) * 52) * scale);
    const w = r2(h * 0.42);
    trees.push(
      <path
        key={i}
        d={`M${x} ${y} l${r2(w / 2)} ${r2(-h * 0.42)} h${r2(-w * 0.16)} l${r2(w * 0.34)} ${r2(-h * 0.34)} h${r2(-w * 0.14)} l${r2(w * 0.3)} ${r2(-h * 0.3)} l${r2(w * 0.3)} ${r2(h * 0.3)} h${r2(-w * 0.14)} l${r2(w * 0.34)} ${r2(h * 0.34)} h${r2(-w * 0.16)} l${r2(w / 2)} ${r2(h * 0.42)} Z`}
      />,
    );
  }
  return (
    <g fill="#06110d" opacity={opacity}>
      {trees}
    </g>
  );
}

function Stars({ count, seed }: { count: number; seed: number }) {
  return (
    <g fill="#fff">
      {Array.from({ length: count }).map((_, i) => (
        <circle
          key={i}
          cx={r2(rand(i, seed) * 1200)}
          cy={r2(rand(i + 200, seed) * 260)}
          r={r2(0.7 + rand(i + 400, seed) * 1.3)}
          opacity={r2(0.25 + rand(i + 600, seed) * 0.6)}
        />
      ))}
    </g>
  );
}

export function Scene({
  name,
  className,
  vivid = false,
}: {
  name: SceneName;
  className?: string;
  /** Card art: lift the veil so the palette reads at small sizes. */
  vivid?: boolean;
}) {
  const [c1, c2, c3] = skies[name];
  const id = `sc-${name}${vivid ? "-v" : ""}`;

  // A vivid tile is a picture in its own right; a hero is a backdrop for white
  // type and needs the extra contrast.
  const v = vivid
    ? { top: 0.05, mid: 0.02, bot: 0.16, ridgeFar: 0.12, ridgeMid: 0.19, treeFar: 0.3, landFar: 0.32, treeNear: 0.58, landNear: 0.48 }
    : { top: 0.34, mid: 0.2, bot: 0.5, ridgeFar: 0.2, ridgeMid: 0.3, treeFar: 0.42, landFar: 0.45, treeNear: 0.72, landNear: 0.62 };

  return (
    <svg
      viewBox="0 0 1200 620"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c1} />
          <stop offset="52%" stopColor={c2} />
          <stop offset="100%" stopColor={c3} />
        </linearGradient>
        <linearGradient id={`${id}-veil`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#000" stopOpacity={v.top} />
          <stop offset="45%" stopColor="#000" stopOpacity={v.mid} />
          <stop offset="100%" stopColor="#000" stopOpacity={v.bot} />
        </linearGradient>
        <radialGradient id={`${id}-sun`} cx="0.72" cy="0.24" r="0.5">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1200" height="620" fill={`url(#${id}-sky)`} />
      {(name === "night" || name === "camping") && <Stars count={70} seed={name === "night" ? 3 : 9} />}
      <rect width="1200" height="620" fill={`url(#${id}-sun)`} />

      {/* far ridgeline */}
      <path
        d="M0 372 L150 300 L268 348 L400 262 L540 336 L690 250 L820 330 L960 276 L1090 340 L1200 300 V620 H0 Z"
        fill="#000"
        opacity={v.ridgeFar}
      />
      {/* mid ridgeline */}
      <path
        d="M0 430 L120 372 L260 420 L390 348 L520 412 L660 340 L800 410 L940 356 L1080 418 L1200 380 V620 H0 Z"
        fill="#000"
        opacity={v.ridgeMid}
      />

      {name === "lake" && (
        <>
          <rect y="470" width="1200" height="150" fill="#0e5f85" opacity="0.8" />
          <g opacity="0.3">
            {[492, 512, 534, 558, 584].map((y, i) => (
              <rect key={y} x={90 + i * 40} y={y} width={1020 - i * 90} height="2.5" rx="1.25" fill="#cfeaf5" />
            ))}
          </g>
        </>
      )}

      <Trees y={470} opacity={v.treeFar} count={26} seed={2} scale={0.85} />
      <path d="M0 486 L1200 462 V620 H0 Z" fill="#06110d" opacity={v.landFar} />
      <Trees y={556} opacity={v.treeNear} count={17} seed={5} scale={1.25} />
      <path d="M0 574 L1200 552 V620 H0 Z" fill="#06110d" opacity={v.landNear} />

      {name === "camping" && (
        <g>
          <path d="M470 566 L536 470 L602 566 Z" fill="#120d20" opacity="0.92" />
          <path d="M536 470 L536 566" stroke="#e8b98a" strokeWidth="2" opacity="0.4" />
          <ellipse cx="700" cy="568" rx="52" ry="10" fill="#ffb457" opacity="0.3" />
          <path d="M700 522c14 12 20 22 20 31a20 20 0 1 1-40 0c0-9 6-19 20-31Z" fill="#f2a04b" />
          <path d="M700 540c7 7 10 12 10 17a10 10 0 1 1-20 0c0-5 3-10 10-17Z" fill="#ffe08a" />
        </g>
      )}

      {name === "eagle" && (
        <g opacity="0.72" fill="#160c04">
          <path d="M300 190c26-16 46-14 62 2 16-16 36-18 62-2-24-4-42 4-62 22-20-18-38-26-62-22Z" />
          <path
            d="M760 250c18-11 32-10 43 1 11-11 25-12 43-1-17-3-29 3-43 15-14-12-26-18-43-15Z"
            opacity="0.6"
          />
        </g>
      )}

      {(name === "leadership" || name === "trail" || name === "forest" || name === "ridge") && (
        <g opacity="0.9" fill="#05070a">
          {/* three hikers cresting the near ridge */}
          {[
            [186, 1],
            [238, 0.92],
            [288, 0.86],
          ].map(([x, s], i) => (
            <g key={i} transform={`translate(${x} 574) scale(${s})`}>
              <circle cx="0" cy="-46" r="6.5" />
              <path d="M-6 -39h12l3 22h-18Z" />
              <path d="M-4 -17 -8 2h4l5-13 5 13h4l-4-19Z" />
              <path d="M6 -36l11 6-2 4-11-5Z" />
            </g>
          ))}
        </g>
      )}

      <rect width="1200" height="620" fill={`url(#${id}-veil)`} />
    </svg>
  );
}

/** Compact scene used inside cards, brighter, since nothing sits on top of it. */
export function SceneTile({ name, className }: { name: SceneName; className?: string }) {
  return <Scene name={name} className={className} vivid />;
}
