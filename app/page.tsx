import Image from "next/image";
import Link from "next/link";
import { ArtworkMarquee } from "@/components/ArtworkMarquee";
import { CategoryCard } from "@/components/CategoryCard";
import { HeroSearch } from "@/components/HeroSearch";
import { Newsletter } from "@/components/Newsletter";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { TextTicker } from "@/components/TextTicker";
import { getCreator, monogram } from "@/lib/creators";
import {
  byCreator,
  categories,
  formatPrice,
  frostifyPicks,
  getProduct,
  products,
  under,
} from "@/lib/products";
import { site } from "@/lib/site";

const assurances = [
  {
    title: "Instant download",
    body: "Files land the moment you pay. Nothing to wait for.",
  },
  {
    title: "Commercial licence",
    body: "Use everything in client work and monetised content.",
  },
  {
    title: "No account needed",
    body: "Checkout runs through Payhip. Buy it and go.",
  },
];

export default function HomePage() {
  const picks = frostifyPicks();
  const vault = getProduct("sketchsets-vault");
  const cheap = under(10);
  const frostify = getCreator("frostify");
  const frostifyPacks = frostify ? byCreator(frostify.slug).slice(0, 4) : [];
  const lowest = Math.min(
    ...products.filter((p) => p.price > 0).map((p) => p.price),
  );

  return (
    <>
      {/* Hero. Poster type up top, search immediately under it. */}
      <section className="hero-glow shell pt-14 pb-14 text-center sm:pt-20 sm:pb-16">
        {/* Lines are held together from sm up so the three-line break is exact. */}
        <h1 className="font-display-tight line-rise text-[clamp(2.5rem,7.4vw,6.25rem)] leading-[0.9] uppercase">
          <span className="sm:whitespace-nowrap">Resources for</span>
          <span className="sm:whitespace-nowrap">people who make</span>
          <span className="sm:whitespace-nowrap">the internet</span>
        </h1>
        <p className="text-dim mx-auto mt-6 max-w-xl text-[17px] leading-relaxed">
          Presets, assets, templates and creative tools curated for editors,
          thumbnail designers and creators.{" "}
          <span className="text-text font-semibold">
            {products.length} packs from {formatPrice(lowest)}.
          </span>
        </p>
        <div className="mt-9 flex justify-center">
          <HeroSearch />
        </div>
      </section>

      <ArtworkMarquee products={products} />

      <TextTicker text="Instant download. Commercial licence included." />

      <section className="shell section-gap">
        <Reveal className="grid gap-10 sm:grid-cols-3 sm:gap-14">
          {assurances.map((item) => (
            <div key={item.title}>
              <h2 className="text-[17px] font-semibold">{item.title}</h2>
              <p className="text-muted mt-2.5 text-[15px] leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Curated */}
      <section className="shell section-gap">
        <SectionHeader
          eyebrow="From the shop"
          title="Frostify Picks"
          note="The packs Frostify actually reaches for."
          action={{ href: "/browse", label: "All packs" }}
        />
        <div className="grid grid-cols-2 gap-x-5 gap-y-9 lg:grid-cols-4">
          {picks.map((product, i) => (
            <Reveal key={product.id} delay={i * 70}>
              <ProductCard product={product} priority={i < 4} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="shell section-gap">
        <SectionHeader
          eyebrow="Categories"
          title="Shop by what you make"
          note="Whether you are cutting video, building thumbnails, or kitting out a workflow."
        />
        <div className="grid gap-5 sm:grid-cols-3">
          {categories.map((category, i) => (
            <Reveal key={category.id} delay={i * 70}>
              <CategoryCard category={category} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Bundle */}
      {vault && vault.bundleValue && (
        <section className="shell section-gap">
          <SectionHeader
            eyebrow="Bundle"
            title="Buy the lot, pay less"
            note="The whole Collection V1 library in a single download."
          />
          <Reveal>
            <Link
              href={`/products/${vault.slug}`}
              className="group ring-line hover:ring-line-bright bg-surface relative block overflow-hidden rounded-2xl ring-1 transition-all"
            >
              <div className="grid lg:grid-cols-2">
                <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[420px]">
                  <Image
                    src={vault.thumbnail}
                    alt={`${vault.title} preview`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[900ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-col justify-center p-7 sm:p-12">
                  <h3 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1]">
                    {vault.title}
                  </h3>
                  <p className="text-dim mt-4 text-[16px] leading-relaxed">
                    {vault.shortDescription}
                  </p>

                  <ul className="mt-6 grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
                    {vault.includedFiles.slice(0, 6).map((f) => (
                      <li key={f} className="text-muted flex gap-2 text-[13px]">
                        <span className="text-accent" aria-hidden="true">
                          +
                        </span>
                        {f.split(": ")[0]}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-2">
                    <span className="font-display text-accent text-5xl">
                      {formatPrice(vault.price)}
                    </span>
                    <span className="text-muted text-[15px]">
                      <s>${vault.bundleValue.toFixed(2)}</s> separately
                    </span>
                    <span className="bg-accent/15 text-accent rounded-full px-3 py-1 text-[13px] font-bold">
                      Save ${(vault.bundleValue - vault.price).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </Reveal>
        </section>
      )}

      {/* Entry price */}
      {cheap.length > 0 && (
        <section className="shell section-gap">
          <SectionHeader
            eyebrow="From the shop"
            title="Under $10"
            note="A low-risk way to try the quality before committing to the bundle."
            action={{ href: "/browse", label: "See all" }}
          />
          <div className="grid grid-cols-2 gap-x-5 gap-y-9 lg:grid-cols-4">
            {cheap.map((product, i) => (
              <Reveal key={product.id} delay={i * 70}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Maker */}
      {frostify && (
        <section className="shell section-gap">
          <SectionHeader
            eyebrow="Who makes this"
            title="Meet the maker"
            action={{
              href: `/creators/${frostify.slug}`,
              label: `${byCreator(frostify.slug).length} packs`,
            }}
          />
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr] lg:gap-14">
              <div>
                <div className="flex items-center gap-4">
                  <span className="bg-elevated ring-line flex h-14 w-14 items-center justify-center rounded-full text-[17px] font-bold ring-1">
                    {monogram(frostify.name)}
                  </span>
                  <div>
                    <p className="font-display text-2xl">{frostify.name}</p>
                    <p className="text-muted text-[14px]">{frostify.role}</p>
                  </div>
                </div>
                <p className="text-dim mt-6 text-[16px] leading-relaxed">
                  {frostify.intro}
                </p>
                {frostify.links?.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent mt-5 inline-block text-[14px] font-semibold hover:underline"
                  >
                    {l.label} ↗
                  </a>
                ))}
              </div>

              <div className="grid grid-cols-4 gap-3">
                {frostifyPacks.map((p) => (
                  <Link
                    key={p.id}
                    href={`/products/${p.slug}`}
                    className="group/mini block"
                  >
                    <div className="bg-surface ring-line group-hover/mini:ring-line-bright relative aspect-square overflow-hidden rounded-xl ring-1 transition-all">
                      <Image
                        src={p.thumbnail}
                        alt={p.title}
                        fill
                        sizes="180px"
                        className="object-cover transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover/mini:scale-105"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* Community */}
      <section className="shell section-gap">
        <Reveal>
          <div className="ring-line relative overflow-hidden rounded-2xl ring-1">
            <div
              aria-hidden="true"
              className="from-accent/12 absolute inset-0 bg-gradient-to-br via-transparent to-transparent"
            />
            <div className="relative flex flex-col gap-7 p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <h2 className="font-display text-[clamp(1.875rem,3.6vw,2.75rem)] leading-[1.02]">
                  Make stuff with people who care.
                </h2>
                <p className="text-dim mt-4 text-[16px] leading-relaxed">
                  Frostoria is where the editors, thumbnail designers and
                  creators behind SketchSets trade work, feedback and jobs.
                </p>
              </div>
              <a
                href={site.links.frostoria}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent text-ink shrink-0 rounded-xl px-7 py-4 text-center text-[15px] font-bold transition-transform hover:scale-[1.02]"
              >
                Join Frostoria ↗
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      <Newsletter />
    </>
  );
}
