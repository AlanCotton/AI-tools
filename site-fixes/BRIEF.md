# Chameleon Brands site fixes — shared brief

Goal: apply the review fixes below to ONE site and publish the corrected site as a private claude.ai **Artifact** (multi-file: index.html as the page, other pages and assets via `files`). The owner will move the files to the live sites later.

## Hard rules
- **Do NOT change the live sites.** No Netlify/Vercel deploys or config changes, no git push to any site repo, no form submissions. Read-only on everything external.
- Keep each site's existing design, copy and structure. Make the review's changes, nothing else. Don't redesign.
- **Never invent facts** (prices, phone numbers, client names, testimonials, stats, dates, analytics IDs, legal registrations). Where the review needs information we don't have, add a clearly visible placeholder: `<mark class="todo">[TO CONFIRM: what is needed]</mark>`. Add one CSS rule per site: `mark.todo{background:#fff3a3;color:#000;padding:0 .2em;border-radius:2px}`. Also add an HTML comment `<!-- TODO: ... -->`.
- Legal pages you draft (privacy policy, terms, Aviso Legal, accessibility statement) are templates. Put a visible TODO banner at the top saying "Draft – needs review before publishing".
- UK English throughout (Vive Libre included). Use en dashes (–) in ranges and asides, matching the hub.
- Keep working files in `/home/user/AI-tools/site-fixes/<site-slug>/`. That folder must hold the complete corrected site as it should be uploaded (HTML, CSS, JS, robots.txt, sitemap.xml, 404.html, images you have), plus `CHANGES.md` listing each review item as Done / Placeholder (needs X from owner) / Not possible here (why).
- Before writing or publishing the artifact, load the `artifact-design` skill (Skill tool) and follow its page contract only where it doesn't conflict with keeping the site's own design. This is a faithful copy of an existing site, not a new design. The site's own `<title>` stays.
- Artifact publish: `file_path` = the site's index.html, `files` = every other page and asset at its relative path, `icon` = a generic word, `description` = "<Brand> site with review fixes applied (preview, not live)". Internal links must be relative so they work inside the artifact. Binary files are 15MB max each. Leave out any video over ~10MB and keep the reference to it, noting it in CHANGES.md.
- Images you can't download (scraped sites): reference them by absolute `https://<live-domain>/...` URL so the preview still shows them, and note in CHANGES.md that the files are unchanged on the live site.

## Getting the source
- HCA: git clone at `/home/user/alancotton/hca` (the current source).
- The Taylor: git clone at `/home/user/thetaylor.ai-website` (the current source; Vercel config in vercel.json).
- All other sites (and anything missing): the live sites can't be reached from this container. Fetch each page with the Firecrawl `firecrawl_scrape` tool: `formats: ["rawHtml","links"]`, `maxAge: 0`, `conversationId: "74c11467-425d-4e67-a8ac-e5e7f7519db5"`. Large results get saved to a file; extract with `jq -r .rawHtml <file> > page.html`. Text assets (CSS, JS, JSX) can be fetched the same way (try rawHtml; if it is wrapped in HTML, strip the wrapper). Follow the `links` to get every page on the site. Before you edit, strip Netlify/Vercel/Cloudflare-injected scripts from the scraped HTML and turn absolute self-links into relative ones.

## Shared facts (use exactly)
- Legal entity: **Chameleon Brands Ltd**, registered in England and Wales · Company no. **12945712** · Registered office: **Dragon House, Princes Way, Bridgend Industrial Estate, Bridgend, CF31 3AQ**
- Footer legal line (HCA's wording, adapt the brand name): `<Brand> is a trading name of Chameleon Brands Ltd, registered in England and Wales · Company no. 12945712 · Registered office: Dragon House, Princes Way, Bridgend Industrial Estate, Bridgend, CF31 3AQ`. For the hub: `Chameleon Brands Ltd, registered in England and Wales · Company no. …`.
- Group link on the five B2B sites (Grow Savvy, Hummingbird, Growth KnowHow, HCA, The Taylor): in the footer, `Part of <a href="https://chameleon-brands.com/">Chameleon Brands</a>`. **Not on Vive Libre** (except its legal pages).
- Brand spellings: Chameleon Brands, Grow Savvy, Hummingbird (Hummingbird Consultancy), Growth KnowHow, HCA, The Taylor, Vive Libre.
- Founders: Jane Heath and Alan Cotton. Always in that order: "Jane Heath and Alan Cotton" / "Jane & Alan".
- Agreed claims: HCA = "three decades of agency go-to-market experience" (write "go-to-market (GTM)" the first time GTM appears on a page). Jane = "over 30 years' experience". Don't use "two decades" anywhere. Wherever a site uses a different version, change it to these.
- The Taylor location claim: "UK company, European team". Never "made in the UK".
- Contact emails already used: hello@chameleon-brands.com, hello@hca.uk.com, hello@thetaylor.ai. HCA phone: 07775 898475 (+447775898475). Don't reuse HCA's phone on other brands. Use a placeholder.

## Shared SEO template (every site, every page)
In `<head>`:
```html
<html lang="en-GB">
<title>Page name | Brand</title>  <!-- home: "Brand | primary search phrase" -->
<meta name="description" content="…150-160 chars…">
<link rel="canonical" href="https://<domain>/<path>">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Brand">
<meta property="og:title" content="…"><meta property="og:description" content="…">
<meta property="og:url" content="https://<domain>/<path>">
<meta property="og:image" content="https://<domain>/<absolute image path>">
<meta name="twitter:card" content="summary_large_image">
```
JSON-LD on the home page (plus page-specific types as the review asks):
```json
{"@context":"https://schema.org","@type":["Organization","ProfessionalService"],
 "name":"Brand","url":"https://<domain>/","logo":"https://<domain>/<logo>","email":"…",
 "address":{"@type":"PostalAddress","streetAddress":"Dragon House, Princes Way, Bridgend Industrial Estate","addressLocality":"Bridgend","postalCode":"CF31 3AQ","addressCountry":"GB"},
 "parentOrganization":{"@type":"Organization","name":"Chameleon Brands Ltd","url":"https://chameleon-brands.com/"},
 "founder":[{"@type":"Person","name":"Jane Heath"},{"@type":"Person","name":"Alan Cotton"}]}
```
(Hub: `@type` Organization, with `subOrganization` listing the six brands instead of parentOrganization. Vive Libre: RealEstateAgent.) Use founder only where it is accurate for that brand.
Files: `robots.txt` (Allow all, `Sitemap: https://<domain>/sitemap.xml`), `sitemap.xml` (every real page, absolute URLs, lastmod 2026-11-16), and a branded `404.html` in the site's own style with links home and to contact. For Netlify sites, also update or add `netlify.toml` where a redirect is needed. For The Taylor, use `vercel.json`.

## The review (source of truth for what to change)
### Every site
1. No robots.txt or sitemap.xml → add (template above). (Search Console submission is the owner's job; list it in CHANGES.md.)
2. No canonical, OG/Twitter or JSON-LD → add (template above; share image as a full https URL).
3. Default Netlify/Vercel 404 on five sites → branded 404.html (Grow Savvy already has one; keep it and check it).
4. Company details missing on Grow Savvy, Growth KnowHow, Hummingbird, hub → add the HCA-style legal line.
5. Little proof: testimonials anonymous or fictional → add clearly marked placeholder slots for named testimonials and case studies where the review asks. Don't invent any.
6. No link back to the group; inconsistent brand names → "Part of Chameleon Brands" on the five B2B sites; fix spellings.
7. Inconsistent claims → use the agreed claims above.

### Hub — chameleon-brands.com (domain chameleon-brands.com)
High: page loads React dev build + in-browser Babel + tweaks panel (tweaks-panel.jsx, assets/tweaks.jsx: colour/density/dark-mode controls) → rebuild as plain static HTML/CSS (use the default tweak values, no React/Babel/JSX, keep site.js only if it is plain JS that is still needed). Home has no headings → add H1 "Chameleon Brands – a group of six specialist businesses" plus sensible H2s. og:image is relative (assets/logo.png) → absolute https. The HCA sub-page (/hca) meta description says "Two decades" → "three decades". The Taylor sub-page (/thetaylor) says "no lock-in, made in the UK" → reword to "UK company, European team" (keep "no lock-in" only if it is supported elsewhere; otherwise add a TODO).
Medium: add a short "Who we are" section (Jane Heath and Alan Cotton), the company number, and a "find the right brand" / contact prompt. Present Vive Libre separately from the five B2B brands, e.g. "…and a life on the Costa Blanca".
Pages: / , /grow-savvy, /growth-knowhow, /hca, /hummingbird, /thetaylor, /vivelibre (plus any others linked).

### Grow Savvy — grow-savvy.com
High: the form has no `action`/`data-netlify` → add `name`, `method="POST"`, `data-netlify="true"`, a hidden `form-name` input, a honeypot and an `action` to a thanks page (create thanks.html if none). Note in CHANGES.md that the owner must send a test enquiry. GA ID is placeholder G-XXXXXXXXXX → remove the snippet (and leave an HTML comment saying how to re-add it with a cookie banner and privacy-policy update). The H1 is typed by JS so crawlers see "Unlock" → put the full H1 text in the HTML (the animation may stay as progressive enhancement, but the source must hold the full text). Add the company details to the footer. No proof on the home page → bring in the existing case-study figures ("£250K a year from £25K" if it's on the site), named quotes (placeholders) and the founders' photo if it's on the site.
Medium: titles "Page | Grow Savvy", home with "business growth consultant UK". Add phone (placeholder) and a "Book a 30-minute call" link (use an existing calendar link if there is one on the site, else a placeholder). Add an engagement models / FAQ section with placeholder prices. Add founder bios with LinkedIn links (placeholder URLs if not on the site). Positioning: the split is Grow Savvy = growth support that includes AI, The Taylor = bespoke AI builds. Tune Grow Savvy's AI copy lightly to match.
Low: replace the stat "1 / founders of HCA" with something that works as a number (for example "30+ / years in B2B growth", per the agreed claim). Tone down "unprecedented access". Use one quote style throughout and "Jane & Alan" order. Replace "B2B SME" in the hero with plain English ("small and mid-sized businesses").
(The site is on Netlify (project growsavvy). There is also a Vercel project "grow-savvy". The live domain is the source.)

### Hummingbird — hummingbirdconsultancy.com
High: no <title>, meta description or lang → add them. No privacy policy (/privacy 404) but the form collects personal data and passes people to Google Calendar → draft /privacy (privacy.html), linked next to the form and in the footer. Company details in the footer. Proof: placeholder slots for testimonials and 2–3 case studies, plus a network credentials/profiles placeholder. Link Jane's LinkedIn (use the one on the site or a placeholder) and the Parliamentary Review article (placeholder URL if not known). Explain what clients get: format, how the first call works, indicative price (placeholder).
Medium: form fields have no labels → add labels; make name and email `required`. Hero video → add `muted`, `playsinline` and a `poster`. "Book a call" → link to the calendar (use the Google Calendar link already on the site). Rename "WhatsApp Image 2026-07-09…jpeg" to a descriptive filename (reference the new name; if you can't download it, keep the live URL and note it), and improve its alt text. Add Person schema for Jane Heath.
Low: "Female-only founders, MDs & CEOs" → "Female founders, MDs and CEOs". Make the nav order match the page order. Use en dashes. Add a short eligibility note and a TODO for a legal check of the women-only offer under the Equality Act.

### Growth KnowHow — growth-knowhow.com
High: company details. Put the three case-study quotes on the home page (keep them anonymous, with placeholder slots for names/logos/measured results). Add phone (placeholder) and a direct calendar link (use an existing one if found, else a placeholder).
Medium: on each workshop page add length / format (in-person or virtual) / location / group size / "from £X" (placeholders unless the site states them). Titles with "sales training" and "UK" where accurate. Course schema on each workshop page. The remote workshop has three names ("Remote Team Management & Collaboration", "Managing a Remote Team", "Leadership") → use "Managing a Remote Team" everywhere. /why-us: the H2 comes before the H1 → fix the order; add the missing "How it works" nav link. Privacy line next to the form button (link to the existing privacy page, or draft one if none exists). LinkedIn links and credentials for Jane and Alan, and name HCA.
Low: lowercase word after "Purpose." on three workshop pages → capitalise. Make sure the honeypot and the duplicate hidden form are visually hidden. Add terms of business (draft) and an FAQ.
(The GitHub repo is empty. Scrape the live site.)

### HCA — hca.uk.com
High: no privacy policy; "How we handle your data" points to client project data → draft privacy.html and link it from the form and the footer. None of the six testimonials is attributed → add placeholder attribution (name, role, agency) to each, plus placeholder slots for two named case studies and client logos.
Medium: the £7m stat is called "fee" in one place and "£1m GP" in another → pick one consistent wording and add a TODO for the owner to confirm. Founder page: full name "Jane Heath", the year founded (placeholder), a Parliamentary Review link (placeholder), and change `es.linkedin.com` to `www.linkedin.com`. FAQPage schema on questions.html. Home title including "agency new business consultancy". Add a commented-out Plausible snippet with a TODO. Simplify the form fallback so it doesn't open the email client and a new tab at the same time (keep one behaviour: Netlify POST to thanks.html, with mailto only as a visible link).
Low: soften "Kick-arse GTM gurus" (e.g. "seasoned GTM specialists"). Write "go-to-market (GTM)" in full on first use. Self-host the fonts if they come from Google Fonts (download woff2 via Firecrawl only if possible, else leave and note it). Remove the duplicate year script. Archive video: note in CHANGES.md that it needs re-editing so the personal details are removed from the file itself (you can't do that here). Add an Insights section placeholder (a nav link to a simple insights.html "coming soon" page is enough).

### The Taylor — thetaylor.ai
High: no named people → add a team section (Jane Heath, Alan Cotton; photos, LinkedIn and credentials as placeholders) on About and a short version on the home page. Every example is fictional → add placeholder slots for 2–3 anonymised real case studies and one named testimonial. Keep the "fictional names" disclaimer for the existing examples. Claims "You own it outright"/"made in the UK" → only use "UK company, European team". Add an ownership TODO if any page implies ownership. Add a "Your data" section on the home page: no training on your data, a DPA (data processing agreement) before any processing, a person signs off. Under the H1, add a plain-English line: "AI consultancy and bespoke builds for UK SMEs".
Medium: titles with search terms. Engagement models with "from" prices (placeholders). Each case appears under up to three names (nav vs /use-cases vs /services) → pick one name per case and use it everywhere. Privacy policy mentions an English/French language switch that doesn't exist → remove that sentence. Contact page: add a form (Vercel has no built-in forms, so make it a simple POST with a TODO for the endpoint, e.g. Formspree) and a phone placeholder. Content below the fold is blurred until scroll → make sure it shows without JS and under `prefers-reduced-motion: reduce`. Add a favicon (simple SVG "T" in the brand colours).
Low: add /llms.txt. Draft terms of business and an accessibility statement.
Group link: "Part of Chameleon Brands" in the footer.

### Vive Libre — vivelibrespain.com
High: add a "Fees & Independence" section with "from €X" (placeholder) and a placeholder statement on whether you take commission from sellers or agents. Add a draft Aviso Legal page (entity, registration, address, NIF as placeholders, plus a TODO for a Spanish lawyer on entity/VAT/Valencian agent register). Remove the placeholder items ("[mailing list provider, when live]" in the privacy page; the newsletter form marked as demo: remove the form or the demo label and leave a TODO). Default to UK English and `en-GB` (harbour, favourite, licences, etc.).
Medium: listing photos don't match the homes (the Altea Hills villa uses the church photo, the Benissa estate uses the cove photo) → swap in the right images if the site has them, else add a TODO. The "4 examples" counter shows 7 homes → fix the counter. The meta description mentions "entry apartments" but none are listed → reword. Dénia appears twice → dedupe. Town pages: create simple stub pages per town listed (with TODO for content), plus one guide stub "Buying property in Spain as a UK citizen". Testimonials: placeholder for checkable attribution plus a Google Business Profile TODO. Founder stock photo → TODO for real photos. Booking link and `tel:` links (placeholders). RealEstateAgent schema. Redirect /contact.html → /contact (netlify.toml).
Low: the language switcher (NL/FR/NO/DE, in-browser translation) → remove it. Self-host the font if possible, else note. Fix the H2→H4 jump on /contact. Jane's bio: focus on negotiation rather than AI/GTM (light rewrite of what's there; no invented credentials). Chameleon link only on the legal pages.

## When done
Reply with: the artifact URL, the folder path, and a short list of the placeholders the owner needs to fill in (grouped), plus anything you couldn't do.
