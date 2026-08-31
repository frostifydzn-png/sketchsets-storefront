import Link from "next/link";

/**
 * Shared section heading. Deliberately quiet: a title, an optional line of
 * context, and a link. No uppercase micro-labels, no rules, no numbering.
 */
export function SectionHeader({
  title,
  note,
  action,
}: {
  title: string;
  note?: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-x-10 gap-y-4 sm:mb-14">
      <div className="max-w-xl">
        <h2 className="font-display text-[clamp(1.875rem,3.6vw,3rem)] leading-[1.02]">
          {title}
        </h2>
        {note && (
          <p className="text-dim mt-4 text-[16px] leading-relaxed">{note}</p>
        )}
      </div>
      {action && (
        <Link
          href={action.href}
          className="text-dim hover:text-text shrink-0 pb-2 text-[15px] whitespace-nowrap transition-colors"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}
