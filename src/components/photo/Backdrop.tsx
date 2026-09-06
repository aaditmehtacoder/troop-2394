import { photo, type PhotoKey } from "@/data/photos";

/**
 * A full-bleed photograph behind white type. Fills its positioned parent.
 *
 * `veil` picks the gradient; `drift` lets the picture scroll a touch slower
 * than the page (CSS scroll-driven animation, ignored by older browsers).
 */
export function Backdrop({
  photo: key,
  src,
  veil = "hero",
  drift = false,
  priority = false,
  position = "center",
  className = "",
}: {
  photo?: PhotoKey;
  /** A picture that is not in the manifest, e.g. a cover set in the admin. */
  src?: string;
  veil?: "hero" | "band" | "tile" | "none";
  drift?: boolean;
  priority?: boolean;
  position?: string;
  className?: string;
}) {
  const p = key ? photo(key) : null;
  const url = src ?? p?.src;
  if (!url) return null;
  return (
    <div aria-hidden className={`absolute inset-0 -z-10 overflow-hidden bg-navy-dark grain ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized JPEGs, no optimizer */}
      <img
        src={url}
        alt=""
        width={p?.width}
        height={p?.height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className={`h-full w-full object-cover ${drift ? "drift" : ""}`}
        style={{ objectPosition: position }}
      />
      {veil !== "none" ? <div className={`absolute inset-0 veil-${veil}`} /> : null}
    </div>
  );
}
