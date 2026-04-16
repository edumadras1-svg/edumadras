import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BottomNav } from "@/components/BottomNav";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "EduMadras — Discover Your Dream College in India | Fees, Rankings, Counseling",
  description:
    "India's premier college discovery platform. Compare 500+ Engineering, Medical, Management, Law & Design colleges. Get free expert counseling. Verified fees & placement data.",
  keywords: "colleges in India, IIT, AIIMS, engineering colleges, medical colleges, college comparison, free counseling, EduMadras",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#1B3A5C" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
      </head>
      <body className="font-sans min-h-screen bg-surface text-text-primary antialiased">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:bg-navy focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-semibold">
          Skip to main content
        </a>
        <main id="main-content" className="pb-[60px] md:pb-0">
          {children}
        </main>
        <FloatingWhatsApp />
        <BottomNav />
      </body>
    </html>
  );
}
