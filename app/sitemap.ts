import type { MetadataRoute } from "next";
import { getAllProducts, getCategories } from "@/lib/products";

// NEXT_PUBLIC_SITE_URL is required in production so we never ship a sitemap
// full of localhost URLs to search engines. Dev/preview builds fall back so
// `npm run dev` keeps working without extra setup.
if (process.env.NODE_ENV === "production" && !process.env.NEXT_PUBLIC_SITE_URL) {
  throw new Error(
    "NEXT_PUBLIC_SITE_URL must be set in production — sitemap.xml would otherwise point at localhost."
  );
}

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [products, categories] = await Promise.all([getAllProducts(), getCategories()]);

  return [
    { url: base, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${base}/shop`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    ...categories.map((c) => ({
      url: `${base}/shop?category=${c}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...products.map((p) => ({
      url: `${base}/products/${p.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
