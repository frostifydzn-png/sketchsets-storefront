"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  IconArrow,
  IconGrid,
  IconLayers,
  IconSpark,
  IconTag,
  iconForType,
} from "@/components/Icons";
import { Logomark } from "@/components/Logomark";
import { SearchDialog } from "@/components/SearchDialog";
import { linkedCategories, typesIn } from "@/lib/catalog";
import { formatPrice, getProduct, products } from "@/lib/products";
import { site } from "@/lib/site";

/**
 * Site header.
 *
 * WHITE, AND THE MENU IS A SHEET RATHER THAN A DROPDOWN. The dark band this
 * replaced framed the shop but also fought it: a near-black slab above a white
 * page is the heaviest thing on screen, and on a storefront the heaviest thing
 * on screen should be a product.
 *
 * Four destinations. Shop opens everything; Vault and Free are the two highest
 * intent entry points and keep their own slot. Every category, type and count
 * below is derived from lib/products.ts through lib/catalog.ts — this file
 * lists no destinations of its own, so the menu cannot drift out of step with
 * the catalogue, and a category holding fewer than two products is
 * structurally unable to appear in it.
 */

/**
 * One row of the sheet: icon chip, label, count.
 *
 * No descriptions. A mega menu is scanned rather than read, and a sentence
 * under every row doubles its height while adding nothing a buyer did not
 * already get from the label — which is the difference between a menu that
 * looks thorough and one that is quick.
 */
function MenuRow({
  href,
  label,
  count,
  icon: Icon,
  onNavigate,
}: {
  href: string;
  label: string;
  count?: number;
  icon: (p: { className?: string }) => React.ReactElement;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="group/row hover:bg-elevated -mx-2.5 flex items-center gap-3 rounded-lg px-2.5 py-2 transition-colors"
    >
      <span className="border-line bg-surface text-dim group-hover/row:border-accent/35 group-hover/row:text-accent flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border transition-colors">
        <Icon className="h-[18px] w-[18px]" />
      </span>
      <span className="text-text min-w-0 flex-1 truncate text-[13.5px] font-semibold">
        {label}
      </span>
      {count !== undefined && (
        <span className="text-muted shrink-0 text-[12px] tabular-nums">
          {count}
        </span>
      )}
    </Link>
  );
}

export function SiteHeader() {
  const [mobile, setMobile] = useState(false);
  const [shop, setShop] = useState(false);
  const pathname = usePathname();

  const close = () => {
    setMobile(false);
    setShop(false);
  };

  /* Escape closes the sheet. A menu that opens from the keyboard and only
     closes with the mouse is a trap. */
  useEffect(() => {
    if (!shop && !mobile) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShop(false);
        setMobile(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [shop, mobile]);

  const cats = linkedCategories();
  const vault = getProduct("sketchsets-vault");

  const views = [
    {
      href: "/browse",
      label: "All products",
      count: products.length,
      icon: IconGrid,
    },
    {
      href: "/new",
      label: "New releases",
      count: products.filter((p) => p.isNew).length,
      icon: IconSpark,
    },
    {
      href: "/free",
      label: "Free downloads",
      count: products.filter((p) => p.price === 0).length,
      icon: IconTag,
    },
  ].filter((v) => v.count > 0);

  const navLink = (active: boolean) =>
    `text-[14px] font-semibold transition-colors ${
      active ? "text-text" : "text-dim hover:text-text"
    }`;

  return (
    <header
      className="bg-surface/85 border-line sticky top-0 z-40 border-b backdrop-blur-xl"
      onMouseLeave={() => setShop(false)}
    >
      <div className="shell grid h-[72px] grid-cols-[auto_1fr_auto] items-center gap-6">
        <Link
          href="/"
          onClick={close}
          className="group flex shrink-0 items-center gap-2.5"
        >
          <Logomark className="text-accent h-7 w-7 shrink-0 transition-transform duration-500 ease-[var(--ease-glide)] group-hover:-rotate-6" />
          <span className="leading-none">
            <span className="text-text block text-[19px] font-extrabold tracking-[-0.025em]">
              SketchSets
            </span>
            <span className="text-muted mt-0.5 block text-[10.5px] font-medium">
              by <span className="text-accent font-semibold">{site.parent}</span>
            </span>
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center justify-center gap-6 lg:flex xl:gap-7"
        >
          <button
            type="button"
            onMouseEnter={() => setShop(true)}
            onClick={() => setShop((v) => !v)}
            aria-expanded={shop}
            className={`flex items-center gap-1.5 ${navLink(shop)}`}
          >
            Browse
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              aria-hidden="true"
              className={`transition-transform duration-300 ${shop ? "rotate-180" : ""}`}
            >
              <path
                d="M2 4l3 3 3-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/*
            THE DEPARTMENTS ARE NAMED IN THE BAR. Hiding every category one
            level down under a single "Browse" is a boutique move — it works
            when there are two rooms and reads as evasive when there are
            several. A marketplace says what it stocks on the front door, and
            these come from lib/products.ts so the bar restocks itself.
          */}
          {cats.map((category) => (
            <Link
              key={category.id}
              href={`/${category.id}`}
              onClick={close}
              onMouseEnter={() => setShop(false)}
              className={navLink(pathname === `/${category.id}`)}
            >
              {category.name}
            </Link>
          ))}

          <Link
            href="/free"
            onClick={close}
            onMouseEnter={() => setShop(false)}
            className={navLink(pathname === "/free")}
          >
            Free
          </Link>
        </nav>

        <div className="flex items-center justify-end gap-2">
          <SearchDialog />
          <button
            type="button"
            onClick={() => setMobile((v) => !v)}
            aria-expanded={mobile}
            aria-controls="mobile-nav"
            aria-label={mobile ? "Close menu" : "Open menu"}
            className="text-text -mr-1 p-2 lg:hidden"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
              {mobile ? (
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

      {/*
        The sheet spans the header rather than hanging off the Shop button, so
        it must NOT take .animate-menu-drop — those keyframes end at
        translate(-50%, 0) for a panel that also sets left: 50%, and applied to
        a full-width sheet they push it half its own width off the screen,
        which is exactly what they did once. Its own keyframes only fade and
        drop.
      */}
      {shop && (
        <div className="animate-menu-sheet bg-surface border-line absolute inset-x-0 top-full hidden border-b shadow-[0_24px_50px_-28px_rgba(21,21,21,0.35)] lg:block">
          <div className="shell grid grid-cols-[1fr_1fr_1fr_1.1fr] gap-9 py-9">
            <div>
              <h3 className="set-no text-muted mb-4">Browse</h3>
              <div className="flex flex-col gap-0.5">
                {views.map((v) => (
                  <MenuRow key={v.href} {...v} onNavigate={close} />
                ))}
              </div>
            </div>

            {cats.map((category) => (
              <div key={category.id}>
                <h3 className="set-no text-muted mb-4">{category.name}</h3>
                <div className="flex flex-col gap-0.5">
                  {typesIn(category.id).map((type) => (
                    <MenuRow
                      key={type.name}
                      href={`/${category.id}`}
                      label={type.name}
                      count={type.count}
                      icon={iconForType(type.name)}
                      onNavigate={close}
                    />
                  ))}
                </div>
              </div>
            ))}

            {vault && (
              <div>
                <h3 className="set-no text-muted mb-4">The whole library</h3>
                <Link
                  href={`/products/${vault.slug}`}
                  onClick={close}
                  className="group/v border-line bg-elevated hover:border-accent/40 block rounded-lg border p-4 transition-colors"
                >
                  <span className="border-line bg-surface text-accent mb-3 flex h-9 w-9 items-center justify-center rounded-[10px] border">
                    <IconLayers className="h-[18px] w-[18px]" />
                  </span>
                  <span className="text-text block text-[14.5px] font-bold">
                    {vault.title}
                  </span>
                  <span className="text-muted mt-1 block text-[12.5px]">
                    {vault.bundleOf?.length ?? 0} packs &middot;{" "}
                    <span className="tabular-nums">{vault.assetCount}</span>{" "}
                    assets
                  </span>
                  <span className="text-accent mt-3 flex items-center gap-1.5 text-[14px] font-bold tabular-nums">
                    {formatPrice(vault.price)}
                    <IconArrow className="h-4 w-4 transition-transform group-hover/v:translate-x-1" />
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {mobile && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-line bg-surface border-t lg:hidden"
        >
          <div className="shell flex flex-col gap-0.5 py-4">
            {cats.map((c) => (
              <MenuRow
                key={c.id}
                href={`/${c.id}`}
                label={c.name}
                count={typesIn(c.id).reduce((n, t) => n + t.count, 0)}
                icon={iconForType(c.name)}
                onNavigate={close}
              />
            ))}

            <span className="bg-line my-3 block h-px" />

            {views.map((v) => (
              <MenuRow key={v.href} {...v} onNavigate={close} />
            ))}

            {vault && (
              <MenuRow
                href={`/products/${vault.slug}`}
                label="The Vault"
                icon={IconLayers}
                onNavigate={close}
              />
            )}

            <MenuRow
              href="/support"
              label="Support"
              icon={IconGrid}
              onNavigate={close}
            />
          </div>
        </nav>
      )}
    </header>
  );
}
