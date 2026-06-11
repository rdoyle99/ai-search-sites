import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { siteConfig } from '../config';

const posts = [
  {
    title: 'Are Reddit Links Nofollow? What Link Value Reddit Actually Passes',
    description: "Reddit nofollows most outbound links — and it doesn't matter. The three channels that carry the real SEO value.",
    link: '/blog/are-reddit-links-nofollow/',
    pubDate: new Date('2026-06-11'),
  },
  {
    title: 'How to Get Your Brand Mentioned on Reddit (Without Getting Banned)',
    description: 'The three legitimate paths to Reddit mentions, the self-promo rules that govern them, and the astroturfing failure mode.',
    link: '/blog/how-to-get-mentioned-on-reddit/',
    pubDate: new Date('2026-06-11'),
  },
  {
    title: 'Does Reddit Show Up in AI Answers? The Licensing Deals That Made It Inevitable',
    description: "Google's ~$60M/year licensing deal and the OpenAI partnership put Reddit conversations inside AI answers — what that means for brands.",
    link: '/blog/does-reddit-show-up-in-ai-answers/',
    pubDate: new Date('2026-06-11'),
  },
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
