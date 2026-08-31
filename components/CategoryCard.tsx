import Image from "next/image";
import Link from "next/link";
import { byCategory, formatPrice, type Category } from "@/lib/products";

/**
 * Category tile led by a mosaic of the packs it actually contains.
 *
 * Earlier versions washed blurred artwork behind the labels, which fought the
 * text; stripping it entirely left three flat boxes. The artwork now gets its
 * own panel above the type, at full opacity, so it can be read as contents.
 */
export function CategoryCard({ category }: { category: Category }) {
  const items = byCategory(category.id);
  if (items.length === 0) return null;

  const from = Math.min(...items.map((p) => p.price));
  const [lead, ...rest] = items.slice(0, 3);

  return (
    <Link
      href={`/${category.id}`}
      className="group bg-surface ring-line hover:ring-line-bright flex h-full flex-col overflow-hidden rounded-2xl ring-1 transition-all duration-300 hover:-translate-y-1.5"
    >
      <div className="bg-ink grid h-44 grid-cols-3 gap-1 p-1 sm:h-48">
        <Thumb
          src={lead.thumbnail}
          alt={lead.title}
          className={rest.length > 0 ? "col-span-2" : "col-span-3"}
        />
        {rest.length > 0 && (
          <div className="grid grid-rows-2 gap-1">
            {rest.map((p) => (
              <Thumb key={p.id} src={p.thumbnail} alt={p.title} />
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-7 sm:p-8">
        <span
          aria-hidden="true"
          className="block h-1 w-10 rounded-full"
          style={{ background: category.accentVar }}
        />

        <h3 className="font-display mt-5 text-[clamp(1.5rem,2.4vw,1.875rem)] leading-none">
          {category.name}
        </h3>
        <p className="text-dim mt-3 text-[15px] leading-relaxed">
          {category.blurb}
        </p>

        <p className="text-muted mt-5 text-[14px]">
          <span className="text-text font-semibold">
            {items.length} {items.length === 1 ? "pack" : "packs"}
          </span>
          {from > 0 ? (
            <>
              {" "}
              from{" "}
              <span className="text-accent font-bold">{formatPrice(from)}</span>
            </>
          ) : (
            <>
              {" "}
              with <span className="text-accent font-bold">free</span> options
            </>
          )}
        </p>

        <span className="border-line group-hover:border-accent group-hover:text-accent mt-6 inline-block w-fit rounded-full border px-5 py-2.5 text-[14px] font-semibold transition-colors">
          Check it out
        </span>
      </div>
    </Link>
  );
}

function Thumb({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <span
      className={`bg-elevated relative block overflow-hidden rounded-lg ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 50vw, 220px"
        className="object-cover transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-105"
      />
    </span>
  );
}
