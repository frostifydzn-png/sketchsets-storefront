import Image from "next/image";
import Link from "next/link";
import { getCreator } from "@/lib/creators";
import type { Product } from "@/lib/products";

/**
 * The hero's product fan.
 *
 * Four real pack covers set as tall cards, rotated and overlapped so the shop's
 * actual artwork is the first thing on the page rather than an illustration of
 * a shop. The second card is raised and scaled up to give the group a clear
 * centre; without that the fan reads as a row that happens to be crooked.
 *
 * Percentage positions keep the arrangement identical at every width, and the
 * whole thing is hidden below `lg`, where there is no room for it and the copy
 * should own the screen.
 */

/* left / top / width as percentages of the frame, plus rotation and depth. */
const LAYOUT = [
  { left: 1, top: 15, width: 25, rotate: -9, z: "z-10", scale: 0.96 },
  { left: 21, top: 2, width: 28, rotate: -3, z: "z-30", scale: 1 },
  { left: 46, top: 10, width: 25, rotate: 4, z: "z-20", scale: 0.97 },
  { left: 68, top: 17, width: 24, rotate: 8, z: "z-10", scale: 0.94 },
];

export function HeroStack({ products }: { products: Product[] }) {
  const fan = products.slice(0, LAYOUT.length);
  if (fan.length === 0) return null;

  return (
    <div className="relative hidden aspect-[16/11] w-full lg:block">
      {/* Two blooms rather than one, so the fan sits in coloured light. */}
      <div
        aria-hidden="true"
        className="glow-pink pointer-events-none absolute top-[8%] left-[14%] h-[70%] w-[55%]"
      />
      <div
        aria-hidden="true"
        className="glow-violet pointer-events-none absolute top-[20%] left-[42%] h-[65%] w-[52%]"
      />

      {fan.map((product, i) => {
        const pos = LAYOUT[i];
        return (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            title={product.title}
            className={`group border-line-bright bg-elevated absolute overflow-hidden rounded-2xl border shadow-[0_28px_60px_-24px_rgba(0,0,0,0.9)] transition-transform duration-[700ms] ease-[var(--ease-glide)] hover:z-40 hover:-translate-y-2 ${pos.z}`}
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              width: `${pos.width}%`,
              aspectRatio: "3 / 5",
              transform: `rotate(${pos.rotate}deg) scale(${pos.scale})`,
            }}
          >
            <Image
              src={product.thumbnail}
              alt={`${product.title} cover`}
              fill
              sizes="20vw"
              priority={i < 2}
              className="object-cover transition-transform duration-[900ms] ease-[var(--ease-glide)] group-hover:scale-[1.06]"
            />
            <span className="sr-only">
              {product.title} by{" "}
              {getCreator(product.creatorSlug)?.name ?? product.creatorSlug}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
