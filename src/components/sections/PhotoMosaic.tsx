import Link from "next/link";
import { mosaic, photo } from "@/data/photos";
import { Reveal } from "@/components/site/Reveal";

/**
 * Where each of the seven pictures sits. On a phone (two columns) it packs as
 * wide / tall + square / square + tall / square / square + square; from md
 * (four columns) as three even rows. Change the count and this has to change.
 */
const slots = [
  { area: "col-span-2", sizes: "(min-width: 768px) 50vw, 100vw" },
  { area: "row-span-2", sizes: "(min-width: 768px) 25vw, 50vw" },
  { area: "", sizes: "(min-width: 768px) 25vw, 50vw" },
  { area: "row-span-2", sizes: "(min-width: 768px) 25vw, 50vw" },
  { area: "", sizes: "(min-width: 768px) 25vw, 50vw" },
  { area: "md:row-span-2", sizes: "(min-width: 768px) 25vw, 50vw" },
  { area: "md:col-span-2", sizes: "(min-width: 768px) 50vw, 50vw" },
];

/** The places the troop actually goes, as a wall of pictures with a name each. */
export function PhotoMosaic() {
  return (
    <div className="grid auto-rows-[168px] grid-cols-2 gap-3 md:auto-rows-[250px] md:grid-cols-4 md:gap-4">
      {mosaic.map((m, n) => {
        const p = photo(m.photo);
        const slot = slots[n] ?? slots[2];
        return (
          <Reveal key={m.photo} delay={n * 60} className={slot.area}>
            <Link
              href={m.href}
              className="group photo-zoom relative block h-full overflow-hidden rounded-xl bg-navy"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized JPEGs, no optimizer */}
              <img
                src={p.small}
                srcSet={`${p.small} 960w, ${p.src} ${p.width}w`}
                sizes={slot.sizes}
                alt={p.alt}
                width={p.width}
                height={p.height}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
                style={{ objectPosition: m.position ?? "center" }}
              />
              <div className="absolute inset-0 veil-tile" />
              <p className="absolute inset-x-0 bottom-0 m-0 p-4 font-slab text-[15px] font-bold leading-tight text-white md:p-5 md:text-[18px]">
                {m.place}
              </p>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
