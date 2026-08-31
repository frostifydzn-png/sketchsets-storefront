import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import {
  categories,
  featuredProducts,
  formatPrice,
  getProduct,
  products,
} from "@/lib/products";
import { site } from "@/lib/site";

export default function HomePage() {
  const hero = getProduct("sketchsets-vault");
  const picks = featuredProducts();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="grid-veil pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pt-16 pb-20 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:pt-24">
          <div>
            <div className="border-line text-text-dim inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium">
              <span className="bg-accent h-1.5 w-1.5 rounded-full" />
              by {site.parent}
            </div>

            <h1 className="mt-5 text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Creator resources
              <br />
              that don&rsquo;t suck.
            </h1>

            <p className="text-text-dim mt-5 max-w-lg text-base leading-relaxed sm:text-lg">
              A curated store of overlays, textures, brushes and templates for
              video editors, thumbnail designers and the people who actually
              ship. No bloat, no filler.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/browse"
                className="bg-accent hover:bg-accent-deep rounded-lg px-5 py-3 text-sm font-semibold text-white transition-colors"
              >
                Browse products
              </Link>
              {hero && (
                <Link
                  href={`/products/${hero.slug}`}
                  className="border-line hover:border-line-strong text-text rounded-lg border px-5 py-3 text-sm font-semibold transition-colors"
                >
                  The Vault — {formatPrice(hero.price)}
                </Link>
              )}
            </div>

            <dl className="border-line mt-10 flex gap-8 border-t pt-6">
              <Stat label="Curated packs" value={String(products.length)} />
              <Stat label="Commercial license" value="Included" />
              <Stat label="Delivery" value="Instant" />
            </dl>
          </div>

          {hero && (
            <Link
              href={`/products/${hero.slug}`}
              className="group border-line hover:border-line-strong bg-ink-raised relative block overflow-hidden rounded-2xl border"
            >
              <div className="bg-ink-high relative aspect-[4/3]">
                <Image
                  src={hero.thumbnail}
                  alt={`${hero.title} preview`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex items-center justify-between gap-4 p-5">
                <div>
                  <p className="text-accent-bright text-[11px] font-semibold tracking-wider uppercase">
                    Featured
                  </p>
                  <h2 className="mt-1 font-semibold tracking-tight">
                    {hero.title}
                  </h2>
                  <p className="text-text-faint mt-0.5 text-[13px]">
                    {hero.shortDescription}
                  </p>
                </div>
                <span className="text-lg font-semibold">
                  {formatPrice(hero.price)}
                </span>
              </div>
            </Link>
          )}
        </div>
      </section>

      {/* Frostify Picks */}
      <Section
        eyebrow="Frostify Picks"
        title="Hand-selected, not algorithm-selected"
        action={{ href: "/browse", label: "View all" }}
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {picks.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Section>

      {/* Categories */}
      <Section eyebrow="Categories" title="Find it by what you make">
        <div className="grid gap-5 sm:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/${category.id}`}
              className="group border-line hover:border-line-strong bg-ink-raised rounded-xl border p-6 transition-colors"
            >
              <h3 className="text-lg font-semibold tracking-tight">
                {category.name}
              </h3>
              <p className="text-text-dim mt-2 text-sm leading-relaxed">
                {category.blurb}
              </p>
              <span className="text-accent-bright mt-4 inline-block text-sm font-medium">
                Browse{" "}
                <span className="inline-block transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* Community */}
      <section className="mx-auto max-w-6xl px-5 pt-20 sm:px-8">
        <div className="border-line bg-ink-raised rounded-2xl border p-8 sm:p-12">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-lg">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Made by creators. Used by creators.
              </h2>
              <p className="text-text-dim mt-3 text-sm leading-relaxed sm:text-base">
                SketchSets comes out of Frostoria — the Frostify community of
                editors, thumbnail designers and creators sharing work, feedback
                and jobs.
              </p>
            </div>
            <a
              href={site.links.frostoria}
              target="_blank"
              rel="noopener noreferrer"
              className="border-line hover:border-line-strong shrink-0 rounded-lg border px-5 py-3 text-sm font-semibold transition-colors"
            >
              Visit Frostoria ↗
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-text-faint text-xs">{label}</dt>
      <dd className="mt-1 text-sm font-semibold">{value}</dd>
    </div>
  );
}

function Section({
  eyebrow,
  title,
  action,
  children,
}: {
  eyebrow: string;
  title: string;
  action?: { href: string; label: string };
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-6xl px-5 pt-20 sm:px-8">
      <div className="mb-7 flex items-end justify-between gap-4">
        <div>
          <p className="text-accent-bright text-[11px] font-semibold tracking-wider uppercase">
            {eyebrow}
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            {title}
          </h2>
        </div>
        {action && (
          <Link
            href={action.href}
            className="text-text-dim hover:text-text shrink-0 text-sm font-medium transition-colors"
          >
            {action.label} →
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}
