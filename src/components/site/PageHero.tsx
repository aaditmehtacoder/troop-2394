import Link from "next/link";
import { Scene, type SceneName } from "@/components/brand/Scenes";
import { FleurDeLis } from "@/components/brand/Marks";

/** Interior-page banner: scene backdrop, breadcrumb, title, lede. */
export function PageHero({
  eyebrow,
  title,
  lede,
  scene = "ridge",
  crumb,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  scene?: SceneName;
  crumb?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden">
      <Scene name={scene} className="absolute inset-0 -z-10 h-full w-full" />
      <div className="shell py-16 md:py-20">
        <nav aria-label="Breadcrumb" className="mb-5">
          <ol className="flex items-center gap-2 font-slab text-[11px] font-bold uppercase tracking-[1.4px] text-white/70">
            <li>
              <Link href="/" className="transition hover:text-white">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-white">{crumb ?? title}</li>
          </ol>
        </nav>

        <div className="flex items-start gap-5">
          <FleurDeLis className="mt-1 hidden h-12 w-auto shrink-0 text-white/85 sm:block" />
          <div>
            {eyebrow && (
              <p className="mb-2 font-slab text-[12px] font-bold uppercase tracking-[2.4px] text-white/80">
                {eyebrow}
              </p>
            )}
            <h1 className="font-slab text-[clamp(30px,5vw,48px)] font-bold uppercase leading-[1.1] !text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
              {title}
            </h1>
            {lede && (
              <p className="mt-4 mb-0 max-w-2xl text-[16.5px] leading-7 text-white/90">{lede}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
