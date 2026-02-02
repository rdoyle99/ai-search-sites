import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { siteConfig } from '../config';

const posts = [
  {
    title: 'Do Reddit Mentions Help SEO? Data from 500 Brand Campaigns (2026)',
    description: 'Quantitative analysis of Reddit\'s SEO impact — referral traffic, brand search lift, SERP feature appearances, and domain authority effects.',
    link: '/blog/reddit-mentions-seo-data/',
    pubDate: new Date('2026-01-28'),
  },
  {
    title: 'Reddit Marketing Strategy for SEO: The Complete Playbook',
    description: 'How to leverage Reddit for organic search visibility — subreddit selection, content strategy, engagement tactics, and measurement.',
    link: '/blog/reddit-marketing-strategy-seo/',
    pubDate: new Date('2026-01-26'),
  },
  {
    title: 'Google\'s Reddit SERP Features: How Reddit Posts Rank in Search Results',
    description: 'Analysis of Google\'s increasing integration of Reddit content in search results — how to get your brand mentioned in these features.',
    link: '/blog/google-reddit-serp-features/',
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
