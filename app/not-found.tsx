import Link from "next/link";
import { PackageSearch } from "lucide-react";
import { CATEGORY_LABELS, categories } from "@/lib/data/products";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center py-20 text-center md:py-28">
      <PackageSearch className="h-12 w-12 text-muted-foreground" />
      <h1 className="mt-5 font-display text-3xl font-extrabold md:text-4xl">
        This page went out of stock
      </h1>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        We couldn&rsquo;t find what you were looking for. It may have moved, or the
        link might be off — try a search or jump into a category below.
      </p>

      <form action="/shop" className="mt-8 flex w-full max-w-md gap-2">
        <label htmlFor="nf-search" className="sr-only">
          Search products
        </label>
        <input
          id="nf-search"
          name="q"
          type="search"
          placeholder="Search snacks, brands, flavours…"
          className="h-12 flex-1 rounded-xl border border-border bg-paper px-4 text-sm focus:border-lacquer focus:outline-none focus:ring-2 focus:ring-lacquer/30"
        />
        <button type="submit" className={cn(buttonVariants({ variant: "primary" }), "h-12")}>
          Search
        </button>
      </form>

      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {categories.map((c) => (
          <Link
            key={c}
            href={`/shop?category=${c}`}
            className="rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-lacquer hover:text-lacquer"
          >
            {CATEGORY_LABELS[c] ?? c}
          </Link>
        ))}
      </div>

      <Link href="/" className="mt-8 text-sm font-semibold underline underline-offset-4 hover:text-lacquer">
        Back to home
      </Link>
    </div>
  );
}
