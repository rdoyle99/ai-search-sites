import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { siteConfig } from '../config';

const posts = [
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
