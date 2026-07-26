import { ShieldCheck, Truck, BadgeCheck, Headphones } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const REASONS = [
  {
    icon: ShieldCheck,
    title: "100% Authentic Imports",
    body: "Every SKU is sourced through licensed importers and traceable to a supplier item code.",
  },
  {
    icon: Truck,
    title: "Pan-India Delivery",
    body: "We ship to 28 states and check PIN code serviceability before you pay.",
  },
  {
    icon: BadgeCheck,
    title: "Freshness Checked",
    body: "Expiry dates are verified at warehouse intake before any order leaves us.",
  },
  {
    icon: Headphones,
    title: "Real Human Support",
    body: "Questions about ingredients or allergens? Our team replies within hours.",
  },
];

export function WhyBuyFromUs() {
  return (
    <section className="py-14 md:py-20">
      <div className="container">
        <Reveal>
          <h2 className="text-center font-display text-2xl font-bold md:text-3xl">
            Why Buy From ChaoBao
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((reason, i) => (
            <Reveal key={reason.title} delay={i * 80}>
              <div className="group flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-lacquer/10 text-lacquer transition-transform duration-300 group-hover:scale-110">
                  <reason.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold">{reason.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{reason.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
