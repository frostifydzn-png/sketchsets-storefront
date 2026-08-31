/**
 * Newsletter provider endpoint (Beehiiv / ConvertKit / Resend form action).
 * The signup block renders only when this is set. Better no block at all
 * than a form that silently drops addresses.
 */
export const NEWSLETTER_ENDPOINT = "";

export const site = {
  name: "SketchSets",
  parent: "Frostify",
  tagline: "Creator resources that don't suck.",
  description:
    "A curated store of presets, overlays, textures and templates for video editors, thumbnail designers and creators. Built by Frostify.",
  url: "https://sketchsets.com",
  twitter: "@sketchsets",
  links: {
    frostify: "https://frostify.design",
    /*
     * TODO: point at the real Frostoria page once it exists.
     * frostify.design/join-the-community.html and /frostoria both 404 today;
     * the root is the only Frostify URL that resolves.
     */
    frostoria: "https://frostify.design",
    // Taken from the live Payhip storefront footer, not guessed.
    discord: "https://discord.gg/KwjaKJMYBp",
    instagram: "https://www.instagram.com/thesketchsets",
    twitter: "https://x.com/SketchSets",
  },
} as const;

/**
 * Base origin for Payhip-hosted checkout and account pages.
 *
 * Payhip currently serves the apex domain (sketchsets.com/b/<id>). When this
 * storefront takes over the apex, move Payhip's custom domain to a subdomain
 * and change ONLY this constant to "https://checkout.sketchsets.com".
 * Every buy button, download link and account link follows from here.
 */
export const CHECKOUT_BASE = "https://sketchsets.com";

export const checkoutUrl = (payhipId: string) =>
  `${CHECKOUT_BASE}/b/${payhipId}`;
export const payhipPage = (path: string) => `${CHECKOUT_BASE}/${path}`;

/**
 * Customer login and past downloads. Absolute rather than derived from
 * CHECKOUT_BASE because Payhip serves this from payhip.com itself.
 * `/customer/login` on the store domain is a 404.
 */
export const PAYHIP_ACCOUNT = "https://payhip.com/SketchSets/users/login";

export type Checkout = {
  href: string;
  /** True when the link should open in the Lemon Squeezy overlay. */
  overlay: boolean;
};

/**
 * Resolves where a product's buy button points.
 *
 * A product moves to Lemon Squeezy the moment it is given a lemonSqueezyUrl;
 * everything else keeps going to Payhip. That makes the migration per-product
 * and reversible, with no window where checkout is down.
 */
export const checkoutFor = (product: {
  payhipId: string;
  lemonSqueezyUrl?: string;
}): Checkout =>
  product.lemonSqueezyUrl
    ? { href: product.lemonSqueezyUrl, overlay: true }
    : { href: checkoutUrl(product.payhipId), overlay: false };
