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

/* Framed as the questions people actually arrive with. */
const howItWorks = [
  {
    q: "What am I actually buying?",
    a: "A pack of files you download and keep. Every one is made or vetted by Frostify before it goes up, and the catalogue stays deliberately small, so there is nothing here to dig through.",
  },
  {
    q: "Can I use it in paid work?",
    a: "Yes. A commercial licence comes with every pack: client projects, sponsored videos and monetised channels are all covered, with no extra fee and no per-project limit.",
  },
  {
    q: "How do I get the files?",
    a: "Checkout runs through Payhip. There is no account to create and nothing to subscribe to. Pay once and the download starts straight away.",
  },
];

export default function HomePage() {
  const picks = frostifyPicks();
  const vault = getProduct("sketchsets-vault");
  const cheap = under(10);
  const frostify = getCreator("frostify");
  const frostifyPacks = frostify ? byCreator(frostify.slug).slice(0, 4) : [];
  // Bundle members that exist as their own listings, for the contents strip.
  const vaultContents = (vault?.bundleOf ?? [])
    .map(getProduct)
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
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

      {/*
        Bundle. Shows what is actually inside rather than ghosting the pack
        artwork behind the type, which made the words read twice.
      */}
      {vault && vault.bundleValue && (
        <section className="shell section-gap">
          <Reveal>
            <div className="bg-surface relative overflow-hidden rounded-3xl">
              <div
                aria-hidden="true"
                className="hero-glow pointer-events-none absolute inset-0"
              />
              <div className="relative px-6 py-14 text-center sm:px-12 sm:py-20">
                <p className="text-muted text-[12px] font-semibold uppercase">
                  The whole library
                </p>
                <h2 className="font-display-tight mt-4 text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[0.92] uppercase">
                  {vault.title}
                </h2>
                <p className="text-dim mx-auto mt-5 max-w-lg text-[17px] leading-relaxed">
                  Every pack in Collection V1, in one download, bought once.
                </p>

                {/* The contents, as artwork, so the value is visible not stated. */}
                <ul className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-3">
                  {vaultContents.map((p) => (
                    <li key={p.id}>
                      <Link
                        href={`/products/${p.slug}`}
                        title={p.title}
                        className="group/thumb block"
                      >
                        <span className="bg-elevated ring-line group-hover/thumb:ring-accent relative block h-16 w-24 overflow-hidden rounded-lg ring-1 transition-all sm:h-20 sm:w-28">
                          <Image
                            src={p.thumbnail}
                            alt={p.title}
                            fill
                            sizes="112px"
                            className="object-cover"
                          />
                        </span>
                      </Link>
                    </li>
                  ))}
                  {vault.includedFiles.length > vaultContents.length && (
                    <li className="border-line text-muted flex h-16 w-24 items-center justify-center rounded-lg border border-dashed text-[13px] font-semibold sm:h-20 sm:w-28">
                      +{vault.includedFiles.length - vaultContents.length} more
                    </li>
                  )}
                </ul>

                <div className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
                  <span className="font-display text-accent text-[3.25rem] leading-none">
                    {formatPrice(vault.price)}
                  </span>
                  <span className="text-muted text-[16px]">
                    <s>${vault.bundleValue.toFixed(2)}</s> if bought separately
                  </span>
                  <span className="bg-accent/15 text-accent rounded-full px-3.5 py-1.5 text-[14px] font-bold">
                    Save ${(vault.bundleValue - vault.price).toFixed(2)}
                  </span>
                </div>

                <Link
                  href={`/products/${vault.slug}`}
                  className="bg-accent text-ink mt-8 inline-block rounded-xl px-8 py-4 text-[16px] font-bold transition-transform hover:scale-[1.02]"
                >
                  Get the Vault
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* How the shop works, as answers rather than three equal grey boxes. */}
      <section className="shell section-gap">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-muted mb-2 text-[12px] font-semibold uppercase">
              The short version
            </p>
            <h2 className="font-display text-[clamp(1.875rem,3.6vw,3rem)] leading-[1.02]">
              How SketchSets works
            </h2>
            <p className="text-dim mt-4 text-[16px] leading-relaxed">
              A small, hand-picked shop rather than a marketplace you have to
              dig through.
            </p>
            <Link
              href="/browse"
              className="border-line hover:border-line-bright hover:bg-elevated mt-7 inline-block rounded-full border px-5 py-2.5 text-[14px] font-semibold transition-colors"
            >
              Browse the shop
            </Link>
          </div>

          <Reveal>
            <dl>
              {howItWorks.map((item) => (
                <div
                  key={item.q}
                  className="border-line border-t py-7 last:border-b"
                >
                  <dt className="font-display text-[clamp(1.25rem,2.2vw,1.625rem)] leading-tight">
                    {item.q}
                  </dt>
                  <dd className="text-dim mt-3 max-w-[62ch] text-[16px] leading-relaxed">
                    {item.a}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
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
