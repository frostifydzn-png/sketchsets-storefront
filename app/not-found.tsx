import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell py-28 sm:py-40">
      <div className="rule-out text-muted mb-8 max-w-2xl">
        <span className="label shrink-0">Error 404 &mdash; not in stock</span>
      </div>
      <h1 className="font-display-tight max-w-[14ch] text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95]">
        This page doesn&rsquo;t exist.
      </h1>
      <p className="text-dim mt-5 max-w-md text-[16px] leading-relaxed">
        The link may be out of date, or the pack may have moved. Everything we
        sell is one click away.
      </p>
      <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
        <Link
          href="/browse"
          className="bg-accent text-ink font-ui hover:bg-accent-dim px-7 py-4 text-[15px] transition-colors"
        >
          See everything
        </Link>
        <Link
          href="/free"
          className="group text-text hover:text-accent text-[15px] font-medium transition-colors"
        >
          <span className="border-line group-hover:border-accent border-b pb-1 transition-colors">
            Take something free
          </span>
        </Link>
      </div>
    </div>
  );
}
