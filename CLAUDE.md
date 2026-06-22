# CLAUDE.md

Guidance for AI assistants (Claude Code and similar) working in this repository.

## What this repository is

This is the **production working folder** for the **Ganja Eats / Chef Matt**
Shopify storefront visual rebuild ("Pixel Match") and live-theme polish. It is
**not** a conventional application codebase — it combines:

1. A pulled **Shopify Online Store 2.0 theme** (`live-theme-197642322001/`), and
2. A large set of **audit reports, QA artifacts, media, and handoff notes** that
   document the ongoing visual-match work against supplied reference screenshots.

There is **no build system, package manager, test suite, or CI** in this repo.
Work is done directly against Liquid/JSON theme files and synced to Shopify via
the Shopify CLI or the Shopify admin theme editor.

### Store context

- Storefront: `chefmattonline.com` (Shopify store slug `exzmbm-qk`)
- Working theme: `Ganja Eats — Pixel Match`, theme ID `197642322001` (a draft
  duplicate of the live theme — **never publish or edit the live theme without
  explicit approval**)
- Cache-bypass QA URL pattern: append `?_fd=0&pb=0` to storefront URLs

## Repository layout

```
live-theme-197642322001/   # The Shopify theme source (see "Theme architecture")
audit-patches/             # Validated CSS/Liquid patches staged for the theme
prepared-media/            # Edited product imagery (e.g. black-background candidates)
references/                # Supplied design reference screenshots + REFERENCE_INDEX.md
screenshots/               # Before/after QA captures, grouped by dated pass
*.md                       # Audit reports, readiness audits, handoff notes
*.json                     # Route checks, media inventory, QA results, admin env info
```

Top-level `*.md` / `*.json` files are **dated artifacts** (e.g.
`PRODUCTION_READINESS_AUDIT_2026-06-21.md`), not living config. Treat them as a
historical log. The current state and "what to do next" live in
**`NEXT_CHAT_PROMPT.md`** — read it first when resuming work.

## Theme architecture (`live-theme-197642322001/`)

Base theme: **"Shapes" by Switch Themes, v4.3.1** (see
`config/settings_schema.json` → `theme_info`). This is a standard OS 2.0 theme
structure, customized for Ganja Eats.

```
layout/      theme.liquid, password.liquid, gift_card.liquid
templates/   *.json (OS 2.0 JSON templates) — index, product*, collection, etc.
sections/    85 sections; *-group.json define header/footer/overlay section groups
snippets/    129 reusable snippets
assets/      Pre-bundled CSS/JS + a few custom files (see below)
config/      settings_schema.json, settings_data.json
locales/     en.default + da/de/es/fr/... (paired .json + .schema.json)
```

Key conventions to follow when editing the theme:

- **OS 2.0 JSON templates.** Page content is composed from sections in
  `templates/*.json`. Product templates are suffixed by type
  (`product.bundle.json`, `product.merch.json`, `product.preorder.json`, …).
- **Utility-class styling.** Markup uses Tailwind-style utility classes
  (e.g. `bg-scheme-background text-scheme-text py-section-vertical-spacing
  lg:grid-cols-12`). The compiled CSS ships pre-built in
  `assets/base.bundle.css` and other `*.bundle.css` files — **there is no
  Tailwind source/build step in this repo**, so prefer existing utility classes
  and existing component snippets over hand-written CSS.
- **Color schemes.** Sections set `data-color-scheme` and use `bg-scheme-*` /
  `text-scheme-*` classes driven by `color_scheme_group` settings. Honor the
  selected scheme rather than hardcoding colors.
- **CSS/JS "bridge" snippets.** `snippets/css-bridge.liquid` (and `js-bridge`)
  translate theme **settings** into CSS custom properties / JS globals at the
  `:root` level. To change global tokens (button radius, border thickness,
  shadows, header height, etc.), change the corresponding setting, not the
  hardcoded value.
- **Islands JS architecture.** Interactive behavior is lazy-loaded via
  `assets/island-*.bundle.js` (e.g. `island-product`, `island-quick-buy`,
  `island-photoswipe`). These are **pre-built bundles** — don't expect editable
  source. Hook into existing islands rather than adding ad-hoc scripts.
- **Modular product blocks.** The PDP is built from `snippets/product-block-*`
  partials (buy-buttons, variant-picker, price, tabs, star-rating, etc.),
  assembled by `snippets/product-template.liquid` and `sections/main-product.liquid`.
- **Product tiles.** Collection/grid cards come from `snippets/product-tile*.liquid`
  with classes like `.product-tile__featured-media` and `.product-media-object`.
- **Icons** are individual `snippets/icon-*.liquid` partials, rendered via
  `theme-icon` / `render`.

### Custom (non-stock) additions

A few assets are project-specific customizations, not part of stock Shapes:

- `assets/codex-product-card-media.css` + `.js` — per-product overrides that swap
  collection-card imagery to black-background media (keyed by product handle).
  Loaded from `layout/theme.liquid` and `sections/header.liquid`.
- `audit-patches/product-media-black-background-validated.liquid` — a validated
  CSS patch staged for the black-background product-card treatment.

When touching product-card media, keep these in sync and prefer extending the
existing handle-keyed override pattern.

## Development workflow

1. **Resume context** from `NEXT_CHAT_PROMPT.md` (current theme IDs, verified
   state, cache notes, next QA steps).
2. **Edit theme files** under `live-theme-197642322001/`, or stage patches in
   `audit-patches/`.
3. **Sync to Shopify** via the Shopify CLI (`shopify theme push/pull --store
   exzmbm-qk.myshopify.com`) targeting **theme `197642322001` only**, or via the
   admin theme editor. CLI auth must be completed in the secure browser flow —
   see `AUTH_BLOCK_EVIDENCE.md`.
4. **QA visually** against `references/supplied-2026-06-21/` using cache-bypass
   URLs (`?_fd=0&pb=0`), and capture before/after into a new dated subfolder of
   `screenshots/`.
5. **Record results** in a dated audit `*.md`/`*.json` artifact if doing a formal
   pass, and update `NEXT_CHAT_PROMPT.md` with the new state for the next session.

There is nothing to `build`, `lint`, or `test` locally. "Verification" means
visual QA against references plus route/media checks (see the `ROUTE_CHECKS_*`
and `*_MEDIA_INVENTORY_*` artifacts for the format used previously).

## Critical safety & security rules

These are hard constraints for this project — follow them exactly:

- **Never edit or publish the live/active theme** without explicit user approval.
  Work only on the draft duplicate `197642322001` (`Ganja Eats — Pixel Match`).
- **Never commit secrets**: no Shopify tokens, API keys, passwords, recovery
  codes, OTP/device codes, or browser session data in files or commit messages.
  `.env*` is gitignored (except `.env.example`).
- **Do not request or store credentials in chat.** Shopify/partner/CLI
  authentication must happen in the secure browser surface only. If a
  verification or login screen appears, pause and hand off for manual entry
  (this is the documented blocker pattern in `AUTH_BLOCK_EVIDENCE.md`).
- Use Chrome first for Shopify and external auth flows.
- This is an age-restricted (THC/cannabis-adjacent) storefront; the theme
  includes an `age-check` section — preserve age-gating behavior.

## Git conventions

- Active development branch for this work: **`claude/claude-md-docs-9j1d15`**.
  Develop, commit, and push there; never push to `main` without explicit
  permission.
- Commit messages: clear and descriptive. Do not create pull requests unless the
  user explicitly asks.
- The gitignore already excludes runtime/scratch dirs (`node_modules/`,
  `.image-venv/`, `remote-asset-check-*/`, `verify-pull-*/`,
  `tmp-*-*.liquid`, etc.) — keep verification scratch in those patterns so it
  stays untracked.

## Quick reference

- Current status / handoff: `NEXT_CHAT_PROMPT.md`
- Design targets: `references/supplied-2026-06-21/REFERENCE_INDEX.md`
- Auth/CLI blocker context: `AUTH_BLOCK_EVIDENCE.md`
- Latest production audits: `PRODUCTION_READINESS_AUDIT_2026-06-21.md`,
  `LIVE_PRODUCTION_AUDIT_BLOCKER_2026-06-21.md`
- Theme settings/tokens: `live-theme-197642322001/config/settings_schema.json`,
  `snippets/css-bridge.liquid`
