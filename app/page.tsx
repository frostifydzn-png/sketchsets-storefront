import Link from "next/link";
import { ShopBrowser } from "@/components/ShopBrowser";
import { SoftwareRow } from "@/components/SoftwareRow";
import { VaultPanel } from "@/components/VaultPanel";
import { totalAssets } from "@/lib/catalog";
import { getProduct, products } from "@/lib/products";
import { site } from "@/lib/site";

/**
 * The home page IS the shop.
 *
 * THIS IS THE CHANGE EVERY PREVIOUS PASS AVOIDED. The page had been a landing
 * page with product shelves hung off it — a full-height hero, a fan of cover
 * art, then Picks, then Free, then Under $10, each with its own heading, its
 * own explanatory sentence and seventy-odd pixels of air around it. Ten
 * products spread down 4,400px, the same covers reappearing under different
 * headings, and no way to search or narrow anything without leaving for
 * /browse.
 *
 * That is the shape of a brochure for a shop. A marketplace puts the catalogue
 * on the front door: you land on stock, with the controls to cut it down
 * sitting beside it. That is the difference between a store and a portfolio
 * with prices on, and it is what was actually being asked for each time the
 * page came back feeling the same after another round of restyling — the
 * styling was never the problem.
 *
 * So the hero collapses to a band — who this is for, what it opens in — and
 * ShopBrowser takes the rest, with its search, category rail, special
 * collections and sort all live on arrival. The shelves are gone because the
 * grid replaces them, and a filter is a better shelf than a heading: it
 * answers what the visitor came for rather than what we decided to promote.
 *
 * The Vault keeps a block below the grid, because it is the one product that
 * has to be explained rather than browsed.
 */
export default function HomePage() {
  const vault = getProduct("sketchsets-vault");

  return (
    <div className="shell page-bottom">
      {/*
        A BAND, NOT A HERO. This was a 5.25rem headline, a lede, two buttons
        and a fan of four cover images, and it owned the entire first screen of
        a shop — where the first screen should be stock. Those covers were the
        best argument on the page and every one of them is still here, a few
        hundred pixels down, in the grid, where they are also buyable.
      */}
      <section className="border-line flex flex-wrap items-end justify-between gap-x-12 gap-y-5 border-b pt-8 pb-7 sm:pt-10">
        <div className="min-w-0">
          <p className="set-no text-muted">
            Sets 000&ndash;007 &middot;{" "}
            <span className="tabular-nums">{totalAssets()}</span> assets
          </p>

          <h1 className="display-section text-text mt-2.5 max-w-[24ch]">
            Every pack shipped on a real video first.
          </h1>

          <p className="text-dim mt-3 max-w-[56ch] text-[15.5px] leading-relaxed">
            Textures, overlays and brushes for thumbnail designers and editors
            &mdash; built for client work, then packaged properly.
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-3 sm:items-end">
          <Link href="/free" className="btn-ghost px-5 py-2.5 text-[14px]">
            Start with a freebie
          </Link>
          <SoftwareRow className="max-w-[40ch] sm:text-right" />
        </div>
      </section>

      <ShopBrowser products={products} />

      {vault && <VaultPanel vault={vault} />}

      {/* Frostoria last, so the community never competes with the shop. */}
      <section className="shelf-gap">
        <div className="border-line flex flex-col gap-6 border-t pt-12 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-lg">
            <p className="set-no text-muted">The other side of it</p>
            <h2 className="display-section text-text mt-2.5">
              Make stuff with people who care.
            </h2>
            <p className="text-dim mt-3.5 text-[15.5px] leading-relaxed">
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
