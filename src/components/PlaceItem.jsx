import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import Photo from './Photo';
import expeditions from '../data/expeditions.json';

/**
 * Catalogue entry for a dark-sky place. Image and text alternate sides.
 * The whole row links to the expedition that visits the place, or to the
 * enquiry form when no departure is in the current season.
 */
export default function PlaceItem({ place: pl, flip = false }) {
  const expedition = pl.expeditionId
    ? expeditions.find((e) => e.id === pl.expeditionId)
    : undefined;
  const to = expedition ? `/expeditions/${expedition.id}` : `/enquire`;

  return (
    <Reveal
      as={Link}
      to={to}
      className={`place-row${flip ? ' place-row--flip' : ''}`}
      aria-label={
        expedition
          ? `${pl.name} — open the expedition ${expedition.name}`
          : `${pl.name} — write to us about this sky`
      }
    >
      <figure className="ph ph--tall place-row__fig">
        <Photo
          k={pl.photo}
          alt={`${pl.name}, ${pl.region}`}
          sizes="(min-width: 841px) 50vw, 100vw"
        />
      </figure>
      <div className="place-row__text">
        <p style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 20 }}>
          <span className="num" style={{ fontSize: 26 }}>
            {pl.no}
          </span>
          <span className="label" style={{ fontSize: 11.5 }}>
            {pl.region} · {pl.coord}
          </span>
        </p>
        <h2
          className="row-title"
          style={{
            fontSize: 'clamp(32px, 4.6vw, 64px)',
            lineHeight: 0.98,
            letterSpacing: '-0.018em',
            marginBottom: 20,
          }}
        >
          {pl.name}
        </h2>
        <p className="lead-sm" style={{ maxWidth: 440, marginBottom: 22 }}>
          {pl.note}
        </p>
        <p style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <span className="tag">{pl.bortle}</span>
          <span className="lnk lnk-caps">
            {expedition
              ? `The expedition — ${expedition.name} →`
              : 'No departure yet — write to us →'}
          </span>
        </p>
      </div>
    </Reveal>
  );
}
