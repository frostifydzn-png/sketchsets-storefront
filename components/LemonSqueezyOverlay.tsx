"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    createLemonSqueezy?: () => void;
  }
}

/**
 * Loads Lemon.js and binds the checkout overlay.
 *
 * Lemon.js binds itself to `.lemonsqueezy-button` links on load, which in a
 * React app happens before our buttons exist, and again goes stale after every
 * client-side navigation. Re-running createLemonSqueezy on each route change is
 * the documented fix and is safe to call repeatedly.
 */
export function LemonSqueezyOverlay() {
  const pathname = usePathname();

  useEffect(() => {
    window.createLemonSqueezy?.();
  }, [pathname]);

  return (
    <Script
      src="https://app.lemonsqueezy.com/js/lemon.js"
      strategy="afterInteractive"
      onLoad={() => window.createLemonSqueezy?.()}
    />
  );
}
