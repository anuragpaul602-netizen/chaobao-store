import { ProductRail } from "@/components/home/product-rail";
import { getFeaturedProducts } from "@/lib/products";

export async function FeaturedProducts() {
  const featuredProducts = await getFeaturedProducts();
  return (
    <ProductRail
      eyebrow="Customer favorites"
      title="Featured Products"
      subtitle="The snacks our customers reorder the most."
      products={featuredProducts}
      viewAllHref="/shop?sort=featured"
    />
  );
}
