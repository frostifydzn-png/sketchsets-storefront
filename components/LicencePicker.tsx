"use client";

import { useState } from "react";
import { formatPrice, licenceTiers, type Product } from "@/lib/products";
import { checkoutFor, checkoutUrl, payhipPage } from "@/lib/site";

/**
 * Licence selector and purchase panel.
 *
 * Set as a ruled list rather than a row of boxed options on purpose: three
 * bordered tiles side by side is a SaaS plan comparison, and this is a shop
 * counter. Same choice, none of the Basic/Pro/Premium furniture — the rows
 * read as lines on an order form, with every price in the technical voice.
 *
 * A tier only points somewhere different once it has its own payhipId, since
 * Payhip prices one listing at one price. Until then every tier resolves to the
 * product's base checkout, and the panel says so rather than implying a price
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
    <div className="border-line bg-surface rounded-2xl border p-6 sm:p-7">
      {tiers.length > 0 && (
        <>
          <div className="rule-out text-muted">
            <span className="label shrink-0">Licence</span>
          </div>

          <fieldset className="mt-4">
            <legend className="sr-only">Choose a licence</legend>
            {tiers.map((t) => {
              const active = selected === t.id;
              return (
                <label
                  key={t.id}
                  className={`mt-2 flex cursor-pointer gap-3 rounded-xl border p-3.5 transition-colors first:mt-0 ${
                    active
                      ? "border-accent/60 bg-accent/10"
                      : "border-line hover:border-line-bright hover:bg-elevated"
                  }`}
                >
                  <input
                    type="radio"
                    name="licence"
                    value={t.id}
                    checked={active}
                    onChange={() => setSelected(t.id)}
                    className="accent-accent mt-1 shrink-0"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-baseline gap-x-2.5">
                      <span
                        className={`font-extrabold tracking-[-0.02em] text-[1.125rem] leading-none ${
                          active ? "text-accent" : "text-text"
                        }`}
                      >
                        {t.label}
                      </span>
                      {t.recommended && (
                        <span className="label-sm text-muted">Most bought</span>
                      )}
                      <span className="text-dim ml-auto text-[13px]">
                        {formatPrice(t.price)}
                      </span>
                    </span>
                    <span className="text-muted mt-1 block text-[13px] leading-relaxed">
                      {t.blurb}
                    </span>
                  </span>
                </label>
              );
            })}
          </fieldset>

          <a
            href={payhipPage("license")}
            className="text-muted hover:text-accent mt-3 inline-block text-[12px] transition-colors"
          >
            Read the full licence &rarr;
          </a>
        </>
      )}

      <div className="border-line mt-6 flex items-baseline justify-between gap-4 border-t pt-6">
        <span className="label text-muted">Total</span>
        <span className="font-extrabold tracking-[-0.02em] text-[2.5rem] leading-none">
          {formatPrice(total)}
        </span>
      </div>

      <a
        id="buy-button"
        href={href}
        className={`btn-primary mt-5 w-full px-6 py-4 text-[16px] ${
          base.overlay ? "lemonsqueezy-button" : ""
        }`}
      >
        {product.price === 0 ? "Get it free" : "Get the pack"}
      </a>

      <p className="text-muted mt-3.5 text-center text-[12px]">
        Instant download &middot; via {base.overlay ? "Lemon Squeezy" : "Payhip"}
      </p>

      {tiers.length > 0 && !tiersWired && (
        <p className="text-muted border-line mt-5 border-t pt-4 text-[12px] leading-relaxed">
          Every licence currently checks out at {formatPrice(product.price)}{" "}
          under the commercial terms. Separate tier pricing goes live once each
          tier has its own listing.
        </p>
      )}
    </div>
  );
}
