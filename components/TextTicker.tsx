/**
 * Scrolling text band. Purely decorative, so the whole strip is hidden from
 * assistive tech rather than read out a dozen times.
 */
export function TextTicker({
  text,
  repeat = 8,
}: {
  text: string;
  repeat?: number;
}) {
  const items = Array.from({ length: repeat * 2 });

  return (
    <div
      className="marquee border-line overflow-hidden border-y py-4"
      aria-hidden="true"
    >
      <div className="marquee-track marquee-track--fast">
        {items.map((_, i) => (
          <span
            key={i}
            className="font-display text-muted flex shrink-0 items-center gap-6 pr-6 text-[15px] whitespace-nowrap uppercase"
          >
            {text}
            <span className="bg-accent inline-block h-1.5 w-1.5 rounded-full" />
          </span>
        ))}
      </div>
    </div>
  );
}
