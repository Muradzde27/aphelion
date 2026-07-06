/**
 * Shared IntersectionObserver for the reveal-on-scroll effect.
 *
 * The hidden state is gated behind `html.rvl` (added here only when the
 * browser supports IO and the user has not asked for reduced motion), so
 * without JS the content is simply visible.
 */
let observer = null;
let armed = false;

export function armReveal() {
  if (armed) return;
  armed = true;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!('IntersectionObserver' in window) || reduced) return;

  document.documentElement.classList.add('rvl');
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -8% 0px' }
  );
}

export function observe(el) {
  if (!el) return undefined;
  if (!observer) {
    el.classList.add('in');
    return undefined;
  }

  // Elements already in the viewport fade in right away instead of waiting
  // for a scroll event that may never come.
  const rect = el.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.94) {
    requestAnimationFrame(() => el.classList.add('in'));
    return undefined;
  }

  observer.observe(el);

  // Safety net: never leave content hidden.
  const safety = setTimeout(() => el.classList.add('in'), 2600);
  return () => {
    clearTimeout(safety);
    observer.unobserve(el);
  };
}
