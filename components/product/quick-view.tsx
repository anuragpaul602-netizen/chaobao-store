"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Star, ShoppingBag, Minus, Plus, Info } from "lucide-react";
import { useStore } from "@/lib/store";
import type { Product } from "@/types/product";
import { formatINR, discountPercent, cn } from "@/lib/utils";
import { ProductBadgePill } from "@/components/ui/badge";

export function QuickView({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const { addToCart } = useStore();
  const [qty, setQty] = React.useState(1);

  React.useEffect(() => setQty(1), [product]);

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (product) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [product, onClose]);

  if (!product) return null;
  const discount = discountPercent(product.mrpPaise, product.pricePaise);
  const outOfStock = product.stock <= 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/60 p-0 backdrop-blur-sm animate-fade-up sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${product.name} quick view`}
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-t-2xl bg-paper shadow-soft sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close quick view"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-paper/90 shadow-card backdrop-blur transition-transform hover:scale-110"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="relative aspect-square bg-muted sm:rounded-l-2xl">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover sm:rounded-l-2xl"
            />
            <div className="absolute left-3 top-3 flex flex-col gap-1.5">
              {product.badges.map((b) => (
                <ProductBadgePill key={b} badge={b} />
              ))}
            </div>
            {outOfStock && (
              <div className="absolute inset-0 flex items-center justify-center bg-paper/70 backdrop-blur-sm">
                <span className="rounded-full bg-ink px-4 py-1.5 text-xs font-bold uppercase text-paper">
                  Sold out
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col p-5 sm:py-8 sm:pr-8">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {product.brand}
            </span>
            <h2 className="mt-1 font-display text-xl font-bold leading-tight">{product.name}</h2>

            <div className="mt-2 flex items-center gap-1.5 text-sm">
              <Star className="h-4 w-4 fill-gold text-gold" />
              <span className="font-semibold">{product.rating.toFixed(1)}</span>
              <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
            </div>

            <div className="mt-4 flex flex-wrap items-baseline gap-2">
              <span className="font-display text-2xl font-extrabold">
                {formatINR(product.pricePaise)}
              </span>
              {discount > 0 && (
                <>
                  <span className="text-sm text-muted-foreground line-through">
                    {formatINR(product.mrpPaise)}
                  </span>
                  <span className="text-sm font-bold text-jade">{discount}% off</span>
                </>
              )}
            </div>
            <span className="text-xs text-muted-foreground">Inclusive of all taxes</span>

            <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 border-y border-border py-4 text-xs">
              <dt className="text-muted-foreground">Pack size</dt>
              <dd className="font-medium">{product.unitLabel}</dd>
              <dt className="text-muted-foreground">Country of origin</dt>
              <dd className="font-medium">{product.countryOfOrigin}</dd>
              <dt className="text-muted-foreground">In stock</dt>
              <dd className={cn("font-medium", outOfStock && "text-lacquer")}>
                {outOfStock ? "Out of stock" : `${product.stock} units`}
              </dd>
              <dt className="text-muted-foreground">Supplier code</dt>
              <dd className="font-mono text-[11px] font-medium">{product.sourceCode}</dd>
            </dl>

            <div className="mt-5 flex items-center gap-3">
              <div className="flex items-center rounded-xl border border-border">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  disabled={outOfStock}
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="flex h-10 w-10 items-center justify-center hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center text-sm font-semibold" aria-live="polite">
                  {qty}
                </span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  disabled={outOfStock}
                  onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                  className="flex h-10 w-10 items-center justify-center hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <button
                type="button"
                disabled={outOfStock}
                onClick={() => {
                  addToCart(product, qty);
                  onClose();
                }}
                className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-lacquer text-sm font-semibold text-lacquer-foreground transition-colors hover:bg-lacquer/90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ShoppingBag className="h-4 w-4" /> {outOfStock ? "Sold out" : "Add to cart"}
              </button>
            </div>

            <Link
              href={`/products/${product.slug}`}
              className="mt-3 text-center text-sm font-semibold underline underline-offset-4 hover:text-lacquer"
            >
              View full details
            </Link>

            <p className="mt-4 flex items-start gap-1.5 rounded-xl bg-muted p-3 text-[11px] leading-relaxed text-muted-foreground">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <span>
                Product data imported from <strong>{product.supplier}</strong>. Price is an
                estimate pending your final price list.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
