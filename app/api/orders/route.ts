import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { computeOrderTotals } from "@/lib/utils";
import { sendOrderConfirmationEmail } from "@/lib/email";

interface OrderItemInput {
  productId: string;
  qty: number;
}

interface ShippingAddressInput {
  name: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const items: OrderItemInput[] = Array.isArray(body?.items) ? body.items : [];
  const shipping: ShippingAddressInput | null = body?.shippingAddress ?? null;
  const paymentMethod = body?.paymentMethod === "STRIPE" ? "STRIPE" : "COD";

  if (!items.length) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }
  if (
    !shipping?.name ||
    !shipping?.phone ||
    !shipping?.line1 ||
    !shipping?.city ||
    !shipping?.state ||
    !shipping?.pincode
  ) {
    return NextResponse.json({ error: "A complete shipping address is required." }, { status: 400 });
  }

  // Recompute everything server-side from the live Product rows — never
  // trust client-submitted prices/totals.
  const productIds = items.map((i) => i.productId);
  const products = await prisma.product.findMany({ where: { id: { in: productIds } } });
  const productById = new Map(products.map((p) => [p.id, p]));

  const orderItemsData: {
    productId: string;
    nameSnapshot: string;
    brandSnapshot: string;
    unitLabelSnapshot: string;
    imageSnapshot: string;
    pricePaiseSnapshot: number;
    qty: number;
  }[] = [];
  let subtotalPaise = 0;

  for (const item of items) {
    const product = productById.get(item.productId);
    const qty = Math.floor(item.qty);
    if (!product || !Number.isFinite(qty) || qty <= 0) {
      return NextResponse.json({ error: "One of the items in your cart is no longer available." }, { status: 400 });
    }
    if (qty > product.stock) {
      return NextResponse.json(
        { error: `Only ${product.stock} left of ${product.name} — please adjust your cart.` },
        { status: 400 }
      );
    }
    subtotalPaise += product.pricePaise * qty;
    orderItemsData.push({
      productId: product.id,
      nameSnapshot: product.name,
      brandSnapshot: product.brand,
      unitLabelSnapshot: product.unitLabel,
      imageSnapshot: product.image,
      pricePaiseSnapshot: product.pricePaise,
      qty,
    });
  }

  const { gstPaise, shippingPaise, totalPaise } = computeOrderTotals(subtotalPaise);

  const order = await prisma.order.create({
    data: {
      userId: session.user.id,
      paymentMethod,
      // COD has no async confirmation step, so it's placed immediately;
      // Stripe orders stay PENDING until the webhook confirms payment.
      status: paymentMethod === "COD" ? "PLACED" : "PENDING",
      subtotalPaise,
      gstPaise,
      shippingPaise,
      totalPaise,
      shippingName: shipping.name,
      shippingPhone: shipping.phone,
      shippingLine1: shipping.line1,
      shippingLine2: shipping.line2 || null,
      shippingCity: shipping.city,
      shippingState: shipping.state,
      shippingPincode: shipping.pincode,
      items: { create: orderItemsData },
    },
  });

  if (paymentMethod === "COD" && session.user.email) {
    const fullAddress = `${shipping.name}, ${shipping.line1}${shipping.line2 ? `, ${shipping.line2}` : ""}, ${shipping.city}, ${shipping.state} - ${shipping.pincode}`;
    
    await sendOrderConfirmationEmail({
      to: session.user.email,
      orderId: order.id,
      totalAmount: totalPaise / 100,
      items: orderItemsData.map((item) => ({
        name: `${item.brandSnapshot} ${item.nameSnapshot}`.trim(),
        quantity: item.qty,
        price: item.pricePaiseSnapshot / 100,
      })),
      shippingAddress: fullAddress,
    });
  }

  return NextResponse.json({ orderId: order.id });
}
