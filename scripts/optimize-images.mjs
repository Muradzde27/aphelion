/**
 * Builds the responsive variants the <Photo> component serves:
 * public/images/{key}-{w}.avif and .jpg at the widths below (never
 * enlarging), plus src/lib/photo-manifest.json recording which widths
 * exist per key. Run after (re)generating any source image:
 *   node scripts/generate-images.mjs && node scripts/optimize-images.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMG_DIR = path.join(__dirname, '..', 'public', 'images');
const MANIFEST = path.join(__dirname, '..', 'src', 'lib', 'photo-manifest.json');
const WIDTHS = [480, 960, 1600];

const sources = fs
  .readdirSync(IMG_DIR)
  .filter((f) => /^[a-z]+\.jpg$/.test(f)) // originals only, not -480 etc.
  .map((f) => f.replace('.jpg', ''));

const manifest = {};

for (const key of sources) {
  const input = path.join(IMG_DIR, `${key}.jpg`);
  const { width: originalWidth } = await sharp(input).metadata();
  const widths = WIDTHS.filter((w) => w <= originalWidth);
  if (widths.length === 0) widths.push(originalWidth);
  manifest[key] = widths;

  for (const w of widths) {
    const resized = sharp(input).resize({ width: w, withoutEnlargement: true });
    await resized
      .clone()
      .avif({ quality: 55 })
      .toFile(path.join(IMG_DIR, `${key}-${w}.avif`));
    await resized
      .clone()
      .jpeg({ quality: 78, mozjpeg: true })
      .toFile(path.join(IMG_DIR, `${key}-${w}.jpg`));
  }
  console.log(`${key}: ${widths.join(', ')}px`);
}

fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
console.log(`Manifest — ${Object.keys(manifest).length} keys → src/lib/photo-manifest.json`);
