import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import {
  byCategory,
  categories,
  getCategory,
  type CategoryId,
} from "@/lib/products";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.id }));
}

// Only the three known category slugs are valid at this segment.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/[category]">): Promise<Metadata> {
  const { category } = await params;
  const found = getCategory(category);
  if (!found) return {};
  return {
    title: found.name,
    description: found.description,
    alternates: { canonical: `/${found.id}` },
  };
}

export default async function CategoryPage({
  params,
}: PageProps<"/[category]">) {
  const { category } = await params;
  const found = getCategory(category);
  if (!found) notFound();

  const items = byCategory(found.id as CategoryId);

  return (
    <div className="mx-auto max-w-[1400px] px-6 pt-14 sm:px-10 sm:pt-20">
      <header className="max-w-3xl">
        <h1 className="font-display text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] font-extrabold">
          {found.name}
        </h1>
        <p className="text-text-dim mt-5 max-w-lg text-[17px] leading-relaxed">
          {found.description}
        </p>
      </header>

      <nav
        aria-label="Categories"
        className="border-line mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 border-b pb-5"
      >
        <Link
          href="/browse"
          className="text-text-faint hover:text-text text-[15px] transition-colors"
        >
          All
        </Link>
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/${c.id}`}
            aria-current={c.id === found.id ? "page" : undefined}
            className={`text-[15px] transition-colors ${
              c.id === found.id
                ? "text-text font-medium"
                : "text-text-faint hover:text-text"
            }`}
          >
            {c.name}
          </Link>
        ))}
        <span className="text-text-faint ml-auto text-[13px]">
          {items.length} {items.length === 1 ? "pack" : "packs"}
        </span>
      </nav>

      {items.length > 0 ? (
        <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((product, i) => (
            <ProductCard key={product.id} product={product} priority={i < 3} />
          ))}
        </div>
      ) : (
        <p className="text-text-faint mt-16 text-[17px]">
          Nothing here yet — new packs land in this category soon.
        </p>
      )}
    </div>
  );
}
