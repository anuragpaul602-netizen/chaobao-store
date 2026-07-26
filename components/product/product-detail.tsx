"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star, ShoppingBag, Heart, Minus, Plus, Truck, ShieldCheck, RotateCcw, Info, ChevronRight,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { ProductBadgePill } from "@/components/ui/badge";
import { ProductCard } from "@/components/product/product-card";
import { galleryFrames } from "@/lib/data/category-images";
import type { Product } from "@/types/product";
import { formatINR, discountPercent, cn } from "@/lib/utils";

export function ProductDetail({ product, related }: { product: Product; related: Product[] }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [qty, setQty] = React.useState(1);
  const [activeImg, setActiveImg] = React.useState(0);
  const [zoom, setZoom] = React.useState<{ x: number; y: number } | null>(null);
  const [tab, setTab] = React.useState<"details" | "shipping" | "reviews">("details");
  const [pincode, setPincode] = React.useState("");
  const [pinResult, setPinResult] = React.useState<string | null>(null);

  const discount = discountPercent(product.mrpPaise, product.pricePaise);
  const wished = isWishlisted(product.id);

  // The catalogues ship one photo per SKU; we render the same asset at
  // different crops so the gallery behaves correctly once real photography lands.
  // (The old `?v=2` suffixes were inert — the CDN keys off the path, so all four
  // thumbnails resolved to one identical image.)
  const gallery = galleryFrames(product.image);

  function checkPincode(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\d{6}$/.test(pincode)) {
      setPinResult("Please enter a valid 6-digit Indian PIN code.");
      return;
    }
    // Deterministic demo rule until the real courier serviceability API is wired.
    const serviceable = Number(pincode[5]) % 4 !== 0;
    setPinResult(
      serviceable
        ? `Delivers to ${pincode} in 3–5 business days. COD available.`
        : `Sorry, we don't deliver to ${pincode} yet.`
    );
  }

  return (
    <div className="container py-8 md:py-12">
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-lacquer">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/shop" className="hover:text-lacquer">Shop</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href={`/shop?category=${product.category}`} className="hover:text-lacquer">
          {product.category}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="truncate text-ink">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* gallery */}
        <div>
          <div
            className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-muted"
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              setZoom({
                x: ((e.clientX - r.left) / r.width) * 100,
                y: ((e.clientY - r.top) / r.height) * 100,
              });
            }}
            onMouseLeave={() => setZoom(null)}
          >
            <Image
              src={gallery[activeImg] ?? product.image}
              alt={product.name}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-300"
              style={
                zoom
                  ? { transform: "scale(1.9)", transformOrigin: `${zoom.x}% ${zoom.y}%` }
                  : undefined
              }
            />
            <div className="absolute left-4 top-4 flex flex-col gap-1.5">
              {product.badges.map((b) => (
                <ProductBadgePill key={b} badge={b} />
              ))}
            </div>
            <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-ink/70 px-3 py-1 text-[11px] font-medium text-paper opacity-0 transition-opacity duration-200 md:opacity-100">
              Hover to zoom
            </span>
          </div>

          <div className="mt-3 grid grid-cols-4 gap-3">
            {gallery.map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveImg(i)}
                aria-label={`View image ${i + 1}`}
                className={cn(
                  "relative aspect-square overflow-hidden rounded-xl border-2 transition-colors",
                  activeImg === i ? "border-lacquer" : "border-border hover:border-ink/30"
                )}
              >
                <Image src={src} alt="" fill sizes="120px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* buy box */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wide text-lacquer">{product.brand}</span>
          <h1 className="mt-1.5 font-display text-2xl font-extrabold leading-tight md:text-3xl">
            {product.name}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-gold text-gold" />
              <strong>{product.rating.toFixed(1)}</strong>
              <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
            </span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground">{product.unitLabel} pack</span>
          </div>

          <div className="mt-5 flex flex-wrap items-baseline gap-3">
            <span className="font-display text-3xl font-extrabold">{formatINR(product.pricePaise)}</span>
            {discount > 0 && (
              <>
                <span className="text-base text-muted-foreground line-through">
                  {formatINR(product.mrpPaise)}
                </span>
                <span className="rounded-full bg-jade px-2.5 py-1 text-xs font-bold text-jade-foreground">
                  {discount}% OFF
                </span>
              </>
            )}
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Inclusive of all taxes · GST invoice available</p>

          <div className="mt-4">
            {product.stock > 15 ? (
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-jade">
                <span className="h-2 w-2 rounded-full bg-jade" /> In stock
              </span>
            ) : product.stock > 0 ? (
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-lacquer">
                <span className="h-2 w-2 animate-pulse rounded-full bg-lacquer" />
                Hurry — only {product.stock} left
              </span>
            ) : (
              <span className="text-sm font-semibold text-muted-foreground">Out of stock</span>
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-xl border border-border">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="flex h-12 w-12 items-center justify-center hover:bg-muted"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-12 text-center font-semibold" aria-live="polite">{qty}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                className="flex h-12 w-12 items-center justify-center hover:bg-muted"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <button
              type="button"
              disabled={product.stock <= 0}
              onClick={() => addToCart(product, qty)}
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-lacquer px-6 font-semibold text-lacquer-foreground transition-transform hover:bg-lacquer/90 active:scale-[0.98] disabled:opacity-40"
            >
              <ShoppingBag className="h-4 w-4" /> Add to cart
            </button>

            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              aria-pressed={wished}
              aria-label="Toggle wishlist"
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-border hover:bg-muted"
            >
              <Heart className={cn("h-5 w-5", wished && "fill-lacquer text-lacquer")} />
            </button>
          </div>

          {/* pincode serviceability */}
          <form onSubmit={checkPincode} className="mt-6 rounded-2xl border border-border p-4">
            <label htmlFor="pin" className="text-sm font-semibold">Check delivery</label>
            <div className="mt-2 flex gap-2">
              <input
                id="pin"
                inputMode="numeric"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                placeholder="Enter 6-digit PIN code"
                className="h-11 flex-1 rounded-xl border border-border bg-paper px-3 text-sm focus:border-lacquer focus:outline-none"
              />
              <button type="submit" className="h-11 rounded-xl bg-ink px-5 text-sm font-semibold text-paper">
                Check
              </button>
            </div>
            {pinResult && <p className="mt-2 text-xs font-medium">{pinResult}</p>}
          </form>

          <ul className="mt-6 grid grid-cols-3 gap-3 text-center text-[11px]">
            {[
              { icon: Truck, label: "Free over ₹999" },
              { icon: ShieldCheck, label: "100% authentic" },
              { icon: RotateCcw, label: "7-day returns" },
            ].map((f) => (
              <li key={f.label} className="rounded-xl bg-muted p-3">
                <f.icon className="mx-auto h-4 w-4 text-lacquer" />
                <span className="mt-1.5 block font-medium">{f.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* tabs */}
      <div className="mt-14">
        <div role="tablist" className="flex gap-1 border-b border-border">
          {([
            ["details", "Product details"],
            ["shipping", "Shipping & returns"],
            ["reviews", `Reviews (${product.reviewCount})`],
          ] as const).map(([key, label]) => (
            <button
              key={key}
              role="tab"
              aria-selected={tab === key}
              onClick={() => setTab(key)}
              className={cn(
                "-mb-px border-b-2 px-4 py-3 text-sm font-semibold transition-colors",
                tab === key
                  ? "border-lacquer text-lacquer"
                  : "border-transparent text-muted-foreground hover:text-ink"
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="py-6">
          {tab === "details" && (
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="font-display text-base font-bold">Specification</h3>
                <dl className="mt-3 divide-y divide-border text-sm">
                  {[
                    ["Brand", product.brand],
                    ["Net quantity", product.unitLabel],
                    ["Category", product.category],
                    ["Country of origin", product.countryOfOrigin],
                    ["Supplier item code", product.sourceCode],
                    ["Wholesale case pack", product.casePack || "—"],
                    ["Units per case", String(product.unitsPerCase)],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4 py-2.5">
                      <dt className="text-muted-foreground">{k}</dt>
                      <dd className="text-right font-medium">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div>
                <h3 className="font-display text-base font-bold">Nutrition &amp; ingredients</h3>
                <div className="mt-3 rounded-2xl border border-dashed border-border p-5">
                  <p className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Info className="mt-0.5 h-4 w-4 shrink-0 text-lacquer" />
                    <span>
                      Nutrition panels and ingredient lists aren&rsquo;t printed in the supplier
                      catalogue this product was imported from. These are captured per-SKU from
                      the physical packaging during warehouse intake and will populate here once
                      the admin dashboard lands.
                    </span>
                  </p>
                  <p className="mt-4 text-xs text-muted-foreground">
                    Imported and marketed by ChaoBao Foods, India. FSSAI licence number to be
                    printed on the shipping label as required under the Legal Metrology
                    (Packaged Commodities) Rules.
                  </p>
                </div>
              </div>
            </div>
          )}

          {tab === "shipping" && (
            <div className="max-w-2xl space-y-4 text-sm text-muted-foreground">
              <p>
                <strong className="text-ink">Dispatch:</strong> orders placed before 2 PM IST ship
                the same working day from our warehouse.
              </p>
              <p>
                <strong className="text-ink">Delivery:</strong> 3–5 business days to metros, 5–8
                days elsewhere. Free shipping over ₹999, otherwise ₹99 flat.
              </p>
              <p>
                <strong className="text-ink">Returns:</strong> sealed, unopened packs can be
                returned within 7 days of delivery. Perishables and opened food items can&rsquo;t
                be returned for safety reasons.
              </p>
              <p>
                <strong className="text-ink">Damaged in transit?</strong> Send a photo within 48
                hours and we&rsquo;ll replace or refund in full.
              </p>
            </div>
          )}

          {tab === "reviews" && (
            <div className="max-w-2xl">
              <div className="flex items-center gap-6 rounded-2xl bg-muted p-6">
                <div className="text-center">
                  <div className="font-display text-4xl font-extrabold">{product.rating.toFixed(1)}</div>
                  <div className="mt-1 flex justify-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-3.5 w-3.5",
                          i < Math.round(product.rating) ? "fill-gold text-gold" : "text-muted-foreground/30"
                        )}
                      />
                    ))}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">{product.reviewCount} reviews</div>
                </div>
                <p className="flex-1 text-sm text-muted-foreground">
                  Individual review text is stored per order and appears here once the reviews
                  table ships with the database in Milestone 2. Only customers with a verified
                  delivered order will be able to post.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="font-display text-xl font-bold md:text-2xl">You might also like</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
