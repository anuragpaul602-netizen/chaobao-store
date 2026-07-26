import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopClient } from "@/components/shop/shop-client";
import { Skeleton, ProductCardSkeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Shop All Chinese Snacks",
  description:
    "Browse 166 imported Chinese snacks, instant noodles, sauces, drinks and sweets. Filter by category, brand and price. Delivered across India.",
  alternates: { canonical: "/shop" },
};

// ShopClient reads filters from useSearchParams, which requires a Suspense
// boundary — without it Next.js can't statically prerender this route.
function ShopFallback() {
  return (
    <div className="container py-8 md:py-12">
      <Skeleton className="h-9 w-64" />
      <Skeleton className="mt-3 h-4 w-full max-w-xl" />
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<ShopFallback />}>
      <ShopClient />
    </Suspense>
  );
}
