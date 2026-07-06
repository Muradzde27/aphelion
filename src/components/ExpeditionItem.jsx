import { Link } from 'react-router-dom';
import Photo from './Photo';
import { KIND_LABEL, KIND_SHORT } from '../lib/labels';

/**
 * The typographic expedition row.
 * `variant="featured"` — compact row for the home page.
 * `variant="list"` — full row with thumbnail and lead for /expeditions.
 */
export default function ExpeditionItem({ expedition: t, variant = 'list' }) {
  if (variant === 'featured') {
    return (
      <Link to={`/expeditions/${t.id}`} className="feat-row">
        <span className="num" style={{ fontSize: 22 }}>
          {t.no}
        </span>
        <span>
          <span
            className="row-title"
            style={{ fontSize: 'clamp(24px, 3vw, 40px)', display: 'block' }}
          >
            {t.name}
          </span>
          <span
            style={{
              fontSize: 12.5,
              letterSpacing: '0.02em',
              color: 'var(--grey)',
              display: 'block',
              marginTop: 8,
            }}
          >
            {KIND_LABEL[t.kind]}
          </span>
        </span>
        <span
          className="feat-row__place"
          style={{ fontSize: 13.5, color: 'var(--ink-body)', lineHeight: 1.4 }}
        >
          {t.place}
          <br />
          <span style={{ color: 'var(--faint)' }}>
            {t.nights} · {t.months}
          </span>
        </span>
        <span className="feat-row__price">
          <span className="price-serif" style={{ fontSize: 20, display: 'block' }}>
            {t.price}
          </span>
          <span
            className="meta"
            style={{ textTransform: 'uppercase', fontSize: 11, display: 'block', marginTop: 4 }}
          >
            per person
          </span>
        </span>
      </Link>
    );
  }

  return (
    <Link to={`/expeditions/${t.id}`} className="exp-row">
      <span className="num" style={{ fontSize: 24 }}>
        {t.no}
      </span>
      <span className="exp-row__thumb">
        <span className="ph ph--thumb" style={{ display: 'block' }}>
          <Photo k={t.photo} sizes="168px" />
        </span>
      </span>
      <span>
        <span
          className="row-title"
          style={{ fontSize: 'clamp(23px, 2.6vw, 34px)', display: 'block' }}
        >
          {t.name}
        </span>
        <span
          style={{
            fontSize: 14,
            lineHeight: 1.5,
            color: 'var(--grey)',
            display: 'block',
            marginTop: 8,
            maxWidth: 520,
          }}
        >
          {t.lead}
        </span>
        <span
          style={{
            fontSize: 11.5,
            letterSpacing: '0.06em',
            color: 'var(--faint)',
            display: 'block',
            marginTop: 10,
          }}
        >
          {KIND_SHORT[t.kind]} · {t.place} · {t.nights} · {t.months}
        </span>
      </span>
      <span className="exp-row__price">
        <span className="price-serif" style={{ fontSize: 22, display: 'block' }}>
          {t.price}
        </span>
        <span
          className="meta"
          style={{ textTransform: 'uppercase', fontSize: 11, display: 'block', marginTop: 4 }}
        >
          per person
        </span>
        <span className="lnk lnk-caps" style={{ marginTop: 12 }}>
          Read →
        </span>
      </span>
    </Link>
  );
}
