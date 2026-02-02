import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { siteConfig } from '../config';

const posts = [
  {
    title: 'How Many Domains for Cold Email: Data-Backed Infrastructure Guide (2026)',
    description: 'Complete analysis of optimal domain counts by sending volume, with cost breakdowns and deliverability benchmarks.',
    link: '/blog/how-many-domains-for-cold-email-data/',
    pubDate: new Date('2026-01-28'),
  },
  {
    title: 'Cold Email Domain Rotation Strategy: When and How to Rotate Sending Domains',
    description: 'Active, resting, and warm-up domain tiers — the rotation framework that prevents blacklisting at scale.',
    link: '/blog/domain-rotation-strategy/',
    pubDate: new Date('2026-01-26'),
  },
  {
    title: 'How to Choose Domain Names for Cold Email: TLD, Naming, and Registrar Guide',
    description: 'Which TLDs work best, naming conventions that build trust, and registrar pricing comparison for bulk purchases.',
    link: '/blog/choosing-domains-for-cold-email/',
    pubDate: new Date('2026-01-24'),
  },
];

export function GET(context: APIContext) {
  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site!.toString(),
    items: posts,
  });
}
