import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Returns & Refunds",
  description: "ChaoBao's returns, refunds and exchange policy for imported snacks and food items.",
  alternates: { canonical: "/pages/returns" },
};

const SECTIONS = [
  {
    title: "What can be returned",
    body: "Sealed, unopened packs can be returned within 7 days of delivery for a full refund or exchange. This applies to all packaged snacks, sauces, noodles and drinks bought on ChaoBao.",
  },
  {
    title: "What can't be returned",
    body: "Perishables and any food item once opened can't be returned, for food-safety reasons. This is standard practice for imported packaged food and applies even if the item is unused.",
  },
  {
    title: "Damaged or wrong item",
    body: "If your order arrives damaged, or you receive the wrong item, send us a photo within 48 hours of delivery and we'll replace it or refund you in full — this isn't subject to the unopened-pack rule.",
  },
  {
    title: "Refund timeline",
    body: "Once a return is approved, refunds are issued to your original payment method within 5–7 business days. Cash on Delivery orders are refunded via bank transfer or UPI.",
  },
];

export default function ReturnsPage() {
  return (
    <div className="container max-w-3xl py-12 md:py-16">
      <span className="text-xs font-bold uppercase tracking-wide text-lacquer">Help</span>
      <h1 className="mt-2 font-display text-3xl font-extrabold md:text-4xl">Returns &amp; Refunds</h1>

      <dl className="mt-8 divide-y divide-border">
        {SECTIONS.map((s) => (
          <div key={s.title} className="py-5">
            <dt className="font-display text-base font-bold">{s.title}</dt>
            <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.body}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-8 text-sm text-muted-foreground">
        Need to start a return?{" "}
        <Link href="/pages/contact" className="font-semibold text-ink underline underline-offset-4 hover:text-lacquer">
          Contact us
        </Link>{" "}
        with your order number and we&rsquo;ll take it from there.
      </p>
    </div>
  );
}
