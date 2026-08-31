import Image from "next/image";
import Link from "next/link";
import { ArtworkMarquee } from "@/components/ArtworkMarquee";
import { Newsletter } from "@/components/Newsletter";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { TextTicker } from "@/components/TextTicker";
import {
  bundleContents,
  bundleTotal,
  byCategory,
  categories,
  formatPrice,
  frostifyPicks,
  getProduct,
  newDrops,
  products,
  under,
} from "@/lib/products";
import { site } from "@/lib/site";

const faqs = [
  {
    q: "What am I actually buying?",
    a: "A pack of files you download and keep. Every one is made or vetted by Frostify before it goes up.",
  },
  {
    q: "Can I use it in paid work?",
    a: "Yes. A commercial licence covers client projects, sponsored videos and monetised channels, with no per-project limit.",
  },
  {
    q: "How do I get the files?",
    a: "Checkout runs through Payhip. No account, no subscription. Pay once and the download starts straight away.",
  },
];

export default function HomePage() {
  const vault = getProduct("sketchsets-vault");
  const picks = frostifyPicks();
  const drops = newDrops();
  const free = products.filter((p) => p.price === 0);
  const cheap = under(10);
  const lowest = Math.min(
    ...products.filter((p) => p.price > 0).map((p) => p.price),
  );

  const vaultContents = vault ? bundleContents(vault) : [];
  const vaultTotal = vault ? bundleTotal(vault) : 0;
  const saving = vault ? vaultTotal - vault.price : 0;

  return (
    <>
      {/* Hero: centred poster type, then straight into product. */}
      <section className="relative pt-16 pb-14 text-center sm:pt-24 sm:pb-16">
        <div
          aria-hidden="true"
          className="hero-glow pointer-events-none absolute inset-0 z-0"
        />
        <div className="shell relative z-10">
          <h1 className="font-display-tight text-[clamp(2.5rem,7.6vw,6.5rem)] leading-[0.88] uppercase">
            <span className="block">Resources for people</span>
            <span className="block">who make the internet</span>
          </h1>
          <p className="text-dim mx-auto mt-6 max-w-xl text-[17px] leading-relaxed">
            Presets, assets and creator tools, curated for editors, thumbnail
            designers and people making stuff online.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/browse"
              className="bg-accent text-ink rounded-full px-8 py-4 text-[15px] font-bold transition-transform hover:scale-[1.02]"
            >
              Browse SketchSets
            </Link>
            <Link
              href="/free"
              className="border-line hover:border-line-bright hover:bg-elevated rounded-full border px-8 py-4 text-[15px] font-semibold transition-colors"
            >
              Start with a freebie
            </Link>
          </div>
          <p className="text-muted mt-5 text-[14px]">
            {products.length} packs · {free.length} free · from{" "}
            {formatPrice(lowest)}
          </p>
        </div>
      </section>

      <ArtworkMarquee products={products} />

      {/* New drops */}
      {drops.length > 0 && (
        <section className="shell section-gap">
          <SectionHeader
            eyebrow="From the shop"
            title="New drops"
            action={{ href: "/new", label: "See more" }}
          />
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-3">
            {drops.map((product, i) => (
              <Reveal key={product.id} delay={i * 70}>
                <ProductCard product={product} priority={i < 3} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Frostify Picks */}
      <section className="shell section-gap">
        <SectionHeader
          eyebrow="From the shop"
          title="Frostify Picks"
          action={{ href: "/browse", label: "View all products" }}
        />
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
          {picks.map((product, i) => (
            <Reveal key={product.id} delay={i * 70}>
              <ProductCard product={product} priority={i < 4} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Free */}
      {free.length > 0 && (
        <section className="shell section-gap">
          <SectionHeader
            eyebrow="From the shop"
            title="Free downloads"
            action={{ href: "/free", label: "All free packs" }}
          />
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
            {free.map((product, i) => (
              <Reveal key={product.id} delay={i * 70}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* The Vault, as the big centred offer. */}
      {vault && vaultContents.length > 0 && (
        <section className="section-gap">
          <Reveal>
            <div className="bg-surface border-line border-y">
              <div className="shell py-16 text-center sm:py-20">
                <h2 className="font-display-tight text-[clamp(2rem,5.6vw,4.5rem)] leading-[0.92] uppercase">
                  The Vault
                </h2>
                <p className="text-dim mx-auto mt-5 max-w-lg text-[17px] leading-relaxed">
                  All {vaultContents.length} packs in one download. Everything
                  in Collection V1, bought once.
                </p>

                <ul className="mt-9 flex flex-wrap items-center justify-center gap-2.5">
                  {vaultContents.map((p) => (
                    <li
                      key={p.id}
                      title={p.title}
                      className="bg-elevated relative h-14 w-20 overflow-hidden rounded-lg sm:h-16 sm:w-24"
                    >
                      <Image
                        src={p.thumbnail}
                        alt={p.title}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </li>
                  ))}
                </ul>

                <div className="mt-9 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
                  <span className="font-display text-accent text-[3.25rem] leading-none">
                    {formatPrice(vault.price)}
                  </span>
                  <span className="text-muted text-[16px]">
                    <s>${vaultTotal.toFixed(2)}</s> separately
                  </span>
                  <span className="bg-accent/15 text-accent rounded-full px-3.5 py-1.5 text-[14px] font-bold">
                    Save ${saving.toFixed(2)} ·{" "}
                    {Math.round((saving / vaultTotal) * 100)}%
                  </span>
                </div>

                <Link
                  href={`/products/${vault.slug}`}
                  className="bg-accent text-ink mt-9 inline-block rounded-full px-8 py-4 text-[16px] font-bold transition-transform hover:scale-[1.02]"
                >
                  Explore the Vault
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* Under $10 */}
      {cheap.length > 0 && (
        <section className="shell section-gap">
          <SectionHeader
            eyebrow="From the shop"
            title="Under $10"
            action={{ href: "/browse", label: "View all products" }}
          />
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
            {cheap.map((product, i) => (
              <Reveal key={product.id} delay={i * 70}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <div className="section-gap">
        <TextTicker text="Instant download · Commercial licence included · Curated by Frostify" />
      </div>

      {/* Categories as a word list, their closing-shelf pattern. */}
      <section className="shell section-gap text-center">
        <p className="text-muted text-[13px]">The shop is open</p>
        <h2 className="font-display-tight mx-auto mt-3 max-w-[18ch] text-[clamp(1.875rem,4.6vw,3.5rem)] leading-[0.95] uppercase">
          Make great things with our packs
        </h2>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {categories.map((c) => (
            <li key={c.id}>
              <Link
                href={`/${c.id}`}
                className="font-display hover:text-accent text-[clamp(1.5rem,3vw,2.25rem)] leading-none transition-colors"
              >
                {c.name}
                <span className="text-muted ml-2 align-super text-[13px]">
                  {byCategory(c.id).length}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="text-dim mx-auto mt-8 max-w-lg text-[16px] leading-relaxed">
          Small catalogue, hand-picked. Nothing here is filler.
        </p>
        <Link
          href="/browse"
          className="bg-accent text-ink mt-8 inline-block rounded-full px-8 py-4 text-[15px] font-bold transition-transform hover:scale-[1.02]"
        >
          View all products
        </Link>
      </section>

      {/* How it works */}
      <section className="shell section-gap">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
            <h2 className="font-display text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.05]">
              How SketchSets works
            </h2>
            <dl>
              {faqs.map((item) => (
                <div
                  key={item.q}
                  className="border-line border-t py-6 last:border-b"
                >
                  <dt className="text-[17px] font-semibold">{item.q}</dt>
                  <dd className="text-dim mt-2 max-w-[60ch] text-[16px] leading-relaxed">
                    {item.a}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </section>

      {/* Frostoria, last, so it never competes with the shop. */}
      <section className="shell section-gap">
        <Reveal>
          <div className="border-line flex flex-col gap-6 rounded-3xl border border-dashed p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div className="max-w-lg">
              <h2 className="font-display text-[clamp(1.5rem,2.8vw,2rem)] leading-[1.1]">
                Make stuff with people who care.
              </h2>
              <p className="text-dim mt-3 text-[16px] leading-relaxed">
                Frostoria is where the editors, thumbnail designers and creators
                behind SketchSets trade work, feedback and jobs.
              </p>
            </div>
            <a
              href={site.links.frostoria}
              target="_blank"
              rel="noopener noreferrer"
              className="border-line hover:border-line-bright hover:bg-elevated shrink-0 rounded-full border px-6 py-3.5 text-center text-[15px] font-semibold transition-colors"
            >
              Join Frostoria ↗
            </a>
          </div>
        </Reveal>
      </section>

      <Newsletter />
    </>
  );
}
