import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { siteConfig } from '../config';

const posts = [
  {
    title: 'How Much Should You Charge for a Sponsorship? The CPM Math',
    description: 'The impressions-based formula by format, the adjusters that move rates, and the negotiation floor — pricing from math instead of vibes.',
    link: '/blog/how-much-to-charge-for-sponsorship/',
    pubDate: new Date('2026-06-11'),
  },
  {
    title: 'How to Find Brands That Already Sponsor Creators Like You',
    description: 'Reverse-prospecting: mine competitor sponsor lists, ad libraries, directories, and job postings for brands with active creator budgets.',
    link: '/blog/find-brands-that-sponsor/',
    pubDate: new Date('2026-06-11'),
  },
  {
    title: 'How Many Brands Should You Pitch to Land One Sponsorship?',
    description: '30–80 pitches per deal — the stage-by-stage funnel, what moves each conversion, and working backward from a revenue goal.',
    link: '/blog/how-many-brands-to-pitch/',
    pubDate: new Date('2026-06-11'),
  },
  {
    title: 'How to Find Sponsorship Opportunities: The Complete Guide for 2026',
    description: 'Every method for finding brand sponsorships — from marketplace platforms to cold outreach — with pitch templates and rate benchmarks.',
    link: '/blog/find-sponsorship-opportunities-guide/',
    pubDate: new Date('2026-01-28'),
  },
  {
    title: 'How to Build a Sponsorship Media Kit That Lands Deals',
    description: 'What brands want to see in a media kit — audience data, engagement metrics, rate cards, and case studies that close sponsorships.',
    link: '/blog/sponsorship-media-kit-guide/',
    pubDate: new Date('2026-01-26'),
  },
  {
    title: 'How to Cold Email Brands for Sponsorships (With Templates)',
    description: 'The exact cold email framework that lands sponsorship deals — subject lines, pitch structure, follow-up sequences, and real examples.',
    link: '/blog/cold-email-sponsorship-pitch/',
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
