# Production Readiness Audit - 2026-06-21

Store: `chefmattonline.com`

Target theme from project handoff: `Ganja Eats — Pixel Match` / `197642322001`

Observed live theme from public server timing: `197110235217`

Status: blocked by Shopify authentication. Do not mark production-ready yet.

## Executive Decision

The current public storefront cannot be approved as production-ready for the requested Pixel Match launch. Public evidence shows the old live theme remains active, the Pixel Match homepage is not live, two intended routes are 404, and the requested black product-image treatment is not applied to the active storefront.

## Verified Working

- Public product, collection, cart, contact, FAQ, refund policy, and privacy policy routes respond.
- Cart Ajax test passed:
  - `/cart/add.js` returned `200`.
  - Cart showed 1 item after adding variant `58971820851281`.
  - `/cart/clear.js` cleared cart back to 0 items.
- Public script/app detection found:
  - Meta Pixel
  - Shopify Analytics / Web Pixels Manager
  - Microsoft Clarity
  - Judge.me
  - GoAffPro
  - Accelerated checkout on product/home contexts
- Product card images load after scroll/lazy-load on `/collections/all`.

## Production Blockers

1. Shopify auth is blocked.
   - Admin browser is at the official Shopify login page.
   - Shopify CLI is device-login gated.
   - Shopify connector returns `oauth_token_invalid_grant`.
   - No theme/page/product-media writes can be safely made until secure auth is completed.

2. Active live theme mismatch.
   - Public server timing reports `theme;desc="197110235217"`.
   - Handoff target Pixel Match draft is `197642322001`.
   - Public homepage still shows the old `MUNCH BETTER` design.
   - Pixel Match markers such as `ge-native`, `REAL FOOD.`, and `Shop best sellers` are absent from the live page.

3. Required route gaps.
   - `/pages/new-to-thc` returns 404.
   - `/pages/lab-results` returns 404.
   - These routes were in the design/QA scope and cannot be considered production-ready while missing.

4. Product image treatment is incomplete.
   - Product media wrappers on `/collections/all` are transparent.
   - Validated CSS patch is ready but not applied to the live theme.
   - Three product media files have white backgrounds baked into source images and need media replacement after auth.

5. Final publish/audit cannot be proven.
   - Because the live theme does not match the target theme ID, publication of the intended new design is unverified/contradicted.
   - Final visual regression and app verification must be rerun after the correct theme/fixes are live.

## Product Media Remediation Map

Theme-side CSS patch for transparent frames:

- Source: `audit-patches/product-media-black-background-validated.liquid`
- Validation: passed Shopify Liquid validator.
- Effect: black product card media frame, contained images, slight downward alignment, subtle drop shadow.

Source-media replacements needed:

| Product | Handle | Current media | Prepared replacement |
|---|---|---|---|
| Chef Matt Crafted Aged Red Pepper Hot Sauce | `chef-matt-crafted-aged-red-pepper-hot-sauce-gourmet-condiment` | `Untitled_design_4.png?v=1756508452` | `prepared-media/black-background-candidates-2026-06-21/aged-red-pepper-hot-sauce-black-bg-candidate.png` |
| Chef Matt Crafted Classic Ketchup 25 Pack | `chef-matt-crafted-classic-ketchup-25-pack-gourmet-condiment-bundle` | `Classic_Ketchup_Chef_Matt_Display_Mockup_1.jpg?v=1757119913` | `prepared-media/black-background-candidates-2026-06-21/classic-ketchup-25-pack-black-bg-candidate.png` |
| Chef Matt Crafted Classic Ketchup | `chef-matt-crafted-classic-ketchup-gourmet-condiment` | `Untitled_design_2.png?v=1757119913` | `prepared-media/black-background-candidates-2026-06-21/classic-ketchup-black-bg-candidate.png` |

## Evidence Files

- Public QA JSON: `LIVE_PUBLIC_QA_2026-06-21.json`
- Product media inventory: `LIVE_PRODUCT_MEDIA_INVENTORY_2026-06-21.json`
- Auth/blocker packet: `LIVE_PRODUCTION_AUDIT_BLOCKER_2026-06-21.md`
- CSS simulation screenshot: `screenshots/live-production-audit-2026-06-21/collection-black-bg-css-simulation-mobile-390.png`
- Live homepage screenshot: `screenshots/live-production-audit-2026-06-21/live-home-desktop-1440.png`
- Live collection screenshot: `screenshots/live-production-audit-2026-06-21/live-collection-before-black-bg-desktop-1440.png`

## Required Next Steps After Secure Auth

1. Confirm active theme in Shopify Admin.
2. Publish/verify `Ganja Eats — Pixel Match` / `197642322001` only if it is still the intended launch theme.
3. Apply the validated black product-media CSS patch to the active/intended theme.
4. Upload and assign the three prepared black-background product image replacements, or route them through manual design polish first.
5. Create or repair `/pages/new-to-thc` and `/pages/lab-results`.
6. Re-run public QA:
   - active theme ID
   - homepage markers
   - route status
   - collection/PDP/cart screenshots
   - app/pixel script presence
   - console errors
   - cart add/update/clear
   - no checkout transaction
7. Only then decide whether the site is production-ready.
