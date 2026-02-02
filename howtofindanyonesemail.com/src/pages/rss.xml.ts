import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { siteConfig } from '../config';

const posts = [
  {
    title: 'How to Find Anyone\'s Email Address: 12 Methods That Work in 2026',
    description: 'Every proven method for finding professional email addresses — from free techniques to enterprise tools — ranked by accuracy and speed.',
    link: '/blog/find-anyones-email-guide/',
    pubDate: new Date('2026-01-28'),
  },
  {
    title: 'Best Email Finder Tools Compared: Accuracy, Pricing, and Coverage (2026)',
    description: 'Head-to-head comparison of 10 email finder tools tested against 5,000 contacts for accuracy, speed, and cost per find.',
    link: '/blog/email-finder-tools-compared/',
    pubDate: new Date('2026-01-26'),
  },
  {
    title: 'Google Search Operators for Finding Email Addresses: The Complete Guide',
    description: 'Advanced Google search techniques that surface email addresses for free — with exact operator syntax and examples.',
    link: '/blog/google-search-operators-for-emails/',
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
