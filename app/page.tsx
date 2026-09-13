import Link from "next/link";
import { CategoryCard } from "@/components/CategoryCard";
import { CollectionBanner } from "@/components/CollectionBanner";
import { HeroStack } from "@/components/HeroStack";
import { IconArrow } from "@/components/Icons";
import { NewsletterForm } from "@/components/NewsletterForm";
import { ProductCard } from "@/components/ProductCard";
import { Section } from "@/components/Section";
import { TrustStrip } from "@/components/TrustStrip";
import { linkedCategories, totalAssets } from "@/lib/catalog";
import { frostifyPicks, getProduct, products } from "@/lib/products";
import { NEWSLETTER_ENDPOINT, site } from "@/lib/site";

/**
 * The marketplace home page.
 *
 * BUILT FOR BROWSING, NOT READING. The order alternates stock and pause:
 * hero, reassurance, grid, collection, categories, grid, free, signup. A
 * homepage that is nothing but grid becomes a wall around the fourth row and
 * the reader stops seeing individual products; one that is nothing but
 * editorial is a brochure. Alternating is what keeps something worth clicking
 * on screen the whole way down.
 *
 * PRODUCTS APPEAR IN MORE THAN ONE SHELF, on purpose. An earlier version made
 * each shelf claim its products so nothing repeated, which with ten products
 * meant three shelves of two or three items each and a page that looked
 * understocked. A pack can honestly be both recent and a favourite, and every
 * real marketplace shows it in both places.
 *
 * Everything here is derived from lib/products.ts. No shelf lists a slug, so
 * the page restocks itself as the catalogue grows and never advertises a
 * section it cannot fill.
 */
export default function HomePage() {
  const vault = getProduct("sketchsets-vault");
  const notVault = (p: (typeof products)[number]) => p.slug !== vault?.slug;

  /* The Vault has the collection banner to itself, so it stays off the
     shelves — it would win every one of them and say nothing new. */
  const shelf = products.filter(notVault);

  /* isNew is hand-maintained and never inferred, so recency here is claimed
     rather than guessed. Flagged products lead; the rest hold catalogue
     order behind them. */
  const justDropped = [...shelf]
    .sort((a, b) => Number(b.isNew) - Number(a.isNew))
    .slice(0, 4);

  const favourites = [
    ...frostifyPicks().filter(notVault),
    ...shelf.filter((p) => !p.featured),
  ].slice(0, 4);

  const free = products.filter((p) => p.price === 0).slice(0, 4);

  const fan = [
    getProduct("leaks-and-glows"),
    getProduct("speedlines"),
    getProduct("hand-drawn-doodles"),
    getProduct("paper-tears"),
  ].filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="page-bottom">
      <div className="shell">
        {/*
          HERO: COPY LEFT, STOCK RIGHT. Not a centred headline over a gradient
          — the right half is four real pack covers, layered, because the one
          thing this page has to communicate in a second is that there is a
          lot of usable material here. A sentence cannot do that; artwork can.
        */}
        <section className="grid items-center gap-10 pt-10 pb-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pt-14 lg:pb-16">
          <div>
            <p className="set-no text-accent">
              Sets 000&ndash;007 &middot;{" "}
              <span className="tabular-nums">{totalAssets()}</span> assets
            </p>

            <h1 className="display-hero text-text mt-5 max-w-[16ch]">
              Assets made for creators who actually create.
            </h1>

            <p className="text-dim mt-6 max-w-[50ch] text-[17px] leading-relaxed">
              Editing overlays, thumbnail resources, brushes, textures and
              creator packs &mdash; every one of them built for a real client
              project before it ever reached the shop.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/browse"
                className="btn-primary group/a px-7 py-3.5 text-[15px]"
              >
                Explore assets
                <IconArrow className="h-4 w-4 transition-transform group-hover/a:translate-x-0.5" />
              </Link>
              <Link href="/free" className="btn-ghost px-6 py-3.5 text-[15px]">
                Browse free assets
              </Link>
            </div>
          </div>

          <HeroStack products={fan} />
        </section>
      </div>

      <div className="shell">
        <TrustStrip />
      </div>

      <div className="shell">
        <Section
          tight
          title="Just dropped"
          action={{ href: "/new", label: "All new releases" }}
        >
          <Grid>
            {justDropped.map((product, i) => (
              <ProductCard key={product.id} product={product} priority={i < 4} />
            ))}
          </Grid>
        </Section>

        {vault && <CollectionBanner product={vault} />}

        <Section
          tight
          title="Find what you need"
          action={{ href: "/browse", label: "Browse everything" }}
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {linkedCategories().map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </Section>

        <Section
          tight
          title="Creator favourites"
          action={{ href: "/browse", label: "Shop all packs" }}
        >
          <Grid>
            {favourites.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Grid>
        </Section>

        <Section
          tight
          title="Start with something free"
          note="Complete packs, not crippled trials. No email required."
          action={{ href: "/free", label: "All free packs" }}
        >
          <Grid>
            {free.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Grid>
        </Section>

        {/*
          The signup renders only once NEWSLETTER_ENDPOINT points at a real
          provider. A form that silently drops addresses is worse than no
          form, and an empty branded block is worse than both.
        */}
        {NEWSLETTER_ENDPOINT && (
          <section className="shelf-gap">
            <div className="border-line bg-surface flex flex-col gap-6 rounded-xl border p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-[44ch]">
                <h2 className="display-section text-text">
                  Get the good stuff first.
                </h2>
                <p className="text-dim mt-3 text-[15.5px] leading-relaxed">
                  New packs, drops and freebies when they land. No schedule, no
                  filler &mdash; only when there is something worth sending.
                </p>
              </div>
              <div className="w-full max-w-md shrink-0">
                <NewsletterForm />
              </div>
            </div>
          </section>
        )}

        {/* Frostoria last, so the community never competes with the shop. */}
        <section className="shelf-gap">
          <div className="border-line flex flex-col gap-6 border-t pt-12 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-lg">
              <p className="set-no text-muted">The other side of it</p>
              <h2 className="display-section text-text mt-2.5">
                Make stuff with people who care.
              </h2>
              <p className="text-dim mt-3.5 text-[15.5px] leading-relaxed">
                Frostoria is where the editors, thumbnail designers and
                creators behind SketchSets share work, swap feedback and find
                each other.
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
    </div>
  );
}

/** One grid geometry for every shelf, so the page reads as one system. */
function Grid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4">
      {children}
    </div>
  );
}
