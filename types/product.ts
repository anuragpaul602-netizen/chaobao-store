export type ProductBadge = "new" | "bestseller" | "trending" | "sale" | "limited";

export type ProductCategory =
  | "chips"
  | "instant-noodles"
  | "candy"
  | "chocolate"
  | "mochi"
  | "jelly"
  | "bubble-tea"
  | "drinks"
  | "cookies"
  | "gift-boxes"
  | "sauces"
  | "pantry";

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: ProductCategory | string;

  /** Selling price in paise (₹1 = 100 paise). PLACEHOLDER — see products.ts header. */
  pricePaise: number;
  /** List price in paise. Equal to pricePaise when the item isn't discounted. */
  mrpPaise: number;

  /** Retail unit sold to the customer, e.g. "397g", "500ml". */
  unitLabel: string;
  /** How many retail units the supplier ships per wholesale case. */
  unitsPerCase: number;
  /** Net weight/volume in g or ml, used for shipping estimates. */
  grams: number | null;
  isLiquid: boolean;

  rating: number;
  reviewCount: number;
  stock: number;
  badges: ProductBadge[];
  image: string;
  shortDescription: string;
  countryOfOrigin: string;

  /** Which supplier catalogue this row came from. */
  supplier: string;
  /** The supplier's own item / material code — traceable back to the PDF. */
  sourceCode: string;
  /** Raw case-pack string as printed in the catalogue, e.g. "1 x 12 x 397g". */
  casePack: string;
}

export type SortKey = "featured" | "price-asc" | "price-desc" | "rating" | "newest" | "name";
