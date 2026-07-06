/**
 * Writes public/sitemap.xml from the route table plus the ids/slugs in
 * src/data. Run after adding an expedition or essay:
 *   node scripts/generate-sitemap.mjs
 * Change ORIGIN when the site gets a real domain.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const read = (f) => JSON.parse(fs.readFileSync(path.join(root, 'src', 'data', f), 'utf8'));

const ORIGIN = process.env.SITE_ORIGIN || 'https://aphelion-muradzde.vercel.app';

const staticRoutes = [
  '/',
  '/expeditions',
  '/field-notes',
  '/places',
  '/studio',
  '/enquire',
  '/index',
  '/system',
];
const urls = [
  ...staticRoutes,
  ...read('expeditions.json').map((e) => `/expeditions/${e.id}`),
  ...read('notes.json').map((n) => `/field-notes/${n.slug}`),
];

const today = new Date().toISOString().slice(0, 10);
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${ORIGIN}${u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(root, 'public', 'sitemap.xml'), xml);
console.log(`public/sitemap.xml — ${urls.length} URLs`);
