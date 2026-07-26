import Link from "next/link";
import Image from "next/image";
import { Instagram, Youtube, Twitter } from "lucide-react";

const FOOTER_COLUMNS = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/shop" },
      { label: "Gift Boxes", href: "/shop?category=gift-boxes" },
      { label: "New Arrivals", href: "/shop?sort=newest" },
      { label: "Flash Sale", href: "/shop?sale=1" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Shipping & Delivery", href: "/pages/shipping" },
      { label: "Returns & Refunds", href: "/pages/returns" },
      { label: "Contact Us", href: "/pages/contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About ChaoBao", href: "/pages/about" },
      { label: "Terms of Service", href: "/pages/terms" },
      { label: "Privacy Policy", href: "/pages/privacy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-ink text-paper">
      <div className="container grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Image src="/logo.svg" alt="ChaoBao" width={140} height={37} className="brightness-0 invert" />
          <p className="mt-4 max-w-xs text-sm text-paper/70">
            Curated Chinese snacks, candy, noodles &amp; drinks — imported and delivered across India.
          </p>
          <div className="mt-5 flex gap-3">
            <a href="#" aria-label="Instagram" className="rounded-full border border-paper/20 p-2 hover:bg-paper/10">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" aria-label="YouTube" className="rounded-full border border-paper/20 p-2 hover:bg-paper/10">
              <Youtube className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Twitter" className="rounded-full border border-paper/20 p-2 hover:bg-paper/10">
              <Twitter className="h-4 w-4" />
            </a>
          </div>
        </div>

        {FOOTER_COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-paper/90">{col.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-paper/70 hover:text-paper">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-paper/10">
        <div className="container flex flex-col items-center justify-between gap-3 py-5 text-xs text-paper/60 md:flex-row">
          <p>© {new Date().getFullYear()} ChaoBao. All rights reserved. GST invoices available at checkout.</p>
          <p>Secure payments via Razorpay &amp; Stripe · Cash on Delivery available</p>
        </div>
      </div>
    </footer>
  );
}
