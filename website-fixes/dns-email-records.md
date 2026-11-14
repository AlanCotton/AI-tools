# Email DNS records to set up in Spaceship

Checked 14 November 2026. These are the **live** records, read from Netlify DNS (NS1), which currently hosts all eight domains. Each section lists what to **add** in Spaceship (Domains → domain → DNS records → Custom records) and what to **delete**, because Spaceship holds some old records from Squarespace and Cloudflare.

Nothing here takes effect until a domain's nameservers are switched from `dnsX.pXX.nsone.net` to Spaceship's (`launch1.spaceship.net` / `launch2.spaceship.net`). That switch moves the **whole** domain, website included, so add the web records at the end of this file first.

TTL 3600 is fine for everything. Copy the DKIM keys exactly, with no spaces or line breaks.

---

## chameleon-brands.com
**Delete (old, not in use):**
- all 5 `aspmx`/`altN.aspmx` MX records
- A `@` 198.185.159.144 and 198.185.159.145 (Squarespace)
- CNAME `www` → ext-cust.squarespace.com
- TXT `@` `v=spf1 include:_spf.google.com include:_spf.smtp.com ~all`
- TXT `google._domainkey` (the short `MIGfMA0…` key)
- CNAME `_domainconnect`

**Keep:** TXT `_dmarc` and TXT `@` google-site-verification=_BSiF3a…

**Add:**
| Host | Type | Priority | Value |
|---|---|---|---|
| @ | MX | 1 | smtp.google.com |
| @ | TXT | | v=spf1 include:_spf.google.com ~all |
| google._domainkey | TXT | | v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmuRihwp28DK/PZ7QW1gnDrQd88M49+yWy8ZCLHQfInVFmHh/ZJydhxp0E3Eh7Tosz0UHxbHEatJ0/rQ5O8mZuTMSH/Z9xr45b64Ey/3JTZN6/Q4zCCZgZzO3xqtAmAkREIApSRqJoIPX/Qc3ZXVLZlMTyGgnB0a2V6+cdzpXvdAEuPAOjxBXMwE1p/DIOYnQydVuCUkUKZqsGNKwJtVqqAzFL3Wg+2gu2LqBHJV4RgUtptqVF75TZwIo1Bg7iV2UP71ao4y3jKdb+YFKFExuEZIEMbcxxd8K5zsmQS93g6Ct+VVhReChG5pfa8KGUEX79fTVu7I9UhmEYOvnDA79cwIDAQAB |

## grow-savvy.com
Spaceship has no records for this domain. **Add:**
| Host | Type | Priority | Value |
|---|---|---|---|
| @ | MX | 1 | smtp.google.com |
| @ | TXT | | v=spf1 include:_spf.google.com ~all |
| google._domainkey | TXT | | v=DKIM1;k=rsa;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAq/2OP+49HthkG9zXJm09fKSHz3WEcZXTLHwPp9z/4mfwluoMKUWEXT5uUr4/EMIBLTRzVLVSE8pT/tVZHptv4r6lpegaLu027zDJJrtSfKomYmeYXLGVWHJLOG2NLB0QUxG2Wz+92Uj637SbFtNtXO1b9BEnqYYSH5qvMeawNkKCMY9OCNDJO8vTK29T6s4wIUveOiYqb+mQLZS/Ulyvo3moJzu7+k6+gsv9n8LbAE35EJcQrTol9RSA9fHyr7xf+OSj016CMhyy8N6P1OI713wSAiPT0wD9FF0ZB+5feQsr/sfGSK3PptGIGo5hki2FQH/+qrRlAfQ/znAnfsI0owIDAQAB |
| _dmarc | TXT | | v=DMARC1; p=none; rua=mailto:alan@chameleon-brands.com |

## growth-knowhow.com
**Keep:** MX `smtp.google.com`, TXT SPF, TXT google-site-verification (all already correct in Spaceship).

**Add:**
| Host | Type | Priority | Value |
|---|---|---|---|
| google._domainkey | TXT | | v=DKIM1;k=rsa;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtMqDb7HOxZoJBkuym3PVMClcgeyc7MDO4ii5QQ4lRGJUeBwx8NEWAZ4yWShDPg4osO+de+BqHHBE8NbHMJ2ZYBt+bVELS8xDUTxecchNkyj2bfLzgfXNSqpFZs0OUeHkht+VJyQMbgcZc3UXvPDG/hEzkzalgoQCG6zq7+rOg7+lsQypRUoTFFHw6RPNU825GU+cCF5LRr/yKM+5ShH6S0B4Bkd7DtGIBCv2ALk8ar2EQspmBQkn8u/a8XqFA9gCBD09tJV+OULU5JxEP7GRQvX9gwpzQTX2xbxqLGkEEfsSKb0edrukk3XGz8ms9saLBuX6N4MZKOVeafDpAjRqMwIDAQAB |
| _dmarc | TXT | | v=DMARC1; p=none; rua=mailto:alan@chameleon-brands.com |

## growthknowhow.co
**Delete:**
- TXT `_dmarc` (it holds a google-site-verification string in the wrong place)
- A `@` 198.185.159.144, 198.185.159.145, 198.49.23.144 and 198.49.23.145 (Squarespace)
- CNAME `www` → ext-cust.squarespace.com

**Add:**
| Host | Type | Priority | Value |
|---|---|---|---|
| @ | MX | 1 | smtp.google.com |
| @ | TXT | | google-site-verification=kwyZjNacctpGNGX-ijqNwdUGBjM7hy2ZS9Ti4_1zWqY |
| @ | TXT | | v=spf1 include:_spf.google.com ~all ← **new**: this domain has never had an SPF record |
| google._domainkey | TXT | | v=DKIM1;k=rsa;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4Yvjt0Lr+qKrdy3+RIj2FtRxgxh2w+rxaf7naWq2Edn3g8PYHS82JafgeCTynYX83RtVEXRVcV++768YJDmEFq4pwcw4G4Vdduc0P02An0g39YzRVCrewI9O6JYq/nxvwAJNWmoTMjy0vJ0/mNeKok3EAI5AlSyig1IbV/H504awsIXayJ6bu7HyOAVCw046CMphZ+71sefliLJfwmywQ3VT97mhFgOsknAJdqFLWWyBYdJKE5lSW1kOwxnhp8FJ6+MrSvt5FmNRWI8ujj33rehW0gss8JU83K7FaPk8Ijz8kMefThzrnBGtlIxmGFAewFtDhddxt46iQpEn+Mp69QIDAQAB |
| _dmarc | TXT | | v=DMARC1; p=none; rua=mailto:alan@chameleon-brands.com |

## hca.uk.com
**Delete (old):**
- TXT `@` `v=spf1 include:_spf.google.com include:_spf.smtp.com ~all`
- TXT `google._domainkey` (old key)
- A `mail` and A `webmail` → 88.202.253.232
- all three HTTPS records (`@`, `www`, `www2`, left over from Cloudflare)
- TXT `_domainconnect`
- A `@` 75.2.60.5 (replace it with the web records below)

**Keep:** the 5 Google MX records (aspmx / alt1–alt4) and TXT google-site-verification=fg3N…

**Add:**
| Host | Type | Priority | Value |
|---|---|---|---|
| @ | TXT | | v=spf1 include:_spf.google.com ~all |
| google._domainkey | TXT | | v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAv4Z8d/0hrOb5UAf/GdfXLDm+Qn6V/5xYzzprvWbFXOgCchgxRxbzQf/WhKhojYwE8nS5I8BN/O1kgegpFineNUrTjQ7IO50U+kZtaaQWXrHB3cnuc/8WLgw1hnF0U3NWedLcxqenXE9WNjvqkG8gOB6iLPAgz+XcFWaVw0FdF1VzeW2SJl0XF9tk2qeWOxGeERTUpQ+IXH/6G4IM92eXc4kSyB7JBKpAVJg9Gr/2l+65W5Ex7+70ZM9Eq+ZFcpBw94c3kJQP/Fhd43E/WPzrq7bqxlGv3JaeHONDvFe5myC7rvOiIwUSamm8xJ/DsVxQ9KD71guX9G/HLloyAgiJowIDAQAB |
| _dmarc | TXT | | v=DMARC1; p=none; rua=mailto:alan@chameleon-brands.com |

## hummingbirdconsultancy.com ⚠️
**The live domain has no email records at all**: no MX, SPF or DKIM. The website shows jane@hummingbirdconsultancy.com, so mail sent to that address is probably bouncing today. Spaceship holds the Google setup records, but they have never been live because the domain's nameservers point to Netlify. To fix it now, without waiting for the move, add the MX record below in **Netlify DNS** today.

**Keep in Spaceship:** MX `smtp.google.com` (priority 0 is fine), TXT google-site-verification=G5p6…, CNAME `2pvhjsa332bk` → gv-v5nrrxqxslahck.dv.googlehosted.com

**Add:**
| Host | Type | Priority | Value |
|---|---|---|---|
| @ | TXT | | v=spf1 include:_spf.google.com ~all |
| _dmarc | TXT | | v=DMARC1; p=none; rua=mailto:alan@chameleon-brands.com |
| google._domainkey | TXT | | *create it first: Google Admin → Apps → Google Workspace → Gmail → Authenticate email → choose this domain → Generate new record, then paste the value here* |

## thetaylor.ai
Spaceship has no records for this domain. **Add**, including the web records, because the site is already on Vercel:
| Host | Type | Priority | Value |
|---|---|---|---|
| @ | MX | 1 | smtp.google.com |
| @ | TXT | | v=spf1 include:_spf.google.com ~all |
| @ | TXT | | google-site-verification=Q31d0W_PKMIy5pr4eHkccp0PnOOyJ1a-7AiH2cYWeng |
| google._domainkey | TXT | | v=DKIM1;k=rsa;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwn9rcVKMd3bUUgHs5sBhZiqunDjLlBrRqMz7h+XRyDjkS0aII0LCVfp+V96ZT1bbIdZBfmumRWgOqTZ6rJTFP3lx8eU1AGB8uRmkHRepBAiFo3DBd+mxfN7RWYm3uodLDrSgcXcx3QqZb3sut6/SdQZREUuII7gsKeALuT3LUMkyDT2bgSoV9Wogr/96xd6LD5M5GKliKdfEHSXqoZ4U0FKIp53hmR3tsuc4EWmQAq3unSfAhpcTly/jLNKCrSDa1YcQ77tMS9bxHk47QbtRMwBuwYIWo7mS5J+9U+DBF9HeLu1xdyW1Uwa/pU3oEyFZfLucc14bmn8iYGBUQWLs3QIDAQAB |
| _dmarc | TXT | | v=DMARC1; p=none; rua=mailto:alan@chameleon-brands.com |
| @ | A | | 216.198.79.1 |
| www | CNAME | | 67cdd547608b7f7b.vercel-dns-017.com |

## vivelibrespain.com
Spaceship has no records for this domain. **Add:**
| Host | Type | Priority | Value |
|---|---|---|---|
| @ | MX | 1 | smtp.google.com |
| @ | TXT | | v=spf1 include:_spf.google.com ~all |
| @ | TXT | | google-site-verification=X4lpnj9BJuRMM8iv-A5dO4fqiSVSNmQT1qRbX9i5Vrw |
| google._domainkey | TXT | | v=DKIM1;k=rsa;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyThYlyzFC8adM90Yxe0z/DJUI2+Jf/K9u2UtBQDXqzNuKAlRbAPXHtXwkH5XGtL1tcIwMb3806AkG4mb2WNJhCgmig+GwVdTIwl0h/hsybhOjpRN958PEbydBDXNrmvRRTctw3XHqYN0FP/3v6u5X0CijLKsrX0KXw3pl9IJu58HhJcN2EQGr49UcS49CDCubQ950Ve0R75GhFBdfw8IuAV6wsRY5RIrBsm1pNesyhM6rATLx4dOFQm9UznoIMZcCDW3y2ui/MfKEpSzl+iSZUXTYbwvCPGIZdBtt0bzCIdl7u1WuZH3epcmFx5X8S8yOEc8Tw9mGrINA7byLiL8cwIDAQAB |
| _dmarc | TXT | | v=DMARC1; p=none; rua=mailto:alan@chameleon-brands.com |

---

## Web records: add these before you switch nameservers
If a site has **not** moved to Vercel yet when you switch its nameservers, point it at Netlify for now:

| Domain | @ (A) | www (CNAME) |
|---|---|---|
| chameleon-brands.com | 75.2.60.5 | chameleonbrands.netlify.app |
| grow-savvy.com | 75.2.60.5 | growsavvy.netlify.app |
| growth-knowhow.com | 75.2.60.5 | growthknowhow.netlify.app |
| hca.uk.com | 75.2.60.5 | hcaai.netlify.app |
| hummingbirdconsultancy.com | 75.2.60.5 | hummingbirdconsultancy.netlify.app |
| vivelibrespain.com | 75.2.60.5 | vivelibre.netlify.app |
| growthknowhow.co | check which Netlify site it's attached to (probably a redirect to growth-knowhow.com) | |

If a site **has** moved to Vercel, use the values Vercel shows for that domain under Project → Settings → Domains instead (as for thetaylor.ai above).

## Order of work
1. Add the records above in Spaceship. This changes nothing live yet.
2. Fix Hummingbird's MX in Netlify DNS today.
3. When a site is ready to move, switch that domain's nameservers to Spaceship basic DNS. Then send yourself a test email and check that the website loads.
4. Once everything works (allow 24–48 hours), remove the domain from Netlify DNS (Netlify → Domains).
