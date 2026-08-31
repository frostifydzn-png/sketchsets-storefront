import Image from "next/image";
import Link from "next/link";
import { byCategory, formatPrice, type Category } from "@/lib/products";

/**
 * A category, shown as what is inside it.
 *
 * Artwork, name, and how much is in there. The icon chip, the bordered tile
 * and the "View all →" affordance are all gone: an icon in a rounded square
 * above a title above a description is the exact shape of a software feature
 * grid, and none of it told anyone anything the artwork does not.
 *
 * `data-room` still repoints `--room`, so each category keeps its own accent
 * on the hover state.
 */
export function CategoryCard({ category }: { category: Category }) {
  const items = byCategory(category.id);
  if (items.length === 0) return null;

  const from = Math.min(...items.map((p) => p.price));

  /*
   * Deliberately not the first item: the lead of each category is usually also
   * a featured pick, so using it put the same cover twice on one screen. The
   * second item, and its alternate shot where one exists, keeps the row of
   * categories visually distinct from the row of products above it.
   */
  const source = items[1] ?? items[0];
  const preview = source.previewImages[1] ?? source.thumbnail;

  return (
    <Link
      href={`/${category.id}`}
      data-room={category.id}
      className="group block focus-visible:outline-none"
    >
      <div className="bg-elevated relative aspect-[5/3] overflow-hidden rounded-xl">
        <Image
          src={preview}
          alt=""
          aria-hidden="true"
          fill
          sizes="(max-width: 768px) 90vw, 30vw"
          className="object-cover transition-transform duration-[900ms] ease-[var(--ease-glide)] group-hover:scale-[1.04]"
        />
      </div>

      <div className="mt-4">
        <h3 className="group-hover-room text-[1.25rem] font-bold tracking-[-0.02em] text-white transition-colors">
          {category.name}
        </h3>
        <p className="text-muted mt-1.5 text-[14px] leading-relaxed">
          {category.blurb}
        </p>
        <p className="text-dim mt-2.5 text-[13.5px]">
          {items.length} {items.length === 1 ? "pack" : "packs"}
          {from > 0 ? ` · from ${formatPrice(from)}` : " · free options"}
        </p>
      </div>
    </Link>
  );
}
