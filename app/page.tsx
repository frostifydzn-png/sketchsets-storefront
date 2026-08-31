import Link from "next/link";
import { CategoryCard } from "@/components/CategoryCard";
import { HeroStack } from "@/components/HeroStack";
import { LabelPanel } from "@/components/LabelPanel";
import { ProductCard } from "@/components/ProductCard";
import { ShelfPanel } from "@/components/ShelfPanel";
import { VaultPanel } from "@/components/VaultPanel";
import {
  categories,
  frostifyPicks,
  getProduct,
  products,
  under,
} from "@/lib/products";
import { site } from "@/lib/site";

/*
 * What every purchase includes. These are facts about how the shop works, not
 * badges — each one is true of every product in the catalogue today.
 */
const assurances = [
  { label: "Instant downloads", icon: "bolt" },
  { label: "Commercial license", icon: "shield" },
  { label: "One-time payments", icon: "card" },
  { label: "Secure checkout", icon: "lock" },
] as const;

const frostoriaPerks = [
  "Share your work",
  "Get feedback",
  "Find collaborators",
  "Exclusive drops & more",
];

export default function HomePage() {
  const vault = getProduct("sketchsets-vault");
  const free = products.filter((p) => p.price === 0);
  const cheap = under(10).filter((p) => p.price > 0);

  /* The Vault has its own panel, so it stays off every other shelf. */
  const notVault = (p: (typeof products)[number]) => p.slug !== vault?.slug;
  const picks = frostifyPicks().filter(notVault);

  /* The fan leads with the covers that read best at a glance. */
  const fan = [
    getProduct("leaks-and-glows"),
    getProduct("speedlines"),
    getProduct("hand-drawn-doodles"),
    getProduct("paper-tears"),
  ].filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="shell stack-bottom">
      {/*
        Hero sits on the bare page rather than inside a panel, so the stack of
        panels below it reads as the shop proper starting.
      */}
      <section className="grid items-center gap-10 pt-10 pb-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12 lg:pt-14 lg:pb-20">
        <div>
          <span className="border-accent/35 bg-accent/10 text-accent inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[11px] font-bold tracking-[0.08em] uppercase">
            &#9733; Curated by {site.parent}
          </span>

          <h1 className="line-rise mt-6 text-[clamp(2.5rem,5.6vw,4.25rem)] leading-[1.04] font-extrabold tracking-[-0.03em]">
            <span>Resources for</span>
            <span>people who make</span>
            <span className="grad-text">the internet.</span>
          </h1>

          <p className="text-dim mt-5 max-w-[44ch] text-[16.5px] leading-relaxed">
            Presets, assets and creator tools curated for editors, thumbnail
            designers and creators.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/browse" className="btn-primary px-7 py-3.5 text-[15px]">
              Browse SketchSets
              <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link href="/free" className="btn-ghost px-7 py-3.5 text-[15px]">
              Start with a freebie
            </Link>
          </div>

          <ul className="mt-9 flex flex-wrap gap-x-5 gap-y-2.5">
            {assurances.map((a) => (
              <li
                key={a.label}
                className="text-dim flex items-center gap-1.5 text-[12.5px] whitespace-nowrap"
              >
                <span className="text-accent">
                  <AssuranceIcon name={a.icon} />
                </span>
                {a.label}
              </li>
            ))}
          </ul>
        </div>

        <HeroStack products={fan} />
      </section>

      <div className="stack">
        {picks.length > 0 && (
          <ShelfPanel
            title={`${site.parent} Picks`}
            description={`The packs ${site.parent} actually reaches for.`}
            icon={<StarIcon />}
          >
            {picks.map((product, i) => (
              <div key={product.id} className="w-[15rem] sm:w-[16.5rem]">
                <ProductCard product={product} priority={i < 3} />
              </div>
            ))}
          </ShelfPanel>
        )}

        <LabelPanel
          title="Browse categories"
          description="Find exactly what you need."
        >
          <div className="grid gap-4 md:grid-cols-3">
            {categories.map((c) => (
              <CategoryCard key={c.id} category={c} />
            ))}
          </div>
        </LabelPanel>

        {vault && <VaultPanel vault={vault} />}

        {free.length > 0 && (
          <ShelfPanel
            title="Free downloads"
            description="Real packs, not trials. Take them and see whether the quality holds up."
            action={{ href: "/free", label: "View all freebies" }}
          >
            {free.map((product) => (
              <div key={product.id} className="w-[15rem] sm:w-[16.5rem]">
                <ProductCard product={product} />
              </div>
            ))}
          </ShelfPanel>
        )}

        {cheap.length > 0 && (
          <ShelfPanel
            title="Under $10"
            description="Quality resources without emptying your wallet."
            action={{ href: "/browse", label: "View all under $10" }}
          >
            {cheap.map((product) => (
              <div key={product.id} className="w-[15rem] sm:w-[16.5rem]">
                <ProductCard product={product} />
              </div>
            ))}
          </ShelfPanel>
        )}

        {/* Frostoria last, so the community never competes with the shop. */}
        <section className="panel relative overflow-hidden">
          <div
            aria-hidden="true"
            className="glow-violet pointer-events-none absolute -top-1/3 left-1/4 h-[160%] w-[50%]"
          />
          <div className="relative grid items-center gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] lg:gap-10">
            <div>
              <h2 className="flex items-center gap-2 text-[15px] font-extrabold tracking-[0.06em] text-white uppercase">
                <SparkIcon />
                Frostoria
              </h2>
              <p className="mt-4 text-[clamp(1.375rem,2.6vw,1.75rem)] leading-[1.15] font-extrabold text-white">
                Make stuff with
                <br />
                people who care.
              </p>
              <p className="text-dim mt-3 max-w-[36ch] text-[14px] leading-relaxed">
                Join editors, thumbnail designers and creators inside Frostoria.
              </p>
            </div>

            <ul className="grid gap-2.5">
              {frostoriaPerks.map((perk) => (
                <li
                  key={perk}
                  className="text-dim flex items-center gap-2.5 text-[14px]"
                >
                  <span className="text-accent shrink-0">
                    <SparkIcon />
                  </span>
                  {perk}
                </li>
              ))}
            </ul>

            <div className="lg:text-center">
              <a
                href={site.links.frostoria}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-7 py-3.5 text-[15px]"
              >
                <DiscordIcon />
                Join Frostoria
              </a>
              <p className="text-muted mt-3 text-[11px] font-semibold tracking-[0.08em] uppercase lg:text-center">
                Discord community
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ---------- glyphs ---------- */

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function AssuranceIcon({ name }: { name: (typeof assurances)[number]["icon"] }) {
  const common = { width: 15, height: 15, viewBox: "0 0 16 16", "aria-hidden": true };
  if (name === "bolt")
    return (
      <svg {...common} {...stroke}>
        <path d="M9 1.5 3.5 9H8l-1 5.5L12.5 7H8z" />
      </svg>
    );
  if (name === "shield")
    return (
      <svg {...common} {...stroke}>
        <path d="M8 1.5 13 3.5v4c0 3.2-2.1 6-5 7-2.9-1-5-3.8-5-7v-4z" />
        <path d="m6 7.8 1.5 1.5L10.5 6" />
      </svg>
    );
  if (name === "card")
    return (
      <svg {...common} {...stroke}>
        <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" />
        <path d="M1.5 6.5h13" />
      </svg>
    );
  return (
    <svg {...common} {...stroke}>
      <rect x="3" y="7" width="10" height="7" rx="1.5" />
      <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true" {...stroke}>
      <path d="m8 1.8 1.9 3.9 4.3.6-3.1 3 .7 4.3L8 11.6l-3.8 2 .7-4.3-3.1-3 4.3-.6z" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true" {...stroke}>
      <path d="M8 2v12M2 8h12M4 4l8 8M12 4l-8 8" />
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.3 4.6A19 19 0 0 0 15.6 3l-.3.5a13 13 0 0 1 4.1 2 15.6 15.6 0 0 0-13.4-.5c.4-.3.9-.6 1.4-.9a13 13 0 0 1 1.9-.7L9 3a19 19 0 0 0-4.7 1.6C1.4 9 .6 13.2 1 17.4a19 19 0 0 0 5.7 2.9l1.2-1.7a12 12 0 0 1-1.9-.9l.5-.4a13.6 13.6 0 0 0 11.6 0l.5.4a12 12 0 0 1-1.9.9l1.2 1.7a19 19 0 0 0 5.7-2.9c.5-4.9-.8-9-3.3-12.8ZM8.3 15c-1.1 0-2-1-2-2.3s.9-2.3 2-2.3 2 1 2 2.3-.9 2.3-2 2.3Zm7.4 0c-1.1 0-2-1-2-2.3s.9-2.3 2-2.3 2 1 2 2.3-.9 2.3-2 2.3Z" />
    </svg>
  );
}
