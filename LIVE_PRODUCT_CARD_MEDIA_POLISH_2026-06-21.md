# Live Product Card Media Polish - 2026-06-21

Theme:
- `Ganja Eats — Pixel Match`
- Theme ID: `197642322001`
- Role verified by Shopify CLI: live

Completed:
- Uploaded/reordered black-background featured media for 16 product handles.
- Added product-card black media styling and rounded/3D frame polish.
- Added `assets/codex-product-card-media.css` and loaded it from `sections/header.liquid`.
- Kept the native-editor custom-liquid block under Shopify's 50 KB limit.

Validated:
- `assets/codex-product-card-media.css` passed Shopify validator.
- `assets/global.bundle.js` passed syntax and Shopify validator after observer hardening.
- `sections/header.liquid` passed Shopify validator.
- `sections/header-group.json` passed Shopify validator.
- Product API check on `chefmattonline.com/products/<handle>.js` returned black-background featured images for all 16 targeted handles.
- Fresh Shopify cache-bypass route verified CSS asset loaded:
  `https://exzmbm-qk.myshopify.com/collections/all?_fd=0&pb=0`

Screenshots:
- Desktop:
  `/Users/simbata/Library/Mobile Documents/com~apple~CloudDocs/illmaa/projects/ganja-eats-pixel-match/screenshots/live-polish-2026-06-21/collection-all-desktop-1440-after-header-css-fallback.png`
- Mobile:
  `/Users/simbata/Library/Mobile Documents/com~apple~CloudDocs/illmaa/projects/ganja-eats-pixel-match/screenshots/live-polish-2026-06-21/collection-all-mobile-390-after-header-css-fallback.png`

Known cache status:
- `chefmattonline.com/collections/all` was still serving older cached HTML with old `base.bundle.css?v=63421612896377334361782068893` at the final check.
- `exzmbm-qk.myshopify.com/collections/all?_fd=0&pb=0` served fresh HTML with new `base.bundle.css?v=112445535265049917151782070334` and `codex-product-card-media.css`.
- If the custom domain still looks stale, use the myshopify cache-bypass route to verify immediately and recheck the custom domain after Shopify edge cache refreshes.
