import { photo, type PhotoKey } from "@/data/photos";
import { PhotoPlaceholder } from "./PhotoPlaceholder";

/** A framed photograph inside a page, sized by the parent. */
export function PhotoTile({
  photo: key,
  label,
  className = "",
  position = "center",
}: {
  /** Leave it out to hold the space with the standing art. */
  photo?: PhotoKey;
  /** What the picture should be, shown on the placeholder. */
  label?: string;
  className?: string;
  position?: string;
}) {
  if (!key) return <PhotoPlaceholder seed={label ?? className} label={label} className={className} />;
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
