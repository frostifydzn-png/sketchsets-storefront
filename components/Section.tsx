import Link from "next/link";

/**
 * A section of the page.
 *
 * Title on the left, an optional link on the right, and the content below with
 * a lot of air above it. That is the whole component — no border, no card, no
 * background. Boxing each block in a bordered panel is what made the shop read
 * as a dashboard; space does the same job of separating things and looks like
 * a shop instead.
 */
export function Section({
  title,
  note,
  action,
  children,
  first = false,
}: {
  title: string;
  note?: string;
  action?: { href: string; label: string };
  children: React.ReactNode;
  /** First section after the hero, which already has space above it. */
  first?: boolean;
}) {
  return (
    <section className={first ? "section-gap-sm" : "section-gap"}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-3">
        <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] leading-tight font-bold tracking-[-0.02em] text-white">
          {title}
        </h2>
        {action && (
          <Link
            href={action.href}
            className="text-dim link-rule text-[14px] font-medium"
          >
            {action.label}
          </Link>
        )}
      </div>

      {note && (
        <p className="text-muted mt-2.5 max-w-[52ch] text-[15px] leading-relaxed">
          {note}
        </p>
      )}

      <div className="mt-9 sm:mt-11">{children}</div>
    </section>
  );
}
