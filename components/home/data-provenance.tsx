import { FileText, Languages, IndianRupee, TriangleAlert } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { products } from "@/lib/data/products";

const LTP_COUNT = products.filter((p) => p.supplier.startsWith("LTP")).length;
const CHADHA_COUNT = products.filter((p) => p.supplier.startsWith("Chadha")).length;

/**
 * Internal-facing annotation strip. It documents exactly where the catalogue
 * came from and which fields are still placeholders. Delete this section
 * before the store goes public.
 */
export function DataProvenance() {
  return (
    <section className="border-y border-border bg-paper py-14">
      <div className="container">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full bg-gold/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-gold-foreground">
            <TriangleAlert className="h-3.5 w-3.5" /> Internal note — remove before launch
          </span>
          <h2 className="mt-4 font-display text-2xl font-bold md:text-3xl">
            Where this catalogue came from
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Every product on this site was extracted programmatically from the two supplier
            catalogues you provided. Nothing was invented except the fields flagged below.
          </p>
        </Reveal>

        <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: FileText,
              title: `${LTP_COUNT} products`,
              body: "From the LTP Import Export catalogue, filtered to rows the supplier tagged with country code CN.",
            },
            {
              icon: Languages,
              title: `${CHADHA_COUNT} products`,
              body: "From the Chadha 2024 brochure. It's a scanned PDF, so it was OCR'd, then filtered to Chinese brands and dishes.",
            },
            {
              icon: IndianRupee,
              title: "Prices are estimates",
              body: "Neither catalogue lists a price. INR figures are modelled from category and pack weight — replace them with your real price list.",
            },
            {
              icon: TriangleAlert,
              title: "Also placeholder",
              body: "Ratings, review counts, stock levels and product photos. Real name, brand, pack size, origin and supplier code.",
            },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 70}>
              <div className="h-full rounded-2xl border border-border p-5">
                <item.icon className="h-5 w-5 text-lacquer" />
                <h3 className="mt-3 font-display text-sm font-bold">{item.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
