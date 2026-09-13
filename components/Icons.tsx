/**
 * The icon set.
 *
 * Authored here rather than pulled from a library, for two reasons. A library
 * costs a dependency and ships several hundred glyphs to render seven. And
 * every icon set has a voice — a stroke weight, a corner radius, a way of
 * abbreviating an object — which is a design decision worth making rather
 * than inheriting.
 *
 * One geometry across all of them: 24px box, 1.7 stroke, round caps and
 * joins, no fills. They are drawn on the same grid so a row of them reads as
 * one family rather than seven borrowed marks.
 */

type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/** All products — a four-up grid, which is what the shop page is. */
export function IconGrid({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.6" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.6" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.6" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.6" />
    </svg>
  );
}

/** New releases — a four-point spark rather than a five-point star, which
 *  reads as a rating. */
export function IconSpark({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3.2c.7 4.3 1.8 5.4 6.1 6.1-4.3.7-5.4 1.8-6.1 6.1-.7-4.3-1.8-5.4-6.1-6.1 4.3-.7 5.4-1.8 6.1-6.1Z" />
      <path d="M18 15.4c.35 2.1.9 2.65 3 3-2.1.35-2.65.9-3 3-.35-2.1-.9-2.65-3-3 2.1-.35 2.65-.9 3-3Z" />
    </svg>
  );
}

/** Free — a tag, because the thing being marked is a price. */
export function IconTag({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M11.3 3.6H5.4a1.8 1.8 0 0 0-1.8 1.8v5.9c0 .48.19.94.53 1.27l7.4 7.4a1.8 1.8 0 0 0 2.55 0l5.9-5.9a1.8 1.8 0 0 0 0-2.55l-7.4-7.4a1.8 1.8 0 0 0-1.27-.52Z" />
      <circle cx="8.3" cy="8.3" r="1.35" />
    </svg>
  );
}

/** Bundles and the Vault — stacked layers. */
export function IconLayers({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="m12 3.4 8.4 4.3-8.4 4.3-8.4-4.3 8.4-4.3Z" />
      <path d="m3.6 12 8.4 4.3 8.4-4.3" />
      <path d="m3.6 16.3 8.4 4.3 8.4-4.3" />
    </svg>
  );
}

/** Thumbnails — a brush, which is what the category is full of. */
export function IconBrush({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M14.2 4.6 19.4 9.8" />
      <path d="M16.8 2a2.4 2.4 0 0 1 3.4 0l1.8 1.8a2.4 2.4 0 0 1 0 3.4l-9.3 9.3-5.2-5.2 9.3-9.3Z" />
      <path d="M7.5 11.3c-2.2 0-4 1.8-4 4 0 1.4-.5 2.4-1.4 3.1 1 .9 2.4 1.5 3.9 1.5 3 0 5.5-2.5 5.5-5.5" />
    </svg>
  );
}

/** Editing — a frame with a play mark, which is a timeline's whole job. */
export function IconPlay({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="2.8" y="4.6" width="18.4" height="14.8" rx="2.4" />
      <path d="M10.2 9.6v4.8l4.2-2.4-4.2-2.4Z" />
    </svg>
  );
}

/** Overlays and light — a sun, for glows and flares. */
export function IconGlow({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="3.9" />
      <path d="M12 2.6v2.2M12 19.2v2.2M4.35 4.35 5.9 5.9M18.1 18.1l1.55 1.55M2.6 12h2.2M19.2 12h2.2M4.35 19.65 5.9 18.1M18.1 5.9l1.55-1.55" />
    </svg>
  );
}

/** Effects — motion lines. */
export function IconMotion({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3.4 7.4h11.4M3.4 12h15.2M3.4 16.6h8.6" />
      <path d="m17.6 4.8 2.8 2.6-2.8 2.6" />
    </svg>
  );
}

/** Patterns and textures — a repeating field. */
export function IconPattern({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3.4 8.6 8.6 3.4M3.4 15.4l12-12M8.6 20.6l12-12M15.4 20.6l5.2-5.2" />
      <rect x="3.4" y="3.4" width="17.2" height="17.2" rx="2.4" />
    </svg>
  );
}

export function IconSearch({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="10.8" cy="10.8" r="6.6" />
      <path d="m15.7 15.7 4.3 4.3" />
    </svg>
  );
}

export function IconArrow({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4.6 12h14.2M13.2 6.2 19 12l-5.8 5.8" />
    </svg>
  );
}

/**
 * Maps a product type to its mark. Falls back to the grid, so a new
 * subcategory added to lib/products.ts renders sensibly on day one instead of
 * rendering nothing.
 */
export function iconForType(name: string) {
  const key = name.toLowerCase();
  if (key.includes("overlay") || key.includes("glow")) return IconGlow;
  if (key.includes("effect") || key.includes("motion")) return IconMotion;
  if (key.includes("texture") || key.includes("pattern")) return IconPattern;
  if (key.includes("brush")) return IconBrush;
  if (key.includes("asset") || key.includes("doodle") || key.includes("element"))
    return IconSpark;
  if (key.includes("bundle")) return IconLayers;
  return IconGrid;
}
