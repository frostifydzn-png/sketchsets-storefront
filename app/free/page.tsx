import type { Metadata } from "next";
import Link from "next/link";
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
    <div className="shell pt-14 sm:pt-20">
      <header>
        <h1 className="font-display-tight text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95]">
          Free packs
        </h1>
        <p className="text-dim mt-4 max-w-xl text-[16px] leading-relaxed">
          Real packs with the same commercial licence as everything else. No
          email gate, no trial limits. Take them and see whether the quality
          holds up before you spend anything.
        </p>
      </header>

      {free.length > 0 ? (
        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-9 lg:grid-cols-4">
          {free.map((product, i) => (
            <Reveal key={product.id} delay={Math.min(i, 7) * 60}>
              <ProductCard product={product} priority={i < 4} />
            </Reveal>
          ))}
        </div>
      ) : (
        <p className="text-muted mt-14 text-[16px]">
          No free packs right now.{" "}
          <Link href="/browse" className="text-accent hover:underline">
            Browse everything
          </Link>{" "}
          instead.
        </p>
      )}
    </div>
  );
}
