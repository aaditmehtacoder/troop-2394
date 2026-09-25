import { photo, type PhotoKey } from "@/data/photos";
import type { SceneName } from "@/components/brand/Scenes";
import { PhotoPlaceholder } from "./PhotoPlaceholder";
import { PortraitPlaceholder } from "./PortraitPlaceholder";

/** A framed photograph inside a page, sized by the parent. */
export function PhotoTile({
  photo: key,
  label,
  className = "",
  position = "center",
  portrait = false,
  scene,
}: {
  /** Leave it out to hold the space with the standing art. */
  photo?: PhotoKey;
  /** What the picture should be, shown on the placeholder. */
  label?: string;
  className?: string;
  position?: string;
  /** A picture of a person: hold the space with a figure, not a landscape. */
  portrait?: boolean;
  /** The placeholder's backdrop, until there is a photograph. */
  scene?: SceneName;
}) {
  if (!key) {
    return portrait ? (
      <PortraitPlaceholder scene={scene} className={className} />
    ) : (
      <PhotoPlaceholder seed={label ?? className} label={label} scene={scene} className={className} />
    );
  }
  const p = photo(key);
  return (
    // eslint-disable-next-line @next/next/no-img-element -- pre-sized JPEGs, no optimizer
    <img
      src={p.small}
      alt={p.alt}
      width={p.width}
      height={p.height}
      loading="lazy"
      decoding="async"
      className={`block w-full object-cover ${className}`}
      style={{ objectPosition: position }}
    />
  );
}
