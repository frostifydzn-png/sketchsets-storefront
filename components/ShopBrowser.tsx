"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import {
  categories,
  searchProducts,
  type CategoryId,
  type Product,
} from "@/lib/products";

type Filter =
  | { kind: "all" }
  | { kind: "category"; id: CategoryId }
  | { kind: "special"; id: "bundles" | "free" | "new" };

type SortKey = "featured" | "new" | "price-asc" | "price-desc";

const sorts: { id: SortKey; label: string }[] = [
  { id: "featured", label: "Sort by featured" },
  { id: "new", label: "Sort by latest" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
];

const sameFilter = (a: Filter, b: Filter) =>
  a.kind === b.kind && ("id" in a && "id" in b ? a.id === b.id : true);

export function ShopBrowser({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState<Filter>({ kind: "all" });
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("featured");

  const shopCategories = useMemo(
    () => [
      {
        filter: { kind: "all" } as Filter,
        label: "All products",
        count: products.length,
      },
      ...categories.map((c) => ({
        filter: { kind: "category", id: c.id } as Filter,
        label: c.name,
        count: products.filter((p) => p.category === c.id).length,
      })),
    ],
    [products],
  );

  /* Only collections with real stock. Trending needs sales data we do not have. */
  const specialCategories = useMemo(
    () =>
      [
        {
          filter: { kind: "special", id: "bundles" } as Filter,
          label: "Bundles",
          count: products.filter((p) => p.bundleOf?.length).length,
        },
        {
          filter: { kind: "special", id: "free" } as Filter,
          label: "Freebies",
          count: products.filter((p) => p.price === 0).length,
        },
        {
          filter: { kind: "special", id: "new" } as Filter,
          label: "New drops",
          count: products.filter((p) => p.isNew).length,
        },
      ].filter((c) => c.count > 0),
    [products],
  );

  const results = useMemo(() => {
    let list = products;

    if (filter.kind === "category") {
      list = list.filter((p) => p.category === filter.id);
    } else if (filter.kind === "special") {
      if (filter.id === "bundles")
        list = list.filter((p) => p.bundleOf?.length);
      if (filter.id === "free") list = list.filter((p) => p.price === 0);
      if (filter.id === "new") list = list.filter((p) => p.isNew);
    }

    if (query.trim()) {
      const hits = new Set(searchProducts(query).map((p) => p.slug));
      list = list.filter((p) => hits.has(p.slug));
    }

    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "new")
      sorted.sort((a, b) => Number(b.isNew) - Number(a.isNew));
    if (sort === "featured")
      sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
    return sorted;
  }, [products, filter, query, sort]);

  const sidebar = (
    <>
      <FilterList
        title="Shop categories"
        items={shopCategories}
        current={filter}
        onSelect={setFilter}
      />
      {specialCategories.length > 0 && (
        <div className="mt-10">
          <FilterList
            title="Special categories"
            items={specialCategories}
            current={filter}
            onSelect={setFilter}
          />
        </div>
      )}
    </>
  );

  return (
    <div className="mt-12 flex flex-col gap-10 lg:flex-row lg:gap-14">
      <aside className="lg:w-[220px] lg:shrink-0">
        <div className="lg:sticky lg:top-24">{sidebar}</div>
      </aside>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex-1 basis-64">
            <span className="sr-only">Search products</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              className="bg-elevated border-line focus:border-accent text-text placeholder:text-muted w-full rounded-full border px-5 py-3 text-[15px] outline-none"
            />
          </label>

          <label className="relative">
            <span className="sr-only">Sort products</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="border-line hover:border-line-bright bg-elevated text-text cursor-pointer appearance-none rounded-full border py-3 pr-10 pl-5 text-[14px] font-medium outline-none"
            >
              {sorts.map((s) => (
                <option key={s.id} value={s.id} className="bg-surface">
                  {s.label}
                </option>
              ))}
            </select>
            <span
              aria-hidden="true"
              className="text-muted pointer-events-none absolute top-1/2 right-5 -translate-y-1/2 text-[10px]"
            >
              ▼
            </span>
          </label>
        </div>

        <p className="text-muted mt-5 text-[14px]" aria-live="polite">
          {results.length} {results.length === 1 ? "product" : "products"}
        </p>

        {results.length > 0 ? (
          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-3">
            {results.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                priority={i < 3}
              />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="font-extrabold tracking-[-0.02em] text-2xl">Nothing matches</p>
            <p className="text-muted mt-2 text-[15px]">
              Try a different search or category.
            </p>
            <button
              type="button"
              onClick={() => {
                setFilter({ kind: "all" });
                setQuery("");
              }}
              className="btn-primary mt-6 px-6 py-3 text-[14px]"
            >
              Show everything
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function FilterList({
  title,
  items,
  current,
  onSelect,
}: {
  title: string;
  items: { filter: Filter; label: string; count: number }[];
  current: Filter;
  onSelect: (f: Filter) => void;
}) {
  return (
    <div>
      <h2 className="text-muted border-line border-b pb-3 text-[12px] font-semibold tracking-wider uppercase">
        {title}
      </h2>
      <ul className="mt-3">
        {items.map((item) => {
          const active = sameFilter(current, item.filter);
          return (
            <li key={item.label}>
              <button
                type="button"
                onClick={() => onSelect(item.filter)}
                aria-pressed={active}
                className={`flex w-full items-center justify-between gap-3 py-2.5 text-left text-[15px] transition-colors ${
                  active
                    ? "text-accent font-semibold"
                    : "text-dim hover:text-text"
                }`}
              >
                <span className="truncate">{item.label}</span>
                <span className="text-muted text-[13px] tabular-nums">
                  {item.count}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
