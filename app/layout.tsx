import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["cyrillic", "latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Savin House Cleaning — клининг для резидентов в Казани",
  description: "Деликатный уход за частными интерьерами и пространствами Savin House. Официальный клининговый сервис в Казани.",
  openGraph: {
    title: "Savin House Cleaning",
    description: "Безупречный клининговый сервис для частных пространств Savin House.",
    images: ["/images/savin-hero.webp"],
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="ru" className={`${montserrat.variable} antialiased`}><body>{children}</body></html>;
}
