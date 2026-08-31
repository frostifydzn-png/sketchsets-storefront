import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { ProductGallery } from "@/components/ProductGallery";
import {
  formatPrice,
  getCategory,
  getProduct,
  products,
  relatedTo,
} from "@/lib/products";
import { checkoutUrl, site } from "@/lib/site";

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
  const related = relatedTo(product);
  const buyHref = checkoutUrl(product.payhipId);

  // Product structured data so the pack can surface correctly in search.
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
    <div className="mx-auto max-w-[1400px] px-6 pt-8 sm:px-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav aria-label="Breadcrumb" className="text-text-faint text-[13px]">
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
        <span className="text-text-dim">{product.title}</span>
      </nav>

      <div className="mt-7 grid gap-10 lg:grid-cols-[1.55fr_1fr] lg:gap-16">
        <ProductGallery images={product.previewImages} title={product.title} />

        <div className="lg:pt-2">
          <p className="text-text-faint text-[11px] font-semibold tracking-[0.18em] uppercase">
            {product.subcategory}
          </p>
          <h1 className="font-display mt-3 text-[clamp(2.25rem,5vw,3.5rem)] leading-[0.98] font-extrabold">
            {product.title}
          </h1>

          <p className="text-text-faint mt-3 text-[14px]">
            by <span className="text-text-dim">{product.creator}</span>
            {product.rating && (
              <>
                <span className="mx-2">·</span>
                <span
                  className="text-text-dim"
                  aria-label={`Rated ${product.rating.average} out of 5 from ${product.rating.count} reviews`}
                >
                  ★ {product.rating.average.toFixed(1)} ({product.rating.count})
                </span>
              </>
            )}
          </p>

          <p className="text-text-dim mt-6 text-[17px] leading-relaxed">
            {product.shortDescription}
          </p>

          <div className="mt-9 flex items-baseline gap-4">
            <span className="font-display text-[clamp(2.25rem,5vw,3rem)] leading-none font-extrabold">
              {formatPrice(product.price)}
            </span>
            <span className="text-text-faint text-[14px]">
              one-time · lifetime access
            </span>
          </div>

          <a
            href={buyHref}
            className="text-ink mt-6 block rounded-full bg-white px-6 py-4 text-center text-[15px] font-semibold transition-opacity hover:opacity-85"
          >
            {product.price === 0 ? "Download free" : "Buy now"}
          </a>
          <p className="text-text-faint mt-3 text-center text-[13px]">
            Secure checkout and instant delivery via Payhip
          </p>

          <dl className="mt-10 text-[14px]">
            <Spec label="License">{product.license}</Spec>
            <Spec label="Download">{product.fileSize}</Spec>
            <Spec label="Works with">{product.compatibility.join(", ")}</Spec>
          </dl>
        </div>
      </div>

      {/* Description + what's included */}
      <div className="mt-20 grid gap-12 lg:grid-cols-[1.55fr_1fr] lg:gap-16">
        <section>
          <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] leading-none font-extrabold">
            About this pack
          </h2>
          <div className="mt-6 space-y-5">
            {product.description.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="text-text-dim text-[16px] leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {product.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
              {product.tags.map((tag) => (
                <span key={tag} className="text-text-faint text-[13px]">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] leading-none font-extrabold">
            What&rsquo;s inside
          </h2>
          <ul className="mt-6">
            {product.includedFiles.map((file) => (
              <li
                key={file}
                className="border-line text-text-dim border-t py-3.5 text-[15px] leading-relaxed last:border-b"
              >
                {file}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] leading-none font-extrabold">
            More like this
          </h2>
          <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function Spec({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-line flex gap-6 border-t py-3.5 last:border-b">
      <dt className="text-text-faint w-28 shrink-0">{label}</dt>
      <dd className="text-text-dim">{children}</dd>
    </div>
  );
}
