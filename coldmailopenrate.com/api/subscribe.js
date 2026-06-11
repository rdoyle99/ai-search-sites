// Shared subscribe endpoint for the ai-search-sites network.
// Inserts into the portfolio-wide Supabase email_subscribers table (source = site hostname).
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, source } = req.body || {};
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'A valid email is required' });
  }
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) return res.status(500).json({ error: 'Not configured' });

  const r = await fetch(`${url}/rest/v1/email_subscribers`, {
    method: 'POST',
    headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
    body: JSON.stringify({ email, source: source || 'aisearch' }),
  });
  // 409 = duplicate email; treat as success for the subscriber
  if (!r.ok && r.status !== 409) return res.status(500).json({ error: 'Insert failed' });
  return res.status(200).json({});
}
