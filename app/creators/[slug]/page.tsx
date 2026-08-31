import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LabelPanel } from "@/components/LabelPanel";
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
    <div className="shell stack-bottom">
      <header className="max-w-2xl pt-10 pb-10 sm:pt-14 sm:pb-12">
        <span className="bg-elevated border-line flex h-16 w-16 items-center justify-center rounded-2xl border text-[20px] font-extrabold">
          {monogram(creator.name)}
        </span>
        <h1 className="mt-6 text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.04] font-extrabold tracking-[-0.03em]">
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

      <LabelPanel
        title={`${items.length} ${items.length === 1 ? "pack" : "packs"}`}
        description={`Everything ${creator.name} has in the shop.`}
        action={{ href: "/browse", label: "Browse everything" }}
      >
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {items.map((product, i) => (
            <ProductCard key={product.id} product={product} priority={i < 4} />
          ))}
        </div>
      </LabelPanel>
    </div>
  );
}
