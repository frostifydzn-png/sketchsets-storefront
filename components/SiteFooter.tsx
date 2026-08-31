import Link from "next/link";
import { Logomark } from "@/components/Logomark";
import { NewsletterForm } from "@/components/NewsletterForm";
import { categories } from "@/lib/products";
import { PAYHIP_ACCOUNT, payhipPage, site } from "@/lib/site";

const shopLinks = [
  { href: "/browse", label: "Browse all" },
  ...categories.map((c) => ({ href: `/${c.id}`, label: c.name })),
  { href: "/free", label: "Freebies" },
  { href: "/products/sketchsets-vault", label: "The Vault" },
  { href: "/new", label: "New Drops" },
];

const supportLinks = [
  { href: "/support", label: "Support" },
  { href: "/support#licensing", label: "Licensing" },
  { href: "/support#orders", label: "Orders & downloads" },
  { href: payhipPage("contact"), label: "Contact", external: true },
];

const legalLinks = [
  { href: payhipPage("terms-and-conditions"), label: "Terms of Use" },
  { href: payhipPage("privacy-policy"), label: "Privacy Policy" },
  { href: payhipPage("license"), label: "License" },
];

/*
 * Phase 1 sells Frostify's own work, so there is no "become a creator" route to
 * link to yet. These point at what actually exists: the creator page and the
 * Payhip account where buyers re-download what they bought.
 */
const creatorLinks = [
  { href: "/creators/frostify", label: "Creators", external: false },
  { href: PAYHIP_ACCOUNT, label: "Your downloads", external: true },
];

export function SiteFooter() {
  return (
    <footer className="border-line mt-6 border-t">
      <div className="shell py-12 lg:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.1fr)_repeat(4,minmax(0,0.62fr))_minmax(0,1.05fr)]">
          <div>
            <div className="flex items-center gap-2.5">
              <Logomark className="text-accent h-7 w-7 shrink-0" />
              <span className="leading-none">
                <span className="block text-[19px] font-extrabold tracking-[-0.02em] text-white">
                  SketchSets
                </span>
                <span className="text-muted mt-0.5 block text-[11px]">
                  by{" "}
                  <span className="text-accent font-semibold">
                    {site.parent}
                  </span>
                </span>
              </span>
            </div>
            <p className="text-dim mt-4 max-w-[30ch] text-[13.5px] leading-relaxed">
              Curated resources for people who make the internet.
            </p>
            <div className="mt-5 flex gap-3">
              <Social href={site.links.twitter} label="X">
                <path d="M13.7 10.6 20.4 3h-1.6l-5.8 6.6L8.4 3H3l7 10.2L3 21h1.6l6.1-7 4.9 7H21l-7.3-10.4Zm-2.2 2.5-.7-1L5.2 4.2h2.4l4.5 6.5.7 1 5.9 8.4h-2.4l-4.8-6.9Z" />
              </Social>
              <Social href={site.links.instagram} label="Instagram">
                <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4 1.3-.1 1.7-.1 4.9-.1Zm0 6.3a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm0 5.8a2.3 2.3 0 1 1 0-4.6 2.3 2.3 0 0 1 0 4.6Zm4.5-5.9a.8.8 0 1 1-1.6 0 .8.8 0 0 1 1.6 0Z" />
              </Social>
              <Social href={site.links.discord} label="Discord">
                <path d="M20.3 4.6A19 19 0 0 0 15.6 3l-.3.5a13 13 0 0 1 4.1 2 15.6 15.6 0 0 0-13.4-.5c.4-.3.9-.6 1.4-.9a13 13 0 0 1 1.9-.7L9 3a19 19 0 0 0-4.7 1.6C1.4 9 .6 13.2 1 17.4a19 19 0 0 0 5.7 2.9l1.2-1.7a12 12 0 0 1-1.9-.9l.5-.4a13.6 13.6 0 0 0 11.6 0l.5.4a12 12 0 0 1-1.9.9l1.2 1.7a19 19 0 0 0 5.7-2.9c.5-4.9-.8-9-3.3-12.8ZM8.3 15c-1.1 0-2-1-2-2.3s.9-2.3 2-2.3 2 1 2 2.3-.9 2.3-2 2.3Zm7.4 0c-1.1 0-2-1-2-2.3s.9-2.3 2-2.3 2 1 2 2.3-.9 2.3-2 2.3Z" />
              </Social>
            </div>
          </div>

          <FooterColumn title="Shop">
            {shopLinks.map((l) => (
              <Link key={l.href} href={l.href} className={footerLink}>
                {l.label}
              </Link>
            ))}
          </FooterColumn>

          <FooterColumn title="Support">
            {supportLinks.map((l) =>
              l.external ? (
                <a key={l.href} href={l.href} className={footerLink}>
                  {l.label}
                </a>
              ) : (
                <Link key={l.href} href={l.href} className={footerLink}>
                  {l.label}
                </Link>
              ),
            )}
          </FooterColumn>

          <FooterColumn title="Legal">
            {legalLinks.map((l) => (
              <a key={l.href} href={l.href} className={footerLink}>
                {l.label}
              </a>
            ))}
          </FooterColumn>

          <FooterColumn title="Creators">
            {creatorLinks.map((l) =>
              l.external ? (
                <a key={l.href} href={l.href} className={footerLink}>
                  {l.label}
                </a>
              ) : (
                <Link key={l.href} href={l.href} className={footerLink}>
                  {l.label}
                </Link>
              ),
            )}
          </FooterColumn>

          <div>
            <h2 className="text-[12px] font-extrabold tracking-[0.09em] text-white uppercase">
              Get SketchSets drops
            </h2>
            <p className="text-muted mt-2.5 text-[13px] leading-relaxed">
              Occasional emails. Good resources. No garbage.
            </p>
            <div className="mt-4">
              <NewsletterForm />
            </div>
          </div>
        </div>

        <div className="border-line text-muted mt-11 flex flex-col gap-2 border-t pt-6 text-[12.5px] sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} SketchSets by {site.parent}. All
            rights reserved.
          </p>
          <p>Checkout and delivery handled by Payhip.</p>
        </div>
      </div>
    </footer>
  );
}

const footerLink =
  "text-dim hover:text-accent block py-1.5 text-[13.5px] transition-colors";

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="mb-3 text-[12px] font-extrabold tracking-[0.09em] text-white uppercase">
        {title}
      </h2>
      {children}
    </div>
  );
}

function Social({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="bg-elevated border-line text-dim hover:border-accent hover:text-accent flex h-9 w-9 items-center justify-center rounded-full border transition-colors"
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        {children}
      </svg>
    </a>
  );
}
