import Photo from './Photo';

/**
 * Photographic block: duotone fill + grain, with an optional two-part caption.
 * `size` maps to a .ph--* height class.
 */
export default function Figure({
  photoKey,
  size = 'tall',
  caption,
  fig,
  className = '',
  sizes = '(min-width: 1440px) 1312px, 100vw',
  priority = false,
}) {
  return (
    <figure className={className}>
      <div className={`ph ph--${size}`}>
        <Photo
          k={photoKey}
          alt={caption || 'Expedition photograph'}
          sizes={sizes}
          priority={priority}
        />
      </div>
      {(caption || fig) && (
        <figcaption className="figcaption caption">
          {caption && <span>{caption}</span>}
          {fig && <span style={{ color: 'var(--faint)' }}>{fig}</span>}
        </figcaption>
      )}
    </figure>
  );
}
