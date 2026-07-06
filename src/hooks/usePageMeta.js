import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE = 'Aphelion';
const FALLBACK_DESCRIPTION =
  'Small, slow expeditions to the last genuinely dark places on Earth — guided by working astronomers, measured against the phases of the moon.';

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * Per-page title / description / Open Graph tags for the SPA, plus an
 * optional JSON-LD payload (one structured-data block per page).
 */
export default function usePageMeta({ title, description, jsonLd, ogImage } = {}) {
  const { pathname } = useLocation();
  // Serialise once so a fresh object literal per render doesn't re-run the effect.
  const jsonLdText = jsonLd ? JSON.stringify(jsonLd) : null;

  useEffect(() => {
    const fullTitle = title ? `${title} — ${SITE}` : `${SITE} — Astronomical Expeditions`;
    const desc = description || FALLBACK_DESCRIPTION;

    document.title = fullTitle;
    setMeta('name', 'description', desc);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', desc);
    setMeta('property', 'og:url', window.location.origin + pathname);
    setMeta('property', 'og:image', window.location.origin + (ogImage || '/og-image.png'));

    let script = document.getElementById('page-jsonld');
    if (jsonLdText) {
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = 'page-jsonld';
        document.head.appendChild(script);
      }
      script.textContent = jsonLdText;
    } else if (script) {
      script.remove();
    }
  }, [title, description, jsonLdText, ogImage, pathname]);
}
