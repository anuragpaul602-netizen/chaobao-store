# Contributing to ChaoBao

Thanks for wanting to help. This doc covers local setup in more detail than the
README's quick-start — read this if `npm install && npm run dev` didn't just
work, or before you touch auth/checkout/database code.

## 1. Find something to work on

Open tasks are tracked as
[GitHub issues](https://github.com/anuragpaul602-netizen/chaobao-store/issues),
labeled:

- **`good first issue`** — self-contained, don't require deep familiarity with
  the codebase.
- **`help wanted`** — bigger scope, involves design/engineering judgment.

**Comment on the issue to claim it** before starting, so two people don't
duplicate work. Got an idea that isn't already an issue? Open one — bug
reports and feature requests are welcome.

## 2. Prerequisites

- Node.js 20 or later (production runs on Node 24; anything ≥20 works locally)
- npm (the repo is committed with `package-lock.json`, so use npm, not
  yarn/pnpm, to avoid lockfile drift)
- A Postgres database — either:
  - a free [Neon](https://neon.tech) project (this is what production uses,
    via the Vercel Marketplace), or
  - any local Postgres instance

You do **not** need Stripe or Google Cloud accounts unless you're working on
an issue that touches checkout or OAuth login specifically — see §5.

## 3. Fork, clone, install

```bash
git clone https://github.com/<your-fork>/chaobao-store.git
cd chaobao-store
npm install
```

`npm install` runs `prisma generate` automatically via the `postinstall`
script — this generates the Prisma Client into `generated/prisma` (gitignored,
regenerated on every install, never commit it).

## 4. Environment variables

Copy the example file and fill in what you need:

```bash
cp .env.example .env.local
```

`.env.local` is gitignored — never commit real secrets. What each variable is
for, and whether you need it:

| Variable | Required for | Notes |
|---|---|---|
| `DATABASE_URL` | Everything — the app won't boot without it | Pooled connection string |
| `DATABASE_URL_UNPOOLED` | Running migrations / seeding | Direct (non-pooled) connection, used by `prisma migrate` and `prisma db seed` |
| `AUTH_SECRET` | Login, checkout, `/account`, `/orders` | Generate with `openssl rand -base64 32` |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google sign-in specifically | Optional otherwise — email/password login works without it. Create at [console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials), redirect URI `http://localhost:3000/api/auth/callback/google` |
| `STRIPE_PUBLISHABLE_KEY` / `STRIPE_SECRET_KEY` | Stripe checkout specifically | Use [Stripe test-mode keys](https://dashboard.stripe.com/test/apikeys). Cash on Delivery checkout works without Stripe configured at all |
| `STRIPE_WEBHOOK_SECRET` | Confirming Stripe payments locally | See §5.2 below |
| `NEXT_PUBLIC_SITE_URL` | Sitemap/robots/OAuth callback URLs | Leave as `http://localhost:3000` for local dev |
| `CLOUDINARY_*`, `RESEND_API_KEY`, `UPSTASH_REDIS_REST_*` | Nothing yet | Reserved for future milestones, not wired into any code path — leave blank |

## 5. Database: migrate + seed

With `DATABASE_URL`/`DATABASE_URL_UNPOOLED` pointed at your Neon or local
Postgres instance:

```bash
npx prisma migrate dev   # applies all migrations in prisma/migrations/
npx prisma db seed       # loads the 166-product catalogue (prisma/seed-data.ts)
```

`npx prisma studio` is useful for browsing/editing rows directly while you
work.

If you only need the product catalogue (browsing, cart, wishlist, search) and
aren't touching auth/checkout, this is all the setup you need — skip to §6.

### 5.1 Working on auth

Email/password login works with just `AUTH_SECRET` set. Google OAuth needs a
real `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET` (see table above) — don't
bother unless your issue is specifically about the Google login path.

### 5.2 Working on checkout

Cash on Delivery needs no external setup. For Stripe checkout, after setting
`STRIPE_PUBLISHABLE_KEY`/`STRIPE_SECRET_KEY`, forward webhook events to your
local server with the [Stripe CLI](https://stripe.com/docs/stripe-cli):

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

This prints a webhook signing secret — put it in `STRIPE_WEBHOOK_SECRET`.

## 6. Run it

```bash
npm run dev
```

Visit `http://localhost:3000`.

## 7. Before opening a PR

There's no CI yet ([#10](https://github.com/anuragpaul602-netizen/chaobao-store/issues/10)
tracks adding it), so these are the checks that matter — run all three:

```bash
npm run lint
npm run typecheck
npm run build
```

`npm run build` also statically generates all 166 product pages and the
sitemap, so it's a decent smoke test that the database connection and data
layer are working end-to-end, not just that the code compiles.

There's no automated test suite yet either
([#9](https://github.com/anuragpaul602-netizen/chaobao-store/issues/9)) — for
now, manually exercise the flow your change touches (add to cart, run
checkout, etc.) before submitting.

## 8. Submitting the PR

- Reference the issue it closes, e.g. `Closes #5`.
- Keep the PR scoped to that issue — unrelated drive-by changes make review
  harder.
- Describe what you tested (screenshots for UI changes are appreciated).

## Project layout

See the "Folder structure" section in [README.md](./README.md) for a map of
`app/`, `components/`, `lib/`, and `prisma/`.
