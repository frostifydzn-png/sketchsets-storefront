"use client";

import { useState } from "react";
import { formatPrice, licenceTiers, type Product } from "@/lib/products";
import { checkoutFor, checkoutUrl, payhipPage } from "@/lib/site";

/**
 * Licence selector and purchase card.
 *
 * A tier only points somewhere different once it has its own payhipId, since
 * Payhip prices one listing at one price. Until then every tier resolves to the
 * product's base checkout, and the card says so rather than implying a price
 * the checkout will not honour.
 */
export function LicencePicker({ product }: { product: Product }) {
  const tiers = licenceTiers(product);
  const [selected, setSelected] = useState(
    tiers.find((t) => t.recommended)?.id ?? tiers[0]?.id,
  );

  const tier = tiers.find((t) => t.id === selected);
  const base = checkoutFor(product);
  const href = tier?.payhipId ? checkoutUrl(tier.payhipId) : base.href;
  const total = tier && tier.payhipId ? tier.price : product.price;
  const tiersWired = tiers.every((t) => t.payhipId);

  return (
    <div className="bg-surface ring-line rounded-2xl p-6 ring-1 sm:p-7">
      {tiers.length > 0 && (
        <>
          <p className="text-muted text-center text-[12px] font-semibold tracking-wider uppercase">
            Licence options
          </p>
          <a
            href={payhipPage("license")}
            className="text-accent mx-auto mt-1 block text-center text-[13px] hover:underline"
          >
            Learn more
          </a>

          <fieldset className="border-line mt-5 border-t pt-5">
            <legend className="sr-only">Choose a licence</legend>
            {tiers.map((t) => (
              <label
                key={t.id}
                className="hover:bg-elevated -mx-2 flex cursor-pointer gap-3 rounded-lg px-2 py-2.5 transition-colors"
              >
                <input
                  type="radio"
                  name="licence"
                  value={t.id}
                  checked={selected === t.id}
                  onChange={() => setSelected(t.id)}
                  className="accent-accent mt-1 shrink-0"
                />
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="text-text text-[15px] font-semibold">
                      {t.label}
                    </span>
                    {t.recommended && (
                      <span className="bg-accent/15 text-accent rounded px-1.5 py-0.5 text-[10px] font-bold tracking-wide uppercase">
                        Recommended
                      </span>
                    )}
                    <span className="text-muted ml-auto font-mono text-[14px]">
                      {formatPrice(t.price)}
                    </span>
                  </span>
                  <span className="text-muted mt-0.5 block text-[13px] leading-relaxed">
                    {t.blurb}
                  </span>
                </span>
              </label>
            ))}
          </fieldset>
        </>
      )}

      <div className="border-line mt-5 flex items-baseline justify-between gap-4 border-t pt-5">
        <span className="text-muted text-[12px] font-semibold tracking-wider uppercase">
          Total price
        </span>
        <span className="font-display text-[2.25rem] leading-none">
          {formatPrice(total)}
        </span>
      </div>

      <a
        id="buy-button"
        href={href}
        className={`bg-accent text-ink mt-5 block rounded-xl px-6 py-4 text-center text-[16px] font-bold transition-transform hover:scale-[1.015] active:scale-[0.99] ${
          base.overlay ? "lemonsqueezy-button" : ""
        }`}
      >
        {product.price === 0 ? "Get it free" : "Get the pack"}
      </a>

      <p className="text-muted mt-3.5 text-center text-[13px]">
        Secure checkout via {base.overlay ? "Lemon Squeezy" : "Payhip"}
      </p>

      {tiers.length > 0 && !tiersWired && (
        <p className="text-muted border-line mt-4 border-t pt-4 text-center text-[12px] leading-relaxed">
          Every licence currently checks out at {formatPrice(product.price)}{" "}
          under the commercial terms. Separate tier pricing goes live once each
          tier has its own listing.
        </p>
      )}
    </div>
  );
}
