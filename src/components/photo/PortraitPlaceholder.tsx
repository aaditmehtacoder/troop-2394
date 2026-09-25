import { Scene, type SceneName } from "@/components/brand/Scenes";
import { FleurDeLis } from "@/components/brand/Marks";

/**
 * What goes in a person's photo slot before their photograph does: a leader in
 * silhouette, in front of the same landscape art the other placeholders use.
 *
 * It is PhotoPlaceholder's counterpart for people, and the same idea: a
 * designed empty state rather than a broken image, so a row of leaders with no
 * pictures yet still looks finished. The neckerchief is the one detail, so it
 * reads as a Scouter rather than a generic avatar.
 *
 * The caption appears only when the tile is wide enough to hold it. As a
 * thumbnail it is just the figure.
 */
export function PortraitPlaceholder({
  scene = "leadership",
  className = "",
}: {
  /** The backdrop. Give each tile in a row its own, so they do not repeat. */
  scene?: SceneName;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`@container contours relative overflow-hidden bg-navy ${className}`}
    >
      <Scene name={scene} className="absolute inset-0 h-full w-full" vivid />

      {/* The same soft floor as PhotoPlaceholder, under the figure so the
          neckerchief keeps its colour. */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/70 via-navy-dark/10 to-transparent" />

      {/* Head and shoulders as one outline, so the rim light has no seam at the neck. */}
      <svg
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMax meet"
        className="absolute inset-0 h-full w-full"
        focusable="false"
      >
        <path
          d="M28 500C30 452 38 404 70 378C96 356 138 316 168 304C172 302 170 290 170 266A66 74 0 1 1 230 266C230 290 228 302 232 304C262 316 304 356 330 378C362 404 370 452 372 500Z"
          fill="#03152e"
          fillOpacity="0.94"
          stroke="#fff"
          strokeOpacity="0.2"
          strokeWidth="2.5"
        />
        <g
          fill="none"
          stroke="#e1c04c"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M168 306Q200 318 232 306M168 306L196 360M232 306L204 360M196 372L191 400M204 372L209 400" />
        </g>
        <rect x="189" y="356" width="22" height="16" rx="6" fill="#e1c04c" />
      </svg>

      <div className="absolute inset-x-0 bottom-0 hidden items-center gap-3 p-4 @min-[10rem]:flex">
        <FleurDeLis className="h-6 w-auto shrink-0 text-gold/90" />
        <p className="m-0 font-slab text-[10px] font-bold uppercase tracking-[1.6px] text-gold/90">
          Photo to come
        </p>
      </div>
    </div>
  );
}
