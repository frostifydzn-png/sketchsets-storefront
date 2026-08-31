import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter_Tight } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { site } from "@/lib/site";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "creator resources",
    "thumbnail assets",
    "premiere pro presets",
    "photoshop overlays",
    "video editing assets",
    "PSD packs",
    "SketchSets",
    "Frostify",
  ],
  authors: [{ name: site.parent, url: site.links.frostify }],
  creator: site.parent,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${interTight.variable} h-full antialiased`}
    >
      <body className="bg-ink text-text flex min-h-full flex-col">
        <a
          href="#main"
          className="text-ink sr-only rounded-full bg-white px-4 py-2 font-medium focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        {/* Scoped to this Vercel project only — no shared analytics with Frostify. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
