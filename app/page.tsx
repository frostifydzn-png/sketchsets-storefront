import Link from "next/link";
import { CategoryCard } from "@/components/CategoryCard";
import { HeroStack } from "@/components/HeroStack";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { SoftwareRow } from "@/components/SoftwareRow";
import { ValueProps } from "@/components/ValueProps";
import { VaultPanel } from "@/components/VaultPanel";
import { linkedCategories, totalAssets } from "@/lib/catalog";
import {
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
  /*
   * Two tiles, not three. The third category holds one product, so it fails
   * the rule in lib/catalog.ts and never renders — which is the point of
   * deriving this rather than listing it. Three tiles where one leads
   * somewhere empty reads as a shop that is not finished.
   */
  const tiles = linkedCategories();
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
      {/*
        HERO, SIZED SO THE SHOP STARTS ABOVE THE FOLD. The version this
        replaced ran a 4rem headline over ~180px of stacked vertical steps and
        then handed the next 176px to .section-gap, which put the first
        purchasable thing roughly a screen and a half down. On a storefront
        that is the whole argument lost: a landing page explains, a shop shows
        you what it sells.
      */}
      <section className="grid items-center gap-10 pt-8 pb-2 sm:pt-10 lg:grid-cols-[1.14fr_0.86fr] lg:gap-12">
        <div>
          {/*
            THE EYEBROW IS THE CATALOGUE, NOT A COMPLIMENT. "Curated by
            Frostify" asserted taste; the set range and the asset count
            demonstrate it, and they come from the data rather than from
            copywriting.
          */}
          <p className="set-no text-muted">
            Sets 000&ndash;007 &middot;{" "}
            <span className="tabular-nums">{totalAssets()}</span> assets
          </p>

          {/*
            NO COLOURED WORD IN THE HEADLINE. A sentence in ink with its last
            phrase flipped to the brand accent is the single most recognisable
            piece of generated-landing-page furniture there is, and it was the
            first thing the eye hit on this page. The headline carries itself
            on size and weight now; the pink is spent on the one thing it
            should mark, which is the button that takes money.

            The line also changed to say something only this shop can say.
            "Resources for people who make the internet" could sit on any
            asset store on earth. The provenance is the entire differentiator
            against a Gumroad folder, so it leads.
          */}
          <h1 className="display-hero text-text mt-6 max-w-[15ch]">
            Every pack shipped on a real video first.
          </h1>

          <p className="text-dim mt-6 max-w-[46ch] text-[16.5px] leading-relaxed">
            Textures, overlays and brushes for thumbnail designers and editors
            &mdash; built for client work, then packaged properly.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-4">
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
          {/*
            Assets first, packs second. "10 packs" describes the shelf;
            "194 assets" describes what lands in the buyer's downloads folder,
            and both are true of the same catalogue.
          */}
          <p className="text-muted mt-7 text-[13.5px] leading-relaxed">
            <span className="tabular-nums">{totalAssets()}</span> assets across{" "}
            <span className="tabular-nums">{products.length}</span> packs
            &middot; {freeCount} free &middot; from {formatPrice(lowest)}{" "}
            &middot; commercial licence included
          </p>

          {/*
            THE COMPATIBILITY LINE BELONGS ABOVE THE FOLD. It is the first
            question anyone asks about an asset pack and the one that stops a
            sale dead, so it is answered before a product is even clicked.
            Derived from the catalogue, so it cannot claim support the shop
            does not actually have.
          */}
          <SoftwareRow className="border-line mt-7 border-t pt-6" />
        </div>

        <HeroStack products={fan} />
      </section>

      {vault && <VaultPanel vault={vault} />}

      {/*
        PRODUCTS FIRST. Nerd or Die puts two full shelves in front of you
        before a single paragraph of marketing, and that ordering is most of
        why it reads as a shop rather than a landing page with products bolted
        underneath. The tiles are navigation and navigation can wait until
        someone has seen what is on sale.
      */}
      {picks.length > 0 && (
        <Section
          tight
          title={`${site.parent} Picks`}
          note={`The packs ${site.parent} actually reaches for.`}
          action={{ href: "/browse", label: "See everything" }}
        >
          <div className="grid gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
            {picks.map((product, i) => (
              <Reveal key={product.id} delay={i * 60}>
                <ProductCard product={product} priority={i < 4} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {free.length > 0 && (
        <Section
          tight
          title="Free downloads"
          note="Real packs, not trials. Take them and see whether the quality holds up."
          action={{ href: "/free", label: "All free packs" }}
        >
          <div className="grid gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
            {free.map((product, i) => (
              <Reveal key={product.id} delay={Math.min(i, 3) * 80}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <Section
        tight
        title="Shop by what you make"
        note="Two things, done properly. Everything here is for one or the other."
      >
        <div className="grid gap-x-5 gap-y-9 sm:grid-cols-2">
          {tiles.map((c, i) => (
            <Reveal key={c.id} delay={i * 60}>
              <CategoryCard category={c} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/*
        The compatibility band. The hero answers the question for someone who
        reads top to bottom; this answers it again for someone who scrolled
        straight to the shelves, which is most people. The reference
        marketplace states its software support three times on one page for
        exactly this reason.
      */}
      <section className="shelf-gap">
        <div className="border-line bg-surface rounded-2xl border px-7 py-8 sm:px-10 sm:py-10">
          <h2 className="display-section text-text max-w-[18ch]">
            Opens in what you already use.
          </h2>
          <p className="text-dim mt-4 max-w-[54ch] text-[15.5px] leading-relaxed">
            Layered PSDs, transparent PNGs and vectors. Nothing here needs a
            plugin, a subscription or a specific version to be useful &mdash;
            every product page lists exactly what it opens in.
          </p>
          <SoftwareRow className="border-line mt-7 border-t pt-6" />
        </div>
      </section>

      {cheap.length > 0 && (
        <Section
          tight
          title="Under $10"
          note="Good work that costs less than lunch."
          action={{ href: "/browse", label: "See everything" }}
        >
          <div className="grid gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
            {cheap.map((product, i) => (
              <Reveal key={product.id} delay={Math.min(i, 3) * 80}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <ValueProps />

      {/* Frostoria last, so the community never competes with the shop. */}
      <section className="section-gap">
        <div className="border-line flex flex-col gap-6 border-t pt-14 sm:flex-row sm:items-end sm:justify-between sm:pt-16">
          <div className="max-w-lg">
            <p className="text-muted text-[13px]">The other side of it</p>
            <h2 className="mt-3 text-[clamp(1.5rem,2.8vw,2.125rem)] leading-[1.12] font-bold tracking-[-0.02em] text-text">
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
