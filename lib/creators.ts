export interface Creator {
  slug: string;
  name: string;
  role: string;
  /** Short bio for the product page sidebar. */
  bio: string;
  /** Longer intro for the creator page. */
  intro?: string;
  links?: { label: string; href: string }[];
}

export const creators: Creator[] = [
  {
    slug: "frostify",
    name: "Frostify",
    role: "Editor & thumbnail designer",
    bio: "Editor and thumbnail designer working with creators on YouTube. Builds the packs he wanted to exist.",
    intro:
      "Frostify makes editing and thumbnail work for creators on YouTube, and curates everything that lands on SketchSets. Every pack here started as something built for a real client project rather than a store listing.",
    links: [{ label: "frostify.design", href: "https://frostify.design" }],
  },
];

export const getCreator = (slug: string) =>
  creators.find((c) => c.slug === slug);

/** Two-letter monogram used in place of an avatar image. */
export const monogram = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
