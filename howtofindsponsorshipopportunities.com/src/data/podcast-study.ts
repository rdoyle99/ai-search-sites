// This site's own study of podcast sponsors: Apple Podcasts' US top 200 chart, the latest 10 episodes of each show's
// public RSS feed, read 2 October 2026. Method, code and raw output: ~/codingprojects/seo-ops/sites/htfso/research/podcast-sponsors/
// (fetch.py, analyze.py, study-2026-10-02.json, README.md). Change a number there first, then here.

export const PODCASTS = {
  read: '2 October 2026',
  chart: "Apple Podcasts' US top 200 chart",
  shows: 197, // 200 on the chart; 3 had no readable public feed
  episodes: 1898,
  daiShows: 130, // notes carry an ad-insertion platform's privacy or "ad choices" notice (an ad-capable host, not proof ads ran)
  daiOnlyShows: 83, // the notice is the only sign
  namedShows: 62, // notes name at least one sponsor brand with its link or promo code
  eitherShows: 145,
  neitherShows: 52,
  top50: { shows: 50, named: 16, dai: 26, either: 33 },
  medianBrandsPerNamedShow: 5.5,
  distinctBrands: 225,
  brands3plus: 37,
  topBrands: [
    { name: 'Shopify', domain: 'shopify.com', shows: 14 },
    { name: 'Quince', domain: 'quince.com', shows: 12 },
    { name: 'AG1', domain: 'drinkag1.com', shows: 8 },
    { name: 'Ethos', domain: 'ethos.com', shows: 8 },
    { name: 'BetterHelp', domain: 'betterhelp.com', shows: 7 },
    { name: 'ZipRecruiter', domain: 'ziprecruiter.com', shows: 7 },
    { name: 'ARMRA', domain: 'armra.com', shows: 6 },
    { name: 'Helix Sleep', domain: 'helixsleep.com', shows: 5 },
    { name: 'Smalls', domain: 'smalls.com', shows: 5 },
    { name: 'Acorns', domain: 'acorns.com', shows: 4 },
    { name: 'Factor', domain: 'factormeals.com', shows: 4 },
    { name: 'Hims', domain: 'hims.com', shows: 4 },
    { name: 'Ultra', domain: 'takeultra.com', shows: 4 },
    { name: 'Tecovas', domain: 'tecovas.com', shows: 4 },
  ],
  platforms: [
    { name: 'AdsWizz (used by Simplecast and other hosts)', shows: 50 },
    { name: 'Spotify Audience Network / Megaphone', shows: 49 },
    { name: 'Omny Studio', shows: 16 },
    { name: 'ART19', shows: 11 },
    { name: 'Acast', shows: 5 },
  ],
  genres: [ // genres with 7 or more shows on the chart: shows, named a sponsor, any ad sign
    { name: 'True Crime', shows: 32, named: 4, either: 28 },
    { name: 'Comedy', shows: 17, named: 11, either: 16 },
    { name: 'Entrepreneurship', shows: 16, named: 5, either: 8 },
    { name: 'Society & Culture', shows: 12, named: 2, either: 9 },
    { name: 'Politics', shows: 12, named: 3, either: 8 },
    { name: 'Daily News', shows: 10, named: 1, either: 9 },
    { name: 'Self-Improvement', shows: 10, named: 3, either: 5 },
    { name: 'Technology', shows: 7, named: 1, either: 4 },
    { name: 'Sports', shows: 7, named: 2, either: 6 },
  ],
  // the 37 brands on 3+ shows, checked against Book a Sponsor's newsletter sponsor data on 2 October 2026
  newsletterJoin: { brands: 37, withNewsletterAd: 16 },
  // Book a Sponsor's public profile counts (its full filter, so higher than the join's stricter lower bound, e.g. Shopify 10 there) for the top brands that have one (bookasponsor.com/sponsors/<domain>, 2 October 2026)
  srProfiles: [
    { name: 'Shopify', domain: 'shopify.com', newsletters: 16 },
    { name: 'BetterHelp', domain: 'betterhelp.com', newsletters: 16 },
    { name: 'Quince', domain: 'quince.com', newsletters: 13 },
    { name: 'AG1', domain: 'drinkag1.com', newsletters: 6 },
  ],
};

export const pct = (a: number, b: number) => `${Math.round((a / b) * 100)}%`;
