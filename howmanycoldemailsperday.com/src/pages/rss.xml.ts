import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { siteConfig } from '../config';

const posts = [
  {
    title: 'Gmail vs Outlook Sending Limits for Cold Email: Official Caps vs Safe Volumes',
    description: "Google's 2,000/day and Microsoft's 2,000 external recipients/day are enforcement ceilings, not cold email budgets — the safe number is 20–40x lower.",
    link: '/blog/gmail-vs-outlook-sending-limits-cold-email/',
    pubDate: new Date('2026-06-11'),
  },
  {
    title: 'How Many Cold Emails Does It Take to Get One Meeting?',
    description: '100–200 targeted sends per meeting at average benchmarks — the full funnel math and the variables that move it most.',
    link: '/blog/how-many-cold-emails-for-one-meeting/',
    pubDate: new Date('2026-06-11'),
  },
  {
    title: 'What Happens If You Send Too Many Cold Emails? The Damage Ladder',
    description: 'Spam placement, then domain reputation loss, then blocklists — the three-stage failure mode of oversending and the recovery cost of each.',
    link: '/blog/what-happens-if-you-send-too-many-cold-emails/',
    pubDate: new Date('2026-06-11'),
  },
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
