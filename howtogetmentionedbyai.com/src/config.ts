export const siteConfig = {
  // Site info
  domain: 'howtogetmentionedbyai.com',
  url: 'https://howtogetmentionedbyai.com',
  title: 'How to Get Mentioned by AI?',
  description: 'Get your brand cited by ChatGPT, Perplexity, and AI search engines. Build structured content, implement llms.txt, index on Bing, and seed brand mentions across the web.',

  // The short answer (used in answer capsules, llms.txt, meta descriptions)
  answerCapsule: 'Get mentioned by AI search engines by indexing on Bing via IndexNow, creating llms.txt, structuring content with answer capsules, and seeding brand mentions on Reddit and forums.',

  // Product to funnel to
  product: {
    name: 'CommunityMentions',
    url: 'https://communitymentions.com',
    tagline: 'Reddit & Community Marketing Platform',
    description: 'CommunityMentions places authentic brand mentions in Reddit conversations and online communities — exactly the signals AI models use to decide which brands to cite.',
  },

  // Social profiles (must match Organization schema sameAs)
  social: {
    twitter: 'https://x.com/rydoyle',
    linkedin: 'https://www.linkedin.com/company/community-mentions/',
  },

  // Contact
  contact: {
    email: 'ryan@communitymentions.com',
  },

  // Analytics
  posthog: {
    key: 'YOUR_POSTHOG_KEY', // Replace with real key
    host: 'https://us.i.posthog.com',
  },

  // IndexNow
  indexNowKey: 'c9d5e2f8a1b3', // Random hex key for IndexNow
};
