# Shopify CLI Auth Block Evidence

Date: 2026-06-21

Context:
- Shopify admin browser session was active at `https://admin.shopify.com/store/exzmbm-qk/themes`.
- The unpublished duplicate theme was created and renamed through the admin UI.
- Shopify CLI auth was not active for local theme pull.

CLI command attempted:

```sh
SHOPIFY_CLI_AGENT_INFO='n:codex|v:5|p:openai' SHOPIFY_CLI_AGENT_IDS='s:shopify-theme-rebuild|r:pixel-match-resume-20260621|i:mac' shopify theme list --store exzmbm-qk.myshopify.com
```

Observed outcome:
- CLI printed a device verification code and opened a `https://accounts.shopify.com/...` Shopify CLI login page.
- The browser page displayed `Log in` and `Continue to Shopify CLI`.
- No password, recovery code, or OTP was requested from the user in chat.
- The pending CLI command was cancelled after the auth screen appeared.

Additional retry on 2026-06-21:
- Browser admin access was still active and verified at `https://admin.shopify.com/store/exzmbm-qk/themes`.
- `Ganja Eats — Pixel Match` remained visible as unpublished theme ID `197642322001`.
- A second read-only `shopify theme list --store exzmbm-qk.myshopify.com` attempt opened a new Shopify CLI login tab.
- The command was cancelled again, and no credentials, recovery codes, one-time codes, or device codes were stored in project files.
- The verified collaborator route redirected to `https://admin.shopify.com/store/exzmbm-qk`, confirming Partner/admin auth is active; CLI auth remains separate.

Current blocker:
- Local theme pull cannot continue until Shopify CLI authentication is completed in the secure browser flow.

Safe next step:
- Complete Shopify CLI login in the browser session, then rerun theme inventory and pull only theme ID `197642322001` into `theme/`.
