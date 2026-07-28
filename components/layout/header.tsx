"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Menu, X, Search, Heart, ShoppingBag, Moon, Sun } from "lucide-react";
import { useStore } from "@/lib/store";
import { cn, formatINR } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Shop All", href: "/shop" },
  { label: "Noodles", href: "/shop?category=instant-noodles" },
  { label: "Snacks", href: "/shop?category=chips" },
  { label: "Sweets", href: "/shop?category=candy" },
  { label: "Sauces", href: "/shop?category=sauces" },
  { label: "Drinks", href: "/shop?category=drinks" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [q, setQ] = React.useState("");
  const [mounted, setMounted] = React.useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const { cartCount, openCart, wishlist, products } = useStore();
  const router = useRouter();

  React.useEffect(() => setMounted(true), []);

  // Live suggestions, capped at 6 so the dropdown stays fast and readable.
  const suggestions = React.useMemo(() => {
    const term = q.trim().toLowerCase();
    if (term.length < 2) return [];
    return products
      .filter((p) => `${p.name} ${p.brand}`.toLowerCase().includes(term))
      .slice(0, 6);
  }, [q, products]);

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!q.trim()) return;
    setSearchOpen(false);
    router.push(`/shop?q=${encodeURIComponent(q.trim())}`);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-paper/90 backdrop-blur supports-[backdrop-filter]:bg-paper/75">
      <div className="bg-ink py-2 text-center text-[11px] font-medium text-paper">
        Free shipping across India on orders over ₹999 · New drops every week
      </div>

      <div className="container flex h-16 items-center justify-between gap-4">
        <button
          type="button"
          className="-ml-2 p-2 lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <Link href="/" className="flex shrink-0 items-center" aria-label="ChaoBao home">
          <Image src="/logo.svg" alt="ChaoBao" width={132} height={35} priority className="dark:brightness-0 dark:invert" />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative text-sm font-medium text-ink/80 transition-colors hover:text-lacquer"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-lacquer transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-0.5">
          <button
            type="button"
            aria-label="Search"
            onClick={() => setSearchOpen((s) => !s)}
            className="rounded-full p-2 transition-colors hover:bg-muted"
          >
            <Search className="h-5 w-5" />
          </button>

          {mounted && (
            <button
              type="button"
              aria-label="Toggle dark mode"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="rounded-full p-2 transition-colors hover:bg-muted"
            >
              {resolvedTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          )}

          <Link href="/wishlist" aria-label="Wishlist" className="relative rounded-full p-2 hover:bg-muted">
            <Heart className="h-5 w-5" />
            {mounted && wishlist.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-blush px-1 text-[10px] font-bold text-blush-foreground">
                {wishlist.length}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={openCart}
            aria-label={`Cart, ${cartCount} items`}
            className="relative rounded-full p-2 transition-colors hover:bg-muted"
          >
            <ShoppingBag className="h-5 w-5" />
            {mounted && cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 animate-fade-up items-center justify-center rounded-full bg-lacquer px-1 text-[10px] font-bold text-lacquer-foreground">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* search bar */}
      {searchOpen && (
        <div className="border-t border-border bg-paper">
          <form onSubmit={submitSearch} className="container relative py-3">
            <Search className="pointer-events-none absolute left-7 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              autoFocus
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search snacks, brands, flavours…"
              aria-label="Search products"
              className="h-11 w-full rounded-xl border border-border bg-paper pl-10 pr-4 text-sm focus:border-lacquer focus:outline-none"
            />
            {suggestions.length > 0 && (
              <ul className="absolute inset-x-4 top-full z-50 overflow-hidden rounded-xl border border-border bg-paper shadow-soft">
                {suggestions.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/products/${p.slug}`}
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted"
                    >
                      <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg bg-muted">
                        <Image src={p.image} alt="" fill sizes="36px" className="object-cover" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-medium">{p.name}</span>
                        <span className="block text-xs text-muted-foreground">{p.brand}</span>
                      </span>
                      <span className="font-semibold">{formatINR(p.pricePaise)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </form>
        </div>
      )}

      {/* mobile nav */}
      <nav
        className={cn(
          "border-t border-border bg-paper px-4 py-3 lg:hidden",
          mobileOpen ? "block" : "hidden"
        )}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            className="block rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
