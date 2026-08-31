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

      <nav
        aria-label="Breadcrumb"
        className="text-muted flex justify-center gap-2 text-[13px]"
      >
        <Link href="/browse" className="hover:text-text transition-colors">
          Shop
        </Link>
        <span>/</span>
        {category && (
          <>
            <Link
              href={`/${category.id}`}
              className="hover:text-text transition-colors"
            >
              {category.name}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-dim">{product.title}</span>
      </nav>

      {/* Name leads as a poster, so what the page is about is unmistakable. */}
      <header className="relative pt-8 pb-10 text-center sm:pt-10 sm:pb-12">
        <div
          aria-hidden="true"
          className="hero-glow pointer-events-none absolute inset-0 z-0"
        />
        <div className="relative z-10">
          <h1 className="font-display-tight text-[clamp(2.25rem,6vw,4.75rem)] leading-[0.92] uppercase">
            {product.title}
          </h1>
          <p className="text-dim mx-auto mt-5 max-w-xl text-[17px] leading-relaxed sm:text-[19px]">
            {product.valueProp}
          </p>
          {product.rating && (
            <p className="text-muted mt-4 text-[14px]">
              <span className="text-accent">★</span>{" "}
              {product.rating.average.toFixed(1)} from {product.rating.count}{" "}
              {product.rating.count === 1 ? "review" : "reviews"}
            </p>
          )}
        </div>
      </header>

      {/*
        Explicit grid placement so the source order stays gallery, purchase
        panel, detail. On mobile that puts the price and buy button directly
        under the artwork; on desktop the panel spans both rows and stays
        stuck beside the whole read.
      */}
      <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
        <div className="min-w-0 lg:col-start-1 lg:row-start-1">
          <ProductGallery
            images={product.previewImages}
            video={product.videoPreview}
            title={product.title}
          />
        </div>

        <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <BuyPanel product={product} />
        </div>

        {/* Reads as prose, not a spec sheet. */}
        <div className="min-w-0 lg:col-start-1 lg:row-start-2">
          <div className="section-gap-sm max-w-[62ch]">
            <p className="text-text text-[20px] leading-relaxed sm:text-[22px]">
              {product.description[0]}
            </p>
            {product.description.slice(1).map((p) => (
              <p
                key={p.slice(0, 40)}
                className="text-dim mt-6 text-[17px] leading-relaxed"
              >
                {p}
              </p>
            ))}

            <h2 className="font-display mt-16 text-[1.5rem] leading-none">
              What&rsquo;s included
            </h2>
            <ul className="mt-6 space-y-4">
              {product.includedFiles.map((file) => (
                <li key={file} className="text-dim text-[16px] leading-relaxed">
                  {file}
                </li>
              ))}
            </ul>

            <h2 className="font-display mt-16 text-[1.5rem] leading-none">
              Good to know
            </h2>
            <div className="mt-6 space-y-5 text-[16px]">
              <p className="text-dim leading-relaxed">
                Works with {product.compatibility.join(", ")}. Delivered as{" "}
                {product.fileSize.replace("ZIP · ", "a ")} ZIP.
              </p>
              <p className="text-dim leading-relaxed">
                {product.licenseSummary}{" "}
                <a
                  href={payhipPage("license")}
                  className="text-accent hover:underline"
                >
                  Read the full licence
                </a>
                .
              </p>
            </div>

            {creator && (
              <div className="border-line mt-16 border-t pt-8">
                <div className="flex items-start gap-4">
                  <span className="bg-elevated text-dim flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[14px] font-semibold">
                    {monogram(creator.name)}
                  </span>
                  <div>
                    <Link
                      href={`/creators/${creator.slug}`}
                      className="hover:text-accent text-[17px] font-semibold transition-colors"
                    >
                      {creator.name}
                    </Link>
                    <p className="text-muted text-[14px]">{creator.role}</p>
                    <p className="text-dim mt-3 text-[16px] leading-relaxed">
                      {creator.bio}
                    </p>
                    <Link
                      href={`/creators/${creator.slug}`}
                      className="text-dim hover:text-text mt-4 inline-block text-[15px] transition-colors"
                    >
                      All {byCreator(creator.slug).length} packs
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
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
          <p className="text-muted text-[14px]">Pairs well with</p>
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
