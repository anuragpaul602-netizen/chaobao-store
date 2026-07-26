"use client";

import Link from "next/link";
import { HeartOff } from "lucide-react";
import { useStore } from "@/lib/store";
import { products } from "@/lib/data/products";
import { ProductCard } from "@/components/product/product-card";
import { buttonVariants } from "@/components/ui/button";

export default function WishlistPage() {
  const { wishlist } = useStore();
  const saved = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="container py-12 md:py-16">
      <h1 className="font-display text-3xl font-extrabold md:text-4xl">Your Wishlist</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {saved.length === 0
          ? "Nothing saved yet."
          : `${saved.length} item${saved.length === 1 ? "" : "s"} saved.`}
      </p>

      {saved.length === 0 ? (
        <div className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-border py-20 text-center">
          <HeartOff className="h-10 w-10 text-muted-foreground" />
          <p className="mt-4 font-display text-lg font-semibold">No saved snacks</p>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Tap the heart on any product to save it here for later.
          </p>
          <Link href="/shop" className={buttonVariants({ className: "mt-6" })}>
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {saved.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
