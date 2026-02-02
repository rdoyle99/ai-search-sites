#!/bin/bash
# This script generates the base config files for each site.
# Content files are generated separately.
BASE_DIR="/Users/ryandoyle/codingprojects/ai-search-sites"

generate_site() {
  local domain="$1"
  local dir="$BASE_DIR/$domain"
  
  # Remove old template files
  rm -f "$dir/src/pages/blog/cold-email-sending-limits-data.astro"
  rm -f "$dir/src/pages/blog/cold-email-warm-up-guide.astro"
  rm -f "$dir/src/pages/blog/cold-email-infrastructure-2026.astro"
  rm -f "$dir/src/pages/tools/cold-email-volume-calculator.astro"
  rm -f "$dir/src/pages/tools/spam-word-checker.astro"
  rm -f "$dir/src/pages/tools/subject-line-analyzer.astro"
  rm -f "$dir/public/a7b3c9d2e8f4.txt"
  
  echo "Cleaned $domain"
}

for domain in howmanydomainsforcoldmail.com coldmailopenrate.com howlongshouldacoldemailbe.com howtofindanyonesemail.com iswebscrapinglegal.com howtoverifyemails.com doredditmentionshelpseo.com howtofindsponsorshipopportunities.com; do
  generate_site "$domain"
done

echo "All sites cleaned"
