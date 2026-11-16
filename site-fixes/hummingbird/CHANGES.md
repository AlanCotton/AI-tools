# Hummingbird (hummingbirdconsultancy.com) – changes

Source: live site scraped with Firecrawl on 2026-11-16. The site is a single page (only internal links are `#` anchors and a mailto); `/privacy` returned Netlify's default 404.

The live page is rendered at runtime by a design-tool script (`support.js` + React UMD + a `text/x-dc` logic block). This copy is the rendered HTML as plain static HTML/CSS with a small plain-JS script that keeps the same behaviour (autoplay video, form POST to Netlify then open Jane's Google Calendar, mailto fallback, footer year). Removed: `support.js`, React/ReactDOM, the runtime's `sc-*` placeholder styles, the duplicate hidden Netlify detection form (the visible form now has `data-netlify`), and a stray full-width SVG (favicon artwork) at the end of `<body>`. Inline styles and layout are unchanged.

## Files
- `index.html` – home page with fixes
- `privacy.html` – new draft privacy policy (served at /privacy by Netlify's pretty URLs)
- `404.html` – new branded 404 (Netlify picks it up automatically). Its links use root paths (`/`, `/#contact`) so they work from any missing URL; in the artifact preview they point outside the preview.
- `robots.txt`, `sitemap.xml`
- `images/hero-poster.svg` – new video poster made from the existing Hummingbird mark

No netlify.toml needed (no redirects required).

## Assets not downloaded (still referenced on the live domain, files unchanged there)
- `uploads/34646527-hd.mp4` (hero video) – referenced by absolute URL; size unknown, not downloaded.
- `uploads/WhatsApp Image 2026-07-09 at 14.20.10.jpeg` (Jane's photo) – could not be downloaded via Firecrawl. **Owner: download it, upload it as `uploads/jane-heath-hummingbird-founder.jpeg`, then change the `<img src>`, `og:image`, `twitter:image` and Person schema `image` in index.html (and `og:image` in privacy.html) to the new name.** TODO comments mark the spots.
- `favicon.svg` – referenced by absolute URL, unchanged.
- In the claude.ai artifact preview, external images/video are blocked by the preview's security policy, so the photo and video do not show there (the poster does). They will show on the live site.

## Every-site items
1. robots.txt + sitemap.xml – **Done.** Owner: submit the sitemap in Google Search Console.
2. Canonical, OG/Twitter, JSON-LD – **Done** (Organization + ProfessionalService with parentOrganization Chameleon Brands Ltd; founder Jane Heath only, as the site names only Jane). og:image uses the live photo URL – switch to the renamed file once uploaded.
3. Branded 404 – **Done.**
4. Company details – **Done** (HCA-style legal line in the footer of index and privacy).
5. Proof – **Placeholder**: 3 testimonial slots, 3 case-study slots (third optional), network credentials slot. Needs real, permissioned content from owner.
6. Group link / brand names – **Done** ("Part of Chameleon Brands" in footer; brand name spellings already consistent).
7. Agreed claims – **Done**: "30 years of go-to-market experience" → "over 30 years’ go-to-market (GTM) experience" (GTM spelled out on first use); "over 30 years of experience" → "over 30 years’ experience". No "two decades" on the site.

## Hummingbird – High
- `<title>`, meta description, `lang="en-GB"` – **Done.** Title: "Hummingbird | Business mentoring for female founders".
- Privacy policy – **Done (draft)**: privacy.html with "Draft – needs review before publishing" banner; linked next to the form button and in the footer. **Placeholder**: ICO registration number, publication date, email provider, retention periods, transfer safeguards, lawful bases confirmation, marketing emails.
- Company details in footer – **Done.**
- Proof slots (testimonials, 2–3 case studies, network credentials) – **Placeholder.**
- Jane's LinkedIn + Parliamentary Review link – **Placeholder**: neither URL is on the site; two link chips added with `href="#"` and a visible TO CONFIRM note.
- What clients get (format, first call, indicative price) – **Placeholder** within a new "Working together" section; only facts already on the site are stated (one-to-one coaching with Jane plus network experts; enquiry then calendar booking). Needs session/programme format, first-call length and cost, and "from £X" price.

## Hummingbird – Medium
- Form labels; name and email `required` – **Done** (visible labels, autocomplete attributes, `data-netlify`, `netlify-honeypot`, hidden `form-name`). Owner: send a test enquiry after deploying. In the artifact preview the form does not send (shows a "Preview only" message).
- Hero video `muted`, `playsinline`, `poster` – **Done** (poster: images/hero-poster.svg; autoplay is skipped under prefers-reduced-motion).
- "Book a call" → Google Calendar link already on the site (`https://calendar.app.google/36cKDgewPTFvcCmB8?source=hummingbird-site`) – **Done** (header CTA, plus a direct link under the form).
- Rename WhatsApp image – **Not possible here** (file could not be downloaded); live URL kept, TODOs added, new name proposed above. Alt text improved to "Jane Heath, founder of Hummingbird Consultancy".
- Person schema for Jane Heath – **Done** (sameAs to be added once LinkedIn/Parliamentary Review URLs are known).

## Hummingbird – Low
- "Female-only founders, MDs & CEOs" → "Female founders, MDs and CEOs" – **Done.**
- Nav order matches page order – **Done** (Network, Meet Jane, Approach, Results, Working together, Book a call; footer links in the same order).
- En dashes – **Done** (all spaced hyphens in copy replaced with –).
- Eligibility note + Equality Act TODO – **Done / Placeholder**: short eligibility line under "Who we work with" with a TO CONFIRM mark and an HTML TODO asking for a legal check of the women-only offer (clients and network) under the Equality Act 2010.

## Other notes for the owner
- Google Fonts are still loaded from Google (unchanged); the draft privacy policy mentions this.
- "Meet Jane" text now uses her full name, "Jane Heath", to match the Person schema.
