import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
});

const fraunces = Fraunces({
  variable: "--font-heading",
  subsets: ["latin", "latin-ext"],
  weight: "variable",
  axes: ["opsz", "SOFT", "WONK"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://puhumedia.com.tr";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Puhu Media | Sağlık Reklamcılığında Uzman Dijital Ajans",
    template: "%s | Puhu Media",
  },
  description:
    "Puhu Media; hastaneler, tıp merkezleri, estetik ve sağlık turizmi markaları için premium dijital pazarlama, SEO, sosyal medya ve marka yönetimi hizmetleri sunan yaratıcı ajanstır.",
  keywords: [
    "sağlık reklamcılığı",
    "sağlık turizmi pazarlaması",
    "dijital ajans",
    "hastane reklamcılığı",
    "estetik klinik pazarlama",
  ],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteUrl,
    siteName: "Puhu Media",
    title: "Puhu Media | Sağlık Reklamcılığında Uzman Dijital Ajans",
    description:
      "Hastaneler, klinikler ve sağlık turizmi markaları için premium dijital pazarlama çözümleri.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Puhu Media | Sağlık Reklamcılığında Uzman Dijital Ajans",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
