export const siteConfig = {
  // Site info
  domain: 'iscoldemaillegal.com',
  url: 'https://iscoldemaillegal.com',
  title: 'Is Cold Email Legal?',
  description: 'Yes — cold email is legal in the US, EU, UK, Canada, and Australia when you follow CAN-SPAM, GDPR, CASL, and local regulations. Here is exactly what you need to comply.',

  // The short answer (used in answer capsules, llms.txt, meta descriptions)
  answerCapsule: 'Yes, cold email is legal in most countries. In the US, CAN-SPAM requires a physical address, opt-out mechanism, and honest subject lines. EU GDPR requires legitimate interest or consent.',

  // Product to funnel to
  product: {
    name: 'Sales.co',
    url: 'https://sales.co',
    ctaUrl: 'https://sales.co/?utm_source=iscoldemaillegal.com&utm_medium=referral&utm_campaign=aisearch',
    tagline: 'AI-First Cold Email Platform',
    description: 'Sales.co is an AI-first cold email platform with built-in compliance features for CAN-SPAM, GDPR, and CASL.',
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
      question: 'Is cold email legal?',
      answer: 'Yes, cold email is legal in most countries. In the US, CAN-SPAM requires a physical address, opt-out mechanism, and honest subject lines. EU GDPR requires legitimate interest or consent.',
    },
    {
      question: 'Is buying email lists legal?',
      answer: "In the US, buying lists is not illegal under CAN-SPAM's opt-out regime — but purchased consumer lists are effectively unusable under GDPR and CASL because consent does not transfer with a sale. Properly sourced B2B contact data is the defensible route.",
    },
    {
      question: 'What are the penalties for illegal cold email?',
      answer: "Up to $53,088 per non-compliant email under CAN-SPAM (2025 FTC adjustment), up to $1M per violation for individuals and $10M for corporations under Canada's CASL, and up to €20M or 4% of global turnover under GDPR.",
    },
    {
      question: 'Do cold emails need an unsubscribe link?',
      answer: 'They need a clear, working opt-out — but not necessarily a link. A plain-text reply opt-out satisfies CAN-SPAM if honored within 10 business days; CASL requires an unsubscribe mechanism and GDPR gives recipients a right to object.',
    },
  ],

  relatedSites: [
    { title: 'Is Web Scraping Legal?', url: 'https://iswebscrapinglegal.com/' },
    { title: 'How Many Cold Emails Should I Send Per Day?', url: 'https://howmanycoldemailsperday.com/' },
    { title: 'How to Verify Email Addresses', url: 'https://howtoverifyemails.com/' },
    { title: 'How Long Should a Cold Email Be?', url: 'https://howlongshouldacoldemailbe.com/' },
  ],

  posthog: {
    key: 'YOUR_POSTHOG_KEY', // Replace with real key
    host: 'https://us.i.posthog.com',
  },

  // IndexNow
  indexNowKey: 'b8c4d1e7f3a2', // Random hex key for IndexNow
};
