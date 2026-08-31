import Link from "next/link";
import { CategoryCard } from "@/components/CategoryCard";
import { HeroStack } from "@/components/HeroStack";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { VaultPanel } from "@/components/VaultPanel";
import {
  categories,
  formatPrice,
  frostifyPicks,
  getProduct,
  products,
  under,
} from "@/lib/products";
import { site } from "@/lib/site";

export default function HomePage() {
  const vault = getProduct("sketchsets-vault");

  /*
   * Catalogue-wide counts for the line under the hero. Kept separate from the
   * shelves below, which claim products from each other — those lists say what
   * is on a shelf, this says what the shop holds.
   */
  const freeCount = products.filter((p) => p.price === 0).length;
  const lowest = Math.min(
    ...products.filter((p) => p.price > 0).map((p) => p.price),
  );

  /* The Vault has its own block, so it stays off every other shelf. */
  const notVault = (p: (typeof products)[number]) => p.slug !== vault?.slug;

  /*
   * Each shelf claims its products, so nothing appears twice on the way down.
   * With a catalogue this size, showing the same three covers under three
   * different headings reads as padding rather than as choice.
   */
  const shown = new Set<string>();
  const claim = <T extends { id: string }>(list: T[]) => {
    const taken = list.filter((p) => !shown.has(p.id));
    taken.forEach((p) => shown.add(p.id));
    return taken;
  };

  const picks = claim(frostifyPicks().filter(notVault));
  const free = claim(products.filter((p) => p.price === 0));
  const cheap = claim(under(10).filter((p) => p.price > 0 && notVault(p)));

  /* The fan leads with the covers that read best at a glance. */
  const fan = [
    getProduct("leaks-and-glows"),
    getProduct("speedlines"),
    getProduct("hand-drawn-doodles"),
    getProduct("paper-tears"),
  ].filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="shell page-bottom">
      {/* Hero. Copy on the left, real pack covers on the right. */}
      <section className="page-top grid items-center gap-12 pb-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <p className="text-muted text-[13px]">Curated by {site.parent}</p>

          <h1 className="mt-5 text-[clamp(2.5rem,5.4vw,4rem)] leading-[1.06] font-bold tracking-[-0.035em] text-white">
            Resources for people who make{" "}
            <span className="text-accent">the internet.</span>
          </h1>

          <p className="text-dim mt-6 max-w-[44ch] text-[17px] leading-relaxed">
            A small, hand-picked shop of presets, textures and creator tools.
            Everything here is something we actually reach for.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
            <Link href="/browse" className="btn-primary px-7 py-3.5 text-[15px]">
              Browse the shop
            </Link>
            <Link
              href="/free"
              className="text-dim link-rule text-[15px] font-medium"
            >
              Start with a freebie
            </Link>
          </div>

          {/* One quiet line, not a row of badges with icons. */}
          <p className="text-muted mt-10 text-[13.5px] leading-relaxed">
            {products.length} packs &middot; {freeCount} free &middot; from{" "}
            {formatPrice(lowest)} &middot; instant download &middot; commercial
            licence included
          </p>
        </div>

        <HeroStack products={fan} />
      </section>

      {picks.length > 0 && (
        <Section
          first
          title={`${site.parent} Picks`}
          note={`The packs ${site.parent} actually reaches for.`}
          action={{ href: "/browse", label: "See everything" }}
        >
          <div className="grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {picks.map((product, i) => (
              <Reveal key={product.id} delay={i * 80}>
                <ProductCard product={product} priority={i < 3} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <Section title="Browse by what you make">
        <div className="grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => (
            <Reveal key={c.id} delay={i * 80}>
              <CategoryCard category={c} />
            </Reveal>
          ))}
        </div>
      </Section>

      {vault && <VaultPanel vault={vault} />}

      {free.length > 0 && (
        <Section
          title="Free downloads"
          note="Real packs, not trials. Take them and see whether the quality holds up."
          action={{ href: "/free", label: "All free packs" }}
        >
          <div className="grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {free.map((product, i) => (
              <Reveal key={product.id} delay={Math.min(i, 3) * 80}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {cheap.length > 0 && (
        <Section
          title="Under $10"
          note="Good work that costs less than lunch."
          action={{ href: "/browse", label: "See everything" }}
        >
          <div className="grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {cheap.map((product, i) => (
              <Reveal key={product.id} delay={Math.min(i, 3) * 80}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* Frostoria last, so the community never competes with the shop. */}
      <section className="section-gap">
        <div className="border-line flex flex-col gap-6 border-t pt-14 sm:flex-row sm:items-end sm:justify-between sm:pt-16">
          <div className="max-w-lg">
            <p className="text-muted text-[13px]">The other side of it</p>
            <h2 className="mt-3 text-[clamp(1.5rem,2.8vw,2.125rem)] leading-[1.12] font-bold tracking-[-0.02em] text-white">
              Make stuff with people who care.
            </h2>
            <p className="text-dim mt-4 text-[16px] leading-relaxed">
              Frostoria is where the editors, thumbnail designers and creators
              behind SketchSets share work, swap feedback and find each other.
            </p>
          </div>
          <a
            href={site.links.frostoria}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost shrink-0 px-7 py-3.5 text-[15px]"
          >
            Join Frostoria
          </a>
        </div>
      </section>
    </div>
  );
}
