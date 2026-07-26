"use client";

import * as React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X, ChevronLeft, ChevronRight, PackageSearch } from "lucide-react";
import { ProductCard } from "@/components/product/product-card";
import { QuickView } from "@/components/product/quick-view";
import { ProductCardSkeleton } from "@/components/ui/skeleton";
import { products, CATEGORY_LABELS, categories, brands, maxPricePaise } from "@/lib/data/products";
import type { Product, SortKey } from "@/types/product";
import { formatINR, cn } from "@/lib/utils";

const PER_PAGE = 24;
const DEFAULT_SORT: SortKey = "featured";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "price-asc", label: "Price: low to high" },
  { key: "price-desc", label: "Price: high to low" },
  { key: "rating", label: "Top rated" },
  { key: "newest", label: "New arrivals" },
  { key: "name", label: "A – Z" },
];

function parseList(param: string | null): string[] {
  return param ? param.split(",").filter(Boolean) : [];
}

/**
 * All filter/sort/page state lives in the URL (query string), not component
 * state — that's what makes a filtered view shareable, bookmarkable, and
 * restorable via the back button, and it's what lets header nav links and
 * footer links (?category=, ?sort=, ?sale=1) drive this page even when it's
 * already mounted. `query` and the price slider keep small local mirrors so
 * typing/dragging feels instant while the URL write is debounced.
 */
export function ShopClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlQuery = searchParams.get("q") ?? "";
  const categoryParam = searchParams.get("category");
  const brandParam = searchParams.get("brand");
  const activeCats = React.useMemo(() => parseList(categoryParam), [categoryParam]);
  const activeBrands = React.useMemo(() => parseList(brandParam), [brandParam]);
  const urlMaxPrice = Number(searchParams.get("maxPrice")) || maxPricePaise;
  const inStockOnly = searchParams.get("stock") === "1";
  const onSaleOnly = searchParams.get("sale") === "1";
  const sort = (searchParams.get("sort") as SortKey | null) ?? DEFAULT_SORT;
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  const [queryInput, setQueryInput] = React.useState(urlQuery);
  const [priceInput, setPriceInput] = React.useState(urlMaxPrice);
  const [quickView, setQuickView] = React.useState<Product | null>(null);
  const [filtersOpen, setFiltersOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  // Keep local mirrors in sync when the URL changes from outside this
  // component — a nav link, the header search, or the back button.
  React.useEffect(() => setQueryInput(urlQuery), [urlQuery]);
  React.useEffect(() => setPriceInput(urlMaxPrice), [urlMaxPrice]);

  const updateParams = React.useCallback(
    (patch: Record<string, string | null>, opts?: { resetPage?: boolean }) => {
      const next = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(patch)) {
        if (value === null || value === "") next.delete(key);
        else next.set(key, value);
      }
      if (opts?.resetPage !== false) next.delete("page");
      const qs = next.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  // Debounce the search box so typing doesn't re-filter 166 rows — or hit
  // the router — per keystroke.
  React.useEffect(() => {
    if (queryInput === urlQuery) return;
    setLoading(true);
    const t = window.setTimeout(() => {
      updateParams({ q: queryInput || null });
      setLoading(false);
    }, 220);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryInput]);

  // Filter instantly as the slider is dragged; only debounce the URL write
  // so we don't push a history-affecting update on every pixel of drag.
  React.useEffect(() => {
    if (priceInput === urlMaxPrice) return;
    const t = window.setTimeout(() => {
      updateParams({ maxPrice: priceInput < maxPricePaise ? String(priceInput) : null });
    }, 150);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priceInput]);

  const filtered = React.useMemo(() => {
    const q = urlQuery.trim().toLowerCase();
    let list = products.filter((p) => {
      if (q) {
        const hay = `${p.name} ${p.brand} ${p.category} ${p.sourceCode}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (activeCats.length && !activeCats.includes(p.category)) return false;
      if (activeBrands.length && !activeBrands.includes(p.brand)) return false;
      if (p.pricePaise > priceInput) return false;
      if (inStockOnly && p.stock <= 0) return false;
      if (onSaleOnly && p.mrpPaise <= p.pricePaise) return false;
      return true;
    });

    const order: Record<SortKey, (a: Product, b: Product) => number> = {
      featured: (a, b) => b.badges.length - a.badges.length || b.rating - a.rating,
      "price-asc": (a, b) => a.pricePaise - b.pricePaise,
      "price-desc": (a, b) => b.pricePaise - a.pricePaise,
      rating: (a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount,
      newest: (a, b) => Number(b.badges.includes("new")) - Number(a.badges.includes("new")),
      name: (a, b) => a.name.localeCompare(b.name),
    };
    list = [...list].sort(order[sort]);
    return list;
  }, [urlQuery, activeCats, activeBrands, priceInput, inStockOnly, onSaleOnly, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const activeFilterCount =
    activeCats.length + activeBrands.length + (inStockOnly ? 1 : 0) + (onSaleOnly ? 1 : 0) +
    (priceInput < maxPricePaise ? 1 : 0);

  function toggleCategory(c: string) {
    const next = activeCats.includes(c) ? activeCats.filter((x) => x !== c) : [...activeCats, c];
    updateParams({ category: next.length ? next.join(",") : null });
  }

  function toggleBrand(b: string) {
    const next = activeBrands.includes(b) ? activeBrands.filter((x) => x !== b) : [...activeBrands, b];
    updateParams({ brand: next.length ? next.join(",") : null });
  }

  function goToPage(p: number) {
    updateParams({ page: p > 1 ? String(p) : null }, { resetPage: false });
  }

  function clearAll() {
    setQueryInput("");
    setPriceInput(maxPricePaise);
    router.replace(pathname, { scroll: false });
  }

  const filterPanel = (
    <div className="space-y-7">
      <div>
        <h3 className="font-display text-sm font-bold uppercase tracking-wide">Category</h3>
        <ul className="mt-3 space-y-1.5">
          {categories.map((c) => (
            <li key={c}>
              <label className="flex cursor-pointer items-center gap-2.5 text-sm">
                <input
                  type="checkbox"
                  checked={activeCats.includes(c)}
                  onChange={() => toggleCategory(c)}
                  className="h-4 w-4 rounded border-border accent-lacquer"
                />
                <span className="flex-1">{CATEGORY_LABELS[c] ?? c}</span>
                <span className="text-xs text-muted-foreground">
                  {products.filter((p) => p.category === c).length}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-display text-sm font-bold uppercase tracking-wide">
          Max price: {formatINR(priceInput)}
        </h3>
        <input
          type="range"
          min={4900}
          max={maxPricePaise}
          step={1000}
          value={priceInput}
          onChange={(e) => setPriceInput(Number(e.target.value))}
          aria-label="Maximum price"
          className="mt-3 w-full accent-lacquer"
        />
      </div>

      <div className="space-y-2">
        <label className="flex cursor-pointer items-center gap-2.5 text-sm">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => updateParams({ stock: e.target.checked ? "1" : null })}
            className="h-4 w-4 rounded border-border accent-lacquer"
          />
          In stock only
        </label>
        <label className="flex cursor-pointer items-center gap-2.5 text-sm">
          <input
            type="checkbox"
            checked={onSaleOnly}
            onChange={(e) => updateParams({ sale: e.target.checked ? "1" : null })}
            className="h-4 w-4 rounded border-border accent-lacquer"
          />
          On sale
        </label>
      </div>

      <div>
        <h3 className="font-display text-sm font-bold uppercase tracking-wide">
          Brand <span className="font-body text-xs font-normal text-muted-foreground">({brands.length})</span>
        </h3>
        <ul className="mt-3 max-h-64 space-y-1.5 overflow-y-auto pr-1">
          {brands.map((b) => (
            <li key={b}>
              <label className="flex cursor-pointer items-center gap-2.5 text-sm">
                <input
                  type="checkbox"
                  checked={activeBrands.includes(b)}
                  onChange={() => toggleBrand(b)}
                  className="h-4 w-4 rounded border-border accent-lacquer"
                />
                <span className="truncate">{b}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {activeFilterCount > 0 && (
        <button
          type="button"
          onClick={clearAll}
          className="w-full rounded-xl border border-border py-2 text-sm font-semibold hover:bg-muted"
        >
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <div className="container py-8 md:py-12">
      <header className="mb-8">
        <h1 className="font-display text-3xl font-extrabold md:text-4xl">Shop All Snacks</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          {products.length} products imported from China, sourced from our supplier catalogues.
          Every item ships from our India warehouse.
        </p>
      </header>

      {/* search + sort bar */}
      <div className="sticky top-16 z-30 -mx-4 mb-6 flex flex-wrap items-center gap-3 bg-paper/95 px-4 py-3 backdrop-blur md:mx-0 md:px-0">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={queryInput}
            onChange={(e) => setQueryInput(e.target.value)}
            placeholder="Search 166 snacks, brands or item codes…"
            aria-label="Search products"
            className="h-11 w-full rounded-xl border border-border bg-paper pl-10 pr-4 text-sm focus:border-lacquer focus:outline-none focus:ring-2 focus:ring-lacquer/30"
          />
        </div>

        <button
          type="button"
          onClick={() => setFiltersOpen(true)}
          className="flex h-11 items-center gap-2 rounded-xl border border-border px-4 text-sm font-semibold lg:hidden"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-lacquer px-1.5 text-[11px] text-lacquer-foreground">
              {activeFilterCount}
            </span>
          )}
        </button>

        <label className="sr-only" htmlFor="sort">
          Sort by
        </label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => updateParams({ sort: e.target.value === DEFAULT_SORT ? null : e.target.value })}
          className="h-11 rounded-xl border border-border bg-paper px-3 text-sm font-medium focus:border-lacquer focus:outline-none"
        >
          {SORTS.map((s) => (
            <option key={s.key} value={s.key}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-8">
        <aside className="hidden w-60 shrink-0 lg:block">
          <div className="sticky top-36">{filterPanel}</div>
        </aside>

        <div className="min-w-0 flex-1">
          <p className="mb-4 text-sm text-muted-foreground" aria-live="polite">
            Showing <strong className="text-ink">{pageItems.length}</strong> of{" "}
            <strong className="text-ink">{filtered.length}</strong> products
          </p>

          {loading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : pageItems.length === 0 ? (
            <div className="flex flex-col items-center rounded-2xl border border-dashed border-border py-20 text-center">
              <PackageSearch className="h-10 w-10 text-muted-foreground" />
              <p className="mt-4 font-display text-lg font-semibold">No snacks match those filters</p>
              <p className="mt-1 text-sm text-muted-foreground">Try widening your price range.</p>
              <button
                type="button"
                onClick={clearAll}
                className="mt-5 rounded-xl bg-ink px-5 py-2.5 text-sm font-semibold text-paper"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
              {pageItems.map((p, i) => (
                <ProductCard key={p.id} product={p} onQuickView={setQuickView} priority={i < 4} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <nav className="mt-10 flex items-center justify-center gap-2" aria-label="Pagination">
              <button
                type="button"
                onClick={() => goToPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goToPage(i + 1)}
                  aria-current={currentPage === i + 1 ? "page" : undefined}
                  className={cn(
                    "h-10 w-10 rounded-xl border text-sm font-semibold transition-colors",
                    currentPage === i + 1
                      ? "border-ink bg-ink text-paper"
                      : "border-border hover:bg-muted"
                  )}
                >
                  {i + 1}
                </button>
              ))}
              <button
                type="button"
                onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </nav>
          )}
        </div>
      </div>

      {/* mobile filter drawer */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
          <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={() => setFiltersOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-[85%] max-w-sm overflow-y-auto bg-paper p-6 shadow-soft">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold">Filters</h2>
              <button type="button" onClick={() => setFiltersOpen(false)} aria-label="Close filters">
                <X className="h-5 w-5" />
              </button>
            </div>
            {filterPanel}
            <button
              type="button"
              onClick={() => setFiltersOpen(false)}
              className="mt-6 w-full rounded-xl bg-lacquer py-3 text-sm font-semibold text-lacquer-foreground"
            >
              Show {filtered.length} products
            </button>
          </div>
        </div>
      )}

      <QuickView product={quickView} onClose={() => setQuickView(null)} />
    </div>
  );
}
