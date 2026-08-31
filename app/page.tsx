import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import {
  categories,
  featuredProducts,
  formatPrice,
  getProduct,
} from "@/lib/products";
import { site } from "@/lib/site";

export default function HomePage() {
  const vault = getProduct("sketchsets-vault");
  const picks = featuredProducts().filter((p) => p.slug !== "sketchsets-vault");

  return (
    <>
      {/* Hero — type carries this, not decoration. */}
      <section className="mx-auto max-w-[1400px] px-6 pt-16 pb-14 sm:px-10 sm:pt-24 sm:pb-20">
        <p className="text-text-faint text-[11px] font-semibold tracking-[0.18em] uppercase">
          by {site.parent}
        </p>
        <h1 className="font-display mt-5 max-w-[16ch] text-[clamp(2.75rem,8.5vw,7rem)] leading-[0.92] font-extrabold">
          Creator resources that don&rsquo;t suck.
        </h1>
        <div className="mt-8 flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
          <p className="text-text-dim max-w-md text-[17px] leading-relaxed">
            Overlays, textures, brushes and templates for editors, thumbnail
            designers and anyone who ships constantly. Small catalogue, no
            filler.
          </p>
          <div className="flex shrink-0 items-center gap-6">
            <Link
              href="/browse"
              className="text-ink rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold transition-opacity hover:opacity-85"
            >
              Browse everything
            </Link>
            {vault && (
              <Link
                href={`/products/${vault.slug}`}
                className="text-text-dim hover:text-text group text-[15px] font-medium transition-colors"
              >
                The Vault{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Featured — full-bleed artwork does the talking. */}
      {vault && (
        <section className="px-6 sm:px-10">
          <Link
            href={`/products/${vault.slug}`}
            className="group relative block overflow-hidden rounded-2xl"
          >
            <div className="bg-ink-raised relative aspect-[4/3] sm:aspect-[2/1]">
              <Image
                src={vault.thumbnail}
                alt={`${vault.title} preview`}
                fill
                sizes="100vw"
                priority
                className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
              />
              {/* Two-axis scrim, only where the caption actually overlays the art. */}
              <div
                className="absolute inset-0 hidden bg-[linear-gradient(to_top,rgba(0,0,0,0.95)_0%,rgba(0,0,0,0.7)_28%,rgba(0,0,0,0.15)_58%,transparent_85%)] sm:block"
                aria-hidden="true"
              />
              <div
                className="absolute inset-0 hidden bg-[linear-gradient(to_right,rgba(0,0,0,0.7)_0%,transparent_45%)] sm:block"
                aria-hidden="true"
              />
            </div>
            {/* Stacked under the art on phones, overlaid from sm up. */}
            <div className="flex flex-col gap-4 pt-5 sm:absolute sm:inset-x-0 sm:bottom-0 sm:flex-row sm:items-end sm:justify-between sm:p-10 sm:pt-0">
              <div>
                <p className="text-accent text-[11px] font-bold tracking-[0.18em] uppercase">
                  The big one
                </p>
                <h2 className="font-display mt-2 text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[1] font-extrabold">
                  {vault.title}
                </h2>
                <p className="text-text-dim mt-2 max-w-md text-[15px]">
                  {vault.shortDescription}
                </p>
              </div>
              <span className="font-display shrink-0 text-[clamp(1.75rem,4vw,2.75rem)] leading-none font-extrabold">
                {formatPrice(vault.price)}
              </span>
            </div>
          </Link>
        </section>
      )}

      {/* Picks */}
      <section className="mx-auto max-w-[1400px] px-6 pt-24 sm:px-10">
        <div className="flex items-end justify-between gap-6">
          <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] leading-[1] font-extrabold">
            Frostify picks
          </h2>
          <Link
            href="/browse"
            className="text-text-dim hover:text-text shrink-0 pb-1 text-[15px] transition-colors"
          >
            All products →
          </Link>
        </div>
        <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {picks.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Categories as an editorial list, not boxes. */}
      <section className="mx-auto max-w-[1400px] px-6 pt-24 sm:px-10">
        <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] leading-[1] font-extrabold">
          Shop by what you make
        </h2>
        <ul className="mt-8">
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href={`/${category.id}`}
                className="group border-line hover:border-line-strong flex items-center justify-between gap-6 border-t py-7 transition-colors last:border-b"
              >
                <div className="flex items-baseline gap-5 sm:gap-8">
                  <span className="font-display text-[clamp(1.5rem,4vw,2.5rem)] leading-none font-extrabold">
                    {category.name}
                  </span>
                  <span className="text-text-faint hidden text-[15px] sm:block">
                    {category.blurb}
                  </span>
                </div>
                <span className="text-text-faint group-hover:text-text shrink-0 text-2xl transition-all group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Community */}
      <section className="mx-auto max-w-[1400px] px-6 pt-24 sm:px-10">
        <div className="max-w-2xl">
          <h2 className="font-display text-[clamp(1.75rem,4.5vw,3.5rem)] leading-[1.02] font-extrabold">
            Made by creators. Used by creators.
          </h2>
          <p className="text-text-dim mt-5 text-[17px] leading-relaxed">
            SketchSets comes out of Frostoria — the {site.parent} community of
            editors, thumbnail designers and creators trading work, feedback and
            jobs.
          </p>
          <a
            href={site.links.frostoria}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text hover:text-text-dim mt-6 inline-block border-b border-white/30 pb-1 text-[15px] font-medium transition-colors"
          >
            Visit Frostoria
          </a>
        </div>
      </section>
    </>
  );
}
