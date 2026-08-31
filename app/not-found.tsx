import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center px-5 py-28 text-center sm:px-8">
      <p className="text-accent-bright text-[11px] font-semibold tracking-wider uppercase">
        404
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        We couldn&rsquo;t find that page
      </h1>
      <p className="text-text-dim mt-3 max-w-md leading-relaxed">
        The link may be out of date, or the pack may have moved. Everything we
        sell is one click away.
      </p>
      <Link
        href="/browse"
        className="bg-accent hover:bg-accent-deep mt-7 rounded-lg px-5 py-3 text-sm font-semibold text-white transition-colors"
      >
        Browse products
      </Link>
    </div>
  );
}
