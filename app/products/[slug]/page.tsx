import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LicencePicker } from "@/components/LicencePicker";
import { MobileBuyBar } from "@/components/MobileBuyBar";
import { ProductCard } from "@/components/ProductCard";
import { Section } from "@/components/Section";
import { ProductGallery } from "@/components/ProductGallery";
import { getCreator, monogram } from "@/lib/creators";
import {
  bundleTotal,
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
    <div className="shell page-bottom pt-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav
        aria-label="Breadcrumb"
        className="text-muted flex gap-2 text-[12px] tracking-wide"
      >
        <Link href="/browse" className="hover:text-accent transition-colors">
          Shop
        </Link>
        <span>/</span>
        {category && (
          <>
            <Link
              href={`/${category.id}`}
              className="hover:text-accent transition-colors"
            >
              {category.name}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-dim">{product.title}</span>
      </nav>

      {/* Catalogue number sits with the name, the way an archive labels a piece. */}
      <header className="pt-10 pb-10 sm:pt-12 sm:pb-14">
        <p className="text-muted text-[13px]">Set {product.setNumber}</p>
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div>
            <h1 className="max-w-[16ch] text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.02] font-extrabold tracking-[-0.03em]">
              {product.title}
            </h1>
          </div>
          {product.rating && (
            <p className="text-muted text-[13px]">
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
          <div className="lg:sticky lg:top-24">
            <LicencePicker product={product} />
          </div>
        </div>

        <div className="min-w-0 lg:col-start-1 lg:row-start-2">
          <div className="section-gap-sm max-w-[68ch]">
            {/* Lead runs bold and large; the rest is body copy. */}
            <p className="text-text text-[19px] leading-snug font-semibold sm:text-[21px]">
              {product.valueProp}
            </p>
            {product.description.map((p) => (
              <p
                key={p.slice(0, 40)}
                className="text-dim mt-5 text-[16px] leading-relaxed"
              >
                {p}
              </p>
            ))}

            <Block title="This is what you get">
              <ul className="space-y-2.5">
                {product.includedFiles.map((file) => {
                  const [name, detail] = file.split(": ");
                  return (
                    <li
                      key={file}
                      className="text-dim flex gap-3 text-[16px] leading-relaxed"
                    >
                      <span
                        aria-hidden="true"
                        className="text-accent mt-2 h-1 w-1 shrink-0 rounded-full"
                      />
                      <span>
                        <span className="text-text">{name}</span>
                        {detail && (
                          <span className="text-muted">: {detail}</span>
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </Block>

            {product.keyFeatures && product.keyFeatures.length > 0 && (
              <Block title="Key features">
                <ul className="space-y-2.5">
                  {product.keyFeatures.map((f) => (
                    <li
                      key={f}
                      className="text-dim flex gap-3 text-[16px] leading-relaxed"
                    >
                      <span
                        aria-hidden="true"
                        className="text-accent mt-2 h-1 w-1 shrink-0 rounded-full"
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </Block>
            )}

            {/* Spec sheet: label left, value right, hairline between. */}
            <dl className="mt-1">
              <Spec label="Set number">{product.setNumber}</Spec>
              <Spec label="File size">
                {product.fileSize.replace("ZIP · ", "")}
              </Spec>
              <Spec label="File formats">{product.formats.join(", ")}</Spec>
              <Spec label="Licence">{product.license}</Spec>
            </dl>

            <div className="mt-2">
              <Fold title="Software compatibility">
                <p className="text-dim text-[16px] leading-relaxed">
                  Built for {product.compatibility.join(", ")}. The raster files
                  open anywhere that reads PNG; layered and vector files need an
                  app that supports {product.formats.join(", ")}.
                </p>
              </Fold>
              <Fold title="Important information">
                <p className="text-dim text-[16px] leading-relaxed">
                  {product.licenseSummary} Delivered as a single ZIP,
                  downloadable the moment payment clears.{" "}
                  <a
                    href={payhipPage("license")}
                    className="text-accent hover:underline"
                  >
                    Read the full licence
                  </a>
                  .
                </p>
              </Fold>
            </div>

            {product.tags.length > 0 && (
              <ul className="mt-10 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <li
                    key={tag}
                    className="border-line bg-elevated text-muted hover:border-accent hover:text-accent rounded-full border px-3 py-1.5 text-[12px] transition-colors"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}

            {creator && (
              <Block title="About the creator">
                <div className="flex items-start gap-4">
                  <span className="bg-elevated border-line text-dim flex h-11 w-11 shrink-0 items-center justify-center border text-[13px]">
                    {monogram(creator.name)}
                  </span>
                  <div className="max-w-[56ch]">
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
              </Block>
            )}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section>
          <Section
            title="More like this"
            action={{ href: "/browse", label: "Browse everything" }}
          >
            <div className="grid grid-cols-2 gap-x-7 gap-y-12 md:grid-cols-3">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </Section>
        </section>
      )}

      {/* One contextual pairing, not five. */}
      {product.bundleOf === undefined && <PairsWith slug={product.slug} />}

      <MobileBuyBar product={product} />
    </div>
  );
}

/** Spec row: label left, value right, hairline under. Value set in mono. */
function Spec({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-line flex items-baseline justify-between gap-6 border-b py-3.5">
      <dt className="text-muted text-[12px] font-semibold tracking-wider uppercase">
        {label}
      </dt>
      <dd className="text-text text-right text-[13.5px] tracking-wide">
        {children}
      </dd>
    </div>
  );
}

/** Collapsible detail row. Native, so it works without JavaScript. */
function Fold({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <details className="border-line group border-b">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-3.5 text-[12px] font-semibold tracking-wider uppercase [&::-webkit-details-marker]:hidden">
        {title}
        <span
          aria-hidden="true"
          className="text-muted group-open:text-accent shrink-0 text-[16px] transition-transform group-open:rotate-45"
        >
          +
        </span>
      </summary>
      <div className="pb-5">{children}</div>
    </details>
  );
}

/** Labelled section with a rule above it, so blocks are obvious at a glance. */
function Block({
  title,
  meta,
  children,
}: {
  title: string;
  meta?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-line border-t pt-7 pb-9 first:border-t-0 first:pt-0 last:pb-0">
      <div className="mb-6 flex items-baseline justify-between gap-4">
        <h2 className="font-extrabold tracking-[-0.02em] text-[1.5rem] leading-none">{title}</h2>
        {meta && <span className="text-muted text-[14px]">{meta}</span>}
      </div>
      {children}
    </section>
  );
}

/** Suggests the bundle that contains this product, when one exists. */
function PairsWith({ slug }: { slug: string }) {
  const bundle = products.find((p) => p.bundleOf?.includes(slug));
  if (!bundle) return null;

  return (
    <section className="section-gap">
      <Link
        href={`/products/${bundle.slug}`}
        className="bg-surface border-line hover:border-accent/60 flex flex-col gap-4 rounded-2xl border p-6 transition-colors sm:flex-row sm:items-center sm:justify-between sm:p-8"
      >
        <div>
          <p className="text-muted text-[14px]">Pairs well with</p>
          <h2 className="font-extrabold tracking-[-0.02em] mt-2 text-2xl">{bundle.title}</h2>
          <p className="text-dim mt-1.5 text-[15px]">
            This pack plus {(bundle.bundleOf?.length ?? 1) - 1} more, bundled.
          </p>
        </div>
        <div className="shrink-0 text-left sm:text-right">
          <p className="font-extrabold tracking-[-0.02em] text-3xl">{formatPrice(bundle.price)}</p>
          <p className="text-muted text-[13px]">
            <s>${bundleTotal(bundle).toFixed(2)}</s> separately
          </p>
        </div>
      </Link>
    </section>
  );
}
