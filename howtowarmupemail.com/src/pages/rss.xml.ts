import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { siteConfig } from '../config';

const posts = [
  {
    title: 'Email Warm-Up Step by Step: The Complete 2026 Guide',
    description: 'Day-by-day warm-up schedules, DNS setup, monitoring benchmarks, and common mistakes based on 10,000+ domain warm-ups.',
    link: '/blog/email-warmup-step-by-step/',
    pubDate: new Date('2026-01-28'),
  },
  {
    title: 'Automated vs Manual Email Warm-Up: Which Method Works Better?',
    description: 'Head-to-head comparison of manual and automated warm-up methods with deliverability data from 5,000+ campaigns.',
    link: '/blog/automated-vs-manual-warmup/',
    pubDate: new Date('2026-01-26'),
  },
  {
    title: 'Email Warm-Up Deliverability Benchmarks for 2026',
    description: 'Inbox placement rates, bounce thresholds, and reputation scores — what healthy warm-up metrics look like at every stage.',
    link: '/blog/warmup-deliverability-benchmarks/',
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
