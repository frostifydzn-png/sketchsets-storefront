import Image from "next/image";
import Link from "next/link";
import { getCreator } from "@/lib/creators";
import { formatPrice, type Product } from "@/lib/products";

export type CardSize = "lead" | "standard";

/**
 * Product card.
 *
 * Artwork, then the title, creator and price underneath it. No panel around
 * the whole thing, no border, no hover glow — the cover art is the product,
 * and wrapping it in a bordered tile with a coloured bloom only put software
 * chrome between the buyer and the thing they came to look at.
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
        className={`bg-elevated relative overflow-hidden rounded-xl ${
          size === "lead" ? "aspect-[16/10]" : "aspect-[16/11]"
        }`}
      >
        <Image
          src={product.thumbnail}
          alt={`${product.title} preview`}
          fill
          sizes={
            size === "lead"
              ? "(max-width: 1024px) 100vw, 55vw"
              : "(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
          }
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
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
            className="scale-[1.04] object-cover opacity-0 transition-opacity duration-[900ms] ease-[var(--ease-glide)] group-hover:opacity-100"
          />
        )}

        {product.isNew && (
          <span className="bg-accent absolute top-3 left-3 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide text-white uppercase">
            New
          </span>
        )}
      </div>

      <div className="mt-4">
        <div className="flex items-baseline justify-between gap-4">
          <h3
            className={`group-hover:text-accent truncate font-semibold text-white transition-colors ${
              size === "lead" ? "text-[1.25rem]" : "text-[15.5px]"
            }`}
          >
            {product.title}
          </h3>
          <span
            className={`shrink-0 font-semibold ${free ? "text-accent" : "text-dim"} ${
              size === "lead" ? "text-[1.125rem]" : "text-[15px]"
            }`}
          >
            {free ? "Free" : formatPrice(product.price)}
          </span>
        </div>

        <p className="text-muted mt-1 truncate text-[13px]">
          {product.subcategory} &middot;{" "}
          {creator?.name ?? product.creatorSlug}
        </p>

        {size === "lead" && (
          <p className="text-dim mt-3 max-w-[48ch] text-[15px] leading-relaxed">
            {product.valueProp}
          </p>
        )}
      </div>
    </Link>
  );
}
