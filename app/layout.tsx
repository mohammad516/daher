import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});


export const metadata: Metadata = {
  title: "Mustapha Daher Center | Renewable Energy Solutions Lebanon",
  description:
    "Electricity is not a luxury, it's a life necessity. Mustapha Daher Center provides solar energy solutions, maintenance contracts, technical consultancy, and renewable energy services across Lebanon.",
  keywords: [
    "solar energy Lebanon",
    "renewable energy Tripoli",
    "photovoltaic",
    "maintenance contracts",
    "Mustapha Daher Center",
  ],
  openGraph: {
    title: "Mustapha Daher Center | Renewable Energy Solutions Lebanon",
    description:
      "Electricity is not a luxury, it's a life necessity. Professional renewable energy solutions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
