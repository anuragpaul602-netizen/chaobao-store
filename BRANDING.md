# ChaoBao — Brand Guide (v1)

## Name
**ChaoBao** — pronounced "chow-bao". "Chāo" (超, "super/beyond") + "bāo" (包, "package/bun/parcel"),
also reads phonetically like "ciao" — a friendly cross-cultural greeting. Short, easy for Indian
Gen Z to say and spell, and the "bao" root ties directly to a food/parcel visual (an actual bao bun).

Tagline: **"China's snack drop, delivered to India."**
Secondary line: "Curated Chinese snacks, chips, candy & drinks — shipped nationwide."

## Logo Concept
Wordmark: lowercase `chaobao`, set in Plus Jakarta Sans ExtraBold, tight tracking.
Mark: a circular outline of a steamed bun (bāo) with two short steam-dash marks above it —
doubles as a friendly "smile" glyph. The circle mark alone is used as the favicon/app icon.
Two lockups: horizontal (mark + wordmark) for the header, and mark-only for favicon/social avatar.
`public/logo.svg` and `app/icon.svg` implement this as real vector code (no placeholder image).

## Color System
| Token | Hex | Role |
|---|---|---|
| Ink | `#171310` | Primary text, dark-mode surface |
| Paper | `#FBF5EC` | Light-mode background (warm rice-paper cream) |
| Lacquer | `#C8102E` | Primary brand / CTA / links |
| Jade | `#1F6F54` | Secondary accent (badges, success, "new") |
| Gold | `#D4A24C` | Tertiary accent (premium, ratings, gift boxes) |
| Blush | `#FF6F91` | Pop accent (sale badges, wishlist) |

Dark mode swaps Ink/Paper and desaturates Lacquer slightly for contrast (see `app/globals.css`).

## Typography
- **Headings/Display:** Plus Jakarta Sans (700/800) — geometric, modern, premium-but-friendly.
- **Body/UI:** Inter (400/500/600) — high legibility at small sizes, huge language coverage.
- **Decorative accent (sparing use):** Noto Serif SC — single Chinese characters (辣 "spicy",
  甜 "sweet", 新 "new") used as small badge glyphs next to section headers for authenticity.

## Aesthetic Direction
Minimalist, generous whitespace, warm cream base instead of stark white (Muji-like calm),
one confident accent color per section (Bokksu-like restraint), rounded-xl cards with soft
shadows, large product photography, subtle micro-animations on hover/scroll — never busy.
