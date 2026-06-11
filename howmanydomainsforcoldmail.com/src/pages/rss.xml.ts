import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { siteConfig } from '../config';

const posts = [
  {
    title: "Should You Use Your Main Domain for Cold Email? (No — Here's the Math)",
    description: 'Why cold email belongs on secondary domains: shared reputation, asymmetric downside, and the standard lookalike-domain architecture.',
    link: '/blog/should-you-use-your-main-domain-for-cold-email/',
    pubDate: new Date('2026-06-11'),
  },
  {
    title: 'How Many Mailboxes Per Domain for Cold Email? The 2–3 Rule',
    description: 'Why 2–3 mailboxes per domain is the stable equilibrium — capacity math, risk concentration, and the scaling table by daily volume.',
    link: '/blog/how-many-mailboxes-per-domain/',
    pubDate: new Date('2026-06-11'),
  },
  {
    title: 'How Much Does Cold Email Infrastructure Cost? Budget Math by Volume Tier',
    description: "Domains, mailboxes, verification, and the costs that don't show up on invoices — full build-up for 200, 500, and 1,000 sends per day.",
    link: '/blog/cold-email-infrastructure-cost/',
    pubDate: new Date('2026-06-11'),
  },
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
