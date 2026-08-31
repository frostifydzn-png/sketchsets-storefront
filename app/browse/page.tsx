import type { Metadata } from "next";
import { ProductBrowser } from "@/components/ProductBrowser";
import { allSoftware, products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Browse",
  description:
    "Every SketchSets pack — overlays, textures, brushes, doodles and bundles for editors, thumbnail designers and creators.",
  alternates: { canonical: "/browse" },
};

export default function BrowsePage() {
  return (
    <div className="shell pt-14 sm:pt-20">
      <header>
        <h1 className="font-display-tight text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95]">
          Everything
        </h1>
        <p className="text-dim mt-4 max-w-lg text-[16px] leading-relaxed">
          Ready to use, commercially licensed, delivered instantly. Curated
          rather than endless — every pack earns its place.
        </p>
      </header>

      <ProductBrowser products={products} software={allSoftware()} />
    </div>
  );
}
