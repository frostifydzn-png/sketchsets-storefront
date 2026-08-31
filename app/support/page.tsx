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
    <>
      <section className="relative py-14 text-center sm:py-20">
        <div
          aria-hidden="true"
          className="hero-glow pointer-events-none absolute inset-0 z-0"
        />
        <div className="shell relative z-10">
          <h1 className="font-display-tight text-[clamp(2.25rem,6vw,4.5rem)] leading-[0.95] uppercase">
            Support
          </h1>
          <p className="text-dim mx-auto mt-4 max-w-xl text-[17px] leading-relaxed">
            The questions we get asked most. If the answer is not here, write to
            us and a person will reply.
          </p>

          <nav
            aria-label="Support sections"
            className="mt-8 flex flex-wrap items-center justify-center gap-2.5"
          >
            {supportSections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="border-line hover:border-line-bright hover:bg-elevated rounded-full border px-4 py-2 text-[14px] font-medium transition-colors"
              >
                {s.title}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <div className="shell">
        {supportSections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="section-gap scroll-mt-24"
          >
            <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
              <div className="lg:sticky lg:top-24 lg:self-start">
                <h2 className="font-display text-[clamp(1.625rem,3vw,2.25rem)] leading-[1.05]">
                  {section.title}
                </h2>
                <p className="text-dim mt-3 text-[16px] leading-relaxed">
                  {section.intro}
                </p>
              </div>

              {/* Native details/summary: keyboard accessible with no JS. */}
              <div>
                {section.items.map((item) => (
                  <details
                    key={item.q}
                    className="border-line group border-t last:border-b"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[17px] font-semibold [&::-webkit-details-marker]:hidden">
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
          <div className="bg-surface ring-line rounded-3xl p-8 text-center ring-1 sm:p-14">
            <h2 className="font-display text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.05]">
              Still stuck?
            </h2>
            <p className="text-dim mx-auto mt-4 max-w-md text-[16px] leading-relaxed">
              Send a message and a real person will get back to you. No ticket
              queue, no bots.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={payhipPage("contact")}
                className="bg-accent text-ink rounded-full px-7 py-3.5 text-[15px] font-bold transition-transform hover:scale-[1.02]"
              >
                Write to the team
              </a>
              <a
                href={PAYHIP_ACCOUNT}
                className="border-line hover:border-line-bright hover:bg-elevated rounded-full border px-7 py-3.5 text-[15px] font-semibold transition-colors"
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

        <p className="text-muted section-gap-sm pb-4 text-center text-[14px]">
          SketchSets is a {site.parent} project.
        </p>
      </div>
    </>
  );
}
