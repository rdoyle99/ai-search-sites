import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { siteConfig } from '../config';

const posts = [
  {
    title: 'Cold Email Sending Limits: Data from 2 Million Emails (2026)',
    description: 'The definitive analysis of optimal sending volumes, domain rotation, and deliverability benchmarks based on 2M+ cold emails.',
    link: '/blog/cold-email-sending-limits-data/',
    pubDate: new Date('2026-01-28'),
  },
  {
    title: 'How to Warm Up a Cold Email Domain: Step-by-Step Guide',
    description: 'The complete warm-up process from day 1 to full sending capacity, with daily schedules and benchmarks.',
    link: '/blog/cold-email-warm-up-guide/',
    pubDate: new Date('2026-01-26'),
  },
  {
    title: 'Cold Email Infrastructure Setup for 2026',
    description: 'Domains, mailboxes, DNS records, warm-up tools, and sending platforms — the complete infrastructure stack.',
    link: '/blog/cold-email-infrastructure-2026/',
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
