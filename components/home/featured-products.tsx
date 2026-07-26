import { ProductRail } from "@/components/home/product-rail";
import { featuredProducts } from "@/lib/data/products";

export function FeaturedProducts() {
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
