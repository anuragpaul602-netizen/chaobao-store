import { ProductRail } from "@/components/home/product-rail";
import { trendingProducts } from "@/lib/data/products";

export function TrendingSnacks() {
  return (
    <ProductRail
      eyebrow="Going viral"
      title="Trending Snacks"
      subtitle="What everyone's ordering on ChaoBao this week."
      products={trendingProducts}
      viewAllHref="/shop?sort=trending"
      tone="muted"
    />
  );
}
