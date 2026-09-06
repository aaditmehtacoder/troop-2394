import { Scene, type SceneName } from "@/components/brand/Scenes";
import { FleurDeLis } from "@/components/brand/Marks";

/**
 * What goes in an image slot before the troop's own photograph does.
 *
 * Every picture on this site is meant to be a real photograph of a real place.
 * Until one exists for a given slot, this stands in: the same layered-SVG
 * landscape art the heroes use, a contour wash, and a line naming the picture
 * that belongs here. It is a designed empty state, not a broken image, so a
 * page full of them still looks finished.
 *
 * The scene is chosen from `seed`, so a given story always draws the same art
 * and a grid of cards does not repeat itself.
 */

const scenes: SceneName[] = [
  "ridge",
  "forest",
  "lake",
  "trail",
  "camping",
  "leadership",
  "night",
  "eagle",
];

/** Same 32-bit integer hash the scenes use, so server and client agree. */
function sceneFor(seed: string): SceneName {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (Math.imul(h, 31) + seed.charCodeAt(i)) | 0;
  return scenes[Math.abs(h) % scenes.length];
}

export function PhotoPlaceholder({
  seed,
  label,
  note,
  scene,
  className = "",
  compact = false,
}: {
  /** Anything stable about this slot: a title, a slug, a place name. */
  seed: string;
  /** What the picture should be, e.g. "Sunset State Beach". */
  label?: string;
  /** A second line, e.g. the date of the outing. */
  note?: string;
  /** Force a scene instead of deriving one from the seed. */
  scene?: SceneName;
  className?: string;
  /** Drop the caption; used where the card already carries the words. */
  compact?: boolean;
}) {
  const name = scene ?? sceneFor(seed);

  return (
    <div className={`contours relative overflow-hidden bg-navy ${className}`}>
      <Scene name={name} className="absolute inset-0 h-full w-full" vivid />

      {/* A soft floor so white type stays legible over the brighter tiles. */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/70 via-navy-dark/10 to-transparent" />

      {compact ? (
        <FleurDeLis className="absolute bottom-3 right-3 h-5 w-auto text-white/45" />
      ) : (
        <div className="absolute inset-x-0 bottom-0 flex items-end gap-3 p-4 md:p-5">
          <FleurDeLis className="h-6 w-auto shrink-0 text-gold/90" />
          <div className="min-w-0">
            <p className="m-0 font-slab text-[10px] font-bold uppercase tracking-[1.6px] text-gold/90">
              Photo to come
            </p>
            {label ? (
              <p className="m-0 truncate font-slab text-[15px] font-bold leading-tight text-white">
                {label}
              </p>
            ) : null}
            {note ? <p className="m-0 truncate text-[12.5px] text-white/75">{note}</p> : null}
          </div>
        </div>
      )}
    </div>
  );
}
