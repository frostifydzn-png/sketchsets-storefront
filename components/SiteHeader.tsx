"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logomark } from "@/components/Logomark";
import { SearchDialog } from "@/components/SearchDialog";
import { categories } from "@/lib/products";
import { site } from "@/lib/site";

/* Categories sits between Browse and Freebies, so it is rendered separately. */
const navLeading = [{ href: "/browse", label: "Browse" }];

const navLinks = [
  { href: "/free", label: "Freebies" },
  { href: "/products/sketchsets-vault", label: "The Vault" },
  { href: "/new", label: "New Drops" },
  { href: "/support", label: "Support" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [cats, setCats] = useState(false);
  const pathname = usePathname();
  const close = () => {
    setOpen(false);
    setCats(false);
  };

  return (
    <header className="bg-ink/80 border-line sticky top-0 z-40 border-b backdrop-blur-xl">
      {/*
        Three-column grid rather than flex with auto margins: the wordmark and
        the search field are different widths, so auto margins centred the nav
        in the leftover space rather than in the header. Equal rails put it
        dead centre regardless.
      */}
      <div className="shell grid h-[74px] grid-cols-[auto_1fr_auto] items-center gap-6">
        <Link
          href="/"
          onClick={close}
          className="group flex shrink-0 items-center gap-2.5"
        >
          <Logomark className="text-accent h-7 w-7 shrink-0 transition-transform duration-500 ease-[var(--ease-glide)] group-hover:-rotate-6" />
          <span className="leading-none">
            <span className="block text-[20px] font-extrabold tracking-[-0.02em] text-white">
              SketchSets
            </span>
            <span className="text-muted mt-0.5 block text-[11px]">
              by <span className="text-accent font-semibold">{site.parent}</span>
            </span>
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center justify-center gap-7 lg:flex"
        >
          {navLeading.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={close}
              aria-current={
                pathname === link.href || pathname.startsWith("/products/")
                  ? "page"
                  : undefined
              }
              className={`text-[14px] font-medium transition-colors ${
                pathname === link.href || pathname.startsWith("/products/")
                  ? "text-white"
                  : "text-dim hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Categories keeps a dropdown; every other destination is one click. */}
          <div
            className="relative"
            onMouseEnter={() => setCats(true)}
            onMouseLeave={() => setCats(false)}
          >
            <button
              type="button"
              onClick={() => setCats((v) => !v)}
              aria-expanded={cats}
              className={`flex items-center gap-1.5 text-[14px] font-medium transition-colors ${
                categories.some((c) => pathname === `/${c.id}`)
                  ? "text-white"
                  : "text-dim hover:text-white"
              }`}
            >
              Categories
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                aria-hidden="true"
                className={`transition-transform duration-300 ${cats ? "rotate-180" : ""}`}
              >
                <path
                  d="M2 4l3 3 3-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {cats && (
              <div className="animate-menu-drop bg-surface border-line absolute top-full left-1/2 w-60 -translate-x-1/2 rounded-2xl border p-2 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.95)]">
                {categories.map((c) => (
                  <Link
                    key={c.id}
                    href={`/${c.id}`}
                    data-room={c.id}
                    onClick={close}
                    className="group hover:bg-elevated block rounded-xl px-3 py-2.5 transition-colors"
                  >
                    <span className="group-hover-room block text-[14px] font-semibold text-white transition-colors">
                      {c.name}
                    </span>
                    <span className="text-muted mt-0.5 block text-[12px]">
                      {c.blurb}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={close}
                aria-current={active ? "page" : undefined}
                className={`text-[14px] font-medium transition-colors ${
                  active ? "text-white" : "text-dim hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center justify-end gap-2">
          <SearchDialog />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="text-text -mr-1 p-2 lg:hidden"
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
          className="border-line bg-ink border-t lg:hidden"
        >
          <div className="shell py-4">
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/${c.id}`}
                onClick={close}
                className="text-dim block py-2.5 text-[17px] font-semibold hover:text-white"
              >
                {c.name}
              </Link>
            ))}
            <span className="bg-line my-3 block h-px" />
            {[...navLeading, ...navLinks].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={close}
                className="block py-2.5 text-[17px] font-semibold text-white"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={site.links.frostify}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="text-dim block py-2.5 text-[17px] font-semibold"
            >
              {site.parent} &#8599;
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
