// Shared author and article schema. Ryan Doyle is a real person (founder of Sponsor Radar); never invent another author.
const SITE = 'https://howtofindsponsorshipopportunities.com';

export const AUTHOR = {
  name: 'Ryan Doyle',
  title: 'founder of Sponsor Radar',
  url: 'https://sponsorradar.co/company',
  sameAs: ['https://www.linkedin.com/in/ryan-doyle/', 'https://sponsorradar.co/company'],
};

export const ORG_ID = 'https://sponsorradar.co/#organization';

export const personSchema = {
  '@type': 'Person',
  '@id': `${SITE}/about/#ryan-doyle`,
  name: AUTHOR.name,
  jobTitle: 'Founder, Sponsor Radar',
  url: `${SITE}/about/`,
  sameAs: AUTHOR.sameAs,
};

export function articleSchema(o: { headline: string; description: string; path: string; published: string; modified: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: o.headline,
    description: o.description,
    url: `${SITE}${o.path}`,
    mainEntityOfPage: `${SITE}${o.path}`,
    datePublished: o.published,
    dateModified: o.modified,
    author: personSchema,
    publisher: { '@type': 'Organization', '@id': ORG_ID, name: 'Sponsor Radar', url: 'https://sponsorradar.co' },
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}

const fmt = (d: string) => new Date(d + 'T12:00:00Z').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
export const longDate = fmt;
