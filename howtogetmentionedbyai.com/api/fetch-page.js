// Fetches one public page and its robots.txt for the AI Visibility Checker, so the browser can score a URL
// without CORS. The fetch rules live in _lib/page.js. Nothing is stored.
import { getPage } from './_lib/page.js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const raw = String((req.query && req.query.url) || '').trim();
  if (!raw || raw.length > 2048) return res.status(400).json({ error: 'Enter a full URL, starting with https://' });
  const r = await getPage(raw);
  return r.error ? res.status(422).json(r) : res.status(200).json(r);
}
