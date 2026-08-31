import { bundleTotal, formatPrice, type Product } from "@/lib/products";
import { checkoutUrl, payhipPage } from "@/lib/site";

/**
 * Purchase card. Everything needed to decide and buy, raised off the page so
 * it reads as one object rather than a column of loose text.
 */
export function BuyPanel({ product }: { product: Product }) {
  const buyHref = checkoutUrl(product.payhipId);

  return (
    <div className="lg:sticky lg:top-24">
      <div className="bg-surface ring-line rounded-2xl p-6 ring-1 sm:p-7">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-muted text-[13px]">One-time purchase</p>
            <p className="font-display mt-1 text-[2.75rem] leading-none">
              {formatPrice(product.price)}
            </p>
          </div>
          {product.bundleOf?.length ? (
            <p className="text-muted pb-1.5 text-right text-[14px]">
              <s>${bundleTotal(product).toFixed(2)}</s>
              <br />
              separately
            </p>
          ) : null}
        </div>

        <a
          id="buy-button"
          href={buyHref}
          className="bg-accent text-ink mt-6 block rounded-xl px-6 py-4 text-center text-[16px] font-bold transition-transform hover:scale-[1.015] active:scale-[0.99]"
        >
          {product.price === 0 ? "Get it free" : "Get the pack"}
        </a>

        <p className="text-muted mt-3.5 text-center text-[13px]">
          Secure checkout via Payhip
        </p>

        <dl className="border-line mt-6 space-y-4 border-t pt-6 text-[14.5px]">
          <Row label="You get">{product.fileSize}</Row>
          <Row label="Works with">{product.compatibility.join(", ")}</Row>
          <Row label="Licence">
            {product.licenseSummary}{" "}
            <a
              href={payhipPage("license")}
              className="text-accent whitespace-nowrap hover:underline"
            >
              Full licence
            </a>
          </Row>
          <Row label="Delivery">Instant download after payment</Row>
        </dl>
      </div>
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
    <div>
      <dt className="text-muted text-[13px]">{label}</dt>
      <dd className="text-dim mt-0.5">{children}</dd>
    </div>
  );
}
