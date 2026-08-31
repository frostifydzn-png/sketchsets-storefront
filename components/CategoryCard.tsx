import Image from "next/image";
import Link from "next/link";
import { byCategory, formatPrice, type Category } from "@/lib/products";

/**
 * Artwork-led category tile. Uses the category's own products as the visual,
 * so browsing by category shows what is actually inside it.
 */
export function CategoryCard({ category }: { category: Category }) {
  const items = byCategory(category.id);
  if (items.length === 0) return null;

  const from = Math.min(...items.map((p) => p.price));
  const cover = items[0].thumbnail;

  return (
    <Link
      href={`/${category.id}`}
      className="group ring-line hover:ring-line-bright relative block overflow-hidden rounded-2xl ring-1 transition-all duration-300 hover:-translate-y-1.5"
    >
      <div className="bg-surface relative aspect-[5/4] sm:aspect-[4/3]">
        <Image
          src={cover}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, 33vw"
          className="scale-105 object-cover opacity-45 blur-[1px] transition-all duration-700 ease-[var(--ease-out-soft)] group-hover:scale-110 group-hover:opacity-60 group-hover:blur-0"
        />
        <div
          aria-hidden="true"
          className="from-ink via-ink/75 absolute inset-0 bg-gradient-to-t to-transparent"
        />

        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <span
            aria-hidden="true"
            className="mb-4 block h-1 w-10 rounded-full"
            style={{ background: category.accentVar }}
          />
          <h3 className="font-display text-[clamp(1.5rem,2.6vw,2rem)] leading-none">
            {category.name}
          </h3>
          <p className="text-dim mt-2 text-[14px]">{category.blurb}</p>
          <p className="mt-4 flex items-center gap-2 text-[14px]">
            <span className="text-text font-semibold">
              {items.length} {items.length === 1 ? "pack" : "packs"}
            </span>
            <span className="text-muted">·</span>
            <span className="text-muted">from</span>
            <span className="text-accent font-bold">{formatPrice(from)}</span>
            <span className="text-muted ml-auto inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
}
