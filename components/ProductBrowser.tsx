"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { categories, type CategoryId, type Product } from "@/lib/products";

type PriceBand = "all" | "free" | "under10" | "10to25" | "over25";
type SortKey = "featured" | "price-asc" | "price-desc" | "new";

const bands: { id: PriceBand; label: string; test: (p: number) => boolean }[] =
  [
    { id: "all", label: "Any price", test: () => true },
    { id: "free", label: "Free", test: (p) => p === 0 },
    { id: "under10", label: "Under $10", test: (p) => p > 0 && p < 10 },
    { id: "10to25", label: "$10 – $25", test: (p) => p >= 10 && p <= 25 },
    { id: "over25", label: "$25 and up", test: (p) => p > 25 },
  ];

const sorts: { id: SortKey; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "new", label: "Newest" },
];

const bandTest = (id: PriceBand) =>
  bands.find((b) => b.id === id)?.test ?? (() => true);

export function ProductBrowser({
  products,
  software,
  lockedCategory,
}: {
  products: Product[];
  software: string[];
  /** Set on category pages, where the category is already implied. */
  lockedCategory?: CategoryId;
}) {
  const [category, setCategory] = useState<CategoryId | "all">(
    lockedCategory ?? "all",
  );
  const [app, setApp] = useState("all");
  const [band, setBand] = useState<PriceBand>("all");
  const [sort, setSort] = useState<SortKey>("featured");
  const [sheetOpen, setSheetOpen] = useState(false);

  const matches = useMemo(
    () => ({
      category: (p: Product) => category === "all" || p.category === category,
      app: (p: Product) => app === "all" || p.compatibility.includes(app),
      price: (p: Product) => bandTest(band)(p.price),
    }),
    [category, app, band],
  );

  const results = useMemo(() => {
    const list = products.filter(
      (p) => matches.category(p) && matches.app(p) && matches.price(p),
    );
    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "new")
      sorted.sort((a, b) => Number(b.isNew) - Number(a.isNew));
    if (sort === "featured")
      sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
    return sorted;
  }, [products, matches, sort]);

  /*
   * Facet counts ignore their own dimension, so each number tells you how many
   * results that option would actually give you.
   */
  const counts = useMemo(() => {
    const forCategory = products.filter(
      (p) => matches.app(p) && matches.price(p),
    );
    const forApp = products.filter(
      (p) => matches.category(p) && matches.price(p),
    );
    const forBand = products.filter(
      (p) => matches.category(p) && matches.app(p),
    );

    return {
      category: {
        all: forCategory.length,
        ...Object.fromEntries(
          categories.map((c) => [
            c.id,
            forCategory.filter((p) => p.category === c.id).length,
          ]),
        ),
      } as Record<string, number>,
      app: {
        all: forApp.length,
        ...Object.fromEntries(
          software.map((s) => [
            s,
            forApp.filter((p) => p.compatibility.includes(s)).length,
          ]),
        ),
      } as Record<string, number>,
      band: Object.fromEntries(
        bands.map((b) => [b.id, forBand.filter((p) => b.test(p.price)).length]),
      ) as Record<string, number>,
    };
  }, [products, software, matches]);

  const active = [
    category !== (lockedCategory ?? "all") && {
      label: categories.find((c) => c.id === category)?.name ?? "",
      clear: () => setCategory(lockedCategory ?? "all"),
    },
    app !== "all" && { label: app, clear: () => setApp("all") },
    band !== "all" && {
      label: bands.find((b) => b.id === band)?.label ?? "",
      clear: () => setBand("all"),
    },
  ].filter(Boolean) as { label: string; clear: () => void }[];

  const clearAll = () => {
    setCategory(lockedCategory ?? "all");
    setApp("all");
    setBand("all");
  };

  const filters = (
    <div className="space-y-8">
      {!lockedCategory && (
        <FilterGroup title="Category">
          <Option
            checked={category === "all"}
            count={counts.category.all}
            onSelect={() => setCategory("all")}
          >
            All categories
          </Option>
          {categories.map((c) => (
            <Option
              key={c.id}
              checked={category === c.id}
              count={counts.category[c.id]}
              onSelect={() => setCategory(c.id)}
            >
              {c.name}
            </Option>
          ))}
        </FilterGroup>
      )}

      <FilterGroup title="Price">
        {bands.map((b) => (
          <Option
            key={b.id}
            checked={band === b.id}
            count={counts.band[b.id]}
            onSelect={() => setBand(b.id)}
          >
            {b.label}
          </Option>
        ))}
      </FilterGroup>

      <FilterGroup title="Works with">
        <Option
          checked={app === "all"}
          count={counts.app.all}
          onSelect={() => setApp("all")}
        >
          Any software
        </Option>
        {software.map((s) => (
          <Option
            key={s}
            checked={app === s}
            count={counts.app[s]}
            onSelect={() => setApp(s)}
          >
            {s}
          </Option>
        ))}
      </FilterGroup>
    </div>
  );

  return (
    <div className="mt-12 flex gap-10 sm:mt-14 lg:gap-14">
      {/* Desktop sidebar */}
      <aside className="hidden w-[230px] shrink-0 lg:block">
        <div className="sticky top-24">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-lg">Filters</h2>
            {active.length > 0 && (
              <button
                type="button"
                onClick={clearAll}
                className="text-accent text-[13px] font-medium hover:underline"
              >
                Clear all
              </button>
            )}
          </div>
          {filters}
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <div className="border-line flex flex-wrap items-center gap-3 border-b pb-4">
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            className="border-line hover:border-line-bright flex items-center gap-2 rounded-full border px-4 py-2 text-[14px] font-medium lg:hidden"
          >
            Filters
            {active.length > 0 && (
              <span className="bg-accent text-ink flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-bold">
                {active.length}
              </span>
            )}
          </button>

          <p className="text-[15px] font-semibold" aria-live="polite">
            {results.length} {results.length === 1 ? "pack" : "packs"}
          </p>

          {active.map((f) => (
            <button
              key={f.label}
              type="button"
              onClick={f.clear}
              className="bg-elevated text-dim hover:text-text hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] transition-colors lg:inline-flex"
            >
              {f.label}
              <span aria-hidden="true">×</span>
              <span className="sr-only">Remove filter</span>
            </button>
          ))}

          {/* Native select chrome is the loudest "app" tell on the page. */}
          <label className="relative ml-auto flex items-center gap-2 text-[14px]">
            <span className="text-muted">Sort</span>
            <span className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="text-text cursor-pointer appearance-none bg-transparent py-2 pr-6 pl-0 text-[14px] font-medium outline-none"
              >
                {sorts.map((s) => (
                  <option key={s.id} value={s.id} className="bg-surface">
                    {s.label}
                  </option>
                ))}
              </select>
              <span
                aria-hidden="true"
                className="text-muted pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 text-[10px]"
              >
                ▼
              </span>
            </span>
          </label>
        </div>

        {results.length > 0 ? (
          <div className="mt-7 grid grid-cols-2 gap-x-5 gap-y-9 md:grid-cols-3 xl:grid-cols-4">
            {results.map((product, i) => (
              <Reveal key={product.id} delay={Math.min(i, 7) * 55}>
                <ProductCard product={product} priority={i < 4} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="font-display text-2xl">Nothing matches</p>
            <p className="text-muted mt-2 text-[15px]">
              Try widening the price range or clearing a filter.
            </p>
            <button
              type="button"
              onClick={clearAll}
              className="bg-accent text-ink mt-6 rounded-xl px-5 py-3 text-[14px] font-bold"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Mobile filter sheet */}
      {sheetOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setSheetOpen(false)}
            className="bg-ink/80 absolute inset-0 backdrop-blur-sm"
          />
          <div className="bg-surface border-line animate-fade-up absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-2xl border-t p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-xl">Filters</h2>
              <button
                type="button"
                onClick={() => setSheetOpen(false)}
                className="text-muted hover:text-text text-[14px]"
              >
                Done
              </button>
            </div>
            {filters}
            <div className="mt-8 flex gap-3">
              <button
                type="button"
                onClick={clearAll}
                className="border-line flex-1 rounded-xl border py-3.5 text-[15px] font-semibold"
              >
                Clear all
              </button>
              <button
                type="button"
                onClick={() => setSheetOpen(false)}
                className="bg-accent text-ink flex-1 rounded-xl py-3.5 text-[15px] font-bold"
              >
                Show {results.length}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset>
      <legend className="text-muted mb-3 text-[13px] font-medium">
        {title}
      </legend>
      <div className="space-y-0.5">{children}</div>
    </fieldset>
  );
}

function Option({
  checked,
  count,
  onSelect,
  children,
}: {
  checked: boolean;
  count: number;
  onSelect: () => void;
  children: React.ReactNode;
}) {
  const empty = count === 0 && !checked;

  /*
   * No radio dots. Selection reads through colour and weight, with a short
   * accent rule marking the active row, which keeps the sidebar looking like a
   * shop's filters rather than a settings panel.
   */
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={checked}
      disabled={empty}
      className={`group flex w-full items-center gap-3 py-2 text-left text-[15px] transition-colors ${
        checked
          ? "text-text font-semibold"
          : empty
            ? "text-muted/35 cursor-not-allowed"
            : "text-dim hover:text-text"
      }`}
    >
      <span
        aria-hidden="true"
        className={`h-px shrink-0 transition-all duration-300 ease-[var(--ease-glide)] ${
          checked ? "bg-accent w-5" : "bg-line-bright w-0 group-hover:w-3"
        }`}
      />
      <span className="flex-1 truncate">{children}</span>
      <span className="text-muted text-[13px] tabular-nums">{count}</span>
    </button>
  );
}
