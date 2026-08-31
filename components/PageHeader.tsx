/**
 * Standard header for a list page.
 *
 * Left-aligned, ruled, and paired with a mono index of whatever the page
 * actually contains — the same shelf-label pattern the homepage and the room
 * pages use. Nothing here is centred, because a centred title over a centred
 * paragraph is the layout every software landing page opens with.
 */
export function PageHeader({
  marker,
  title,
  note,
  index,
}: {
  /** Mono marker, e.g. "The shop". Sits above the rule. */
  marker: string;
  title: string;
  note?: string;
  /** Technical facts about this page, printed as a small index card. */
  index?: { term: string; value: string; accent?: boolean }[];
}) {
  return (
    <header className="border-line border-b">
      <div className="shell pt-14 pb-12 sm:pt-20 sm:pb-14">
        <div className="rule-out text-muted mb-8">
          <span className="label shrink-0">{marker}</span>
        </div>

        <div className="grid items-end gap-x-16 gap-y-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h1 className="font-display-tight text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.94]">
              {title}
            </h1>
            {note && (
              <p className="text-dim mt-5 max-w-[52ch] text-[17px] leading-relaxed">
                {note}
              </p>
            )}
          </div>

          {index && index.length > 0 && (
            <dl className="border-line text-muted flex flex-wrap gap-x-10 gap-y-3 border-t pt-5 font-mono text-[12px] lg:justify-end">
              {index.map((row) => (
                <div key={row.term} className="flex gap-2">
                  <dt>{row.term}</dt>
                  <dd className={row.accent ? "text-accent" : "text-text"}>
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </header>
  );
}
