import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BuyPanel } from "@/components/BuyPanel";
import { MobileBuyBar } from "@/components/MobileBuyBar";
import { ProductCard } from "@/components/ProductCard";
import { ProductGallery } from "@/components/ProductGallery";
import { getCreator, monogram } from "@/lib/creators";
import {
  byCreator,
  formatPrice,
  getCategory,
  getProduct,
  products,
  relatedTo,
} from "@/lib/products";
import { payhipPage, site } from "@/lib/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};

  return {
    title: product.title,
    description: product.shortDescription,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      type: "website",
      title: `${product.title} · ${site.name}`,
      description: product.shortDescription,
      url: `/products/${product.slug}`,
      images: [{ url: product.thumbnail, alt: `${product.title} preview` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} · ${site.name}`,
      description: product.shortDescription,
      images: [product.thumbnail],
    },
  };
}

export default async function ProductPage({
  params,
}: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const creator = getCreator(product.creatorSlug);
  const related = relatedTo(product);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.shortDescription,
    image: [`${site.url}${product.thumbnail}`],
    brand: { "@type": "Brand", name: site.name },
    offers: {
      "@type": "Offer",
      price: product.price.toFixed(2),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${site.url}/products/${product.slug}`,
    },
    ...(product.rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating.average,
        reviewCount: product.rating.count,
      },
    }),
  };

  return (
    <div className="shell pt-6 pb-24 lg:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav aria-label="Breadcrumb" className="text-muted text-[13px]">
        <Link href="/browse" className="hover:text-text transition-colors">
          Shop
        </Link>
        <span className="mx-2">/</span>
        {category && (
          <>
            <Link
              href={`/${category.id}`}
              className="hover:text-text transition-colors"
            >
              {category.name}
            </Link>
            <span className="mx-2">/</span>
          </>
        )}
        <span className="text-dim">{product.title}</span>
      </nav>

      {/*
        Gallery and detail share the left column so the purchase panel stays
        stuck alongside the whole read, rather than leaving dead space.
      */}
      <div className="mt-6 grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:items-start lg:gap-14">
        <div className="min-w-0">
          <ProductGallery
            images={product.previewImages}
            video={product.videoPreview}
            title={product.title}
          />

          <div className="section-gap-sm">
            <Block title="What it does">
              <div className="space-y-4">
                {product.description.map((p) => (
                  <p
                    key={p.slice(0, 40)}
                    className="text-dim text-[16px] leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </Block>

            <Block title="What's included">
              <ul className="grid gap-x-8 sm:grid-cols-2">
                {product.includedFiles.map((file) => (
                  <li
                    key={file}
                    className="border-line text-dim border-b py-3 text-[15px]"
                  >
                    {file}
                  </li>
                ))}
              </ul>
            </Block>

            <Block title="Compatibility">
              <div className="flex flex-wrap gap-2">
                {product.compatibility.map((app) => (
                  <span
                    key={app}
                    className="bg-surface ring-line rounded-lg px-3 py-2 text-[14px] ring-1"
                  >
                    {app}
                  </span>
                ))}
              </div>
              <p className="text-muted mt-4 text-[14px]">
                Delivered as {product.fileSize}.
              </p>
            </Block>

            <Block title="License">
              <p className="text-dim text-[16px] leading-relaxed">
                {product.licenseSummary}
              </p>
              <a
                href={payhipPage("license")}
                className="text-accent mt-3 inline-block text-[14px] font-medium hover:underline"
              >
                Read the full license
              </a>
            </Block>

            {creator && (
              <Block title="Creator">
                <div className="flex items-start gap-4">
                  <span className="bg-elevated ring-line flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-[15px] font-bold ring-1">
                    {monogram(creator.name)}
                  </span>
                  <div>
                    <Link
                      href={`/creators/${creator.slug}`}
                      className="font-display hover:text-accent text-xl transition-colors"
                    >
                      {creator.name}
                    </Link>
                    <p className="text-muted text-[13px]">{creator.role}</p>
                    <p className="text-dim mt-3 text-[15px] leading-relaxed">
                      {creator.bio}
                    </p>
                    <Link
                      href={`/creators/${creator.slug}`}
                      className="text-dim hover:text-text mt-3 inline-block text-[14px] transition-colors"
                    >
                      All {byCreator(creator.slug).length} packs →
                    </Link>
                  </div>
                </div>
              </Block>
            )}
          </div>
        </div>

        <BuyPanel product={product} />
      </div>

      {related.length > 0 && (
        <section className="section-gap">
          <h2 className="font-display mb-7 text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.05]">
            More like this
          </h2>
          <div className="grid grid-cols-2 gap-x-5 gap-y-9 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}

      {/* One contextual pairing, not five. */}
      {product.bundleOf === undefined && <PairsWith slug={product.slug} />}

      <MobileBuyBar product={product} />
    </div>
  );
}

/** Suggests the bundle that contains this product, when one exists. */
function PairsWith({ slug }: { slug: string }) {
  const bundle = products.find((p) => p.bundleOf?.includes(slug));
  if (!bundle || !bundle.bundleValue) return null;

  return (
    <section className="section-gap-sm">
      <Link
        href={`/products/${bundle.slug}`}
        className="bg-surface ring-line hover:ring-line-bright flex flex-col gap-4 rounded-2xl p-6 ring-1 transition-all sm:flex-row sm:items-center sm:justify-between sm:p-8"
      >
        <div>
          <p className="text-accent text-[12px] font-semibold tracking-wider uppercase">
            Pairs well with
          </p>
          <h2 className="font-display mt-2 text-2xl">{bundle.title}</h2>
          <p className="text-dim mt-1.5 text-[15px]">
            This pack plus {(bundle.bundleOf?.length ?? 1) - 1} more, bundled.
          </p>
        </div>
        <div className="shrink-0 text-left sm:text-right">
          <p className="font-display text-3xl">{formatPrice(bundle.price)}</p>
          <p className="text-muted text-[13px]">
            <s>${bundle.bundleValue.toFixed(2)}</s> separately
          </p>
        </div>
      </Link>
    </section>
  );
}

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-line border-t py-9 first:border-t-0 first:pt-0">
      <h2 className="font-display mb-5 text-[1.375rem] leading-none">
        {title}
      </h2>
      {children}
    </section>
  );
}
