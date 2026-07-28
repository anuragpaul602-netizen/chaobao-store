"use client";

import * as React from "react";
import type { Product } from "@/types/product";

/* ------------------------------------------------------------------ */
/* Cart + wishlist store, shared through React context so the header,   */
/* cards and drawer stay in sync. Persisted to localStorage as just     */
/* {id, qty} / id[] — the full Product is rehydrated from the current   */
/* catalogue on load, so a saved cart self-heals if a product's price   */
/* or stock changed, or the product was removed, since it was saved.    */
/* ------------------------------------------------------------------ */

const CART_KEY = "chaobao:cart";
const WISHLIST_KEY = "chaobao:wishlist";

function readJSON<T>(key: string): T | null {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function writeJSON(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage unavailable (private browsing, quota) — cart just won't persist.
  }
}

export interface CartLine {
  product: Product;
  qty: number;
}

interface StoreValue {
  products: Product[];
  cart: CartLine[];
  wishlist: string[];
  cartOpen: boolean;
  cartCount: number;
  subtotalPaise: number;
  addToCart: (p: Product, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  toggleWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  openCart: () => void;
  closeCart: () => void;
}

const StoreContext = React.createContext<StoreValue | null>(null);

export function StoreProvider({
  children,
  products,
}: {
  children: React.ReactNode;
  products: Product[];
}) {
  const [cart, setCart] = React.useState<CartLine[]>([]);
  const [wishlist, setWishlist] = React.useState<string[]>([]);
  const [cartOpen, setCartOpen] = React.useState(false);
  // Starts false so the write-back effects below don't fire on the same
  // commit that loads saved data — if they did with a ref-based flag, they'd
  // run against the pre-restore [] state and clobber storage before the
  // restored state ever landed.
  const [hydrated, setHydrated] = React.useState(false);

  // Rehydrate from localStorage on mount. Runs client-only (useEffect), so
  // the server-rendered and first client render both start empty and match.
  React.useEffect(() => {
    const savedCart = readJSON<{ id: string; qty: number }[]>(CART_KEY);
    if (savedCart?.length) {
      const restored = savedCart
        .map(({ id, qty }) => {
          const product = products.find((p) => p.id === id);
          return product ? { product, qty: Math.min(qty, product.stock) } : null;
        })
        .filter((line): line is CartLine => line !== null && line.qty > 0);
      setCart(restored);
    }

    const savedWishlist = readJSON<string[]>(WISHLIST_KEY);
    if (savedWishlist?.length) {
      setWishlist(savedWishlist.filter((id) => products.some((p) => p.id === id)));
    }

    setHydrated(true);
    // Deliberately mount-only: `products` is set once from the server fetch
    // in the root layout and re-running this on every reference change would
    // re-apply localStorage over any in-session cart/wishlist edits.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (!hydrated) return;
    writeJSON(
      CART_KEY,
      cart.map((l) => ({ id: l.product.id, qty: l.qty }))
    );
  }, [cart, hydrated]);

  React.useEffect(() => {
    if (!hydrated) return;
    writeJSON(WISHLIST_KEY, wishlist);
  }, [wishlist, hydrated]);

  const addToCart = React.useCallback((p: Product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((l) => l.product.id === p.id);
      if (existing) {
        return prev.map((l) =>
          l.product.id === p.id ? { ...l, qty: Math.min(l.qty + qty, p.stock) } : l
        );
      }
      return [...prev, { product: p, qty: Math.min(qty, p.stock) }];
    });
    setCartOpen(true);
  }, []);

  const setQty = React.useCallback((id: string, qty: number) => {
    setCart((prev) =>
      qty <= 0
        ? prev.filter((l) => l.product.id !== id)
        : prev.map((l) =>
            l.product.id === id ? { ...l, qty: Math.min(qty, l.product.stock) } : l
          )
    );
  }, []);

  const removeFromCart = React.useCallback((id: string) => {
    setCart((prev) => prev.filter((l) => l.product.id !== id));
  }, []);

  const toggleWishlist = React.useCallback((id: string) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const value = React.useMemo<StoreValue>(() => {
    const cartCount = cart.reduce((n, l) => n + l.qty, 0);
    const subtotalPaise = cart.reduce((n, l) => n + l.qty * l.product.pricePaise, 0);
    return {
      products,
      cart,
      wishlist,
      cartOpen,
      cartCount,
      subtotalPaise,
      addToCart,
      setQty,
      removeFromCart,
      toggleWishlist,
      isWishlisted: (id: string) => wishlist.includes(id),
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
    };
  }, [products, cart, wishlist, cartOpen, addToCart, setQty, removeFromCart, toggleWishlist]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = React.useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}
