"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MegaPanel, type MenuId } from "@/components/MegaPanel";
import { SearchDialog } from "@/components/SearchDialog";
import { byCategory, categories } from "@/lib/products";
import { site } from "@/lib/site";

const trustPoints = [
  "Instant download",
  "Commercial licence included",
  "Secure checkout via Payhip",
];

/** Nav items that open a panel, in order. */
const menuItems: { id: MenuId; href: string; label: string }[] = [
  { id: "browse", href: "/browse", label: "Browse" },
  ...categories.map((c) => ({
    id: c.id as MenuId,
    href: `/${c.id}`,
    label: c.name,
  })),
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menu, setMenu] = useState<MenuId | null>(null);
  const pathname = usePathname();

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = (id: MenuId) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMenu(id);
  };

  // Small grace period so moving the cursor into the panel doesn't close it.
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMenu(null), 130);
  };

  const closeAll = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMenu(null);
    setMobileOpen(false);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className="bg-ink border-line sticky top-0 z-40 border-b"
      onMouseLeave={scheduleClose}
    >
      {/* Utility strip — states the offer before anyone has to ask. */}
      <div className="border-line hidden border-b lg:block">
        <div className="shell text-muted flex h-9 items-center gap-6 text-[12px]">
          {trustPoints.map((point) => (
            <span key={point} className="flex items-center gap-1.5">
              <span className="bg-accent h-1 w-1 rounded-full" aria-hidden="true" />
              {point}
            </span>
          ))}
          <a
            href={site.links.frostify}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text ml-auto transition-colors"
          >
            {site.parent} ↗
          </a>
          <a
            href={site.links.frostoria}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text transition-colors"
          >
            Frostoria ↗
          </a>
        </div>
      </div>

      {/* Main row */}
      <div className="shell flex h-[76px] items-center gap-10">
        <Link href="/" onClick={closeAll} className="flex shrink-0 items-baseline gap-2">
          <span className="font-display-tight text-[21px] leading-none">
            SKETCHSETS
          </span>
          <span className="text-muted text-[10px] leading-none font-medium sm:text-[11px]">
            · by {site.parent}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {menuItems.map((item) => {
            const active = pathname === item.href;
            const open = menu === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={closeAll}
                onMouseEnter={() => openMenu(item.id)}
                onFocus={() => openMenu(item.id)}
                aria-current={active ? "page" : undefined}
                aria-expanded={open}
                className={`rounded-lg px-3.5 py-2 text-[15px] font-medium transition-colors ${
                  active || open
                    ? "text-text bg-elevated"
                    : "text-dim hover:text-text"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/new"
            onClick={closeAll}
            onMouseEnter={scheduleClose}
            className={`rounded-lg px-3.5 py-2 text-[15px] font-medium transition-colors ${
              pathname === "/new" ? "text-text bg-elevated" : "text-dim hover:text-text"
            }`}
          >
            New
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <div onMouseEnter={scheduleClose}>
            <SearchDialog />
          </div>
          <Link
            href="/browse"
            onClick={closeAll}
            onMouseEnter={scheduleClose}
            className="bg-accent text-ink hidden rounded-xl px-5 py-2.5 text-[14px] font-bold transition-transform hover:scale-[1.03] lg:block"
          >
            Browse all
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="text-text -mr-2 p-2 md:hidden"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
              {mobileOpen ? (
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

      {/* Mega panel */}
      {menu && (
        <div
          className="absolute inset-x-0 top-full hidden md:block"
          onMouseEnter={() => openMenu(menu)}
        >
          <MegaPanel menu={menu} onNavigate={closeAll} />
        </div>
      )}

      {/* Mobile nav */}
      {mobileOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-line bg-ink max-h-[80vh] overflow-y-auto border-t md:hidden"
        >
          <div className="shell py-5">
            {menuItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={closeAll}
                className="border-line flex items-baseline justify-between border-b py-3.5"
              >
                <span className="font-display text-2xl">{item.label}</span>
                {item.id !== "browse" && (
                  <span className="text-muted text-[13px]">
                    {byCategory(item.id as "editing").length}
                  </span>
                )}
              </Link>
            ))}
            <Link
              href="/new"
              onClick={closeAll}
              className="border-line block border-b py-3.5"
            >
              <span className="font-display text-2xl">New drops</span>
            </Link>

            <div className="text-muted mt-6 space-y-2 text-[13px]">
              {trustPoints.map((p) => (
                <p key={p} className="flex items-center gap-2">
                  <span className="bg-accent h-1 w-1 rounded-full" aria-hidden="true" />
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-6 flex gap-5">
              <a
                href={site.links.frostify}
                target="_blank"
                rel="noopener noreferrer"
                className="text-dim text-[14px]"
              >
                {site.parent} ↗
              </a>
              <a
                href={site.links.frostoria}
                target="_blank"
                rel="noopener noreferrer"
                className="text-dim text-[14px]"
              >
                Frostoria ↗
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
