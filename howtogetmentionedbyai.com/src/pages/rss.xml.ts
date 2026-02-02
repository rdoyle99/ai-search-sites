import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { siteConfig } from '../config';

const posts = [
  {
    title: 'How ChatGPT Decides Which Brands to Cite (2026)',
    description: 'Analysis of 26,000+ ChatGPT citations reveals the ranking factors that determine which brands get mentioned in AI search results.',
    link: '/blog/how-chatgpt-cites-brands/',
    pubDate: new Date('2026-01-28'),
  },
  {
    title: 'The llms.txt Guide: Tell AI What Your Site Is About',
    description: 'The complete guide to implementing llms.txt, the emerging standard for helping AI models understand your website.',
    link: '/blog/llms-txt-guide/',
    pubDate: new Date('2026-01-26'),
  },
  {
    title: 'Reddit Mentions and AI Search: Why Community Signals Matter',
    description: 'Sites with 10M+ Reddit mentions average 7 AI citations vs 1.8 for minimal presence. Here is why community signals drive AI visibility.',
    link: '/blog/reddit-mentions-ai-search/',
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
