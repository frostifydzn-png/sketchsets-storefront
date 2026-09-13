import Image from "next/image";
import Link from "next/link";
import { IconArrow } from "@/components/Icons";
import {
  bundleContents,
  bundleTotal,
  formatPrice,
  type Product,
} from "@/lib/products";

/**
 * The editorial break between two product grids.
 *
 * A homepage that is nothing but grid becomes a wall about four rows in, and
 * the reader stops seeing individual products. This is the pause: one pack,
 * given the room a campaign gets, with its artwork doing the arguing.
 *
 * IT IS ARTWORK, NOT A CALLOUT CARD. The distinction is that the image bleeds
 * to the edge of the block and the copy sits over the page rather than both
 * being stacked inside a bordered box with a button at the bottom. A callout
 * card says "here is a message"; this says "here is a thing, look at it".
 *
 * Every figure is computed from the bundle's real members, so the saving can
 * never drift away from the catalogue.
 */
export function CollectionBanner({ product }: { product: Product }) {
  const contents = bundleContents(product);
  if (contents.length === 0) return null;

  const saving = bundleTotal(product) - product.price;

  return (
    <section className="shelf-gap">
      <div className="border-line bg-surface grid overflow-hidden rounded-xl border lg:grid-cols-[1.1fr_1fr]">
        {/*
          The artwork half runs the pack's own covers as a tight mosaic rather
          than one hero shot. Seven packs is the actual selling point, and a
          single cover cannot say "seven" no matter how large it is printed.
        */}
        <div className="bg-elevated relative grid grid-cols-3 gap-px p-px">
          {contents.slice(0, 6).map((item, i) => (
            <div
              key={item.id}
              className={`bg-ink relative ${i === 0 ? "col-span-2 row-span-2" : ""}`}
              style={{ aspectRatio: i === 0 ? "16 / 11" : "16 / 10" }}
            >
              <Image
                src={item.thumbnail}
                alt=""
                aria-hidden="true"
                fill
                sizes="(max-width: 1024px) 33vw, 20vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-center gap-4 p-7 sm:p-10">
          <p className="set-no text-accent">Collection</p>

          <h2 className="display-section text-text">{product.title}</h2>

          <p className="text-dim max-w-[46ch] text-[15.5px] leading-relaxed">
            {product.valueProp}
          </p>

          <p className="text-muted text-[13.5px]">
            <span className="meta text-text">{contents.length}</span> packs
            {product.assetCount && (
              <>
                {" · "}
                <span className="meta text-text">{product.assetCount}</span>{" "}
                assets
              </>
            )}
            {saving > 0 && (
              <>
                {" · save "}
                <span className="meta text-text">
                  {formatPrice(Number(saving.toFixed(2)))}
                </span>
              </>
            )}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-4">
            <Link
              href={`/products/${product.slug}`}
              className="btn-primary group/b px-6 py-3 text-[15px]"
            >
              Explore the collection
              <IconArrow className="h-4 w-4 transition-transform group-hover/b:translate-x-0.5" />
            </Link>
            <span className="meta text-text text-[1.125rem] font-bold">
              {formatPrice(product.price)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
