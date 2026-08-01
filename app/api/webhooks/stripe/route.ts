import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { sendOrderConfirmationEmail } from "@/lib/email";

// Unauthenticated — Stripe calls this directly. The signature check below is
// its only trust boundary and must never be skipped.
export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const rawBody = await request.text();

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature or webhook secret." }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const orderId = session.metadata?.orderId;

    if (orderId) {
      //Update status & fetch order details + user in one call
      const updatedOrder = await prisma.order.update({
        where: { id: orderId },
        data: {
          status: "PAID",
          stripePaymentIntentId:
            typeof session.payment_intent === "string" ? session.payment_intent : null,
        },
        include: {
          user: true,
          items: true,
        },
      });

      //Trigger confirmation email
      const customerEmail = updatedOrder.user?.email || session.customer_details?.email;

      if (customerEmail) {
        const fullAddress = `${updatedOrder.shippingName}, ${updatedOrder.shippingLine1}${
          updatedOrder.shippingLine2 ? `, ${updatedOrder.shippingLine2}` : ""
        }, ${updatedOrder.shippingCity}, ${updatedOrder.shippingState} - ${updatedOrder.shippingPincode}`;

        await sendOrderConfirmationEmail({
          to: customerEmail,
          orderId: updatedOrder.id,
          totalAmount: updatedOrder.totalPaise / 100,
          items: updatedOrder.items.map((item) => ({
            name: `${item.brandSnapshot} ${item.nameSnapshot}`.trim(),
            quantity: item.qty,
            price: item.pricePaiseSnapshot / 100,
          })),
          shippingAddress: fullAddress,
        });
      }
    }
  }

  return NextResponse.json({ received: true });
}
