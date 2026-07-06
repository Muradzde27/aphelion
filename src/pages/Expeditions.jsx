import { useSearchParams } from 'react-router-dom';
import Reveal from '../components/Reveal';
import SectionNumber from '../components/SectionNumber';
import ExpeditionItem from '../components/ExpeditionItem';
import usePageMeta from '../hooks/usePageMeta';
import expeditions from '../data/expeditions.json';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'aurora', label: 'Aurora' },
  { id: 'darksky', label: 'Dark sky' },
  { id: 'observatory', label: 'Observatories' },
];

export default function Expeditions() {
  usePageMeta({
    title: 'Expeditions',
    description:
      'Six expeditions, one season of dark sky: aurora watches in the Arctic, Bortle 1 deserts, and the great observatories — each departure set to a new moon.',
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const kind = searchParams.get('kind') || 'all';
  const list = expeditions.filter((t) => kind === 'all' || t.kind === kind);

  function setKind(id) {
    setSearchParams(id === 'all' ? {} : { kind: id }, { replace: true });
  }

  return (
    <>
      <section className="container pt-lg" style={{ paddingBottom: 'clamp(24px, 3vw, 40px)' }}>
        <Reveal>
          <SectionNumber className="mb-overline">Section 01 — The Season</SectionNumber>
        </Reveal>
        <div className="grid-split" style={{ marginBottom: 'clamp(36px, 5vw, 60px)' }}>
          <Reveal as="h1" className="t-page">
            Six expeditions,
            <br />
            <em>one season</em> of
            <br />
            dark sky.
          </Reveal>
          <Reveal style={{ paddingBottom: 8 }}>
            <p className="lead" style={{ fontSize: 'clamp(17px, 1.6vw, 21px)', marginBottom: 20 }}>
              Each departure is set to a new moon and a working forecast. Read them as you would a
              contents page — slowly, and in order.
            </p>
            <a href="/aphelion-season-mmxxvi.pdf" download className="lnk lnk-caps">
              Download the season catalogue (PDF) →
            </a>
          </Reveal>
        </div>
      </section>

      <section className="container pb-xl">
        <Reveal className="list-head" style={{ paddingBottom: 18 }}>
          <div className="filters" role="group" aria-label="Filter expeditions by kind">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`filter${kind === f.id ? ' is-active' : ''}`}
                aria-pressed={kind === f.id}
                onClick={() => setKind(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
          <span className="meta">{String(list.length).padStart(2, '0')} expeditions</span>
        </Reveal>
        <div>
          {list.map((t) => (
            <Reveal key={t.id}>
              <ExpeditionItem expedition={t} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
