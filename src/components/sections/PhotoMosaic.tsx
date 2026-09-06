import Link from "next/link";
import { mosaic, photo } from "@/data/photos";
import { Reveal } from "@/components/site/Reveal";
import { IconArrow } from "@/components/brand/Marks";

/** The places the troop actually goes, as a wall of pictures. */
export function PhotoMosaic() {
  return (
    <div className="grid auto-rows-[200px] grid-cols-2 gap-3 md:auto-rows-[240px] md:grid-cols-4 md:gap-4">
      {mosaic.map((m, n) => {
        const p = photo(m.photo);
        const span =
          m.span === "wide" ? "md:col-span-2" : m.span === "tall" ? "row-span-2" : "";
        return (
          <Reveal key={m.photo} delay={n * 70} className={span}>
            <Link
              href={m.href}
              className="group photo-zoom relative block h-full overflow-hidden rounded-xl bg-navy"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized JPEGs, no optimizer */}
              <img
                src={p.small}
                alt={p.alt}
                width={p.width}
                height={p.height}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 veil-tile" />
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                <p className="m-0 font-slab text-[17px] font-bold leading-tight text-white md:text-[19px]">
                  {m.place}
                </p>
                <p className="m-0 mt-1 flex items-center gap-2 text-[13px] text-white/80">
                  {m.when}
                  <IconArrow className="h-3.5 w-3.5 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" />
                </p>
              </div>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
