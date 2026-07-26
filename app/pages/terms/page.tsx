import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms governing your use of the ChaoBao website and orders placed through it.",
  alternates: { canonical: "/pages/terms" },
  robots: { index: false },
};

const SECTIONS = [
  {
    title: "1. About ChaoBao",
    body: "ChaoBao Foods ('ChaoBao', 'we', 'us') operates chaobao.in, importing and selling Chinese-origin packaged snacks, candy, noodles, sauces and drinks to customers in India. By using this site or placing an order, you agree to these terms.",
  },
  {
    title: "2. Product information",
    body: "We describe products as accurately as we can from supplier catalogues and packaging. Prices, stock levels, ratings and review counts shown on the site reflect our current listing data at the time of your visit and are subject to change without notice.",
  },
  {
    title: "3. Import compliance",
    body: "Every product listed has been screened against India's import restrictions on Chinese-origin goods — including the DGFT prohibition on milk and milk-product-containing items, Sanitary Import Permit requirements for animal-origin ingredients, and licensing requirements for alcoholic preparations. This screening is based on product names and category and does not replace ingredient-level verification; if you have an allergy or dietary restriction, check the physical packaging before consuming.",
  },
  {
    title: "4. Orders & payment",
    body: "An order is confirmed once payment is successfully processed (or, for Cash on Delivery, once we accept the order). We reserve the right to cancel or refuse an order — for example if an item is out of stock or if we suspect fraud — and will refund any payment already made.",
  },
  {
    title: "5. Pricing & GST",
    body: "All prices shown are inclusive of applicable GST unless stated otherwise. A GST invoice is available for every order.",
  },
  {
    title: "6. Returns & refunds",
    body: "Return and refund eligibility is set out in our Returns & Refunds policy, which forms part of these terms.",
  },
  {
    title: "7. Intellectual property",
    body: "The ChaoBao name, logo and site design are our property. Product names, brand names and imagery belong to their respective owners and are used to describe and sell genuine imported goods.",
  },
  {
    title: "8. Limitation of liability",
    body: "We are not liable for indirect or consequential losses arising from your use of the site or delayed delivery, except where such liability cannot be excluded under Indian law.",
  },
  {
    title: "9. Governing law",
    body: "These terms are governed by the laws of India, and disputes are subject to the jurisdiction of the courts where ChaoBao is registered.",
  },
  {
    title: "10. Changes to these terms",
    body: "We may update these terms as the business evolves. Continued use of the site after a change means you accept the updated terms.",
  },
];

export default function TermsPage() {
  return (
    <div className="container max-w-3xl py-12 md:py-16">
      <span className="text-xs font-bold uppercase tracking-wide text-lacquer">Legal</span>
      <h1 className="mt-2 font-display text-3xl font-extrabold md:text-4xl">Terms of Service</h1>

      <div className="mt-6 flex items-start gap-3 rounded-2xl border border-dashed border-border bg-muted p-4">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-lacquer" />
        <p className="text-xs leading-relaxed text-muted-foreground">
          <strong className="text-ink">Draft, not legal advice.</strong> This page is placeholder
          content for the Milestone 2 build and hasn&rsquo;t been reviewed by a lawyer. Have it
          checked against India&rsquo;s Consumer Protection (E-Commerce) Rules and FSSAI
          import/labelling requirements before this site goes live.
        </p>
      </div>

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
