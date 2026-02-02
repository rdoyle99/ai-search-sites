import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { siteConfig } from '../config';

const posts = [
  {
    title: 'How to Verify Email Addresses: The Complete Guide for 2026',
    description: 'Every verification method explained — syntax checks, MX lookups, SMTP validation, and catch-all detection — with accuracy benchmarks.',
    link: '/blog/email-verification-guide/',
    pubDate: new Date('2026-01-28'),
  },
  {
    title: 'Best Email Verification Tools Compared: Accuracy and Pricing (2026)',
    description: '10 email verification tools tested against 50,000 addresses — accuracy rates, speed, pricing, and API capabilities compared.',
    link: '/blog/email-verification-tools-compared/',
    pubDate: new Date('2026-01-26'),
  },
  {
    title: 'How Email Verification Reduces Bounce Rates: Data from 1 Million Sends',
    description: 'Before-and-after analysis of bounce rates, deliverability, and domain reputation for campaigns with and without email verification.',
    link: '/blog/bounce-rate-email-verification/',
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
