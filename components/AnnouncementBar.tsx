import Link from "next/link";
import { bundleTotal, formatPrice, getProduct } from "@/lib/products";

/**
 * Promo strip above the header. Driven by real bundle maths, so it never
 * claims a saving the catalogue cannot back up.
 */
export function AnnouncementBar() {
  const vault = getProduct("sketchsets-vault");
  if (!vault?.bundleOf?.length) return null;

  const saving = (bundleTotal(vault) - vault.price).toFixed(2);

  return (
    /* Quiet strip. A solid accent bar shouted louder than the offer deserved. */
    <div className="border-line bg-surface border-b">
      <Link
        href={`/products/${vault.slug}`}
        className="shell text-dim hover:text-text group flex h-11 items-center justify-center gap-2.5 text-center font-mono text-[12px] transition-colors"
      >
        <span
          className="bg-accent h-1.5 w-1.5 rounded-full"
          aria-hidden="true"
        />
        <span>
          <span className="text-text">The Vault</span>
          <span className="mx-1.5">·</span>
          {vault.includedFiles.length} packs for {formatPrice(vault.price)},
          save ${saving}
        </span>
        <span
          aria-hidden="true"
          className="transition-transform group-hover:translate-x-1"
        >
          →
        </span>
      </Link>
    </div>
  );
}
