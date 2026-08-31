import Link from "next/link";
import { categories } from "@/lib/products";
import { PAYHIP_ACCOUNT, payhipPage, site } from "@/lib/site";

const shopLinks = [
  { href: "/browse", label: "Browse" },
  ...categories.map((c) => ({ href: `/${c.id}`, label: c.name })),
  { href: "/free", label: "Free packs" },
  { href: "/new", label: "New drops" },
];

const supportLinks = [
  { href: payhipPage("faq"), label: "FAQ" },
  { href: payhipPage("contact"), label: "Contact" },
  { href: PAYHIP_ACCOUNT, label: "Your downloads" },
  { href: payhipPage("license"), label: "Licensing" },
  { href: payhipPage("terms-and-conditions"), label: "Terms" },
  { href: payhipPage("privacy-policy"), label: "Privacy" },
];

export function SiteFooter() {
  return (
    <footer className="border-line mt-32 border-t sm:mt-44">
      <div className="shell py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display-tight text-[19px] leading-none">
                SKETCHSETS
              </span>
              <span className="text-muted text-[11px] font-medium">
                · by {site.parent}
              </span>
            </div>
            <p className="text-dim mt-4 max-w-xs text-[14px] leading-relaxed">
              Curated resources for people who make internet content. If it is
              on SketchSets, it is worth using.
            </p>
            <div className="mt-5 flex gap-5">
              {[
                { href: site.links.twitter, label: "X" },
                { href: site.links.instagram, label: "Instagram" },
                { href: site.links.discord, label: "Discord" },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-text text-[13px] transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Shop">
            {shopLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-dim hover:text-text block py-1.5 text-[14px] transition-colors"
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
                className="text-dim hover:text-text block py-1.5 text-[14px] transition-colors"
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
              className="text-dim hover:text-text block py-1.5 text-[14px] transition-colors"
            >
              Frostify
            </a>
            <a
              href={site.links.frostoria}
              target="_blank"
              rel="noopener noreferrer"
              className="text-dim hover:text-text block py-1.5 text-[14px] transition-colors"
            >
              Frostoria
            </a>
            <Link
              href="/creators/frostify"
              className="text-dim hover:text-text block py-1.5 text-[14px] transition-colors"
            >
              Creators
            </Link>
          </FooterColumn>
        </div>

        <div className="border-line text-muted mt-12 flex flex-col gap-2 border-t pt-7 text-[13px] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} SketchSets. A {site.parent} project.
          </p>
          <p>Checkout and delivery handled by Payhip.</p>
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
      <h2 className="text-muted mb-2.5 text-[13px] font-medium">{title}</h2>
      {children}
    </div>
  );
}
