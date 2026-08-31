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
    <div className="shell stack-bottom">
      <PageHeader
        marker="The whole shop"
        title="Everything we"
        titleAccent="stock."
        note="The full catalogue in one place. Small on purpose — every pack here earned its slot."
        index={[
          { term: "Packs", value: String(products.length) },
          { term: "Free", value: String(free.length) },
          { term: "From", value: formatPrice(lowest), accent: true },
        ]}
      />

      <div className="panel">
        <ShopBrowser products={products} />
      </div>
    </div>
  );
}
