"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { categories } from "@/lib/products";
import { site } from "@/lib/site";

const navLinks = [
  { href: "/browse", label: "Shop all" },
  ...categories.map((c) => ({ href: `/${c.id}`, label: c.name })),
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const closeMenu = () => setOpen(false);

  return (
    <header className="bg-ink/85 sticky top-0 z-40 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-[1400px] items-center gap-10 px-6 sm:px-10">
        <Link href="/" className="group shrink-0">
          <span className="font-display text-[19px] leading-none font-extrabold">
            SketchSets
          </span>
          <span className="text-text-faint mt-0.5 block text-[10px] leading-none font-medium tracking-[0.14em] uppercase">
            by {site.parent}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`text-[15px] transition-colors ${
                  active
                    ? "text-text"
                    : "text-text-dim hover:text-text"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-5">
          <a
            href={site.links.frostify}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-dim hover:text-text hidden text-[15px] transition-colors sm:block"
          >
            Frostify
          </a>
          <Link
            href="/browse"
            className="text-ink hidden rounded-full bg-white px-5 py-2.5 text-[14px] font-semibold transition-opacity hover:opacity-85 md:block"
          >
            Browse
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="text-text -mr-2 p-2 md:hidden"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
              {open ? (
                <path
                  d="M5 5l10 10M15 5L5 15"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M3 6h14M3 14h14"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="bg-ink md:hidden"
        >
          <div className="mx-auto max-w-[1400px] px-6 pb-6 sm:px-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="font-display text-text block py-3 text-3xl font-bold"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={site.links.frostify}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="font-display text-text-dim block py-3 text-3xl font-bold"
            >
              Frostify
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
