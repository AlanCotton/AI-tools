// Vercel Function: emails Get in touch enquiries to Grow Savvy via Resend.
//
// Environment variables (Vercel project settings):
//   RESEND_API_KEY  required  API key from resend.com
//   CONTACT_TO      optional  where enquiries go (default hello@grow-savvy.com)
//   CONTACT_FROM    optional  sender; must be on a domain verified in Resend
//                             (default "Grow Savvy website <onboarding@resend.dev>",
//                             which Resend only delivers to the account owner's address)

const LIMITS = { name: 256, phone: 256, email: 256, message: 5000 };

function clean(value, max) {
  return String(value == null ? '' : value).trim().slice(0, max);
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  let raw = typeof req.body === 'string' ? req.body : '';
  if (!raw) {
    for await (const chunk of req) raw += chunk;
  }
  const type = String(req.headers['content-type'] || '');
  if (type.includes('application/json')) {
    try { return JSON.parse(raw || '{}'); } catch { return {}; }
  }
  return Object.fromEntries(new URLSearchParams(raw));
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const body = await readBody(req);

  // Honeypot: real visitors never fill this in. Pretend success so bots move on.
  if (clean(body['bot-field'], 256)) return res.status(200).json({ ok: true });

  const name = clean(body.name, LIMITS.name);
  const phone = clean(body.phone, LIMITS.phone);
  const email = clean(body.email, LIMITS.email);
  const message = clean(body.message, LIMITS.message);

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ ok: false, error: 'Please enter a valid email address.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set');
    return res.status(500).json({ ok: false, error: 'Email is not configured.' });
  }

  const to = process.env.CONTACT_TO || 'hello@grow-savvy.com';
  const from = process.env.CONTACT_FROM || 'Grow Savvy website <onboarding@resend.dev>';

  const text = [
    'New enquiry from the Grow Savvy website',
    '',
    `Name: ${name || '-'}`,
    `Email: ${email}`,
    `Phone: ${phone || '-'}`,
    '',
    message || '(no message)',
  ].join('\n');

  const html = `
    <h2 style="font-family:sans-serif;">New enquiry from the Grow Savvy website</h2>
    <table style="font-family:sans-serif;font-size:15px;border-collapse:collapse;">
      <tr><td style="padding:4px 12px 4px 0;color:#666;">Name</td><td>${escapeHtml(name || '-')}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#666;">Email</td><td>${escapeHtml(email)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#666;">Phone</td><td>${escapeHtml(phone || '-')}</td></tr>
    </table>
    <p style="font-family:sans-serif;font-size:15px;white-space:pre-wrap;">${escapeHtml(message || '(no message)')}</p>`;

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Website enquiry from ${name || email}`,
        text,
        html,
      }),
    });
    if (!r.ok) {
      console.error('Resend error', r.status, await r.text());
      return res.status(502).json({ ok: false, error: 'Could not send right now.' });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Resend request failed', err);
    return res.status(502).json({ ok: false, error: 'Could not send right now.' });
  }
};
