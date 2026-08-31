import Image from "next/image";
import Link from "next/link";
import { byCategory, formatPrice, type Category } from "@/lib/products";

/**
 * A room in the shop, not a filter chip.
 *
 * Each category sets `data-room`, which repoints the `--room` custom property
 * to that category's accent; everything inside then picks the colour up
 * without a conditional. That is what makes Editing and Thumbnails feel like
 * different parts of a shop rather than the same page with a query string on
 * the end — the treatment is shared, the colour is local.
 *
 * The doorway metaphor is literal: an accent bar along the top edge, the room
 * number in mono, the name in the editorial serif, and a strip of what is
 * actually on the shelves inside.
 */
export function CategoryCard({
  category,
  index,
}: {
  category: Category;
  /** Position in the shop, printed as the room number. */
  index: number;
}) {
  const items = byCategory(category.id);
  if (items.length === 0) return null;

  const from = Math.min(...items.map((p) => p.price));
  const shelf = items.slice(0, 3);

  return (
    <Link
      href={`/${category.id}`}
      data-room={category.id}
      className="group border-line hover:border-line-bright bg-surface relative flex h-full flex-col border transition-colors duration-500"
    >
      {/* The doorway. Grows on hover, so the room opens up rather than lifting. */}
      <span
        aria-hidden="true"
        className="room-bg h-[3px] w-full origin-left scale-x-[0.18] transition-transform duration-[700ms] ease-[var(--ease-glide)] group-hover:scale-x-100"
      />

      <div className="flex flex-1 flex-col p-7 sm:p-9">
        <div className="flex items-baseline justify-between gap-4">
          <span className="label room-accent">Room {index}</span>
          {/* Spelled out, so the count is not mistaken for a second room number. */}
          <span className="text-muted font-mono text-[12px]">
            {String(items.length).padStart(2, "0")}{" "}
            {items.length === 1 ? "pack" : "packs"}
          </span>
        </div>

        <h3 className="font-display mt-6 text-[clamp(1.875rem,3vw,2.5rem)] leading-[1.02]">
          {category.name}
        </h3>
        <p className="text-dim mt-3 max-w-[34ch] text-[15px] leading-relaxed">
          {category.blurb}
        </p>

        {/* What is actually on the shelves, at full opacity. Contents, not decoration. */}
        <div className="mt-8 grid grid-cols-3 gap-1.5">
          {shelf.map((p) => (
            <span
              key={p.id}
              className="bg-elevated border-line relative block aspect-[4/3] overflow-hidden border"
            >
              <Image
                src={p.thumbnail}
                alt={p.title}
                fill
                sizes="(max-width: 640px) 30vw, 180px"
                className="object-cover transition-transform duration-[900ms] ease-[var(--ease-glide)] group-hover:scale-[1.06]"
              />
            </span>
          ))}
        </div>

        <div className="border-line mt-auto flex items-baseline justify-between gap-4 border-t pt-5 sm:mt-8">
          <span className="text-muted font-mono text-[12.5px]">
            {from > 0 ? `From ${formatPrice(from)}` : "Free options inside"}
          </span>
          <span className="text-text group-hover-room text-[14px] font-medium transition-colors">
            Go in{" "}
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
