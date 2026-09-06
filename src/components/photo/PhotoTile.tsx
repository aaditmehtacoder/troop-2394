import { photo, type PhotoKey } from "@/data/photos";

/** A framed photograph inside a page, sized by the parent. */
export function PhotoTile({
  photo: key,
  className = "",
  position = "center",
}: {
  photo: PhotoKey;
  className?: string;
  position?: string;
}) {
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
