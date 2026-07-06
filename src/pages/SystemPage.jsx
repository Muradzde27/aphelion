import Reveal from '../components/Reveal';
import SectionNumber from '../components/SectionNumber';
import Photo from '../components/Photo';
import usePageMeta from '../hooks/usePageMeta';

const MOOD = [
  {
    photoKey: 'ridge',
    k: 'Reference',
    t: 'Cereal, Apartamento',
    x: 'Wide margins, honest photography, type left to breathe.',
  },
  {
    photoKey: 'dome',
    k: 'Architecture',
    t: 'David Chipperfield',
    x: 'Restraint as luxury; material and light over ornament.',
  },
  {
    photoKey: 'salt',
    k: 'Editorial',
    t: 'The Gentlewoman',
    x: 'A grid you can feel but never see. Captions that matter.',
  },
  {
    photoKey: 'ice',
    k: 'Interiors',
    t: 'John Pawson',
    x: 'Negative space treated as the subject, not the leftover.',
  },
];

const SWATCHES = [
  { name: 'Paper', hex: '#F4F1EA', bg: '#F4F1EA', ink: '#14140F', role: 'Background' },
  { name: 'Ink', hex: '#14140F', bg: '#14140F', ink: '#F4F1EA', role: 'Text, rules' },
  { name: 'Warm grey', hex: '#6B6558', bg: '#6B6558', ink: '#F4F1EA', role: 'Secondary text' },
  { name: 'Faint', hex: '#8A8474', bg: '#8A8474', ink: '#F4F1EA', role: 'Meta, captions' },
  { name: 'Rust', hex: '#B3502B', bg: '#B3502B', ink: '#F4F1EA', role: 'Accent — rare' },
  { name: 'Photo ink', hex: '#26251F', bg: '#26251F', ink: '#F4F1EA', role: 'Duotone base' },
];

const TYPE_SCALE = [
  {
    label: 'Display',
    spec: 'Newsreader · 400 · −0.022em · 0.94',
    sample: 'The far point',
    style: {
      fontFamily: 'var(--serif)',
      fontSize: 'clamp(48px, 8vw, 132px)',
      letterSpacing: '-0.022em',
    },
  },
  {
    label: 'Heading',
    spec: 'Newsreader · 400 · −0.015em',
    sample: 'The season ahead',
    style: {
      fontFamily: 'var(--serif)',
      fontSize: 'clamp(30px, 4vw, 54px)',
      letterSpacing: '-0.015em',
    },
  },
  {
    label: 'Italic lead',
    spec: 'Newsreader · italic · 1.42',
    sample: 'where the sky begins',
    style: {
      fontFamily: 'var(--serif)',
      fontSize: 'clamp(22px, 2.4vw, 30px)',
      fontStyle: 'italic',
    },
  },
  {
    label: 'Body serif',
    spec: 'Newsreader · 400 · 1.7 — reading',
    sample: 'Aphelion runs small, slow expeditions to the last dark places on Earth.',
    style: { fontFamily: 'var(--serif)', fontSize: 20 },
  },
  {
    label: 'Body sans',
    spec: 'Archivo · 400 · 1.7 — UI & captions',
    sample: 'Never more than twelve travellers to a guide.',
    style: { fontFamily: 'var(--sans)', fontSize: 16 },
  },
  {
    label: 'Overline',
    spec: 'Archivo · 500 · 0.16em · uppercase',
    sample: 'SECTION 01 — THE LEAD',
    style: {
      fontFamily: 'var(--sans)',
      fontSize: 12,
      fontWeight: 500,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
    },
  },
];

const SPACING = [8, 16, 24, 40, 64, 96];

function RuleHead({ no, children }) {
  return (
    <Reveal className="rule-head" style={{ marginBottom: 'clamp(28px, 4vw, 44px)' }}>
      <h2 className="t-h2">
        <span className="sup-num">{no}</span>
        {children}
      </h2>
    </Reveal>
  );
}

export default function SystemPage() {
  usePageMeta({
    title: 'The System',
    description:
      'The house style, set in full: mood, colour, type, spacing and components — the discipline that keeps every page reading like one publication.',
  });

  return (
    <>
      <section className="container pt-lg pb-sm">
        <Reveal>
          <SectionNumber className="mb-overline">Appendix — The System</SectionNumber>
        </Reveal>
        <div className="grid-split">
          <Reveal as="h1" className="t-page">
            The house style,
            <br />
            <em>set in full.</em>
          </Reveal>
          <Reveal
            as="p"
            className="lead"
            style={{ fontSize: 'clamp(17px, 1.6vw, 21px)', paddingBottom: 8 }}
          >
            Mood, tokens and components — the discipline that keeps every page reading like one
            publication.
          </Reveal>
        </div>
      </section>

      {/* mood */}
      <section className="container" style={{ paddingBottom: 'clamp(44px, 6vw, 84px)' }}>
        <RuleHead no="01">Mood — the printed page, not the web</RuleHead>
        <div className="guides-grid">
          {MOOD.map((m) => (
            <Reveal as="figure" key={m.t}>
              <div className="ph ph--guide" style={{ marginBottom: 12 }}>
                <Photo k={m.photoKey} alt={m.t} sizes="(min-width: 841px) 25vw, 100vw" />
              </div>
              <figcaption>
                <p className="label" style={{ fontSize: 11, marginBottom: 6 }}>
                  {m.k}
                </p>
                <p style={{ fontFamily: 'var(--serif)', fontSize: 19, marginBottom: 6 }}>{m.t}</p>
                <p style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--grey)' }}>{m.x}</p>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </section>

      {/* colour */}
      <section className="container" style={{ paddingBottom: 'clamp(44px, 6vw, 84px)' }}>
        <RuleHead no="02">Colour — near monochrome, one accent</RuleHead>
        <div className="swatch-grid">
          {SWATCHES.map((s) => (
            <Reveal key={s.name} className="swatch">
              <div className="swatch__chip" style={{ background: s.bg }}>
                <span style={{ color: s.ink }}>{s.role}</span>
              </div>
              <div className="swatch__meta">
                <p style={{ fontFamily: 'var(--serif)', fontSize: 18 }}>{s.name}</p>
                <p style={{ fontSize: 12, color: 'var(--faint)', marginTop: 2 }}>{s.hex}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal as="p" className="meta" style={{ marginTop: 20, maxWidth: 560 }}>
          The red-light theme swaps paper for graphite and turns the rust up a step — every value
          above derives from the same tokens in tokens.css.
        </Reveal>
      </section>

      {/* type */}
      <section className="container" style={{ paddingBottom: 'clamp(44px, 6vw, 84px)' }}>
        <RuleHead no="03">Type — Newsreader &amp; Archivo</RuleHead>
        <div>
          {TYPE_SCALE.map((t) => (
            <Reveal key={t.label} className="type-row">
              <p
                style={{
                  fontSize: 11.5,
                  letterSpacing: '0.1em',
                  color: 'var(--faint)',
                  lineHeight: 1.5,
                }}
              >
                {t.label}
                <br />
                <span style={{ color: 'var(--rust)' }}>{t.spec}</span>
              </p>
              <p style={{ lineHeight: 1.1, ...t.style }}>{t.sample}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* spacing + line & radius */}
      <section className="container" style={{ paddingBottom: 'clamp(44px, 6vw, 84px)' }}>
        <div className="grid-split" style={{ alignItems: 'start' }}>
          <div>
            <RuleHead no="04">Spacing — 8px base</RuleHead>
            <Reveal style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {SPACING.map((px) => (
                <span key={px} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span style={{ width: 24, fontSize: 12, color: 'var(--faint)' }}>{px}</span>
                  <span style={{ height: 14, background: 'var(--rust)', width: px }} />
                </span>
              ))}
            </Reveal>
          </div>
          <div>
            <RuleHead no="05">Line &amp; radius</RuleHead>
            <Reveal style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <span>
                <span className="caption" style={{ display: 'block', marginBottom: 8 }}>
                  Hairline — 1px, ink @ 15%
                </span>
                <span style={{ display: 'block', height: 1, background: 'var(--hairline)' }} />
              </span>
              <span>
                <span className="caption" style={{ display: 'block', marginBottom: 8 }}>
                  Rule — 1px, full ink
                </span>
                <span style={{ display: 'block', height: 1, background: 'var(--rule)' }} />
              </span>
              <span style={{ display: 'flex', gap: 16, alignItems: 'flex-end' }}>
                <span>
                  <span className="caption" style={{ display: 'block', marginBottom: 8 }}>
                    Radius — 2px only
                  </span>
                  <span
                    style={{
                      display: 'block',
                      width: 80,
                      height: 56,
                      border: '1px solid var(--ink)',
                      borderRadius: 2,
                    }}
                  />
                </span>
                <span>
                  <span className="caption" style={{ display: 'block', marginBottom: 8 }}>
                    Sharp — 0px
                  </span>
                  <span
                    style={{
                      display: 'block',
                      width: 80,
                      height: 56,
                      border: '1px solid var(--ink)',
                    }}
                  />
                </span>
              </span>
              <span className="caption">Shadow — none. Depth comes from rules and space.</span>
            </Reveal>
          </div>
        </div>
      </section>

      {/* components */}
      <section className="container pb-xl">
        <RuleHead no="06">Components</RuleHead>
        <div className="grid-2" style={{ gap: 'clamp(36px, 5vw, 64px)' }}>
          <Reveal>
            <p className="label" style={{ marginBottom: 22 }}>
              Link-buttons — text with a line, never a pill
            </p>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 22,
                alignItems: 'flex-start',
              }}
            >
              <span className="lnk lnk-caps">Text link — default</span>
              <span style={{ fontSize: 11, color: 'var(--faint)' }}>
                ↑ hover retracts the underline, left to right
              </span>
              <span className="btn">Solid — primary action</span>
              <button type="button" className="btn" disabled>
                Disabled
              </button>
            </div>
          </Reveal>
          <Reveal>
            <p className="label" style={{ marginBottom: 22 }}>
              Form field — a single ruled line
            </p>
            <div className="field" style={{ maxWidth: 360 }}>
              <label className="label" htmlFor="sys-demo-field">
                Label
              </label>
              <input id="sys-demo-field" placeholder="Placeholder text" />
            </div>
            <p className="label" style={{ margin: '24px 0 14px' }}>
              Section number &amp; caption
            </p>
            <p style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
              <span className="num" style={{ fontSize: 22 }}>
                04
              </span>
              <span className="caption">Fig. 01 — a caption, set small.</span>
            </p>
          </Reveal>
          <Reveal style={{ gridColumn: '1 / -1' }}>
            <p className="label" style={{ marginBottom: 16 }}>
              Tags / labels
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              <span className="tag">Bortle 1</span>
              <span className="tag" style={{ color: 'var(--rust)', borderColor: 'var(--rust)' }}>
                Aurora
              </span>
              <span
                className="lnk-caps"
                style={{
                  color: 'var(--faint)',
                  borderBottom: '1px solid var(--faint)',
                  paddingBottom: 4,
                  fontSize: 11.5,
                }}
              >
                Dark sky
              </span>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
