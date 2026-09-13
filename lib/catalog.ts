import {
  categories,
  products,
  type Category,
  type CategoryId,
} from "./products";

/**
 * THE RULE THAT KEEPS THE SHOP HONEST.
 *
 * A category is a department. Link one that holds a single product and the
 * visitor finds out the store is empty in one click, which does more damage
 * than a small menu ever could — and no amount of remembering stops it,
 * because the menu and the catalogue are edited months apart.
 *
 * So navigation is DERIVED from the catalogue and never hand-maintained, and
 * a category has to hold at least this many published products before it is
 * linked anywhere. EMPTY departments stay structurally impossible rather than
 * being something anyone has to police.
 *
 * THE THRESHOLD MOVED FROM 2 TO 1, deliberately. At 2 this hid Creator Tools,
 * which holds only the Vault — defensible when the nav was four items and the
 * Vault had its own slot, but the storefront now surfaces the real category
 * set as a marketplace directory, and a department with one good product in
 * it is a thin department rather than a lie. Counts are shown everywhere the
 * categories are listed, so nobody is promised more than is there.
 *
 * Raise it back to 2 if a category ever needs hiding again; that is the only
 * lever, and no list of links needs touching either way.
 */
export const MIN_TO_LINK = 1;

export const inCategory = (id: CategoryId) =>
  products.filter((p) => p.category === id);

/** Categories with enough behind them to be worth a link. */
export const linkedCategories = (min = MIN_TO_LINK): Category[] =>
  categories.filter((c) => inCategory(c.id).length >= min);

/**
 * Bundle and Sample are views over the catalogue rather than kinds of thing,
 * so neither is ever offered as a type to browse. A bundle is reachable as
 * the Vault; a sample is reachable from the product it samples.
 */
const NOT_A_TYPE = new Set(["Bundle", "Sample"]);

export type TypeCount = { name: string; count: number };

/**
 * What is actually inside a category, largest group first.
 *
 * These are descriptors rather than links: nothing in the app reads a filter
 * off the query string yet, so a per-type URL would be a promise the category
 * page cannot keep. Listing them under the category link still answers the
 * question the menu is being asked — what is in there — without inventing a
 * destination.
 */
export const typesIn = (id: CategoryId): TypeCount[] => {
  const counts = new Map<string, number>();

  for (const product of inCategory(id)) {
    if (NOT_A_TYPE.has(product.subcategory)) continue;
    counts.set(product.subcategory, (counts.get(product.subcategory) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
};

/**
 * Individual assets across the shop, which is the honest headline number.
 *
 * "10 packs" describes the shelf; "194 assets" describes what a buyer
 * receives, and both are true. Bundles are excluded from the sum because
 * their contents are already counted through the packs themselves — counting
 * the Vault too would report every asset twice.
 */
export const totalAssets = () =>
  products
    .filter((p) => !p.bundleOf?.length)
    .reduce((sum, p) => sum + (p.assetCount ?? 0), 0);

/**
 * Browse views. Computed from the catalogue, never authored, and dropped
 * entirely when empty so the menu cannot advertise a view with nothing in it.
 */
export const browseViews = () =>
  [
    { href: "/browse", label: "All Products", count: products.length },
    {
      href: "/new",
      label: "New Releases",
      count: products.filter((p) => p.isNew).length,
    },
    {
      href: "/free",
      label: "Free",
      count: products.filter((p) => p.price === 0).length,
    },
  ].filter((view) => view.count > 0);
