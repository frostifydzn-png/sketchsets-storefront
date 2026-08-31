"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { categories, type CategoryId, type Product } from "@/lib/products";

type Cut = CategoryId | "all" | "free";

/**
 * The whole catalogue on one screen, filtered in place.
 *
 * At this size the shop does not need pages, a sidebar or a mega menu to move
 * around it. Everything is one click from the homepage, and the filter never
 * navigates, so nothing reloads.
 */
export function ShopGrid({ products }: { products: Product[] }) {
  const [cut, setCut] = useState<Cut>("all");

  const cuts = useMemo(() => {
    const base: { id: Cut; label: string; count: number }[] = [
      { id: "all", label: "Everything", count: products.length },
      ...categories.map((c) => ({
        id: c.id as Cut,
        label: c.name,
        count: products.filter((p) => p.category === c.id).length,
      })),
      {
        id: "free" as Cut,
        label: "Free",
        count: products.filter((p) => p.price === 0).length,
      },
    ];
    return base.filter((c) => c.count > 0);
  }, [products]);

  const shown = useMemo(() => {
    if (cut === "all") return products;
    if (cut === "free") return products.filter((p) => p.price === 0);
    return products.filter((p) => p.category === cut);
  }, [products, cut]);

  return (
    <>
      <div className="border-line flex flex-wrap items-center gap-x-8 gap-y-3 border-b pb-4">
        {cuts.map((c) => {
          const active = cut === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setCut(c.id)}
              aria-pressed={active}
              /* Underline sits on the button's own baseline, so it stays put
                 when the row wraps rather than landing on the line below. */
              className={`relative pt-1 pb-2 text-[16px] transition-colors ${
                active ? "text-text font-semibold" : "text-dim hover:text-text"
              }`}
            >
              {c.label}
              <span className="text-muted ml-1.5 text-[13px]">{c.count}</span>
              <span
                aria-hidden="true"
                className={`bg-accent absolute bottom-0 left-0 h-[2px] transition-all duration-300 ease-[var(--ease-glide)] ${
                  active ? "w-full" : "w-0"
                }`}
              />
            </button>
          );
        })}
      </div>

      <div
        className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-3 xl:grid-cols-4"
        aria-live="polite"
      >
        {shown.map((product, i) => (
          <ProductCard key={product.id} product={product} priority={i < 4} />
        ))}
      </div>
    </>
  );
}
