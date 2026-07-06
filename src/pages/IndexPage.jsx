import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import SectionNumber from '../components/SectionNumber';
import Accordion from '../components/Accordion';
import TextLink from '../components/TextLink';
import usePageMeta from '../hooks/usePageMeta';
import faq from '../data/faq.json';
import expeditions from '../data/expeditions.json';
import notes from '../data/notes.json';
import places from '../data/places.json';
import studio from '../data/studio.json';

/* Curated cross-references — the terms a reader might actually look up. */
const TERMS = [
  { label: 'Aurora departures', to: '/expeditions?kind=aurora' },
  { label: 'Auroral oval', to: '/field-notes/why-we-stopped-promising-the-aurora' },
  { label: 'Bortle scale', to: '/field-notes/reading-the-bortle-scale' },
  { label: 'Dark adaptation', to: '/field-notes/the-camera-you-already-own' },
  { label: 'Dark windows (new moons)', to: '/' },
  { label: 'Gran Telescopio Canarias', to: '/expeditions/la-palma' },
  { label: 'Kp index', to: '/field-notes/why-we-stopped-promising-the-aurora' },
  { label: 'Ley del Cielo, 1988', to: '/field-notes/a-short-history-of-the-observatory-tour' },
  { label: 'Magellanic Clouds', to: '/expeditions/atacama' },
  { label: 'Milky Way core, overhead', to: '/expeditions/namibrand' },
  { label: 'Observatory access', to: '/expeditions?kind=observatory' },
  { label: 'Zodiacal light', to: '/field-notes/reading-the-bortle-scale' },
];

function buildIndex() {
  const entries = [
    ...expeditions.map((e) => ({ label: e.name, to: `/expeditions/${e.id}`, kind: 'Expedition' })),
    ...places.map((p) => ({ label: p.name, to: '/places', kind: 'Place' })),
    ...notes.map((n) => ({ label: n.title, to: `/field-notes/${n.slug}`, kind: 'Essay' })),
    ...studio.guides.map((g) => ({ label: g.name, to: '/studio', kind: 'Guide' })),
    ...TERMS.map((t) => ({ ...t, kind: 'Term' })),
  ];

  const groups = new Map();
  for (const entry of entries) {
    const letter = entry.label.replace(/^(The|A|An|On|Why)\s+/i, '')[0].toUpperCase();
    if (!groups.has(letter)) groups.set(letter, []);
    groups.get(letter).push(entry);
  }
  return [...groups.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([letter, list]) => [letter, list.sort((a, b) => a.label.localeCompare(b.label))]);
}

export default function IndexPage() {
  usePageMeta({
    title: 'Index — Questions, answered plainly',
    description:
      'Group sizes, fitness, cancellation, children, cameras, and whether you will actually see the aurora — answered without the sales voice. Plus the index proper: every place, expedition and essay, alphabetised.',
  });

  const index = buildIndex();

  return (
    <>
      <section className="container pt-lg pb-sm">
        <Reveal>
          <SectionNumber className="mb-overline">Section 05 — Index</SectionNumber>
        </Reveal>
        <Reveal as="h1" className="t-page">
          Questions,
          <br />
          <em>answered plainly.</em>
        </Reveal>
      </section>

      <section
        style={{
          maxWidth: 960,
          margin: '0 auto',
          padding: '0 var(--gutter) clamp(40px, 5vw, 64px)',
        }}
      >
        <Accordion items={faq} />
        <Reveal
          style={{
            marginTop: 'clamp(40px, 5vw, 64px)',
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            gap: 20,
            flexWrap: 'wrap',
          }}
        >
          <p className="lead-sm" style={{ fontSize: 22 }}>
            Something we haven&rsquo;t answered?
          </p>
          <TextLink to="/enquire">Write to us →</TextLink>
        </Reveal>
      </section>

      {/* the index proper */}
      <section className="container pb-xl">
        <Reveal className="rule-head" style={{ marginBottom: 'clamp(28px, 4vw, 44px)' }}>
          <h2 className="t-h2">
            <span className="sup-num">B</span>The index proper
          </h2>
          <p className="meta" style={{ marginTop: 12, maxWidth: 460 }}>
            Every place, expedition, essay and term in this issue, alphabetised the way a printed
            almanac would.
          </p>
        </Reveal>
        <div className="index-grid">
          {index.map(([letter, entries]) => (
            <Reveal key={letter} className="index-group">
              <p className="num index-group__letter">{letter}</p>
              <ul>
                {entries.map((entry) => (
                  <li key={`${entry.label}-${entry.to}`}>
                    <Link to={entry.to} className="lnk-in">
                      {entry.label}
                    </Link>
                    <span className="index-entry__kind"> — {entry.kind}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
