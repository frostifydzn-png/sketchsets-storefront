import Image from "next/image";
import Link from "next/link";
import { bundleContents, bundleTotal, formatPrice } from "@/lib/products";
import type { Product } from "@/lib/products";

/**
 * The Vault, given a panel of its own.
 *
 * Structurally unlike every other block on the page: cover art at full height
 * on the left, the pitch in the middle, and the money laid out on the right as
 * three columns — what the packs cost apart, what they cost together, and the
 * difference. Every figure is computed from real member prices, so the saving
 * can never drift out of step with the catalogue.
 */
export function VaultPanel({ vault }: { vault: Product }) {
  const contents = bundleContents(vault);
  if (contents.length === 0) return null;

  const total = bundleTotal(vault);
  const saving = total - vault.price;
  const percent = Math.round((saving / total) * 100);

  return (
    <section className="panel relative overflow-hidden">
      <div
        aria-hidden="true"
        className="glow-violet pointer-events-none absolute -top-1/4 -left-[10%] h-[150%] w-[55%]"
      />
      <div
        aria-hidden="true"
        className="glow-pink pointer-events-none absolute -right-[5%] -bottom-1/2 h-[140%] w-[45%]"
      />

      <div className="relative grid items-center gap-7 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.25fr)_minmax(0,1.15fr)] lg:gap-9">
        <div className="border-line-bright bg-raised relative aspect-[4/3] overflow-hidden rounded-2xl border">
          <Image
            src={vault.thumbnail}
            alt={`${vault.title} cover`}
            fill
            sizes="(max-width: 1024px) 100vw, 30vw"
            className="object-cover"
          />
        </div>

        <div>
          <span className="border-accent/40 bg-accent/10 text-accent inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold tracking-wide uppercase">
            &#9733; Best value
          </span>

          <h2 className="grad-text mt-4 text-[clamp(2rem,4.5vw,3rem)] leading-[1.02] font-extrabold tracking-tight uppercase">
            The Vault
          </h2>
          <p className="mt-2 text-[17px] font-bold text-white">
            {contents.length} creator packs. One download.
          </p>
          <p className="text-dim mt-3 max-w-[40ch] text-[14.5px] leading-relaxed">
            Every pack in the shop, bought once. Includes the ones already on
            your list, and everything stays yours to keep.
          </p>
        </div>

        <div>
          <div className="flex flex-wrap items-end gap-x-8 gap-y-5">
            <div>
              <p className="text-dim text-[19px] font-semibold line-through">
                ${total.toFixed(2)}
              </p>
              <p className="text-muted mt-1 text-[11.5px] leading-tight">
                if purchased
                <br />
                separately
              </p>
            </div>

            <div className="border-line border-l pl-8">
              <p className="text-[clamp(2.5rem,5vw,3.5rem)] leading-none font-extrabold text-white">
                {formatPrice(vault.price)}
              </p>
              <p className="text-muted mt-1.5 text-[11px] font-semibold tracking-[0.08em] uppercase">
                One-time payment
              </p>
            </div>

            <div>
              <p className="text-accent text-[19px] leading-tight font-extrabold">
                SAVE
                <br />${saving.toFixed(2)}
                <br />
                {percent}%
              </p>
            </div>
          </div>

          <Link
            href={`/products/${vault.slug}`}
            className="btn-primary mt-7 px-7 py-3.5 text-[15px]"
          >
            Explore The Vault
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
