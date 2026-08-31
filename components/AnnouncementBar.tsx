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
    <div className="bg-accent text-ink">
      <Link
        href={`/products/${vault.slug}`}
        className="shell flex h-9 items-center justify-center gap-2 text-center text-[13px] font-semibold"
      >
        <span>
          The Vault: {vault.includedFiles.length} packs for{" "}
          {formatPrice(vault.price)}. Save ${saving}.
        </span>
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
