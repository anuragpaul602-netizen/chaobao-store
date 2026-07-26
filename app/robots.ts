import type { MetadataRoute } from "next";

// See app/sitemap.ts — same requirement, so the two never disagree in prod.
if (process.env.NODE_ENV === "production" && !process.env.NEXT_PUBLIC_SITE_URL) {
  throw new Error(
    "NEXT_PUBLIC_SITE_URL must be set in production — robots.txt would otherwise point at localhost."
  );
}

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/account/", "/admin/"] }],
    sitemap: `${base}/sitemap.xml`,
  };
}
