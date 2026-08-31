import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { creators, getCreator, monogram } from "@/lib/creators";
import { byCreator } from "@/lib/products";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return creators.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/creators/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const creator = getCreator(slug);
  if (!creator) return {};
  return {
    title: creator.name,
    description: creator.bio,
    alternates: { canonical: `/creators/${creator.slug}` },
    openGraph: {
      type: "profile",
      title: `${creator.name} · ${site.name}`,
      description: creator.bio,
      url: `/creators/${creator.slug}`,
    },
  };
}

export default async function CreatorPage({
  params,
}: PageProps<"/creators/[slug]">) {
  const { slug } = await params;
  const creator = getCreator(slug);
  if (!creator) notFound();

  const items = byCreator(creator.slug);

  return (
    <div className="shell pt-16 sm:pt-24">
      <header className="max-w-2xl">
        <span className="bg-elevated ring-line flex h-16 w-16 items-center justify-center rounded-full text-[20px] font-bold ring-1">
          {monogram(creator.name)}
        </span>
        <h1 className="font-display-tight mt-6 text-[clamp(2.25rem,5vw,3.75rem)] leading-[0.95]">
          {creator.name}
        </h1>
        <p className="text-muted mt-2 text-[15px]">{creator.role}</p>
        <p className="text-dim mt-5 text-[16px] leading-relaxed">
          {creator.intro ?? creator.bio}
        </p>
        {creator.links && creator.links.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-4">
            {creator.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent text-[14px] font-medium hover:underline"
              >
                {l.label} ↗
              </a>
            ))}
          </div>
        )}
      </header>

      <h2 className="font-display border-line mt-16 border-t pt-10 text-[clamp(1.5rem,3vw,2rem)] leading-none">
        {items.length} {items.length === 1 ? "pack" : "packs"}
      </h2>
      <div className="mt-7 grid grid-cols-2 gap-x-5 gap-y-9 lg:grid-cols-4">
        {items.map((product, i) => (
          <ProductCard key={product.id} product={product} priority={i < 4} />
        ))}
      </div>
    </div>
  );
}
