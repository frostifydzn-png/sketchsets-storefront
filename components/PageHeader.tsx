/**
 * Standard header for a list page.
 *
 * A quiet line of context, a heading, a sentence, and one plain line of facts.
 * The pill badge, the gradient clause and the dt/dd metrics row all went: a
 * coloured eyebrow chip over a gradient headline over a row of big numbers is
 * a software landing page, and none of it helped anyone find a pack.
 */
export function PageHeader({
  marker,
  title,
  note,
  facts,
}: {
  marker: string;
  title: string;
  note?: string;
  /** Short plain-text facts, joined into one line beneath the copy. */
  facts?: string[];
}) {
  return (
    <header className="page-top pb-4">
      <p className="text-muted text-[13px]">{marker}</p>

      <h1 className="mt-4 max-w-[20ch] text-[clamp(2.25rem,4.6vw,3.5rem)] leading-[1.06] font-bold tracking-[-0.035em] text-white">
        {title}
      </h1>

      {note && (
        <p className="text-dim mt-5 max-w-[56ch] text-[16.5px] leading-relaxed">
          {note}
        </p>
      )}

      {facts && facts.length > 0 && (
        <p className="text-muted mt-7 text-[13.5px]">
          {facts.join(" · ")}
        </p>
      )}
    </header>
  );
}
