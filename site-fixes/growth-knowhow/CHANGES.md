# Growth KnowHow (growth-knowhow.com) – review fixes

Source: the GitHub repo is empty, so every page, styles.css and script.js was scraped from the live site with Firecrawl on 16 Nov 2026 (home, why-us, get-in-touch, privacy-policy and the five workshop pages). Nothing live was changed.

Page files use `.html` names (`why-us.html`, `workshops/remote-team.html` …) so the relative links work in the preview and on Netlify (Netlify serves `/why-us` from `why-us.html`). Canonicals, OG URLs and the sitemap use the clean live URLs.

Images and favicons could not be downloaded (the container cannot reach the site), so they are referenced by absolute `https://growth-knowhow.com/assets/...` URLs. The files are unchanged on the live site; keep the existing `/assets/` folder when uploading. The artifact preview sandbox may block these external images, so the preview can show empty image areas – the live site will not.

## Every site

| # | Item | Status |
|---|------|--------|
| 1 | robots.txt + sitemap.xml | Done. Sitemap lists the 9 indexable pages (privacy and draft terms are noindex and left out). **Owner:** submit the sitemap in Google Search Console. |
| 2 | Canonical, OG/Twitter, JSON-LD | Done on every page. Organization + ProfessionalService JSON-LD on the home page (founders, parent Chameleon Brands Ltd, Bridgend address). Course schema on each workshop page, AboutPage on why-us, FAQPage on faq. `lang="en-GB"`. Logo in schema uses the existing favicon-180.png (no separate logo file exists – the logo is CSS text). |
| 3 | Branded 404 | Done – `404.html` in the site style with links home, to the workshops and to contact. Uses root links (`/…`) because Netlify serves it at any missing path; those links will not work inside the artifact preview. |
| 4 | Company details | Done – HCA-style legal line in every footer; company number and registered office also added to the privacy policy's "Who we are". |
| 5 | Proof | Placeholder – home page now shows the three case-study quotes (anonymous) with slots for client name/logo and a measured result. Needs names, logos and figures from the owner, with client permission. |
| 6 | Group link / names | Done – "Part of Chameleon Brands" in every footer. Brand spellings checked. |
| 7 | Agreed claims | Done – "three decades" kept (no "two decades" on the site); Jane's line uses "over 30 years' experience"; "go-to-market (GTM)" written in full on first use on why-us and faq. |

## Growth KnowHow review

| Priority | Item | Status |
|---|---|---|
| High | Company details | Done (footer legal line on every page). |
| High | Three case-study quotes on home page | Done – new "Client results" section before the contact form, links to the full studies on why-us. Name/logo/result slots are placeholders. |
| High | Phone + direct calendar link | Calendar: Done – uses the Google Calendar link already in script.js (`calendar.app.google/g3XnCTvhj4SAgEpz9`) under every contact form and on get-in-touch. Phone: **Placeholder** in the contact sections and footer (do not reuse HCA's number). |
| Medium | Workshop facts (length / format / location / group size / from £X) | Done as a "Key facts" list in each workshop sidebar. Length and group size come from the site. Format: Managing a Remote Team = virtual or in person (stated on the site); others show "In person" + **placeholder** asking whether virtual/hybrid is offered. Location and "from £" price: **Placeholder**. |
| Medium | Titles with "sales training" / "UK" | Done where accurate: home, the two sales workshops, account management ("Account Management Training"), FAQ. Internal Communication and Managing a Remote Team are not sales training, so their titles have no "sales training". All titles now use "Page | Growth KnowHow". Meta descriptions rewritten to ~150–160 characters. |
| Medium | Course schema | Done on all five workshop pages (CourseInstance per format). **TODO:** add an `offers` price once the "from" price is confirmed. |
| Medium | One name for the remote workshop | Done – "Managing a Remote Team" (eyebrow, panel label, H1/H3 "Managing a Remote Team Workshop", title, form option). "Remote Team Management & Collaboration" and "Leadership" removed. URL `/workshops/remote-team` unchanged. |
| Medium | /why-us heading order | Done – the H1 section now comes before the "Meet Jane & Alan" H2 section. |
| Medium | "How it works" nav link | Done – added to the nav on every page (links to the home page's #how). |
| Medium | Privacy line next to form button | Done – a short line with a link to the existing privacy policy sits beside every Send button. |
| Medium | LinkedIn + credentials for Jane and Alan, name HCA | HCA: Done (why-us now says "We founded HCA, one of the first go-to-market (GTM) agencies in the UK", linked to hca.uk.com). Founder cards added for Jane Heath and Alan Cotton. LinkedIn URLs and credentials: **Placeholder** (not on the site). Photo alt text changed to "Jane Heath and Alan Cotton" order – check it matches the photo. |
| Low | Capitalise after "Purpose." | Done on sales-performance, account-management and internal-communication, and also on remote-team, which had the same issue. |
| Low | Honeypot and duplicate hidden form visually hidden | Done – the honeypot paragraph was visible ("Don't fill this out") and the duplicate form at the bottom of each page was visible because the site-wide `form{display:flex}` overrode it. Honeypot now uses an off-screen class; duplicate form has `hidden` plus `[hidden]{display:none!important}`. |
| Low | Terms of business (draft) | Done as a template – `terms.html`, "Draft – needs review before publishing" banner, noindex, not in sitemap. Fees, payment terms, VAT, cancellation, IP restrictions and liability cap are **placeholders**. Linked in the footer. |
| Low | FAQ | Done – `faq.html` from facts on the site, linked in the footer. Answers about virtual delivery, location and price are **placeholders** and are left out of the FAQPage schema until confirmed. |

## Other changes and notes
- En dashes (–) replace spaced hyphens used as asides throughout; the em dash in the form success message is now an en dash.
- The inline `<style>` on why-us (case-study styles) moved into styles.css so the home page can reuse it.
- Netlify form markup restored: the scraped HTML had lost `data-netlify` and the hidden `form-name` field (Netlify strips/adds these on deploy). Both are back, with `netlify-honeypot="bot-field"`, so the form keeps working when these files are uploaded. **Owner:** send a test enquiry after uploading and check it arrives in Netlify Forms.
- Observation, not changed: script.js defines `handleSubmit()` (AJAX post, then opens the calendar and shows "Thanks! Opening the calendar…"), but the live forms do not call it, so the form does a plain POST and the success message never shows. If the "Send & choose a time" behaviour is wanted, add `onsubmit="return handleSubmit(event)"` to the forms. Left as it is because it was not in the review.
- Fonts still load from Google Fonts (not in this site's review).
- script.js is unchanged.

**Update 2026-11-16:** the owner confirmed none of the brands has a phone number, so all phone placeholders have been removed. No phone number is needed.
