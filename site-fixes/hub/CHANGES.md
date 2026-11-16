# Chameleon Brands hub (chameleon-brands.com) – review fixes

Source: live site scraped with Firecrawl on 16 Nov 2026 (home, the six brand sub-pages, `assets/styles.css`, `assets/site.js`, `tweaks-panel.jsx`, `assets/tweaks.jsx`). No other pages are linked from the site.

## Files in this folder (upload as-is)
- `index.html`, `grow-savvy.html`, `hummingbird.html`, `growth-knowhow.html`, `hca.html`, `thetaylor.html`, `vivelibre.html`
- `404.html` (links are root-relative, as a 404 is served from any path)
- `robots.txt`, `sitemap.xml`
- `assets/styles.css`, `assets/site.js`
- Delete from the live site: `tweaks-panel.jsx`, `assets/tweaks.jsx` (no longer referenced).
- Images and the hero video are **not** in this folder (the live site can't be reached from here to download binaries). All pages reference them by absolute `https://chameleon-brands.com/assets/...` URL, so the files on the live site stay as they are: `logo-new.png`, `logo-animation.mp4`, `*-brand.png` cards, `jane-portrait.png`, `grow-savvy-hero.jpg`, `hummingbird-card.png`, `knowhow-hero.jpg`, `gk-logo.png`, `hca-mural.jpg`, `taylor-brand.png`, `vivelibre-altea.jpg`. Before upload you can switch them back to relative `assets/...` paths if you prefer.
- Internal links point at `page.html` so they work in the preview. On Netlify (pretty URLs) these resolve to `/grow-savvy` etc.; canonicals and the sitemap use the clean URLs.

## Hub – High
| Item | Status |
|---|---|
| React dev build + in-browser Babel + tweaks panel → plain static HTML/CSS | **Done.** React, ReactDOM, Babel standalone, `tweaks-panel.jsx`, `assets/tweaks.jsx`, the two inline Babel-compiled bundles and `#tweaks-root` removed. The tweaks only controlled lead brand / column count / "How we think" visibility / a hero headline that no longer exists (no colour, density or dark-mode controls were live). Their defaults are baked in: Grow Savvy first in canonical order, 3 columns, "How we think" shown. The inline `grid-template-columns: repeat(3, 1fr)` that React set (which broke the 2-column and 1-column mobile layouts) is gone, so the stylesheet's responsive grid works again. `site.js` kept – it is plain JS and still needed (mobile menu, scroll reveal). The inline video-autoplay helper and year script kept (plain JS). |
| Home has no headings → H1 + H2s | **Done.** H1 "Chameleon Brands – a group of six specialist businesses" in the intro section; H2s "Our brands", "How we think", "Who we are", "Not sure which brand is right for you?"; H3 group headings. Section labels became H2s with the same look. Sub-pages: section labels became H2s too (H1 → H2 → H3 order). |
| og:image relative → absolute https | **Done** on every page (`https://chameleon-brands.com/assets/logo-new.png` on home – `assets/logo.png` may not exist; brand pages use their own hero image). |
| /hca meta "Two decades" → "three decades" | **Done.** Also "go-to-market (GTM)" written out on first use. |
| /thetaylor "You own it outright: no lock-in, … made in the UK" | **Done / Placeholder.** Now "UK company, European team". "You own it outright" and "no lock-in" aren't stated anywhere on thetaylor.ai (checked the repo), so they're replaced by a visible `[TO CONFIRM]` mark and an HTML TODO to confirm ownership/IP and exit terms. Hyphens on this page changed to en dashes. |

## Hub – Medium
| Item | Status |
|---|---|
| Short "Who we are" section (Jane Heath and Alan Cotton) | **Done.** Jane's card uses what the site already says (over 30 years' experience, co-founded HCA, leads Hummingbird) and her existing portrait. Alan's bio is adapted from Grow Savvy's who-we-are page; his card has no photo (none exists on the hub). |
| Company number | **Done.** Footer legal line on every page: "Chameleon Brands Ltd, registered in England and Wales · Company no. 12945712 · Registered office: Dragon House, Princes Way, Bridgend Industrial Estate, Bridgend, CF31 3AQ". Also in JSON-LD. |
| "Find the right brand" / contact prompt | **Done.** "Not sure which brand is right for you?" section with an email button and the address shown as text (`#contact`). |
| Present Vive Libre separately from the five B2B brands | **Done.** Five B2B cards under "Five specialist businesses for growing companies"; Vive Libre below a divider under "…and a life on the Costa Blanca". |

## Every-site items
| # | Item | Status |
|---|---|---|
| 1 | robots.txt + sitemap.xml | **Done** (7 URLs, lastmod 2026-11-16). **Owner:** submit the sitemap in Google Search Console. |
| 2 | Canonical, OG/Twitter, JSON-LD | **Done** on every page (`lang="en-GB"`, canonical, og:type/site_name/title/description/url/image, twitter:card). Home has Organization JSON-LD with legal name, company number, address, founders and `subOrganization` listing all six brands. |
| 3 | Branded 404 | **Done** – `404.html` in the site's style, links home and to contact; `noindex`. |
| 4 | Company details | **Done** (see above). |
| 5 | Proof | Not requested for the hub beyond the above. |
| 6 | Brand names | **Done.** "Growth Knowhow" → "Growth KnowHow" everywhere. Footer copyright now names Chameleon Brands Ltd. |
| 7 | Agreed claims | **Done.** HCA "three decades"; Jane "over 30 years' experience" on /hummingbird (was "30 years of go-to-market experience" in two places); full name "Jane Heath" on /hummingbird; Growth KnowHow's remote workshop renamed "Managing a Remote Team" to match the agreed name. |

## Other small fixes made while rebuilding
- Titles now "Page | Chameleon Brands"; home "Chameleon Brands | A group of six specialist businesses". Meta descriptions trimmed to about 150–165 characters.
- Removed a stray inline SVG that sat inside `<head>` (browsers move it into the page body).
- Scroll-reveal content is now visible without JavaScript (`.js .reveal`); `prefers-reduced-motion` still respected.
- `<main>` landmark, `aria-current` on the active nav link, visible keyboard focus.
- `mark.todo` CSS rule added.

## Notes / not done here
- /grow-savvy now says "access to our 'black book'" and /hummingbird "Female founders, MDs and CEOs of small and mid-sized B2B businesses" (coordinator edits, matching the brand sites).
- Hero video `logo-animation.mp4`: size unknown, not downloaded; referenced on the live site.
- Hosting: the hub appears to be on Netlify (forms code in `site.js`). No redirect is needed, so no `netlify.toml` was added. Netlify serves `404.html` automatically.
- Nothing was deployed, pushed or submitted.

## Owner decisions applied (16 Nov 2026)
- **Photos (decision 4):** removed Alan Cotton's photo placeholder (card shown without a photo) and the 1200×630 share-image TODO. og:image stays as the logo.
- **Alan's bio:** placeholder replaced with text adapted from Grow Savvy's who-we-are page (co-founded HCA, founded and ran several small businesses, built sales, marketing, management and account teams). Owner confirmed Jane co-founded HCA (with Alan Cotton): "co-founded HCA" on the home page card and on /hummingbird (resolved).
- **Parliamentary Review (owner correction):** the live sentence on /hummingbird is kept exactly as it was; there is no link to it anywhere on the hub.
- **HCA £7m (decision 7):** confirmed as fee; the wording already says "£1m/year in fee", TODO removed.
- No prices, phone numbers, testimonial or ICO placeholders existed on the hub (decisions 1, 2, 5, 6 need no change).

## Placeholders still open
- /thetaylor: `[TO CONFIRM: ownership and "no lock-in" terms]` (still open with the owner). `mark.todo` CSS kept for it.
