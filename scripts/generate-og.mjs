/**
 * Per-page share images (1200×630): the page's photograph pushed to the
 * house duotone, with the title set over it. Written to public/og/…
 * and referenced by usePageMeta on the detail pages.
 *   node scripts/generate-og.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const read = (f) => JSON.parse(fs.readFileSync(path.join(root, 'src', 'data', f), 'utf8'));

const W = 1200;
const H = 630;

function wrap(text, max = 26) {
  const words = text.split(' ');
  const lines = [''];
  for (const word of words) {
    const line = lines[lines.length - 1];
    if ((line + ' ' + word).trim().length > max && line !== '') lines.push(word);
    else lines[lines.length - 1] = (line + ' ' + word).trim();
  }
  return lines.slice(0, 3);
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/'/g, '’');

function overlay(overline, title, meta) {
  const lines = wrap(title);
  const size = lines.length > 2 ? 58 : 72;
  const titleY = 300 - (lines.length - 1) * (size * 0.5);
  const tspans = lines
    .map((line, i) => `<tspan x="80" dy="${i === 0 ? 0 : size * 1.04}">${esc(line)}</tspan>`)
    .join('');

  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="#14140F" opacity="0.38"/>
  <rect x="80" y="88" width="${W - 160}" height="1.5" fill="#F4F1EA" opacity="0.9"/>
  <text x="80" y="132" font-family="Arial" font-size="19" letter-spacing="4" fill="#D98A5F">${esc(
    overline.toUpperCase()
  )}</text>
  <text x="80" y="${titleY}" font-family="Georgia" font-size="${size}" fill="#F4F1EA">${tspans}</text>
  <rect x="80" y="${H - 108}" width="${W - 160}" height="1" fill="#F4F1EA" opacity="0.55"/>
  <text x="80" y="${H - 66}" font-family="Arial" font-size="17" letter-spacing="2.5" fill="#E8E2D4">${esc(
    meta.toUpperCase()
  )}</text>
  <text x="${W - 80}" y="${H - 66}" text-anchor="end" font-family="Georgia" font-size="24" font-style="italic" fill="#F4F1EA">Aphelion</text>
</svg>`);
}

async function render(photoKey, svg, outFile) {
  const bg = await sharp(path.join(root, 'public', 'images', `${photoKey}.jpg`))
    .resize(W, H, { fit: 'cover' })
    .grayscale()
    .tint({ r: 214, g: 197, b: 172 })
    .modulate({ brightness: 0.72 })
    .toBuffer();

  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  await sharp(bg)
    .composite([{ input: svg }])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(outFile);
  console.log(path.relative(root, outFile));
}

for (const e of read('expeditions.json')) {
  await render(
    e.photo,
    overlay(`Expedition ${e.no} — ${e.region}`, e.name, `${e.place} · ${e.nights} · ${e.price}`),
    path.join(root, 'public', 'og', 'expeditions', `${e.id}.jpg`)
  );
}

for (const n of read('notes.json')) {
  await render(
    n.photo,
    overlay(`Field Notes — ${n.cat}`, n.title, `${n.author} · ${n.read} · ${n.date}`),
    path.join(root, 'public', 'og', 'field-notes', `${n.slug}.jpg`)
  );
}

console.log('Done.');
