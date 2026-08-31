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
  { href: "/new", label: "New drops", count: () => newDrops().length },
  { href: "/browse", label: "Under $10", count: () => under(10).length },
  {
    href: "/products/sketchsets-vault",
    label: "Bundles",
    count: () => products.filter((p) => p.bundleOf?.length).length,
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
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr_1.6fr]">
          <Column title="Categories">
            {categories.map((c) => (
              <MenuLink
                key={c.id}
                href={`/${c.id}`}
                onNavigate={onNavigate}
                meta={`${byCategory(c.id).length}`}
                sub={c.blurb}
                accent={c.accentVar}
              >
                {c.name}
              </MenuLink>
            ))}
          </Column>

          <Column title="Collections">
            {collections.map((c) => (
              <MenuLink
                key={c.label}
                href={c.href}
                onNavigate={onNavigate}
                meta={`${c.count()}`}
              >
                {c.label}
              </MenuLink>
            ))}
            <MenuLink href="/browse" onNavigate={onNavigate} meta={`${products.length}`}>
              Everything
            </MenuLink>
          </Column>

          <div>
            <ColumnTitle>Frostify Picks</ColumnTitle>
            <div className="grid grid-cols-3 gap-3">
              {picks.map((p) => (
                <MiniCard key={p.id} product={p} onNavigate={onNavigate} />
              ))}
            </div>
          </div>
        </div>
      </Panel>
    );
  }

  const category = categories.find((c) => c.id === menu);
  const items = byCategory(menu);
  if (!category) return null;

  return (
    <Panel>
      <div className="grid gap-10 lg:grid-cols-[1fr_2.6fr]">
        <div>
          <ColumnTitle>{category.name}</ColumnTitle>
          <p className="text-dim mt-1 max-w-[26ch] text-[14px] leading-relaxed">
            {category.intro}
          </p>
          <Link
            href={`/${category.id}`}
            onClick={onNavigate}
            className="text-accent mt-5 inline-block text-[14px] font-semibold hover:underline"
          >
            View all {items.length} →
          </Link>
        </div>

        <div>
          <ColumnTitle>In this category</ColumnTitle>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {items.slice(0, 4).map((p) => (
              <MiniCard key={p.id} product={p} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-ink border-line animate-menu-drop border-t border-b shadow-[0_30px_60px_-30px_rgba(0,0,0,1)]">
      <div className="shell py-9">{children}</div>
    </div>
  );
}

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-muted mb-3 text-[11px] font-bold tracking-[0.16em] uppercase">
      {children}
    </h3>
  );
}

function Column({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <ColumnTitle>{title}</ColumnTitle>
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}

function MenuLink({
  href,
  children,
  sub,
  meta,
  accent,
  onNavigate,
}: {
  href: string;
  children: React.ReactNode;
  sub?: string;
  meta?: string;
  accent?: string;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="group hover:bg-elevated flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors"
    >
      {accent && (
        <span
          aria-hidden="true"
          className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
          style={{ background: accent }}
        />
      )}
      <span className="min-w-0 flex-1">
        <span className="text-text block text-[15px] font-semibold">
          {children}
        </span>
        {sub && (
          <span className="text-muted block truncate text-[13px]">{sub}</span>
        )}
      </span>
      {meta && (
        <span className="text-muted shrink-0 text-[12px] tabular-nums">
          {meta}
        </span>
      )}
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
      <div className="bg-surface ring-line group-hover:ring-line-bright relative aspect-[4/3] overflow-hidden rounded-lg ring-1 transition-all">
        <Image
          src={product.thumbnail}
          alt=""
          fill
          sizes="200px"
          className="object-cover transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-105"
        />
        <span className="bg-ink/85 group-hover:bg-accent group-hover:text-ink absolute right-1.5 bottom-1.5 rounded-full px-2 py-0.5 text-[11px] font-bold backdrop-blur-md transition-colors">
          {formatPrice(product.price)}
        </span>
      </div>
      <p className="mt-2 truncate text-[13px] font-semibold">{product.title}</p>
    </Link>
  );
}
