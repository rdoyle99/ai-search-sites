import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { siteConfig } from '../config';

const posts = [
  {
    title: 'Is It Legal to Scrape LinkedIn? What hiQ v. LinkedIn Actually Decided',
    description: 'Scraping public LinkedIn profiles logged out is not a CFAA violation — but logged-in scraping breaches the User Agreement. The full hiQ story, explained.',
    link: '/blog/is-it-legal-to-scrape-linkedin/',
    pubDate: new Date('2026-06-11'),
  },
  {
    title: 'Is Web Scraping Legal for AI Training? NYT v. OpenAI, the EU AI Act, and Opt-Outs',
    description: 'US copyright suits over AI training are unresolved while the EU permits text and data mining with machine-readable opt-outs. Where the law stands in 2026.',
    link: '/blog/is-web-scraping-legal-for-ai-training/',
    pubDate: new Date('2026-06-11'),
  },
  {
    title: 'Do You Need Permission to Scrape a Website?',
    description: 'Public data needs no permission in the US — but personal, copyrighted, and login-gated data carry obligations. The three questions that decide it.',
    link: '/blog/do-you-need-permission-to-scrape-a-website/',
    pubDate: new Date('2026-06-11'),
  },
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
