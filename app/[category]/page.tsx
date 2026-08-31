import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { byCategory, categories, getCategory, type CategoryId } from "@/lib/products";

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
    <div className="mx-auto max-w-6xl px-5 pt-14 sm:px-8">
      <header className="max-w-2xl">
        <p className="text-accent-bright text-[11px] font-semibold tracking-wider uppercase">
          Category
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          {found.name}
        </h1>
        <p className="text-text-dim mt-3 text-base leading-relaxed">
          {found.description}
        </p>
      </header>

      <nav aria-label="Categories" className="mt-8 flex flex-wrap gap-2">
        <Link
          href="/browse"
          className="text-text-dim hover:text-text rounded-lg px-3.5 py-2 text-sm font-medium transition-colors hover:bg-white/[0.04]"
        >
          All
        </Link>
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/${c.id}`}
            aria-current={c.id === found.id ? "page" : undefined}
            className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
              c.id === found.id
                ? "bg-white/[0.08] text-text"
                : "text-text-dim hover:text-text hover:bg-white/[0.04]"
            }`}
          >
            {c.name}
          </Link>
        ))}
      </nav>

      {items.length > 0 ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((product, i) => (
            <ProductCard key={product.id} product={product} priority={i < 3} />
          ))}
        </div>
      ) : (
        <p className="text-text-dim border-line mt-8 rounded-xl border border-dashed px-6 py-12 text-center text-sm">
          Nothing here yet — new packs land in this category soon.
        </p>
      )}
    </div>
  );
}
