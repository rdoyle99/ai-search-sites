// Submit all site URLs to IndexNow API (Bing + Yandex)
// Run: node submit-indexnow.mjs

const sites = [
  {
    domain: 'coldmailopenrate.com',
    key: 'd6e9f3a2b4c8',
    blogs: ['cold-email-open-rate-benchmarks', 'subject-lines-that-get-opened', 'why-open-rate-dropping'],
    tools: ['open-rate-calculator', 'subject-line-tester', 'open-rate-benchmarker'],
  },
  {
    domain: 'howmanydomainsforcoldmail.com',
    key: 'c5d8e2f1a3b7',
    blogs: ['how-many-domains-for-cold-email-data', 'domain-rotation-strategy', 'choosing-domains-for-cold-email'],
    tools: ['domain-calculator', 'infrastructure-cost-estimator', 'domain-name-generator'],
  },
  {
    domain: 'howlongshouldacoldemailbe.com',
    key: 'e7f1a4b3c6d9',
    blogs: ['optimal-cold-email-length-data', 'cold-email-formatting-guide', 'cold-email-copywriting-formulas'],
    tools: ['email-length-analyzer', 'email-readability-scorer', 'email-template-generator'],
  },
  {
    domain: 'howtofindanyonesemail.com',
    key: 'f8a2b5c4d7e1',
    blogs: ['find-anyones-email-guide', 'email-finder-tools-compared', 'google-search-operators-for-emails'],
    tools: ['email-pattern-finder', 'email-permutator', 'email-format-checker'],
  },
  {
    domain: 'iswebscrapinglegal.com',
    key: 'a1b4c7d2e5f8',
    blogs: ['web-scraping-legal-guide', 'web-scraping-case-law', 'gdpr-ccpa-web-scraping'],
    tools: ['robots-txt-checker', 'scraping-legality-checker', 'tos-analyzer'],
  },
  {
    domain: 'howtoverifyemails.com',
    key: 'b2c5d8e1f4a7',
    blogs: ['email-verification-guide', 'email-verification-tools-compared', 'bounce-rate-email-verification'],
    tools: ['email-syntax-checker', 'bulk-email-validator', 'disposable-email-detector'],
  },
  {
    domain: 'doredditmentionshelpseo.com',
    key: 'c3d6e9f2a5b8',
    blogs: ['reddit-mentions-seo-data', 'reddit-marketing-strategy-seo', 'google-reddit-serp-features'],
    tools: ['reddit-mention-tracker', 'subreddit-finder', 'reddit-post-analyzer'],
  },
  {
    domain: 'howtofindsponsorshipopportunities.com',
    key: 'd4e7f1a3b6c9',
    blogs: ['find-sponsorship-opportunities-guide', 'sponsorship-media-kit-guide', 'cold-email-sponsorship-pitch'],
    tools: ['sponsorship-rate-calculator', 'media-kit-builder', 'brand-pitch-generator'],
  },
  {
    domain: 'howmanycoldemailsperday.com',
    key: 'a7b3c9d2e8f4',
    blogs: ['cold-email-sending-limits-data', 'cold-email-infrastructure-2026', 'cold-email-warm-up-guide'],
    tools: ['cold-email-volume-calculator', 'spam-word-checker', 'subject-line-analyzer'],
  },
  {
    domain: 'howtogetmentionedbyai.com',
    key: 'c9d5e2f8a1b3',
    blogs: ['how-chatgpt-cites-brands', 'llms-txt-guide', 'reddit-mentions-ai-search'],
    tools: ['ai-citation-checker', 'ai-search-audit', 'llms-txt-generator'],
  },
  {
    domain: 'howtowarmupemail.com',
    key: 'b4c7d1e9f2a6',
    blogs: ['email-warmup-step-by-step', 'automated-vs-manual-warmup', 'warmup-deliverability-benchmarks'],
    tools: ['warmup-schedule-generator', 'warmup-progress-tracker', 'dns-record-checker'],
  },
  {
    domain: 'iscoldemaillegal.com',
    key: 'b8c4d1e7f3a2',
    blogs: ['can-spam-act-explained', 'cold-email-laws-by-country', 'gdpr-cold-email-compliance'],
    tools: ['can-spam-checker', 'gdpr-assessment', 'legal-template-generator'],
  },
];

function buildUrlList(site) {
  const base = `https://${site.domain}`;
  return [
    `${base}/`,
    `${base}/blog/`,
    `${base}/tools/`,
    `${base}/about/`,
    ...site.blogs.map(slug => `${base}/blog/${slug}/`),
    ...site.tools.map(slug => `${base}/tools/${slug}/`),
  ];
}

async function submitSite(site) {
  const urlList = buildUrlList(site);
  const body = {
    host: site.domain,
    key: site.key,
    keyLocation: `https://${site.domain}/${site.key}.txt`,
    urlList,
  };

  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(body),
    });
    console.log(`${site.domain}: ${res.status} ${res.statusText} (${urlList.length} URLs)`);
    if (res.status >= 400) {
      const text = await res.text();
      console.log(`  Error: ${text}`);
    }
  } catch (err) {
    console.log(`${site.domain}: FAILED - ${err.message}`);
  }
}

async function main() {
  console.log('Submitting all sites to IndexNow...\n');

  for (const site of sites) {
    await submitSite(site);
  }

  console.log('\nDone! URLs should appear in Bing within 24-48 hours.');
  console.log('\n--- FULL URL LIST FOR RAPID INDEXER ---\n');

  // Also output flat URL list for Rapid Indexer
  for (const site of sites) {
    const urls = buildUrlList(site);
    urls.forEach(url => console.log(url));
  }
}

main();
