import Image from "next/image";
import Link from "next/link";
import { getCreator } from "@/lib/creators";
import { formatPrice, type Product } from "@/lib/products";

/**
 * How much room a card is given, which is a statement about the product rather
 * than a layout detail. A $9 pack and the complete library should not occupy
 * the same footprint just because they are both products.
 */
export type CardSize = "lead" | "standard" | "compact";

const ASPECT: Record<CardSize, string> = {
  lead: "aspect-[16/11]",
  standard: "aspect-[4/3]",
  compact: "aspect-[3/2]",
};

const TITLE: Record<CardSize, string> = {
  lead: "text-[clamp(1.75rem,3vw,2.5rem)]",
  standard: "text-[1.375rem]",
  compact: "text-[1.0625rem]",
};

const SIZES: Record<CardSize, string> = {
  lead: "(max-width: 1024px) 100vw, 58vw",
  standard: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  compact: "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 22vw",
};

/**
 * A catalogue entry, not a card.
 *
 * Square artwork inside a hairline, then a ruled label block underneath:
 * catalogue number and price set in mono on one line, the title in the
 * editorial serif beneath it. That is a gallery wall label, and it is the
 * opposite of an icon-over-title-over-body feature tile.
 */
export function ProductCard({
  product,
  priority = false,
  size = "standard",
}: {
  product: Product;
  priority?: boolean;
  size?: CardSize;
}) {
  const creator = getCreator(product.creatorSlug);
  const alt = product.previewImages[1];
  const free = product.price === 0;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block focus-visible:outline-none"
    >
      <div
        className={`border-line group-hover:border-line-bright group-focus-visible:border-accent bg-surface relative overflow-hidden border transition-colors duration-500 ${ASPECT[size]}`}
      >
        <Image
          src={product.thumbnail}
          alt={`${product.title} preview`}
          fill
          sizes={SIZES[size]}
          priority={priority}
          className={`object-cover transition-all duration-[900ms] ease-[var(--ease-glide)] group-hover:scale-[1.04] ${
            alt ? "group-hover:opacity-0" : ""
          }`}
        />
        {alt && (
          <Image
            src={alt}
            alt=""
            aria-hidden="true"
            fill
            sizes={SIZES[size]}
            className="scale-[1.04] object-cover opacity-0 transition-opacity duration-[900ms] ease-[var(--ease-glide)] group-hover:opacity-100"
          />
        )}

        {product.isNew && (
          <span className="label-sm bg-accent text-ink pointer-events-none absolute top-0 right-0 px-2 py-1">
            New
          </span>
        )}
      </div>

      {/* Label block. The rule ties it to the artwork the way a mount does. */}
      <div className="border-line group-hover:border-line-bright mt-3 border-t pt-2.5 transition-colors duration-500">
        <div className="flex items-baseline justify-between gap-4">
          <span className="label text-muted group-hover:text-accent transition-colors duration-300">
            {product.setNumber}
          </span>
          <span
            className={`shrink-0 font-mono text-[13px] font-medium ${
              free ? "text-accent" : "text-dim"
            }`}
          >
            {free ? "FREE" : formatPrice(product.price)}
          </span>
        </div>

        <h3
          className={`font-display group-hover:text-accent mt-1.5 leading-[1.08] transition-colors duration-300 ${TITLE[size]}`}
        >
          {product.title}
        </h3>

        <p className="text-muted mt-1.5 truncate text-[13px]">
          {product.subcategory} · {creator?.name ?? product.creatorSlug}
        </p>

        {size === "lead" && (
          <p className="text-dim mt-3 max-w-[52ch] text-[15px] leading-relaxed">
            {product.valueProp}
          </p>
        )}
      </div>
    </Link>
  );
}
