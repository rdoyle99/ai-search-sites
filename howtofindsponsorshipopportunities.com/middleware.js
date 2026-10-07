// AI crawler tracking for DataFast. Crawlers run no JavaScript, so the analytics script never sees them; this
// runs on Vercel before the static file is served, sends one small background POST when the user agent is an AI or
// search crawler, and lets every request through unchanged. People and assets are untouched (the matcher skips
// assets, and DataFast verifies each crawler by IP and drops the rest). Added 2026-10-06 for the SEO operator's
// AI traffic panel (seo-operator: scripts/ai_traffic.py). Probe: send `x-ai-crawl-probe: 1` with a crawler user
// agent and the response is DataFast's answer instead of the page.
const WEBSITE_ID = 'dfid_XPOiOSw8lzOhphhyH9lkr';
const CRAWLERS = /gptbot|oai-searchbot|chatgpt-user|oai-adsbot|claudebot|claude-user|claude-searchbot|perplexitybot|perplexity-user|googleother|google-agent|googleagent|google-notebooklm|google-cloudvertexbot|bingbot|copilot|duckassistbot|applebot|amazonbot|amzn-searchbot|amzn-user|bytespider|tiktokspider|doubaobot|ccbot|meta-externalagent|meta-externalfetcher|meta-webindexer|facebookbot|mistralai-user|mistralai-index|xai-searchbot|xai-bot|xai-web-crawler|grokbot|grok-deepsearch|kimi-user|kimi-searchbot|kimibot|qwen-user|qwenbot|tongyibot|deepseekbot|youbot|cohere-ai|ai2bot|erniebot|yiyanbot/i;

export const config = {
  matcher: ['/((?!_astro/|assets/|favicon|.*\\.(?:css|js|mjs|map|png|jpe?g|gif|webp|avif|svg|ico|woff2?|ttf|otf|mp4|webm|pdf|zip|csv)$).*)'],
};

export default function middleware(request, context) {
  const ua = request.headers.get('user-agent') || '';
  if (!CRAWLERS.test(ua)) return;
  const url = new URL(request.url);
  const ip = (request.headers.get('x-real-ip') || request.headers.get('x-vercel-forwarded-for') || request.headers.get('x-forwarded-for') || '')
    .split(',')[0].trim();
  const sent = fetch('https://datafa.st/api/ai-crawls', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    keepalive: true,
    body: JSON.stringify({
      websiteId: WEBSITE_ID,
      domain: url.hostname,
      href: url.href,
      referrer: request.headers.get('referer') || null,
      ai: { userAgent: ua, ip, source: 'server_middleware' },
    }),
  }).catch(() => null);
  if (request.headers.get('x-ai-crawl-probe') === '1') {
    return sent.then((r) => (r ? r.text() : '{"error":"no response"}')).then((t) =>
      new Response(t, { headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } }));
  }
  if (context && typeof context.waitUntil === 'function') context.waitUntil(sent);
}
