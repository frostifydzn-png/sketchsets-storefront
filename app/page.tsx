import Image from "next/image";
import Link from "next/link";
import { ArtworkMarquee } from "@/components/ArtworkMarquee";
import { HeroSearch } from "@/components/HeroSearch";
import { Newsletter } from "@/components/Newsletter";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { getCreator, monogram } from "@/lib/creators";
import {
  byCategory,
  byCreator,
  categories,
  formatPrice,
  frostifyPicks,
  getProduct,
  products,
  under,
} from "@/lib/products";
import { site } from "@/lib/site";

const steps = [
  {
    n: "01",
    title: "Find what you need",
    body: "Search or filter by category, software and price. Small catalogue, nothing padded.",
  },
  {
    n: "02",
    title: "Buy in a few clicks",
    body: "Secure checkout through Payhip. No account required to buy a pack.",
  },
  {
    n: "03",
    title: "Download instantly",
    body: "Files land straight away, with a commercial licence included every time.",
  },
];

export default function HomePage() {
  const picks = frostifyPicks();
  const vault = getProduct("sketchsets-vault");
  const cheap = under(10);
  const frostify = getCreator("frostify");
  const lowest = Math.min(
    ...products.filter((p) => p.price > 0).map((p) => p.price),
  );

  return (
    <>
      {/* Hero — search is the primary action, not a decorative headline. */}
      <section className="shell pt-16 pb-16 sm:pt-24 sm:pb-20">
        <h1 className="font-display-tight line-rise max-w-[16ch] text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.94]">
          <span>Resources for</span>
          <span>people who make</span>
          <span>the internet.</span>
        </h1>
        <p className="text-dim mt-6 max-w-xl text-[17px] leading-relaxed">
          Presets, assets, templates and creative tools curated for editors,
          thumbnail designers and creators.{" "}
          <span className="text-text font-semibold">
            {products.length} packs from {formatPrice(lowest)}.
          </span>
        </p>
        <div className="mt-8">
          <HeroSearch />
        </div>
      </section>

      {/* Product artwork in motion, before the fold. */}
      <ArtworkMarquee products={products} />

      {/* How it works — three lines, removes any doubt about the model. */}
      <section className="shell section-gap">
        <Reveal className="grid gap-6 sm:grid-cols-3">
          {steps.map((step) => (
            <div key={step.n} className="border-line border-t pt-5">
              <span className="text-accent font-display text-[13px]">
                {step.n}
              </span>
              <h2 className="mt-2 text-[17px] font-semibold">{step.title}</h2>
              <p className="text-muted mt-2 text-[14px] leading-relaxed">
                {step.body}
              </p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Frostify Picks */}
      <Section
        title="Frostify Picks"
        note="Hand-picked, not algorithm-picked."
        action={{ href: "/browse", label: "All packs" }}
      >
        <div className="grid grid-cols-2 gap-x-5 gap-y-9 lg:grid-cols-4">
          {picks.map((product, i) => (
            <Reveal key={product.id} delay={i * 70}>
              <ProductCard product={product} priority={i < 4} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Categories carry a count and a starting price. */}
      <Section title="Shop by what you make">
        <div className="grid gap-4 sm:grid-cols-3">
          {categories.map((category, i) => {
            const items = byCategory(category.id);
            const from = Math.min(...items.map((p) => p.price));
            return (
              <Reveal key={category.id} delay={i * 70}>
                <Link
                  href={`/${category.id}`}
                  className="group bg-surface ring-line hover:ring-line-bright relative flex h-full flex-col overflow-hidden rounded-xl p-6 ring-1 transition-all hover:-translate-y-1.5"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-1 origin-left scale-x-100 transition-transform duration-500"
                    style={{ background: category.accentVar }}
                  />
                  <h3 className="font-display text-2xl">{category.name}</h3>
                  <p className="text-muted mt-2 text-[14px]">
                    {category.blurb}
                  </p>
                  <p className="text-dim mt-6 text-[14px]">
                    <span className="text-text font-semibold">
                      {items.length} {items.length === 1 ? "pack" : "packs"}
                    </span>{" "}
                    from{" "}
                    <span className="text-accent font-bold">
                      {formatPrice(from)}
                    </span>
                  </p>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Bundle feature */}
      {vault && vault.bundleValue && (
        <section className="shell section-gap">
          <Reveal>
            <Link
              href={`/products/${vault.slug}`}
              className="group ring-line hover:ring-line-bright relative block overflow-hidden rounded-2xl ring-1 transition-all"
            >
              <div className="grid lg:grid-cols-2">
                <div className="bg-surface relative aspect-[16/10] lg:aspect-auto lg:min-h-[400px]">
                  <Image
                    src={vault.thumbnail}
                    alt={`${vault.title} preview`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[900ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-col justify-center p-7 sm:p-12">
                  <span className="text-accent text-[12px] font-bold tracking-wider uppercase">
                    Best value
                  </span>
                  <h2 className="font-display mt-3 text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1]">
                    {vault.title}
                  </h2>
                  <p className="text-dim mt-4 text-[16px] leading-relaxed">
                    {vault.shortDescription}
                  </p>
                  <div className="mt-7 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="font-display text-accent text-5xl">
                      {formatPrice(vault.price)}
                    </span>
                    <span className="text-muted text-[15px]">
                      <s>${vault.bundleValue.toFixed(2)}</s> bought separately
                    </span>
                    <span className="bg-accent/15 text-accent rounded-full px-2.5 py-1 text-[13px] font-bold">
                      Save ${(vault.bundleValue - vault.price).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </Reveal>
        </section>
      )}

      {/* Under $10 */}
      {cheap.length > 0 && (
        <Section
          title="Under $10"
          note="Cheap way to find out if the quality is real."
          action={{ href: "/browse", label: "See all" }}
        >
          <div className="grid grid-cols-2 gap-x-5 gap-y-9 lg:grid-cols-4">
            {cheap.map((product, i) => (
              <Reveal key={product.id} delay={i * 70}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* Creator */}
      {frostify && (
        <Section title="The creator">
          <Reveal>
            <div className="bg-surface ring-line rounded-2xl p-7 ring-1 sm:p-10">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div className="max-w-xl">
                  <div className="flex items-center gap-3">
                    <span className="bg-elevated ring-line flex h-11 w-11 items-center justify-center rounded-full text-[14px] font-bold ring-1">
                      {monogram(frostify.name)}
                    </span>
                    <div>
                      <p className="font-display text-xl">{frostify.name}</p>
                      <p className="text-muted text-[13px]">{frostify.role}</p>
                    </div>
                  </div>
                  <p className="text-dim mt-5 text-[15px] leading-relaxed">
                    {frostify.intro}
                  </p>
                </div>
                <Link
                  href={`/creators/${frostify.slug}`}
                  className="border-line hover:border-line-bright shrink-0 rounded-xl border px-5 py-3 text-[14px] font-semibold transition-colors"
                >
                  {byCreator(frostify.slug).length} packs →
                </Link>
              </div>
            </div>
          </Reveal>
        </Section>
      )}

      {/* Frostoria */}
      <Section title="Make stuff with people who care.">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-dim max-w-lg text-[16px] leading-relaxed">
              Join editors, thumbnail designers and creators inside Frostoria —
              the {site.parent} community for trading work, feedback and jobs.
            </p>
            <a
              href={site.links.frostoria}
              target="_blank"
              rel="noopener noreferrer"
              className="border-line hover:border-line-bright shrink-0 rounded-xl border px-6 py-3.5 text-[15px] font-semibold transition-colors"
            >
              Join Frostoria ↗
            </a>
          </div>
        </Reveal>
      </Section>

      <Newsletter />
    </>
  );
}

function Section({
  title,
  note,
  action,
  children,
}: {
  title: string;
  note?: string;
  action?: { href: string; label: string };
  children: React.ReactNode;
}) {
  return (
    <section className="shell section-gap">
      <div className="mb-9 flex items-end justify-between gap-6 sm:mb-12">
        <div>
          <h2 className="font-display text-[clamp(1.625rem,3vw,2.5rem)] leading-[1.05]">
            {title}
          </h2>
          {note && <p className="text-muted mt-2 text-[14px]">{note}</p>}
        </div>
        {action && (
          <Link
            href={action.href}
            className="text-dim hover:text-text shrink-0 pb-1 text-[14px] whitespace-nowrap transition-colors"
          >
            {action.label} →
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}
