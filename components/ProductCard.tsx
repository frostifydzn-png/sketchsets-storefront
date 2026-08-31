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
  // Second preview cross-fades in on hover, when the product has one.
  const alt = product.previewImages[1];

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block focus-visible:outline-none"
    >
      <div className="bg-surface ring-line group-hover:ring-line-bright relative aspect-[4/3] overflow-hidden rounded-xl ring-1 transition-all duration-300 group-hover:-translate-y-1 group-focus-visible:ring-2 group-focus-visible:ring-[var(--color-accent)]">
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

        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3">
          {product.featured ? (
            <span className="bg-ink/75 text-accent rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wide backdrop-blur-md">
              Frostify Pick
            </span>
          ) : (
            <span />
          )}
          {product.isNew && (
            <span className="bg-ink/75 text-text rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wide backdrop-blur-md">
              New
            </span>
          )}
        </div>

        {/* Quiet affordance — appears on hover, never covers the artwork. */}
        <span className="pointer-events-none absolute inset-x-3 bottom-3 translate-y-1.5 rounded-lg bg-white/95 py-2 text-center text-[13px] font-semibold text-black opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          View product
        </span>
      </div>

      <div className="mt-3 flex items-start justify-between gap-4">
        <div className="min-w-0">
          {/* Wraps rather than truncating — names are how people scan a grid. */}
          <h3 className="line-clamp-2 text-[15px] leading-snug font-semibold">
            {product.title}
          </h3>
          <p className="text-muted mt-0.5 truncate text-[13px]">
            by {creator?.name ?? product.creatorSlug}
          </p>
        </div>
        <span
          className={`shrink-0 text-[15px] font-semibold ${
            product.price === 0 ? "text-accent" : "text-text"
          }`}
        >
          {formatPrice(product.price)}
        </span>
      </div>
    </Link>
  );
}
