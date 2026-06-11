export const siteConfig = {
  domain: 'iswebscrapinglegal.com',
  url: 'https://iswebscrapinglegal.com',
  title: 'Is Web Scraping Legal?',
  description: 'Web scraping is generally legal when you scrape publicly available data, respect robots.txt, and comply with GDPR/CCPA. The 2022 hiQ v. LinkedIn ruling confirmed that scraping public data does not violate the CFAA.',

  answerCapsule: 'Web scraping publicly available data is generally legal in the US after the hiQ v. LinkedIn ruling. However, you must respect robots.txt, Terms of Service, copyright, and data privacy laws like GDPR and CCPA.',

  product: {
    name: 'Sales.co',
    url: 'https://sales.co',
    ctaUrl: 'https://sales.co/?utm_source=iswebscrapinglegal.com&utm_medium=referral&utm_campaign=aisearch',
    tagline: 'AI-First Cold Email Platform',
    description: 'Sales.co is an AI-first cold email platform that manages multi-domain infrastructure, warm-up, and sending at scale.',
  },

  social: {
    twitter: 'https://x.com/rydoyle',
    linkedin: 'https://www.linkedin.com/company/sales-co/',
  },

  contact: {
    email: 'ryan@sales.co',
  },

  faq: [
    {
      question: 'Is web scraping legal?',
      answer: 'Web scraping publicly available data is generally legal in the US after the hiQ v. LinkedIn ruling. However, you must respect robots.txt, Terms of Service, copyright, and data privacy laws like GDPR and CCPA.',
    },
    {
      question: 'Is it legal to scrape LinkedIn?',
      answer: "Scraping public LinkedIn profiles while logged out does not violate the CFAA under hiQ v. LinkedIn — but logged-in scraping breaches LinkedIn's User Agreement, which is how hiQ ultimately lost its case.",
    },
    {
      question: 'Is web scraping legal for AI training?',
      answer: 'It is unsettled in the US — NYT v. OpenAI and parallel copyright suits are still being litigated. The EU permits commercial text and data mining unless the rightsholder opts out in a machine-readable way.',
    },
    {
      question: 'Do you need permission to scrape a website?',
      answer: 'Not for publicly available data in the US: public access is not hacking and logged-out scrapers generally are not bound by site terms. You do need a legal basis for personal, copyrighted, or login-gated data.',
    },
  ],

  relatedSites: [
    { title: 'Is Cold Email Legal?', url: 'https://iscoldemaillegal.com/' },
    { title: "How to Find Anyone's Email Address", url: 'https://howtofindanyonesemail.com/' },
    { title: 'How to Verify Email Addresses', url: 'https://howtoverifyemails.com/' },
    { title: 'Do Reddit Mentions Help SEO?', url: 'https://doredditmentionshelpseo.com/' },
  ],

  posthog: {
    key: 'YOUR_POSTHOG_KEY',
    host: 'https://us.i.posthog.com',
  },

  indexNowKey: 'a1b4c7d2e5f8',
};
