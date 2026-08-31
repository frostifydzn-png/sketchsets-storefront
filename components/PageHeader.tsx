/**
 * Standard header for a list page.
 *
 * Sits on the bare page above the panel stack, mirroring the home page hero:
 * a pill marker, a heavy left-aligned title with an optional trailing clause in
 * the brand gradient, and a small index of what the page contains. Keeping it
 * out of a panel is what signals "this is the top of the page" rather than
 * "this is another shelf".
 */
export function PageHeader({
  marker,
  title,
  titleAccent,
  note,
  index,
}: {
  marker: string;
  title: string;
  /** Optional trailing clause, set in the brand gradient. */
  titleAccent?: string;
  note?: string;
  /** Facts about this page, printed as a small index beside the title. */
  index?: { term: string; value: string; accent?: boolean }[];
}) {
  return (
    <header className="pt-10 pb-10 sm:pt-14 sm:pb-12">
      <span className="border-accent/35 bg-accent/10 text-accent label inline-flex items-center rounded-full border px-3.5 py-1.5">
        {marker}
      </span>

      <div className="mt-6 grid items-end gap-x-14 gap-y-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
        <div>
          <h1 className="text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.04] font-extrabold tracking-[-0.03em]">
            {title}
            {titleAccent && (
              <>
                {" "}
                <span className="grad-text">{titleAccent}</span>
              </>
            )}
          </h1>
          {note && (
            <p className="text-dim mt-4 max-w-[52ch] text-[16px] leading-relaxed">
              {note}
            </p>
          )}
        </div>

        {index && index.length > 0 && (
          <dl className="border-line flex flex-wrap gap-x-8 gap-y-3 border-t pt-5 lg:justify-end">
            {index.map((row) => (
              <div key={row.term}>
                <dt className="text-muted label">{row.term}</dt>
                <dd
                  className={`mt-1 text-[18px] font-extrabold ${
                    row.accent ? "text-accent" : "text-white"
                  }`}
                >
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </header>
  );
}
