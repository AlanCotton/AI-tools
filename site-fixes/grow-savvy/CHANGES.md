# Grow Savvy (grow-savvy.com) – review fixes

Source: live site scraped with Firecrawl on 2026-11-16 (home, what-we-do, what-weve-done, why-choose-us, who-we-are, privacy-policy, 404.html, css/site-2026.css, js/site.js, js/typed.min.js). The site links to no other pages. No robots.txt or thanks page existed (both 404). Nothing live was changed.

Clean-up before editing: removed the rendered-DOM artefacts Firecrawl captured (typed.js's injected `<style>` and cursor span, the `is-in` classes site.js adds at runtime). No Netlify/Vercel/Cloudflare-injected scripts were present. Absolute self-links are now relative (`what-we-do.html` etc.); Netlify's pretty URLs serve the same pages at `/what-we-do`. Canonicals and sitemap use the clean URLs.

Files in this folder: index.html, what-we-do.html, what-weve-done.html, why-choose-us.html, who-we-are.html, privacy-policy.html, thanks.html (new), 404.html, css/site-2026.css, js/site.js, js/typed.min.js, robots.txt (new), sitemap.xml (new).

**Not in this folder (unchanged on the live site, referenced by absolute `https://grow-savvy.com/...` URL):** all images (`/images/*`, logo, favicons, founders.jpg, case-study and hero photos), the hero video (`/video/hero.mp4`, `/video/hero.webm`) and the fonts (`/fonts/jost-400.woff2`, `/fonts/jost-700.woff2`). They could not be downloaded from this container. When uploading, keep those folders as they are on the live site. Note: the claude.ai preview may block these external files, so the preview can show missing photos and a fallback font; that is a preview limitation, not a fault in the files.

## Every site
| # | Item | Status |
|---|------|--------|
| 1 | robots.txt and sitemap.xml | **Done.** sitemap lists the five content pages, lastmod 2026-11-16. privacy-policy (kept `noindex` as on the live site), thanks and 404 are left out. **Owner:** submit the sitemap in Google Search Console. |
| 2 | Canonical, OG/Twitter, JSON-LD | **Done.** Every page: `lang="en-GB"`, canonical, og:type/site_name/title/description/url/image (full https URLs), twitter:card. Home: Organization + ProfessionalService JSON-LD (address, Chameleon Brands Ltd parent, founders Jane Heath and Alan Cotton). what-we-do: FAQPage JSON-LD (factual answers only). who-we-are: Person JSON-LD for both founders with LinkedIn `sameAs`. Meta descriptions are 151–159 characters. |
| 3 | Branded 404 | **Done (kept and checked).** Existing 404.html kept in its own style; added a "Get in touch" link, the footer with company details, `noindex`, `lang`. It uses root-relative links/assets (`/css/...`, `/`) because Netlify serves it at any URL depth – so inside the claude.ai preview the 404 page shows unstyled; it is correct on Netlify. |
| 4 | Company details | **Done.** Footer on every page: "Grow Savvy is a trading name of Chameleon Brands Ltd, registered in England and Wales · Company no. 12945712 · Registered office: Dragon House, …". Privacy policy "Who we are" now also gives the company number and registered office. |
| 5 | Proof | **Done (owner decision).** The existing case studies are the latest; they are kept exactly as on the live site and their figures are brought onto the home page. No testimonial or case-study placeholders. |
| 6 | Group link / brand names | **Done.** "Part of Chameleon Brands" in every footer. Brand spellings checked. |
| 7 | Agreed claims | **Done.** "30+ years in B2B growth"; Jane "over 30 years' experience"; HCA described as one of the UK's first go-to-market consultancies; "go-to-market (GTM)" written out at first GTM on each page; no "two decades". |

## Grow Savvy – High
| Item | Status |
|------|--------|
| Contact form had no Netlify attributes | **Done.** `name="contact" method="POST" action="thanks.html" data-netlify="true" data-netlify-honeypot="bot-field"`, hidden `form-name`, honeypot field kept (now `aria-hidden`, `tabindex="-1"`). New thanks.html. site.js still posts with AJAX, now goes to thanks.html on success (the existing email fallback on failure is unchanged). The duplicate hidden `<form name="contact">` at the end of each page was removed (it clashed with the real form's name; its extra `source` field was never filled in). **Owner:** after deploy, send a test enquiry and confirm it arrives in Netlify > Forms and by email notification. |
| GA placeholder G-XXXXXXXXXX | **Done.** Snippet removed from every page; HTML comment explains how to re-add it (consent banner first, real ID, update privacy policy cookies section). |
| H1 typed by JS | **Done.** The H1 now holds "Unlock real growth." in the HTML. typed.js still animates it as an enhancement (starts by deleting the real text), and does not run under `prefers-reduced-motion: reduce`. |
| Company details in footer | **Done** (see 4). |
| No proof on home | **Done.** New home sections: case-study figures from what-we've-done (£250K a year from £25K; 2× in two years with three new markets; £1m target, doubled in a year) linking to the case studies; founders' photo (images/founders.jpg from who-we-are) with a short "Jane & Alan, personally" block. |

## Grow Savvy – Medium
| Item | Status |
|------|--------|
| Titles | **Done.** "Page \| Grow Savvy"; home "Grow Savvy \| Business growth consultant UK". |
| Phone | **Not needed** – the owner confirmed Grow Savvy has no phone number; placeholder removed. |
| "Book a 30-minute call" | **Done (owner decision).** Button in the contact block on every page goes to the enquiry form beside it (`#email-form`); there is no calendar link. |
| Engagement models / FAQ | **Done.** what-we-do: three engagement models built from services the site already describes (discovery session, growth and GTM mentoring programme, ongoing mentoring), describing format and what's included, with no prices; five-question FAQ with answers taken from existing site copy. |
| Founder bios with LinkedIn | **Done / Placeholder.** who-we-are: bio cards for Jane Heath and Alan Cotton (only agreed facts: Jane over 30 years' experience; both co-founded HCA) with LinkedIn links (www.linkedin.com/in/jane-heath, www.linkedin.com/in/alanathca, also as `sameAs` in the Person JSON-LD). Fuller bios are still placeholders. |
| Positioning (Grow Savvy = growth support incl. AI; The Taylor = bespoke AI builds) | **Done.** Home AI pillar and a what-we-do FAQ answer now say AI adoption is part of the growth support and point bespoke AI builds to The Taylor (thetaylor.ai). Typed line "Integrate AI, properly." → "Put AI to work, properly." Meta descriptions adjusted. |

## Grow Savvy – Low
| Item | Status |
|------|--------|
| Stat "1 / founders of HCA" | **Done.** Why-us strip is now: 5 non-competing clients · 30+ years in B2B growth (including founding HCA, one of the UK's first GTM consultancies) · 3 disciplines under one roof. (The old "3 decades" stat repeated the 30+ claim, so it became the three-disciplines stat, taken from site copy.) |
| "unprecedented access" | **Done.** Now "You'll also have access to our ‘black book’…". |
| One quote style, "Jane & Alan" order | **Done.** UK single curly quotes throughout (‘Trojan horse’, ‘why you?’, ‘we’). Founders named Jane first in text, alt text and schema. The name captions under the founders' photo stay Alan (left) / Jane (right) because they label positions in the photo. |
| "B2B SME" in hero | **Done.** "Running, and growing, a small or mid-sized business…". |

## Owner decisions applied (2026-11-16)
- **Testimonials and case studies:** removed the home-page testimonials section (it held only two named-quote placeholders) and the named case-study slot on what-weve-done. The three existing case studies are unchanged.
- **No prices:** removed the three "From [TO CONFIRM: £ …]" lines from the engagement models (the models stay, describing format and what's included), the "How much does it cost?" FAQ, and the now-unused `.price` and `.quote` CSS. No price appeared in any schema.
- **Phone:** no phone number; placeholder removed (by the coordinator). The optional phone field on the form stays.
- **Photos:** no photo placeholders were on this site; the founder cards on who-we-are show no photo and the existing founders.jpg is used on home and who-we-are.
- **ICO:** privacy-policy.html now states "Chameleon Brands Ltd is registered with the Information Commissioner's Office (registration number ZC276789)." in the "Who we are" section; the existing wording about complaining to the ICO is unchanged.
- **Parliamentary Review, HCA £7m, Vive Libre, The Taylor:** not present on this site; nothing to change.

### Round 2 (2026-11-16)
- **LinkedIn:** Jane Heath https://www.linkedin.com/in/jane-heath and Alan Cotton https://www.linkedin.com/in/alanathca linked on the who-we-are bio cards (new tab, `rel="noopener"`) and added as `sameAs` in the Person JSON-LD.
- **Booking:** "Book a 30-minute call" now goes to the enquiry form (`#email-form`); calendar placeholder removed.

### Round 3 (2026-11-16)
- **Privacy policy:** HubSpot (CRM) and Instantly (outreach email) added to the list of service providers; added "If you send us an enquiry, we will not add you to marketing emails."; lawful basis for enquiries was already legitimate interests (unchanged); last-updated date set to 16 November 2026. Retention and international-transfer wording unchanged (the existing policy had no placeholders there).

### Placeholders that remain
- Short bios for Jane Heath and Alan Cotton (who-we-are bio cards).

`mark.todo` CSS is kept because these placeholders remain.

## Not changed / notes
- netlify.toml: not needed (no redirects required; Netlify serves 404.html automatically and pretty URLs map /what-we-do to what-we-do.html).
- The "What we do" direction-switcher CSS/JS in site.js and the CSS is unused by any page; left as it was.
- Vercel project "grow-savvy" was not touched; the live domain is the source.
