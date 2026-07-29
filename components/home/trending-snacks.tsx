import { ProductRail } from "@/components/home/product-rail";
import { getTrendingProducts } from "@/lib/products";

export async function TrendingSnacks() {
  const trendingProducts = await getTrendingProducts();
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
