"use client";

import * as React from "react";
import Image from "next/image";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ProductBadge } from "@/types/product";

interface AdminProduct {
  id: string;
  name: string;
  brand: string;
  image: string;
  pricePaise: number;
  mrpPaise: number;
  stock: number;
  badges: ProductBadge[];
}

const BADGE_OPTIONS: { value: ProductBadge; label: string }[] = [
  { value: "new", label: "New" },
  { value: "bestseller", label: "Bestseller" },
  { value: "trending", label: "Trending" },
  { value: "sale", label: "Sale" },
  { value: "limited", label: "Limited" },
];

type RowStatus = "idle" | "saving" | "saved" | "error";

interface RowState {
  price: string; // rupees, as typed
  mrp: string;
  stock: string;
  badges: ProductBadge[];
  status: RowStatus;
  error?: string;
}

function toRowState(p: AdminProduct): RowState {
  return {
    price: String(p.pricePaise / 100),
    mrp: String(p.mrpPaise / 100),
    stock: String(p.stock),
    badges: p.badges,
    status: "idle",
  };
}

export function AdminProductTable({ products }: { products: AdminProduct[] }) {
  const [query, setQuery] = React.useState("");
  const [rows, setRows] = React.useState<Record<string, RowState>>(() =>
    Object.fromEntries(products.map((p) => [p.id, toRowState(p)]))
  );

  const filtered = React.useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return products;
    return products.filter((p) => `${p.name} ${p.brand}`.toLowerCase().includes(term));
  }, [query, products]);

  function setRow(id: string, next: RowState) {
    setRows((prev) => ({ ...prev, [id]: next }));
  }

  function setField(id: string, field: "price" | "mrp" | "stock", value: string) {
    setRows((prev) => {
      const current = prev[id];
      if (!current) return prev;
      return { ...prev, [id]: { ...current, [field]: value, status: "idle" } };
    });
  }

  function toggleBadge(id: string, badge: ProductBadge) {
    setRows((prev) => {
      const current = prev[id];
      if (!current) return prev;
      const has = current.badges.includes(badge);
      const badges = has ? current.badges.filter((b) => b !== badge) : [...current.badges, badge];
      return { ...prev, [id]: { ...current, badges, status: "idle" } };
    });
  }

  async function save(id: string) {
    const row = rows[id];
    if (!row) return;

    const priceRupees = Number(row.price);
    const mrpRupees = Number(row.mrp);
    const stock = Number(row.stock);

    if (!Number.isFinite(priceRupees) || priceRupees <= 0) {
      setRow(id, { ...row, status: "error", error: "Enter a valid price." });
      return;
    }
    if (!Number.isFinite(mrpRupees) || mrpRupees < priceRupees) {
      setRow(id, { ...row, status: "error", error: "MRP can't be less than price." });
      return;
    }
    if (!Number.isInteger(stock) || stock < 0) {
      setRow(id, { ...row, status: "error", error: "Enter a valid stock count." });
      return;
    }

    setRow(id, { ...row, status: "saving", error: undefined });

    const res = await fetch(`/api/admin/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pricePaise: Math.round(priceRupees * 100),
        mrpPaise: Math.round(mrpRupees * 100),
        stock,
        badges: row.badges,
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setRow(id, { ...row, status: "error", error: data?.error ?? "Save failed." });
      return;
    }

    setRow(id, { ...row, status: "saved" });
  }

  return (
    <div className="mt-8">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Filter by name or brand…"
        aria-label="Filter products"
        className="h-11 w-full max-w-sm rounded-xl border border-border bg-paper px-4 text-sm focus:border-lacquer focus:outline-none"
      />

      <p className="mt-2 text-xs text-muted-foreground">
        {filtered.length} of {products.length} products
      </p>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[860px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <th className="px-4 py-3 font-semibold">Product</th>
              <th className="px-4 py-3 font-semibold">Price (₹)</th>
              <th className="px-4 py-3 font-semibold">MRP (₹)</th>
              <th className="px-4 py-3 font-semibold">Stock</th>
              <th className="px-4 py-3 font-semibold">Badges</th>
              <th className="px-4 py-3 font-semibold" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => {
              const row = rows[p.id];
              if (!row) return null;
              return (
                <tr key={p.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-muted">
                        <Image src={p.image} alt="" fill sizes="40px" className="object-cover" />
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate font-medium">{p.name}</span>
                        <span className="block text-xs text-muted-foreground">{p.brand}</span>
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      min={0}
                      step="1"
                      value={row.price}
                      onChange={(e) => setField(p.id, "price", e.target.value)}
                      aria-label={`Price for ${p.name}`}
                      className="h-9 w-24 rounded-lg border border-border bg-paper px-2 text-sm focus:border-lacquer focus:outline-none"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      min={0}
                      step="1"
                      value={row.mrp}
                      onChange={(e) => setField(p.id, "mrp", e.target.value)}
                      aria-label={`MRP for ${p.name}`}
                      className="h-9 w-24 rounded-lg border border-border bg-paper px-2 text-sm focus:border-lacquer focus:outline-none"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      min={0}
                      step="1"
                      value={row.stock}
                      onChange={(e) => setField(p.id, "stock", e.target.value)}
                      aria-label={`Stock for ${p.name}`}
                      className="h-9 w-20 rounded-lg border border-border bg-paper px-2 text-sm focus:border-lacquer focus:outline-none"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-x-3 gap-y-1">
                      {BADGE_OPTIONS.map((opt) => (
                        <label key={opt.value} className="flex items-center gap-1.5 text-xs">
                          <input
                            type="checkbox"
                            checked={row.badges.includes(opt.value)}
                            onChange={() => toggleBadge(p.id, opt.value)}
                            className="h-3.5 w-3.5 rounded border-border accent-lacquer"
                          />
                          {opt.label}
                        </label>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => save(p.id)}
                        disabled={row.status === "saving"}
                      >
                        {row.status === "saving" ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : row.status === "saved" ? (
                          <Check className="h-3.5 w-3.5" />
                        ) : null}
                        Save
                      </Button>
                    </div>
                    {row.status === "error" && (
                      <p className={cn("mt-1 max-w-[10rem] text-xs text-lacquer")}>{row.error}</p>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
