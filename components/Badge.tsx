import type { Product } from "@/lib/products";

/**
 * The one badge a card is allowed.
 *
 * Free, New and Pick were drifting into three slightly different pills drawn
 * in three different files, which is how a grid ends up looking like a
 * dashboard. They are one component with one priority order now, and the
 * order is the point: a card gets AT MOST ONE.
 *
 * Priority is Free, then New, then Pick. Free wins because it changes whether
 * someone clicks at all; Pick loses because it is the store's opinion rather
 * than a fact about the product, and an opinion is what you read once you are
 * already on the page.
 */
export type BadgeKind = "free" | "new" | "pick";

export const badgeFor = (product: Product): BadgeKind | null =>
  product.price === 0
    ? "free"
    : product.isNew
      ? "new"
      : product.featured
        ? "pick"
        : null;

const LABEL: Record<BadgeKind, string> = {
  free: "Free",
  new: "New",
  pick: "Pick",
};

export function Badge({ kind }: { kind: BadgeKind }) {
  /*
   * Free and New are facts, so they take the accent. Pick is an opinion and
   * sits on the neutral surface — the accent stays commerce-only, which is
   * the rule the whole palette is built on.
   */
  const tone =
    kind === "pick"
      ? "bg-surface/90 text-dim border-line border"
      : "bg-accent text-ink";

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide uppercase ${tone}`}
    >
      {LABEL[kind]}
    </span>
  );
}
