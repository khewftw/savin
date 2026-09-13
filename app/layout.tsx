import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const basisGrotesque = localFont({
  src: [
    { path: "../fonts/BasisGrotesquePro-Light.woff2", weight: "300", style: "normal" },
    { path: "../fonts/BasisGrotesquePro-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/BasisGrotesquePro-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/BasisGrotesquePro-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-basis",
  display: "swap",
  adjustFontFallback: "Arial",
  fallback: ["Helvetica Neue", "Helvetica", "Arial"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Savin Cleaning — клининг для резидентов в Казани",
  description: "Деликатный уход за частными интерьерами и пространствами Savin House. Официальный клининговый сервис в Казани.",
  openGraph: {
    title: "Savin Cleaning",
    description: "Безупречный клининговый сервис для частных пространств Savin House.",
    images: ["/images/savin-hero.webp"],
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={`${basisGrotesque.variable} ${basisGrotesque.className} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
