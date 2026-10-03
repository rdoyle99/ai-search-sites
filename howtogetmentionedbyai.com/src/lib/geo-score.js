// AI visibility scorer: pure rules, no network, no AI. Takes a parsed Document (the browser's DOMParser or
// linkedom in Node) or plain text / markdown, and grades the page features AI answer engines lift citations
// from. The same function scores the tool's input and the cited-page study, so the comparison is like for like.

export const AI_BOTS = [
  { ua: 'GPTBot', who: 'OpenAI training' },
  { ua: 'OAI-SearchBot', who: 'ChatGPT search' },
  { ua: 'ChatGPT-User', who: 'ChatGPT browsing' },
  { ua: 'PerplexityBot', who: 'Perplexity' },
  { ua: 'ClaudeBot', who: 'Anthropic' },
  { ua: 'Claude-SearchBot', who: 'Claude search' },
  { ua: 'Google-Extended', who: 'Gemini' },
  { ua: 'Bingbot', who: 'Bing and Copilot' },
];

const FILLER = /^(in today'?s|have you ever|are you|when it comes to|in this (article|post|guide)|welcome to|let'?s (dive|take|talk)|it'?s no secret|imagine|did you know|we all know|in the (ever|fast)|as (we|you) (all )?know)/i;
const BACKREF = /^(this|that|these|those|it|they|as (mentioned|discussed|noted|we saw)|here|so,|also,|additionally|furthermore|moreover)\b/i;
const QWORD = /^(what|how|why|when|where|which|who|whom|whose|is|are|can|could|should|does|do|did|will|would|was|were)\b/i;
const NUM = /(\$\s?\d[\d,.]*|\d[\d,.]*\s?%|\b(19|20)\d{2}\b|\b\d[\d,.]*\b)/g;

const words = (s) => (s.match(/[A-Za-z0-9][A-Za-z0-9'’.-]*/g) || []).length;
const sentences = (s) => s.replace(/\s+/g, ' ').trim().split(/(?<=[.!?])\s+(?=[A-Z0-9"“(])/).filter((x) => words(x) > 0);
const clean = (s) => (s || '').replace(/\s+/g, ' ').trim();
const clamp = (x) => Math.max(0, Math.min(1, x));

// ---------- extraction ----------

export function extractHtml(doc) {
  const head = doc.querySelector('head');
  const title = clean(doc.querySelector('title')?.textContent);
  const meta = clean(doc.querySelector('meta[name="description" i]')?.getAttribute('content'));
  const robotsMeta = clean(doc.querySelector('meta[name="robots" i]')?.getAttribute('content'));
  const schemaTypes = new Set();
  const dates = [];
  for (const s of doc.querySelectorAll('script[type="application/ld+json" i]')) {
    try {
      const walk = (o) => {
        if (!o || typeof o !== 'object') return;
        if (Array.isArray(o)) return o.forEach(walk);
        const t = o['@type'];
        (Array.isArray(t) ? t : t ? [t] : []).forEach((x) => schemaTypes.add(String(x)));
        for (const k of ['dateModified', 'datePublished']) if (typeof o[k] === 'string') dates.push(o[k]);
        Object.values(o).forEach(walk);
      };
      walk(JSON.parse(s.textContent));
    } catch { /* bad JSON-LD counts as none */ }
  }
  for (const m of doc.querySelectorAll('meta[property="article:modified_time"], meta[property="article:published_time"], time[datetime]')) {
    dates.push(m.getAttribute('content') || m.getAttribute('datetime'));
  }
  if (doc.querySelector('[itemtype*="FAQPage" i]')) schemaTypes.add('FAQPage');

  // body content, chrome removed
  // <main> or <article> when it holds the content; streamed pages (Next.js Suspense) ship the text in a hidden div
  // after <main> and move it in with a script, so fall back to the whole body when the landmark is nearly empty.
  const all = doc.body || doc.documentElement;
  const strip = (el) => {
    const c = el.cloneNode(true);
    for (const x of c.querySelectorAll('script,style,noscript,template,svg,nav,footer,header,form,iframe,aside')) x.remove();
    return c;
  };
  const whole = strip(all);
  const land = doc.querySelector('main') || doc.querySelector('article');
  const landRoot = land ? strip(land) : null;
  const root = landRoot && words(landRoot.textContent || '') >= 0.3 * words(whole.textContent || '') ? landRoot : whole;

  const blocks = [];
  for (const el of root.querySelectorAll('h1,h2,h3,h4,h5,h6,p,li,table,dt,dd,blockquote,pre')) {
    const tag = el.tagName.toLowerCase();
    if ((tag === 'p' || tag === 'li') && el.closest('table')) continue;
    if (tag === 'li' && el.parentElement?.closest('li')) continue;
    const text = clean(el.textContent);
    if (!text) continue;
    blocks.push({ tag: tag === 'dt' || tag === 'dd' || tag === 'blockquote' || tag === 'pre' ? 'p' : tag, text });
  }
  const lists = root.querySelectorAll('ul,ol').length;
  const tables = root.querySelectorAll('table').length;
  const details = root.querySelectorAll('details').length;
  const text = clean(root.textContent);
  return { kind: 'html', title, meta, robotsMeta, schemaTypes: [...schemaTypes], dates, blocks, lists, tables, details, text, hasHead: !!head };
}

export function extractText(src) {
  const lines = src.replace(/\r/g, '').split('\n');
  const blocks = [];
  let lists = 0, tables = 0, inList = false, inTable = false, para = [];
  const flush = () => { if (para.length) { blocks.push({ tag: 'p', text: clean(para.join(' ')) }); para = []; } };
  for (const raw of lines) {
    const l = raw.trim();
    const h = l.match(/^(#{1,6})\s+(.*)$/);
    const li = l.match(/^([-*+]|\d+[.)])\s+(.*)$/);
    const tr = /^\|.*\|$/.test(l);
    if (!l) { flush(); inList = false; inTable = false; continue; }
    if (h) { flush(); inList = inTable = false; blocks.push({ tag: 'h' + h[1].length, text: clean(h[2]) }); continue; }
    if (tr) { flush(); if (!inTable) { tables++; inTable = true; } continue; }
    if (li) { flush(); if (!inList) { lists++; inList = true; } blocks.push({ tag: 'li', text: clean(li[2]) }); continue; }
    inList = inTable = false;
    para.push(l);
  }
  flush();
  return { kind: 'text', title: '', meta: '', robotsMeta: '', schemaTypes: [], dates: [], blocks, lists, tables, details: 0, text: clean(src) };
}

export function looksLikeHtml(s) {
  return /<\s*(html|head|body|p|div|h[1-6]|article|main|section)\b/i.test(s);
}

// ---------- scoring ----------

function sectionsOf(blocks) {
  const out = [];
  let cur = null;
  for (const b of blocks) {
    if (/^h[1-6]$/.test(b.tag)) { cur = { heading: b, body: [] }; out.push(cur); continue; }
    if (!cur) { cur = { heading: null, body: [] }; out.push(cur); }
    cur.body.push(b);
  }
  return out.filter((s) => s.body.some((b) => b.tag === 'p' || b.tag === 'li'));
}

const firstSentence = (sec) => {
  const p = sec.body.find((b) => b.tag === 'p' && words(b.text) >= 4) || sec.body[0];
  return p ? (sentences(p.text)[0] || p.text) : '';
};

// ctx (URL mode only): { rawWords, robots: {UA: true|false|null}, xRobots, status }
export function score(x, ctx = null) {
  const checks = [];
  const add = (c) => checks.push(c);
  const isHtml = x.kind === 'html';
  const totalWords = words(x.text);
  const heads = x.blocks.filter((b) => /^h[1-6]$/.test(b.tag));
  const h1s = heads.filter((b) => b.tag === 'h1');
  const subs = heads.filter((b) => b.tag === 'h2' || b.tag === 'h3');
  const paras = x.blocks.filter((b) => b.tag === 'p' && words(b.text) >= 4);
  const secs = sectionsOf(x.blocks);

  // 1. AI crawlers allowed (URL mode)
  if (ctx?.robots) {
    const entries = AI_BOTS.map((b) => ({ ...b, ok: ctx.robots[b.ua] }));
    const known = entries.filter((e) => e.ok !== null && e.ok !== undefined);
    const blocked = entries.filter((e) => e.ok === false);
    const noindex = /noindex/i.test(x.robotsMeta || '') || /noindex/i.test(ctx.xRobots || '');
    const v = noindex ? 0 : known.length ? known.filter((e) => e.ok).length / known.length : 1;
    add({
      id: 'crawlers', name: 'AI crawlers can reach the page', weight: 12, value: v,
      found: noindex ? 'The page carries noindex, so search-based AI answers cannot use it.'
        : blocked.length ? `robots.txt blocks ${blocked.map((b) => b.ua).join(', ')}.` : `robots.txt allows all ${entries.length} AI and search crawlers we check.`,
      fix: noindex ? 'Remove noindex from the meta robots tag or X-Robots-Tag header.'
        : blocked.length ? `Allow ${blocked.map((b) => b.ua).join(', ')} in robots.txt. A blocked crawler cannot quote you.` : 'Keep it that way after redesigns and CDN bot rules.',
      bots: entries,
    });
  }

  // 2. Text in the raw HTML (URL or pasted HTML)
  if (isHtml) {
    const raw = ctx?.rawWords ?? totalWords;
    const v = raw >= 300 ? 1 : raw >= 120 ? 0.5 : 0;
    add({
      id: 'raw', name: 'Content readable without JavaScript', weight: 12, value: v,
      found: `${raw.toLocaleString('en-US')} words of body text in the HTML as served.`,
      fix: v === 1 ? 'Good. Most AI crawlers read the HTML without running scripts.' : 'Render the article on the server (SSR or static). Most AI crawlers do not run JavaScript, so a client-rendered page looks empty to them.',
    });
  }

  // 3. Answer-first opening
  {
    const intro = paras[0]?.text || '';
    const s1 = sentences(intro)[0] || intro;
    const introOk = intro && words(s1) <= 30 && !FILLER.test(s1);
    const fs = secs.map(firstSentence).filter(Boolean);
    const direct = fs.filter((s) => words(s) <= 28 && !FILLER.test(s)).length;
    const frac = fs.length ? direct / fs.length : 0;
    const v = clamp((introOk ? 0.5 : 0) + 0.5 * frac);
    add({
      id: 'answer', name: 'Answer-first openings', weight: 14, value: v,
      found: `${introOk ? 'The opening sentence answers directly' : intro ? `The opening sentence is ${words(s1)} words${FILLER.test(s1) ? ' and starts with filler' : ''}` : 'No opening paragraph found'}; ${direct} of ${fs.length} sections open with a short, direct sentence.`,
      fix: 'Put the answer in the first sentence under each heading, in 25 words or fewer. Move scene-setting below it.',
      example: !introOk && s1 ? s1.slice(0, 160) : null,
    });
  }

  // 4. Sections that stand alone
  {
    const fs = secs.filter((s) => s.heading).map(firstSentence).filter(Boolean);
    const lean = fs.filter((s) => BACKREF.test(s));
    const v = fs.length ? 1 - lean.length / fs.length : 0.5;
    add({
      id: 'standalone', name: 'Sections that stand alone', weight: 8, value: v,
      found: fs.length ? `${lean.length} of ${fs.length} sections open by pointing back ("This", "It", "As mentioned").` : 'No headed sections to check.',
      fix: 'Engines lift one section at a time. Name the subject in each section\'s first sentence so it makes sense quoted alone.',
      example: lean[0] ? lean[0].slice(0, 160) : null,
    });
  }

  // 5. Question-style headings
  {
    const q = subs.filter((h) => /\?\s*$/.test(h.text) || QWORD.test(h.text));
    const frac = subs.length ? q.length / subs.length : 0;
    const v = clamp(frac / 0.4);
    add({
      id: 'questions', name: 'Headings phrased as questions', weight: 5, value: v,
      found: `${q.length} of ${subs.length} H2/H3 headings read as a question someone would ask.`,
      fix: 'Rewrite 40% or more of your H2s as the questions buyers type ("How much does X cost?"), then answer each right below.',
    });
  }

  // 6. FAQ block
  {
    const faqSchema = x.schemaTypes.some((t) => /^(FAQPage|QAPage)$/i.test(t));
    const qa = secs.filter((s) => s.heading && /\?\s*$/.test(s.heading.text) && words(firstSentence(s)) <= 40).length;
    const v = faqSchema ? 1 : qa >= 3 || x.details >= 3 ? 0.6 : qa >= 1 ? 0.3 : 0;
    add({
      id: 'faq', name: 'FAQ or Q&A block', weight: 5, value: v,
      found: faqSchema ? 'FAQPage schema found.' : `${qa} question headings with a short answer below${x.details ? `, ${x.details} expandable details` : ''}; no FAQPage schema.`,
      fix: 'Add 4 to 8 real buyer questions with 1 to 3 sentence answers, and mark them up as FAQPage JSON-LD that matches the visible text.',
    });
  }

  // 7. Structured data
  if (isHtml) {
    const rich = x.schemaTypes.filter((t) => /^(Article|NewsArticle|BlogPosting|TechArticle|FAQPage|HowTo|Product|SoftwareApplication|Dataset|Recipe|Review|Organization|LocalBusiness|Service|QAPage)$/i.test(t));
    const v = !x.schemaTypes.length ? 0 : rich.length ? 1 : 0.5;
    add({
      id: 'schema', name: 'Structured data (JSON-LD)', weight: 8, value: v,
      found: x.schemaTypes.length ? `Types found: ${x.schemaTypes.slice(0, 8).join(', ')}.` : 'No JSON-LD on the page.',
      fix: 'Add JSON-LD for what the page is (Article, Product, HowTo, Dataset) plus Organization, with the same facts as the visible text.',
    });
  }

  // 8. Lists and tables
  {
    const need = Math.max(1, Math.round(totalWords / 400));
    const have = x.lists + x.tables;
    const v = clamp(have / need) * (x.tables ? 1 : 0.85);
    add({
      id: 'scan', name: 'Lists and tables', weight: 8, value: v,
      found: `${x.lists} lists and ${x.tables} tables for ${totalWords.toLocaleString('en-US')} words (aim for 1 per 400 words).`,
      fix: x.tables ? 'Break long comparisons and steps into lists.' : 'Add at least one HTML table: prices, specs or a comparison. Engines lift table rows nearly word for word.',
    });
  }

  // 9. Heading structure
  {
    const per = heads.length ? totalWords / heads.length : totalWords;
    const h1ok = h1s.length === 1 ? 1 : h1s.length === 0 ? (isHtml ? 0 : 0.5) : 0.5;
    const rhythm = per <= 300 ? 1 : per <= 450 ? 0.6 : 0.2;
    const v = 0.5 * h1ok + 0.5 * rhythm;
    add({
      id: 'headings', name: 'Heading structure', weight: 6, value: v,
      found: `${h1s.length} H1, ${heads.length} headings in all, one every ${Math.round(per)} words.`,
      fix: 'Use exactly one H1, then a heading every 200 to 300 words so each chunk has a label.',
    });
  }

  // 10. Concise writing
  {
    const ss = paras.flatMap((p) => sentences(p.text));
    const avg = ss.length ? ss.reduce((a, s) => a + words(s), 0) / ss.length : 0;
    const long = paras.filter((p) => words(p.text) > 120).length;
    const v = ss.length ? 0.6 * (avg <= 20 ? 1 : avg <= 26 ? 0.6 : 0.2) + 0.4 * (1 - long / Math.max(1, paras.length)) : 0;
    add({
      id: 'concise', name: 'Short sentences and paragraphs', weight: 6, value: clamp(v),
      found: `Average sentence ${avg.toFixed(1)} words; ${long} of ${paras.length} paragraphs run past 120 words.`,
      fix: 'Aim for sentences under 20 words and paragraphs under 80. Split any paragraph that makes two points.',
    });
  }

  // 11. Concrete data
  {
    const n = (x.text.match(NUM) || []).length;
    const per100 = totalWords ? (n / totalWords) * 100 : 0;
    const v = clamp(per100 / 2);
    add({
      id: 'data', name: 'Numbers and specifics', weight: 8, value: v,
      found: `${n} numbers, prices, percentages or years (${per100.toFixed(1)} per 100 words; aim for 2).`,
      fix: 'Replace adjectives with figures: prices, counts, dates, percentages, each with its source. A sentence with a number is the one that gets quoted.',
    });
  }

  // 12. Title and meta
  if (isHtml) {
    const tl = x.title.length, ml = x.meta.length;
    const v = (tl >= 20 && tl <= 65 ? 0.5 : tl ? 0.25 : 0) + (ml >= 70 && ml <= 165 ? 0.5 : ml ? 0.25 : 0);
    add({
      id: 'meta', name: 'Title and meta description', weight: 4, value: v,
      found: `Title ${tl ? tl + ' characters' : 'missing'}; meta description ${ml ? ml + ' characters' : 'missing'}.`,
      fix: 'Title 20 to 65 characters naming the topic; meta description 70 to 165 characters that answers the query.',
    });
  }

  // 13. Freshness
  if (isHtml) {
    const now = Date.now();
    const ages = x.dates.map((d) => Date.parse(d)).filter((t) => !isNaN(t) && t <= now + 864e5).map((t) => (now - t) / 864e5);
    const visible = /\b(updated|last (updated|reviewed)|published)\b[^.]{0,40}\b(20\d{2})\b/i.test(x.text);
    const newest = ages.length ? Math.min(...ages) : null;
    const v = newest === null ? (visible ? 0.5 : 0) : newest <= 365 ? 1 : 0.5;
    add({
      id: 'fresh', name: 'Dated and recent', weight: 4, value: v,
      found: newest === null ? (visible ? 'A visible date, but no machine-readable one.' : 'No publish or update date found.') : `Last dated ${Math.round(newest)} days ago.`,
      fix: 'Show "Updated <month year>" and set dateModified in JSON-LD. Change it only when the content changes.',
    });
  }

  for (const c of checks) {
    c.value = clamp(c.value);
    c.points = Math.round(c.value * c.weight * 10) / 10;
    c.status = c.value >= 0.8 ? 'Strong' : c.value >= 0.4 ? 'Partial' : 'Weak';
    c.gap = c.weight - c.points;
  }
  const possible = checks.reduce((a, c) => a + c.weight, 0);
  const earned = checks.reduce((a, c) => a + c.points, 0);
  const total = possible ? Math.round((earned / possible) * 100) : 0;
  const band = total >= 80 ? 'AI-ready' : total >= 60 ? 'Solid' : total >= 40 ? 'Needs work' : 'Hard to cite';
  return { score: total, band, words: totalWords, checks, fixes: [...checks].filter((c) => c.gap > 0.05).sort((a, b) => b.gap - a.gap) };
}

// robots.txt: is `ua` allowed to fetch `path`? Longest matching rule wins; Allow wins a tie. null = no robots.txt.
export function robotsAllows(txt, ua, path = '/') {
  if (txt == null) return null;
  const groups = [];
  let cur = null, lastWasAgent = false;
  for (const raw of txt.split(/\r?\n/)) {
    const line = raw.replace(/#.*/, '').trim();
    const m = line.match(/^([A-Za-z-]+)\s*:\s*(.*)$/);
    if (!m) continue;
    const k = m[1].toLowerCase(), v = m[2].trim();
    if (k === 'user-agent') {
      if (!lastWasAgent) { cur = { agents: [], rules: [] }; groups.push(cur); }
      cur.agents.push(v.toLowerCase());
      lastWasAgent = true;
    } else {
      lastWasAgent = false;
      if (cur && (k === 'allow' || k === 'disallow')) cur.rules.push({ allow: k === 'allow', p: v });
    }
  }
  const u = ua.toLowerCase();
  let g = groups.filter((x) => x.agents.some((a) => a !== '*' && u.includes(a)));
  if (!g.length) g = groups.filter((x) => x.agents.includes('*'));
  if (!g.length) return true;
  const rules = g.flatMap((x) => x.rules).filter((r) => r.p !== '' || !r.allow);
  let best = null;
  for (const r of rules) {
    if (r.p === '') continue; // "Disallow:" with nothing = allow all
    const re = new RegExp('^' + r.p.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*').replace(/\\\$$/, '$'));
    if (re.test(path) && (!best || r.p.length > best.p.length || (r.p.length === best.p.length && r.allow))) best = r;
  }
  return best ? best.allow : true;
}

export function toMarkdown(result, label) {
  const lines = [`# AI visibility score: ${result.score}/100 (${result.band})`, '', label ? `Page: ${label}` : '', '', '| Check | Status | Points | Found |', '|---|---|---|---|'];
  for (const c of result.checks) lines.push(`| ${c.name} | ${c.status} | ${c.points}/${c.weight} | ${c.found.replace(/\|/g, '/')} |`);
  lines.push('', '## Fixes, biggest first', '');
  result.fixes.forEach((c, i) => lines.push(`${i + 1}. **${c.name}** (+${c.gap.toFixed(1)} points): ${c.fix}`));
  lines.push('', 'Scored with the free AI Visibility Checker at https://howtogetmentionedbyai.com/tools/ai-visibility-checker/');
  return lines.filter((l, i, a) => !(l === '' && a[i - 1] === '')).join('\n');
}
