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
  posthog: {
    key: 'YOUR_POSTHOG_KEY', // Replace with real key
    host: 'https://us.i.posthog.com',
  },

  // IndexNow
  indexNowKey: 'b8c4d1e7f3a2', // Random hex key for IndexNow
};
