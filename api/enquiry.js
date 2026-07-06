/**
 * Vercel serverless port of POST /api/enquiry — same validation as the
 * local Express server (server/lib/enquiry.js). Serverless filesystems are
 * ephemeral, so the entry goes to the function log; wire it to a mailbox,
 * a sheet or a CRM when the studio gets one.
 */
import { validateEnquiry } from '../server/lib/enquiry.js';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Off the map.' });
  }

  const { errors, entry } = validateEnquiry(req.body);
  if (errors) {
    return res.status(422).json({ ok: false, errors });
  }

  console.log(`Enquiry ${entry.id} — ${entry.name} <${entry.email}> re: ${entry.expedition}`);
  return res.status(201).json({ ok: true, id: entry.id });
}
