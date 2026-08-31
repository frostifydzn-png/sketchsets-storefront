import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { categories, products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Browse",
  description:
    "Every SketchSets pack — overlays, textures, brushes, doodles and bundles for editors, thumbnail designers and creators.",
  alternates: { canonical: "/browse" },
};

export default function BrowsePage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pt-14 sm:px-8">
      <header className="max-w-2xl">
        <p className="text-accent-bright text-[11px] font-semibold tracking-wider uppercase">
          Shop
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Every pack, in one place
        </h1>
        <p className="text-text-dim mt-3 text-base leading-relaxed">
          Ready-to-use, commercially licensed, delivered instantly. Curated
          rather than endless — each pack earns its spot.
        </p>
      </header>

      <nav aria-label="Categories" className="mt-8 flex flex-wrap gap-2">
        <span className="bg-white/[0.08] text-text rounded-lg px-3.5 py-2 text-sm font-medium">
          All
        </span>
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/${c.id}`}
            className="text-text-dim hover:text-text rounded-lg px-3.5 py-2 text-sm font-medium transition-colors hover:bg-white/[0.04]"
          >
            {c.name}
          </Link>
        ))}
      </nav>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} priority={i < 3} />
        ))}
      </div>
    </div>
  );
}
