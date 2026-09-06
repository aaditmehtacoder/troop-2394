import { photo, type PhotoKey } from "@/data/photos";
import { PhotoPlaceholder } from "./PhotoPlaceholder";

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

  // No photograph for this slot yet: show the standing art rather than a hole.
  if (!url) {
    return (
      <div aria-hidden className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
        <PhotoPlaceholder seed={key ?? className ?? "backdrop"} compact className="h-full w-full" />
        {veil !== "none" ? <div className={`absolute inset-0 veil-${veil}`} /> : null}
      </div>
    );
  }
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
