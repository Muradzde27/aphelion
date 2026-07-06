import { Link } from 'react-router-dom';
import Photo from './Photo';

/**
 * Field-note card for the journal grid.
 */
export default function NoteItem({ note: n }) {
  return (
    <Link to={`/field-notes/${n.slug}`} className="note-card">
      <figure style={{ marginBottom: 18 }}>
        <div className="ph ph--card">
          <Photo k={n.photo} sizes="(min-width: 841px) 33vw, 100vw" />
        </div>
      </figure>
      <p className="label" style={{ letterSpacing: '0.12em', fontSize: 11.5, marginBottom: 12 }}>
        {n.cat} · {n.read}
      </p>
      <h3
        className="row-title"
        style={{ fontSize: 'clamp(22px, 2.4vw, 28px)', lineHeight: 1.12, marginBottom: 12 }}
      >
        {n.title}
      </h3>
      <p style={{ fontSize: 14.5, lineHeight: 1.6, color: 'var(--grey)', marginBottom: 14 }}>
        {n.dek}
      </p>
      <span
        className="lnk"
        style={{ fontSize: 12, letterSpacing: '0.06em', color: 'var(--ink-body)' }}
      >
        {n.author}
      </span>
    </Link>
  );
}
