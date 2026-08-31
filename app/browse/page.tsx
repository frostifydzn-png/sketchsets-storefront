import type { Metadata } from "next";
import { ShopBrowser } from "@/components/ShopBrowser";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "The Shop",
  description:
    "Every SketchSets pack. Overlays, textures, brushes, doodles and bundles for editors, thumbnail designers and creators.",
  alternates: { canonical: "/browse" },
};

export default function BrowsePage() {
  return (
    <>
      <section className="relative py-14 text-center sm:py-20">
        <div
          aria-hidden="true"
          className="hero-glow pointer-events-none absolute inset-0 z-0"
        />
        <div className="shell relative z-10">
          <h1 className="font-display-tight text-[clamp(2.25rem,6vw,4.5rem)] leading-[0.95] uppercase">
            The Shop
          </h1>
          <p className="text-dim mt-3 text-[17px]">Discover our products</p>
        </div>
      </section>

      <div className="shell pb-4">
        <ShopBrowser products={products} />
      </div>
    </>
  );
}
