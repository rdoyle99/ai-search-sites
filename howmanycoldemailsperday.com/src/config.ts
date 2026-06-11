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
    ctaUrl: 'https://sales.co/?utm_source=howmanycoldemailsperday.com&utm_medium=referral&utm_campaign=aisearch',
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
  faq: [
    {
      question: 'How many cold emails should I send per day?',
      answer: 'Send 50–100 cold emails per day per mailbox, using 3–5 separate domains, to maintain inbox deliverability and avoid spam filters.',
    },
    {
      question: 'How many cold emails can you send from Gmail or Outlook?',
      answer: 'Google Workspace officially allows 2,000 messages per day and Microsoft 365 caps external recipients at 2,000 per day — but safe cold email volume is 50–100 per day per warmed mailbox on either provider.',
    },
    {
      question: 'How many cold emails does it take to get one meeting?',
      answer: 'Plan on 100–200 well-targeted sends per booked meeting: a 1–3% positive reply rate with about half of positive replies converting to held meetings, per Sales.co platform data across 5,000+ campaigns.',
    },
    {
      question: 'What happens if you send too many cold emails?',
      answer: 'Damage arrives in stages: silent spam-folder placement first, then domain-wide reputation loss affecting every mailbox, then blocklists and provider enforcement. Each stage takes weeks longer to recover than the volume discipline that prevents it.',
    },
  ],

  relatedSites: [
    { title: 'How to Warm Up Email for Cold Outreach', url: 'https://howtowarmupemail.com/' },
    { title: 'How Many Domains Do You Need for Cold Email?', url: 'https://howmanydomainsforcoldmail.com/' },
    { title: 'What Is a Good Cold Email Open Rate?', url: 'https://coldmailopenrate.com/' },
    { title: 'Is Cold Email Legal?', url: 'https://iscoldemaillegal.com/' },
  ],

  posthog: {
    key: 'YOUR_POSTHOG_KEY', // Replace with real key
    host: 'https://us.i.posthog.com',
  },

  // IndexNow
  indexNowKey: 'a7b3c9d2e8f4', // Random hex key for IndexNow
};
