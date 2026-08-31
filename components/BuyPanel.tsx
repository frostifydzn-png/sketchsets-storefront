import Link from "next/link";
import { getCreator, monogram } from "@/lib/creators";
import { formatPrice, type Product } from "@/lib/products";
import { checkoutUrl } from "@/lib/site";

export function BuyPanel({ product }: { product: Product }) {
  const creator = getCreator(product.creatorSlug);
  const buyHref = checkoutUrl(product.payhipId);

  return (
    <div className="lg:sticky lg:top-32">
      <p className="text-muted text-[14px]">{product.subcategory}</p>

      <h1 className="font-display mt-2 text-[clamp(2rem,4.2vw,2.875rem)] leading-[1.02]">
        {product.title}
      </h1>

      {creator && (
        <Link
          href={`/creators/${creator.slug}`}
          className="group mt-5 inline-flex items-center gap-2.5"
        >
          <span className="bg-elevated text-dim flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-semibold">
            {monogram(creator.name)}
          </span>
          <span className="text-dim group-hover:text-text text-[15px] transition-colors">
            {creator.name}
          </span>
        </Link>
      )}

      <p className="text-dim mt-6 text-[17px] leading-relaxed">
        {product.valueProp}
      </p>

      {product.rating && (
        <p className="text-muted mt-4 text-[14px]">
          <span className="text-accent">★</span>{" "}
          {product.rating.average.toFixed(1)} from {product.rating.count}{" "}
          {product.rating.count === 1 ? "review" : "reviews"}
        </p>
      )}

      <div className="mt-9 flex items-baseline gap-3">
        <span className="font-display text-[3rem] leading-none">
          {formatPrice(product.price)}
        </span>
        {product.bundleValue && (
          <span className="text-muted text-[15px]">
            <s>${product.bundleValue.toFixed(2)}</s> separately
          </span>
        )}
      </div>

      <a
        id="buy-button"
        href={buyHref}
        className="bg-accent text-ink mt-6 block rounded-xl px-6 py-4 text-center text-[16px] font-bold transition-transform hover:scale-[1.015] active:scale-[0.99]"
      >
        {product.price === 0 ? "Get it free" : "Get the pack"}
      </a>

      <p className="text-muted mt-4 text-center text-[13.5px] leading-relaxed">
        Instant download. Commercial licence included. Secure checkout via
        Payhip.
      </p>

      <dl className="mt-10 space-y-4 text-[15px]">
        <Row label="Works with">{product.compatibility.join(", ")}</Row>
        <Row label="Licence">{product.licenseSummary}</Row>
        <Row label="Download">{product.fileSize}</Row>
      </dl>
    </div>
  );
}

/** Label above value, so long lists wrap without a cramped column. */
function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt className="text-muted text-[13px]">{label}</dt>
      <dd className="text-dim mt-0.5">{children}</dd>
    </div>
  );
}
