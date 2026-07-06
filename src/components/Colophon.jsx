import { useState } from 'react';
import { Link } from 'react-router-dom';
import studio from '../data/studio.json';

const COLS = [
  {
    head: 'Voyages',
    links: [
      { label: 'All expeditions', to: '/expeditions' },
      { label: 'Aurora', to: '/expeditions?kind=aurora' },
      { label: 'Dark sky', to: '/expeditions?kind=darksky' },
      { label: 'Observatories', to: '/expeditions?kind=observatory' },
    ],
  },
  {
    head: 'Editorial',
    links: [
      { label: 'Field Notes', to: '/field-notes' },
      { label: 'Places', to: '/places' },
      { label: 'The Studio', to: '/studio' },
      { label: 'Index & FAQ', to: '/index' },
    ],
  },
];

export default function Colophon() {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="colophon">
      <div
        className="container"
        style={{ paddingTop: 'clamp(44px, 6vw, 84px)', paddingBottom: 40 }}
      >
        <div className="colophon__grid">
          <div>
            <p className="colophon__brand">Aphelion</p>
            <p
              style={{
                fontSize: 14,
                lineHeight: 1.65,
                color: 'var(--grey)',
                maxWidth: 300,
                marginBottom: 24,
              }}
            >
              Astronomical expeditions to the darkest skies on Earth. Small groups, working
              astronomers, no light for a hundred miles.
            </p>
            <form
              className="subscribe"
              onSubmit={(e) => {
                e.preventDefault();
                setSubscribed(true);
              }}
            >
              <label className="label" htmlFor="almanac-email">
                The Almanac — monthly, quiet
              </label>
              <div className="subscribe__row">
                <input
                  id="almanac-email"
                  type="email"
                  required
                  placeholder="you@email.com"
                  disabled={subscribed}
                />
                <button type="submit" disabled={subscribed}>
                  {subscribed ? 'Subscribed ✓' : 'Subscribe'}
                </button>
              </div>
            </form>
          </div>

          {COLS.map((col) => (
            <div key={col.head}>
              <p className="label" style={{ marginBottom: 20, letterSpacing: '0.16em' }}>
                {col.head}
              </p>
              <div className="colophon__links">
                {col.links.map((lk) => (
                  <Link key={lk.label} to={lk.to} className="lnk-in">
                    {lk.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div>
            <p className="label" style={{ marginBottom: 20, letterSpacing: '0.16em' }}>
              Studio
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--ink-body)' }}>
              {studio.address[0]}
              <br />
              {studio.address[1]}
              <br />
              <br />
              <a href={`mailto:${studio.email}`} className="lnk-in">
                {studio.email}
              </a>
              <br />
              {studio.phone}
            </p>
          </div>
        </div>

        <div className="colophon__bottom">
          <span>© MMXXVI Aphelion — Set in Newsreader &amp; Archivo</span>
          <span style={{ display: 'flex', gap: 22 }}>
            <Link to="/system" className="lnk-in">
              The System
            </Link>
            <span>Printed under a dark sky</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
