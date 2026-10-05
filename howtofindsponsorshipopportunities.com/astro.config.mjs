// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { readFileSync, existsSync } from 'node:fs';

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

export default defineConfig({
  site: SITE,
  integrations: [
    sitemap({
      serialize(item) {
        const d = contentDate(item.url);
        if (d) item.lastmod = new Date(d + 'T00:00:00Z').toISOString();
        return item;
      },
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
