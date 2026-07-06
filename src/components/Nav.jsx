import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { currentTheme, toggleTheme } from '../lib/theme';

const LINKS = [
  { to: '/expeditions', label: 'Expeditions', num: '01' },
  { to: '/field-notes', label: 'Field Notes', num: '02' },
  { to: '/places', label: 'Places', num: '03' },
  { to: '/studio', label: 'Studio', num: '04' },
  { to: '/index', label: 'Index', num: '05' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(currentTheme);
  const { pathname } = useLocation();

  const night = theme === 'night';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the menu on navigation and lock body scroll while it is open.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const navLinkClass = ({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`;

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="site-header__inner">
        <Link to="/" className="brand">
          <span className="brand__word">Aphelion</span>
          <span className="brand__tag">Astronomical Expeditions</span>
        </Link>

        <nav className="nav-desktop" aria-label="Primary">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} className={navLinkClass}>
              {l.label}
            </NavLink>
          ))}
          <NavLink to="/enquire" className="nav-link nav-link--enquire">
            Enquire
          </NavLink>
          <button
            type="button"
            className="theme-toggle"
            aria-pressed={night}
            title="Field astronomers use red lamps to keep their eyes dark-adapted"
            onClick={() => setTheme(toggleTheme())}
          >
            <span className="theme-toggle__dot" aria-hidden="true" />
            {night ? 'Daylight' : 'Red light'}
          </button>
        </nav>

        <button
          type="button"
          className="burger"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
        >
          Menu
        </button>
      </div>

      {open && (
        <div className="mobile-menu" id="mobile-menu">
          <div className="mobile-menu__bar">
            <span className="mobile-menu__brand">Aphelion</span>
            <button type="button" className="mobile-menu__close" onClick={() => setOpen(false)}>
              Close ✕
            </button>
          </div>
          <nav className="mobile-menu__nav" aria-label="Primary, mobile">
            {LINKS.map((l) => (
              <Link key={l.to} to={l.to} className="mobile-menu__link">
                <span className="mobile-menu__num">{l.num}</span>
                {l.label}
              </Link>
            ))}
            <Link to="/enquire" className="mobile-menu__enquire">
              Enquire
            </Link>
            <button
              type="button"
              className="theme-toggle theme-toggle--menu"
              aria-pressed={night}
              onClick={() => setTheme(toggleTheme())}
            >
              <span className="theme-toggle__dot" aria-hidden="true" />
              {night ? 'Daylight' : 'Red light'}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
