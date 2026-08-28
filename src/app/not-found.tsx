import Link from "next/link";
import { Scene } from "@/components/brand/Scenes";
import { FleurDeLis } from "@/components/brand/Marks";
import { troop } from "@/data/troop";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[70vh] items-center overflow-hidden py-20">
      <Scene name="night" className="absolute inset-0 -z-10 h-full w-full" />
      <div className="shell text-center">
        <FleurDeLis className="mx-auto mb-6 h-14 w-auto text-white/85" />
        <p className="mb-2 font-slab text-[12px] font-bold uppercase tracking-[2.4px] text-white/70">
          Error 404
        </p>
        <h1 className="font-slab text-[clamp(30px,5vw,48px)] font-bold uppercase !text-white">
          This trail doesn&rsquo;t go anywhere
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-[16px] leading-7 text-white/85">
          A Scout is prepared — but even a good map has a wrong turn on it. The page you asked for
          isn&rsquo;t here.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link href="/" className="pill pill-white">
            Back to home
          </Link>
          <Link href="/contact" className="pill pill-ghost">
            Tell us what broke
          </Link>
        </div>
        <p className="mt-8 mb-0 text-[13px] text-white/60">
          {troop.longName} · {troop.city}, {troop.stateAbbr}
        </p>
      </div>
    </section>
  );
}
