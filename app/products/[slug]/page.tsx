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
    <div className="mx-auto max-w-6xl px-5 pt-8 sm:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav aria-label="Breadcrumb" className="text-text-faint text-xs">
        <Link href="/browse" className="hover:text-text-dim transition-colors">
          Browse
        </Link>
        <span className="mx-1.5">/</span>
        {category && (
          <>
            <Link
              href={`/${category.id}`}
              className="hover:text-text-dim transition-colors"
            >
              {category.name}
            </Link>
            <span className="mx-1.5">/</span>
          </>
        )}
        <span className="text-text-dim">{product.title}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
        <ProductGallery images={product.previewImages} title={product.title} />

        <div>
          <p className="text-accent-bright text-[11px] font-semibold tracking-wider uppercase">
            {product.subcategory}
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {product.title}
          </h1>
          <p className="text-text-faint mt-2 text-sm">
            by <span className="text-text-dim">{product.creator}</span>
            {product.rating && (
              <>
                <span className="mx-2">·</span>
                <span aria-label={`Rated ${product.rating.average} out of 5`}>
                  ★ {product.rating.average.toFixed(1)}
                </span>{" "}
                <span>({product.rating.count})</span>
              </>
            )}
          </p>

          <p className="text-text-dim mt-5 leading-relaxed">
            {product.shortDescription}
          </p>

          <div className="border-line mt-7 border-t pt-6">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-semibold tracking-tight">
                {formatPrice(product.price)}
              </span>
              <span className="text-text-faint text-sm">
                one-time · lifetime access
              </span>
            </div>

            <a
              href={buyHref}
              className="bg-accent hover:bg-accent-deep mt-5 block rounded-lg px-5 py-3.5 text-center text-sm font-semibold text-white transition-colors"
            >
              {product.price === 0 ? "Download free" : "Buy now"}
            </a>
            <p className="text-text-faint mt-3 text-center text-xs">
              Secure checkout and instant delivery via Payhip
            </p>
          </div>

          <dl className="border-line mt-7 border-t pt-6 text-sm">
            <Spec label="License">{product.license}</Spec>
            <Spec label="Download">{product.fileSize}</Spec>
            <Spec label="Works with">
              {product.compatibility.join(", ")}
            </Spec>
          </dl>
        </div>
      </div>

      {/* Description + what's included */}
      <div className="mt-16 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
        <section>
          <h2 className="text-xl font-semibold tracking-tight">
            About this pack
          </h2>
          <div className="mt-4 space-y-4">
            {product.description.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="text-text-dim leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {product.tags.length > 0 && (
            <div className="mt-7 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="border-line text-text-faint rounded-md border px-2.5 py-1 text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </section>

        <section className="border-line bg-ink-raised h-fit rounded-xl border p-6">
          <h2 className="text-sm font-semibold tracking-wider uppercase">
            What&rsquo;s included
          </h2>
          <ul className="mt-4 space-y-2.5">
            {product.includedFiles.map((file) => (
              <li
                key={file}
                className="text-text-dim flex gap-2.5 text-sm leading-relaxed"
              >
                <span className="text-accent mt-0.5 shrink-0" aria-hidden="true">
                  ✓
                </span>
                {file}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-6 text-xl font-semibold tracking-tight">
            You might also like
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
    <div className="border-line flex gap-4 border-b py-2.5 last:border-b-0">
      <dt className="text-text-faint w-28 shrink-0">{label}</dt>
      <dd className="text-text-dim">{children}</dd>
    </div>
  );
}
