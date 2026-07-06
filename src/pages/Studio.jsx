import Reveal from '../components/Reveal';
import SectionNumber from '../components/SectionNumber';
import Figure from '../components/Figure';
import Photo from '../components/Photo';
import usePageMeta from '../hooks/usePageMeta';
import studio from '../data/studio.json';

export default function Studio() {
  usePageMeta({
    title: 'The Studio',
    description:
      'Aphelion, est. Tromsø 2014. Small groups, working astronomers, and the belief that a genuinely dark sky is not a luxury but a reminder.',
  });

  return (
    <>
      <section className="container pt-lg pb-sm">
        <Reveal>
          <SectionNumber className="mb-overline">Section 04 — The Studio</SectionNumber>
        </Reveal>
        <Reveal
          as="h1"
          className="t-page"
          style={{ fontSize: 'clamp(38px, 6vw, 104px)', letterSpacing: '-0.022em', maxWidth: 1100 }}
        >
          We take people to
          <br />
          where the noise
          <br />
          <em>runs out.</em>
        </Reveal>
      </section>

      <Reveal className="container">
        <Figure photoKey="ridge" size="article" caption={studio.heroCaption} priority />
      </Reveal>

      <section
        className="container"
        style={{ paddingTop: 'clamp(48px, 6vw, 90px)', paddingBottom: 'clamp(48px, 6vw, 90px)' }}
      >
        <div className="grid-note" style={{ alignItems: 'start', gap: 'clamp(30px, 5vw, 80px)' }}>
          <Reveal className="rule-head">
            <h2 className="t-h2">Our mission</h2>
          </Reveal>
          <Reveal>
            <p
              className="body-serif"
              style={{ fontSize: 'clamp(20px, 2.2vw, 28px)', lineHeight: 1.5, marginBottom: 26 }}
            >
              {studio.mission.lead}
            </p>
            {studio.mission.body.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                style={{
                  fontSize: 16,
                  lineHeight: 1.72,
                  color: 'var(--ink-mid)',
                  maxWidth: 560,
                  marginBottom: 18,
                }}
              >
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* values */}
      <section className="container" style={{ paddingBottom: 'clamp(50px, 6vw, 90px)' }}>
        <div className="values-grid">
          {studio.values.map((v) => (
            <Reveal key={v.no} className="value-cell">
              <p className="num" style={{ fontSize: 22, marginBottom: 16 }}>
                {v.no}
              </p>
              <h3
                className="t-h3"
                style={{ fontSize: 'clamp(22px, 2.4vw, 30px)', marginBottom: 12 }}
              >
                {v.t}
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.68, color: 'var(--ink-mid)', maxWidth: 440 }}>
                {v.x}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* guides */}
      <section className="container pb-xl">
        <Reveal className="rule-head" style={{ marginBottom: 'clamp(32px, 4vw, 48px)' }}>
          <h2 className="t-h2">
            <span className="sup-num">A</span>Astronomers, not entertainers
          </h2>
        </Reveal>
        <div className="guides-grid">
          {studio.guides.map((g) => (
            <Reveal key={g.name}>
              <figure style={{ marginBottom: 18 }}>
                <div className="ph ph--guide">
                  <Photo
                    k={g.photo}
                    alt={`Portrait — ${g.name}`}
                    sizes="(min-width: 841px) 25vw, 100vw"
                  />
                </div>
              </figure>
              <h3 className="t-h3" style={{ fontSize: 24, marginBottom: 4 }}>
                {g.name}
              </h3>
              <p
                className="label"
                style={{
                  fontSize: 11.5,
                  letterSpacing: '0.1em',
                  color: 'var(--rust)',
                  marginBottom: 14,
                }}
              >
                {g.role}
              </p>
              <p style={{ fontSize: 14.5, lineHeight: 1.64, color: 'var(--ink-mid)' }}>{g.bio}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
