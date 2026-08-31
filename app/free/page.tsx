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
    <>
      <PageHeader
        marker="No charge"
        title="Take these for nothing"
        note="Real packs with the same commercial licence as everything else. No email gate, no trial limits. Take them and see whether the quality holds up before you spend anything."
        index={[
          { term: "PACKS", value: String(free.length).padStart(2, "0") },
          { term: "PRICE", value: "FREE", accent: true },
          { term: "LICENCE", value: "COMMERCIAL" },
        ]}
      />

      <div className="shell pt-12">
        {free.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
            {free.map((product, i) => (
              <Reveal key={product.id} delay={Math.min(i, 7) * 60}>
                <ProductCard
                  product={product}
                  priority={i < 4}
                  size="compact"
                />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="text-muted text-[16px]">
            No free packs right now.{" "}
            <Link href="/browse" className="text-accent hover:underline">
              See everything
            </Link>{" "}
            instead.
          </p>
        )}
      </div>
    </>
  );
}
