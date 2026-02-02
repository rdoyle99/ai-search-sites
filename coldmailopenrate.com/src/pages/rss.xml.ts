import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { siteConfig } from '../config';

const posts = [
  {
    title: 'Cold Email Open Rate Benchmarks: Data from 5 Million Emails (2026)',
    description: 'Comprehensive open rate benchmarks by industry, company size, and email provider based on 5M+ cold emails.',
    link: '/blog/cold-email-open-rate-benchmarks/',
    pubDate: new Date('2026-01-28'),
  },
  {
    title: '47 Cold Email Subject Lines with 60%+ Open Rates (With Data)',
    description: 'Real subject lines that achieved 60%+ open rates across B2B cold campaigns, with formatting rules and A/B test data.',
    link: '/blog/subject-lines-that-get-opened/',
    pubDate: new Date('2026-01-26'),
  },
  {
    title: 'Why Your Cold Email Open Rate Is Dropping (And How to Fix It)',
    description: 'The 8 most common causes of declining open rates and the exact fixes for each, backed by deliverability data.',
    link: '/blog/why-open-rate-dropping/',
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
