# Crypto Payments Setup Runbook — NOWPayments + Shopify

Date: 2026-06-22
Store: Ganja Eats Shop (`exzmbm-qk` / chefmattonline.com)
Card processor (unchanged): **Authorize.Net**
New alternative method: **Cryptocurrency via NOWPayments**

## Why crypto, why NOWPayments (context)

- The 2026-06-22 sales audit found the #1 revenue leak is **~82% checkout
  abandonment** — typical for a high-risk THC merchant whose card payments get
  declined. Crypto **bypasses the card networks entirely**, so it recovers a
  slice of those lost checkouts.
- **NOWPayments** is crypto-native and **allows high-risk / cannabis-adjacent
  businesses** (mainstream gateways like Coinbase Commerce and BitPay often
  restrict this category and can freeze accounts). It is non-custodial,
  supports 100+ coins, and has low fees (~0.5%).
- Crypto runs **alongside Authorize.Net** — it is an *additional* option at
  checkout, not a replacement. Nothing about your existing card flow changes.

## ⚠️ Security rules for this setup (do not skip)

- **Never paste API keys, IPN secrets, recovery phrases, or seed words into
  chat or into any file in this repo.** Enter them only in the Shopify admin and
  the NOWPayments dashboard (secure browser surfaces).
- Store the NOWPayments API key / IPN secret in a password manager, not in
  `.md`/`.json` files. `.env*` is gitignored if you must keep a local copy.
- Use Chrome for the NOWPayments and Shopify admin flows.

---

## Part A — Create & configure the NOWPayments account

1. Go to `https://nowpayments.io` → **Sign up** with the business email.
2. Complete account verification / KYC (business details). Cannabis/hemp food
   products are permitted — describe the business accurately.
3. **Set your payout method** (where settled crypto goes):
   - Either an external wallet you control (BTC/ETH/USDT address), or
   - Auto-conversion to a stablecoin (e.g. USDT) to reduce volatility exposure.
   - For accounting simplicity, many merchants auto-convert everything to USDT.
4. **Choose accepted coins**: at minimum BTC, ETH, USDT (ERC-20 + TRC-20),
   USDC. TRC-20 USDT is popular for low network fees.
5. In **Settings → API keys**: generate an **API key**.
6. In **Settings → IPN (Instant Payment Notifications)**: generate/note the
   **IPN secret key** (used to verify payment callbacks).
7. (Recommended) Enable **email notifications** for received payments.

> Keep the API key and IPN secret in your password manager. You'll paste them
> into the Shopify integration in Part B.

## Part B — Connect NOWPayments to Shopify checkout

NOWPayments connects to Shopify as an **additional / alternative payment
method**. Use whichever path the current NOWPayments dashboard offers (their
Shopify connector has shifted over time — verify exact labels live):

**Path 1 — NOWPayments native Shopify integration (preferred)**
1. NOWPayments dashboard → **Store Settings / Integrations → Shopify**.
2. Enter your store domain: `exzmbm-qk.myshopify.com`.
3. Authorize the connection and paste the **API key** when prompted.
4. NOWPayments registers itself as a payment option on your store.

**Path 2 — Shopify admin "Additional payment methods"**
1. Shopify admin → **Settings → Payments**
   (`/admin/settings/payments`).
2. Under **Supported payment methods / Additional payment methods**, choose
   **Add payment methods** and search for **NOWPayments** (or the
   "Cryptocurrency" connector NOWPayments instructs you to use).
3. Follow the provider prompts; paste the **API key** / **IPN secret**.
4. Activate.

> Note: With Authorize.Net as your main gateway (Shopify Payments is not used
> here), crypto appears as a separate selectable method on the checkout
> payment step. Confirm it renders for both mobile and desktop — 74% of your
> traffic is mobile.

## Part C — Storefront changes already staged in this repo

These were committed to the draft theme `Ganja Eats — Pixel Match`
(ID `197642322001`) on 2026-06-22 and ship the moment the theme is pushed:

1. **Homepage FAQ fixes** (`templates/index.json`):
   - Fixed the garbled question → now **"Is my payment information secure?"**
     and its answer mentions crypto as an option.
   - De-duplicated the repeated "What makes Chef Matt's sauces special?" → the
     second is now **"How are Chef Matt's products made?"**
   - **"What payment methods do you accept?"** now lists cryptocurrency.
2. **Footer "Crypto accepted" badge** (`sections/footer.liquid` +
   `snippets/icon-crypto.liquid`):
   - New theme-editor toggles on the **Footer** section:
     - **"Show 'crypto accepted' badge"** (default **off**)
     - **"Crypto badge text"** (default: *Crypto accepted — BTC, ETH, USDT &
       more*)
   - **Leave the badge OFF until NOWPayments is live at checkout** (Part B),
     so you don't advertise a method customers can't yet use. Turn it on in
     the theme editor once you've placed a successful test order.

To deploy these: push theme `197642322001` (Shopify CLI or admin editor), then
in the theme editor open **Footer** and enable the badge.

## Part D — Test before announcing

1. Place a **real low-value test order** (e.g. a $6 sauce) and select the
   crypto option at checkout.
2. Pay from a personal wallet; confirm:
   - The order is marked **paid** in Shopify after network confirmation.
   - NOWPayments dashboard shows the payment and the payout/auto-conversion.
   - The customer receives the Shopify order confirmation.
3. Test on **mobile** specifically (majority of traffic).
4. Refund/zero out the test as needed.

## Part E — Go-live checklist

- [ ] NOWPayments KYC approved, payout method set
- [ ] API key + IPN secret stored in password manager (not in repo/chat)
- [ ] Crypto method active in Shopify checkout (Part B)
- [ ] Successful mobile + desktop test order, marked paid in Shopify
- [ ] Theme `197642322001` pushed (FAQ + badge changes)
- [ ] Footer **"Show crypto accepted badge"** toggled ON in theme editor
- [ ] Optional: announce via "The List" email — crypto = a marketing hook

## Compliance & operational notes

- Crypto payments are generally **irreversible** (no chargebacks — a plus for
  high-risk), but you own refund handling manually; document a refund policy.
- Confirm crypto acceptance is permitted for your product categories in the
  states you ship to; keep age-gating (21+) intact regardless of payment method.
- Crypto income is taxable; auto-converting to USDT simplifies bookkeeping.
- This runbook does not store any keys; all secrets stay in the secure browser
  surfaces per project safety rules.
