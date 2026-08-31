import Image from "next/image";
import Link from "next/link";
import { ArtworkMarquee } from "@/components/ArtworkMarquee";
import { CategoryCard } from "@/components/CategoryCard";
import { Newsletter } from "@/components/Newsletter";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { TextTicker } from "@/components/TextTicker";
import {
  bundleContents,
  bundleTotal,
  categories,
  formatPrice,
  frostifyPicks,
  getProduct,
  newDrops,
  products,
  under,
} from "@/lib/products";
import { site } from "@/lib/site";

/**
 * The shop policy sign.
 *
 * Deliberately not written as marketing. These are the rules the shop runs by,
 * set apart from the sales copy the way a hand-lettered card sits in a shop
 * window — blunt, short, and answering the question a buyer actually has
 * rather than the one a landing page wants to answer.
 */
const policy = [
  {
    n: "01",
    rule: "Everything here is used, not just made.",
    detail:
      "If it does not survive real work, it does not go up. That is the whole filter.",
  },
  {
    n: "02",
    rule: "You buy the files, not access to them.",
    detail: "Download, keep, back up. No subscription, no expiry, no account.",
  },
  {
    n: "03",
    rule: "Commercial use is included.",
    detail:
      "Client work, sponsored videos, monetised channels. No per-project fee.",
  },
  {
    n: "04",
    rule: "The catalogue stays small on purpose.",
    detail: "A shop with ten good things beats a library with a thousand.",
  },
];

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

  /*
   * The Vault gets its own full-bleed section further down, so it is kept out
   * of every other shelf on this page. Without this it turned up four times
   * before a visitor had scrolled past the fold, which reads as a thin
   * catalogue padded out rather than a curated one.
   */
  const notVault = (p: (typeof products)[number]) => p.slug !== vault?.slug;

  /*
   * Each shelf claims its products, so nothing is shown twice on the way down
   * the page. A shop puts one thing in one place.
   */
  const shown = new Set<string>();
  const claim = <T extends { id: string }>(list: T[], limit?: number) => {
    const taken = list.filter((p) => !shown.has(p.id));
    const out = limit ? taken.slice(0, limit) : taken;
    out.forEach((p) => shown.add(p.id));
    return out;
  };

  /* The hero shows a real pack, not an illustration of one. */
  const windowPick = drops.filter(notVault)[0] ?? picks.filter(notVault)[0];
  if (windowPick) shown.add(windowPick.id);

  /* One lead, the rest at standard size. Importance decides the footprint. */
  const [leadDrop, ...restDrops] = claim(drops.filter(notVault), 3);

  /* Picks fill next, from whatever the drops shelf did not already take. */
  const pickShelf = claim(picks.filter(notVault), 3);

  /* The crate: free packs and everything under ten, browsed densely. */
  const crate = claim(
    [...free, ...cheap.filter((p) => !free.includes(p))].filter(notVault),
  );

  return (
    <>
      {/*
        Hero. Left-aligned and asymmetric against a real product, which is the
        deliberate opposite of the centred headline-subhead-two-buttons stack
        every software landing page ships with.
      */}
      <section className="shell rise-now pt-12 pb-4 sm:pt-20">
        <div className="grid items-end gap-x-16 gap-y-12 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <div className="rule-out text-muted mb-8">
              <span className="label shrink-0">
                SketchSets &mdash; by Frostify
              </span>
            </div>

            <h1 className="font-display-tight text-[clamp(2.75rem,7vw,6rem)] leading-[0.95]">
              <span className="rise-line">
                <span>Resources for</span>
              </span>
              <span className="rise-line">
                <span>people who make</span>
              </span>
              <span className="rise-line">
                <span className="font-display-italic">the internet.</span>
              </span>
            </h1>

            <p className="text-dim mt-8 max-w-[46ch] text-[17px] leading-relaxed">
              A small, hand-picked shop of presets, textures and creator tools.
              Everything here is something we actually reach for.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href="/new"
                className="bg-accent text-ink font-ui hover:bg-accent-dim px-8 py-4 text-[15px] transition-colors"
              >
                See what&rsquo;s new
              </Link>
              <Link
                href="/free"
                className="group text-text hover:text-accent text-[15px] font-medium transition-colors"
              >
                <span className="border-line group-hover:border-accent border-b pb-1 transition-colors">
                  Take something free
                </span>
              </Link>
            </div>

            {/* The shop's own index card, set in the technical voice. */}
            <dl className="border-line text-muted mt-12 flex flex-wrap gap-x-10 gap-y-3 border-t pt-6 font-mono text-[12px]">
              <div className="flex gap-2">
                <dt className="text-muted">PACKS</dt>
                <dd className="text-text">
                  {String(products.length).padStart(3, "0")}
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-muted">FREE</dt>
                <dd className="text-text">
                  {String(free.length).padStart(3, "0")}
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-muted">FROM</dt>
                <dd className="text-accent">{formatPrice(lowest)}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-muted">DELIVERY</dt>
                <dd className="text-text">INSTANT</dd>
              </div>
            </dl>
          </div>

          {/* Portrait crop, so it sits against the copy instead of under it. */}
          {windowPick && (
            <Link
              href={`/products/${windowPick.slug}`}
              className="group block focus-visible:outline-none"
            >
              <div className="border-line group-hover:border-line-bright relative aspect-[4/5] overflow-hidden border transition-colors duration-500">
                <Image
                  src={windowPick.thumbnail}
                  alt={`${windowPick.title} preview`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  priority
                  className="object-cover transition-transform duration-[1100ms] ease-[var(--ease-glide)] group-hover:scale-[1.03]"
                />
              </div>
              <div className="border-line mt-3 flex items-baseline justify-between gap-4 border-t pt-2.5">
                <span className="label text-muted">
                  {windowPick.setNumber} &mdash; In the window
                </span>
                <span className="text-dim font-mono text-[13px]">
                  {windowPick.price === 0 ? "FREE" : formatPrice(windowPick.price)}
                </span>
              </div>
              <h2 className="font-display group-hover:text-accent mt-1.5 text-[1.5rem] leading-tight transition-colors">
                {windowPick.title}
              </h2>
            </Link>
          )}
        </div>
      </section>

      <div className="section-gap-sm">
        <ArtworkMarquee products={products} />
      </div>

      {/*
        New drops. One lead at nearly double the width of the rest, because a
        grid of identically sized tiles is the tell the brief called out.
      */}
      {leadDrop && (
        <section className="shell section-gap">
          <SectionHeader
            marker="01 / Just landed"
            title="New on the shelves"
            action={{ href: "/new", label: "Everything new" }}
          />
          <div className="grid gap-x-8 gap-y-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <ProductCard product={leadDrop} priority size="lead" />
            </Reveal>
            <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:col-span-5 lg:content-start">
              {restDrops.slice(0, 2).map((product, i) => (
                <Reveal key={product.id} delay={(i + 1) * 90}>
                  <ProductCard product={product} priority size="standard" />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/*
        Rooms. The middle one drops out of alignment on wide screens so the row
        reads as a plan of a shop rather than three equal feature cards.
      */}
      <section className="shell section-gap">
        <SectionHeader
          marker="02 / The floor plan"
          title="Three rooms, nothing filler"
          note="Each part of the shop is stocked and styled on its own terms. Walk into whichever one matches what you are making."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((c, i) => (
            <Reveal
              key={c.id}
              delay={i * 90}
              className={i === 1 ? "md:mt-14" : i === 2 ? "md:mt-7" : ""}
            >
              <CategoryCard category={c} index={i + 1} />
            </Reveal>
          ))}
        </div>
      </section>

      {/*
        The Vault. Structurally unlike every other block on the page: full
        bleed, split, and it lists its contents as a ruled index rather than a
        row of logos. It is a bundle deal in a shop, not a pricing tier.
      */}
      {vault && vaultContents.length > 0 && (
        <section className="section-gap">
          <Reveal>
            <div className="border-line bg-surface grid-lines crop-marks relative border-y">
              <div className="shell grid gap-x-16 gap-y-12 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:py-24">
                <div className="lg:sticky lg:top-28 lg:self-start">
                  <span className="label text-accent">
                    {vault.setNumber} &mdash; The complete library
                  </span>
                  <h2 className="font-display-tight mt-6 text-[clamp(2.5rem,6vw,5rem)] leading-[0.94]">
                    The Vault
                  </h2>
                  <p className="text-dim mt-6 max-w-[42ch] text-[17px] leading-relaxed">
                    Every pack in the shop, in one download. Buy it once and the
                    whole catalogue is yours &mdash; including the ones already
                    on your list.
                  </p>

                  <div className="border-line mt-10 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t pt-8">
                    <span className="font-display text-accent text-[clamp(3rem,6vw,4.5rem)] leading-none">
                      {formatPrice(vault.price)}
                    </span>
                    <span className="text-muted font-mono text-[13px]">
                      <s>${vaultTotal.toFixed(2)}</s> bought separately
                    </span>
                  </div>
                  <p className="text-dim mt-3 font-mono text-[13px]">
                    You keep ${saving.toFixed(2)} &mdash;{" "}
                    {Math.round((saving / vaultTotal) * 100)}% off the shelf
                    price.
                  </p>

                  <Link
                    href={`/products/${vault.slug}`}
                    className="bg-accent text-ink font-ui hover:bg-accent-dim mt-9 inline-block px-8 py-4 text-[16px] transition-colors"
                  >
                    Open the Vault
                  </Link>
                </div>

                {/* Contents as a ruled index — a track listing, not a logo strip. */}
                <div>
                  <div className="rule-out text-muted mb-2">
                    <span className="label shrink-0">
                      Contents &mdash; {vaultContents.length} packs
                    </span>
                  </div>
                  <ul>
                    {vaultContents.map((p) => (
                      <li key={p.id}>
                        <Link
                          href={`/products/${p.slug}`}
                          className="group border-line hover:bg-elevated flex items-center gap-4 border-b py-3.5 transition-colors sm:gap-6"
                        >
                          <span className="text-muted group-hover:text-accent w-8 shrink-0 font-mono text-[12px] transition-colors">
                            {p.setNumber}
                          </span>
                          <span className="bg-elevated border-line relative hidden h-11 w-16 shrink-0 overflow-hidden border sm:block">
                            <Image
                              src={p.thumbnail}
                              alt=""
                              aria-hidden="true"
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          </span>
                          <span className="font-display group-hover:text-accent min-w-0 flex-1 truncate text-[1.125rem] transition-colors">
                            {p.title}
                          </span>
                          <span className="text-muted shrink-0 font-mono text-[12.5px]">
                            {formatPrice(p.price)}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* Picks: three at standard size, given room to breathe. */}
      {pickShelf.length > 0 && (
        <section className="shell section-gap">
          <SectionHeader
            marker="03 / Chosen by hand"
            title="What we would grab first"
            action={{ href: "/browse", label: "See everything" }}
          />
          <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {pickShelf.map((product, i) => (
              <Reveal key={product.id} delay={i * 90}>
                <ProductCard product={product} size="standard" />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/*
        The crate. Free packs and everything under ten, browsed densely and at
        small size — the bargain bin you flick through, not a feature grid.
      */}
      {crate.length > 0 && (
        <section className="shell section-gap">
          <SectionHeader
            marker="04 / The crate"
            title="Cheap, free, and still worth it"
            note={`${free.length} free packs and everything under $10, in one place.`}
            action={{ href: "/free", label: "Just the free ones" }}
          />
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
            {crate.map((product, i) => (
              <Reveal key={product.id} delay={Math.min(i, 5) * 70}>
                <ProductCard product={product} size="compact" />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <div className="section-gap">
        <TextTicker text="Instant download · Yours to keep · Commercial use included · No subscription" />
      </div>

      {/*
        Shop policy. Sits apart from the sales copy on purpose — this is the
        card in the window, not another feature block.
      */}
      <section className="shell section-gap">
        <Reveal>
          <div className="border-line border-t pt-10">
            <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <span className="label text-muted">05 / Shop policy</span>
                <h2 className="font-display-tight mt-5 max-w-[12ch] text-[clamp(2rem,4vw,3.25rem)] leading-[1.0]">
                  How we run this
                </h2>
              </div>

              <ul>
                {policy.map((p) => (
                  <li
                    key={p.n}
                    className="border-line grid grid-cols-[2.5rem_1fr] gap-x-4 border-b py-6 first:border-t sm:gap-x-8"
                  >
                    <span className="text-muted pt-1 font-mono text-[12px]">
                      {p.n}
                    </span>
                    <div>
                      <p className="font-display text-[clamp(1.25rem,2.2vw,1.625rem)] leading-snug">
                        {p.rule}
                      </p>
                      <p className="text-dim mt-2 max-w-[56ch] text-[15px] leading-relaxed">
                        {p.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Common questions, kept plain. */}
      <section className="shell section-gap">
        <Reveal>
          <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <span className="label text-muted">06 / Before you buy</span>
              <h2 className="font-display-tight mt-5 max-w-[14ch] text-[clamp(1.875rem,3.4vw,2.75rem)] leading-[1.02]">
                The usual questions
              </h2>
              <Link
                href="/support"
                className="group text-text hover:text-accent mt-6 inline-block text-[14px] font-medium transition-colors"
              >
                <span className="border-line group-hover:border-accent border-b pb-1 transition-colors">
                  Read the full support page
                </span>
              </Link>
            </div>
            <dl>
              {faqs.map((item) => (
                <div
                  key={item.q}
                  className="border-line border-t py-6 last:border-b"
                >
                  <dt className="font-display text-[1.25rem] leading-snug">
                    {item.q}
                  </dt>
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
          <div className="border-line flex flex-col gap-6 border p-8 sm:flex-row sm:items-center sm:justify-between sm:p-12">
            <div className="max-w-lg">
              <span className="label text-muted">The other side of it</span>
              <h2 className="font-display mt-4 text-[clamp(1.625rem,2.8vw,2.25rem)] leading-[1.08]">
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
              className="border-line hover:border-accent hover:text-accent font-ui shrink-0 border px-7 py-4 text-center text-[15px] transition-colors"
            >
              Join Frostoria &#8599;
            </a>
          </div>
        </Reveal>
      </section>

      <Newsletter />
    </>
  );
}
