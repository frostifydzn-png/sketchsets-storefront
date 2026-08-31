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
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="bg-ink-raised relative aspect-[5/4] overflow-hidden rounded-lg">
        <Image
          src={product.thumbnail}
          alt={`${product.title} preview`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
        />
        {product.isNew && (
          <span className="bg-accent text-ink absolute top-3 left-3 rounded-full px-2.5 py-1 text-[11px] font-bold">
            New
          </span>
        )}
      </div>

      <div className="mt-3.5 flex items-baseline justify-between gap-4">
        <h3 className="font-display truncate text-[17px] font-bold">
          {product.title}
        </h3>
        <span
          className={`shrink-0 text-[15px] font-semibold ${
            product.price === 0 ? "text-accent" : "text-text"
          }`}
        >
          {formatPrice(product.price)}
        </span>
      </div>
      <p className="text-text-faint mt-0.5 text-[13px]">
        {product.subcategory}
      </p>
    </Link>
  );
}
