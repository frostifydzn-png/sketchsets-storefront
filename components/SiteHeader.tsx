"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { categories } from "@/lib/products";
import { site } from "@/lib/site";

const navLinks = [
  { href: "/browse", label: "Browse" },
  ...categories.map((c) => ({ href: `/${c.id}`, label: c.name })),
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const closeMenu = () => setOpen(false);

  return (
    <header className="border-line bg-ink/80 sticky top-0 z-40 border-b backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-8 px-5 sm:px-8">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="text-[17px] font-semibold tracking-tight">
            SketchSets
          </span>
          <span className="text-text-faint group-hover:text-text-dim hidden text-[11px] font-medium transition-colors sm:inline">
            by {site.parent}
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 md:flex"
        >
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "text-text bg-white/[0.06]"
                    : "text-text-dim hover:text-text hover:bg-white/[0.04]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <a
            href={site.links.frostify}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-dim hover:text-text hidden rounded-lg px-3 py-2 text-sm font-medium transition-colors sm:block"
          >
            Frostify ↗
          </a>
          <Link
            href="/browse"
            className="bg-accent hover:bg-accent-deep hidden rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors md:block"
          >
            Shop
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="border-line text-text-dim hover:text-text rounded-lg border p-2 md:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              {open ? (
                <path
                  d="M4 4l10 10M14 4L4 14"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M2.5 5h13M2.5 9h13M2.5 13h13"
                  stroke="currentColor"
                  strokeWidth="1.6"
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
          <div className="mx-auto max-w-6xl px-5 py-3 sm:px-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="text-text-dim hover:text-text block rounded-lg px-2 py-3 text-[15px] font-medium"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={site.links.frostify}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="text-text-dim hover:text-text block rounded-lg px-2 py-3 text-[15px] font-medium"
            >
              Frostify ↗
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
