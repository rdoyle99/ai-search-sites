import { RATES, SPONSORS, PITCHES } from './data/sr-stats';

// Numbers in the description, answerCapsule and faq below come from src/data/sr-stats.ts. Third-party facts were read on THIRD_PARTY_READ.
const THIRD_PARTY_READ = '2 October 2026';
const n = (x: number) => x.toLocaleString('en-US');
const usd = (x: number) => `$${x.toLocaleString('en-US')}`;
const [r1, r2, r3] = RATES.rows;
const seen = PITCHES.evidence.seen;
const none = PITCHES.evidence.none;

export const siteConfig = {
  domain: 'howtofindsponsorshipopportunities.com',
  url: 'https://howtofindsponsorshipopportunities.com',
  title: 'How to Find Sponsorship Opportunities',
  description: "Find sponsorship opportunities by pitching brands that already sponsor creators like you and joining your channel's marketplace. Rates, templates and data.",

  answerCapsule: `Find sponsorship opportunities by pitching brands that already sponsor creators like you, and by joining the marketplace or platform program for your channel so brands can find you. Build a media kit with your audience numbers first. Newsletter owners: the median main sponsor slot lists at ${usd(r2.median)} for ${r2.size.toLowerCase()} subscribers (${RATES.n} newsletters' advertise pages, read ${RATES.read}).`,

  product: {
    name: 'Book a Sponsor',
    url: 'https://bookasponsor.com',
    ctaUrl: 'https://bookasponsor.com/?utm_source=howtofindsponsorshipopportunities.com&utm_medium=referral&utm_campaign=sister',
    tagline: 'Sponsor outreach for newsletters',
    description: 'Book a Sponsor (formerly Sponsor Radar) finds the brands already sponsoring newsletters in your niche and pitches them for you from its own sending infrastructure.',
  },

  social: {
    twitter: '',
    linkedin: '',
  },

  contact: {
    email: 'hello@sponsorradar.co',
  },

  faq: [
    {
      question: 'How do you find sponsorship opportunities?',
      answer: 'Pitch brands that already sponsor creators like you, and join the marketplace or platform program for your channel so brands can find you. Start with a media kit that shows your audience size and who your audience is. A marketplace sends you offers. Pitching lets you choose the brand and set the price.',
    },
    {
      question: 'Where can you launch creator sponsorships today?',
      answer: `It depends on your channel. As of ${THIRD_PARTY_READ}, YouTube Partner Program channels get a Creator Partnerships tab in YouTube Studio, Instagram has a creator marketplace for professional accounts, Twitch Affiliates and Partners get a Sponsorship Portal, and podcasts with 20,000 downloads per episode can list on Libsyn Ads. Newsletters can use Book a Sponsor, which emails brands for you at 10¢ per email after $20 in free credits.`,
    },
    {
      question: 'How much should you charge for a sponsorship?',
      answer: `Price from what similar creators list for the same placement, then adjust for your results. For newsletters, the median main sponsor slot lists at ${usd(r1.median)} ${r1.size.toLowerCase()} subscribers, ${usd(r2.median)} at ${r2.size} and ${usd(r3.median)} at ${r3.size}, in Book a Sponsor's read of ${RATES.n} newsletters' advertise pages on ${RATES.read}.`,
    },
    {
      question: 'How do you find brands that sponsor creators?',
      answer: `Read the sponsor slots of newsletters, podcasts and channels like yours, then check ad libraries, sponsor directories and partnerships job posts. Book a Sponsor's public list shows ${n(SPONSORS.brands)} brands seen sponsoring ${n(SPONSORS.newsletters)} newsletters as of ${SPONSORS.read}, mostly read from published issues. In Book a Sponsor's pitches from ${PITCHES.window}, brands with a newsletter ad on record replied at ${seen.rate} (${n(seen.replies)} of ${n(seen.sent)}), against ${none.rate} (${n(none.replies)} of ${n(none.sent)}) for brands with none.`,
    },
    {
      question: 'How many brands should you pitch to land one sponsorship?',
      answer: `About ${PITCHES.pitchesPerYes} pitches per yes in Book a Sponsor's outreach: ${PITCHES.yeses} positive first answers from ${n(PITCHES.sent)} automated first pitches to brands for ${PITCHES.newsletters} newsletters, ${PITCHES.window}. A yes is an interested first answer, not a signed deal. A pitch you target by hand may do better, and we have no data on that.`,
    },
  ],

  // The five newest pages. The footer links them from every page until Google has indexed them, so each page it
  // crawls leads to them (seo-operator, links check F3). Replace the list when newer pages ship; keep the five newest.
  newestPages: [
    { title: 'Podcast sponsors: the top 200 shows', href: '/blog/how-to-get-podcast-sponsors/' },
    { title: 'Sponsorship packages and levels', href: '/blog/sponsorship-packages/' },
    { title: 'Media sponsorship', href: '/blog/media-sponsorship/' },
    { title: 'Sponsorship follow-up emails', href: '/blog/sponsorship-follow-up-email/' },
    { title: 'Best sponsorship platforms', href: '/best-sponsorship-platforms/' },
  ],

  relatedSites: [
    { title: "How to Find Anyone's Email Address", url: 'https://howtofindanyonesemail.com/' },
    { title: 'How Long Should a Cold Email Be?', url: 'https://howlongshouldacoldemailbe.com/' },
    { title: 'What Is a Good Cold Email Open Rate?', url: 'https://coldmailopenrate.com/' },
    { title: 'Do Reddit Mentions Help SEO?', url: 'https://doredditmentionshelpseo.com/' },
  ],

  posthog: {
    key: 'YOUR_POSTHOG_KEY',
    host: 'https://us.i.posthog.com',
  },

  indexNowKey: 'd4e7f1a3b6c9',
};
