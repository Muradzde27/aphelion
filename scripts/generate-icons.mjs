/**
 * Rasterises the orbit mark into the PWA icon set:
 * icon-192.png, icon-512.png, icon-maskable-512.png, apple-touch-icon.png.
 *   node scripts/generate-icons.mjs
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '..', 'public');

// Same mark as favicon.svg; maskable variant pads the safe zone.
const mark = (pad) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="#F4F1EA"/>
  <g transform="translate(32 32) scale(${1 - pad}) translate(-32 -32)">
    <ellipse cx="32" cy="34" rx="23" ry="14" fill="none" stroke="#14140F" stroke-width="2" transform="rotate(-18 32 34)"/>
    <circle cx="26" cy="34" r="3.5" fill="#14140F"/>
    <circle cx="53.9" cy="26.9" r="4" fill="#B3502B"/>
  </g>
</svg>`;

const jobs = [
  ['icon-192.png', 192, 0],
  ['icon-512.png', 512, 0],
  ['icon-maskable-512.png', 512, 0.22],
  ['apple-touch-icon.png', 180, 0.08],
];

for (const [file, size, pad] of jobs) {
  await sharp(Buffer.from(mark(pad)))
    .resize(size, size)
    .png()
    .toFile(path.join(OUT, file));
  console.log(`${file} — ${size}px`);
}
