import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const orderId = typeof body?.orderId === "string" ? body.orderId : null;
  if (!orderId) {
    return NextResponse.json({ error: "Missing orderId." }, { status: 400 });
  }

  const order = await prisma.order.findUnique({ where: { id: orderId }, include: { items: true } });
  if (!order || order.userId !== session.user.id) {
    return NextResponse.json({ error: "Order not found." }, { status: 404 });
  }
  if (order.paymentMethod !== "STRIPE" || order.status !== "PENDING") {
    return NextResponse.json({ error: "This order can't be paid via Stripe." }, { status: 400 });
  }

  const origin = request.headers.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  // Built from the order's own snapshot line items, not live Product rows —
  // this is the exact price the customer already agreed to at order creation.
  const lineItems: import("stripe").default.Checkout.SessionCreateParams.LineItem[] = order.items.map(
    (item) => ({
      quantity: item.qty,
      price_data: {
        currency: "inr",
        unit_amount: item.pricePaiseSnapshot,
        product_data: { name: `${item.brandSnapshot} ${item.nameSnapshot}`.trim() },
      },
    })
  );

  if (order.shippingPaise > 0) {
    lineItems.push({
      quantity: 1,
      price_data: {
        currency: "inr",
        unit_amount: order.shippingPaise,
        product_data: { name: "Shipping" },
      },
    });
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    success_url: `${origin}/orders/${order.id}?success=1`,
    cancel_url: `${origin}/checkout`,
    metadata: { orderId: order.id },
  });

  await prisma.order.update({
    where: { id: order.id },
    data: { stripeSessionId: checkoutSession.id },
  });

  return NextResponse.json({ url: checkoutSession.url });
}
