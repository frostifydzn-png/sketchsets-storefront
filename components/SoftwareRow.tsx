import { allSoftware } from "@/lib/products";

/**
 * "Works with" — the compatibility line.
 *
 * ONE QUIET LINE. This was a labelled strip of seven names in semibold with a
 * rule above it — which is a logo wall, and a logo wall is the most SaaS
 * object there is. The information is worth keeping, because "does it open in
 * my software" is the first question anyone asks about an asset pack. The
 * presentation was not.
 *
 * Derived from the catalogue's own compatibility fields rather than typed, so
 * it can never claim support for something nothing in the shop actually
 * targets — and so a pack that adds DaVinci support adds it here too.
 */
export function SoftwareRow({
  label = "Works in",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  const software = allSoftware();
  if (software.length === 0) return null;

  return (
    <p className={`text-muted text-[13px] leading-relaxed ${className}`}>
      {label} {software.join(", ")}
    </p>
  );
}
