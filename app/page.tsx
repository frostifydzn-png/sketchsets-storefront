import Image from "next/image";
import Link from "next/link";
import { ArtworkMarquee } from "@/components/ArtworkMarquee";
import { CategoryCard } from "@/components/CategoryCard";
import { HeroSearch } from "@/components/HeroSearch";
import { Newsletter } from "@/components/Newsletter";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
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

const howItWorks = [
  {
    title: "Curated, not endless",
    body: "Every pack is made or vetted by Frostify before it goes up. The catalogue stays small on purpose, so browsing it is quick and nothing in here is filler.",
  },
  {
    title: "Yours to use commercially",
    body: "A commercial licence comes with every pack. Client work, sponsored videos, monetised channels: all covered, with no extra fee and no per-project limit.",
  },
  {
    title: "Buy it and go",
    body: "Checkout runs through Payhip, so there is no account to create and nothing to subscribe to. Pay once and the files download straight away.",
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
      {/*
        Hero sits above the artwork rail in the stacking order so the search
        dropdown can overlay it. z-10 on the content, glow behind at z-0.
      */}
      <section className="relative pt-14 pb-14 text-center sm:pt-20 sm:pb-16">
        <div
          aria-hidden="true"
          className="hero-glow pointer-events-none absolute inset-0 z-0"
        />
        <div className="shell relative z-10">
          {/* Lines held together from sm up so the three-line break is exact. */}
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
        </div>
      </section>

      <ArtworkMarquee products={products} />

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

      {/* Bundle, as a full-bleed poster rather than another card in a grid. */}
      {vault && vault.bundleValue && (
        <section className="section-gap">
          <Reveal>
            <div className="relative overflow-hidden">
              <div className="absolute inset-0">
                <Image
                  src={vault.thumbnail}
                  alt=""
                  fill
                  sizes="100vw"
                  className="scale-105 object-cover opacity-25 blur-[2px]"
                />
                <div
                  aria-hidden="true"
                  className="from-ink via-ink/85 to-ink absolute inset-0 bg-gradient-to-b"
                />
              </div>

              <div className="shell relative py-20 text-center sm:py-28">
                <p className="text-muted text-[12px] font-semibold uppercase">
                  The whole library
                </p>
                <h2 className="font-display-tight mt-4 text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.92] uppercase">
                  {vault.title}
                </h2>
                <p className="text-dim mx-auto mt-5 max-w-lg text-[17px] leading-relaxed">
                  {vault.includedFiles.length} packs in one download. Everything
                  in Collection V1, bought once.
                </p>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
                  <span className="font-display text-accent text-[3.5rem] leading-none">
                    {formatPrice(vault.price)}
                  </span>
                  <span className="text-muted text-[16px]">
                    <s>${vault.bundleValue.toFixed(2)}</s> separately
                  </span>
                  <span className="bg-accent/15 text-accent rounded-full px-3.5 py-1.5 text-[14px] font-bold">
                    Save ${(vault.bundleValue - vault.price).toFixed(2)}
                  </span>
                </div>

                <Link
                  href={`/products/${vault.slug}`}
                  className="bg-accent text-ink mt-9 inline-block rounded-xl px-8 py-4 text-[16px] font-bold transition-transform hover:scale-[1.02]"
                >
                  Get the Vault
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* How the shop works, once there is a reason to care. */}
      <section className="shell section-gap">
        <SectionHeader
          eyebrow="The short version"
          title="How SketchSets works"
          note="A small, hand-picked shop rather than a marketplace you have to dig through."
        />
        {/* gap-px over a line-coloured base draws the dividers between panels. */}
        <Reveal className="bg-line grid gap-px overflow-hidden rounded-2xl sm:grid-cols-3">
          {howItWorks.map((item) => (
            <div key={item.title} className="bg-surface p-7 sm:p-8">
              <h3 className="font-display text-[1.375rem] leading-tight">
                {item.title}
              </h3>
              <p className="text-dim mt-3 text-[15px] leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </Reveal>
      </section>

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
