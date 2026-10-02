// Sponsor Radar's own numbers, the one place this site reads them from. Each block names its source and read date.
// Truth ledger: ~/codingprojects/seo-ops/sites/htfso/facts.json (owned_proof_numbers). Change a number here, never inline.

export const SR = {
  name: 'Sponsor Radar',
  url: 'https://sponsorradar.co',
  cta: (content: string) =>
    `https://sponsorradar.co/?utm_source=howtofindsponsorshipopportunities.com&utm_medium=referral&utm_campaign=sister&utm_content=${encodeURIComponent(content)}`,
  ratesUrl: 'https://sponsorradar.co/newsletter-sponsorship-rates',
  proposalUrl: 'https://sponsorradar.co/sponsorship-proposal',
  sponsorsUrl: 'https://sponsorradar.co/newsletter-sponsors',
  monetizeUrl: 'https://sponsorradar.co/how-to-monetize-a-newsletter',
};

// Newsletter list prices: 321 newsletters that print a main-slot price and a list size of 500+ on their advertise page,
// read 29 September 2026 (sponsorradar.co/newsletter-sponsorship-rates; SR facts C09).
export const RATES = {
  read: '29 September 2026',
  n: 321,
  rows: [
    { size: 'Under 5,000', n: 68, medianSubs: 2150, p25: 95, median: 150, p75: 263, perK: 69.84 },
    { size: '5,000 to 19,999', n: 96, medianSubs: 10000, p25: 239, median: 310, p75: 513, perK: 36.3 },
    { size: '20,000 to 49,999', n: 76, medianSubs: 31650, p25: 300, median: 520, p75: 1025, perK: 19.23 },
    { size: '50,000 to 99,999', n: 41, medianSubs: 70261, p25: 450, median: 700, p75: 1400, perK: 10.53 },
    { size: '100,000 or more', n: 40, medianSubs: 172000, p25: 470, median: 1300, p75: 3063, perK: 6.66 },
  ],
  doublingLift: '39%', // a list twice the size lists its main slot about 39% higher (log-log fit, b = 0.476)
  // other placements inside the same newsletter, against its own main slot
  placements: [
    { name: 'Second slot in the same issue', n: 104, median: '59%', middle: '47% to 70%' },
    { name: 'Classified or text ad', n: 160, median: '40%', middle: '26% to 50%' },
    { name: 'Dedicated send (the whole email)', n: 98, median: '2.31 times', middle: '1.85 to 3.33 times' },
  ],
  minList: 500, // the size rows count newsletters that print a list of 500 or more
  pagesRead: 851,
  pricesListed: 4564,
  passionfroot: 259,
};

// Who runs ads: share of newsletters (5+ issues published in the 90 days to 30 September 2026) that ran a paid sponsor ad in
// those 90 days, by reported list size (SR public-guide-stats:v1; SR facts owned_proof_numbers).
export const ADS = {
  read: '30 September 2026',
  n: 11967,
  share: '17%',
  bySize: [
    { size: 'Under 5,000', share: '10%', n: 2345 },
    { size: '5,000 to 19,999', share: '15%', n: 3017 },
    { size: '20,000 to 49,999', share: '19%', n: 1302 },
    { size: '50,000 to 99,999', share: '22%', n: 536 },
    { size: '100,000 or more', share: '32%', n: 577 },
  ],
};

// Sponsors seen (SR facts C10, 2 October 2026).
export const SPONSORS = { brands: 5866, newsletters: 3238, read: '2 October 2026' };

// Sponsor Radar's own pitching: first pitches sent for 31 newsletters to brands, 27 August to 24 September 2026
// (every send at least 7 days old when read, test sends and the operator's address left out), read 2 October 2026
// from ns_pitches by each brand's first answer. Query: seo-ops/sites/htfso/research/2026-10-02.md.
export const PITCHES = {
  window: '27 August to 24 September 2026',
  read: '2 October 2026',
  sent: 13429,
  newsletters: 31,
  brands: 11079,
  replies: 226,
  replyRate: '1.7%',
  yeses: 34,
  yesPer1000: '2.5',
  pitchesPerYes: 395,
  timing: { n: 207, medianHours: 8.5, within24h: '64%', within3d: '76%', within7d: '92%' },
  evidence: {
    seen: { label: 'Brands with a newsletter ad on record', sent: 4033, replies: 104, rate: '2.6%', yeses: 20 },
    none: { label: 'Brands with no newsletter ad on record', sent: 9396, replies: 122, rate: '1.3%', yeses: 14 },
  },
  titles: [
    { label: 'Founder, CEO or owner', sent: 9157, replies: 133, rate: '1.45%' },
    { label: 'Marketing', sent: 2179, replies: 31, rate: '1.42%' },
  ],
};
