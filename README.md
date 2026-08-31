# SketchSets — storefront

The custom storefront for **SketchSets, by Frostify**. Next.js + TypeScript +
Tailwind, deployed on Vercel.

This repo is **completely independent of the Frostify site**
(`frostifydzn-png/frostify-site`). Separate repo, separate Vercel project,
separate analytics. Deploying one never affects the other.

## Commerce model

This site is the **storefront and brand layer only**. Payhip handles checkout,
payments, file delivery, receipts, download access and discount codes. No
payment, tax or file-delivery logic lives in this codebase.

## Local development

```bash
npm install
npm run dev
```

> **Windows note:** if a build fails with `EXDEV: cross-device link not
> permitted` on `nextjs-nodejs/Config/config.json`, that is Next's telemetry
> writer, not the app. Set `NEXT_TELEMETRY_DISABLED=1` before running. Vercel
> builds are unaffected.

## Design system

Defined once as Tailwind theme tokens in [`app/globals.css`](app/globals.css).

| Token | Value | Use |
| --- | --- | --- |
| `ink` | `#09090B` | Page background |
| `surface` | `#111114` | Cards, panels |
| `elevated` | `#18181C` | Hover states |
| `line` | `#27272D` | Hairlines |
| `text` / `dim` / `muted` | `#F5F5F7` / `#A1A1AA` / `#71717A` | Type scale |
| `accent` | `#C7FF3D` | **Commerce only** — buy buttons, price, active filters, Frostify Picks |

Category identity colours (`cat-editing` lime, `cat-thumbnails` violet,
`cat-creator` cyan) appear as a single hairline per category and nothing more.
The rule that keeps the site from turning into a rainbow: **the artwork
supplies the colour, the chrome stays quiet.**

Type is Archivo (display, narrowed via its width axis) over Inter Tight (UI).
Use `.font-display` and `.font-display-tight` rather than setting the family
directly.

## Adding or editing a product

Everything lives in [`lib/products.ts`](lib/products.ts).

1. Drop artwork into `public/products/`.
2. Add an entry to the `products` array. `slug` becomes the URL, and `payhipId`
   is the `<id>` from the Payhip link `/b/<id>`.

Homepage, category pages, browse grid, search, filters, sitemap and structured
data all derive from that array.

Flags that drive merchandising:

- `featured: true` → appears in **Frostify Picks** and gets the badge
- `isNew: true` → appears on `/new` and gets a New badge. Maintain this by
  hand; it is never inferred, so the site cannot fake recency
- `bundleOf` + `bundleValue` → renders the bundle feature and the "Pairs well
  with" upsell on every product the bundle contains
- `videoPreview` → shows an autoplaying muted preview as the first gallery
  slide. Nothing uses this yet; motion products should

Creators live in [`lib/creators.ts`](lib/creators.ts) and get a page at
`/creators/<slug>`. Products reference one by `creatorSlug`.

### Product artwork standard

The store is only as good as its artwork. Every product should ship:

- One hero cover at 4:3
- 3–5 supporting previews showing the asset actually in use
- Before/after where it makes sense
- A video preview for anything motion-based

Anything that does not clear this bar should not go live, third-party sellers
included.

## The checkout URL — important

All buy buttons build from a single constant in [`lib/site.ts`](lib/site.ts):

```ts
export const CHECKOUT_BASE = "https://sketchsets.com";
```

Payhip currently serves the apex domain, so `sketchsets.com/b/<id>` is the live
checkout. **When this storefront takes over the apex**, Payhip's custom domain
must move to a subdomain (e.g. `checkout.sketchsets.com`) and this one constant
updated. There are no hard-coded checkout URLs anywhere else.

## Newsletter

The signup block renders only when `NEWSLETTER_ENDPOINT` in `lib/site.ts` is
set to a real provider form action (Beehiiv, ConvertKit, Resend). Until then it
does not render at all — a form that silently drops addresses is worse than no
form.

## Routes

| Route | Contents |
| --- | --- |
| `/` | Hero, Frostify Picks, categories, bundle feature, Under $10, creator, Frostoria |
| `/browse` | Full catalogue with category / software / price filters |
| `/new` | Products flagged `isNew` |
| `/editing`, `/thumbnails`, `/creator` | Category pages with their own filters |
| `/products/<slug>` | Gallery + sticky buy panel + modular detail |
| `/creators/<slug>` | Creator profile and their packs |
| `/sitemap.xml`, `/robots.txt` | Generated from product and creator data |

Search (⌘K) is client-side over title, tags, category, software and description.

## Analytics

Vercel Analytics and Speed Insights are wired into the root layout, scoped to
**this** Vercel project only. Enable both in the SketchSets Vercel dashboard.
