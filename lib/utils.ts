import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind class lists safely, resolving conflicting utility classes. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a price in paise/rupees as INR currency, e.g. 499900 -> "₹4,999". */
export function formatINR(amountInPaise: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amountInPaise / 100);
}

/** Compute the discount percentage between an MRP and a selling price. */
export function discountPercent(mrpPaise: number, pricePaise: number): number {
  if (mrpPaise <= 0 || pricePaise >= mrpPaise) return 0;
  return Math.round(((mrpPaise - pricePaise) / mrpPaise) * 100);
}

export const FREE_SHIPPING_THRESHOLD_PAISE = 99900; // ₹999
export const SHIPPING_FEE_PAISE = 9900; // ₹99

/**
 * Shared order-total math for the cart drawer, checkout page, and the
 * order-creation API route, so all three never drift apart.
 * Prices are tax-inclusive, so GST is extracted from the subtotal, not
 * added on top: subtotal = base * 1.12, so GST = subtotal * 12/112.
 */
export function computeOrderTotals(subtotalPaise: number) {
  const gstPaise = Math.round((subtotalPaise * 12) / 112);
  const shippingPaise = subtotalPaise >= FREE_SHIPPING_THRESHOLD_PAISE ? 0 : SHIPPING_FEE_PAISE;
  const totalPaise = subtotalPaise + shippingPaise;
  return { subtotalPaise, gstPaise, shippingPaise, totalPaise };
}
