"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import {
  categories,
  type CategoryId,
  type Product,
} from "@/lib/products";

type PriceBand = "all" | "under10" | "10to25" | "over25";

const priceBands: { id: PriceBand; label: string; test: (p: number) => boolean }[] =
  [
    { id: "all", label: "Any price", test: () => true },
    { id: "under10", label: "Under $10", test: (p) => p > 0 && p < 10 },
    { id: "10to25", label: "$10–$25", test: (p) => p >= 10 && p <= 25 },
    { id: "over25", label: "$25+", test: (p) => p > 25 },
  ];

export function ProductBrowser({
  products,
  software,
  lockedCategory,
}: {
  products: Product[];
  software: string[];
  /** Set on category pages, where the category filter is already implied. */
  lockedCategory?: CategoryId;
}) {
  const [category, setCategory] = useState<CategoryId | "all">(
    lockedCategory ?? "all",
  );
  const [app, setApp] = useState<string>("all");
  const [band, setBand] = useState<PriceBand>("all");

  const filtered = useMemo(() => {
    const priceTest =
      priceBands.find((b) => b.id === band)?.test ?? (() => true);
    return products.filter(
      (p) =>
        (category === "all" || p.category === category) &&
        (app === "all" || p.compatibility.includes(app)) &&
        priceTest(p.price),
    );
  }, [products, category, app, band]);

  const dirty = category !== (lockedCategory ?? "all") || app !== "all" || band !== "all";

  return (
    <>
      <div className="border-line mt-8 flex flex-wrap items-center gap-2 border-y py-4">
        {!lockedCategory && (
          <FilterGroup label="Category">
            <Chip active={category === "all"} onClick={() => setCategory("all")}>
              All
            </Chip>
            {categories.map((c) => (
              <Chip
                key={c.id}
                active={category === c.id}
                onClick={() => setCategory(c.id)}
              >
                {c.name}
              </Chip>
            ))}
          </FilterGroup>
        )}

        <FilterGroup label="Software">
          <Chip active={app === "all"} onClick={() => setApp("all")}>
            Any
          </Chip>
          {software.map((s) => (
            <Chip key={s} active={app === s} onClick={() => setApp(s)}>
              {s}
            </Chip>
          ))}
        </FilterGroup>

        <FilterGroup label="Price">
          {priceBands.map((b) => (
            <Chip key={b.id} active={band === b.id} onClick={() => setBand(b.id)}>
              {b.label}
            </Chip>
          ))}
        </FilterGroup>

        <div className="ml-auto flex items-center gap-3">
          {dirty && (
            <button
              type="button"
              onClick={() => {
                setCategory(lockedCategory ?? "all");
                setApp("all");
                setBand("all");
              }}
              className="text-muted hover:text-text text-[13px] transition-colors"
            >
              Reset
            </button>
          )}
          <span className="text-muted text-[13px]" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? "pack" : "packs"}
          </span>
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-9 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} priority={i < 4} />
          ))}
        </div>
      ) : (
        <p className="text-muted py-20 text-center text-[15px]">
          Nothing matches those filters yet.
        </p>
      )}
    </>
  );
}

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className="flex flex-wrap items-center gap-1.5"
    >
      {children}
      <span aria-hidden="true" className="bg-line mx-2 hidden h-4 w-px lg:block" />
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full px-3 py-1.5 text-[13px] transition-colors ${
        active
          ? "bg-accent text-ink font-semibold"
          : "text-dim hover:text-text hover:bg-elevated"
      }`}
    >
      {children}
    </button>
  );
}
