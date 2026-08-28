"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { mainNav, troop, utilityButtons, utilityNav } from "@/data/troop";
import { TroopLockup } from "@/components/brand/Marks";
import { IconChevron, IconClose, IconMenu, IconPhone } from "@/components/brand/Marks";

/**
 * Two-row fixed header, matching scouting.org:
 *   row 1 — navy #005696 utility bar, 70px: lockup left, links + pills right
 *   row 2 — white nav bar, 50px: uppercase Roboto Slab 11px items with dropdowns
 * Dropdowns are click/hover-expanded (the original reports [collapsed] items,
 * i.e. an expandable submenu — not a scroll-driven mechanism).
 */
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on route change — adjusted during render, which React prefers
  // over an effect for state that is derived from a prop-like value.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(null);
    setMobile(false);
  }

  // Click-outside and Escape close the desktop dropdown.
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobile(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobile]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-navy focus:shadow-lg"
      >
        Skip to main content
      </a>

      <header className="fixed inset-x-0 top-0 z-50">
        {/* ---------------------------- utility bar --------------------------- */}
        <div
          className="bg-navy-bar transition-[height] duration-300"
          style={{ height: scrolled ? 62 : 70 }}
        >
          <div className="shell flex h-full items-center justify-between gap-4">
            <Link href="/" aria-label={`${troop.name} home`} className="shrink-0">
              <TroopLockup tone="light" />
            </Link>

            <div className="flex items-center gap-1 lg:gap-2">
              <nav aria-label="Utility" className="hidden items-center xl:flex">
                {utilityNav.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="navlink whitespace-nowrap px-3 py-2 text-white/90 transition hover:text-white"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>

              <a
                href={`tel:${troop.contact.phone.replace(/[^0-9+]/g, "")}`}
                className="navlink hidden items-center gap-1.5 whitespace-nowrap px-3 py-2 text-white/90 transition hover:text-white 2xl:flex"
              >
                <IconPhone className="h-4 w-4" />
                <span className="hidden 2xl:inline">{troop.contact.phone}</span>
              </a>

              {utilityButtons.map((b) => (
                <Link
                  key={b.href}
                  href={b.href}
                  target={b.external ? "_blank" : undefined}
                  rel={b.external ? "noopener noreferrer" : undefined}
                  className="pill pill-white pill-sm hidden xl:inline-flex"
                >
                  {b.label}
                </Link>
              ))}

              <Link href="/login" className="pill pill-ghost pill-sm hidden whitespace-nowrap sm:inline-flex">
                Members Area
              </Link>

              <button
                type="button"
                onClick={() => setMobile(true)}
                aria-label="Open menu"
                aria-expanded={mobile}
                className="ml-1 rounded p-2 text-white transition hover:bg-white/10 lg:hidden"
              >
                <IconMenu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* ------------------------------ nav bar ----------------------------- */}
        <div
          ref={navRef}
          className="relative hidden border-b border-hair bg-white shadow-[0_1px_0_rgba(0,0,0,0.04)] lg:block"
        >
          <div className="shell">
            <nav aria-label="Main" className="flex h-[50px] items-center justify-center">
              {mainNav.map((item) => {
                const expanded = open === item.label;
                const active = isActive(item.href);
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => item.children && setOpen(item.label)}
                    onMouseLeave={() => item.children && setOpen(null)}
                  >
                    {item.children ? (
                      <button
                        type="button"
                        aria-expanded={expanded}
                        aria-haspopup="true"
                        onClick={() => setOpen(expanded ? null : item.label)}
                        className={`navlink flex items-center gap-1 px-3.5 py-4 transition-colors ${
                          active || expanded ? "text-blue" : "text-mute hover:text-navy"
                        }`}
                      >
                        {item.label}
                        <IconChevron
                          className={`h-3.5 w-3.5 transition-transform duration-200 ${
                            expanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className={`navlink block px-3.5 py-4 transition-colors ${
                          active ? "text-blue" : "text-mute hover:text-navy"
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}

                    {item.children && (
                      <div
                        className={`absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 origin-top overflow-hidden rounded-b-lg border border-hair border-t-[3px] border-t-blue bg-white shadow-xl transition-all duration-200 ${
                          expanded
                            ? "visible translate-y-0 opacity-100"
                            : "invisible -translate-y-1 opacity-0"
                        }`}
                      >
                        <ul className="py-2">
                          {item.children.map((c) => (
                            <li key={c.href}>
                              <Link
                                href={c.href}
                                className="block px-5 py-2.5 text-[14px] leading-snug text-slate transition hover:bg-shell hover:text-navy"
                              >
                                {c.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* -------------------------- mobile off-canvas ------------------------- */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden ${mobile ? "" : "pointer-events-none"}`}
        aria-hidden={!mobile}
      >
        <div
          onClick={() => setMobile(false)}
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            mobile ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute right-0 top-0 flex h-full w-[min(92vw,380px)] flex-col bg-navy transition-transform duration-300 ${
            mobile ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-white/15 px-5 py-4">
            <TroopLockup tone="light" />
            <button
              type="button"
              onClick={() => setMobile(false)}
              aria-label="Close menu"
              className="rounded p-2 text-white transition hover:bg-white/10"
            >
              <IconClose className="h-6 w-6" />
            </button>
          </div>

          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-2 py-3">
            {mainNav.map((item) => (
              <MobileItem key={item.label} item={item} active={isActive(item.href)} />
            ))}
            <div className="mt-3 border-t border-white/15 pt-3">
              {utilityNav.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="navlink block px-4 py-3 text-white/80 hover:text-white"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </nav>

          <div className="grid gap-2 border-t border-white/15 p-4">
            <Link href="/login" className="pill pill-white pill-sm w-full">
              Members Area
            </Link>
            {utilityButtons.map((b) => (
              <Link
                key={b.href}
                href={b.href}
                target={b.external ? "_blank" : undefined}
                rel={b.external ? "noopener noreferrer" : undefined}
                className="pill pill-ghost pill-sm w-full"
              >
                {b.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Spacer — the original reserves header height with #sc-navbar-fix-space */}
      <div aria-hidden className="h-[70px] lg:h-[120px]" />
    </>
  );
}

function MobileItem({
  item,
  active,
}: {
  item: (typeof mainNav)[number];
  active: boolean;
}) {
  const [open, setOpen] = useState(false);
  if (!item.children) {
    return (
      <Link
        href={item.href}
        className={`navlink block px-4 py-3.5 ${active ? "text-white" : "text-white/80"}`}
      >
        {item.label}
      </Link>
    );
  }
  return (
    <div className="border-b border-white/10 last:border-0">
      <div className="flex items-center">
        <Link
          href={item.href}
          className={`navlink flex-1 px-4 py-3.5 ${active ? "text-white" : "text-white/80"}`}
        >
          {item.label}
        </Link>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={`${open ? "Collapse" : "Expand"} ${item.label}`}
          className="p-3.5 text-white/70"
        >
          <IconChevron className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
      </div>
      <div
        className="grid transition-[grid-template-rows] duration-300"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <ul className="overflow-hidden">
          {item.children.map((c) => (
            <li key={c.href}>
              <Link
                href={c.href}
                className="block py-2.5 pl-8 pr-4 text-[14px] text-white/70 transition hover:text-white"
              >
                {c.label}
              </Link>
            </li>
          ))}
          <li className="h-2" />
        </ul>
      </div>
    </div>
  );
}
