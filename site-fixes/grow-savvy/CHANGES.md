# Grow Savvy (grow-savvy.com) – review fixes

Source: live site scraped with Firecrawl on 2026-11-16 (home, what-we-do, what-weve-done, why-choose-us, who-we-are, privacy-policy, 404.html, css/site-2026.css, js/site.js, js/typed.min.js). The site links to no other pages. No robots.txt or thanks page existed (both 404). Nothing live was changed.

Clean-up before editing: removed the rendered-DOM artefacts Firecrawl captured (typed.js's injected `<style>` and cursor span, the `is-in` classes site.js adds at runtime). No Netlify/Vercel/Cloudflare-injected scripts were present. Absolute self-links are now relative (`what-we-do.html` etc.); Netlify's pretty URLs serve the same pages at `/what-we-do`. Canonicals and sitemap use the clean URLs.

Files in this folder: index.html, what-we-do.html, what-weve-done.html, why-choose-us.html, who-we-are.html, privacy-policy.html, thanks.html (new), 404.html, css/site-2026.css, js/site.js, js/typed.min.js, robots.txt (new), sitemap.xml (new).

**Not in this folder (unchanged on the live site, referenced by absolute `https://grow-savvy.com/...` URL):** all images (`/images/*`, logo, favicons, founders.jpg, case-study and hero photos), the hero video (`/video/hero.mp4`, `/video/hero.webm`) and the fonts (`/fonts/jost-400.woff2`, `/fonts/jost-700.woff2`). They could not be downloaded from this container. When uploading, keep those folders as they are on the live site. Note: the claude.ai preview may block these external files, so the preview can show missing photos and a fallback font; that is a preview limitation, not a fault in the files.

## Every site
| # | Item | Status |
|---|------|--------|
| 1 | robots.txt and sitemap.xml | **Done.** sitemap lists the five content pages, lastmod 2026-11-16. privacy-policy (kept `noindex` as on the live site), thanks and 404 are left out. **Owner:** submit the sitemap in Google Search Console. |
| 2 | Canonical, OG/Twitter, JSON-LD | **Done.** Every page: `lang="en-GB"`, canonical, og:type/site_name/title/description/url/image (full https URLs), twitter:card. Home: Organization + ProfessionalService JSON-LD (address, Chameleon Brands Ltd parent, founders Jane Heath and Alan Cotton). what-we-do: FAQPage JSON-LD (factual answers only; the price question is left out). who-we-are: Person JSON-LD for both founders (TODO to add LinkedIn `sameAs`). Meta descriptions are 151–159 characters. |
| 3 | Branded 404 | **Done (kept and checked).** Existing 404.html kept in its own style; added a "Get in touch" link, the footer with company details, `noindex`, `lang`. It uses root-relative links/assets (`/css/...`, `/`) because Netlify serves it at any URL depth – so inside the claude.ai preview the 404 page shows unstyled; it is correct on Netlify. |
| 4 | Company details | **Done.** Footer on every page: "Grow Savvy is a trading name of Chameleon Brands Ltd, registered in England and Wales · Company no. 12945712 · Registered office: Dragon House, …". Privacy policy "Who we are" now also gives the company number and registered office. |
| 5 | Proof | **Placeholder.** Home: two named-testimonial slots; what-weve-done: one named case-study slot. Needs real quotes/case studies with permission from the owner. |
| 6 | Group link / brand names | **Done.** "Part of Chameleon Brands" in every footer. Brand spellings checked. |
| 7 | Agreed claims | **Done.** "30+ years in B2B growth"; Jane "over 30 years' experience"; HCA described as one of the UK's first go-to-market consultancies; "go-to-market (GTM)" written out at first GTM on each page; no "two decades". |

## Grow Savvy – High
| Item | Status |
|------|--------|
| Contact form had no Netlify attributes | **Done.** `name="contact" method="POST" action="thanks.html" data-netlify="true" data-netlify-honeypot="bot-field"`, hidden `form-name`, honeypot field kept (now `aria-hidden`, `tabindex="-1"`). New thanks.html. site.js still posts with AJAX, now goes to thanks.html on success (the existing email fallback on failure is unchanged). The duplicate hidden `<form name="contact">` at the end of each page was removed (it clashed with the real form's name; its extra `source` field was never filled in). **Owner:** after deploy, send a test enquiry and confirm it arrives in Netlify > Forms and by email notification. |
| GA placeholder G-XXXXXXXXXX | **Done.** Snippet removed from every page; HTML comment explains how to re-add it (consent banner first, real ID, update privacy policy cookies section). |
| H1 typed by JS | **Done.** The H1 now holds "Unlock real growth." in the HTML. typed.js still animates it as an enhancement (starts by deleting the real text), and does not run under `prefers-reduced-motion: reduce`. |
| Company details in footer | **Done** (see 4). |
| No proof on home | **Done / Placeholder.** New home sections: case-study figures from what-we've-done (£250K a year from £25K; 2× in two years with three new markets; £1m target, doubled in a year) linking to the case studies; two named-quote placeholders; founders' photo (images/founders.jpg from who-we-are) with a short "Jane & Alan, personally" block. |

## Grow Savvy – Medium
| Item | Status |
|------|--------|
| Titles | **Done.** "Page \| Grow Savvy"; home "Grow Savvy \| Business growth consultant UK". |
| Phone | **Placeholder** in the contact block on every page – needs the Grow Savvy number (HCA's number not reused). |
| "Book a 30-minute call" | **Placeholder.** Button added in the contact block on every page; no calendar link exists on the site, so it points to #contact with a TODO. Needs the booking URL. |
| Engagement models / FAQ | **Done / Placeholder.** what-we-do: three engagement models built from services the site already describes (discovery session, growth and GTM mentoring programme, ongoing mentoring) with "From [TO CONFIRM]" prices; six-question FAQ (answers taken from existing site copy, price answer is a placeholder). Owner to confirm the models, formats and prices. |
| Founder bios with LinkedIn | **Placeholder.** who-we-are: bio cards for Jane Heath and Alan Cotton (only agreed facts: Jane over 30 years' experience; both co-founded HCA) plus placeholders for fuller bios and LinkedIn URLs (none on the site). |
| Positioning (Grow Savvy = growth support incl. AI; The Taylor = bespoke AI builds) | **Done.** Home AI pillar and a what-we-do FAQ answer now say AI adoption is part of the growth support and point bespoke AI builds to The Taylor (thetaylor.ai). Typed line "Integrate AI, properly." → "Put AI to work, properly." Meta descriptions adjusted. |

## Grow Savvy – Low
| Item | Status |
|------|--------|
| Stat "1 / founders of HCA" | **Done.** Why-us strip is now: 5 non-competing clients · 30+ years in B2B growth (including founding HCA, one of the UK's first GTM consultancies) · 3 disciplines under one roof. (The old "3 decades" stat repeated the 30+ claim, so it became the three-disciplines stat, taken from site copy.) |
| "unprecedented access" | **Done.** Now "You'll also have access to our ‘black book’…". |
| One quote style, "Jane & Alan" order | **Done.** UK single curly quotes throughout (‘Trojan horse’, ‘why you?’, ‘we’). Founders named Jane first in text, alt text and schema. The name captions under the founders' photo stay Alan (left) / Jane (right) because they label positions in the photo. |
| "B2B SME" in hero | **Done.** "Running, and growing, a small or mid-sized business…". |

## Not changed / notes
- netlify.toml: not needed (no redirects required; Netlify serves 404.html automatically and pretty URLs map /what-we-do to what-we-do.html).
- The "What we do" direction-switcher CSS/JS in site.js and the CSS is unused by any page; left as it was.
- Vercel project "grow-savvy" was not touched; the live domain is the source.
