import Image from "next/image";
import Link from "next/link";
import { ArtworkMarquee } from "@/components/ArtworkMarquee";
import { CategoryCard } from "@/components/CategoryCard";
import { Newsletter } from "@/components/Newsletter";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import {
  bundleContents,
  bundleTotal,
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
  const free = products.filter((p) => p.price === 0);
  const cheap = under(10);
  const lowest = Math.min(
    ...products.filter((p) => p.price > 0).map((p) => p.price),
  );

  const [leadPick, ...restPicks] = picks;
  const vaultContents = vault ? bundleContents(vault) : [];
  const vaultTotal = vault ? bundleTotal(vault) : 0;

  return (
    <>
      {/* Hero. Two clear routes in rather than a search field. */}
      <section className="relative pt-16 pb-16 text-center sm:pt-24 sm:pb-20">
        <div
          aria-hidden="true"
          className="hero-glow pointer-events-none absolute inset-0 z-0"
        />
        <div className="shell relative z-10">
          <h1 className="font-display-tight line-rise text-[clamp(2.5rem,7.4vw,6.25rem)] leading-[0.9] uppercase">
            <span className="sm:whitespace-nowrap">Resources for</span>
            <span className="sm:whitespace-nowrap">people who make</span>
            <span className="sm:whitespace-nowrap">the internet</span>
          </h1>
          <p className="text-dim mx-auto mt-6 max-w-xl text-[17px] leading-relaxed">
            Presets, assets and creator tools curated for editors, thumbnail
            designers and people making stuff online.
          </p>
          {/*
            Inventory count is metadata, not part of the promise. Baking "10
            packs" into the headline copy would date the moment one is added.
          */}
          <p className="text-muted mt-4 text-[14px]">
            {products.length} packs · {free.length} free · from{" "}
            {formatPrice(lowest)}
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/browse"
              className="bg-accent text-ink rounded-xl px-7 py-4 text-[15px] font-bold transition-transform hover:scale-[1.02]"
            >
              Browse all packs
            </Link>
            <Link
              href="/free"
              className="border-line hover:border-line-bright hover:bg-elevated rounded-xl border px-7 py-4 text-[15px] font-semibold transition-colors"
            >
              Start with a freebie
            </Link>
          </div>
        </div>
      </section>

      <ArtworkMarquee products={products} />

      {/* Quick confidence, early. The full explainer still lives further down. */}
      <div className="border-line border-b">
        <div className="shell text-muted flex flex-wrap items-center justify-center gap-x-3 gap-y-2 py-5 text-center text-[13.5px]">
          {[
            "Instant downloads",
            "Commercial licence",
            "One-time purchases",
            "Curated by Frostify",
          ].map((point, i) => (
            <span key={point} className="flex items-center gap-3">
              {i > 0 && (
                <span aria-hidden="true" className="bg-line h-3 w-px" />
              )}
              {point}
            </span>
          ))}
        </div>
      </div>

      {/* Curated */}
      <section className="shell section-gap">
        <SectionHeader
          eyebrow="From the shop"
          title="Frostify Picks"
          note="The packs Frostify actually reaches for."
          action={{ href: "/browse", label: "All packs" }}
        />
        {/*
          One pick runs large beside the rest, so the page has a focal point
          instead of a fourth identical row of equal cards.
        */}
        <div className="grid gap-x-5 gap-y-9 lg:grid-cols-2 lg:gap-x-8">
          {leadPick && (
            <Reveal>
              <ProductCard product={leadPick} priority featured />
            </Reveal>
          )}
          <div className="grid grid-cols-2 gap-x-5 gap-y-9 self-center">
            {restPicks.map((product, i) => (
              <Reveal key={product.id} delay={(i + 1) * 70}>
                <ProductCard product={product} priority={i < 2} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The bundle, presented as an offer: what it is, and what it costs. */}
      {vault && vaultContents.length > 0 && (
        <section className="shell section-gap">
          <Reveal>
            <div className="bg-surface relative overflow-hidden rounded-3xl p-7 sm:p-10 lg:p-14">
              <div
                aria-hidden="true"
                className="hero-glow pointer-events-none absolute inset-0"
              />
              <div className="relative grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
                <div>
                  <p className="text-muted text-[12px] font-semibold uppercase">
                    The whole library
                  </p>
                  <h2 className="font-display-tight mt-3 text-[clamp(2rem,4.6vw,3.5rem)] leading-[0.95] uppercase">
                    {vault.title}
                  </h2>
                  <p className="text-dim mt-4 max-w-md text-[17px] leading-relaxed">
                    Every pack in Collection V1, in one download, bought once.
                  </p>

                  <ul className="mt-8 flex flex-wrap gap-2.5">
                    {vaultContents.map((p) => (
                      <li key={p.id}>
                        <Link
                          href={`/products/${p.slug}`}
                          title={p.title}
                          className="group/thumb block"
                        >
                          <span className="bg-elevated ring-line group-hover/thumb:ring-accent relative block h-14 w-20 overflow-hidden rounded-lg ring-1 transition-all sm:h-16 sm:w-24">
                            <Image
                              src={p.thumbnail}
                              alt={p.title}
                              fill
                              sizes="96px"
                              className="object-cover"
                            />
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price card, so the offer is legible at a glance. */}
                <div className="bg-ink ring-line h-fit rounded-2xl p-7 ring-1">
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-accent text-[3rem] leading-none">
                      {formatPrice(vault.price)}
                    </span>
                    <span className="text-muted text-[15px]">
                      <s>${vaultTotal.toFixed(2)}</s> separately
                    </span>
                  </div>
                  {/* Percentage lands faster than the dollar figure alone. */}
                  <p className="bg-accent/15 text-accent mt-4 inline-block rounded-full px-3.5 py-1.5 text-[14px] font-bold">
                    Save ${(vaultTotal - vault.price).toFixed(2)} ·{" "}
                    {Math.round(
                      ((vaultTotal - vault.price) / vaultTotal) * 100,
                    )}
                    %
                  </p>

                  <ul className="text-dim mt-7 space-y-3 text-[15px]">
                    {[
                      `All ${vaultContents.length} packs in one download`,
                      "Commercial licence on everything",
                      "One-time purchase, no subscription",
                      "Yours to keep, forever",
                    ].map((line) => (
                      <li key={line} className="flex gap-3">
                        <span
                          className="text-accent shrink-0"
                          aria-hidden="true"
                        >
                          ✓
                        </span>
                        {line}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/products/${vault.slug}`}
                    className="bg-accent text-ink mt-8 block rounded-xl px-6 py-4 text-center text-[16px] font-bold transition-transform hover:scale-[1.02]"
                  >
                    Get the Vault
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      )}

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

      {/* Free, as the low-friction way in. */}
      {free.length > 0 && (
        <section className="shell section-gap">
          <SectionHeader
            eyebrow="No cost"
            title="Free to download"
            note="Real packs, not trials. Take them and see whether the quality holds up."
            action={{ href: "/browse", label: "See all" }}
          />
          <div className="grid grid-cols-2 gap-x-5 gap-y-9 lg:grid-cols-4">
            {free.map((product, i) => (
              <Reveal key={product.id} delay={i * 70}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Entry price */}
      {cheap.length > 0 && (
        <section className="shell section-gap">
          <SectionHeader
            eyebrow="From the shop"
            title="Under $10"
            note="Single-purpose packs that earn their place without much thought."
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
