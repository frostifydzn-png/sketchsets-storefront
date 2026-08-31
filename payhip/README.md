# SketchSets — Payhip custom CSS

`store.css` goes into **Payhip → Store settings → STORE PAGES CUSTOM CSS**.

It lives in this repo so the stylesheet has version history. The copy
pasted into Payhip has none: if a change breaks the store there is no way
back except undo in the browser. Edit here, commit, then paste.

## Two constraints that are not obvious

**1. Never use the child combinator.**
Payhip HTML-escapes the CSS before injecting it, so `>` arrives in the
page as `&gt;` and the browser discards the whole selector. The previous
stylesheet had 106 of them and every one was dead. Verify before pasting:

```bash
grep -c '>' payhip/store.css
```

Comments and `url("data:image/svg+xml,...")` values contain `>`, so use the
audit script below rather than a raw grep.

**2. Every custom property must be defined.**
The previous stylesheet referenced nine that never existed
(`--prod-card-bg`, `--fc-panel`, `--ss-sale-glow-rgb`, and others), which
silently killed the product page info card, the featured collection
treatment and the sale badge glow.

## Audit before pasting

```bash
python payhip/audit.py
```

Checks for child combinators, undefined variables, missing keyframes and
unbalanced braces — the four failure modes that fail silently.

## Notes on this store's markup

- `.card--media` is on the **card element itself**, not the image wrapper.
  The real media box is `div.card__inner.ratio`. Styling `.card--media` as
  a media box applies its aspect ratio to the entire card.
- Both `.heading-text` and `.heading-text-main` exist, on different page
  types. Style both.
- The login control is `a.header-login-icon-link`; the cart is
  `button.header-cart-icon-button`.
- `.collection-list-block` and `.products .product` do not exist on this
  store. Rules targeting them do nothing.
- Swiper adds `.swiper-slide` at runtime, so selectors for the testimonial
  slider should key off `.js-slider-list-item` instead.
