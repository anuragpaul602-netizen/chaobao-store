import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping & Delivery",
  description:
    "Dispatch times, delivery estimates and shipping rates for ChaoBao orders across India.",
  alternates: { canonical: "/pages/shipping" },
};

const SECTIONS = [
  {
    title: "Dispatch",
    body: "Orders placed before 2 PM IST ship the same working day from our warehouse. Orders placed after 2 PM, or on Sundays and public holidays, dispatch the next working day.",
  },
  {
    title: "Delivery estimates",
    body: "3–5 business days to metro cities, 5–8 business days elsewhere in India. You'll get a tracking link by email and SMS the moment your order ships.",
  },
  {
    title: "Shipping rates",
    body: "Free shipping on orders over ₹999. Below that, a flat ₹99 shipping fee applies at checkout, shown before you pay.",
  },
  {
    title: "Serviceability",
    body: "We currently deliver to most PIN codes across India. Enter your PIN code on any product page to check whether we deliver to you and how long it'll take.",
  },
  {
    title: "Damaged in transit",
    body: "Send us a photo within 48 hours of delivery and we'll replace or refund the item in full — no questions asked.",
  },
];

export default function ShippingPage() {
  return (
    <div className="container max-w-3xl py-12 md:py-16">
      <span className="text-xs font-bold uppercase tracking-wide text-lacquer">Help</span>
      <h1 className="mt-2 font-display text-3xl font-extrabold md:text-4xl">Shipping &amp; Delivery</h1>

      <dl className="mt-8 divide-y divide-border">
        {SECTIONS.map((s) => (
          <div key={s.title} className="py-5">
            <dt className="font-display text-base font-bold">{s.title}</dt>
            <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.body}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
