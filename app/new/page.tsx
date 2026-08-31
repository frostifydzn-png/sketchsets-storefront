import type { Metadata } from "next";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { newDrops, products } from "@/lib/products";

export const metadata: Metadata = {
  title: "New drops",
  description:
    "The most recent additions to SketchSets. Freshly released packs for editors, thumbnail designers and creators.",
  alternates: { canonical: "/new" },
};

export default function NewPage() {
  const drops = newDrops();
  const dropSlugs = new Set(drops.map((p) => p.slug));
  const rest = products.filter((p) => !dropSlugs.has(p.slug));

  return (
    <div className="shell pt-16 sm:pt-24">
      <header>
        <h1 className="font-display-tight text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95]">
          New drops
        </h1>
        <p className="text-dim mt-4 max-w-xl text-[16px] leading-relaxed">
          The most recent additions to the catalogue. New stuff worth stealing
          for your workflow.
        </p>
      </header>

      {drops.length > 0 && (
        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-9 lg:grid-cols-4">
          {drops.map((product, i) => (
            <Reveal key={product.id} delay={Math.min(i, 7) * 60}>
              <ProductCard product={product} priority={i < 4} />
            </Reveal>
          ))}
        </div>
      )}

      {/*
        The rest of the shop follows, so a page in the primary nav never looks
        half-finished while releases are still infrequent. Labelled plainly, so
        nothing older is passed off as new.
      */}
      {rest.length > 0 && (
        <section className="section-gap">
          <h2 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] leading-none">
            Everything else
          </h2>
          <p className="text-dim mt-3 text-[15px]">
            The rest of the catalogue, still worth your time.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-9 lg:grid-cols-4">
            {rest.map((product, i) => (
              <Reveal key={product.id} delay={Math.min(i, 7) * 55}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
