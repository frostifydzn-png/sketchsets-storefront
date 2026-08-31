import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 py-28 sm:px-8 sm:py-40">
      <p className="text-muted text-[12px] font-semibold tracking-wider uppercase">
        404
      </p>
      <h1 className="font-display-tight mt-5 max-w-[14ch] text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95]">
        This page doesn&rsquo;t exist.
      </h1>
      <p className="text-dim mt-5 max-w-md text-[16px] leading-relaxed">
        The link may be out of date, or the pack may have moved. Everything we
        sell is one click away.
      </p>
      <Link
        href="/browse"
        className="bg-accent text-ink mt-8 inline-block rounded-xl px-6 py-3.5 text-[15px] font-bold transition-transform hover:scale-[1.02]"
      >
        Browse SketchSets
      </Link>
    </div>
  );
}
