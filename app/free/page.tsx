import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Free packs",
  description:
    "Free SketchSets packs. Real assets with a commercial licence, no email gate and no trial limits.",
  alternates: { canonical: "/free" },
};

export default function FreePage() {
  const free = products.filter((p) => p.price === 0);

  return (
    <div className="shell page-bottom">
      <PageHeader
        marker="No charge"
        title="Real packs, not trials"
        note="Free downloads carrying the same commercial licence as everything else. No email gate, no watermarks, no expiry. Take them and see whether the quality holds up before you spend anything."
        facts={[
          `${free.length} packs`,
          "no charge",
          "commercial licence included",
        ]}
      />

      <div className="section-gap-sm">
        {free.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-7 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
            {free.map((product, i) => (
              <Reveal key={product.id} delay={Math.min(i, 7) * 60}>
                <ProductCard product={product} priority={i < 4} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="text-dim text-[15px]">
            No free packs right now.{" "}
            <Link href="/browse" className="text-accent hover:underline">
              Browse everything
            </Link>{" "}
            instead.
          </p>
        )}
      </div>
    </div>
  );
}
