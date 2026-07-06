import { Link, useParams } from 'react-router-dom';
import Reveal from '../components/Reveal';
import Figure from '../components/Figure';
import usePageMeta from '../hooks/usePageMeta';
import expeditions from '../data/expeditions.json';
import { KIND_SHORT } from '../lib/labels';
import NotFound from './NotFound';

export default function ExpeditionDetail() {
  const { id } = useParams();
  const t = expeditions.find((e) => e.id === id);

  usePageMeta(
    t
      ? {
          title: t.name,
          description: t.lead,
          ogImage: `/og/expeditions/${t.id}.jpg`,
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'TouristTrip',
            name: t.name,
            description: t.lead,
            touristType: 'Astro tourism',
            itinerary: t.itinerary.map((day) => ({
              '@type': 'TouristAttraction',
              name: day.t,
              description: day.x,
            })),
            provider: {
              '@type': 'Organization',
              name: 'Aphelion',
              email: 'hello@aphelion.travel',
            },
            offers: {
              '@type': 'Offer',
              price: t.price.replace(/[^\d]/g, ''),
              priceCurrency: 'EUR',
            },
          },
        }
      : { title: 'Off the map', description: 'This expedition does not exist.' }
  );

  if (!t) return <NotFound />;

  return (
    <>
      <article className="container pt-md">
        <Reveal
          as="nav"
          aria-label="Breadcrumb"
          className="label"
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 12,
            fontSize: 12,
            marginBottom: 'clamp(28px, 4vw, 48px)',
          }}
        >
          <Link to="/expeditions" className="lnk" style={{ color: 'var(--ink)' }}>
            Expeditions
          </Link>
          <span aria-hidden="true">/</span>
          <span style={{ color: 'var(--rust)' }}>{KIND_SHORT[t.kind]}</span>
        </Reveal>

        <div style={{ maxWidth: 920 }}>
          <Reveal as="p" className="overline overline--rust" style={{ marginBottom: 22 }}>
            {t.no} — {t.region}
          </Reveal>
          <Reveal as="h1" className="t-detail" style={{ marginBottom: 28 }}>
            {t.name}
          </Reveal>
          <Reveal as="p" className="lead-italic" style={{ maxWidth: 760 }}>
            {t.lead}
          </Reveal>
        </div>
      </article>

      <Reveal className="container" style={{ marginTop: 'clamp(36px, 5vw, 64px)' }}>
        <Figure
          photoKey={t.photo}
          size="detail"
          caption={`${t.place} — the principal observing site. ${t.bortle}.`}
          fig="Fig. 01"
          priority
        />
      </Reveal>

      <section className="container pb-xl" style={{ paddingTop: 'clamp(44px, 6vw, 88px)' }}>
        <div className="grid-detail">
          <div>
            <Reveal
              as="p"
              className="body-serif"
              style={{ marginBottom: 'clamp(44px, 6vw, 72px)', maxWidth: 640, lineHeight: 1.66 }}
            >
              {t.overview}
            </Reveal>

            <Reveal className="rule-head" style={{ marginBottom: 26 }}>
              <h2 className="t-h2">
                <span className="sup-num">A</span>The programme, night by night
              </h2>
            </Reveal>
            <div style={{ marginBottom: 'clamp(44px, 6vw, 72px)' }}>
              {t.itinerary.map((day) => (
                <Reveal key={day.d} className="itin-row">
                  <p className="itin-row__day">{day.d}</p>
                  <div>
                    <h3 className="t-h3" style={{ marginBottom: 8 }}>
                      {day.t}
                    </h3>
                    <p
                      style={{
                        fontSize: 15,
                        lineHeight: 1.65,
                        color: 'var(--ink-mid)',
                        maxWidth: 560,
                      }}
                    >
                      {day.x}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="grid-2">
              <div>
                <div className="rule-head" style={{ paddingTop: 18, marginBottom: 20 }}>
                  <h3 className="t-h3" style={{ fontSize: 24 }}>
                    What is included
                  </h3>
                </div>
                <ul className="incl-list">
                  {t.included.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div
                  style={{
                    borderTop: '1px solid var(--line-30)',
                    paddingTop: 18,
                    marginBottom: 20,
                  }}
                >
                  <h3 className="t-h3" style={{ fontSize: 24, color: 'var(--faint)' }}>
                    Not included
                  </h3>
                </div>
                <ul className="incl-list incl-list--muted">
                  {t.excluded.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal as="aside" className="rail-wrap" aria-label="Booking summary">
            <div className="rail">
              <p
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  marginBottom: 22,
                }}
              >
                <span className="label">From</span>
                <span className="price-serif" style={{ fontSize: 38 }}>
                  {t.price}
                </span>
              </p>
              <dl style={{ margin: 0 }}>
                <div className="rail__row">
                  <dt>Duration</dt>
                  <dd>{t.nights}</dd>
                </div>
                <div className="rail__row">
                  <dt>Season</dt>
                  <dd>{t.months}</dd>
                </div>
                <div className="rail__row">
                  <dt>Sky</dt>
                  <dd>{t.bortle}</dd>
                </div>
                <div className="rail__row">
                  <dt>Next departure</dt>
                  <dd>{t.nextDate}</dd>
                </div>
                <div className="rail__row">
                  <dt>Places left</dt>
                  <dd style={{ color: 'var(--rust)' }}>{t.groupLeft}</dd>
                </div>
              </dl>
              <Link
                to={`/enquire?expedition=${t.id}`}
                className="btn btn--full"
                style={{ marginTop: 24 }}
              >
                Enquire about this expedition
              </Link>
              <p
                className="caption"
                style={{ textAlign: 'center', marginTop: 14, color: 'var(--faint)' }}
              >
                Free cancellation up to 30 days
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
