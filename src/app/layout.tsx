import type { Metadata, Viewport } from "next";
import { Caveat, Fraunces, Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Cursor } from "@/components/ui/Cursor";
import { site } from "@/content/site";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});
const caveat = Caveat({ variable: "--font-caveat", subsets: ["latin"], weight: ["500", "700"], display: "swap" });
const geist = Geist({ variable: "--font-geist", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Eden Tattoos — Custom Tattoo & Piercing Studio in Chandigarh",
    template: "%s — Eden Tattoos Chandigarh",
  },
  description: site.description,
  keywords: [
    "tattoo studio Chandigarh",
    "best tattoo artist in Chandigarh",
    "custom tattoo Chandigarh",
    "mandala tattoo",
    "ornamental tattoo",
    "fine line tattoo",
    "Shiva tattoo",
    "piercing studio Chandigarh",
    "cover up tattoo Chandigarh",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: site.name,
    url: site.url,
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#eee8dd",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TattooParlor",
  name: site.name,
  description: site.description,
  url: site.url,
  image: `${site.url}/opengraph-image`,
  telephone: site.phone,
  email: site.email,
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.address.line1}, ${site.address.line2}`,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: site.rating.value,
    reviewCount: site.rating.count,
  },
  sameAs: [site.instagram.url, site.facebook],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${caveat.variable} ${geist.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="eyebrow sr-only z-[200] rounded-full bg-ink px-4 py-3 text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
          <Cursor />
        </SmoothScroll>
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
