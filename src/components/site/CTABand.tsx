import Link from "next/link";
import { Backdrop } from "@/components/photo/Backdrop";
import { Scene, type SceneName } from "@/components/brand/Scenes";
import type { PhotoKey } from "@/data/photos";

export function CTABand({
  title,
  body,
  primary,
  secondary,
  photo,
  scene = "forest",
}: {
  title: string;
  body?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  photo?: PhotoKey;
  scene?: SceneName;
}) {
  return (
    <section className="relative isolate overflow-hidden py-24 md:py-32">
      {photo ? (
        <Backdrop photo={photo} veil="band" drift />
      ) : (
        <Scene name={scene} className="absolute inset-0 -z-10 h-full w-full" />
      )}
      <div className="shell text-center">
        <h2 className="mx-auto max-w-3xl font-slab text-[clamp(32px,5.4vw,60px)] font-bold uppercase leading-[1] !text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.4)]">
          {title}
        </h2>
        {body ? (
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-7 text-white/90">{body}</p>
        ) : null}
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link href={primary.href} className="pill pill-white">
            {primary.label}
          </Link>
          {secondary && (
            <Link href={secondary.href} className="pill pill-ghost">
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
