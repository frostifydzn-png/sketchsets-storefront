import Link from "next/link";

/**
 * Section heading. The eyebrow is small, muted and un-tracked, closer to a
 * print standfirst than the accent-coloured SaaS label it replaced.
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
    <div className="mb-9 flex flex-wrap items-end justify-between gap-x-10 gap-y-4 sm:mb-12">
      <div className="max-w-xl">
        {eyebrow && (
          <p className="text-muted mb-2 text-[12px] font-semibold uppercase">
            {eyebrow}
          </p>
        )}
        <h2 className="font-display text-[clamp(1.875rem,3.6vw,3rem)] leading-[1.02]">
          {title}
        </h2>
        {note && (
          <p className="text-dim mt-3 text-[16px] leading-relaxed">{note}</p>
        )}
      </div>
      {action && (
        <Link
          href={action.href}
          className="border-line hover:border-line-bright hover:bg-elevated shrink-0 rounded-full border px-5 py-2.5 text-[14px] font-semibold whitespace-nowrap transition-colors"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}
