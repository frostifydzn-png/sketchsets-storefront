export type CategoryId = "editing" | "thumbnails" | "creator";

export interface Category {
  id: CategoryId;
  name: string;
  blurb: string;
  description: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  creator: string;
  price: number;
  category: CategoryId;
  subcategory: string;
  shortDescription: string;
  description: string[];
  thumbnail: string;
  previewImages: string[];
  videoPreview?: string;
  includedFiles: string[];
  compatibility: string[];
  license: string;
  fileSize: string;
  tags: string[];
  featured: boolean;
  isNew: boolean;
  /** Payhip product id — the `<id>` in /b/<id>. Combined with CHECKOUT_BASE. */
  payhipId: string;
  rating?: { average: number; count: number };
}

export const categories: Category[] = [
  {
    id: "editing",
    name: "Editing",
    blurb: "Overlays, glows, particles and motion",
    description:
      "Drop-in elements for video work — light leaks, glows, flares and particles that composite cleanly over footage.",
  },
  {
    id: "thumbnails",
    name: "Thumbnails",
    blurb: "PSDs, textures, brushes and effects",
    description:
      "Layered assets built for click-through — hand-drawn accents, torn paper, brush textures and patterns that survive being scaled down to a grid.",
  },
  {
    id: "creator",
    name: "Creator",
    blurb: "Bundles, templates and workflow tools",
    description:
      "Bigger kits for people who ship constantly — full collections that cover a whole workflow rather than a single effect.",
  },
];

export const products: Product[] = [
  {
    id: "vault-v1",
    slug: "sketchsets-vault",
    title: "SketchSets Vault",
    creator: "Frostify",
    price: 29,
    category: "creator",
    subcategory: "Bundle",
    shortDescription:
      "Every SketchSets Collection V1 pack in one download. Seven packs, one price.",
    description: [
      "The complete SketchSets Collection V1 library in a single download. Seven hand-crafted asset packs bundled for creators, designers and editors who want the full toolkit without paying for each piece separately.",
      "Every pack inside The Vault is built to the same standard — hand-drawn doodles, high-resolution vector brushes, cinematic glows, paper tears and real-fireworks particles. Whether you are working on social graphics, thumbnails, branding or edits, it is all here.",
      "$45.94 of paid packs plus two free packs, for $29.",
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
      "Hand-Drawn Doodles — 110 doodles (SVG, PNG, PSD)",
      "Vector Brush Assets — 20 brushes at 4000×4000 (PSD, SVG, PNG)",
      "Leaks & Glows — 11 glows, 3 leaks, 6 flares at 1080p with PSD",
      "Paper Tears — 8 HD/4K tears with PSD",
      "Photoshop Patterns — 12 patterns (PAT and PSD)",
      "Sparks & Particles — 19 real-fireworks particles in HD PSD",
      "Speedlines — 5 4K speedlines (PSD and PNG)",
    ],
    compatibility: [
      "Photoshop",
      "Illustrator",
      "After Effects",
      "Premiere Pro",
      "Any app that reads PNG/SVG",
    ],
    license: "Commercial",
    fileSize: "ZIP · 487MB",
    tags: ["bundle", "vault", "collection", "value", "psd", "svg"],
    featured: true,
    isNew: false,
    payhipId: "JogCA",
  },
  {
    id: "doodles-v1",
    slug: "hand-drawn-doodles",
    title: "Hand-Drawn Doodles",
    creator: "Frostify",
    price: 12.99,
    category: "thumbnails",
    subcategory: "Assets",
    shortDescription:
      "110 hand-crafted doodles in SVG, PNG and PSD. Arrows, stars, crowns and symbols.",
    description: [
      "A playful, hand-drawn set built to add character to anything. 110 unique doodles covering arrows, stars, crowns and symbols — versatile enough for thumbnails, social graphics and branding alike.",
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
    creator: "Frostify",
    price: 8.99,
    category: "editing",
    subcategory: "Overlays",
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
    creator: "Frostify",
    price: 8.99,
    category: "thumbnails",
    subcategory: "Textures",
    shortDescription:
      "20 hand-drawn brush strokes at 4000×4000 in PSD, SVG and PNG.",
    description: [
      "Twenty custom brush strokes for adding an organic, hand-made edge to otherwise clean design. Built large — 4000×4000 — so they hold up on posters and print as well as they do on a thumbnail.",
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
    creator: "Frostify",
    price: 7.99,
    category: "thumbnails",
    subcategory: "Textures",
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
    fileSize: "ZIP · 172MB",
    tags: ["paper", "tears", "texture", "collage", "grunge", "psd"],
    featured: false,
    isNew: false,
    payhipId: "pm6Iy",
    rating: { average: 5, count: 2 },
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const byCategory = (id: CategoryId) =>
  products.filter((p) => p.category === id);
export const getCategory = (id: string) => categories.find((c) => c.id === id);
export const featuredProducts = () => products.filter((p) => p.featured);

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

export const formatPrice = (price: number) =>
  price === 0 ? "Free" : price % 1 === 0 ? `$${price}` : `$${price.toFixed(2)}`;
