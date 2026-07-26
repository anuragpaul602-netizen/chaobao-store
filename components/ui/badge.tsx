import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ProductBadge } from "@/types/product";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide",
  {
    variants: {
      tone: {
        lacquer: "bg-lacquer text-lacquer-foreground",
        jade: "bg-jade text-jade-foreground",
        gold: "bg-gold text-gold-foreground",
        blush: "bg-blush text-blush-foreground",
        ink: "bg-ink/90 text-paper",
      },
    },
    defaultVariants: { tone: "ink" },
  }
);

const BADGE_CONFIG: Record<ProductBadge, { label: string; tone: VariantProps<typeof badgeVariants>["tone"] }> = {
  new: { label: "New", tone: "jade" },
  bestseller: { label: "Bestseller", tone: "gold" },
  trending: { label: "Trending", tone: "lacquer" },
  sale: { label: "Sale", tone: "blush" },
  limited: { label: "Limited", tone: "ink" },
};

export function ProductBadgePill({ badge }: { badge: ProductBadge }) {
  const config = BADGE_CONFIG[badge];
  return <span className={cn(badgeVariants({ tone: config.tone }))}>{config.label}</span>;
}
