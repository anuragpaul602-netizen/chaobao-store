import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Noto_Serif_SC } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { RollbarProvider } from "@/components/rollbar-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { StoreProvider } from "@/lib/store";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { getAllProducts } from "@/lib/products";
import "./globals.css";

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const accent = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-accent",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ChaoBao — Imported Chinese Snacks, Delivered in India",
    template: "%s | ChaoBao",
  },
  description:
    "Curated Chinese snacks, chips, candy, mochi, instant noodles and bubble tea kits — imported and delivered across India.",
  keywords: [
    "Chinese snacks India",
    "imported snacks online",
    "Asian snack box",
    "Bokksu India",
    "K-pop snacks",
    "anime snacks",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "ChaoBao",
    title: "ChaoBao — Imported Chinese Snacks, Delivered in India",
    description:
      "Curated Chinese snacks, chips, candy, mochi, instant noodles and bubble tea kits — imported and delivered across India.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "ChaoBao — Imported Chinese Snacks, Delivered in India",
    description: "Curated Chinese snacks, delivered across India.",
  },
  alternates: { canonical: "/" },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const products = await getAllProducts();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${display.variable} ${body.variable} ${accent.variable} font-body`}>
        <RollbarProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <StoreProvider products={products}>
              <a
                href="#main"
                className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
              >
                Skip to content
              </a>
              <div className="flex min-h-screen flex-col">
                <Header />
                <main id="main" className="flex-1">
                  {children}
                </main>
                <Footer />
              </div>
              <CartDrawer />
            </StoreProvider>
          </ThemeProvider>
        </RollbarProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
