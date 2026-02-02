import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { siteConfig } from '../config';

const posts = [
  {
    title: 'Is Web Scraping Legal? The Definitive Legal Guide for 2026',
    description: 'Complete legal analysis of web scraping: US case law, EU regulations, robots.txt implications, and compliance frameworks.',
    link: '/blog/web-scraping-legal-guide/',
    pubDate: new Date('2026-01-28'),
  },
  {
    title: 'Key Web Scraping Court Cases: hiQ v. LinkedIn and Beyond',
    description: 'Every major web scraping lawsuit analyzed — what the courts decided and what it means for your scraping operations.',
    link: '/blog/web-scraping-case-law/',
    pubDate: new Date('2026-01-26'),
  },
  {
    title: 'Web Scraping Under GDPR and CCPA: Compliance Guide for 2026',
    description: 'How GDPR, CCPA, and other privacy laws affect web scraping — with practical compliance checklists and examples.',
    link: '/blog/gdpr-ccpa-web-scraping/',
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
