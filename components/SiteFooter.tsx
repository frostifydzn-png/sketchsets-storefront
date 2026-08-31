import Link from "next/link";
import { categories } from "@/lib/products";
import { payhipPage, site } from "@/lib/site";

const shopLinks = [
  { href: "/browse", label: "Shop all" },
  ...categories.map((c) => ({ href: `/${c.id}`, label: c.name })),
];

const supportLinks = [
  { href: payhipPage("support"), label: "Support" },
  { href: payhipPage("faq"), label: "FAQ" },
  { href: payhipPage("customer/login"), label: "Your downloads" },
  { href: payhipPage("license"), label: "Licensing" },
];

const legalLinks = [
  { href: payhipPage("terms-and-conditions"), label: "Terms" },
  { href: payhipPage("privacy-policy"), label: "Privacy" },
];

export function SiteFooter() {
  return (
    <footer className="mt-32">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        {/* Oversized wordmark as the sign-off. */}
        <Link href="/" className="group block">
          <span className="font-display block text-[clamp(3rem,13vw,11rem)] leading-[0.85] font-extrabold">
            SketchSets
          </span>
        </Link>

        <div className="border-line mt-14 grid gap-10 border-t pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-text-dim max-w-xs text-[15px] leading-relaxed">
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
                  className="text-text-faint hover:text-text text-[14px] transition-colors"
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
                className="text-text-dim hover:text-text block py-1.5 text-[14px] transition-colors"
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
                className="text-text-dim hover:text-text block py-1.5 text-[14px] transition-colors"
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
              className="text-text-dim hover:text-text block py-1.5 text-[14px] transition-colors"
            >
              Frostify
            </a>
            <a
              href={site.links.frostoria}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-dim hover:text-text block py-1.5 text-[14px] transition-colors"
            >
              Frostoria
            </a>
            {legalLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-text-dim hover:text-text block py-1.5 text-[14px] transition-colors"
              >
                {l.label}
              </a>
            ))}
          </FooterColumn>
        </div>

        <div className="text-text-faint flex flex-col gap-2 py-10 text-[13px] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} SketchSets — a {site.parent} project.
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
      <h2 className="text-text-faint mb-2 text-[11px] font-semibold tracking-[0.16em] uppercase">
        {title}
      </h2>
      {children}
    </div>
  );
}
