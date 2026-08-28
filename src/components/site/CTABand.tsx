import Link from "next/link";
import { Scene, type SceneName } from "@/components/brand/Scenes";

export function CTABand({
  title,
  body,
  primary,
  secondary,
  scene = "forest",
}: {
  title: string;
  body: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  scene?: SceneName;
}) {
  return (
    <section className="relative isolate overflow-hidden py-16">
      <Scene name={scene} className="absolute inset-0 -z-10 h-full w-full" />
      <div className="shell text-center">
        <h2 className="h-section !text-white">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-7 text-white/90">{body}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
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
