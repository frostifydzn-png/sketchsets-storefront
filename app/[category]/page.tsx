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
 * A room in the shop.
 *
 * `data-room` on the wrapper repoints `--room` for everything inside, so this
 * one file gives Editing, Thumbnails and Creator Tools genuinely different
 * treatments while sharing a single layout. The header is deliberately heavier
 * than a filtered-list heading — you should feel you walked somewhere, not
 * that a query string changed.
 */
export default async function CategoryPage({
  params,
}: PageProps<"/[category]">) {
  const { category } = await params;
  const found = getCategory(category);
  if (!found) notFound();

  const items = byCategory(found.id as CategoryId);
  const software = [...new Set(items.flatMap((p) => p.compatibility))].sort();
  const roomNumber = categories.findIndex((c) => c.id === found.id) + 1;
  const from = items.length > 0 ? Math.min(...items.map((p) => p.price)) : 0;

  return (
    <div data-room={found.id}>
      {/* Room header: full bleed, ruled top and bottom, accent bar on the edge. */}
      <header className="border-line relative border-b">
        <span
          aria-hidden="true"
          className="room-bg absolute inset-x-0 top-0 h-[3px]"
        />
        <div className="shell pt-14 pb-12 sm:pt-20 sm:pb-16">
          <div className="rule-out text-muted mb-8">
            <span className="label room-accent shrink-0">
              Room {roomNumber} of {categories.length}
            </span>
          </div>

          <div className="grid items-end gap-x-16 gap-y-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h1 className="font-display-tight text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.94]">
                {found.name}
              </h1>
              <p className="text-dim mt-5 max-w-[48ch] text-[17px] leading-relaxed">
                {found.intro}
              </p>
            </div>

            {/* The room's own index card. */}
            <dl className="border-line text-muted flex flex-wrap gap-x-10 gap-y-3 border-t pt-5 font-mono text-[12px] lg:justify-end">
              <div className="flex gap-2">
                <dt>PACKS</dt>
                <dd className="text-text">
                  {String(items.length).padStart(2, "0")}
                </dd>
              </div>
              <div className="flex gap-2">
                <dt>FROM</dt>
                <dd className="room-accent">
                  {from > 0 ? formatPrice(from) : "FREE"}
                </dd>
              </div>
              <div className="flex gap-2">
                <dt>WORKS IN</dt>
                <dd className="text-text">{software.length} apps</dd>
              </div>
            </dl>
          </div>
        </div>
      </header>

      <div className="shell pt-10">
        <ProductBrowser
          products={items}
          software={software}
          lockedCategory={found.id}
        />

        {/* The way out, so a room is never a dead end. */}
        <nav className="border-line mt-20 border-t pt-8">
          <span className="label text-muted">Elsewhere in the shop</span>
          <ul className="mt-5 flex flex-wrap gap-x-10 gap-y-4">
            {categories
              .filter((c) => c.id !== found.id)
              .map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/${c.id}`}
                    data-room={c.id}
                    className="group text-text hover-room font-display text-[1.5rem] transition-colors"
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
                className="text-muted hover:text-text font-display text-[1.5rem] transition-colors"
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
