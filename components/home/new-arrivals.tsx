import { ProductRail } from "@/components/home/product-rail";
import { getNewArrivals } from "@/lib/products";

export async function NewArrivals() {
  const newArrivals = await getNewArrivals();
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
