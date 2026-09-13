# SketchSets marketplace system

The structural plan for the storefront: what the navigation is, what the
categories are, how the Vault is positioned, and what order to build in.

Full reasoning, wireframes and the Nerd or Die teardown live in the published
artifact. This file is the operative summary — the decisions, the rules that
enforce them, and the task list. If the two ever disagree, this file wins,
because this is the one the code is checked against.

## The read

Ten products in `lib/products.ts`. Six paid. Four of the five paid non-bundle
products are Photoshop assets for thumbnail work; one is an edit overlay pack.
There are no Premiere presets, no After Effects graphics, no captions, no
transitions and no sound.

**SketchSets today is a thumbnail-graphics shop with two edit overlays.** The
site should read that way — confident and narrow — rather than presenting a
department store with twelve empty rooms.

| Category | Paid | Free |
| --- | --- | --- |
| Thumbnails | 4 | 2 samples |
| Editing | 1 | 2 |
| Bundle (Vault) | 1 | — |

194 individual assets across the seven packs in the Vault. That number, not the
pack count, is the honest headline.

## Decisions

These are settled. Re-open one only with a reason, and update this file when you
do.

1. **Navigation is four items:** Shop ▾ · Vault · Free · (Learn, phase 3).
   Thumbnails and Editing are columns inside the Shop mega menu, not top-level.
   Editing is promoted when it reaches ~6 paid products.

2. **Categories describe what a thing is. Filters describe what you need to use
   it.** Software (Photoshop, Premiere, After Effects) is therefore a filter and
   never a category or a nav item.

3. **"Creator Tools" is deleted.** Its only member was the Vault, which is a
   bundle. Revisit only when three real products exist that genuinely fit.

4. **The Vault is a one-time purchase with lifetime updates**, not a
   subscription. Its price rises as the catalogue grows and the ladder is
   published in advance: $29 at 7 packs → $39 at 10 → $49 at 14 → $69 at 20.
   A subscription is a promise of continuous new value and is incompatible with
   the release philosophy below.

5. **Homepage leads with products, not marketing.** On a 1440×900 laptop a real
   purchasable product must be visible within one short scroll. Two category
   tiles, not three.

6. **Release philosophy: new products when they're worth making.** Six to eight
   a year is the target. Nothing in the UI or copy may imply a faster cadence —
   no "new drops weekly", no monthly-newsletter framing.

7. **No fabricated social proof.** No invented review counts, no "trusted by
   thousands", no strikethrough prices on things that were never that price, no
   padding a category with weak products. Curation is the entire positioning;
   getting caught inflating destroys it.

## Invariants

Rules the code enforces, so they cannot rot into decisions someone has to
remember.

- A category or filter group renders **only when it has ≥2 published products**
  in the current result set. Navigation is derived from `lib/products.ts` and is
  never hand-maintained.
- A product belongs to **exactly one category and one type**. Cross-cutting
  lives in `tags` and `style`.
- Bundles reference products via `bundleOf`. Products never reference bundles —
  "is this in the Vault" is computed from the Vault's own list.
- New / Best Sellers / Bundles / Under $10 / Free are **computed views**, never
  authored lists. The only hand-maintained flags are `isNew`, `featured` and
  `salesRank`.
- **Variants are SKUs, not products.** A variant gets no page, slug or card —
  one product page, one card, a price range.
- **One badge maximum per card**, priority Free → New → Pick.
- The lime accent (`--color-accent`, `#C7FF3D`) stays **commerce-only**. The
  moment it appears on a non-commerce element it stops meaning "buy".
- Cards lift on hover **only if they are links**. Non-clickable panels stay flat.

## Phase 0 — structure only, no new products

Highest return per hour in the plan, and none of it needs a new asset.

- [ ] Navigation down to four items; mega menu derived from the product array
- [ ] Implement the ≥2-products rule and apply it to nav and filters
- [ ] Delete the `creator-tools` category; move the Vault under Bundles
- [ ] Reorder the homepage: hero → two tiles → product row → Vault → new → free
- [ ] Rebuild `ProductCard` to spec: preview, title, type label, price, asset
      count when >8, one badge max, ≤3 software icons
- [ ] Define the badge component once, with a fixed priority order
- [ ] Surface asset counts on cards, category pages and the hero
- [ ] `font-variant-numeric: tabular-nums` on every price

## Phase 1 — commerce and the Vault

- [ ] `/vault` page with the price ladder published and the arithmetic shown
      (individually $45.95 · Vault $29)
- [ ] `variants` in the schema, variant selector on product pages, price ranges
      on cards
- [ ] Fold the two sample products in as free variants of their paid parents
- [ ] Compatibility matrix on product pages — software × min version × caveat
- [ ] `/free` reworked as a funnel, no email gate

## Phase 2 — make Editing a real category

- [ ] Ship the Caption System (see launch catalogue) — the product that makes
      Editing non-empty
- [ ] `collections`: named, ordered, hand-curated lists of product slugs with
      their own pages. Not categories, not bundles, no new products
- [ ] "Seen in real work" block on product pages
- [ ] Style filter, once 25+ products exist
- [ ] Newsletter live — only once there is something to announce

## Phase 3 and beyond

Learn section as MDX routes (no CMS), thumbnail teardowns, promote Thumbnails
and Editing to top-level nav, hand-placed review quotes with real names. Then
collaborators — commissioned, never open-submission, no portal.

## Do not build

Custom accounts, Vault subscription billing, a review system, a recommendation
engine, a hosted search service, a blog CMS, a collaborator upload portal,
wishlists, multi-currency, AI features. Payhip owns payment, tax, file delivery,
accounts, cart, discount codes and receipts. We own everything from discovery
through the product page.

## Schema additions

`variants[]`, `style[]` (controlled vocabulary), `useCases[]`, `software[]`
(replacing flat `compatibility`, carrying `minVersion` and `note`), `version`,
`updatedAt`, `changelog[]`, `inVault` (computed), `realWork[]`, `tutorialUrl`,
`salesRank`.

## Launch catalogue

Products a working editor and thumbnail designer generates as a byproduct of
client work, in priority order:

1. **Caption System** — $19.99, flagship. Highest demand, makes Editing real
2. **Thumbnail Base System** — $29–39, flagship. The layered PSD starting point
3. **Text & Title Treatments** — $14.99. The layer styles reapplied every time
4. **Subject Cutout Kit** — $12.99. Rim light, edge glow, separation
5. **Punch-In & Zoom Presets** — $12.99. Already in the Premiere project
6. **Shorts / Vertical Kit** — $14.99
7. **Thumbnail Teardown Vol. 1** — free. Ten real thumbnails with the reasoning

The pipeline that produces these: capture reusable pieces from paid client work
into a `/harvest` folder as you go, then run a two-day productisation sprint
once a quarter. One deliberate flagship a year. Everything else — version
updates, collections, seasonal freebies, teardowns, Vault price announcements —
keeps the store alive without new SKUs.
