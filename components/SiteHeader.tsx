"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logomark } from "@/components/Logomark";
import { SearchDialog } from "@/components/SearchDialog";
import { browseViews, linkedCategories, typesIn } from "@/lib/catalog";
import { formatPrice, getProduct } from "@/lib/products";
import { site } from "@/lib/site";

/**
 * FOUR ITEMS, AND NONE OF THEM IS HAND-MAINTAINED.
 *
 * The menu this replaced had seven destinations across two levels — Browse,
 * a Categories dropdown, Freebies, The Vault, New Drops, Support — for a shop
 * holding ten products. Seven links over ten products is not a navigation, it
 * is a filing system, and one of the categories it advertised held a single
 * item.
 *
 * Shop opens everything. Vault and Free are top-level because they are the
 * two highest-intent destinations in the shop: the flagship, and the thing
 * someone who has never heard of SketchSets actually clicks first. Support
 * moves to the footer, where support links belong.
 *
 * Every category and count below comes from lib/catalog.ts, which derives
 * them from the product array. Nothing here lists a destination; a category
 * appears when it earns two products and leaves when it does not.
 */
export function SiteHeader() {
  const [mobile, setMobile] = useState(false);
  const [shop, setShop] = useState(false);
  const pathname = usePathname();

  const close = () => {
    setMobile(false);
    setShop(false);
  };

  const cats = linkedCategories();
  const views = browseViews();
  const vault = getProduct("sketchsets-vault");

  const inShop =
    pathname === "/browse" ||
    pathname === "/new" ||
    pathname.startsWith("/products/") ||
    cats.some((c) => pathname === `/${c.id}`);

  return (
    <header
      className="bg-ink/80 border-line sticky top-0 z-40 border-b backdrop-blur-xl"
      onMouseLeave={() => setShop(false)}
    >
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
          className="hidden items-center justify-center gap-8 lg:flex"
        >
          <button
            type="button"
            onMouseEnter={() => setShop(true)}
            onClick={() => setShop((v) => !v)}
            aria-expanded={shop}
            className={`flex items-center gap-1.5 text-[14px] font-medium transition-colors ${
              inShop || shop ? "text-white" : "text-dim hover:text-white"
            }`}
          >
            Shop
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
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {vault && (
            <Link
              href={`/products/${vault.slug}`}
              onClick={close}
              onMouseEnter={() => setShop(false)}
              aria-current={
                pathname === `/products/${vault.slug}` ? "page" : undefined
              }
              className={`text-[14px] font-medium transition-colors ${
                pathname === `/products/${vault.slug}`
                  ? "text-white"
                  : "text-dim hover:text-white"
              }`}
            >
              Vault
            </Link>
          )}

          <Link
            href="/free"
            onClick={close}
            onMouseEnter={() => setShop(false)}
            aria-current={pathname === "/free" ? "page" : undefined}
            className={`text-[14px] font-medium transition-colors ${
              pathname === "/free" ? "text-white" : "text-dim hover:text-white"
            }`}
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
        The panel is a sibling of the header row rather than a child of the
        Shop button. Anchored to the button it would need a translate and a
        fixed width to stay on screen at every viewport; anchored to the
        header it simply inherits the page gutter and lines up with
        everything else on the page.
      */}
      {shop && (
        <div className="animate-menu-sheet border-line bg-surface absolute inset-x-0 top-full hidden border-t border-b shadow-[0_30px_60px_-25px_rgba(0,0,0,0.95)] lg:block">
          <div className="shell grid grid-cols-[1fr_1fr_1fr_1.15fr] gap-10 py-9">
            <div>
              <h3 className="text-muted text-[11px] font-semibold tracking-[0.14em] uppercase">
                Browse
              </h3>
              <ul className="mt-4 space-y-2.5">
                {views.map((view) => (
                  <li key={view.href}>
                    <Link
                      href={view.href}
                      onClick={close}
                      className="text-dim flex items-baseline gap-2 text-[14px] font-medium transition-colors hover:text-white"
                    >
                      {view.label}
                      <span className="text-muted text-[12px] tabular-nums">
                        {view.count}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {cats.map((category) => {
              const types = typesIn(category.id);
              return (
                <div key={category.id} data-room={category.id}>
                  <Link
                    href={`/${category.id}`}
                    onClick={close}
                    className="room-accent text-[15px] font-bold tracking-[-0.01em] transition-opacity hover:opacity-75"
                  >
                    {category.name}
                  </Link>
                  <p className="text-muted mt-2 text-[13px] leading-relaxed">
                    {category.blurb}
                  </p>
                  <ul className="mt-4 space-y-1.5">
                    {types.map((type) => (
                      <li
                        key={type.name}
                        className="text-dim flex items-baseline gap-2 text-[13.5px]"
                      >
                        {type.name}
                        <span className="text-muted text-[12px] tabular-nums">
                          {type.count}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}

            {vault && (
              <div>
                <h3 className="text-muted text-[11px] font-semibold tracking-[0.14em] uppercase">
                  The whole library
                </h3>
                <Link
                  href={`/products/${vault.slug}`}
                  onClick={close}
                  className="border-line bg-elevated hover:border-accent/40 mt-4 block rounded-xl border p-4 transition-colors"
                >
                  <span className="block text-[15px] font-bold text-white">
                    {vault.title}
                  </span>
                  <span className="text-muted mt-1.5 block text-[13px]">
                    {vault.bundleOf?.length ?? 0} packs &middot;{" "}
                    <span className="tabular-nums">{vault.assetCount}</span>{" "}
                    assets
                  </span>
                  <span className="text-accent mt-3 block text-[15px] font-semibold tabular-nums">
                    {formatPrice(vault.price)}
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
          className="border-line bg-ink border-t lg:hidden"
        >
          <div className="shell py-4">
            {cats.map((c) => (
              <Link
                key={c.id}
                href={`/${c.id}`}
                onClick={close}
                className="flex items-baseline justify-between py-2.5 text-[17px] font-semibold text-white"
              >
                {c.name}
                <span className="text-muted text-[13px] tabular-nums">
                  {typesIn(c.id).reduce((n, t) => n + t.count, 0)}
                </span>
              </Link>
            ))}

            <span className="bg-line my-3 block h-px" />

            {views.map((view) => (
              <Link
                key={view.href}
                href={view.href}
                onClick={close}
                className="text-dim block py-2.5 text-[17px] font-semibold hover:text-white"
              >
                {view.label}
              </Link>
            ))}

            {vault && (
              <Link
                href={`/products/${vault.slug}`}
                onClick={close}
                className="text-dim block py-2.5 text-[17px] font-semibold"
              >
                The Vault
              </Link>
            )}

            <Link
              href="/support"
              onClick={close}
              className="text-dim block py-2.5 text-[17px] font-semibold"
            >
              Support
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
