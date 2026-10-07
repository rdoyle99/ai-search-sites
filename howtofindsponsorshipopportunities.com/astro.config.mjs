// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { readFileSync, existsSync, readdirSync } from 'node:fs';

const SITE = 'https://howtofindsponsorshipopportunities.com';

// Sitemap lastmod = the page's own content date (the same "modified" the page prints in its schema), never the build date.
// Blog posts carry `MODIFIED = 'YYYY-MM-DD'` or `modified: 'YYYY-MM-DD'`; a page with no content date gets no lastmod.
function contentDate(url) {
  const path = url.replace(SITE, '').replace(/^\/|\/$/g, '');
  if (!path.startsWith('blog/') || path === 'blog') return undefined;
  const file = `src/pages/${path}.astro`;
  if (!existsSync(file)) return undefined;
  const src = readFileSync(file, 'utf8');
  const m = src.match(/MODIFIED\s*=\s*'(\d{4}-\d{2}-\d{2})'/) || src.match(/modified:\s*'(\d{4}-\d{2}-\d{2})'/) || src.match(/PUBLISHED\s*=\s*'(\d{4}-\d{2}-\d{2})'/);
  return m ? m[1] : undefined;
}

// The sitemap index lists sitemap-0.xml with this lastmod: the newest content date on any post. Without it the index had
// no lastmod for its child, so Google re-read the index daily but not sitemap-0.xml (last read 2026-09-28, before the
// five newest pages existed; found 2026-10-07). A new or changed post carries a new MODIFIED/PUBLISHED date, so the
// child's lastmod moves with the content, never with the build.
function newestContentDate() {
  let newest = '';
  for (const f of readdirSync('src/pages/blog')) {
    if (!f.endsWith('.astro') || f === 'index.astro') continue;
    const src = readFileSync(`src/pages/blog/${f}`, 'utf8');
    const m = src.match(/MODIFIED\s*=\s*'(\d{4}-\d{2}-\d{2})'/) || src.match(/modified:\s*'(\d{4}-\d{2}-\d{2})'/) || src.match(/PUBLISHED\s*=\s*'(\d{4}-\d{2}-\d{2})'/);
    if (m && m[1] > newest) newest = m[1];
  }
  return newest ? new Date(newest + 'T00:00:00Z') : undefined;
}

export default defineConfig({
  site: SITE,
  integrations: [
    sitemap({
      lastmod: newestContentDate(),
      serialize(item) {
        // the integration copies the index lastmod onto every URL: keep a URL's own content date, drop it when it has none
        const d = contentDate(item.url);
        item.lastmod = d ? new Date(d + 'T00:00:00Z').toISOString() : undefined;
        return item;
      },
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
