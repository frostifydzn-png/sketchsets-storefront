import Image from "next/image";
import Link from "next/link";
import { bundleContents, bundleTotal, formatPrice } from "@/lib/products";
import type { Product } from "@/lib/products";

/**
 * The Vault.
 *
 * Cover art on one side, the offer on the other, separated from the rest of
 * the page by space and a single hairline rather than by a bordered card. The
 * three-column price comparison it used to carry has collapsed into one line
 * of plain English — a shop says "$29, saving you $16.95", not a metrics row.
 *
 * Every figure is computed from real member prices, so the saving can never
 * drift out of step with the catalogue.
 */
export function VaultPanel({ vault }: { vault: Product }) {
  const contents = bundleContents(vault);
  if (contents.length === 0) return null;

  const total = bundleTotal(vault);
  const saving = total - vault.price;

  return (
    <section className="section-gap">
      <div className="border-line border-t pt-14 sm:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="bg-elevated relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image
              src={vault.thumbnail}
              alt={`${vault.title} cover`}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>

          <div>
            <p className="text-accent text-[13px] font-semibold">
              The whole catalogue
            </p>

            <h2 className="mt-3 text-[clamp(2rem,4vw,3rem)] leading-[1.05] font-bold tracking-[-0.03em] text-white">
              The Vault
            </h2>

            <p className="text-dim mt-5 max-w-[44ch] text-[16.5px] leading-relaxed">
              All {contents.length} packs in one download, bought once. Includes
              the ones already on your list, and everything stays yours to keep.
            </p>

            <p className="mt-8 text-[17px] text-white">
              <span className="text-[2rem] font-bold tracking-[-0.02em]">
                {formatPrice(vault.price)}
              </span>{" "}
              <span className="text-muted">
                instead of ${total.toFixed(2)} separately, saving you $
                {saving.toFixed(2)}.
              </span>
            </p>

            <Link
              href={`/products/${vault.slug}`}
              className="btn-primary mt-8 px-7 py-3.5 text-[15px]"
            >
              See what&rsquo;s inside
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
