"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useStore } from "@/lib/store";
import { cn, formatINR, computeOrderTotals, SHIPPING_FEE_PAISE } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const inputClass =
  "h-11 w-full rounded-xl border border-border bg-paper px-4 text-sm focus:border-lacquer focus:outline-none focus:ring-2 focus:ring-lacquer/30";

type PaymentMethod = "STRIPE" | "COD";

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { cart, subtotalPaise, clearCart } = useStore();

  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [line1, setLine1] = React.useState("");
  const [line2, setLine2] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [pincode, setPincode] = React.useState("");
  const [paymentMethod, setPaymentMethod] = React.useState<PaymentMethod>("COD");
  const [error, setError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (session?.user?.name) setName((n) => n || session.user.name || "");
  }, [session]);

  const { gstPaise, shippingPaise, totalPaise } = computeOrderTotals(subtotalPaise);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.map((l) => ({ productId: l.product.id, qty: l.qty })),
          shippingAddress: { name, phone, line1, line2, city, state, pincode },
          paymentMethod,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      const { orderId } = data;

      if (paymentMethod === "STRIPE") {
        const stripeRes = await fetch("/api/checkout/stripe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId }),
        });
        const stripeData = await stripeRes.json();
        if (!stripeRes.ok || !stripeData.url) {
          setError(stripeData.error ?? "Could not start Stripe checkout. Please try again.");
          setSubmitting(false);
          return;
        }
        clearCart();
        window.location.href = stripeData.url;
        return;
      }

      clearCart();
      router.push(`/orders/${orderId}?placed=1`);
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  if (cart.length === 0) {
    return (
      <div className="container flex min-h-[50vh] flex-col items-center justify-center py-16 text-center">
        <h1 className="font-display text-2xl font-extrabold">Your cart is empty</h1>
        <p className="mt-2 text-sm text-muted-foreground">Add a few snacks before checking out.</p>
      </div>
    );
  }

  return (
    <div className="container py-10 md:py-14">
      <h1 className="font-display text-2xl font-extrabold md:text-3xl">Checkout</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px]">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <p role="alert" className="rounded-xl bg-lacquer/10 px-4 py-2.5 text-sm text-lacquer">
              {error}
            </p>
          )}

          <section>
            <h2 className="font-display text-sm font-bold uppercase tracking-wide">
              Shipping address
            </h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <input
                required
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
              />
              <input
                required
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={inputClass}
              />
              <input
                required
                placeholder="Address line 1"
                value={line1}
                onChange={(e) => setLine1(e.target.value)}
                className={cn(inputClass, "sm:col-span-2")}
              />
              <input
                placeholder="Address line 2 (optional)"
                value={line2}
                onChange={(e) => setLine2(e.target.value)}
                className={cn(inputClass, "sm:col-span-2")}
              />
              <input
                required
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={inputClass}
              />
              <input
                required
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className={inputClass}
              />
              <input
                required
                placeholder="PIN code"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className={inputClass}
              />
            </div>
          </section>

          <section>
            <h2 className="font-display text-sm font-bold uppercase tracking-wide">
              Payment method
            </h2>
            <div className="mt-3 space-y-2">
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-border p-4 text-sm has-[:checked]:border-lacquer">
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === "STRIPE"}
                  onChange={() => setPaymentMethod("STRIPE")}
                  className="h-4 w-4 accent-lacquer"
                />
                <span className="flex-1 font-medium">Pay with card (Stripe)</span>
              </label>
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-border p-4 text-sm has-[:checked]:border-lacquer">
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === "COD"}
                  onChange={() => setPaymentMethod("COD")}
                  className="h-4 w-4 accent-lacquer"
                />
                <span className="flex-1 font-medium">Cash on Delivery</span>
              </label>
            </div>
          </section>

          <button
            type="submit"
            disabled={submitting}
            className={cn(buttonVariants({ variant: "primary" }), "h-12 w-full")}
          >
            {submitting ? "Placing order…" : `Place order · ${formatINR(totalPaise)}`}
          </button>
        </form>

        <aside className="h-fit rounded-2xl border border-border p-5">
          <h2 className="font-display text-sm font-bold uppercase tracking-wide">Order summary</h2>
          <ul className="mt-4 space-y-3">
            {cart.map((line) => (
              <li key={line.product.id} className="flex justify-between gap-3 text-sm">
                <span className="min-w-0 flex-1 truncate">
                  {line.product.name} <span className="text-muted-foreground">× {line.qty}</span>
                </span>
                <span className="shrink-0 font-medium">
                  {formatINR(line.product.pricePaise * line.qty)}
                </span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-1.5 border-t border-border pt-4 text-sm">
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
        </aside>
      </div>
    </div>
  );
}
