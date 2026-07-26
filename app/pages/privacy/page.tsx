import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How ChaoBao collects, uses and protects your personal data.",
  alternates: { canonical: "/pages/privacy" },
  robots: { index: false },
};

const SECTIONS = [
  {
    title: "1. What we collect",
    body: "When you place an order, subscribe to our newsletter, or contact us, we collect information such as your name, email, phone number, shipping address, and order details. We do not store full payment card numbers — those are handled directly by our payment processor.",
  },
  {
    title: "2. How we use it",
    body: "We use your data to process and deliver orders, send order and shipping updates, respond to support requests, and — only if you've opted in — send marketing emails about new products and offers. You can unsubscribe from marketing emails at any time.",
  },
  {
    title: "3. Cookies",
    body: "We use essential cookies to keep your cart and site preferences (like light/dark mode) working. We may use analytics cookies to understand how the site is used, in aggregate and not tied to your identity for marketing purposes.",
  },
  {
    title: "4. Sharing with third parties",
    body: "We share order data with the minimum necessary third parties to run the business: payment processors (for checkout), courier partners (for delivery), and email providers (for order and marketing communication). We don't sell your personal data.",
  },
  {
    title: "5. Data retention",
    body: "We retain order records for as long as required under Indian tax and consumer protection law, and account data for as long as your account is active.",
  },
  {
    title: "6. Your rights",
    body: "You can ask us to access, correct, or delete your personal data by contacting us. We'll respond within a reasonable time, subject to any records we're legally required to keep.",
  },
  {
    title: "7. Security",
    body: "We take reasonable technical and organisational measures to protect your data, but no online system is 100% secure. If you notice anything suspicious with your account, let us know immediately.",
  },
  {
    title: "8. Changes to this policy",
    body: "We may update this policy as the business evolves. We'll post the updated version here with a new effective date.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="container max-w-3xl py-12 md:py-16">
      <span className="text-xs font-bold uppercase tracking-wide text-lacquer">Legal</span>
      <h1 className="mt-2 font-display text-3xl font-extrabold md:text-4xl">Privacy Policy</h1>

      <div className="mt-6 flex items-start gap-3 rounded-2xl border border-dashed border-border bg-muted p-4">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-lacquer" />
        <p className="text-xs leading-relaxed text-muted-foreground">
          <strong className="text-ink">Draft, not legal advice.</strong> This page is placeholder
          content for the Milestone 2 build and hasn&rsquo;t been reviewed by a lawyer. It should
          be checked against India&rsquo;s Digital Personal Data Protection Act, 2023 before this
          site collects real customer data.
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
