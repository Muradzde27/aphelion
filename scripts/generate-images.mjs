/**
 * One-off asset generation — not part of the running app.
 *
 * Fetches the nine editorial background photographs from the
 * pollinations.ai image service and writes them to public/images/.
 * Re-run any time to refresh a shot; change its seed for a different take.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, '..', 'public', 'images');
fs.mkdirSync(OUT_DIR, { recursive: true });

const SUFFIX =
  'long exposure astrophotography, fine art documentary photography, muted warm grayscale duotone tones, high detail, no text, no watermark, no people unless stated';

const SHOTS = [
  {
    key: 'wide',
    w: 1600,
    h: 900,
    seed: 2077,
    prompt: `Sweeping wide-angle view of a moonless arctic fjord at night, jagged snow-dusted granite peaks framing calm dark water, faint aurora glow low on the horizon, clear empty sky with only stars, no moon, no orbs, no artifacts, ${SUFFIX}`,
  },
  {
    key: 'tall',
    w: 900,
    h: 1200,
    seed: 1002,
    prompt: `Vertical shot of a solitary wooden lodge window glowing warm against a vast starry night sky, silhouettes of pine trees, ${SUFFIX}`,
  },
  {
    key: 'dusk',
    w: 1600,
    h: 1000,
    seed: 1003,
    prompt: `Traditional red fishing cabins on stilts over dark arctic water at dusk, faint green aurora overhead, snow-capped mountains behind, ${SUFFIX}`,
  },
  {
    key: 'ridge',
    w: 1600,
    h: 1000,
    seed: 1004,
    prompt: `Astronomical observatory domes on a high volcanic ridge above a sea of clouds at sunset, telescopes silhouetted against dramatic sky, ${SUFFIX}`,
  },
  {
    key: 'salt',
    w: 1600,
    h: 1000,
    seed: 1005,
    prompt: `Vast salt flat desert under the full arc of the Milky Way at night, faint star trails, cracked white ground stretching to the horizon, ${SUFFIX}`,
  },
  {
    key: 'dome',
    w: 1600,
    h: 1000,
    seed: 1006,
    prompt: `Interior of a large observatory dome at night, massive telescope silhouetted against a sliver of starry sky through the open shutter, dramatic engineering photography, ${SUFFIX}`,
  },
  {
    key: 'dune',
    w: 1600,
    h: 1000,
    seed: 1007,
    prompt: `Towering desert sand dunes under a brilliant star-filled night sky with the Milky Way core rising, wind-carved ridgelines, ${SUFFIX}`,
  },
  {
    key: 'ice',
    w: 1600,
    h: 1000,
    seed: 1008,
    prompt: `Glacier lagoon filled with drifting icebergs under a night sky with aurora reflected in still water, dramatic long exposure, ${SUFFIX}`,
  },
  {
    key: 'portrait',
    w: 900,
    h: 1125,
    seed: 1009,
    prompt: `Fine art portrait of a solitary astronomer standing beside a telescope on a dark mountain ridge at night, warm rim lighting, thoughtful pose, documentary style, muted warm grayscale tones, no text, no watermark`,
  },
];

async function fetchWithRetry(url, attempts = 3) {
  for (let i = 1; i <= attempts; i++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 4000) throw new Error(`Suspiciously small response (${buf.length} bytes)`);
      return buf;
    } catch (err) {
      console.warn(`  attempt ${i}/${attempts} failed: ${err.message}`);
      if (i === attempts) throw err;
      await new Promise((r) => setTimeout(r, 2000 * i));
    }
  }
  return undefined;
}

for (const shot of SHOTS) {
  const encoded = encodeURIComponent(shot.prompt);
  const url =
    `https://image.pollinations.ai/prompt/${encoded}` +
    `?width=${shot.w}&height=${shot.h}&model=flux&seed=${shot.seed}&nologo=true`;
  const dest = path.join(OUT_DIR, `${shot.key}.jpg`);

  console.log(`Generating ${shot.key} (${shot.w}x${shot.h})…`);
  const buf = await fetchWithRetry(url);
  fs.writeFileSync(dest, buf);
  console.log(`  saved ${dest} — ${(buf.length / 1024).toFixed(0)} KB`);
}

console.log('Done.');
