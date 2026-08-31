import type { Metadata } from "next";
import { LabelPanel } from "@/components/LabelPanel";
import { PageHeader } from "@/components/PageHeader";
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
  const [lead, ...others] = drops;

  return (
    <div className="shell stack-bottom">
      <PageHeader
        marker="Just landed"
        title="The newest things"
        titleAccent="in the shop."
        note="The most recent additions to the catalogue, newest first."
        index={[
          { term: "New", value: String(drops.length), accent: true },
          { term: "Catalogue", value: String(products.length) },
        ]}
      />

      <div className="stack">
        {lead && (
          <section className="panel">
            <div className="grid gap-5 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
              <ProductCard product={lead} priority size="lead" />
              <div className="grid gap-4 sm:grid-cols-2 lg:content-start">
                {others.map((product, i) => (
                  <ProductCard key={product.id} product={product} priority={i < 2} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/*
          The rest of the shop follows, so a page in the primary nav never looks
          half-finished while releases are still infrequent. Labelled plainly,
          so nothing older is passed off as new.
        */}
        {rest.length > 0 && (
          <LabelPanel
            title="Also in stock"
            description="The rest of the catalogue, still worth your time."
            action={{ href: "/browse", label: "Browse everything" }}
          >
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {rest.map((product, i) => (
                <Reveal key={product.id} delay={Math.min(i, 7) * 55}>
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </div>
          </LabelPanel>
        )}
      </div>
    </div>
  );
}
