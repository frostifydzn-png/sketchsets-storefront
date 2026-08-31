import Image from "next/image";
import Link from "next/link";
import { byCategory, type Category, type CategoryId } from "@/lib/products";

/**
 * Category tile.
 *
 * Icon chip and label on the left, a real preview of what is inside on the
 * right. `data-room` repoints `--room`, so Editing, Thumbnails and Creator
 * Tools each pick up their own hue through one shared component — violet, pink
 * and blue, all inside the site's gradient family so the row still reads as a
 * set rather than three unrelated tiles.
 */
export function CategoryCard({ category }: { category: Category }) {
  const items = byCategory(category.id);
  if (items.length === 0) return null;

  const preview = items[0];

  return (
    <Link
      href={`/${category.id}`}
      data-room={category.id}
      className="group bg-elevated border-line hover:border-line-bright relative flex items-center gap-4 overflow-hidden rounded-2xl border p-4 transition-colors duration-500 sm:p-5"
    >
      <div className="min-w-0 flex-1">
        <span
          className="border-line-bright bg-raised flex h-10 w-10 items-center justify-center rounded-xl border"
          style={{ color: "var(--room)" }}
        >
          <CategoryIcon id={category.id} />
        </span>

        <h3 className="mt-4 text-[13px] font-extrabold tracking-[0.05em] text-white uppercase">
          {category.name}
        </h3>
        <p className="text-dim mt-1.5 text-[13px] leading-relaxed">
          {category.blurb}
        </p>

        <span className="group-hover-room text-accent mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold transition-colors">
          View all
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            &rarr;
          </span>
        </span>
      </div>

      {/* What is actually inside, at full opacity. Contents, not decoration. */}
      <span className="bg-raised border-line relative hidden aspect-[4/3] w-[38%] shrink-0 overflow-hidden rounded-xl border sm:block">
        <Image
          src={preview.thumbnail}
          alt={preview.title}
          fill
          sizes="(max-width: 1024px) 40vw, 220px"
          className="object-cover transition-transform duration-[900ms] ease-[var(--ease-glide)] group-hover:scale-[1.06]"
        />
      </span>
    </Link>
  );
}

/**
 * One glyph per room. Deliberately geometric and stroke-only so they read as
 * wayfinding marks rather than as the icon-above-title feature furniture the
 * shop is trying not to look like.
 */
function CategoryIcon({ id }: { id: CategoryId }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 18 18",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (id === "editing") {
    /* Stacked frames: a timeline. */
    return (
      <svg {...common}>
        <rect x="2" y="3" width="14" height="8" rx="1.5" />
        <path d="M4 14h10M6.5 8.2V5.8L10 7z" />
      </svg>
    );
  }

  if (id === "thumbnails") {
    /* Nodes and links: composed assets. */
    return (
      <svg {...common}>
        <circle cx="4.5" cy="4.5" r="2" />
        <circle cx="13.5" cy="4.5" r="2" />
        <circle cx="9" cy="13.5" r="2" />
        <path d="M6.5 4.5h5M5.6 6.2l2.4 5.4M12.4 6.2 10 11.6" />
      </svg>
    );
  }

  /* Creator tools: a bundle of panels. */
  return (
    <svg {...common}>
      <rect x="2" y="2.5" width="6" height="6" rx="1.2" />
      <rect x="10" y="2.5" width="6" height="6" rx="1.2" />
      <rect x="2" y="10.5" width="6" height="5" rx="1.2" />
      <rect x="10" y="10.5" width="6" height="5" rx="1.2" />
    </svg>
  );
}
