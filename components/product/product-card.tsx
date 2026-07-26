"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star, ShoppingBag, Eye, Check } from "lucide-react";
import { ProductBadgePill } from "@/components/ui/badge";
import { useStore } from "@/lib/store";
import type { Product } from "@/types/product";
import { formatINR, discountPercent, cn } from "@/lib/utils";

export function ProductCard({
  product,
  onQuickView,
  priority = false,
}: {
  product: Product;
  onQuickView?: (p: Product) => void;
  priority?: boolean;
}) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [added, setAdded] = React.useState(false);
  const discount = discountPercent(product.mrpPaise, product.pricePaise);
  const wished = isWishlisted(product.id);
  const outOfStock = product.stock <= 0;

  function handleAdd() {
    if (outOfStock) return;
    addToCart(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  }

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-paper shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft motion-reduce:hover:translate-y-0">
      <button
        type="button"
        aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        aria-pressed={wished}
        onClick={() => toggleWishlist(product.id)}
        className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-paper/90 shadow-card backdrop-blur transition-transform hover:scale-110 active:scale-95"
      >
        <Heart className={cn("h-4 w-4 transition-colors", wished ? "fill-lacquer text-lacquer" : "text-ink")} />
      </button>

      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-square overflow-hidden bg-muted"
        aria-label={product.name}
      >
        <Image
          src={product.image}
          alt={`${product.brand} ${product.name}`}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110 motion-reduce:group-hover:scale-100"
        />
        <div className="pointer-events-none absolute left-3 top-3 z-10 flex flex-col items-start gap-1.5">
          {product.badges.slice(0, 2).map((badge) => (
            <ProductBadgePill key={badge} badge={badge} />
          ))}
        </div>
        {outOfStock && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-paper/70 backdrop-blur-sm">
            <span className="rounded-full bg-ink px-4 py-1.5 text-xs font-bold uppercase text-paper">
              Sold out
            </span>
          </div>
        )}
      </Link>

      {onQuickView && !outOfStock && (
        <button
          type="button"
          onClick={() => onQuickView(product)}
          className="absolute left-1/2 top-[38%] z-20 flex -translate-x-1/2 translate-y-3 items-center gap-1.5 rounded-full bg-ink/90 px-4 py-2 text-xs font-semibold text-paper opacity-0 shadow-soft backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 focus:translate-y-0 focus:opacity-100 motion-reduce:transition-none"
        >
          <Eye className="h-3.5 w-3.5" /> Quick view
        </button>
      )}

      <div className="flex flex-1 flex-col gap-1 p-4">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          {product.brand}
        </span>
        <Link
          href={`/products/${product.slug}`}
          className="line-clamp-2 font-display text-sm font-semibold leading-snug transition-colors hover:text-lacquer"
        >
          {product.name}
        </Link>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Star className="h-3.5 w-3.5 shrink-0 fill-gold text-gold" />
          <span className="font-medium text-ink">{product.rating.toFixed(1)}</span>
          <span>({product.reviewCount})</span>
          <span aria-hidden>·</span>
          <span>{product.unitLabel}</span>
        </div>

        <div className="mt-auto flex flex-wrap items-baseline gap-x-2 gap-y-0.5 pt-2">
          <span className="font-display text-base font-bold">{formatINR(product.pricePaise)}</span>
          {discount > 0 && (
            <>
              <span className="text-xs text-muted-foreground line-through">
                {formatINR(product.mrpPaise)}
              </span>
              <span className="text-xs font-bold text-jade">{discount}% off</span>
            </>
          )}
        </div>

        {product.stock > 0 && product.stock <= 15 && (
          <span className="text-[11px] font-semibold text-lacquer">
            Only {product.stock} left
          </span>
        )}

        <button
          type="button"
          onClick={handleAdd}
          disabled={outOfStock}
          className={cn(
            "mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40",
            added ? "bg-jade text-jade-foreground" : "bg-ink text-paper hover:bg-lacquer"
          )}
        >
          {added ? (
            <>
              <Check className="h-4 w-4" /> Added
            </>
          ) : (
            <>
              <ShoppingBag className="h-4 w-4" /> Add to cart
            </>
          )}
        </button>
      </div>
    </article>
  );
}
