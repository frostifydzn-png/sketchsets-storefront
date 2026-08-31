/**
 * Support content.
 *
 * Every answer here is something the shop can actually back up today. Where a
 * policy has not been set yet (refunds is the live example), the answer points
 * at a human rather than inventing terms that would not hold.
 */
export type FaqSection = {
  id: string;
  title: string;
  intro: string;
  items: { q: string; a: string }[];
};

export const supportSections: FaqSection[] = [
  {
    id: "general",
    title: "General questions",
    intro: "The questions that come up most often, whatever you are buying.",
    items: [
      {
        q: "What is SketchSets?",
        a: "A small, curated shop of creative resources for people who make internet content: overlays, textures, brushes, hand-drawn assets and bundles. Every pack is made or vetted by Frostify before it goes up, which is why the catalogue stays deliberately small.",
      },
      {
        q: "Do I need an account?",
        a: "No. Checkout runs through Payhip and does not require you to create an account first. You will get an email with your download link once payment clears.",
      },
      {
        q: "Are the free packs really free?",
        a: "Yes, and they are complete packs rather than trials or watermarked samples. They carry the same commercial licence as everything else. There is no email wall in front of them.",
      },
      {
        q: "Who makes the packs?",
        a: "Frostify, an editor and thumbnail designer working with creators on YouTube. Everything on the shop today is his own work, built for real client projects before it was ever listed.",
      },
    ],
  },
  {
    id: "products",
    title: "Products and files",
    intro:
      "What is inside a pack, what you need to open it, and how the files are organised.",
    items: [
      {
        q: "What file types do I get?",
        a: "It varies by pack and every product page lists its formats near the price. Across the shop you will find PSD, PNG, SVG and PAT files. Product pages also list the exact software each pack is built for.",
      },
      {
        q: "What software do I need?",
        a: "Most packs are built around Photoshop. Several also work in Illustrator, After Effects, Premiere Pro, DaVinci Resolve and Figma. The Works with list on each product page is the authoritative answer for that pack.",
      },
      {
        q: "How big are the downloads?",
        a: "Each product page shows its exact download size, from around 1MB for a sample up to 487MB for the full Vault. Everything arrives as a single ZIP.",
      },
      {
        q: "Can I open these on an iPad or phone?",
        a: "PNG and SVG files will open almost anywhere. Layered PSD files and PAT pattern files need desktop Photoshop, or an app that supports those formats properly.",
      },
    ],
  },
  {
    id: "orders",
    title: "Orders and downloads",
    intro: "Payment, delivery, and what to do when a download does not arrive.",
    items: [
      {
        q: "How do I pay?",
        a: "Checkout is handled by Payhip, which processes the payment securely. SketchSets never sees or stores your card details.",
      },
      {
        q: "When do I get my files?",
        a: "Straight away. Payhip emails a download link as soon as payment clears, and gives you a download page at the same time.",
      },
      {
        q: "My download email never arrived.",
        a: "Check spam first, since the email comes from Payhip rather than from SketchSets. You can also sign in to your Payhip account to re-download anything you have bought. If it is still missing, get in touch and we will resend it.",
      },
      {
        q: "Can I get a refund?",
        a: "Digital downloads are difficult to return once delivered, so refunds are handled case by case. If a pack is not what you expected or a file will not open, contact us and we will sort it out.",
      },
    ],
  },
  {
    id: "licensing",
    title: "Licensing",
    intro:
      "What you are allowed to do with the files. The short version is: use them in your work, do not resell them.",
    items: [
      {
        q: "Can I use these commercially?",
        a: "Yes. A commercial licence is included with every pack, free ones included. Client projects, sponsored videos and monetised channels are all covered, with no extra fee and no per-project limit.",
      },
      {
        q: "Can I use them for clients?",
        a: "Yes. You can use the assets in work you are paid for, including work you deliver to a client as a finished piece.",
      },
      {
        q: "What am I not allowed to do?",
        a: "You cannot resell, redistribute or share the raw files, and you cannot repackage them into a product that competes with the original pack. The assets are licensed to you, not transferred to you.",
      },
      {
        q: "Do I need to credit SketchSets?",
        a: "No credit is required. It is always welcome, but it is not a condition of the licence.",
      },
    ],
  },
];
