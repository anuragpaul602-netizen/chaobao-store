"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useStore } from "@/lib/store";
import {
  cn,
  formatINR,
  computeOrderTotals,
  FREE_SHIPPING_THRESHOLD_PAISE,
  SHIPPING_FEE_PAISE,
} from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export function CartDrawer() {
  const { cart, cartOpen, closeCart, setQty, removeFromCart, subtotalPaise } = useStore();

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeCart();
    }
    if (cartOpen) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [cartOpen, closeCart]);

  if (!cartOpen) return null;

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD_PAISE - subtotalPaise);
  const progress = Math.min(100, (subtotalPaise / FREE_SHIPPING_THRESHOLD_PAISE) * 100);
  const { gstPaise, shippingPaise, totalPaise } = computeOrderTotals(subtotalPaise);

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Shopping cart">
      <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={closeCart} />

      <div className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-paper shadow-soft">
        <div className="flex items-center justify-between border-b border-border p-5">
          <h2 className="font-display text-lg font-bold">
            Your cart{" "}
            <span className="text-sm font-normal text-muted-foreground">
              ({cart.reduce((n, l) => n + l.qty, 0)} items)
            </span>
          </h2>
          <button type="button" onClick={closeCart} aria-label="Close cart" className="rounded-full p-1.5 hover:bg-muted">
            <X className="h-5 w-5" />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            <p className="font-display text-base font-semibold">Your cart is empty</p>
            <p className="text-sm text-muted-foreground">Add a few snacks to get started.</p>
          </div>
        ) : (
          <>
            <div className="border-b border-border px-5 py-3">
              {remaining > 0 ? (
                <p className="text-xs text-muted-foreground">
                  Add <strong className="text-lacquer">{formatINR(remaining)}</strong> more for free shipping
                </p>
              ) : (
                <p className="text-xs font-semibold text-jade">You&rsquo;ve unlocked free shipping!</p>
              )}
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-lacquer transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <ul className="flex-1 divide-y divide-border overflow-y-auto">
              {cart.map((line) => (
                <li key={line.product.id} className="flex gap-3 p-4">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-muted">
                    <Image
                      src={line.product.image}
                      alt={line.product.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                      {line.product.brand}
                    </p>
                    <p className="line-clamp-2 text-sm font-semibold">{line.product.name}</p>
                    <p className="text-xs text-muted-foreground">{line.product.unitLabel}</p>

                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center rounded-lg border border-border">
                        <button
                          type="button"
                          aria-label={`Decrease quantity of ${line.product.name}`}
                          onClick={() => setQty(line.product.id, line.qty - 1)}
                          className="flex h-8 w-8 items-center justify-center hover:bg-muted"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold">{line.qty}</span>
                        <button
                          type="button"
                          aria-label={`Increase quantity of ${line.product.name}`}
                          onClick={() => setQty(line.product.id, line.qty + 1)}
                          className="flex h-8 w-8 items-center justify-center hover:bg-muted"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="font-display text-sm font-bold">
                        {formatINR(line.product.pricePaise * line.qty)}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(line.product.id)}
                    aria-label={`Remove ${line.product.name}`}
                    className="self-start rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-lacquer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>

            <div className="border-t border-border p-5">
              <dl className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd className="font-medium">{formatINR(subtotalPaise)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">GST (12%, included)</dt>
                  <dd className="font-medium">{formatINR(gstPaise)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Shipping</dt>
                  <dd className="font-medium">
                    {shippingPaise > 0 ? (
                      formatINR(SHIPPING_FEE_PAISE)
                    ) : (
                      <span className="text-jade">Free</span>
                    )}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-border pt-2 font-display text-base font-bold">
                  <dt>Total</dt>
                  <dd>{formatINR(totalPaise)}</dd>
                </div>
              </dl>

              <Link
                href="/checkout"
                onClick={closeCart}
                className={cn(buttonVariants({ variant: "primary" }), "mt-4 h-12 w-full")}
              >
                Checkout
              </Link>
              <p className="mt-2 text-center text-[11px] text-muted-foreground">
                Secure payment via Stripe · Cash on delivery available
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
