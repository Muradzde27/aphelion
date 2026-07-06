import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import SectionNumber from '../components/SectionNumber';
import Figure from '../components/Figure';
import TextLink from '../components/TextLink';
import ExpeditionItem from '../components/ExpeditionItem';
import MoonCalendar from '../components/MoonCalendar';
import Photo from '../components/Photo';
import usePageMeta from '../hooks/usePageMeta';
import expeditions from '../data/expeditions.json';
import notes from '../data/notes.json';
import studio from '../data/studio.json';

const FEATURED_IDS = ['lofoten-nights', 'atacama', 'namibrand'];

export default function Home() {
  usePageMeta({
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'TravelAgency',
      name: 'Aphelion',
      description:
        'Small, slow expeditions to the last genuinely dark places on Earth — guided by working astronomers, measured against the phases of the moon.',
      email: 'hello@aphelion.travel',
      telephone: '+47 902 14 880',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Storgata 42',
        postalCode: '9008',
        addressLocality: 'Tromsø',
        addressCountry: 'NO',
      },
      foundingDate: '2014',
    },
  });

  const featured = FEATURED_IDS.map((id) => expeditions.find((e) => e.id === id));
  const teaser = notes[0];

  return (
    <>
      <div className="container">
        <p className="masthead">
          <span>Issue No. 14</span>
          <span className="hide-sm">The Dark-Sky Almanac</span>
          <span>Winter — MMXXVI</span>
        </p>
      </div>

      {/* hero spread */}
      <section
        className="container"
        style={{
          paddingTop: 'clamp(40px, 7vw, 96px)',
          paddingBottom: 'clamp(30px, 5vw, 70px)',
        }}
      >
        <div className="grid-hero">
          <div>
            <Reveal
              as="p"
              className="overline overline--rust"
              style={{ marginBottom: 'clamp(20px, 3vw, 38px)' }}
            >
              01 — The Lead
            </Reveal>
            <Reveal as="h1" className="t-display">
              The far point
              <br />
              of the orbit,
              <br />
              <em>
                where the sky
                <br />
                begins again.
              </em>
            </Reveal>
          </div>
          <Reveal style={{ paddingBottom: 10 }}>
            <p className="lead" style={{ marginBottom: 26 }}>
              Aphelion runs small, slow expeditions to the last genuinely dark places on Earth —
              guided by working astronomers, measured against the phases of the moon.
            </p>
            <div style={{ height: 1, background: 'var(--hairline)', marginBottom: 18 }} />
            <p
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: 12,
                letterSpacing: '0.06em',
                color: 'var(--grey)',
              }}
            >
              <span>{studio.established}</span>
              <TextLink to="/expeditions" caps={false} style={{ color: 'var(--ink)' }}>
                View the season →
              </TextLink>
            </p>
          </Reveal>
        </div>
      </section>

      {/* lead image */}
      <section className="container pb-md">
        <Reveal>
          <Figure
            photoKey="wide"
            size="wide"
            caption="Above — Moonless night over the Reine massif, Lofoten. Exposure 25s, ISO 3200."
            fig="Fig. 01"
            priority
          />
        </Reveal>
      </section>

      {/* featured expeditions */}
      <section className="container py-block">
        <Reveal className="list-head" style={{ marginBottom: 6 }}>
          <h2 className="t-h2">
            <span className="sup-num">02</span>The season ahead
          </h2>
          <TextLink to="/expeditions">All expeditions</TextLink>
        </Reveal>
        <div>
          {featured.map((t) => (
            <Reveal key={t.id}>
              <ExpeditionItem expedition={t} variant="featured" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* the dark windows — computed new moons */}
      <MoonCalendar />

      {/* field note teaser */}
      <section
        className="container"
        style={{
          paddingTop: 'clamp(30px, 5vw, 70px)',
          paddingBottom: 'clamp(50px, 7vw, 100px)',
        }}
      >
        <div className="grid-note">
          <Reveal as="figure">
            <div className="ph ph--tall">
              <Photo k="tall" sizes="(min-width: 841px) 45vw, 100vw" />
            </div>
          </Reveal>
          <Reveal>
            <SectionNumber className="mb-overline" no="04">
              From the Field Notes
            </SectionNumber>
            <h2
              className="row-title"
              style={{
                fontSize: 'clamp(30px, 4.2vw, 58px)',
                lineHeight: 1.02,
                letterSpacing: '-0.015em',
                marginBottom: 22,
              }}
            >
              On the discipline
              <br />
              of waiting for
              <br />
              <em>a clear night.</em>
            </h2>
            <p className="lead-sm" style={{ maxWidth: 460, marginBottom: 28 }}>
              {teaser.dek} — and why we no longer promise the aurora.
            </p>
            <Link to={`/field-notes/${teaser.slug}`} className="lnk lnk-caps">
              Read the note — {teaser.author}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
