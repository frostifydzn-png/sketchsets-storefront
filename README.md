# SketchSets — storefront

The custom storefront for **SketchSets, by Frostify**. Next.js + TypeScript +
Tailwind, deployed on Vercel.

This repo is **completely independent of the Frostify site**
(`frostifydzn-png/frostify-site`). Separate repo, separate Vercel project,
separate analytics. Deploying one never affects the other.

## Commerce model

This site is the **storefront and brand layer only**. Payhip continues to handle
checkout, payments, file delivery, receipts, download access and discount codes.
No payment, tax or file-delivery logic lives in this codebase.

## Local development

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

> **Windows note:** if `next build` fails with `EXDEV: cross-device link not
> permitted` on `nextjs-nodejs/Config/config.json`, that is Next's telemetry
> writer, not the app. Set `NEXT_TELEMETRY_DISABLED=1` before running. Vercel
> builds are unaffected.

## Adding or editing a product

Everything lives in one file: [`lib/products.ts`](lib/products.ts).

1. Drop the artwork into `public/products/`.
2. Add an entry to the `products` array. `slug` becomes the URL
   (`/products/<slug>`), and `payhipId` is the `<id>` from the Payhip product
   link `/b/<id>`.
3. That's it — the homepage, category pages, browse grid, sitemap and structured
   data all derive from that array.

Set `featured: true` to surface a product in **Frostify Picks** on the homepage,
and `isNew: true` to show a "New" badge on its card.

The `Product` interface intentionally mirrors the columns a real database table
would have, so moving from this file to a CMS or Postgres later is a swap of the
data source, not a rewrite of the components.

## The checkout URL — important

All buy buttons are built from a single constant in
[`lib/site.ts`](lib/site.ts):

```ts
export const CHECKOUT_BASE = "https://sketchsets.com";
```

Payhip currently serves the apex domain, so `sketchsets.com/b/<id>` is the live
checkout. **When this storefront takes over the apex domain**, Payhip's custom
domain must move to a subdomain (e.g. `checkout.sketchsets.com`) and this one
constant updated to match. Every buy button, download and support link follows
from it — there are no hard-coded checkout URLs anywhere else.

## Routes

| Route | Contents |
| --- | --- |
| `/` | Hero, Frostify Picks, categories, Frostoria link |
| `/browse` | Full catalog |
| `/editing`, `/thumbnails`, `/creator` | Category pages |
| `/products/<slug>` | Product detail + Payhip checkout |
| `/sitemap.xml`, `/robots.txt` | Generated from the product data |

## Analytics

Vercel Analytics and Speed Insights are wired into the root layout and are
scoped to **this** Vercel project. They are not shared with Frostify. Enable
both in the SketchSets project's Vercel dashboard.
