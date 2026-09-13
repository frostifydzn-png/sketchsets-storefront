import Image from "next/image";
import Link from "next/link";
import { Badge, badgeFor } from "@/components/Badge";
import { IconArrow } from "@/components/Icons";
import { getCreator } from "@/lib/creators";
import { formatPrice, type Product } from "@/lib/products";

export type CardSize = "lead" | "standard";

/**
 * Product card. One component, used everywhere.
 *
 * THE ARTWORK IS THE CARD. There is no panel around the whole thing — the
 * surface fill and the hairline live on the media alone, and the caption sits
 * directly on the page beneath it. On a near-black ground the covers have a
 * hard edge of their own and need nothing to hold them, so wrapping each one
 * in a bordered tile would only put a box between the buyer and the thing
 * they came to look at. A grid of these reads as a contact sheet.
 *
 * Four pieces of information, in the order a buyer uses them: the name, who
 * made it, what kind of thing it is and how many assets are in it, and the
 * price. Nothing is printed over the cover — the artwork is the pitch, and
 * labelling it competes with it.
 *
 * DELIBERATELY ABSENT: rating stars, because four products carry a rating and
 * six do not, and a grid where most cards have a hole under the title looks
 * broken rather than honest. Strikethrough prices, because nothing is on
 * sale. File sizes and format lists, which are product-page facts.
 *
 * Badges are capped at one by construction rather than by discipline — see
 * components/Badge.tsx.
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
  const alt = product.previewImages[1];
  const free = product.price === 0;
  const badge = badgeFor(product);
  const creator = getCreator(product.creatorSlug);

  /*
   * Below about eight the count argues against the product — "8 assets" reads
   * as thin next to "110 assets", even though eight 4K paper tears is a fair
   * pack. Above it, the number is doing the selling.
   */
  const showCount = (product.assetCount ?? 0) > 8;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block focus-visible:outline-none"
    >
      <div
        className={`card-media ${size === "lead" ? "aspect-[16/10]" : "aspect-[16/11]"}`}
      >
        <Image
          src={product.thumbnail}
          alt={`${product.title} preview`}
          fill
          sizes={
            size === "lead"
              ? "(max-width: 1024px) 100vw, 55vw"
              : "(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
          }
          priority={priority}
          className={`object-cover transition-transform duration-[650ms] ease-[var(--ease-glide)] group-hover:scale-[1.05] ${
            alt ? "group-hover:opacity-0" : ""
          }`}
        />
        {alt && (
          <Image
            src={alt}
            alt=""
            aria-hidden="true"
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="scale-[1.05] object-cover opacity-0 transition-opacity duration-[650ms] ease-[var(--ease-glide)] group-hover:opacity-100"
          />
        )}

        {/*
          NOTHING IS STAMPED ON THE COVER ANY MORE. A mono chip in the corner
          of every card was the most technical object on the page, and it sat
          on the one thing that actually sells the product. The set number
          moved to the caption, where it is a detail for whoever wants it
          rather than a label on the picture.
        */}
        {badge && (
          <span className="absolute top-3 right-3 z-10">
            <Badge kind={badge} />
          </span>
        )}

        {/*
          The hover affordance. A scrim rather than a floating button: a
          button implies a second destination, and there is only one — the
          whole card is the link. It stays out of the way until the cursor
          arrives, and it is hidden from assistive tech because the link
          already says where it goes.
        */}
        <span
          aria-hidden="true"
          className="from-ink/85 pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t to-transparent px-3 pt-10 pb-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          <span className="set-no text-text">View pack</span>
          <IconArrow className="text-text h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </span>
      </div>

      <div className="mt-3">
        <div className="flex items-baseline justify-between gap-3">
          <h3
            className={`group-hover:text-accent font-display truncate font-bold transition-colors ${
              size === "lead" ? "text-[1.375rem]" : "text-[16px]"
            }`}
          >
            {product.title}
          </h3>
          {/*
            Tabular figures, because a price only means anything next to
            another price: down a four-column grid proportional digits never
            line up, and two figures you cannot scan against each other get
            read twice. That is what .meta does now — it used to reach for a
            whole monospace family to get the same alignment, which brought
            the terminal voice along for no extra benefit.
          */}
          <span
            className={`meta shrink-0 font-semibold ${
              free ? "text-accent" : "text-text"
            } ${size === "lead" ? "text-[1.0625rem]" : "text-[14.5px]"}`}
          >
            {formatPrice(product.price)}
          </span>
        </div>

        <p className="text-muted mt-1 truncate text-[12.5px]">
          {creator && <span>by {creator.name}</span>}
          {creator && " · "}
          {product.subcategory}
          {showCount && (
            <>
              {" · "}
              <span className="meta">{product.assetCount}</span> assets
            </>
          )}
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
