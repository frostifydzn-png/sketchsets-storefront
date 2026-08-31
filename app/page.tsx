import Image from "next/image";
import Link from "next/link";
import { Newsletter } from "@/components/Newsletter";
import { Reveal } from "@/components/Reveal";
import { ShopGrid } from "@/components/ShopGrid";
import {
  bundleContents,
  bundleTotal,
  formatPrice,
  getProduct,
  products,
} from "@/lib/products";
import { site } from "@/lib/site";

const trustPoints = [
  "Instant download",
  "Commercial licence",
  "One-time purchase",
  "Curated by Frostify",
];

/* The questions people actually arrive with. */
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
  const free = products.filter((p) => p.price === 0);
  const lowest = Math.min(
    ...products.filter((p) => p.price > 0).map((p) => p.price),
  );

  const vaultContents = vault ? bundleContents(vault) : [];
  const vaultTotal = vault ? bundleTotal(vault) : 0;
  const saving = vault ? vaultTotal - vault.price : 0;

  return (
    <>
      {/*
        Compact hero. Kept deliberately short so the catalogue itself is the
        first substantial thing on the page rather than a screen of brand copy.
      */}
      <section className="shell pt-16 pb-14 sm:pt-24 sm:pb-16">
        <div className="max-w-3xl">
          <h1 className="font-display-tight text-[clamp(2.5rem,6.4vw,4.75rem)] leading-[1]">
            Resources for people who make the internet.
          </h1>
          <p className="text-dim mt-6 max-w-xl text-[17px] leading-relaxed sm:text-[18px]">
            Presets, assets and creator tools, curated for editors, thumbnail
            designers and people making stuff online.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-3">
            <Link
              href="#shop"
              className="bg-accent text-ink rounded-full px-7 py-3.5 text-[15px] font-bold transition-transform hover:scale-[1.02]"
            >
              Browse the shop
            </Link>
            <Link
              href="/free"
              className="border-line hover:border-line-bright hover:bg-elevated rounded-full border px-7 py-3.5 text-[15px] font-semibold transition-colors"
            >
              Start free
            </Link>
            <p className="text-muted ml-1 text-[14px]">
              {products.length} packs · {free.length} free · from{" "}
              {formatPrice(lowest)}
            </p>
          </div>
        </div>
      </section>

      {/* The shop. Everything, one click away, filtered without navigating. */}
      <section id="shop" className="shell scroll-mt-24">
        <ShopGrid products={products} />
      </section>

      {/* The bundle */}
      {vault && vaultContents.length > 0 && (
        <section className="shell section-gap">
          <Reveal>
            <Link
              href={`/products/${vault.slug}`}
              className="group bg-surface ring-line hover:ring-line-bright block overflow-hidden rounded-3xl ring-1 transition-all"
            >
              <div className="grid items-center gap-8 p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:gap-16 lg:p-12">
                <div>
                  <p className="text-accent text-[13px] font-semibold">
                    Best value
                  </p>
                  <h2 className="font-display mt-2 text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.05]">
                    {vault.title}
                  </h2>
                  <p className="text-dim mt-3 max-w-lg text-[16px] leading-relaxed">
                    All {vaultContents.length} packs in one download. Everything
                    in Collection V1, bought once.
                  </p>

                  <ul className="mt-7 flex flex-wrap gap-2">
                    {vaultContents.map((p) => (
                      <li
                        key={p.id}
                        title={p.title}
                        className="bg-elevated relative h-12 w-16 overflow-hidden rounded-md sm:h-14 sm:w-20"
                      >
                        <Image
                          src={p.thumbnail}
                          alt={p.title}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:text-right">
                  <p className="font-display text-accent text-[3rem] leading-none">
                    {formatPrice(vault.price)}
                  </p>
                  <p className="text-muted mt-2 text-[15px]">
                    <s>${vaultTotal.toFixed(2)}</s> separately
                  </p>
                  <p className="text-accent mt-1 text-[15px] font-bold">
                    Save ${saving.toFixed(2)} ·{" "}
                    {Math.round((saving / vaultTotal) * 100)}%
                  </p>
                  <span className="bg-accent text-ink mt-6 inline-block rounded-full px-6 py-3.5 text-[15px] font-bold transition-transform group-hover:scale-[1.02]">
                    Explore the Vault
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        </section>
      )}

      {/* How it works, kept to three answers and a trust line. */}
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

          <ul className="text-muted mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13.5px]">
            {trustPoints.map((point, i) => (
              <li key={point} className="flex items-center gap-3">
                {i > 0 && (
                  <span aria-hidden="true" className="bg-line h-3 w-px" />
                )}
                {point}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Community, last, so it never competes with the shop. */}
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
