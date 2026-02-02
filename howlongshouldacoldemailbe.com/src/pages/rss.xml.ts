import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { siteConfig } from '../config';

const posts = [
  {
    title: 'Optimal Cold Email Length: Data from 3 Million Emails (2026)',
    description: 'Word-by-word analysis of reply rates by email length, with the exact sweet spot backed by 3M+ cold emails.',
    link: '/blog/optimal-cold-email-length-data/',
    pubDate: new Date('2026-01-28'),
  },
  {
    title: 'Cold Email Formatting That Gets Replies: Structure, Layout, and Readability',
    description: 'Paragraph length, sentence count, whitespace ratios, and mobile formatting rules that maximize engagement.',
    link: '/blog/cold-email-formatting-guide/',
    pubDate: new Date('2026-01-26'),
  },
  {
    title: '7 Cold Email Copywriting Formulas That Actually Work (With Templates)',
    description: 'Proven email frameworks with word-count targets, structure breakdowns, and real examples that drove 3%+ reply rates.',
    link: '/blog/cold-email-copywriting-formulas/',
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
