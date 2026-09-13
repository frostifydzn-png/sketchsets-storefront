@AGENTS.md

## Storefront direction

Read `docs/marketplace-system.md` before changing navigation, categories,
the homepage, product cards or the Vault. It carries the settled decisions and
the invariants the code is meant to enforce — including that navigation is
derived from `lib/products.ts` and never hand-maintained, and that a category
renders only when it has two or more published products.
