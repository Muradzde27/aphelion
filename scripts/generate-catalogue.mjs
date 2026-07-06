/**
 * Prints the season catalogue: the cover plus every expedition page,
 * rendered through the print stylesheet and merged into one PDF at
 * public/aphelion-season-mmxxvi.pdf.
 *
 * Requires a running site (npm run dev in another terminal), then:
 *   node scripts/generate-catalogue.mjs [baseUrl]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';
import { PDFDocument } from 'pdf-lib';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '..', 'public', 'aphelion-season-mmxxvi.pdf');
const BASE = process.argv[2] || 'http://localhost:5173';

const expeditions = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'expeditions.json'), 'utf8')
);
const routes = ['/', ...expeditions.map((e) => `/expeditions/${e.id}`)];

const browser = await chromium.launch();
const page = await browser.newPage();
const parts = [];

for (const route of routes) {
  await page.goto(BASE + route, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  parts.push(await page.pdf({ format: 'A4', printBackground: true, preferCSSPageSize: false }));
  console.log(`printed ${route}`);
}
await browser.close();

const merged = await PDFDocument.create();
for (const buf of parts) {
  const doc = await PDFDocument.load(buf);
  const pages = await merged.copyPages(doc, doc.getPageIndices());
  pages.forEach((p) => merged.addPage(p));
}
merged.setTitle('Aphelion — The Dark-Sky Almanac, Winter MMXXVI');
merged.setAuthor('Aphelion');

fs.writeFileSync(OUT, await merged.save());
console.log(`${path.basename(OUT)} — ${(fs.statSync(OUT).size / 1024).toFixed(0)} KB`);
