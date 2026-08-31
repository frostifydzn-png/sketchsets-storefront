import Link from "next/link";
import { byCategory, formatPrice, type Category } from "@/lib/products";

/**
 * Clean type-led tile. The previous version washed blurred pack artwork behind
 * the text, which fought the labels and read as noise.
 */
export function CategoryCard({ category }: { category: Category }) {
  const items = byCategory(category.id);
  if (items.length === 0) return null;

  const from = Math.min(...items.map((p) => p.price));

  return (
    <Link
      href={`/${category.id}`}
      className="group bg-surface ring-line hover:ring-line-bright flex h-full flex-col rounded-2xl p-7 ring-1 transition-all duration-300 hover:-translate-y-1.5 sm:p-8"
    >
      <span
        aria-hidden="true"
        className="block h-1 w-10 rounded-full"
        style={{ background: category.accentVar }}
      />

      <h3 className="font-display mt-6 text-[clamp(1.5rem,2.4vw,1.875rem)] leading-none">
        {category.name}
      </h3>
      <p className="text-dim mt-3 text-[15px] leading-relaxed">
        {category.blurb}
      </p>

      <p className="text-muted mt-6 text-[14px]">
        <span className="text-text font-semibold">
          {items.length} {items.length === 1 ? "pack" : "packs"}
        </span>
        {from > 0 ? (
          <>
            {" "}
            from{" "}
            <span className="text-accent font-bold">{formatPrice(from)}</span>
          </>
        ) : (
          <>
            {" "}
            with <span className="text-accent font-bold">free</span> options
          </>
        )}
      </p>

      <span className="border-line group-hover:border-accent group-hover:text-accent mt-7 inline-block w-fit rounded-full border px-5 py-2.5 text-[14px] font-semibold transition-colors">
        Check it out
      </span>
    </Link>
  );
}
