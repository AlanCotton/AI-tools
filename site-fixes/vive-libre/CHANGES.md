# Vive Libre (vivelibrespain.com) – review fixes

Source: the live site, scraped with Firecrawl on 16 November 2026 (home, about, how-it-works, areas, listings, contact, buying-process, resources, the five resources-* guides, privacy, plus styles.css and site.js). Netlify/browser-injected markup was stripped: the inlined WhatsApp widget and its CSS (site.js still adds both), the language-switcher markup, the i18n data attributes and the i18n scripts. Absolute self-links are now relative (`about.html` and so on). Netlify Pretty URLs serve them at clean URLs.

Images were not downloaded. Every image points at `https://vivelibrespain.com/images/...`, and the files on the live site are unchanged. Upload this folder over the existing site and keep the `/images/` folder that is already there.

Not published live. Nothing was deployed, pushed or submitted.

## Every site
| # | Item | Status |
|---|------|--------|
| 1 | robots.txt and sitemap.xml | **Done**: 26 pages, lastmod 2026-11-16. **Owner:** submit the sitemap in Google Search Console. |
| 2 | Canonical, OG/Twitter, JSON-LD | **Done**: on every page, with absolute https og:image. The home page has `RealEstateAgent` schema (address, email, areaServed, parentOrganization, founders Jane Heath and Estelle). **Placeholder:** Estelle's surname (HTML TODO). |
| 3 | Branded 404 | **Done**: `404.html` (noindex, links to the home page and contact). Note: it uses relative paths, so on a nested missing URL (e.g. `/a/b`) the CSS will not load. Change `styles.css`/`site.js` to `/styles.css` and `/site.js` in 404.html on deploy if you want it styled at any depth. |
| 4 | Company details | Not required for Vive Libre's footer. The entity is named on privacy.html and the new aviso-legal.html. The Aviso Legal link is in every footer. |
| 5 | Proof / testimonials | **Placeholder**: checkable attribution for both testimonials (surname or initial, area, year, with consent), plus a Google Business Profile link (about.html). |
| 6 | Group link | **Done**: "Part of Chameleon Brands" appears only on privacy.html and aviso-legal.html, as the brief asks. Brand spellings checked. |
| 7 | Agreed claims | **Done**: Jane's bio now says "over 30 years' experience" (was "25+ years"). |

## Vive Libre – High
| Item | Status |
|------|--------|
| Fees & Independence section with "from €X" | **Done / Placeholder**: new `#fees` section on how-it-works.html, linked from the home page, the value card and the buying-process costs note. **Needs:** prices for the buyer's agent service, private orientation day and group orientation day; whether prices include IVA; and the commission/independence statement. |
| Draft Aviso Legal | **Done (draft)**: aviso-legal.html, with a "Draft – needs review before publishing" banner. Entity, company number and registered office are filled in. **Placeholders:** NIF, Spanish VAT, Spanish address, Valencian agent register (RAICV) number, photo credits, governing law. An HTML TODO asks a Spanish lawyer to confirm the trading entity, VAT and agent registration. |
| Remove placeholder items | **Done**: "[mailing list provider, when live]" removed from privacy.html (HTML TODO to add the provider later). The demo newsletter form ("Join the community") is removed from every footer and replaced by a "Get in touch" column (email, WhatsApp numbers already on the site, Book a call). An HTML TODO explains how to re-add the newsletter. The unused demo-form handler was removed from site.js. |
| UK English / en-GB | **Done**: `lang="en-GB"` and `og:locale en_GB`. The UK source text was used (the live page was rendering US variants such as harbor, favorite and licenses through the translator). "toward" changed to "towards". Privacy "last updated" date changed to 16 November 2026. |

## Vive Libre – Medium
| Item | Status |
|------|--------|
| Listing photos | **Done** on listings.html: Altea Hills now uses `prop-altea-hills.jpg` (was the church photo), Benissa uses `prop-benissa-coast.jpg` (was the cove photo), and Dénia uses `prop-denia.jpg` (was the town photo). **Placeholder:** the Moraira frontline villa still shows the Moraira marina photo, because the site has no matching property image. |
| "4 examples" counter vs 7 homes | **Done**: the static HTML now says "Showing all example homes · 7 examples" with no hidden cards, and JavaScript updates the line when a filter is used. |
| Meta description "entry apartments" | **Done**: reworded on listings.html. |
| Dénia twice | **Done**: home areas fine print now reads "Also covering Finestrat, Benidorm's quieter edges, Calpe and Benissa." (Dénia is already in the heading.) |
| Town stub pages | **Done (stubs)**: `areas-<town>.html` for Altea, Moraira, Jávea, Villajoyosa, Finestrat, La Nucía, Albir, Calpe, Benissa and Dénia. Each uses the site's existing text and photo, with a visible TODO for the full guide. They are linked from areas.html and the home cards. |
| Guide stub "Buying property in Spain as a UK citizen" | **Done (stub)**: resources-uk-buyers.html, built from facts already on the site, with a TODO for the full content. Linked from resources and the guide pills. |
| Testimonials attribution + Google Business Profile | **Placeholder** (see item 5). |
| Founder stock photo | **Placeholder**: visible TODO under founders.jpg on about.html. |
| Booking link and tel: links | **Booking link: Placeholder** on contact.html ("Book a call online: [TO CONFIRM: online booking link]"). **Phone: not added.** Per the owner, none of the companies has a phone number, so there are no phone placeholders or tel: links anywhere. |
| RealEstateAgent schema | **Done** (index.html). There is no telephone field, for the same reason. |
| Redirect /contact.html → /contact | **Done**: netlify.toml (301). |

## Vive Libre – Low
| Item | Status |
|------|--------|
| Remove language switcher | **Done**: markup, i18n-dict.js and i18n.js references, the switcher CSS in styles.css, and the "language choice" bullet in privacy.html are all removed. The live files i18n.js and i18n-dict.js can be deleted. |
| Self-host font | **Not possible here**: Firecrawl can't fetch woff2 files. Hanken Grotesk still loads from Google Fonts (HTML/CSS TODO). Privacy already discloses this. |
| H2→H4 jump on /contact | **Done**: the "What happens next" steps are now h3. |
| Jane's bio | **Done**: light rewrite focused on negotiation. AI/GTM removed and nothing new invented. Kept: founded businesses, government small-business paper, LinkedIn link. |
| Chameleon link only on legal pages | **Done**. |

## Other changes (needed to keep things working, or small fixes)
- Contact form: added `data-netlify="true"`, `netlify-honeypot="bot-field"` and a hidden `form-name` input, because the scraped HTML had been processed by Netlify. The honeypot is now hidden (it was visible), the thank-you panel has `hidden`, and autocomplete hints were added. **Owner:** send a test enquiry after deploy and check it appears under Netlify Forms.
- how-it-works orientation tiers: light cards on the dark band had pale text. Tier headings and list text are now dark, and the group button is the dark-text variant.
- Stylesheet cache-buster query strings (`?v=26`) were dropped.
- Not touched: listings.html `?edit=1` link editor, the WhatsApp widget, all prices and example homes (still marked "Illustrative").

## Placeholders for the owner
- **Fees:** buyer's agent from €X, private orientation day from €X, group orientation day from €X; IVA included or not; commission/independence statement.
- **Legal (Aviso Legal):** NIF, Spanish VAT, Spanish address, RAICV number, photo credits, governing law, and Spanish lawyer review of the trading entity, VAT and register.
- **Proof:** testimonial attribution (with consent) and Google Business Profile link.
- **Media:** real photo of Jane and Estelle (replace founders.jpg); a property photo for the Moraira frontline villa.
- **Contact:** online booking link.
- **Content:** 10 town guides and the UK-buyer guide; Estelle's surname for the schema.
- **Later:** newsletter provider (re-add the form and update privacy.html); self-host the font; submit the sitemap in Search Console.
