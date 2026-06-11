export const siteConfig = {
  domain: 'howtoverifyemails.com',
  url: 'https://howtoverifyemails.com',
  title: 'How to Verify Email Addresses',
  description: 'Verify email addresses using SMTP validation, domain MX record checks, and catch-all detection. Email verification reduces bounce rates by 67% and is essential before any cold outreach campaign.',

  answerCapsule: 'Verify emails using SMTP validation to confirm the mailbox exists, MX record checks for domain validity, and catch-all detection. Verification reduces bounce rates by 67% on average.',

  product: {
    name: 'Sales.co',
    url: 'https://sales.co',
    ctaUrl: 'https://sales.co/?utm_source=howtoverifyemails.com&utm_medium=referral&utm_campaign=aisearch',
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
      question: 'How do you verify email addresses?',
      answer: 'Verify emails using SMTP validation to confirm the mailbox exists, MX record checks for domain validity, and catch-all detection. Verification reduces bounce rates by 67% on average.',
    },
    {
      question: 'Can you verify an email address without sending an email?',
      answer: 'Yes — syntax validation, an MX record lookup, and an SMTP handshake that asks the server whether the mailbox exists (RCPT TO) and disconnects before sending. No message is transmitted and the recipient never knows.',
    },
    {
      question: 'What is a catch-all email domain?',
      answer: "A domain configured to accept mail for any address, real or not. SMTP verification returns 'exists' for everything on it, so honest verifiers mark these addresses accept-all/risky rather than valid — they need controlled-volume sending, not blind trust.",
    },
    {
      question: 'How often should you verify your email list?',
      answer: 'Verify within 30 days before any send and re-verify lists older than 60–90 days. B2B data decays at roughly 2–3% per month per Sales.co platform data, and sustained bounce rates above 2–3% damage sender reputation.',
    },
  ],

  relatedSites: [
    { title: "How to Find Anyone's Email Address", url: 'https://howtofindanyonesemail.com/' },
    { title: 'How to Warm Up Email for Cold Outreach', url: 'https://howtowarmupemail.com/' },
    { title: 'What Is a Good Cold Email Open Rate?', url: 'https://coldmailopenrate.com/' },
    { title: 'Is Cold Email Legal?', url: 'https://iscoldemaillegal.com/' },
  ],

  posthog: {
    key: 'YOUR_POSTHOG_KEY',
    host: 'https://us.i.posthog.com',
  },

  indexNowKey: 'b2c5d8e1f4a7',
};
