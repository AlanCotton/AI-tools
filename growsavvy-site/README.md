# Grow Savvy website

Static site (HTML/CSS/JS) hosted on Vercel, with one Vercel Function for the contact form.

- `index.html`, `what-we-do.html`, `what-weve-done.html`, `why-choose-us.html`, `who-we-are.html`, `privacy-policy.html`, `404.html`
- `api/contact.js` emails Get in touch enquiries through [Resend](https://resend.com).

## Contact form setup

Set these in the Vercel project (Settings, Environment Variables), then redeploy:

| Variable | Required | Value |
| --- | --- | --- |
| `RESEND_API_KEY` | yes | API key from resend.com |
| `CONTACT_TO` | no | Inbox for enquiries (default `hello@grow-savvy.com`) |
| `CONTACT_FROM` | no | Sender, e.g. `Grow Savvy website <website@grow-savvy.com>`; the domain must be verified in Resend. Until it is, the default `onboarding@resend.dev` only delivers to the Resend account owner's email. |

If sending fails, the form falls back to opening a pre-filled email to hello@grow-savvy.com.
