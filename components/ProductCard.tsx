import Image from "next/image";
import Link from "next/link";
import { getCreator } from "@/lib/creators";
import { formatPrice, type Product } from "@/lib/products";

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const creator = getCreator(product.creatorSlug);
  const alt = product.previewImages[1];
  const free = product.price === 0;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block focus-visible:outline-none"
    >
      {/* Artwork carries the card. No panel, no ring, no chrome around it. */}
      <div className="bg-surface relative aspect-[4/3] overflow-hidden rounded-2xl transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-translate-y-1.5 group-focus-visible:ring-2 group-focus-visible:ring-[var(--color-accent)]">
        <Image
          src={product.thumbnail}
          alt={`${product.title} preview`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={priority}
          className={`object-cover transition-all duration-[600ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.05] ${
            alt ? "group-hover:opacity-0" : ""
          }`}
        />
        {alt && (
          <Image
            src={alt}
            alt=""
            aria-hidden="true"
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="scale-[1.05] object-cover opacity-0 transition-opacity duration-[600ms] ease-[var(--ease-out-soft)] group-hover:opacity-100"
          />
        )}

        {product.isNew && (
          <span className="bg-accent text-ink pointer-events-none absolute top-3 left-3 rounded-full px-2.5 py-1 text-[11px] font-bold">
            New
          </span>
        )}
      </div>

      <div className="mt-4">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display group-hover:text-accent truncate text-[1.0625rem] leading-tight transition-colors">
            {product.title}
          </h3>
          <span
            className={`font-display shrink-0 text-[1.0625rem] leading-tight ${
              free ? "text-accent" : "text-text"
            }`}
          >
            {formatPrice(product.price)}
          </span>
        </div>
        <p className="text-muted mt-1.5 truncate text-[13.5px]">
          {product.subcategory} · {creator?.name ?? product.creatorSlug}
        </p>
      </div>
    </Link>
  );
}
