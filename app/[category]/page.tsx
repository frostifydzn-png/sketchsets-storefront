import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ProductBrowser } from "@/components/ProductBrowser";
import {
  byCategory,
  categories,
  formatPrice,
  getCategory,
  type CategoryId,
} from "@/lib/products";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.id }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/[category]">): Promise<Metadata> {
  const { category } = await params;
  const found = getCategory(category);
  if (!found) return {};
  return {
    title: found.name,
    description: found.intro,
    alternates: { canonical: `/${found.id}` },
  };
}

/**
 * A category page.
 *
 * `data-room` on the wrapper repoints `--room` for everything inside, so
 * Editing, Thumbnails and Creator Tools each get their own hue through one
 * shared layout — violet, pink and blue, all inside the site's gradient family.
 * The header is deliberately heavier than a filtered-list heading: you should
 * feel you arrived somewhere, not that a query string changed.
 */
export default async function CategoryPage({
  params,
}: PageProps<"/[category]">) {
  const { category } = await params;
  const found = getCategory(category);
  if (!found) notFound();

  const items = byCategory(found.id as CategoryId);
  const software = [...new Set(items.flatMap((p) => p.compatibility))].sort();
  const from = items.length > 0 ? Math.min(...items.map((p) => p.price)) : 0;

  return (
    <div data-room={found.id} className="shell page-bottom">
      {/*
        The category's own accent survives as one word of colour, which is all
        it needs. The tinted pill, the bloom and the row of big numbers were
        three pieces of furniture doing the job one line of text does.
      */}
      <header className="page-top pb-4">
        <p className="room-accent text-[13px]">Category</p>

        <h1 className="mt-4 text-[clamp(2.25rem,4.6vw,3.5rem)] leading-[1.06] font-bold tracking-[-0.035em] text-white">
          {found.name}
        </h1>
        <p className="text-dim mt-5 max-w-[56ch] text-[16.5px] leading-relaxed">
          {found.intro}
        </p>
        <p className="text-muted mt-7 text-[13.5px]">
          {items.length} {items.length === 1 ? "pack" : "packs"} &middot;{" "}
          {from > 0 ? `from ${formatPrice(from)}` : "free options"} &middot;
          works in {software.length} apps
        </p>
      </header>

      <div>
        <div className="section-gap-sm">
          <ProductBrowser
            products={items}
            software={software}
            lockedCategory={found.id}
          />
        </div>

        {/* The way out, so a category is never a dead end. */}
        <nav className="section-gap">
          <h2 className="text-muted border-line border-t pt-12 text-[13px] sm:pt-14">
            Elsewhere in the shop
          </h2>
          <ul className="mt-5 flex flex-wrap gap-x-10 gap-y-4">
            {categories
              .filter((c) => c.id !== found.id)
              .map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/${c.id}`}
                    data-room={c.id}
                    className="group hover-room text-[1.375rem] font-extrabold tracking-[-0.02em] text-white transition-colors"
                  >
                    {c.name}
                    <span
                      aria-hidden="true"
                      className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1"
                    >
                      &rarr;
                    </span>
                  </Link>
                </li>
              ))}
            <li>
              <Link
                href="/browse"
                className="text-muted text-[1.375rem] font-extrabold tracking-[-0.02em] transition-colors hover:text-white"
              >
                Everything
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
