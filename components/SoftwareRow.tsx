import { allSoftware } from "@/lib/products";

/**
 * "Works with" — the compatibility line.
 *
 * The reference marketplace repeats its software support in three places: a
 * line under the hero, a band mid-page, and a matrix on every product page.
 * That is not redundancy, it is the objection being answered before it is
 * raised. Nobody buys a pack they are not sure opens.
 *
 * Derived from the catalogue's own compatibility fields rather than typed, so
 * it can never claim support for something nothing in the shop actually
 * targets — and so a pack that adds DaVinci support adds it here too.
 */
export function SoftwareRow({
  label = "Works with",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  const software = allSoftware();
  if (software.length === 0) return null;

  return (
    <div className={`flex flex-wrap items-center gap-x-5 gap-y-2 ${className}`}>
      <span className="set-no text-muted shrink-0">{label}</span>
      <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {software.map((name) => (
          <li
            key={name}
            className="text-dim text-[13.5px] font-semibold whitespace-nowrap"
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}
