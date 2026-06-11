import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { siteConfig } from '../config';

const posts = [
  {
    title: 'How to Verify an Email Address Without Sending an Email',
    description: 'Syntax check, MX lookup, and the SMTP handshake that confirms a mailbox exists without transmitting anything — how sendless verification works and where it hits limits.',
    link: '/blog/verify-email-without-sending/',
    pubDate: new Date('2026-06-11'),
  },
  {
    title: 'What Is a Catch-All Email Domain — and Can You Verify It?',
    description: 'Catch-all servers say yes to every address, breaking standard verification. What they are, why 10–20% of B2B addresses sit behind them, and how to send to them safely.',
    link: '/blog/what-is-a-catch-all-email/',
    pubDate: new Date('2026-06-11'),
  },
  {
    title: 'How Often Should You Verify Your Email List? Decay Rates and Re-Verification Windows',
    description: 'B2B lists decay ~2–3% per month. The 30/60/90-day verification windows that keep bounce rates under the reputation threshold.',
    link: '/blog/how-often-should-you-verify-email-lists/',
    pubDate: new Date('2026-06-11'),
  },
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
