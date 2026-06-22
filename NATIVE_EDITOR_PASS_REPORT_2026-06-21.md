# Native Editor Pass Report - 2026-06-21

Theme: `Ganja Eats — Pixel Match`
Theme ID: `197642322001`
Store: `Ganja Eats Shop` / `chefmattonline.com`
Status: unpublished draft. Live theme was not published or edited directly.

## What changed

- Used Shopify native theme editor only.
- Added one `Custom liquid` section in the header group of the unpublished draft.
- Guarded the homepage rebuild with `{% if request.page_type == 'index' %}` so the full custom homepage renders only on the homepage.
- Added global CSS in the same native section for:
  - black legal announcement bar text
  - ivory header treatment
  - black shared footer treatment
  - hiding the original footer hero logo block
- Built a reference-style homepage using store CDN assets:
  - split black/image hero
  - benefit strip
  - category cards
  - best-seller cards
  - acid-lime feature panel
  - editorial panel
  - newsletter form using Shopify customer/newsletter form
  - black footer

## Style consistency update

- Added a broader native-editor CSS layer to the same unpublished draft theme.
- Removed the yellow/orange lower-section styling from product pages.
- Hid the obsolete Shapes product feature-text section that created the large bottom color band.
- Removed visible Shapes stickers and shape dividers from tested pages.
- Normalized tested storefront sections to the shared ivory, black, and acid-lime system:
  - ivory page backgrounds
  - ivory cards with subtle borders
  - black title panels/footer
  - acid-lime reserved for actions and intentional homepage highlights
- Applied this through the existing draft `Custom liquid` section only. No live theme edit or publish was performed.

## Evidence

Final clean screenshot index:
`/Users/simbata/Library/Mobile Documents/com~apple~CloudDocs/illmaa/projects/ganja-eats-pixel-match/screenshots/native-editor-preview-final-2026-06-21/SCREENSHOT_INDEX.md`

Final consistency screenshot index:
`/Users/simbata/Library/Mobile Documents/com~apple~CloudDocs/illmaa/projects/ganja-eats-pixel-match/screenshots/native-editor-consistency-final-2026-06-21/SCREENSHOT_INDEX.md`

Final screenshots:
- Homepage: `screenshots/native-editor-preview-final-2026-06-21/01-homepage-1440.png`
- Shop collection: `screenshots/native-editor-preview-final-2026-06-21/02-shop-collection-1440.png`
- Fast-onset gummies PDP: `screenshots/native-editor-preview-final-2026-06-21/03-fast-onset-gummies-pdp-1440.png`
- LITQUID watermelon PDP: `screenshots/native-editor-preview-final-2026-06-21/04-litquid-watermelon-pdp-1440.png`
- Bundle PDP: `screenshots/native-editor-preview-final-2026-06-21/05-bundle-pdp-1440.png`
- Lab Results route: `screenshots/native-editor-preview-final-2026-06-21/06-lab-results-1440.png`
- New to THC route: `screenshots/native-editor-preview-final-2026-06-21/07-new-to-thc-1440.png`
- Cart: `screenshots/native-editor-preview-final-2026-06-21/08-cart-1440.png`

Final consistency screenshots:
- Homepage: `screenshots/native-editor-consistency-final-2026-06-21/home-1440.png`
- Shop collection: `screenshots/native-editor-consistency-final-2026-06-21/collection-1440.png`
- Fast-onset gummies PDP: `screenshots/native-editor-consistency-final-2026-06-21/gummies-pdp-1440.png`
- Bundle PDP: `screenshots/native-editor-consistency-final-2026-06-21/bundle-pdp-1440.png`
- Cart: `screenshots/native-editor-consistency-final-2026-06-21/cart-1440.png`

Editor save evidence:
- `screenshots/native-editor-2026-06-21/43-global-footer-css-saved.png`

## Known gaps

- Homepage is materially closer to the supplied reference, but not pixel-perfect.
- Collection, PDP, bundle, and cart templates now share the same color/style system, but their structure still remains primarily the original Shapes theme layout.
- `/pages/lab-results` and `/pages/new-to-thc` still return 404 in the current store. Creating page records would alter store content globally, not just the unpublished theme, so it was not done without explicit approval.
- The live/current navigation still uses the existing menu labels (`Snacks`, `Drinks`, `Candy`, `Sauce`, `Smokables`) rather than the reference labels. Changing menu data globally was not done.
- Exact production pixel match still requires theme-code work or explicit approval to create/update Shopify page/menu/data records.

## Preview

Preview route entry:
`https://chefmattonline.com/?preview_theme_id=197642322001`

After opening the preview, Shopify may rewrite the URL with `?pb=0` after hiding the preview toolbar.
