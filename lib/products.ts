import { cache } from "react";
import { prisma } from "@/lib/prisma";
import type { Product } from "@/types/product";

const PRODUCT_SELECT = {
  id: true,
  slug: true,
  name: true,
  brand: true,
  category: true,
  pricePaise: true,
  mrpPaise: true,
  unitLabel: true,
  unitsPerCase: true,
  grams: true,
  isLiquid: true,
  rating: true,
  reviewCount: true,
  stock: true,
  badges: true,
  image: true,
  shortDescription: true,
  countryOfOrigin: true,
  supplier: true,
  sourceCode: true,
  casePack: true,
} as const;

// Deduped by React's cache() across every Server Component that calls it
// within the same request, so a page rendering several rails still issues
// exactly one DB query.
export const getAllProducts = cache(async (): Promise<Product[]> => {
  return prisma.product.findMany({ select: PRODUCT_SELECT, orderBy: { id: "asc" } });
});

export async function getProductBySlug(slug: string) {
  const products = await getAllProducts();
  return products.find((p) => p.slug === slug);
}

export async function getRelatedProducts(p: Product, limit = 4) {
  const products = await getAllProducts();
  return products.filter((x) => x.category === p.category && x.id !== p.id).slice(0, limit);
}

export async function getCategories() {
  const products = await getAllProducts();
  return Array.from(new Set(products.map((p) => p.category))).sort();
}

export async function getBrands() {
  const products = await getAllProducts();
  return Array.from(new Set(products.map((p) => p.brand))).sort();
}

export async function getMaxPricePaise() {
  const products = await getAllProducts();
  return Math.max(...products.map((p) => p.pricePaise));
}

export async function getFeaturedProducts() {
  const products = await getAllProducts();
  return products.filter((p) => p.badges.includes("bestseller")).slice(0, 8);
}

export async function getTrendingProducts() {
  const products = await getAllProducts();
  return products.filter((p) => p.badges.includes("trending")).slice(0, 8);
}

export async function getNewArrivals() {
  const products = await getAllProducts();
  return products.filter((p) => p.badges.includes("new")).slice(0, 8);
}
