import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
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
  const [lead, ...others] = drops;

  return (
    <>
      <PageHeader
        marker="Just landed"
        title="New on the shelves"
        note="The most recent additions to the catalogue. New stuff worth stealing for your workflow."
        index={[
          { term: "NEW", value: String(drops.length).padStart(2, "0") },
          { term: "CATALOGUE", value: String(products.length).padStart(3, "0") },
        ]}
      />

      <div className="shell pt-12">
        {lead && (
          <div className="grid gap-x-8 gap-y-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <ProductCard product={lead} priority size="lead" />
            </Reveal>
            <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:col-span-5 lg:content-start">
              {others.map((product, i) => (
                <Reveal key={product.id} delay={(i + 1) * 80}>
                  <ProductCard product={product} priority={i < 2} />
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/*
          The rest of the shop follows, so a page in the primary nav never looks
          half-finished while releases are still infrequent. Labelled plainly,
          so nothing older is passed off as new.
        */}
        {rest.length > 0 && (
          <section className="section-gap">
            <SectionHeader
              marker="Also in stock"
              title="Everything else"
              note="The rest of the catalogue, still worth your time."
            />
            <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
              {rest.map((product, i) => (
                <Reveal key={product.id} delay={Math.min(i, 7) * 55}>
                  <ProductCard product={product} size="compact" />
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
