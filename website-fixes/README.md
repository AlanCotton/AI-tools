# Website fixes – Chameleon Brands group

These files go with the website review from 14 November 2026. They cover items 1, 2, 3, 4 and 6 of the priority list. Items 5 (Vive Libre fee statement) and 7 (named testimonials) were left out on purpose.

Of the seven sites, only The Taylor has its source code in GitHub. Its changes are on branch `claude/gifted-bardeen-guokjk` of `thetaylorai/thetaylor.ai-website`. The HCA and Growth-knowhow repos are empty, and the hub, Grow Savvy, Hummingbird and Vive Libre are deployed to Netlify with no repo behind them. For those six sites, this folder holds files to drop into the site folder (or paste in) before you next deploy.

## What to do, site by site

### chameleon-brands.com (Netlify: `chameleonbrands`)
- Replace `index.html` with `chameleon-brands/index.html`. This is the same page with React (development build), in-browser Babel and the design "tweaks panel" taken out. The page goes from about 124 KB of HTML plus several MB of scripts to 14 KB. Other changes:
  - The motto is now the page's H1.
  - Social sharing tags and canonical are added, with an absolute share image.
  - Company schema (JSON-LD) is added.
  - The legal line is added to the footer.
  - A bug is fixed: the tweaks script forced three columns on phones, which overrode the stylesheet's one-column mobile layout.
- On the six brand sub-pages (`grow-savvy.html`, `hca.html` and so on), delete the same lines just before `</body>`:
  - `<div id="tweaks-root"></div>`
  - the three `unpkg.com` script tags (react, react-dom, babel)
  - the two `type="text/babel"` script tags (`tweaks-panel.jsx`, `tweaks.jsx`)
- On `hca.html`, change the meta description from "Two decades" to "Three decades".
- On `thetaylor.html`, change "made in the UK" to wording that matches the privacy policy, for example "UK company, European team".
- Add `robots.txt` and `sitemap.xml` to the site root.

### grow-savvy.com (Netlify: `growsavvy`)
- Add `robots.txt` and `sitemap.xml` to the site root.
- Paste `grow-savvy/head-snippet.html` into `<head>`. Remove the existing `<title>` and description first so they aren't duplicated.
- Paste `footer-legal-snippet.html` into the footer, with BRAND = Grow Savvy.

### hummingbirdconsultancy.com (Netlify: `hummingbirdconsultancy`)
- Add `hummingbird/privacy.html` to the site as `privacy.html`. Netlify serves it at `/privacy`. Link it in the footer and next to the form button.
- Paste `hummingbird/head-snippet.html` into `<head>`. The page currently has no title or description at all.
- Change `<html>` to `<html lang="en-GB">`.
- Paste the footer legal line, with BRAND = Hummingbird Consultancy.
- Add `robots.txt` and `sitemap.xml`.
- **Check:** the policy assumes Hummingbird trades through Chameleon Brands Ltd, as the other brands do. If it doesn't, change the "Who we are" section and the footer line.

### growth-knowhow.com (Netlify: `growthknowhow`)
- Add `robots.txt` and `sitemap.xml`. Paste the head snippet into `<head>` and the footer legal line into the footer, with BRAND = Growth KnowHow.

### hca.uk.com (Netlify: `hcaai`)
- Add `hca/privacy.html` as `privacy.html`. Point the footer link to `/privacy` (it currently goes to `/questions#q3`), and add a line under the form: "We'll use these details to reply. See our privacy policy."
- Add `robots.txt` and `sitemap.xml`, and paste the head snippet. The footer already has the legal line.

### vivelibrespain.com (Netlify: `vivelibre`)
- Add `robots.txt` and `sitemap.xml`. Paste the head snippet; its schema uses `RealEstateAgent` with the towns you serve.

### thetaylor.ai (Vercel, GitHub)
- Done on branch `claude/gifted-bardeen-guokjk`:
  - `robots.txt`
  - `sitemap.xml` (17 pages; the noindexed `/cases/*` pages are left out)
  - canonical URLs, sent as HTTP `Link` headers in `vercel.json`
- The pages are generated outside the repo (see its README), so the social sharing tags and schema must be added in the generator, or they will be overwritten. Merge the branch into `main` to put the rest live.

## After deploying
- Submit each `sitemap.xml` in Google Search Console.
- Check a few pages in LinkedIn's Post Inspector to see the new share previews.

## Item 3: do the forms work?
I checked the Netlify form records for every site:

| Site | Form registered | Submissions recorded | Most recent |
|---|---|---|---|
| Grow Savvy | yes (`contact`) | 1 | 13 Nov 2026 |
| Growth KnowHow | yes (`contact`) | 1 | 14 Nov 2026 |
| HCA | yes (`contact`) | 2 | 10 Nov 2026 |
| Hummingbird | yes (`contact`) | 0 kept* | 13 Nov 2026 |
| Vive Libre | yes (`discovery-call`) | 0 kept* | 10 Nov 2026 |
| The Taylor | no form (email and booking link only) | – | – |

\*A recent submission was received but none is kept in the count. Those were probably marked as spam or deleted. Look in the "Spam" tab under Forms in Netlify, and make sure form notifications are set to email you.

In the review I worried the Grow Savvy form might not be wired up. It is: Netlify detects it and has received submissions.
