import manifest from '../lib/photo-manifest.json';
import { photo } from '../lib/photos';

/**
 * Responsive photograph for .ph blocks: AVIF with JPEG fallback, widths
 * from the manifest written by scripts/optimize-images.mjs. Pass `sizes`
 * matching the slot the image actually occupies; set `priority` on the
 * one above-the-fold hero per page (eager + fetchpriority=high → LCP).
 */
export default function Photo({ k, alt = '', sizes = '100vw', priority = false }) {
  const widths = manifest[k];
  const imgProps = priority
    ? { loading: 'eager', fetchPriority: 'high' }
    : { loading: 'lazy', decoding: 'async' };

  // No variants generated (fresh source image) — serve the original.
  if (!widths) {
    return <img src={photo(k)} alt={alt} {...imgProps} />;
  }

  const set = (ext) => widths.map((w) => `/images/${k}-${w}.${ext} ${w}w`).join(', ');

  return (
    <picture>
      <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
      <img src={photo(k)} srcSet={set('jpg')} sizes={sizes} alt={alt} {...imgProps} />
    </picture>
  );
}
