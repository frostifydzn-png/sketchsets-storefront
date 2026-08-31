import Link from "next/link";
import { getCreator, monogram } from "@/lib/creators";
import { formatPrice, type Product } from "@/lib/products";
import { checkoutUrl } from "@/lib/site";

export function BuyPanel({ product }: { product: Product }) {
  const creator = getCreator(product.creatorSlug);
  const buyHref = checkoutUrl(product.payhipId);
  const primarySoftware = product.compatibility.slice(0, 2).join(" & ");

  return (
    <div className="lg:sticky lg:top-32">
      <div className="flex items-center gap-2">
        <span className="text-muted text-[12px] font-semibold tracking-wider uppercase">
          {product.subcategory}
        </span>
        {product.featured && (
          <span className="text-accent border-accent/30 rounded-full border px-2 py-0.5 text-[10px] font-semibold">
            Frostify Pick
          </span>
        )}
      </div>

      <h1 className="font-display mt-3 text-[clamp(2rem,4.5vw,3rem)] leading-[1]">
        {product.title}
      </h1>

      {creator && (
        <Link
          href={`/creators/${creator.slug}`}
          className="group mt-4 inline-flex items-center gap-2.5"
        >
          <span className="bg-elevated text-dim ring-line flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold ring-1">
            {monogram(creator.name)}
          </span>
          <span className="text-dim group-hover:text-text text-[14px] transition-colors">
            by {creator.name}
          </span>
        </Link>
      )}

      <p className="text-dim mt-5 text-[16px] leading-relaxed">
        {product.valueProp}
      </p>

      {product.rating && (
        <p className="text-dim mt-3 text-[13px]">
          <span className="text-accent">★</span>{" "}
          {product.rating.average.toFixed(1)} from {product.rating.count}{" "}
          {product.rating.count === 1 ? "review" : "reviews"}
        </p>
      )}

      <div className="mt-7 flex items-baseline gap-3">
        <span className="font-display text-[2.5rem] leading-none">
          {formatPrice(product.price)}
        </span>
        {product.bundleValue && (
          <span className="text-muted text-[14px]">
            <s>${product.bundleValue.toFixed(2)}</s> value
          </span>
        )}
      </div>

      <a
        id="buy-button"
        href={buyHref}
        className="bg-accent text-ink mt-5 block rounded-xl px-6 py-4 text-center text-[16px] font-bold transition-transform hover:scale-[1.015] active:scale-[0.99]"
      >
        {product.price === 0
          ? "Get it free"
          : `Get the pack — ${formatPrice(product.price)}`}
      </a>

      {/* The four things a digital buyer actually worries about. */}
      <ul className="mt-5 space-y-2">
        {[
          "Instant digital download",
          `Works with ${primarySoftware}`,
          "Commercial creator license included",
          "Secure checkout via Payhip",
        ].map((line) => (
          <li key={line} className="text-dim flex gap-2.5 text-[13px]">
            <CheckIcon />
            {line}
          </li>
        ))}
      </ul>

      <dl className="border-line mt-7 border-t text-[14px]">
        <Row label="Works with">{product.compatibility.join(", ")}</Row>
        <Row label="License">{product.licenseSummary}</Row>
        <Row label="Download">{product.fileSize}</Row>
      </dl>
    </div>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-line flex gap-5 border-b py-3">
      <dt className="text-muted w-24 shrink-0">{label}</dt>
      <dd className="text-dim">{children}</dd>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className="text-accent mt-0.5 shrink-0"
    >
      <path
        d="M2.5 7.5l3 3 6-7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
