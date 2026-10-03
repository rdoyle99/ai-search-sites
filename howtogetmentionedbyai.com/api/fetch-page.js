// Fetches one public page and its robots.txt for the AI Visibility Checker, so the browser can score a URL
// without CORS. Public http(s) only: private, loopback and link-local addresses are refused at every redirect
// hop, HTML only, 2 MB cap, 9 s budget. Nothing is stored.
import dns from 'node:dns/promises';
import net from 'node:net';

const UA = 'Mozilla/5.0 (compatible; AIVisibilityChecker/1.0; +https://howtogetmentionedbyai.com/tools/ai-visibility-checker/)';
const MAX = 2_000_000;

function privateIp(ip) {
  if (net.isIPv4(ip)) {
    const [a, b] = ip.split('.').map(Number);
    return a === 10 || a === 127 || a === 0 || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) || (a === 100 && b >= 64 && b <= 127) || a >= 224;
  }
  const v = ip.toLowerCase();
  if (v.startsWith('::ffff:')) return privateIp(v.slice(7));
  return v === '::1' || v === '::' || v.startsWith('fc') || v.startsWith('fd') || v.startsWith('fe80');
}

async function safeUrl(raw) {
  let u;
  try { u = new URL(raw); } catch { return null; }
  if (!/^https?:$/.test(u.protocol) || u.username || u.password) return null;
  if (u.port && !['80', '443'].includes(u.port)) return null;
  const host = u.hostname.replace(/^\[|\]$/g, '');
  const ips = net.isIP(host) ? [host] : (await dns.lookup(host, { all: true }).catch(() => [])).map((x) => x.address);
  if (!ips.length || ips.some(privateIp)) return null;
  return u;
}

async function fetchCapped(raw, deadline, accept) {
  let url = raw;
  for (let hop = 0; hop < 5; hop++) {
    const u = await safeUrl(url);
    if (!u) return { error: 'That address is not a public web page.' };
    const left = deadline - Date.now();
    if (left < 500) return { error: 'The page took too long to answer.' };
    const ac = new AbortController();
    const t = setTimeout(() => ac.abort(), left);
    let r;
    try {
      r = await fetch(u, { redirect: 'manual', signal: ac.signal, headers: { 'user-agent': UA, accept } });
    } catch {
      clearTimeout(t);
      return { error: 'Could not reach that page.' };
    }
    if (r.status >= 300 && r.status < 400 && r.headers.get('location')) {
      clearTimeout(t);
      url = new URL(r.headers.get('location'), u).href;
      continue;
    }
    const reader = r.body?.getReader();
    const chunks = [];
    let size = 0;
    try {
      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;
        size += value.length;
        if (size > MAX) { await reader.cancel(); break; }
        chunks.push(value);
      }
    } catch { /* keep what arrived */ }
    clearTimeout(t);
    const body = new TextDecoder().decode(Buffer.concat(chunks.map((c) => Buffer.from(c))));
    return { status: r.status, url: u.href, type: r.headers.get('content-type') || '', xRobots: r.headers.get('x-robots-tag') || '', body };
  }
  return { error: 'Too many redirects.' };
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const raw = String((req.query && req.query.url) || '').trim();
  if (!raw || raw.length > 2048) return res.status(400).json({ error: 'Enter a full URL, starting with https://' });
  const deadline = Date.now() + 9000;
  const page = await fetchCapped(/^https?:\/\//i.test(raw) ? raw : 'https://' + raw, deadline, 'text/html,application/xhtml+xml');
  if (page.error) return res.status(422).json({ error: page.error });
  if (!/html|xml/i.test(page.type)) return res.status(422).json({ error: `That URL returned ${page.type || 'no content type'}, not a web page.` });
  if (page.status >= 400) return res.status(422).json({ error: `That page answered with HTTP ${page.status} to our checker. If it blocks bots, AI crawlers may be blocked too. Paste the HTML instead.` });
  let robots = null;
  const rb = await fetchCapped(new URL('/robots.txt', page.url).href, Math.min(deadline + 3000, Date.now() + 4000), 'text/plain');
  if (!rb.error) robots = rb.status === 200 && !/<html/i.test(rb.body.slice(0, 500)) ? rb.body.slice(0, 200_000) : rb.status >= 400 && rb.status < 500 ? '' : null;
  return res.status(200).json({ url: page.url, status: page.status, xRobots: page.xRobots, html: page.body, robots });
}
