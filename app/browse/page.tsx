import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ShopBrowser } from "@/components/ShopBrowser";
import { formatPrice, products } from "@/lib/products";

export const metadata: Metadata = {
  title: "The Shop",
  description:
    "Every SketchSets pack. Overlays, textures, brushes, doodles and bundles for editors, thumbnail designers and creators.",
  alternates: { canonical: "/browse" },
};

export default function BrowsePage() {
  const free = products.filter((p) => p.price === 0);
  const lowest = Math.min(
    ...products.filter((p) => p.price > 0).map((p) => p.price),
  );

  return (
    <>
      <PageHeader
        marker="The whole floor"
        title="Everything we stock"
        note="The full catalogue in one place. Small on purpose — every pack here earned its slot."
        index={[
          { term: "PACKS", value: String(products.length).padStart(3, "0") },
          { term: "FREE", value: String(free.length).padStart(3, "0") },
          { term: "FROM", value: formatPrice(lowest), accent: true },
        ]}
      />

      <div className="shell pt-10 pb-4">
        <ShopBrowser products={products} />
      </div>
    </>
  );
}
