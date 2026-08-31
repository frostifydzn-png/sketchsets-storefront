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
      <div className="bg-surface ring-line group-hover:ring-line-bright relative aspect-[4/3] overflow-hidden rounded-xl ring-1 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_18px_40px_-18px_rgba(0,0,0,0.9)] group-focus-visible:ring-2 group-focus-visible:ring-[var(--color-accent)]">
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

        {/*
          Only genuine novelty gets a badge. A "Frostify Pick" mark sat on four
          of five cards, which made it noise rather than signal; the Picks
          section already carries that meaning.
        */}
        {product.isNew && (
          <span className="bg-ink/80 text-text pointer-events-none absolute top-2.5 left-2.5 rounded-full px-2.5 py-1 text-[11px] font-medium backdrop-blur-md">
            New
          </span>
        )}

        {/* Price is the loudest thing on the card and never hides. */}
        <span
          className={`pointer-events-none absolute right-2.5 bottom-2.5 rounded-full px-2.5 py-1 text-[13px] font-extrabold backdrop-blur-md transition-colors sm:px-3 sm:py-1.5 sm:text-[15px] ${
            free
              ? "bg-accent text-ink"
              : "bg-ink/85 text-text group-hover:bg-accent group-hover:text-ink"
          }`}
        >
          {formatPrice(product.price)}
        </span>
      </div>

      <div className="mt-3">
        <h3 className="line-clamp-2 text-[15px] leading-snug font-semibold">
          {product.title}
        </h3>
        <p className="text-muted mt-0.5 truncate text-[13px]">
          {product.subcategory} · by {creator?.name ?? product.creatorSlug}
        </p>
      </div>
    </Link>
  );
}
