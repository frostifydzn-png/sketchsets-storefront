import Link from "next/link";

/**
 * Section heading, set the way a catalogue divides a page rather than the way
 * a marketing site announces a feature block.
 *
 * A mono marker sits on its own line with a hairline running out to the end of
 * the column, and the title lands underneath in the editorial serif. The
 * marker is the technical voice, the title is the human one; keeping them on
 * separate lines is what stops it collapsing back into an eyebrow-over-heading
 * SaaS pattern.
 */
export function SectionHeader({
  marker,
  title,
  note,
  action,
}: {
  /** Mono section marker, e.g. "01 / NEW THIS DROP". Reads as a shelf label. */
  marker?: string;
  title: string;
  note?: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="mb-10 sm:mb-14">
      {marker && (
        <div className="rule-out text-muted mb-6">
          <span className="label shrink-0">{marker}</span>
        </div>
      )}

      <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-5">
        <div className="max-w-2xl">
          <h2 className="font-display-tight text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.0]">
            {title}
          </h2>
          {note && (
            <p className="text-dim mt-4 max-w-[54ch] text-[16px] leading-relaxed">
              {note}
            </p>
          )}
        </div>

        {action && (
          <Link
            href={action.href}
            className="group text-text hover:text-accent shrink-0 pb-1 text-[14px] font-medium whitespace-nowrap transition-colors"
          >
            <span className="border-line group-hover:border-accent border-b pb-1 transition-colors">
              {action.label}
            </span>
            <span aria-hidden="true" className="ml-2 inline-block">
              &rarr;
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}
