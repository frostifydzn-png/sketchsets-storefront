import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Product } from "@/lib/products";

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group border-line hover:border-line-strong bg-ink-raised focus-visible:border-accent block overflow-hidden rounded-xl border transition-colors"
    >
      <div className="bg-ink-high relative aspect-[4/3] overflow-hidden">
        <Image
          src={product.thumbnail}
          alt={`${product.title} preview`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
        {product.isNew && (
          <span className="bg-accent absolute top-3 left-3 rounded-md px-2 py-1 text-[11px] font-semibold text-white">
            New
          </span>
        )}
      </div>

      <div className="flex items-start justify-between gap-3 p-4">
        <div className="min-w-0">
          <h3 className="truncate text-[15px] font-semibold tracking-tight">
            {product.title}
          </h3>
          <p className="text-text-faint mt-0.5 truncate text-[13px]">
            {product.creator} · {product.subcategory}
          </p>
        </div>
        <span
          className={`shrink-0 text-[15px] font-semibold ${
            product.price === 0 ? "text-accent-bright" : "text-text"
          }`}
        >
          {formatPrice(product.price)}
        </span>
      </div>
    </Link>
  );
}
