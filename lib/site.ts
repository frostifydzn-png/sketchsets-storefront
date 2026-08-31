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
    frostoria: "https://frostify.design/join-the-community.html",
    discord: "https://discord.gg/sketchsets",
    instagram: "https://instagram.com/sketchsets",
    twitter: "https://x.com/sketchsets",
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
