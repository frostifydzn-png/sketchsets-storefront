export type CategoryId = "editing" | "thumbnails" | "creator-tools";

export interface Category {
  id: CategoryId;
  name: string;
  /** One line, shown under the category heading. No SEO wall. */
  intro: string;
  blurb: string;
  /** CSS custom property carrying this category's identity colour. */
  accentVar: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  /** Slug into lib/creators.ts. */
  creatorSlug: string;
  price: number;
  category: CategoryId;
  subcategory: string;
  /** One line for the purchase panel, saying what the buyer gets out of it. */
  valueProp: string;
  shortDescription: string;
  description: string[];
  thumbnail: string;
  previewImages: string[];
  /** Muted, autoplaying preview for motion products. None yet. */
  videoPreview?: string;
  includedFiles: string[];
  compatibility: string[];
  license: string;
  licenseSummary: string;
  /**
   * Catalogue number. The shop is presented as a numbered archive, so every
   * pack carries one: 000 is the complete library, samples take an S prefix.
   */
  setNumber: string;
  /** File types in the pack, for at-a-glance scanning. */
  formats: string[];
  /** Hand-written selling points. Rendered only when a product has them. */
  keyFeatures?: string[];
  fileSize: string;
  tags: string[];
  /** Surfaces the product as a Frostify Pick. */
  featured: boolean;
  isNew: boolean;
  /** Product slugs contained in this bundle, if it is one. */
  bundleOf?: string[];
  /** Payhip product id, the `<id>` in /b/<id>. Combined with CHECKOUT_BASE. */
  payhipId: string;
  /**
   * Lemon Squeezy checkout URL. When set, this product checks out through the
   * Lemon Squeezy overlay instead of Payhip, letting the two run side by side
   * during migration rather than needing a single cutover.
   */
  lemonSqueezyUrl?: string;
  rating?: { average: number; count: number };
}

export const categories: Category[] = [
  {
    id: "editing",
    name: "Editing",
    intro:
      "Overlays, glows and light effects built to make your timeline better.",
    blurb: "Overlays, glows and motion",
    accentVar: "var(--color-cat-editing)",
  },
  {
    id: "thumbnails",
    name: "Thumbnails",
    intro:
      "Textures, brushes and hand-drawn assets that still read at grid size.",
    blurb: "PSDs, textures and brushes",
    accentVar: "var(--color-cat-thumbnails)",
  },
  {
    id: "creator-tools",
    name: "Creator Tools",
    intro: "Bundles and bigger kits for people who ship constantly.",
    blurb: "Bundles and toolkits",
    accentVar: "var(--color-cat-tools)",
  },
];

export const products: Product[] = [
  {
    id: "vault-v1",
    slug: "sketchsets-vault",
    title: "SketchSets Vault",
    creatorSlug: "frostify",
    price: 29,
    category: "creator-tools",
    subcategory: "Bundle",
    valueProp: "The entire Collection V1 library in one download.",
    shortDescription:
      "Every SketchSets Collection V1 pack in one download. Seven packs, one price.",
    description: [
      "The complete SketchSets Collection V1 library in a single download. Seven hand-crafted asset packs bundled for creators, designers and editors who want the full toolkit without buying each piece separately.",
      "Every pack inside The Vault is built to the same standard. Hand-drawn doodles, high-resolution vector brushes, cinematic glows, paper tears and real-fireworks particles. Social graphics, thumbnails, branding or edits, it is all covered.",
    ],
    thumbnail: "/products/vault-cover.png",
    previewImages: [
      "/products/vault-cover.png",
      "/products/vault-g1.png",
      "/products/vault-g2.png",
      "/products/vault-g3.png",
      "/products/vault-g4.png",
    ],
    includedFiles: [
      "Hand-Drawn Doodles: 110 doodles (SVG, PNG, PSD)",
      "Vector Brush Assets: 20 brushes at 4000×4000 (PSD, SVG, PNG)",
      "Leaks & Glows: 11 glows, 3 leaks, 6 flares at 1080p with PSD",
      "Paper Tears: 8 HD/4K tears with PSD",
      "Photoshop Patterns: 12 patterns (PAT and PSD)",
      "Sparks & Particles: 19 real-fireworks particles in HD PSD",
      "Speedlines: 5 4K speedlines (PSD and PNG)",
    ],
    compatibility: [
      "Photoshop",
      "Illustrator",
      "After Effects",
      "Premiere Pro",
      "Figma",
    ],
    license: "Commercial",
    licenseSummary:
      "Use in client and monetised work. No reselling the assets.",
    setNumber: "000",
    formats: ["PSD", "PNG", "SVG", "PAT"],
    fileSize: "ZIP · 487MB",
    tags: ["bundle", "vault", "collection", "psd", "svg", "value"],
    featured: true,
    isNew: true,
    bundleOf: [
      "hand-drawn-doodles",
      "vector-brush-assets",
      "leaks-and-glows",
      "paper-tears",
      "photoshop-patterns",
      "sparks-and-particles",
      "speedlines",
    ],
    payhipId: "JogCA",
  },
  {
    id: "doodles-v1",
    slug: "hand-drawn-doodles",
    title: "Hand-Drawn Doodles",
    creatorSlug: "frostify",
    price: 12.99,
    category: "thumbnails",
    subcategory: "Assets",
    valueProp: "110 doodles that add character without adding clutter.",
    shortDescription:
      "110 hand-crafted doodles in SVG, PNG and PSD. Arrows, stars, crowns and symbols.",
    description: [
      "A playful, hand-drawn set built to add character to anything. 110 unique doodles covering arrows, stars, crowns and symbols, versatile enough for thumbnails, social graphics and branding alike.",
      "Every doodle ships as both vector and high-quality raster, so you can scale and recolour without losing quality. Use the PNGs for quick placement, the SVGs for vector editing, or open the layered PSD to make each one your own.",
    ],
    thumbnail: "/products/doodles-cover.png",
    previewImages: ["/products/doodles-cover.png", "/products/doodles-g1.png"],
    includedFiles: [
      "110 doodles in SVG format",
      "110 doodles in PNG format",
      "110 doodles in PSD format",
      "License certificate",
    ],
    compatibility: ["Photoshop", "Illustrator", "Figma", "After Effects"],
    license: "Commercial",
    licenseSummary:
      "Use in client and monetised work. No reselling the assets.",
    setNumber: "001",
    formats: ["SVG", "PNG", "PSD"],
    fileSize: "ZIP · 106MB",
    tags: ["doodles", "hand-drawn", "svg", "vector", "psd", "accents"],
    featured: true,
    isNew: false,
    payhipId: "lkXGb",
    rating: { average: 5, count: 5 },
  },
  {
    id: "leaks-glows-v1",
    slug: "leaks-and-glows",
    title: "Leaks & Glows",
    creatorSlug: "frostify",
    price: 8.99,
    category: "editing",
    subcategory: "Overlays",
    valueProp: "Instant atmosphere for footage and thumbnails.",
    shortDescription:
      "11 glows, 3 light leaks and 6 lens flares at 1920×1080, with an editable PSD.",
    description: [
      "Atmosphere in a folder. Eleven glows, three light leaks and six lens flares, all at 1920×1080, for adding depth and mood to photo edits, video and graphic work.",
      "A fully editable PSD is included, so you can layer, recolour and combine the overlays into looks of your own rather than being stuck with the presets.",
    ],
    thumbnail: "/products/leaks-glows-cover.png",
    previewImages: [
      "/products/leaks-glows-cover.png",
      "/products/leaks-glows-g1.png",
      "/products/leaks-glows-g2.png",
      "/products/leaks-glows-g3.png",
    ],
    includedFiles: [
      "11 glows (1920×1080)",
      "3 light leaks (1920×1080)",
      "6 lens flares (1920×1080)",
      "Editable PSD",
      "License certificate",
    ],
    compatibility: [
      "Photoshop",
      "After Effects",
      "Premiere Pro",
      "DaVinci Resolve",
    ],
    license: "Commercial",
    licenseSummary:
      "Use in client and monetised work. No reselling the assets.",
    setNumber: "002",
    formats: ["PNG", "PSD"],
    fileSize: "ZIP · 99MB",
    tags: ["glows", "light leaks", "flares", "overlays", "1080p", "psd"],
    featured: true,
    isNew: false,
    payhipId: "RYuV2",
  },
  {
    id: "vector-brushes-v1",
    slug: "vector-brush-assets",
    title: "Vector Brush Assets",
    creatorSlug: "frostify",
    price: 8.99,
    category: "thumbnails",
    subcategory: "Textures",
    valueProp: "Hand-made brush strokes that scale to any size.",
    shortDescription:
      "20 hand-drawn brush strokes at 4000×4000 in PSD, SVG and PNG.",
    description: [
      "Twenty custom brush strokes for adding an organic, hand-made edge to otherwise clean design. Built large at 4000×4000, so they hold up on posters and print as well as they do on a thumbnail.",
      "PSD, PNG and SVG are all included, so you can drop a stroke in as-is or take it into a vector app and reshape it.",
    ],
    thumbnail: "/products/vector-brushes-cover.png",
    previewImages: [
      "/products/vector-brushes-cover.png",
      "/products/vector-brushes-g1.png",
    ],
    includedFiles: [
      "20 brush assets at 4000×4000",
      "PSD, SVG and PNG formats",
      "License certificate",
    ],
    compatibility: ["Photoshop", "Illustrator", "Figma", "Affinity"],
    license: "Commercial",
    licenseSummary:
      "Use in client and monetised work. No reselling the assets.",
    setNumber: "003",
    formats: ["PSD", "SVG", "PNG"],
    fileSize: "ZIP · 57MB",
    tags: ["brushes", "texture", "vector", "svg", "hand-drawn", "grunge"],
    featured: false,
    isNew: false,
    payhipId: "D8ktX",
    rating: { average: 5, count: 1 },
  },
  {
    id: "paper-tears-v1",
    slug: "paper-tears",
    title: "Paper Tears",
    creatorSlug: "frostify",
    price: 7.99,
    category: "thumbnails",
    subcategory: "Textures",
    valueProp: "Real torn edges for collage and thumbnail work.",
    shortDescription:
      "8 HD/4K torn paper edges with transparent PNGs and a layered PSD.",
    description: [
      "Eight torn paper edges shot and cleaned at HD/4K, for collage layouts, posters and anything that needs a rough, tactile edge. Each tear is built to read as real rather than filtered.",
      "Transparent PNGs make overlaying onto any background trivial, and the layered PSD is there when you want to reshape, recolour or mask a tear to fit the composition.",
    ],
    thumbnail: "/products/paper-tears-cover.png",
    previewImages: [
      "/products/paper-tears-cover.png",
      "/products/paper-tears-g1.png",
      "/products/paper-tears-g2.png",
    ],
    includedFiles: [
      "8 paper tears in HD/4K",
      "Transparent PNGs of all tears",
      "Layered PSD of all tears",
      "License certificate",
    ],
    compatibility: ["Photoshop", "Illustrator", "Figma", "After Effects"],
    license: "Commercial",
    licenseSummary:
      "Use in client and monetised work. No reselling the assets.",
    setNumber: "004",
    formats: ["PNG", "PSD"],
    fileSize: "ZIP · 172MB",
    tags: ["paper", "tears", "texture", "collage", "grunge", "psd"],
    featured: true,
    isNew: false,
    payhipId: "pm6Iy",
    rating: { average: 5, count: 2 },
  },
  {
    id: "photoshop-patterns-v1",
    slug: "photoshop-patterns",
    title: "Photoshop Patterns",
    creatorSlug: "frostify",
    price: 6.99,
    category: "thumbnails",
    subcategory: "Patterns",
    valueProp: "12 tiling patterns you can recolour and rescale.",
    shortDescription:
      "12 crafted Photoshop patterns as a PAT file and an editable PSD.",
    description: [
      "Twelve patterns built to add depth and texture to a layout without taking it over. Useful as backgrounds, overlays or a base to build custom textures on.",
      "The PAT file installs straight into Photoshop for one-click fills, and the editable PSD gives you full control over colour, scale and blending.",
    ],
    thumbnail: "/products/photoshop-patterns-cover.png",
    previewImages: [
      "/products/photoshop-patterns-cover.png",
      "/products/photoshop-patterns-g1.png",
      "/products/photoshop-patterns-g2.png",
    ],
    includedFiles: [
      "PSD pack of 12 patterns",
      "PAT file for one-click installation",
      "License certificate",
    ],
    compatibility: ["Photoshop"],
    license: "Commercial",
    licenseSummary:
      "Use in client and monetised work. No reselling the assets.",
    setNumber: "005",
    formats: ["PAT", "PSD"],
    fileSize: "ZIP · 40MB",
    tags: ["patterns", "pat", "texture", "backgrounds", "psd", "tiling"],
    featured: false,
    isNew: false,
    payhipId: "f7yk9",
  },
  {
    id: "speedlines-v1",
    slug: "speedlines",
    title: "Speedlines",
    creatorSlug: "frostify",
    price: 0,
    category: "editing",
    subcategory: "Effects",
    valueProp: "Five 4K speedlines for pulling focus fast.",
    shortDescription:
      "5 static 4K speedlines in PSD and transparent PNG. Free.",
    description: [
      "Five 4K speedlines for directing attention and adding a bold, dynamic edge to posters, social graphics and thumbnails.",
      "Use the PSD when you want to customise, or drag the transparent PNGs straight in when you do not.",
    ],
    thumbnail: "/products/speedlines-cover.png",
    previewImages: [
      "/products/speedlines-cover.png",
      "/products/speedlines-g1.png",
    ],
    includedFiles: [
      "5 speedlines in PSD format",
      "5 individual transparent PNGs",
      "License certificate",
    ],
    compatibility: ["Photoshop", "After Effects", "Premiere Pro", "Figma"],
    license: "Commercial",
    licenseSummary:
      "Use in client and monetised work. No reselling the assets.",
    setNumber: "006",
    formats: ["PSD", "PNG"],
    fileSize: "ZIP · 25MB",
    tags: ["speedlines", "free", "4k", "effects", "psd", "png"],
    featured: false,
    isNew: false,
    payhipId: "oPSQG",
    rating: { average: 5, count: 2 },
  },
  {
    id: "sparks-particles-v1",
    slug: "sparks-and-particles",
    title: "Sparks & Particles",
    creatorSlug: "frostify",
    price: 0,
    category: "editing",
    subcategory: "Overlays",
    valueProp: "19 real-fireworks particles in one layered PSD.",
    shortDescription:
      "19 HD spark and particle overlays shot from real fireworks. Free.",
    description: [
      "Nineteen sparks and particles captured from real fireworks, for adding an explosive, celebratory feel to photos, graphics and scenes.",
      "Every element is 1920×1080 and packaged in a single PSD, so sizes, colours and blending modes stay under your control.",
    ],
    thumbnail: "/products/sparks-cover.png",
    previewImages: ["/products/sparks-cover.png", "/products/sparks-g1.png"],
    includedFiles: [
      "PSD file with 19 HD sparks and particles",
      "License certificate",
    ],
    compatibility: ["Photoshop", "After Effects", "Premiere Pro"],
    license: "Commercial",
    licenseSummary:
      "Use in client and monetised work. No reselling the assets.",
    setNumber: "007",
    formats: ["PSD"],
    fileSize: "ZIP · 16MB",
    tags: ["sparks", "particles", "free", "overlays", "fireworks", "psd"],
    featured: false,
    isNew: false,
    payhipId: "9xFdn",
  },
  {
    id: "doodles-sample-v1",
    slug: "hand-drawn-doodles-sample",
    title: "Hand-Drawn Doodles (Sample)",
    creatorSlug: "frostify",
    price: 0,
    category: "thumbnails",
    subcategory: "Sample",
    valueProp: "A free taste of the Hand-Drawn Doodles pack.",
    shortDescription:
      "A free sample of the Hand-Drawn Doodles pack. Try before you buy.",
    description: [
      "A free slice of the Hand-Drawn Doodles pack, so you can drop the assets into a real layout before deciding on the full set.",
      "The complete pack includes all 110 doodles in PSD, PNG and SVG, ready for scaling, recolouring and layering.",
    ],
    thumbnail: "/products/doodles-sample-cover.png",
    previewImages: ["/products/doodles-sample-cover.png"],
    includedFiles: ["Sample doodles", "License certificate"],
    compatibility: ["Photoshop", "Illustrator", "Figma"],
    license: "Commercial",
    licenseSummary:
      "Use in client and monetised work. No reselling the assets.",
    setNumber: "S01",
    formats: ["PSD", "PNG", "SVG"],
    fileSize: "ZIP · 1MB",
    tags: ["doodles", "free", "sample", "hand-drawn"],
    featured: false,
    isNew: true,
    payhipId: "I09f8",
  },
  {
    id: "patterns-sample-v1",
    slug: "photoshop-patterns-sample",
    title: "Photoshop Patterns (Sample)",
    creatorSlug: "frostify",
    price: 0,
    category: "thumbnails",
    subcategory: "Sample",
    valueProp: "A free taste of the Photoshop Patterns pack.",
    shortDescription:
      "A free sample of the Photoshop Patterns pack. Try before you buy.",
    description: [
      "A free slice of the Photoshop Patterns pack, so you can see how the patterns sit in a real layout before buying the full set.",
      "The complete pack includes all 12 patterns in PSD and PAT, built for backgrounds, overlays and custom textures.",
    ],
    thumbnail: "/products/patterns-sample-cover.png",
    previewImages: ["/products/patterns-sample-cover.png"],
    includedFiles: ["Sample patterns", "License certificate"],
    compatibility: ["Photoshop"],
    license: "Commercial",
    licenseSummary:
      "Use in client and monetised work. No reselling the assets.",
    setNumber: "S02",
    formats: ["PAT", "PSD"],
    fileSize: "ZIP · 12MB",
    tags: ["patterns", "free", "sample", "pat"],
    featured: false,
    isNew: true,
    payhipId: "v912K",
  },
];

/* ---------- licensing ---------- */

export type LicenceTier = {
  id: "personal" | "commercial" | "extended";
  label: string;
  blurb: string;
  price: number;
  recommended?: boolean;
  /**
   * Payhip listing for this tier. Payhip prices one product at one price, so
   * each paid tier needs its own listing. Until these are filled in, every
   * tier checks out against the product's base listing at its base price.
   */
  payhipId?: string;
};

/**
 * PLACEHOLDER PRICING.
 *
 * Commercial matches the product's real listed price, because the licence
 * shipping with every pack today already permits commercial use. Personal and
 * Extended are derived from it purely so the interface can be built and seen;
 * they are not prices anyone has agreed. Replace the two multipliers, and add
 * a payhipId per tier, before this goes anywhere near a customer.
 */
const PERSONAL_MULTIPLIER = 0.6;
const EXTENDED_MULTIPLIER = 3;

const round99 = (n: number) => Math.max(1, Math.round(n) - 0.01);

export const licenceTiers = (product: Product): LicenceTier[] => {
  if (product.price === 0) return [];

  return [
    {
      id: "personal",
      label: "Personal",
      blurb: "Personal projects and portfolio work. No client or paid use.",
      price: round99(product.price * PERSONAL_MULTIPLIER),
    },
    {
      id: "commercial",
      label: "Commercial",
      blurb:
        "Client work, sponsored videos and monetised channels. No per-project limit.",
      price: product.price,
      recommended: true,
    },
    {
      id: "extended",
      label: "Extended",
      blurb:
        "Everything in Commercial, plus use across a team and in products you sell on.",
      price: round99(product.price * EXTENDED_MULTIPLIER),
    },
  ];
};

/* ---------- lookups ---------- */

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);
export const getCategory = (id: string) => categories.find((c) => c.id === id);
export const byCategory = (id: CategoryId) =>
  products.filter((p) => p.category === id);
export const byCreator = (slug: string) =>
  products.filter((p) => p.creatorSlug === slug);

/** Frostify Picks. Hand-selected, never algorithmic. */
export const frostifyPicks = () => products.filter((p) => p.featured);

/** Newest releases first. Flag-driven so it never fakes recency. */
export const newDrops = () => products.filter((p) => p.isNew);

export const under = (max: number) =>
  products.filter((p) => p.price > 0 && p.price < max);

export const bundles = () => products.filter((p) => p.bundleOf?.length);

/** Members of a bundle that exist as their own listings. */
export const bundleContents = (product: Product) =>
  (product.bundleOf ?? [])
    .map(getProduct)
    .filter((p): p is Product => Boolean(p));

/**
 * What the bundle's contents cost bought separately, summed from the real
 * listings rather than stored, so the saving can never drift from the prices.
 */
export const bundleTotal = (product: Product) =>
  bundleContents(product).reduce((sum, p) => sum + p.price, 0);

export const relatedTo = (product: Product, limit = 3) =>
  products
    .filter((p) => p.slug !== product.slug)
    .sort((a, b) => {
      const score = (p: Product) =>
        (p.category === product.category ? 2 : 0) +
        p.tags.filter((t) => product.tags.includes(t)).length;
      return score(b) - score(a);
    })
    .slice(0, limit);

/** Every distinct software name across the catalogue, for filters. */
export const allSoftware = () =>
  [...new Set(products.flatMap((p) => p.compatibility))].sort();

/** Matches title, tags, category, subcategory and description text. */
export function searchProducts(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/);

  return products
    .map((p) => {
      const haystack = [
        p.title,
        p.subcategory,
        p.category,
        p.shortDescription,
        p.valueProp,
        ...p.tags,
        ...p.compatibility,
        ...p.description,
      ]
        .join(" ")
        .toLowerCase();

      // Title hits are worth more than body hits.
      const score = terms.reduce((total, term) => {
        if (p.title.toLowerCase().includes(term)) return total + 3;
        if (p.tags.some((t) => t.includes(term))) return total + 2;
        if (haystack.includes(term)) return total + 1;
        return total;
      }, 0);

      return {
        product: p,
        score,
        matchedAll: terms.every((t) => haystack.includes(t)),
      };
    })
    .filter((r) => r.matchedAll && r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.product);
}

export const formatPrice = (price: number) =>
  price === 0 ? "Free" : price % 1 === 0 ? `$${price}` : `$${price.toFixed(2)}`;
