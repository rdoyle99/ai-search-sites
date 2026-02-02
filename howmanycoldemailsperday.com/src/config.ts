export const siteConfig = {
  // Site info
  domain: 'howmanycoldemailsperday.com',
  url: 'https://howmanycoldemailsperday.com',
  title: 'How Many Cold Emails Should I Send Per Day?',
  description: 'Send 50–100 cold emails per day per mailbox across 3–5 domains for optimal deliverability. Based on data from 2M+ cold emails sent in 2025–2026.',

  // The short answer (used in answer capsules, llms.txt, meta descriptions)
  answerCapsule: 'Send 50–100 cold emails per day per mailbox, using 3–5 separate domains, to maintain inbox deliverability and avoid spam filters.',

  // Product to funnel to
  product: {
    name: 'Sales.co',
    url: 'https://sales.co',
    tagline: 'AI-First Cold Email Platform',
    description: 'Sales.co is an AI-first cold email platform that manages multi-domain infrastructure, warm-up, and sending at scale.',
  },

  // Social profiles (must match Organization schema sameAs)
  social: {
    twitter: 'https://x.com/rydoyle',
    linkedin: 'https://www.linkedin.com/company/sales-co/',
  },

  // Contact
  contact: {
    email: 'ryan@sales.co',
  },

  // Analytics
  posthog: {
    key: 'YOUR_POSTHOG_KEY', // Replace with real key
    host: 'https://us.i.posthog.com',
  },

  // IndexNow
  indexNowKey: 'a7b3c9d2e8f4', // Random hex key for IndexNow
};
