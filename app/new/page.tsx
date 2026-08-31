import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { newDrops } from "@/lib/products";

export const metadata: Metadata = {
  title: "New drops",
  description:
    "The most recent additions to SketchSets. Freshly released packs for editors, thumbnail designers and creators.",
  alternates: { canonical: "/new" },
};

export default function NewPage() {
  const drops = newDrops();

  return (
    <div className="shell pt-14 sm:pt-20">
      <header>
        <h1 className="font-display-tight text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95]">
          New drops
        </h1>
        <p className="text-dim mt-4 max-w-lg text-[16px] leading-relaxed">
          The latest additions to the catalogue. New stuff worth stealing for
          your workflow.
        </p>
      </header>

      {drops.length > 0 ? (
        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-9 lg:grid-cols-4">
          {drops.map((product, i) => (
            <ProductCard key={product.id} product={product} priority={i < 4} />
          ))}
        </div>
      ) : (
        <p className="text-muted mt-14 text-[16px]">
          Nothing new right now.{" "}
          <Link href="/browse" className="text-accent hover:underline">
            Browse everything
          </Link>{" "}
          instead.
        </p>
      )}
    </div>
  );
}
