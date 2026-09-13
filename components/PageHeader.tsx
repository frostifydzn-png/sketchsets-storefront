/**
 * Standard header for a list page.
 *
 * A quiet line of context, a heading, a sentence, and one plain line of facts.
 * The pill badge, the gradient clause and the dt/dd metrics row all went: a
 * coloured eyebrow chip over a gradient headline over a row of big numbers is
 * a software landing page, and none of it helped anyone find a pack.
 *
 * AND IT IS NOW HALF THE HEIGHT IT WAS. A 3.5rem headline over 4.5rem of top
 * padding with 28px between every element ran to about 330px, and the shop
 * page then opened another 80px gap under it before the grid. The first screen
 * of /browse was a title and some whitespace; the first product sat about 830px
 * down, which on a laptop means scrolling past the entire header to find out
 * the shop sells anything.
 *
 * This is a list page. The heading's job is to confirm where you are in about
 * a second, and then get out of the way of the products.
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
    <header className="border-line flex flex-wrap items-end justify-between gap-x-10 gap-y-4 border-b pt-8 pb-6 sm:pt-10">
      <div className="min-w-0">
        <p className="set-no text-muted">{marker}</p>

        <h1 className="display-section text-text mt-2.5 max-w-[20ch]">
          {title}
        </h1>

        {note && (
          <p className="text-dim mt-3 max-w-[58ch] text-[15.5px] leading-relaxed">
            {note}
          </p>
        )}
      </div>

      {/* The facts sit on the baseline of the heading block rather than under
          it, so they cost the header no extra height at all on desktop. */}
      {facts && facts.length > 0 && (
        <p className="text-muted shrink-0 text-[13px] tabular-nums">
          {facts.join(" · ")}
        </p>
      )}
    </header>
  );
}
