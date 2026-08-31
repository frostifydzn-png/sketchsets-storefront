"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { categories } from "@/lib/products";
import { site } from "@/lib/site";
import { SearchDialog } from "@/components/SearchDialog";

const navLinks = [
  { href: "/browse", label: "Browse" },
  ...categories.map((c) => ({ href: `/${c.id}`, label: c.name })),
  { href: "/new", label: "New" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const closeMenu = () => setOpen(false);

  // Header compresses and gains a hairline once the page moves.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`bg-ink/85 sticky top-0 z-40 backdrop-blur-xl transition-all duration-300 ${
        scrolled ? "border-line border-b" : "border-b border-transparent"
      }`}
    >
      <div
        className={`shell flex items-center gap-8 transition-all duration-300 ${
          scrolled ? "h-14" : "h-[72px]"
        }`}
      >
        <Link href="/" className="flex shrink-0 items-baseline gap-2">
          <span className="font-display-tight text-[19px] leading-none">
            SKETCHSETS
          </span>
          {/* Reads as a quality seal, so it stays visible at every width. */}
          <span className="text-muted text-[10px] leading-none font-medium sm:text-[11px]">
            · by {site.parent}
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="mx-auto hidden items-center gap-7 md:flex"
        >
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`text-[14px] transition-colors ${
                  active ? "text-text" : "text-dim hover:text-text"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-3 md:ml-0">
          <SearchDialog />
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
          className="border-line bg-ink border-t md:hidden"
        >
          <div className="shell py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="font-display text-text block py-2.5 text-2xl"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={site.links.frostify}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="font-display text-dim block py-2.5 text-2xl"
            >
              Frostify ↗
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
