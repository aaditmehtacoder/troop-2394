import Link from "next/link";
import type { ReactNode } from "react";
import { Backdrop } from "@/components/photo/Backdrop";
import { FleurDeLis } from "@/components/brand/Marks";
import { troop } from "@/data/troop";
import type { PhotoKey } from "@/data/photos";

/** The framed card both auth pages sit in, over a real photograph. */
export function AuthShell({
  title,
  lede,
  photo = "campfire-close",
  children,
  footer,
}: {
  title: string;
  lede: string;
  photo?: PhotoKey;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <section className="relative isolate flex min-h-[calc(100vh-190px)] items-center overflow-hidden py-14">
      <Backdrop photo={photo} veil="band" priority />

      <div className="shell w-full">
        <div className="mx-auto w-full max-w-[480px]">
          <div className="rise rise-1 mb-7 text-center">
            <Link href="/" aria-label={`${troop.name} home`} className="inline-block">
              <FleurDeLis className="mx-auto h-12 w-auto text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]" />
            </Link>
            <h1 className="mt-5 font-slab text-[clamp(26px,4vw,34px)] font-bold uppercase leading-tight !text-white">
              {title}
            </h1>
            <p className="mx-auto mt-3 mb-0 max-w-sm text-[15px] leading-6 text-white/85">
              {lede}
            </p>
          </div>

          <div className="rise rise-2 rounded-xl bg-white p-7 shadow-2xl sm:p-9">{children}</div>

          <div className="rise rise-3 mt-6 text-center text-[14px] text-white/85">{footer}</div>
        </div>
      </div>
    </section>
  );
}

/* Shared field styling, so both forms stay identical. */
export const fieldClass =
  "w-full rounded-lg border border-hair bg-white px-4 py-3 text-[15px] text-ink transition placeholder:text-mute/70 focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/25";

export const labelClass =
  "mb-1.5 block font-slab text-[12px] font-bold uppercase tracking-[1.2px] text-navy";
