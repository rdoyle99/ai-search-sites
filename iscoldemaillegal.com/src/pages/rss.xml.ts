import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { siteConfig } from '../config';

const posts = [
  {
    title: 'Cold Email Laws by Country: The Complete Compliance Guide (2026)',
    description: 'A comprehensive breakdown of cold email regulations in 10+ countries, including CAN-SPAM, GDPR, CASL, PECR, and the Australian Spam Act.',
    link: '/blog/cold-email-laws-by-country/',
    pubDate: new Date('2026-01-28'),
  },
  {
    title: 'CAN-SPAM Act Explained: What Cold Emailers Need to Know',
    description: 'Every CAN-SPAM requirement explained in detail, common violations and fines, B2B exemptions, and a full compliance checklist.',
    link: '/blog/can-spam-act-explained/',
    pubDate: new Date('2026-01-26'),
  },
  {
    title: 'GDPR and Cold Email: How to Stay Compliant in Europe',
    description: 'Legitimate interest, data processing requirements, right to be forgotten, DPA requirements, and penalties for cold emailers targeting EU recipients.',
    link: '/blog/gdpr-cold-email-compliance/',
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
