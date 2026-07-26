import type { Metadata } from "next";
import { Mail, Clock, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with ChaoBao about an order, a return, or a product question.",
  alternates: { canonical: "/pages/contact" },
};

const CHANNELS = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@chaobao.in",
    href: "mailto:hello@chaobao.in",
    note: "Order questions, returns, and everything else. We reply within 1 business day.",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon–Sat, 10 AM–7 PM IST",
    note: "Closed on public holidays.",
  },
  {
    icon: MapPin,
    label: "Warehouse",
    value: "ChaoBao Foods, India",
    note: "Order-specific pickup or courier queries — email us with your order number.",
  },
];

export default function ContactPage() {
  return (
    <div className="container max-w-2xl py-12 md:py-16">
      <span className="text-xs font-bold uppercase tracking-wide text-lacquer">Help</span>
      <h1 className="mt-2 font-display text-3xl font-extrabold md:text-4xl">Contact Us</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Have a question about an order, a return, or a product? Reach us here — for order
        issues, include your order number so we can help faster.
      </p>

      <ul className="mt-8 space-y-4">
        {CHANNELS.map((c) => (
          <li key={c.label} className="flex gap-4 rounded-2xl border border-border p-5">
            <c.icon className="h-5 w-5 shrink-0 text-lacquer" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {c.label}
              </p>
              {c.href ? (
                <a href={c.href} className="mt-0.5 block font-display text-base font-bold hover:text-lacquer">
                  {c.value}
                </a>
              ) : (
                <p className="mt-0.5 font-display text-base font-bold">{c.value}</p>
              )}
              <p className="mt-1 text-sm text-muted-foreground">{c.note}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
