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
      className="group bg-surface ring-line hover:ring-line-bright block overflow-hidden rounded-2xl p-2.5 ring-1 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_-20px_rgba(0,0,0,0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
    >
      <div className="bg-elevated relative aspect-[4/3] overflow-hidden rounded-xl">
        <Image
          src={product.thumbnail}
          alt={`${product.title} preview`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={priority}
          className={`object-cover transition-all duration-[600ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.04] ${
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
            className="scale-[1.04] object-cover opacity-0 transition-opacity duration-[600ms] ease-[var(--ease-out-soft)] group-hover:opacity-100"
          />
        )}

        {product.isNew && (
          <span className="bg-accent text-ink pointer-events-none absolute top-2.5 right-2.5 rounded-full px-2.5 py-1 text-[11px] font-bold">
            New
          </span>
        )}
      </div>

      {/* Title and price share a line; the category sits quietly beneath. */}
      <div className="px-1.5 pt-3 pb-1.5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="truncate text-[15px] font-semibold">
            {product.title}
          </h3>
          <span
            className={`shrink-0 text-[15px] font-bold ${
              free ? "text-accent" : "text-text"
            }`}
          >
            {formatPrice(product.price)}
          </span>
        </div>
        <p className="text-muted mt-1 truncate text-[13px]">
          {product.subcategory} · {creator?.name ?? product.creatorSlug}
        </p>
      </div>
    </Link>
  );
}
