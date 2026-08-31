import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { categories, products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop all",
  description:
    "Every SketchSets pack — overlays, textures, brushes, doodles and bundles for editors, thumbnail designers and creators.",
  alternates: { canonical: "/browse" },
};

export default function BrowsePage() {
  return (
    <div className="mx-auto max-w-[1400px] px-6 pt-14 sm:px-10 sm:pt-20">
      <header className="max-w-3xl">
        <h1 className="font-display text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] font-extrabold">
          Everything
        </h1>
        <p className="text-text-dim mt-5 max-w-lg text-[17px] leading-relaxed">
          Ready to use, commercially licensed, delivered instantly. Curated
          rather than endless — every pack earns its place.
        </p>
      </header>

      <nav
        aria-label="Categories"
        className="border-line mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 border-b pb-5"
      >
        <span className="text-text text-[15px] font-medium">All</span>
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/${c.id}`}
            className="text-text-faint hover:text-text text-[15px] transition-colors"
          >
            {c.name}
          </Link>
        ))}
        <span className="text-text-faint ml-auto text-[13px]">
          {products.length} packs
        </span>
      </nav>

      <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} priority={i < 3} />
        ))}
      </div>
    </div>
  );
}
