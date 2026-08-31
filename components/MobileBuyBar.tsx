"use client";

import { useEffect, useState } from "react";
import { formatPrice, type Product } from "@/lib/products";
import { checkoutUrl } from "@/lib/site";

/**
 * Sticky mobile purchase bar. Hides itself while the real buy button is on
 * screen so the page never shows two competing CTAs at once.
 */
export function MobileBuyBar({ product }: { product: Product }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // BuyPanel always renders this anchor; with no target the bar stays hidden
    // rather than duplicating a CTA that may not exist.
    const target = document.getElementById("buy-button");
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { rootMargin: "-80px 0px 0px 0px" },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`bg-ink/90 border-line fixed inset-x-0 bottom-0 z-30 border-t px-4 py-3 backdrop-blur-xl transition-transform duration-300 lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-semibold">{product.title}</p>
          <p className="text-muted text-[12px]">Instant download</p>
        </div>
        <a
          href={checkoutUrl(product.payhipId)}
          className="bg-accent text-ink shrink-0 rounded-lg px-5 py-3 text-[14px] font-bold"
        >
          {formatPrice(product.price)} · Get pack
        </a>
      </div>
    </div>
  );
}
