import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[1400px] px-6 py-28 sm:px-10 sm:py-40">
      <p className="text-text-faint text-[11px] font-semibold tracking-[0.18em] uppercase">
        404
      </p>
      <h1 className="font-display mt-5 max-w-[14ch] text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] font-extrabold">
        This page doesn&rsquo;t exist.
      </h1>
      <p className="text-text-dim mt-6 max-w-md text-[17px] leading-relaxed">
        The link may be out of date, or the pack may have moved. Everything we
        sell is one click away.
      </p>
      <Link
        href="/browse"
        className="text-ink mt-8 inline-block rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold transition-opacity hover:opacity-85"
      >
        Browse everything
      </Link>
    </div>
  );
}
