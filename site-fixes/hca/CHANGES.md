# HCA (hca.uk.com) – review fixes

Source: git clone at `/home/user/alancotton/hca` (commit 31d5db9, "Import the live hca.uk.com site"). Copied here without `.git`; the clone and the live site are unchanged. Nothing deployed or pushed.

Placeholders show on the page as yellow `[TO CONFIRM: …]` marks (`mark.todo`, rule added at the end of `assets/styles.css`) and each has an `<!-- TODO: … -->` comment next to it. Search the HTML for `TO CONFIRM` and `TODO` before going live.

## Every site

| # | Item | Status |
|---|------|--------|
| 1 | robots.txt and sitemap.xml | **Done.** `robots.txt` (allow all, sitemap line) and `sitemap.xml` (8 real pages, lastmod 2026-11-16; thanks and 404 left out). Submitting the sitemap in Google Search Console is the owner's job. |
| 2 | Canonical, OG/Twitter, JSON-LD | **Done.** Every page has canonical, og:type/site_name/title/description/url/image (absolute `https://hca.uk.com/assets/img/hero-arrows.jpg`) and `twitter:card`. Home has Organization + ProfessionalService JSON-LD (address, email, parentOrganization Chameleon Brands Ltd). Founder lists Jane Heath and Alan Cotton (owner confirmed they co-founded HCA). Meta descriptions rewritten to 150–160 characters. Canonicals use the `.html` URLs the site links to. |
| 3 | Branded 404 | **Done.** `404.html` in the site's style (noindex) with links home and to the contact form. Netlify serves it automatically. Note: it uses relative asset paths like the rest of the site, so it is fully styled for top-level missing URLs (e.g. `/old-page`); for nested ones (`/a/b`) it would lose styling – switch its asset paths to `/assets/…` if that matters. |
| 4 | Company details | **Already present** (HCA legal line in every footer). Kept, and added to the new pages. |
| 5 | Proof / testimonials | **Resolved by owner.** Existing testimonials and case studies are the latest; kept exactly as on the live site, no placeholders. |
| 6 | Group link, brand names | **Done.** "Part of Chameleon Brands" (link to https://chameleon-brands.com/) added to every footer, next to a Privacy policy link. |
| 7 | Agreed claims | **Done.** "Three decades of agency go-to-market experience" in the footer, home H2, meta description and ticker; "go-to-market (GTM)" written in full on first use (home "What we do", services "AI-integrated go-to-market (GTM) strategy"). Client quotes that say "GTM system/engine" left as quoted. No "two decades" anywhere. |
| – | En dashes | **Done.** Spaced hyphens used as dashes replaced with en dashes in visible text, titles and alt text (scripts left alone). |

## HCA review

### High
| Item | Status |
|------|--------|
| Privacy policy | **Done (draft) + Placeholder.** New `privacy.html` with a visible "Draft – needs review before publishing" banner. Covers controller (Chameleon Brands Ltd, company no., registered office, ICO registration ZC276789), what the form/email/Google Calendar booking collect, lawful basis, Netlify and Google as processors, transfers, rights, ICO complaint (ico.org.uk), no tracking cookies. Still needs: retention period, email provider, any CRM used, transfer mechanism, whether enquirers get marketing emails, "last updated" date, and a legal/data-protection review. Linked under the form and in every footer. The footer link that said "How we handle your data" now says "How we handle client project data", and Q3 points personal-data questions to the privacy policy. |
| Testimonials unattributed | **Resolved by owner – no change.** Existing testimonials kept exactly as they were; attribution placeholders removed. |
| Two named case studies and client logos | **Resolved by owner – not added.** Existing case studies are the latest; slots removed. |

### Medium
| Item | Status |
|------|--------|
| £7m stat wording | **Done.** Owner confirmed it is a fee. Both places (home and use cases) read "£1m a year in fees, delivered consistently for 7 years". The existing case study text ("1 client per year @ £1m GP") is kept exactly as on the live site. |
| Founder page | **Done + Placeholder.** "Jane Heath" in full (lead, image alt, tag, title), LinkedIn changed from `es.linkedin.com` to `www.linkedin.com/in/jane-heath`, Person JSON-LD added. Parliamentary Review "Recognition" section kept as on the original site (owner correction); no article link or link placeholder. Placeholder left: year HCA was founded. |
| FAQPage schema on questions.html | **Done.** Built from the nine on-page questions and answers. |
| Home title | **Done.** "HCA \| Agency new business consultancy for an AI-first world". Other titles now "Page \| HCA". |
| Plausible | **Done (commented out).** Snippet in every page head, commented out, with a TODO to add the domain in Plausible and mention it in privacy.html. |
| Form fallback | **Done.** Removed the JS submit handler that opened the mail client and a new booking tab at the same time. The form is now a plain Netlify POST (`name="contact"`, `data-netlify`, honeypot, `form-name`) to `thanks.html`; the email address is only a visible mailto link next to the button. `thanks.html` now has a "Choose a time for your free hour" button (the existing Google Calendar link), so "Send & choose a time" still holds. **Owner:** send a test enquiry after deploying and check it arrives in Netlify Forms / email notifications. (The form cannot submit inside the Artifact preview – it only works on Netlify.) |

### Low
| Item | Status |
|------|--------|
| "Kick-arse GTM gurus" | **Done.** Now "seasoned go-to-market (GTM) specialists". |
| Self-host fonts | **Done.** Bricolage Grotesque, Hanken Grotesk and Space Mono (Latin + Latin Extended subsets, woff2, SIL OFL) downloaded to `assets/fonts/`, declared in `assets/fonts.css`; Google Fonts links removed from every page; the two main faces are preloaded; long cache header added in `netlify.toml`. |
| Duplicate year script | **Done.** Second copy removed from index.html. |
| Archive video | **Not possible here.** The video file still contains personal names/phone numbers from about 24s; the on-page cover bar only hides them in the player. Needs re-editing of the file itself (TODO comment added next to the `<video>`). |
| Insights section | **Done (stub) + Placeholder.** New `insights.html` "coming soon" page, linked in the nav (as an optional item, like Questions) and footer, in the sitemap. Needs the first article titles. |

## Artifact preview notes
- `assets/video/hca-archive.mp4` (14 MB) is **left out of the Artifact** (over the ~10 MB limit in the brief). The reference stays in index.html and the file is unchanged in this folder, so the archive video player will not play in the preview but will on the live site.
- Everything else (pages, CSS, JS, images, fonts, robots.txt, sitemap.xml, netlify.toml) is in the Artifact at the same relative paths.

## Files changed / added
- Changed: `index.html`, `services.html`, `use-cases.html`, `how-we-work.html`, `founder.html`, `questions.html`, `thanks.html`, `assets/styles.css` (mark.todo rule), `netlify.toml` (font cache header, comment).
- Added: `privacy.html`, `insights.html`, `404.html`, `robots.txt`, `sitemap.xml`, `assets/fonts.css`, `assets/fonts/*.woff2`, `CHANGES.md`.
- Unchanged: `assets/main.js`, `assets/hca-ai.css`, images, favicons, video.

## Owner decisions applied (OWNER-DECISIONS.md, 2026-11-16)
- **Phone removed:** 07775 898475 / `tel:` link taken out of every footer (all 10 pages), the `telephone` field in the home JSON-LD, and "or call us" in privacy.html. The optional phone field on the enquiry form stays.
- **£7m stat:** worded as a fee in both places; TODOs removed.
- **Testimonials / case studies:** the six attribution placeholders, the "Named case studies" block (two slots) and the client-logo slot removed from the home page. Existing quotes and case studies unchanged.
- **Parliamentary Review (owner correction):** the "Recognition" section on founder.html is restored exactly as in the original (quote, paragraph and its "A free hour, no strings" button). Only the article-link placeholder I had added is removed; the original had no article link. Nothing in `sameAs`.
- **ICO:** the ICO-number placeholder removed; privacy.html now says "Chameleon Brands Ltd is registered with the Information Commissioner's Office (registration number ZC276789)." Complaint wording (ico.org.uk) kept.
- **Co-founders (owner correction):** founder.html now says Jane Heath "co-founded" HCA (meta/og description, body, title "Jane Heath, co-founder | HCA", portrait alt "Portrait of Jane Heath, co-founder of HCA", image tag, Person `jobTitle`). Home JSON-LD lists Jane Heath and Alan Cotton as founders; the TODO about it is removed. No new copy about Alan.
- **Prices / photos:** HCA had no price or photo placeholders; nothing to change.

## Placeholders still open
- founder.html: year HCA was founded.
- privacy.html: "last updated" date, marketing-email basis, email provider, CRM, international transfer mechanism, retention period; plus a legal review of the draft.
- insights.html: first article titles and dates.
- HTML comments only (not visible): Plausible switch-on; archive video re-edit.
