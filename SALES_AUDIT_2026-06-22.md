# Sales Audit — chefmattonline.com (Ganja Eats Shop)

Date: 2026-06-22
Window: last 90 days
Data sources: live Shopify Admin API (store `exzmbm-qk`) + storefront fetch of
`https://chefmattonline.com`. Pulled via the Shopify MCP connection.

## Headline metrics (last 90 days)

| Metric | Value |
|---|---|
| Sessions | 6,470 (74% mobile, 26% desktop) |
| Added to cart | 643 (9.9% of sessions) |
| Reached checkout | 476 (7.4% of sessions) |
| Completed checkout | ~84 (1.30% conversion rate) |
| Orders | 89 |
| Gross sales | $5,424.73 |
| Net sales | $5,418.73 |
| Average order value (AOV) | $60.95 |
| Revenue by referrer | Direct/unknown + `search` only — $0 attributed to email or social |
| Catalog | 50 active products, price range $6–$150 |

Conversion funnel (where customers drop):
`6,470 sessions → 643 cart (9.9%) → 476 checkout (7.4%) → ~84 completed (1.30%)`

## 🔴 #1 problem: checkout abandonment (~82%)

- 476 customers reached checkout; only ~84 completed. That is an **~82%
  checkout-abandonment rate** vs. an industry norm of ~45–50% completion.
- Cart→checkout (74%) and add-to-cart (9.9%) are healthy. Demand is fine —
  customers are getting stopped **at the payment step**.
- Likely causes for a THC/hemp store: payment gateway declining high-risk
  cards, too few payment methods, age/ID verification friction at checkout, or
  state shipping restrictions surfacing only at the end.
- **Highest-leverage fix in the whole audit.** Recovering half of abandoned
  checkouts would roughly double revenue with zero extra traffic.

Action: place 3–4 live test orders on mobile with different cards
(Visa/MC/Amex) and wallets (Shop Pay / Apple Pay / Google Pay); confirm the
gateway approves hemp-derived THC and that all one-tap wallets are enabled
(critical on a 74%-mobile store).

## 🟠 Storefront credibility issues (live on homepage)

1. **Fake-looking testimonials** — reviews are attributed to fictional chef
   characters ("Auguste Gusteau" from Ratatouille, "Carmy Berzatto" from The
   Bear). Replace with real customer reviews (89 orders to source from).
2. **Broken FAQ content** — garbled run-together text
   ("...this plantIs my payment information secure?") and a duplicated question
   ("What makes Chef Matt's sauces special?" appears 3×).
3. **"Lab Results" link with no COAs behind it** — third-party certificates of
   analysis are a top THC purchase driver; publish real batch COAs.
4. **No age gate** — "21+" appears only in the footer; add a 21+ verification
   modal (compliance + trust signal).

## 🟠 Merchandising & pricing leaks

- **25-packs have zero incentive.** Single hot sauce = $6; 25-pack = $150
  (exactly 25 × $6). Re-price multi-packs with a real discount (e.g. ~$119,
  ~20% off) to lift AOV.
- **Data-backed best sellers** (last 90 days):
  - By orders: BBQ Potato Chips (26), Onion Ring Chips (22), Cheese Puffs (20),
    Fuego Chips (19), Spicy Nacho Chips (19) — all ~$7 snacks.
  - By revenue: Cali Supreme Green Apple Gummies ($420), then chips.
  - Feature these on the homepage and bundle chips + gummies to push carts past
    the **$75 free-shipping threshold** (AOV is only $61 — most carts just miss
    it).
- **Verify inventory tracking.** All 50 active products report
  `totalInventory: 0` while sales continue, so inventory is almost certainly
  untracked. Confirm it; note there are currently no low-stock urgency levers
  or oversell protection.

## 🟠 Untapped channel: $0 from email & social

A Facebook pixel and an email capture ("The List") exist on-site, but revenue
attribution shows only direct + search. With 6,470 sessions and 84 buyers,
there is a large pool of non-converters to follow up with.

Action: enable the three highest-ROI flows — **abandoned checkout** (directly
attacks the #1 leak), **welcome series**, and **browse abandonment**.

## Prioritized action plan (highest ROI first)

| # | Action | Why it matters | Effort | Owner |
|---|--------|---------------|--------|-------|
| 1 | Diagnose & fix checkout (payments, gateway approval, wallets, age/shipping friction) | Recovering 82% checkout abandonment ≈ 2× revenue | Med | Store/admin + live testing |
| 2 | Abandoned-checkout email/SMS flow | Recovers buyers hitting leak #1; $0 from email today | Low | Store/admin |
| 3 | Replace fake testimonials with real reviews + publish COAs | Removes active trust-killers | Low | Theme + content |
| 4 | Fix broken/duplicated FAQ copy | Looks unprofessional every visit | Low | Theme |
| 5 | Re-price multi-packs with real bulk discounts + bundle to clear $75 | Lifts AOV above free-ship threshold | Low | Store/admin (Shopify API) |
| 6 | Add 21+ age gate | Compliance + trust | Low | Theme (`age-check` section exists) |
| 7 | Mobile QA pass + one-tap wallets above the fold | 74% of traffic is mobile | Med | Theme + admin |

## Scope notes

- Theme changes (#3, #4, #6, #7) apply to `live-theme-197642322001/` (draft
  theme `Ganja Eats — Pixel Match`, ID `197642322001`) — never the live theme
  without approval.
- Store/admin changes: #5 (re-pricing) can be done now via the Shopify
  connection; #1 and #2 can be configured/guided but #1's gateway diagnosis
  requires live test checkouts by the store owner.
