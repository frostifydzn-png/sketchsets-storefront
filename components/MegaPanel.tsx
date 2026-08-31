import Image from "next/image";
import Link from "next/link";
import {
  byCategory,
  categories,
  formatPrice,
  frostifyPicks,
  newDrops,
  products,
  under,
  type CategoryId,
} from "@/lib/products";

export type MenuId = "browse" | CategoryId;

const collections = [
  {
    href: "/new",
    label: "New drops",
    blurb: "Just added",
    count: () => newDrops().length,
  },
  {
    href: "/free",
    label: "Free packs",
    blurb: "No cost, same licence",
    count: () => products.filter((p) => p.price === 0).length,
  },
  {
    href: "/browse",
    label: "Under $10",
    blurb: "Low-risk starters",
    count: () => under(10).length,
  },
  {
    href: "/products/sketchsets-vault",
    label: "Bundles",
    blurb: "Everything, cheaper",
    count: () => products.filter((p) => p.bundleOf?.length).length,
  },
  {
    href: "/browse",
    label: "Everything",
    blurb: "The full catalogue",
    count: () => products.length,
  },
];

export function MegaPanel({
  menu,
  onNavigate,
}: {
  menu: MenuId;
  onNavigate: () => void;
}) {
  if (menu === "browse") {
    const picks = frostifyPicks().slice(0, 3);

    return (
      <Panel>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr_1.5fr]">
          <Group title="Categories">
            {categories.map((c) => (
              <BigLink
                key={c.id}
                href={`/${c.id}`}
                onNavigate={onNavigate}
                blurb={c.blurb}
                count={byCategory(c.id).length}
              >
                {c.name}
              </BigLink>
            ))}
          </Group>

          <Group title="Collections">
            {collections.map((c) => (
              <BigLink
                key={c.label}
                href={c.href}
                onNavigate={onNavigate}
                blurb={c.blurb}
                count={c.count()}
              >
                {c.label}
              </BigLink>
            ))}
          </Group>

          <Group title="Frostify Picks">
            <div className="grid grid-cols-3 gap-3 pt-1">
              {picks.map((p) => (
                <MiniCard key={p.id} product={p} onNavigate={onNavigate} />
              ))}
            </div>
          </Group>
        </div>
      </Panel>
    );
  }

  const category = categories.find((c) => c.id === menu);
  const items = byCategory(menu);
  if (!category) return null;

  return (
    <Panel>
      <div className="grid gap-12 lg:grid-cols-[1fr_2.4fr]">
        <div>
          <h3 className="font-display text-[1.75rem] leading-tight">
            {category.name}
          </h3>
          <p className="text-dim mt-3 max-w-[28ch] text-[15px] leading-relaxed">
            {category.intro}
          </p>
          <Link
            href={`/${category.id}`}
            onClick={onNavigate}
            className="border-line hover:border-line-bright hover:bg-elevated mt-6 inline-block rounded-full border px-5 py-2.5 text-[14px] font-semibold transition-colors"
          >
            View all {items.length}
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {items.slice(0, 4).map((p) => (
            <MiniCard key={p.id} product={p} onNavigate={onNavigate} />
          ))}
        </div>
      </div>
    </Panel>
  );
}

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-ink border-line animate-menu-drop border-t border-b shadow-[0_30px_60px_-30px_rgba(0,0,0,1)]">
      <div className="shell py-10">{children}</div>
    </div>
  );
}

function Group({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-muted mb-4 text-[13px]">{title}</h3>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

/** Name at reading size with its blurb beneath. No dots, no aligned counters. */
function BigLink({
  href,
  children,
  blurb,
  count,
  onNavigate,
}: {
  href: string;
  children: React.ReactNode;
  blurb: string;
  count: number;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="group -mx-3 block rounded-xl px-3 py-2.5 transition-colors hover:bg-white/[0.04]"
    >
      <span className="font-display group-hover:text-accent block text-[1.25rem] leading-tight transition-colors">
        {children}
      </span>
      <span className="text-muted mt-1 block text-[13.5px]">
        {blurb} · {count} {count === 1 ? "pack" : "packs"}
      </span>
    </Link>
  );
}

function MiniCard({
  product,
  onNavigate,
}: {
  product: (typeof products)[number];
  onNavigate: () => void;
}) {
  return (
    <Link
      href={`/products/${product.slug}`}
      onClick={onNavigate}
      className="group block"
    >
      <div className="bg-surface ring-line group-hover:ring-line-bright relative aspect-[4/3] overflow-hidden rounded-xl ring-1 transition-all">
        <Image
          src={product.thumbnail}
          alt=""
          fill
          sizes="220px"
          className="object-cover transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-105"
        />
      </div>
      <p className="mt-2.5 flex items-baseline justify-between gap-2">
        <span className="truncate text-[13.5px] font-semibold">
          {product.title}
        </span>
        <span className="text-muted shrink-0 text-[13px] font-semibold">
          {formatPrice(product.price)}
        </span>
      </p>
    </Link>
  );
}
