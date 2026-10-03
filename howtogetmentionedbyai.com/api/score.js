// Scores one URL server-side with the same rules as the checker page and returns JSON, for scripts and agents:
// GET /api/score?url=https://example.com/page. Nothing is stored.
import { parseHTML } from 'linkedom';
import { getPage } from './_lib/page.js';
import { extractHtml, score, robotsAllows, AI_BOTS } from '../src/lib/geo-score.js';
import study from '../src/data/cited-study.json' with { type: 'json' };

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Access-Control-Allow-Origin', '*');
  const raw = String((req.query && req.query.url) || '').trim();
  if (!raw || raw.length > 2048) return res.status(400).json({ error: 'Pass ?url=https://...' });
  const p = await getPage(raw);
  if (p.error) return res.status(422).json(p);
  const { document } = parseHTML(p.html);
  const path = new URL(p.url).pathname;
  const ctx = { xRobots: p.xRobots, robots: Object.fromEntries(AI_BOTS.map((b) => [b.ua, robotsAllows(p.robots, b.ua, path)])) };
  const r = score(extractHtml(document), ctx);
  return res.status(200).json({
    url: p.url, score: r.score, band: r.band, words: r.words,
    cited: { median: study.median, p25: study.p25, p75: study.p75, n: study.scored, to: study.to },
    checks: r.checks.map(({ id, name, status, points, weight, found, fix, gap }) => ({ id, name, status, points, weight, gap: Math.round(gap * 10) / 10, found, fix, citedPass: study.strong[id] })),
  });
}
