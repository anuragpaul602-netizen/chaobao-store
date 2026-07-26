import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About ChaoBao",
  description:
    "ChaoBao imports Chinese snacks, candy, noodles, sauces and drinks and ships them across India. Here's what we do and why.",
  alternates: { canonical: "/pages/about" },
};

export default function AboutPage() {
  return (
    <div className="container max-w-3xl py-12 md:py-16">
      <span className="text-xs font-bold uppercase tracking-wide text-lacquer">About us</span>
      <h1 className="mt-2 font-display text-3xl font-extrabold md:text-4xl">
        China&rsquo;s snack drop, delivered to India
      </h1>

      <div className="mt-8 space-y-5 text-sm leading-relaxed text-muted-foreground">
        <p>
          ChaoBao brings the snacks, candy, instant noodles, sauces and drinks that fill
          Chinese supermarket aisles to shelves and doorsteps across India — brands like Lee
          Kum Kee, Chineat, Tiantan and Three 8&rsquo;s, sourced through our supplier partners
          and shipped from our India warehouse.
        </p>
        <p>
          Every product on the site is sourced from Chinese-origin catalogues and screened
          against India&rsquo;s import rules before it&rsquo;s listed — items covered by the
          DGFT&rsquo;s milk-and-milk-product restriction, animal-origin goods requiring a
          Sanitary Import Permit, and alcoholic preparations are kept off the shelf. You can
          read the detail of that screening process in our{" "}
          <Link href="/pages/terms" className="font-semibold text-ink underline underline-offset-4 hover:text-lacquer">
            Terms of Service
          </Link>
          .
        </p>
        <p>
          We&rsquo;re a small team building this catalogue product by product — each item
          keeps a supplier item code so it can be traced back to the exact case it shipped in.
          If something looks off, or you&rsquo;re missing a favourite snack, tell us —{" "}
          <Link href="/pages/contact" className="font-semibold text-ink underline underline-offset-4 hover:text-lacquer">
            we read every message
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
