import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mustardseed.group";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mustard Seed Group | Systems That Increase Human Capability",
    template: "%s | Mustard Seed Group",
  },
  description:
    "Mustard Seed Group is the parent company behind research, software, consumer products and creative systems focused on increasing human capability.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Mustard Seed Group",
    title: "Mustard Seed Group | Systems That Increase Human Capability",
    description:
      "A portfolio spanning business operating systems, research, human performance, consumer products and creative culture.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mustard Seed Group",
    description: "Building systems that increase human capability.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable}`}>
      <body>
        {children}
        {process.env.NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN ? (
          <Script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={`{"token":"${process.env.NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN}"}`}
          />
        ) : null}
      </body>
    </html>
  );
}
