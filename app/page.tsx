import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { Newsletter } from "@/components/Newsletter";
import { getCreator, monogram } from "@/lib/creators";
import {
  byCreator,
  categories,
  formatPrice,
  frostifyPicks,
  getProduct,
  under,
} from "@/lib/products";
import { site } from "@/lib/site";

export default function HomePage() {
  const picks = frostifyPicks();
  const vault = getProduct("sketchsets-vault");
  const cheap = under(10);
  const frostify = getCreator("frostify");

  return (
    <>
      {/* Hero — copy is compact so product artwork lands in the first screen. */}
      <section className="mx-auto max-w-[1440px] px-5 pt-14 sm:px-8 sm:pt-20">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h1 className="font-display-tight max-w-[15ch] text-[clamp(2.75rem,7vw,5.25rem)] leading-[0.94]">
            Resources for people who make the internet.
          </h1>
          <div className="lg:max-w-sm lg:pb-2">
            <p className="text-dim text-[16px] leading-relaxed">
              Presets, assets, templates and creative tools curated for editors,
              thumbnail designers and creators.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/browse"
                className="bg-accent text-ink rounded-xl px-6 py-3.5 text-[15px] font-bold transition-transform hover:scale-[1.02]"
              >
                Browse SketchSets
              </Link>
              <Link
                href="/new"
                className="border-line hover:border-line-bright rounded-xl border px-6 py-3.5 text-[15px] font-semibold transition-colors"
              >
                New drops
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Frostify Picks — first thing under the fold is product, not story. */}
      <Section
        className="pt-12 sm:pt-16"
        title="Frostify Picks"
        note="Hand-picked, not algorithm-picked."
        action={{ href: "/browse", label: "All packs" }}
      >
        <div className="grid grid-cols-2 gap-x-5 gap-y-9 lg:grid-cols-4">
          {picks.map((product, i) => (
            <ProductCard key={product.id} product={product} priority={i < 4} />
          ))}
        </div>
      </Section>

      {/* Category shortcuts */}
      <Section title="Shop by what you make">
        <div className="grid gap-4 sm:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/${category.id}`}
              className="group bg-surface ring-line hover:ring-line-bright relative overflow-hidden rounded-xl p-6 ring-1 transition-all hover:-translate-y-1"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-0.5"
                style={{ background: category.accentVar }}
              />
              <h3 className="font-display text-2xl">{category.name}</h3>
              <p className="text-muted mt-2 text-[14px]">{category.blurb}</p>
              <span className="text-dim group-hover:text-text mt-6 inline-block text-[14px] transition-colors">
                Browse{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* Bundle feature — the AOV driver. */}
      {vault && vault.bundleValue && (
        <section className="mx-auto max-w-[1440px] px-5 pt-20 sm:px-8">
          <Link
            href={`/products/${vault.slug}`}
            className="group ring-line hover:ring-line-bright relative block overflow-hidden rounded-2xl ring-1 transition-all"
          >
            <div className="grid lg:grid-cols-2">
              <div className="bg-surface relative aspect-[16/10] lg:aspect-auto lg:min-h-[380px]">
                <Image
                  src={vault.thumbnail}
                  alt={`${vault.title} preview`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[900ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-col justify-center p-7 sm:p-12">
                <span className="text-accent text-[12px] font-semibold tracking-wider uppercase">
                  Bundle
                </span>
                <h2 className="font-display mt-3 text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1]">
                  {vault.title}
                </h2>
                <p className="text-dim mt-4 text-[16px] leading-relaxed">
                  {vault.shortDescription}
                </p>
                <ul className="mt-6 space-y-1.5">
                  {vault.includedFiles.slice(0, 4).map((f) => (
                    <li key={f} className="text-muted text-[13px]">
                      {f.split(" — ")[0]}
                    </li>
                  ))}
                  <li className="text-muted text-[13px]">
                    + {vault.includedFiles.length - 4} more
                  </li>
                </ul>
                <div className="mt-7 flex items-baseline gap-3">
                  <span className="font-display text-4xl">
                    {formatPrice(vault.price)}
                  </span>
                  <span className="text-muted text-[15px]">
                    <s>${vault.bundleValue.toFixed(2)}</s> bought separately
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Under $10 — low-friction entry point. */}
      {cheap.length > 0 && (
        <Section
          title="Under $10"
          note="Cheap way to find out if the quality is real."
        >
          <div className="grid grid-cols-2 gap-x-5 gap-y-9 lg:grid-cols-4">
            {cheap.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Section>
      )}

      {/* Creator spotlight */}
      {frostify && (
        <Section title="The creator">
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
        </Section>
      )}

      {/* Frostoria — deliberately far from the purchase path. */}
      <Section title="Make stuff with people who care.">
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
      </Section>

      <Newsletter />
    </>
  );
}

function Section({
  title,
  note,
  action,
  className = "pt-20",
  children,
}: {
  title: string;
  note?: string;
  action?: { href: string; label: string };
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={`mx-auto max-w-[1440px] px-5 sm:px-8 ${className}`}>
      <div className="mb-7 flex items-end justify-between gap-6">
        <div>
          <h2 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.05]">
            {title}
          </h2>
          {note && <p className="text-muted mt-2 text-[14px]">{note}</p>}
        </div>
        {action && (
          <Link
            href={action.href}
            className="text-dim hover:text-text shrink-0 pb-1 text-[14px] transition-colors"
          >
            {action.label} →
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}
