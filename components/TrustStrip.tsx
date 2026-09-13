import { IconGlow, IconGrid, IconLayers, IconTag } from "@/components/Icons";

/**
 * The reassurance strip, directly under the hero.
 *
 * A STRIP, NOT FOUR CARDS. Four bordered tiles each with an icon in a rounded
 * square, a heading and a sentence is the feature grid every software
 * marketing site ships, and it eats a full screen to say four short things.
 * This is one row of hairline-separated items that reads in about a second
 * and then gets out of the way of the products.
 *
 * Icons come from the project's own set rather than a library or emoji: one
 * 24px grid, one stroke weight, so the row reads as a family.
 */
const CLAIMS = [
  { icon: IconTag, label: "Instant download", note: "Files the moment you pay" },
  { icon: IconGlow, label: "Made for creators", note: "Built on real client work" },
  { icon: IconGrid, label: "Quality checked", note: "Every pack, by hand" },
  { icon: IconLayers, label: "Commercial use", note: "Client and monetised work" },
];

export function TrustStrip() {
  return (
    <section className="border-line border-y">
      <ul className="divide-line grid grid-cols-2 divide-y sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
        {CLAIMS.map(({ icon: Icon, label, note }) => (
          <li
            key={label}
            className="flex items-start gap-3 py-5 pr-5 first:pl-0 lg:px-6 lg:first:pl-0 lg:last:pr-0"
          >
            <Icon className="text-accent mt-0.5 h-[18px] w-[18px] shrink-0" />
            <span className="min-w-0">
              <span className="text-text block text-[13.5px] font-semibold">
                {label}
              </span>
              <span className="text-muted mt-0.5 block truncate text-[12.5px]">
                {note}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
