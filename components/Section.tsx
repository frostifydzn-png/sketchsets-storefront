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
  tight = false,
}: {
  title: string;
  note?: string;
  action?: { href: string; label: string };
  children: React.ReactNode;
  /** First section after the hero, which already has space above it. */
  first?: boolean;
  /**
   * A shelf of products rather than a block of argument. Takes the tighter
   * .shelf-gap, because cards spaced like landing-page sections read as an
   * empty shop rather than a considered one.
   */
  tight?: boolean;
}) {
  const gap = first ? "section-gap-sm" : tight ? "shelf-gap" : "section-gap";

  return (
    <section className={gap}>
      {/*
        A HEADING, A RULE RUNNING OUT, AND THE ACTION AT THE FAR END.
        The version this replaced was a title on the left and a link on the
        right with nothing between them, which is the default arrangement of
        every templated section on the internet and reads as one. The rule
        does two things a gap cannot: it ties the two ends into a single
        object, and it gives the eye a line to travel along, so the shelf
        below reads as belonging to the heading rather than merely following
        it.

        items-end, and the rule takes a bottom margin rather than sitting on
        the baseline — a hairline aligned to a 2.875rem cap height sits
        visibly high against the descenders.
      */}
      <div className="flex items-end gap-5 sm:gap-7">
        <h2 className="display-section text-text shrink-0">{title}</h2>
        <span
          aria-hidden="true"
          className="bg-line mb-2.5 h-px flex-1 sm:mb-3.5"
        />
        {action && (
          <Link
            href={action.href}
            className="text-dim hover:text-accent label shrink-0 pb-1 transition-colors"
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

      <div className={tight ? "mt-6 sm:mt-7" : "mt-9 sm:mt-11"}>
        {children}
      </div>
    </section>
  );
}
