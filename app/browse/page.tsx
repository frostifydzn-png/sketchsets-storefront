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
    <div className="shell page-bottom">
      <PageHeader
        marker="The whole shop"
        title="Everything we stock"
        note="The full catalogue in one place. Small on purpose — every pack here earned its slot."
        facts={[
          `${products.length} packs`,
          `${free.length} free`,
          `from ${formatPrice(lowest)}`,
        ]}
      />

      <div className="section-gap-sm">
        <ShopBrowser products={products} />
      </div>
    </div>
  );
}
