import Link from "next/link";
import { Backdrop } from "@/components/photo/Backdrop";
import { Scene, type SceneName } from "@/components/brand/Scenes";
import type { PhotoKey } from "@/data/photos";

/** Interior-page banner: a real photograph, breadcrumb, title, one line. */
export function PageHero({
  eyebrow,
  title,
  lede,
  photo,
  position,
  scene = "ridge",
  crumb,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  photo?: PhotoKey;
  position?: string;
  scene?: SceneName;
  crumb?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden">
      {photo ? (
        <Backdrop photo={photo} veil="hero" drift priority position={position} />
      ) : (
        <Scene name={scene} className="absolute inset-0 -z-10 h-full w-full" />
      )}

      <div className="shell flex min-h-[clamp(360px,48vh,520px)] flex-col justify-end pb-12 pt-24 md:pb-16">
        <nav aria-label="Breadcrumb" className="rise rise-1 mb-6">
          <ol className="flex items-center gap-2 font-slab text-[11px] font-bold uppercase tracking-[1.6px] text-white/70">
            <li>
              <Link href="/" className="transition hover:text-white">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-white">{crumb ?? title}</li>
          </ol>
        </nav>

        {eyebrow && (
          <p className="rise rise-2 rule-gold mb-3 font-slab text-[12px] font-bold uppercase tracking-[2.4px] text-white/85">
            {eyebrow}
          </p>
        )}
        <h1 className="rise rise-3 max-w-4xl font-slab text-[clamp(36px,6.4vw,72px)] font-bold uppercase leading-[0.98] tracking-[-0.5px] !text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)]">
          {title}
        </h1>
        {lede && (
          <p className="rise rise-4 mt-5 mb-0 max-w-2xl text-[17px] leading-7 text-white/90">{lede}</p>
        )}
      </div>
    </section>
  );
}
