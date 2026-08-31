import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Product } from "@/lib/products";

/**
 * Continuously scrolling artwork rail. The track holds the list twice so the
 * -50% keyframe loops seamlessly. Pauses on hover and on keyboard focus.
 */
export function ArtworkMarquee({ products }: { products: Product[] }) {
  const track = [...products, ...products];

  return (
    <div
      className="marquee relative overflow-hidden py-1"
      aria-label="Product artwork"
    >
      <div className="marquee-track gap-4">
        {track.map((product, i) => (
          <Link
            key={`${product.id}-${i}`}
            href={`/products/${product.slug}`}
            // The second copy is decorative; keep it out of the a11y tree.
            aria-hidden={i >= products.length}
            tabIndex={i >= products.length ? -1 : undefined}
            className="group relative block w-[260px] shrink-0 sm:w-[340px]"
          >
            <div className="bg-surface ring-line group-hover:ring-accent relative aspect-[4/3] overflow-hidden rounded-xl ring-1 transition-all duration-300">
              <Image
                src={product.thumbnail}
                alt={i < products.length ? `${product.title} preview` : ""}
                fill
                sizes="340px"
                className="object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-105"
              />
              <span className="bg-ink/85 group-hover:bg-accent group-hover:text-ink absolute right-2.5 bottom-2.5 rounded-full px-2.5 py-1 text-[13px] font-bold backdrop-blur-md transition-colors">
                {formatPrice(product.price)}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Fade the rail into the page edges. */}
      <div
        aria-hidden="true"
        className="from-ink pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r to-transparent sm:w-32"
      />
      <div
        aria-hidden="true"
        className="from-ink pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l to-transparent sm:w-32"
      />
    </div>
  );
}
