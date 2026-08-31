import Link from "next/link";

/**
 * Shared section heading. The accent rule and eyebrow give each block a clear
 * start, which matters more now that sections are far apart vertically.
 */
export function SectionHeader({
  eyebrow,
  title,
  note,
  action,
}: {
  eyebrow?: string;
  title: string;
  note?: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="mb-9 flex flex-wrap items-end justify-between gap-x-8 gap-y-4 sm:mb-12">
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="text-accent mb-3 flex items-center gap-2.5 text-[12px] font-bold tracking-[0.16em] uppercase">
            <span
              aria-hidden="true"
              className="bg-accent inline-block h-px w-7"
            />
            {eyebrow}
          </p>
        )}
        <h2 className="font-display text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.02]">
          {title}
        </h2>
        {note && (
          <p className="text-dim mt-3 text-[15px] leading-relaxed">{note}</p>
        )}
      </div>
      {action && (
        <Link
          href={action.href}
          className="border-line hover:border-line-bright text-text shrink-0 rounded-full border px-5 py-2.5 text-[14px] font-semibold whitespace-nowrap transition-colors"
        >
          {action.label} →
        </Link>
      )}
    </div>
  );
}
