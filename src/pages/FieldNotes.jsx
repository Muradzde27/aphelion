import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import SectionNumber from '../components/SectionNumber';
import NoteItem from '../components/NoteItem';
import Photo from '../components/Photo';
import usePageMeta from '../hooks/usePageMeta';
import notes from '../data/notes.json';

export default function FieldNotes() {
  usePageMeta({
    title: 'Field Notes',
    description:
      'Essays from the expedition logbook: field craft, instruments, ethics and the photography of the night sky — written by the guides themselves.',
  });

  const [lead, ...rest] = notes;

  return (
    <>
      <section className="container pt-lg pb-sm">
        <Reveal>
          <SectionNumber className="mb-overline">Section 02 — Field Notes</SectionNumber>
        </Reveal>
        <Reveal as="h1" className="t-page" style={{ maxWidth: 900 }}>
          Essays from the
          <br />
          <em>expedition logbook.</em>
        </Reveal>
      </section>

      {/* lead essay */}
      <section className="container pb-md">
        <Reveal>
          <Link
            to={`/field-notes/${lead.slug}`}
            className="grid-note rule-top"
            style={{ paddingTop: 'clamp(28px, 4vw, 44px)' }}
          >
            <figure>
              <span className="ph ph--lead" style={{ display: 'block' }}>
                <Photo k={lead.photo} sizes="(min-width: 841px) 50vw, 100vw" priority />
              </span>
            </figure>
            <span>
              <span
                className="label"
                style={{ letterSpacing: '0.12em', display: 'block', marginBottom: 18 }}
              >
                {lead.cat} · {lead.read} · {lead.date}
              </span>
              <span
                className="row-title"
                style={{
                  display: 'block',
                  fontSize: 'clamp(30px, 4vw, 54px)',
                  lineHeight: 1.03,
                  letterSpacing: '-0.015em',
                  marginBottom: 20,
                }}
              >
                {lead.title}
              </span>
              <span
                className="lead-sm"
                style={{ display: 'block', maxWidth: 480, marginBottom: 24 }}
              >
                {lead.dek}
              </span>
              <span className="lnk lnk-caps" style={{ letterSpacing: '0.12em' }}>
                Read — {lead.author}
              </span>
            </span>
          </Link>
        </Reveal>
      </section>

      {/* rest of the notes */}
      <section className="container pb-xl">
        <div className="notes-grid">
          {rest.map((n) => (
            <Reveal key={n.slug}>
              <NoteItem note={n} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
