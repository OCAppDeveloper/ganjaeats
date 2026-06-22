# Live Production Audit Blocker - 2026-06-21

Store: `chefmattonline.com`
Target draft from handoff: `Ganja Eats — Pixel Match` / `197642322001`
Observed live theme evidence: `197110235217`

## Current Findings

- Public live storefront still reports Shopify server timing theme `197110235217`.
- Live assets are loading from `/cdn/shop/t/10/assets/`, matching the previously live Shapes theme evidence.
- The public live homepage does not include the custom Pixel Match markers checked in prior work, including `ge-native`, `Shop best sellers`, or the new reference-style hero.
- Current live collection product cards still show white product image panels and blank white image frames.
- Shopify Admin browser tab is on the official Shopify login page.
- Shopify CLI theme list is blocked by device login.
- Shopify connector is blocked by `oauth_token_invalid_grant` and requires reauthentication.

## Validated Patch Ready To Apply

Validated with Shopify Liquid validator:

`audit-patches/product-media-black-background-validated.liquid`

Patch intent:

- Set product-card media wrappers to black.
- Keep product images contained.
- Move images slightly lower.
- Add a subtle product-image drop shadow.
- Preserve product links and cart forms.

This patch fixes transparent/empty product-image frames and blackens the theme-side media area. It does not recolor white pixels baked into source JPG/PNG product photos. Those media files require Shopify media replacement after admin auth.

## Evidence

Production readiness matrix:

- `PRODUCTION_READINESS_AUDIT_2026-06-21.md`

Live route checks:

- `https://chefmattonline.com/?_qa=1782062463` reported `theme;desc="197110235217"`.
- `https://chefmattonline.com/collections/all?_qa=1782062463` reported `theme;desc="197110235217"`.
- `https://chefmattonline.com/products/litquid-6-pack-crafted-drink-bundle-premium-beverages?_qa=1782062463` reported `theme;desc="197110235217"`.

Public QA sweep:

- Full JSON: `LIVE_PUBLIC_QA_2026-06-21.json`
- Generated at: `2026-06-21T17:32:03.361Z`
- All checked public routes reported theme `197110235217`.
- Homepage markers show the old hero is live: `oldMunchHero=true`; Pixel Match markers are absent.
- `/pages/new-to-thc` returns 404.
- `/pages/lab-results` returns 404.
- Product media wrapper backgrounds on `/collections/all` are transparent: first 30 checked media elements returned `rgba(0, 0, 0, 0)`.
- A scrolled collection-page product media inventory was generated:
  - `LIVE_PRODUCT_MEDIA_INVENTORY_2026-06-21.json`
  - 24 product cards checked after scroll/lazy-load.
  - All visible product-card images loaded.
  - 3 source images have white backgrounds baked into the actual media file:
    - `Chef Matt Crafted Aged Red Pepper Hot Sauce | Gourmet Condiment`
    - `Chef Matt Crafted Classic Ketchup 25 Pack | Gourmet Condiment Bundle`
    - `Chef Matt Crafted Classic Ketchup | Gourmet Condiment`
- CSS-only black background simulation screenshot:
  - `screenshots/live-production-audit-2026-06-21/collection-black-bg-css-simulation-mobile-390.png`
- Reviewable black-background media replacement candidates were prepared locally:
  - `prepared-media/black-background-candidates-2026-06-21/aged-red-pepper-hot-sauce-black-bg-candidate.png`
  - `prepared-media/black-background-candidates-2026-06-21/classic-ketchup-25-pack-black-bg-candidate.png`
  - `prepared-media/black-background-candidates-2026-06-21/classic-ketchup-black-bg-candidate.png`
  - Manifest: `prepared-media/black-background-candidates-2026-06-21/manifest.json`
  - These candidates use edge-connected white-background removal to avoid changing internal white label areas.
- Reversible cart Ajax test passed:
  - `/cart/add.js` status `200`
  - cart item count after add `1`
  - cart total after add `1999`
  - `/cart/clear.js` returned item count `0`
- App/pixel presence checks passed on the checked live pages for:
  - Meta Pixel
  - Shopify Analytics / Web Pixels Manager
  - Microsoft Clarity
  - Judge.me
  - GoAffPro
  - accelerated checkout on product/home pages
- Console notes observed:
  - GoAffPro duplicate-load message appears on several pages and self-labels as safe to ignore.
  - Bugsnag cross-domain/eval warning appears on PDPs.
  - Shop app iframe CSP/403 noise appears on homepage.

Screenshots:

- `screenshots/live-production-audit-2026-06-21/live-home-mobile-390.png`
- `screenshots/live-production-audit-2026-06-21/live-home-desktop-1440.png`
- `screenshots/live-production-audit-2026-06-21/live-collection-before-black-bg-mobile-390.png`
- `screenshots/live-production-audit-2026-06-21/live-collection-before-black-bg-desktop-1440.png`
- `screenshots/live-production-audit-2026-06-21/audit-home-1440.png`
- `screenshots/live-production-audit-2026-06-21/audit-collection_all-1440.png`
- `screenshots/live-production-audit-2026-06-21/audit-gummies_pdp-1440.png`
- `screenshots/live-production-audit-2026-06-21/audit-bundle_pdp-1440.png`
- `screenshots/live-production-audit-2026-06-21/audit-cart-1440.png`

## Next Action

Complete Shopify authentication in the secure browser window, not in chat. After auth is restored:

1. Confirm active theme in Shopify Admin.
2. If theme `197642322001` is intended to be live, publish it from Admin or verify it is live.
3. Apply the validated product-media black background CSS to the active theme through the native editor or a safe theme workflow.
4. Upload/assign the 3 prepared black-background candidate images after visual review, or replace them with hand-polished media if the merchant wants a different crop.
5. Re-run screenshots and full route/app/pixel/cart QA before declaring production-ready.
