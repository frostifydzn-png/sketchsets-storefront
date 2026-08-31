"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SearchDialog } from "@/components/SearchDialog";
import { site } from "@/lib/site";

/*
 * Three destinations, no dropdowns. The catalogue is small enough that the
 * homepage is the shop, so a mega menu was navigating a structure that does
 * not need navigating.
 */
const navLinks = [
  { href: "/browse", label: "Shop" },
  { href: "/free", label: "Free" },
  { href: "/products/sketchsets-vault", label: "The Vault" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const close = () => setOpen(false);

  return (
    <header className="bg-ink/85 border-line sticky top-0 z-40 border-b backdrop-blur-xl">
      <div className="shell flex h-[68px] items-center gap-8">
        <Link
          href="/"
          onClick={close}
          className="flex shrink-0 items-baseline gap-2"
        >
          <span className="font-display-tight text-[20px] leading-none">
            SketchSets
          </span>
          <span className="text-muted hidden text-[11px] leading-none sm:inline">
            by {site.parent}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const active =
              pathname === link.href ||
              (link.href === "/browse" && pathname.startsWith("/products/"));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={close}
                aria-current={active ? "page" : undefined}
                className={`text-[15px] transition-colors ${
                  active ? "text-text" : "text-dim hover:text-text"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <SearchDialog />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="text-text -mr-2 p-2 md:hidden"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
              {open ? (
                <path
                  d="M6 6l10 10M16 6L6 16"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M3 7h16M3 15h16"
                  stroke="currentColor"
                  strokeWidth="1.8"
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
                onClick={close}
                className="font-display text-text block py-3 text-2xl"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={site.links.frostify}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="font-display text-dim block py-3 text-2xl"
            >
              Frostify ↗
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
