# ChaoBao — Imported Chinese Snacks (India)

Next.js 14 + TypeScript + Tailwind storefront. See `BRANDING.md` for the brand guide.

## Milestone 2 — real catalogue + interactive storefront

### The catalogue is real
233 products were extracted programmatically from the two supplier catalogues you
supplied and filtered down to Chinese-origin items only. A further import screen
(see "India import screen" below) removed 67, leaving **166 live products**:

| Source | Products | How Chinese items were identified |
|---|---|---|
| LTP Import Export B.V. — Catalogue 2021-2022 | 139 | The supplier prints a country code on every line; kept rows tagged `CN` |
| Chadha Oriental Foods — Brochure 2024 | 94 | Scanned PDF → OCR'd all 87 pages with positional clustering, then filtered to Chinese brands (Lee Kum Kee, Chineat, Tiantan, Three 8's, Long Life, Goldfish) and Chinese-cuisine keywords (Shaoxing, Sichuan, Chongqing, hoisin, char siu, kung pao…), excluding Thai/Korean/Japanese/Indian SKUs from the same brands |

Every row keeps the supplier's own item code in `sourceCode`, so any product on the
site can be traced back to the exact line in the PDF.

### India import screen (233 → 166)
Products were screened against India's import rules for goods of Chinese origin.
**67 were removed.** This is a screen on product names, not a customs clearance —
see the caveat at the end.

| # | Rule | Removed | Basis |
|---|---|---|---|
| 20 | **Dairy & chocolate** | Milk candy, milk teas, Pocky, cheese/milk biscuits, milk & butter sunflower seeds | DGFT has prohibited import from China of "milk and milk products (including chocolates, chocolate products, candies, confectionery, food preparations with milk or milk solids as an ingredient)" since Sept 2008, extended repeatedly "until further orders" |
| 42 | **Meat / seafood / egg** | Oyster sauces, snail & beef noodles, prawn and crab crackers, egg noodles | Animal-origin ingredients need a Sanitary Import Permit from DAHD under the Livestock Importation Act, even in processed food. Removed on the basis that no SIP is held |
| 5 | **Alcohol** | Shaoxing rice / cooking wine | Alcoholic preparation — needs excise/liquor licensing, not an FSSAI food import licence alone |

False positives were checked by hand rather than left to the regex: *King Oyster
Mushroom* is a fungus not shellfish, *Mushroom Vegetarian Meat* is mock meat, and
*Peking Duck Sauce* / *Kung Pao Chicken* are sauces named after dishes — all were
kept. The screening scripts live outside the repo; the rules are reproduced above.

> **⚠️ This is a screen, not a clearance.** The catalogue has no ingredient lists
> (see `types/product.ts`), so a name-based filter cannot prove the *absence* of
> milk solids. Chinese biscuits and confectionery very commonly contain milk
> powder, which the DGFT prohibition covers. Before importing, verify each SKU
> against the supplier's actual ingredient specification.

### ⚠️ What is real vs. placeholder
**Neither catalogue contains prices** — they are B2B trade brochures listing only
product name, brand, item code and case size. I verified this (zero currency symbols
in either file) before generating anything.

- **Real data:** name, brand, pack size, units per case, net weight, country of
  origin, supplier item code, wholesale case pack.
- **Placeholder — replace before launch:** `pricePaise`, `mrpPaise`, `rating`,
  `reviewCount`, `stock`, `image`.

INR prices are modelled from category + pack weight (₹89–₹899, avg ₹290) so the store
looks and behaves correctly. They are estimates, not quotes. The header comment in
`prisma/seed-data.ts` says the same thing, and the home page carries a
`DataProvenance` section documenting it — **delete that section before going public.**

Catalogues also list wholesale cases (e.g. `1 x 12 x 397g`); as agreed the store sells
**single units** (one 397g jar), with the original case pack retained as metadata.

### What was built
- **Shop page** — live search (debounced), category/brand/price/stock/sale filters,
  6 sort modes, pagination, mobile filter drawer, loading skeletons, empty state
- **Product page** — hover-zoom gallery, thumbnails, quantity, PIN code
  serviceability check, tabbed details/shipping/reviews, related products,
  Product + Breadcrumb JSON-LD
- **Cart drawer** — quantity controls, free-shipping progress bar, GST line, totals
- **Wishlist page** backed by shared React context (no browser storage)
- **Quick view modal** from any product card
- **Animations** — scroll reveals via IntersectionObserver, card lift/zoom on hover,
  animated underlines, infinite CJK marquee, all disabled under
  `prefers-reduced-motion`
- **SEO** — per-product metadata, Open Graph, Twitter cards, canonicals,
  `sitemap.xml` (all 166 products), `robots.txt`
- **A11y** — skip link, ARIA labels/roles on all controls, keyboard-dismissable
  modals, `aria-live` on filter results

### Folder structure
```
app/
  layout.tsx              root layout: fonts, theme + store providers, cart drawer
  page.tsx                home page
  globals.css             Tailwind + brand CSS variables (light/dark)
  icon.svg                favicon
  shop/page.tsx           shop route (reads ?category= and ?q=)
  products/[slug]/page.tsx  product detail + JSON-LD + generateStaticParams
  wishlist/page.tsx
  sitemap.ts, robots.ts
components/
  layout/       header.tsx (live search, cart badge), footer.tsx
  home/         hero, categories, product-rail, featured/trending/new-arrivals,
                why-buy, testimonials, newsletter, instagram-section,
                data-provenance  ← internal note, delete before launch
  product/      product-card.tsx, quick-view.tsx, product-detail.tsx
  shop/         shop-client.tsx   (all filtering/sorting/pagination)
  cart/         cart-drawer.tsx
  ui/           button, badge, reveal, skeleton
  theme-provider.tsx
lib/
  store.tsx        cart + wishlist React context (takes server-fetched products as a prop)
  products.ts      async, Prisma-backed data-access layer (getAllProducts, getProductBySlug, …)
  prisma.ts        PrismaClient singleton (pg driver adapter)
  utils.ts         cn(), formatINR(), discountPercent()
  data/category-labels.ts   CATEGORY_LABELS display-name map
prisma/
  schema.prisma    Product model + ProductBadge enum
  seed.ts, seed-data.ts   seed script + the 166-product seed input
  migrations/
generated/prisma/  generated Prisma Client (gitignored)
types/product.ts
```

## Run it
```bash
npm install
npm run dev        # http://localhost:3000
```
Also: `npm run build`, `npm run typecheck`, `npm run lint`.

## Verified
`npx tsc --noEmit` → 0 errors. `npx eslint` → 0 errors. Catalogue data validated:
no duplicate ids/slugs, no MRP below selling price, all categories within the type
union. (`next build` couldn't run in my Linux sandbox because the installed SWC
binary is macOS-only — run it locally to confirm.)

## Milestone 3 (part 1) — Postgres + Prisma data layer
The 166-product catalogue now lives in Postgres (Neon, provisioned via the Vercel
Marketplace) instead of a hardcoded array. `prisma/schema.prisma` defines the
`Product` model; `prisma/seed-data.ts` + `prisma/seed.ts` load the same 166 rows
(placeholder pricing/stock/images preserved byte-for-byte — still not real data).
`lib/products.ts` is the async, Prisma-backed data-access layer every Server
Component now calls instead of importing a static array; client components
(`header.tsx`, `shop-client.tsx`, the wishlist page) read the catalogue via
`useStore()`, which is fed the DB-fetched product list from `app/layout.tsx`.

Note: Prisma 7's `prisma-client` generator requires a driver adapter — this app
uses `@prisma/adapter-pg` (plain TCP over `pg`) rather than Neon's WebSocket
driver, since all queries run in standard Next.js Server Components on Node.js,
not Edge.

## Milestone 4 — accounts + checkout (Stripe + COD)
- **Auth**: Auth.js v5 (`next-auth@beta`), Credentials (email/password, bcryptjs-hashed)
  + Google OAuth, persisted via `@auth/prisma-adapter`. Split into an edge-safe
  `auth.config.ts` (used by `middleware.ts`, which runs on Next 14's default Edge
  runtime) and a full `auth.ts` (Prisma adapter + Credentials provider, Node-only).
  `/checkout`, `/account/*`, `/orders/*` are gated by `middleware.ts`.
- **Checkout**: custom-built (not Shopify — the existing Prisma catalogue, cart and
  UI stay as-is). `/checkout` → `POST /api/orders` (recomputes totals server-side
  from live `Product` rows, snapshots name/brand/price/image onto each `OrderItem`
  so a placed order never changes if the catalogue does) → Stripe hosted Checkout
  (`POST /api/checkout/stripe`, confirmed via `POST /api/webhooks/stripe`) or
  Cash on Delivery (confirmed immediately, no gateway).
- Stripe provisioned via the Vercel Marketplace (test-mode sandbox — claim it
  with `vercel integration resource claim` before going live). Razorpay is not
  used: not available as a native Vercel Marketplace payments integration.
- **Manual setup still needed before this is fully live**: a real Google OAuth
  app (`GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET` in `.env.local`/Vercel) and a
  Stripe webhook endpoint for production (`STRIPE_WEBHOOK_SECRET` — use
  `stripe listen` locally in the meantime).

## Next up (Milestone 5)
Real pricing/stock/image data still needs to replace the placeholders before
launch. Beyond that: saved/multiple shipping addresses, order cancellation,
transactional order-confirmation email.

## Contributing
Contributions are welcome. Open tasks are tracked as
[GitHub issues](https://github.com/anuragpaul602-netizen/chaobao-store/issues),
labeled `good first issue` (self-contained) or `help wanted` (bigger scope).
Comment on an issue to claim it before starting.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for full local setup — environment
variables, database migrate/seed, and what's needed for auth/checkout work
specifically — plus what to run before opening a PR.
