/**
 * The red-light night theme. State lives on <html data-theme> and in
 * localStorage; index.html applies the stored value before first paint so
 * the page never flashes paper white at night.
 */
const KEY = 'aphelion-theme';

export function currentTheme() {
  return document.documentElement.dataset.theme === 'night' ? 'night' : 'day';
}

export function toggleTheme() {
  const next = currentTheme() === 'night' ? 'day' : 'night';
  if (next === 'night') {
    document.documentElement.dataset.theme = 'night';
  } else {
    delete document.documentElement.dataset.theme;
  }
  try {
    localStorage.setItem(KEY, next);
  } catch {
    // private mode etc. — the toggle still works for the session
  }
  return next;
}
