import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/product/product-card";
import { Reveal } from "@/components/ui/reveal";
import type { Product } from "@/types/product";

interface ProductRailProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllHref?: string;
  tone?: "default" | "muted";
}

/** Shared product section used by Featured / Trending / New Arrivals. */
export function ProductRail({
  eyebrow,
  title,
  subtitle,
  products,
  viewAllHref,
  tone = "default",
}: ProductRailProps) {
  if (products.length === 0) return null;

  return (
    <section className={tone === "muted" ? "bg-muted py-14 md:py-20" : "py-14 md:py-20"}>
      <div className="container">
        <Reveal className="mb-9 flex items-end justify-between gap-4">
          <div>
            {eyebrow && (
              <span className="text-xs font-bold uppercase tracking-wide text-lacquer">{eyebrow}</span>
            )}
            <h2 className="mt-1 font-display text-2xl font-bold md:text-3xl">{title}</h2>
            {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
          </div>
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="group hidden shrink-0 items-center gap-1 text-sm font-semibold hover:text-lacquer md:flex"
            >
              View all
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </Reveal>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.slice(0, 8).map((product, i) => (
            <Reveal key={product.id} delay={i * 50}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
