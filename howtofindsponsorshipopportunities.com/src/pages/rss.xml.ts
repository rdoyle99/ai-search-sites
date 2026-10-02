import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { siteConfig } from '../config';

const posts = [
  {
    title: "Sponsorship Packages and Levels: How to Build and Price Tiers",
    description: "Tiers priced from 321 newsletters' rate cards: a classified lists at 40% of the main slot and a dedicated send at 2.31 times. With a package builder.",
    link: '/blog/sponsorship-packages/',
    pubDate: new Date('2026-10-02'),
  },
  {
    title: "Media Sponsorship: What It Is and How to Value One",
    description: "A media sponsor gives coverage instead of cash. Value it at what the coverage costs to buy, using real newsletter list prices.",
    link: '/blog/media-sponsorship/',
    pubDate: new Date('2026-10-02'),
  },
  {
    title: "Sponsorship Follow-Up Email: Templates and When to Send",
    description: "92% of brand replies to 13,429 pitches came within 7 days. When to follow up, how many times, and five short templates.",
    link: '/blog/sponsorship-follow-up-email/',
    pubDate: new Date('2026-10-02'),
  },
  {
    title: "Best Sponsorship Platforms for Creators and Newsletters (2026)",
    description: "15 platforms for newsletters, YouTube and podcasts, ranked on how much selling each does for you, published fees and who can use it.",
    link: '/best-sponsorship-platforms/',
    pubDate: new Date('2026-09-30'),
  },
  {
    title: "Sponsorship Pricing: How Much to Charge for a Sponsorship",
    description: "What 321 newsletters list for one sponsor slot, by list size, plus sourced podcast, YouTube and social rates and how to set your own price.",
    link: '/blog/how-much-to-charge-for-sponsorship/',
    pubDate: new Date('2026-06-11'),
  },
  {
    title: "How Many Brands Should You Pitch to Land One Sponsorship?",
    description: "About 395 first pitches per yes in 13,429 real pitches to brands, the funnel stage by stage, and the arithmetic for your own goal.",
    link: '/blog/how-many-brands-to-pitch/',
    pubDate: new Date('2026-06-11'),
  },
  {
    title: "How to Find Brands That Already Sponsor Creators Like You",
    description: "Brands with a newsletter ad on record replied twice as often (2.6% vs 1.3%). Where to find brands that already pay creators.",
    link: '/blog/find-brands-that-sponsor/',
    pubDate: new Date('2026-06-11'),
  },
  {
    title: "How to Find Sponsorship Opportunities in 2026",
    description: "Marketplaces, outreach and the channel-by-channel routes for YouTube, podcasts, newsletters, Instagram, TikTok, Twitch and events.",
    link: '/blog/find-sponsorship-opportunities-guide/',
    pubDate: new Date('2026-01-28'),
  },
  {
    title: "Sponsorship Media Kit: How to Build One That Lands Deals",
    description: "The seven sections brands check, a copyable template, examples for a podcast, a streamer and a newsletter, and a rate card priced from real data.",
    link: '/blog/sponsorship-media-kit-guide/',
    pubDate: new Date('2026-01-26'),
  },
  {
    title: "Sponsorship Email Template: How to Cold Email Brands",
    description: "Four short templates, subject lines, who to send them to and how fast brands reply, from 13,429 pitches to brands.",
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
