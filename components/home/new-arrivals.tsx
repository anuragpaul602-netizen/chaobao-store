import { ProductRail } from "@/components/home/product-rail";
import { newArrivals } from "@/lib/data/products";

export function NewArrivals() {
  return (
    <ProductRail
      eyebrow="Just landed"
      title="New Arrivals"
      subtitle="Freshly imported and back in stock."
      products={newArrivals}
      viewAllHref="/shop?sort=new"
    />
  );
}
