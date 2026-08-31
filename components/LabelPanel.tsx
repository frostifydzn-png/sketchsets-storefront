import Link from "next/link";

/**
 * The static sibling of ShelfPanel.
 *
 * Same bordered panel and same narrow left label rail, but the right side is
 * laid out by the caller instead of scrolling. Used where the content is a
 * fixed set that should all be visible at once — the category row, the
 * community block — rather than a track you page through.
 *
 * The label markup is duplicated from ShelfPanel rather than shared: that one
 * is a client component, and a dozen lines of JSX is a cheaper price than a
 * shared module pulled across the boundary.
 */
export function LabelPanel({
  title,
  description,
  icon,
  action,
  children,
  className = "",
}: {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: { href: string; label: string };
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`panel ${className}`}>
      <div className="grid gap-6 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-8">
        <div className="lg:pt-1">
          <h2 className="flex items-center gap-2 text-[15px] font-extrabold tracking-[0.06em] text-white uppercase">
            {icon}
            {title}
          </h2>
          {description && (
            <p className="text-dim mt-3 max-w-[38ch] text-[14px] leading-relaxed lg:max-w-none">
              {description}
            </p>
          )}
          {action && (
            <Link
              href={action.href}
              className="btn-ghost mt-5 px-4 py-2.5 text-[13px]"
            >
              {action.label}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>

        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}
