import { totalAssets } from "@/lib/catalog";
import { products } from "@/lib/products";

/**
 * What you get, in three claims.
 *
 * Deliberately placed near the bottom. The reference marketplace runs the same
 * block and runs it late, after you have already scrolled past a dozen
 * products — because reassurance answers an objection, and an objection only
 * exists once someone wants something. Put it above the shelves and it is a
 * SaaS feature grid; put it below and it closes.
 *
 * No icons. A glyph in a rounded square above a heading above a sentence is
 * the exact shape of a software feature grid, and the icon never says anything
 * the heading does not.
 *
 * Every number is computed, so none of these can drift into a claim the
 * catalogue cannot back.
 */
export function ValueProps() {
  const commercial = products.filter((p) =>
    p.license.toLowerCase().includes("commercial"),
  ).length;

  const claims = [
    {
      head: "Made on real work",
      body: "Every pack started as something built for a client project, not as a listing. It shipped on a real video before it shipped here.",
    },
    {
      head: "Yours commercially",
      body:
        commercial === products.length
          ? "Client work and monetised channels, on every pack in the shop. No per-project limits, no extra licence to buy."
          : "Client work and monetised channels. The licence is written in plain English on every product page.",
    },
    {
      head: "Download and use it",
      body: `${totalAssets()} assets across ${products.length} packs, delivered the moment you pay. No account to make, no waiting on approval.`,
    },
  ];

  return (
    <section className="shelf-gap">
      <div className="border-line grid gap-x-10 gap-y-9 border-t pt-10 sm:grid-cols-3 sm:pt-12">
        {claims.map((claim) => (
          <div key={claim.head}>
            <h3 className="font-display text-text text-[1.125rem] font-bold">
              {claim.head}
            </h3>
            <p className="text-dim mt-2.5 text-[14.5px] leading-relaxed">
              {claim.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
