import Image from "next/image";
import Link from "next/link";
import { getCreator } from "@/lib/creators";
import { formatPrice, type Product } from "@/lib/products";

/**
 * How much room a card is given. Rails and grids both use `standard`; `lead`
 * is for the one card in a section that should carry more weight than the rest.
 */
export type CardSize = "lead" | "standard";

/**
 * Product card.
 *
 * Cover art in a rounded panel, then a tight label block: title, creator, and
 * the price pushed to the right in pink. The card is a bordered surface that
 * lifts on hover with a pink bloom, which is what stops a wall of dark violet
 * cards reading as flat.
 *
 * Width comes from the parent — a rail sets a fixed track width, a grid lets
 * the column decide — so this component never fights its container.
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
      className="group bg-elevated border-line hover:border-accent/60 block h-full overflow-hidden rounded-2xl border transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgba(255,61,158,0.5)] focus-visible:outline-none"
    >
      <div
        className={`bg-raised relative overflow-hidden ${
          size === "lead" ? "aspect-[16/10]" : "aspect-[16/11]"
        }`}
      >
        <Image
          src={product.thumbnail}
          alt={`${product.title} preview`}
          fill
          sizes={
            size === "lead"
              ? "(max-width: 1024px) 100vw, 50vw"
              : "(max-width: 640px) 70vw, (max-width: 1024px) 40vw, 260px"
          }
          priority={priority}
          className={`object-cover transition-all duration-[900ms] ease-[var(--ease-glide)] group-hover:scale-[1.05] ${
            alt ? "group-hover:opacity-0" : ""
          }`}
        />
        {alt && (
          <Image
            src={alt}
            alt=""
            aria-hidden="true"
            fill
            sizes="(max-width: 640px) 70vw, (max-width: 1024px) 40vw, 260px"
            className="scale-[1.05] object-cover opacity-0 transition-opacity duration-[900ms] ease-[var(--ease-glide)] group-hover:opacity-100"
          />
        )}

        {product.isNew && (
          <span className="grad-fill absolute top-2.5 left-2.5 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide text-white uppercase">
            New
          </span>
        )}
      </div>

      <div className={size === "lead" ? "p-5" : "p-3.5"}>
        <h3
          className={`group-hover:text-accent truncate font-bold text-white transition-colors ${
            size === "lead" ? "text-[1.0625rem]" : "text-[13.5px]"
          }`}
        >
          {product.title}
        </h3>

        <div className="mt-1 flex items-baseline justify-between gap-3">
          <span className="text-muted truncate text-[11.5px]">
            by {creator?.name ?? product.creatorSlug}
          </span>
          <span
            className={`text-accent shrink-0 font-bold ${
              size === "lead" ? "text-[15px]" : "text-[13px]"
            }`}
          >
            {free ? "FREE" : formatPrice(product.price)}
          </span>
        </div>

        {size === "lead" && (
          <p className="text-dim mt-2.5 line-clamp-2 text-[14px] leading-relaxed">
            {product.valueProp}
          </p>
        )}
      </div>
    </Link>
  );
}
