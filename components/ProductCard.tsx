import Image from "next/image";
import Link from "next/link";
import { getCreator } from "@/lib/creators";
import { formatPrice, type Product } from "@/lib/products";

export function ProductCard({
  product,
  priority = false,
  featured = false,
}: {
  product: Product;
  priority?: boolean;
  /** Runs taller with larger type, for the lead slot in a feature row. */
  featured?: boolean;
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
      <div
        className={`bg-surface relative overflow-hidden rounded-2xl shadow-[0_0_0_rgba(0,0,0,0)] transition-all duration-[550ms] ease-[var(--ease-glide)] group-hover:-translate-y-2 group-hover:shadow-[0_26px_50px_-24px_rgba(0,0,0,0.95)] group-focus-visible:ring-2 group-focus-visible:ring-[var(--color-accent)] ${
          featured ? "aspect-[4/3] lg:aspect-[5/4]" : "aspect-[4/3]"
        }`}
      >
        <Image
          src={product.thumbnail}
          alt={`${product.title} preview`}
          fill
          sizes={
            featured
              ? "(max-width: 1024px) 100vw, 45vw"
              : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          }
          priority={priority}
          className={`object-cover transition-all duration-[700ms] ease-[var(--ease-glide)] group-hover:scale-[1.06] ${
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
            className="scale-[1.06] object-cover opacity-0 transition-opacity duration-[700ms] ease-[var(--ease-glide)] group-hover:opacity-100"
          />
        )}

        {/* Catalogue number, the way an archive labels a piece. */}
        <span className="bg-ink/75 text-dim pointer-events-none absolute top-3 left-3 rounded px-2 py-1 font-mono text-[11px] tracking-widest backdrop-blur-md">
          {product.setNumber}
        </span>

        {product.isNew && (
          <span className="bg-accent text-ink pointer-events-none absolute top-3 right-3 rounded-full px-2.5 py-1 text-[11px] font-bold">
            New
          </span>
        )}
      </div>

      <div className="mt-4">
        <div className="flex items-baseline justify-between gap-4">
          <h3
            className={`font-display group-hover:text-accent truncate leading-tight transition-colors ${
              featured ? "text-[1.375rem]" : "text-[1.0625rem]"
            }`}
          >
            {product.title}
          </h3>
          <span
            className={`font-display shrink-0 leading-tight ${
              featured ? "text-[1.375rem]" : "text-[1.0625rem]"
            } ${free ? "text-accent" : "text-text"}`}
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
