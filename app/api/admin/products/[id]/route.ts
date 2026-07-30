import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import type { ProductBadge } from "@/types/product";

const VALID_BADGES: ProductBadge[] = ["new", "bestseller", "trending", "sale", "limited"];

function isProductBadge(value: unknown): value is ProductBadge {
  return typeof value === "string" && (VALID_BADGES as string[]).includes(value);
}

function parseBadges(value: unknown): ProductBadge[] | null {
  if (!Array.isArray(value)) return null;
  const badges: ProductBadge[] = [];
  for (const entry of value) {
    if (isProductBadge(entry) && !badges.includes(entry)) badges.push(entry);
  }
  return badges;
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  }

  const body = await request.json().catch(() => null);

  const stock = Number(body?.stock);
  const pricePaise = Math.round(Number(body?.pricePaise));
  const mrpPaise = Math.round(Number(body?.mrpPaise));
  const badges = parseBadges(body?.badges);

  if (!Number.isInteger(stock) || stock < 0) {
    return NextResponse.json({ error: "Stock must be a non-negative integer." }, { status: 400 });
  }
  if (!Number.isFinite(pricePaise) || pricePaise <= 0) {
    return NextResponse.json({ error: "Price must be a positive amount." }, { status: 400 });
  }
  if (!Number.isFinite(mrpPaise) || mrpPaise < pricePaise) {
    return NextResponse.json({ error: "MRP can't be less than the selling price." }, { status: 400 });
  }
  if (badges === null) {
    return NextResponse.json({ error: "Badges must be an array of valid badge values." }, { status: 400 });
  }

  const product = await prisma.product
    .update({
      where: { id: params.id },
      data: { stock, pricePaise, mrpPaise, badges },
    })
    .catch(() => null);

  if (!product) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  return NextResponse.json({ product });
}
