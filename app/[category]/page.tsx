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
    <div data-room={found.id} className="shell stack-bottom">
      <header className="relative pt-10 pb-10 sm:pt-14 sm:pb-12">
        {/* The bloom takes the room's own hue rather than a fixed violet. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-[60%] -left-[15%] h-[260%] w-[75%]"
          style={{
            background:
              "radial-gradient(45% 45% at 45% 50%, color-mix(in srgb, var(--room) 13%, transparent), transparent 72%)",
          }}
        />

        <div className="relative">
          <span
            className="label inline-flex items-center rounded-full border px-3.5 py-1.5"
            style={{
              color: "var(--room)",
              borderColor: "color-mix(in srgb, var(--room) 40%, transparent)",
              backgroundColor:
                "color-mix(in srgb, var(--room) 12%, transparent)",
            }}
          >
            Category
          </span>

          <div className="mt-6 grid items-end gap-x-14 gap-y-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
            <div>
              <h1 className="text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.04] font-extrabold tracking-[-0.03em]">
                {found.name}
              </h1>
              <p className="text-dim mt-4 max-w-[52ch] text-[16px] leading-relaxed">
                {found.intro}
              </p>
            </div>

            <dl className="border-line flex flex-wrap gap-x-8 gap-y-3 border-t pt-5 lg:justify-end">
              <div>
                <dt className="text-muted label">Packs</dt>
                <dd className="mt-1 text-[18px] font-extrabold text-white">
                  {items.length}
                </dd>
              </div>
              <div>
                <dt className="text-muted label">From</dt>
                <dd className="room-accent mt-1 text-[18px] font-extrabold">
                  {from > 0 ? formatPrice(from) : "Free"}
                </dd>
              </div>
              <div>
                <dt className="text-muted label">Works in</dt>
                <dd className="mt-1 text-[18px] font-extrabold text-white">
                  {software.length} apps
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </header>

      <div className="stack">
        <div className="panel">
          <ProductBrowser
            products={items}
            software={software}
            lockedCategory={found.id}
          />
        </div>

        {/* The way out, so a category is never a dead end. */}
        <nav className="panel">
          <h2 className="label text-muted">Elsewhere in the shop</h2>
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
