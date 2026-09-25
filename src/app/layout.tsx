import type { Metadata, Viewport } from "next";
import { Roboto, Roboto_Slab } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Chatbot } from "@/components/site/Chatbot";
import { troop } from "@/data/troop";

/* scouting.org uses exactly two families: Roboto Slab for headings/nav/buttons
   and Roboto for body copy. Self-hosted here via next/font. */
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const robotoSlab = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const title = `${troop.longName} | ${troop.city}, ${troop.stateAbbr}`;
const description = `${troop.longName} is a Scout-led Scouts BSA troop in ${troop.city}, California, part of the ${troop.district.name}, ${troop.council.name}. Weekly meetings, monthly campouts, and a Trail to Eagle for every Scout.`;

export const metadata: Metadata = {
  metadataBase: new URL("https://troop394santaclara.org"),
  title: {
    default: title,
    template: `%s | ${troop.name} ${troop.city}`,
  },
  description,
  keywords: [
    "Troop 394",
    "Troop 2394",
    "Scouts BSA Santa Clara",
    "Boy Scouts Santa Clara",
    "Silicon Valley Monterey Bay Council",
    "Pioneer District",
    "Scouting Santa Clara California",
    "Eagle Scout Santa Clara",
  ],
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_US",
    siteName: troop.longName,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#003f87",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: troop.longName,
    description,
    url: "https://troop394santaclara.org",
    email: troop.contact.email,
    foundingDate: String(troop.founded),
    address: {
      "@type": "PostalAddress",
      addressLocality: troop.city,
      addressRegion: troop.stateAbbr,
      addressCountry: "US",
    },
    memberOf: { "@type": "Organization", name: troop.council.name, url: troop.council.url },
  };

  return (
    <html
      lang="en"
      className={`${roboto.variable} ${robotoSlab.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}
