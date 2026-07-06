/**
 * Editorial background photographs, pushed toward the house duotone by CSS
 * (see `.ph img` in base.css). Generated once via scripts/generate-images.mjs
 * into public/images/; keys are referenced from the JSON data files.
 */
const KEYS = ['wide', 'tall', 'dusk', 'ridge', 'salt', 'dome', 'dune', 'ice', 'portrait'];

export function photo(key) {
  return `/images/${KEYS.includes(key) ? key : 'tall'}.jpg`;
}
