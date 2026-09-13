import Image from "next/image";
import Link from "next/link";
import { Badge, badgeFor } from "@/components/Badge";
import { formatPrice, type Product } from "@/lib/products";

export type CardSize = "lead" | "standard";

/**
 * Product card.
 *
 * A white panel holding the artwork, a catalogue number, the title, what kind
 * of thing it is and the price. Four lines of information, and each one had
 * to argue for its place.
 *
 * The panel is here because the ground is light — see the note on it below.
 * An earlier version of this comment argued the opposite, and was right at
 * the time: on near-black, bare artwork with no border was correct.
 *
 * WHAT IS DELIBERATELY ABSENT. The creator name, which read "Frostify" on
 * every card in the shop and was a column of identical text pretending to be
 * information. Rating stars, because there are no reviews. Strikethrough
 * prices, because nothing is on sale. File size and format list, which are
 * product-page facts.
 *
 * WHAT EARNED ITS PLACE. The asset count — 110 and 194 are the numbers that
 * make a $12 pack look like a library, and they were buried on the product
 * page. And the set number, which lib/products.ts has carried from the start
 * while nothing rendered it.
 *
 * Badges are capped at one, by construction rather than by discipline — see
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
      {/*
        THE PANEL CAME BACK WITH THE LIGHT GROUND, and it is not a
        reversal of the old note above so much as a consequence of it.
        Bare artwork worked on near-black: every cover, however pale, had
        a hard edge against the page. On #f7f7f7 the pale covers — the
        doodles, the patterns, the paper tears — have no edge at all and
        dissolve into the page.

        So products sit on a white card held by a shadow, which is the
        same treatment payhip/store.css already gives them on the Payhip
        store. One card system across both properties.

        The inner radius is derived rather than typed: concentric corners
        want inner = outer - padding, so the artwork's corner stays
        parallel to the card's however the two are retuned.
      */}
      <div className="card-panel p-1.5">
        <div
          className={`bg-elevated relative overflow-hidden rounded-[4px] ${
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

        {/*
          THE NUMBER GOES ON THE ARTWORK, the way a plate number sits on a
          print rather than in the caption underneath it. Under the title it
          was a line of small grey text competing with the type label; on the
          media it is the first thing read on every tile, and a grid of
          stamped, numbered plates reads as a collection where a grid of
          titles reads as a list of files.
        */}
        <span className="plate absolute top-2.5 left-2.5">
          {product.setNumber}
        </span>

        {badge && (
          <span className="absolute top-2.5 right-2.5">
            <Badge kind={badge} />
          </span>
        )}
      </div>

        <div className="px-1.5 pt-3 pb-1">
        <div className="flex items-baseline justify-between gap-4">
          <h3
            className={`group-hover:text-accent font-display truncate font-bold text-text transition-colors ${
              size === "lead" ? "text-[1.375rem]" : "text-[16.5px]"
            }`}
          >
            {product.title}
          </h3>
          {/*
            Mono, because a price only means anything next to another price.
            Down a four-column grid proportional digits never line up, and
            two figures you cannot scan against each other are two figures
            the buyer has to read twice.
          */}
          <span
            className={`meta shrink-0 font-semibold ${
              free ? "text-accent" : "text-text"
            } ${size === "lead" ? "text-[1.0625rem]" : "text-[14.5px]"}`}
          >
            {formatPrice(product.price)}
          </span>
        </div>

        <p className="text-muted mt-1.5 truncate text-[12.5px]">
          {product.subcategory}
          {showCount && (
            <>
              {" "}
              &middot;{" "}
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
      </div>
    </Link>
  );
}
