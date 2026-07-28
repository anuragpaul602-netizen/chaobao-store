import Link from "next/link";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { CheckCircle2, Clock, Truck } from "lucide-react";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { formatINR } from "@/lib/utils";

const STATUS_LABEL: Record<string, string> = {
  PENDING: "Awaiting payment",
  PAID: "Payment confirmed",
  PLACED: "Order placed (Cash on Delivery)",
  CANCELLED: "Cancelled",
  FAILED: "Payment failed",
};

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: { items: true },
  });

  if (!order || order.userId !== session.user.id) notFound();

  const isConfirmed = order.status === "PAID" || order.status === "PLACED";

  return (
    <div className="container max-w-2xl py-10 md:py-14">
      <div className="flex items-center gap-3">
        {isConfirmed ? (
          <CheckCircle2 className="h-7 w-7 text-jade" />
        ) : order.status === "PENDING" ? (
          <Clock className="h-7 w-7 text-muted-foreground" />
        ) : (
          <Truck className="h-7 w-7 text-muted-foreground" />
        )}
        <div>
          <h1 className="font-display text-2xl font-extrabold">Order confirmed</h1>
          <p className="text-sm text-muted-foreground">{STATUS_LABEL[order.status] ?? order.status}</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        Order <span className="font-mono">{order.id}</span> · placed{" "}
        {order.createdAt.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
      </p>

      <ul className="mt-8 divide-y divide-border rounded-2xl border border-border">
        {order.items.map((item) => (
          <li key={item.id} className="flex gap-3 p-4">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-muted">
              <Image src={item.imageSnapshot} alt={item.nameSnapshot} fill sizes="64px" className="object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                {item.brandSnapshot}
              </p>
              <p className="text-sm font-semibold">{item.nameSnapshot}</p>
              <p className="text-xs text-muted-foreground">
                {item.unitLabelSnapshot} · Qty {item.qty}
              </p>
            </div>
            <span className="shrink-0 font-display text-sm font-bold">
              {formatINR(item.pricePaiseSnapshot * item.qty)}
            </span>
          </li>
        ))}
      </ul>

      <dl className="mt-6 space-y-1.5 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Subtotal</dt>
          <dd className="font-medium">{formatINR(order.subtotalPaise)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">GST (12%, included)</dt>
          <dd className="font-medium">{formatINR(order.gstPaise)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Shipping</dt>
          <dd className="font-medium">
            {order.shippingPaise > 0 ? formatINR(order.shippingPaise) : <span className="text-jade">Free</span>}
          </dd>
        </div>
        <div className="flex justify-between border-t border-border pt-2 font-display text-base font-bold">
          <dt>Total</dt>
          <dd>{formatINR(order.totalPaise)}</dd>
        </div>
      </dl>

      <section className="mt-8">
        <h2 className="font-display text-sm font-bold uppercase tracking-wide">Shipping to</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {order.shippingName} · {order.shippingPhone}
          <br />
          {order.shippingLine1}
          {order.shippingLine2 ? `, ${order.shippingLine2}` : ""}
          <br />
          {order.shippingCity}, {order.shippingState} {order.shippingPincode}
        </p>
      </section>

      <Link href="/account/orders" className="mt-8 inline-block text-sm font-semibold text-lacquer underline underline-offset-4">
        View all orders
      </Link>
    </div>
  );
}
