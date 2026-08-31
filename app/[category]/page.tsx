import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductBrowser } from "@/components/ProductBrowser";
import {
  byCategory,
  categories,
  getCategory,
  type CategoryId,
} from "@/lib/products";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.id }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/[category]">): Promise<Metadata> {
  const { category } = await params;
  const found = getCategory(category);
  if (!found) return {};
  return {
    title: found.name,
    description: found.intro,
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
  const software = [...new Set(items.flatMap((p) => p.compatibility))].sort();

  return (
    <div className="shell pt-14 sm:pt-20">
      <header>
        {/* Each category carries its own identity colour, one hairline only. */}
        <span
          aria-hidden="true"
          className="block h-1 w-16 rounded-full"
          style={{ background: found.accentVar }}
        />
        <h1 className="font-display-tight mt-5 text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95]">
          {found.name}
        </h1>
        <p className="text-dim mt-4 max-w-lg text-[16px] leading-relaxed">
          {found.intro}
        </p>
      </header>

      <ProductBrowser
        products={items}
        software={software}
        lockedCategory={found.id}
      />
    </div>
  );
}
