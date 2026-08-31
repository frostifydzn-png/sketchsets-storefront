import type { Metadata } from "next";
import Link from "next/link";
import { supportSections } from "@/lib/support";
import { PAYHIP_ACCOUNT, payhipPage, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Answers on SketchSets products, file formats, orders, downloads and licensing. Plus a way to reach a human.",
  alternates: { canonical: "/support" },
};

export default function SupportPage() {
  return (
    <div className="shell page-bottom">
      <header className="pt-10 pb-10 sm:pt-14 sm:pb-12">
        <div>
          <p className="text-muted text-[13px]">Ask us anything</p>

          <div className="grid items-end gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            <div>
              <h1 className="text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.04] font-extrabold tracking-[-0.03em]">
                Support
              </h1>
              <p className="text-dim mt-4 max-w-[52ch] text-[16px] leading-relaxed">
                The questions we get asked most. If the answer is not here,
                write to us and a person will reply.
              </p>
            </div>

            {/* Contents, numbered — a page index rather than a row of chips. */}
            <nav aria-label="Support sections">
              <ol className="border-line border-t">
                {supportSections.map((s, i) => (
                  <li key={s.id} className="border-line border-b">
                    <a
                      href={`#${s.id}`}
                      className="group text-dim hover:text-text flex items-baseline gap-4 py-2.5 transition-colors"
                    >
                      <span className="text-muted group-hover:text-accent text-[11px] transition-colors">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[14px]">{s.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </div>
      </header>

      <div>
        {supportSections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="section-gap scroll-mt-24"
          >
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.5fr)] lg:gap-16">
              <div className="lg:sticky lg:top-24 lg:self-start">
                <h2 className="text-[clamp(1.375rem,2.4vw,1.75rem)] leading-tight font-bold tracking-[-0.02em] text-white">
                  {section.title}
                </h2>
                <p className="text-dim mt-3 text-[15px] leading-relaxed">
                  {section.intro}
                </p>
              </div>

              {/* Native details/summary: keyboard accessible with no JS. */}
              <div>
                {section.items.map((item) => (
                  <details
                    key={item.q}
                    className="border-line group border-b last:border-b-0"
                  >
                    <summary className="hover:text-accent flex cursor-pointer list-none items-center justify-between gap-4 py-4.5 text-[16px] font-semibold transition-colors [&::-webkit-details-marker]:hidden">
                      {item.q}
                      <span
                        aria-hidden="true"
                        className="text-muted group-open:text-accent shrink-0 text-[20px] transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="text-dim max-w-[64ch] pb-6 text-[16px] leading-relaxed">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Contact */}
        <section className="section-gap">
          <div className="border-line border-t pt-14 sm:pt-16">
            <h2 className="text-[clamp(1.75rem,3.2vw,2.25rem)] leading-[1.1] font-bold tracking-[-0.03em] text-white">
              Still stuck?
            </h2>
            <p className="text-dim mt-4 max-w-md text-[16px] leading-relaxed">
              Send a message and a real person will get back to you. No ticket
              queue, no bots.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={payhipPage("contact")}
                className="btn-primary px-7 py-3.5 text-[15px]"
              >
                Write to the team
              </a>
              <a
                href={PAYHIP_ACCOUNT}
                className="btn-ghost px-7 py-3.5 text-[15px]"
              >
                Find past downloads
              </a>
            </div>

            <p className="text-muted mt-8 text-[14px]">
              Looking for the full licence terms?{" "}
              <a
                href={payhipPage("license")}
                className="text-accent hover:underline"
              >
                Read them here
              </a>
              , or browse the{" "}
              <Link href="/browse" className="text-accent hover:underline">
                shop
              </Link>
              .
            </p>
          </div>
        </section>

        <p className="text-muted pt-2 text-center text-[13.5px]">
          SketchSets is a {site.parent} project.
        </p>
      </div>
    </div>
  );
}
