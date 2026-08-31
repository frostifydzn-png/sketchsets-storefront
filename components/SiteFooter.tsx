import Link from "next/link";
import { categories } from "@/lib/products";
import { payhipPage, site } from "@/lib/site";

const shopLinks = [
  { href: "/browse", label: "All products" },
  ...categories.map((c) => ({ href: `/${c.id}`, label: c.name })),
];

const supportLinks = [
  { href: payhipPage("support"), label: "Support" },
  { href: payhipPage("faq"), label: "FAQ" },
  { href: payhipPage("customer/login"), label: "Downloads" },
  { href: payhipPage("license"), label: "Licensing" },
];

const legalLinks = [
  { href: payhipPage("terms-and-conditions"), label: "Terms" },
  { href: payhipPage("privacy-policy"), label: "Privacy" },
];

export function SiteFooter() {
  return (
    <footer className="border-line mt-24 border-t">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-[17px] font-semibold tracking-tight">
              SketchSets
            </span>
            <span className="text-text-faint text-[11px] font-medium">
              by {site.parent}
            </span>
          </div>
          <p className="text-text-dim mt-3 max-w-xs text-sm leading-relaxed">
            Curated resources for people who make internet content. If it is on
            SketchSets, it is worth using.
          </p>
          <div className="mt-5 flex gap-4">
            <a
              href={site.links.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-faint hover:text-text text-sm transition-colors"
            >
              X
            </a>
            <a
              href={site.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-faint hover:text-text text-sm transition-colors"
            >
              Instagram
            </a>
            <a
              href={site.links.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-faint hover:text-text text-sm transition-colors"
            >
              Discord
            </a>
          </div>
        </div>

        <FooterColumn title="Shop">
          {shopLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-text-dim hover:text-text block py-1.5 text-sm transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </FooterColumn>

        <FooterColumn title="Support">
          {supportLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-text-dim hover:text-text block py-1.5 text-sm transition-colors"
            >
              {l.label}
            </a>
          ))}
        </FooterColumn>

        <FooterColumn title="Ecosystem">
          <a
            href={site.links.frostify}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-dim hover:text-text block py-1.5 text-sm transition-colors"
          >
            Frostify
          </a>
          <a
            href={site.links.frostoria}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-dim hover:text-text block py-1.5 text-sm transition-colors"
          >
            Frostoria
          </a>
          {legalLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-text-dim hover:text-text block py-1.5 text-sm transition-colors"
            >
              {l.label}
            </a>
          ))}
        </FooterColumn>
      </div>

      <div className="border-line border-t">
        <div className="text-text-faint mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-xs sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © {new Date().getFullYear()} SketchSets. A {site.parent} project.
          </p>
          <p>Secure checkout and delivery handled by Payhip.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-text mb-2 text-xs font-semibold tracking-wider uppercase">
        {title}
      </h2>
      {children}
    </div>
  );
}
