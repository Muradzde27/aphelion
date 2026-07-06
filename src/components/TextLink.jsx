import { Link } from 'react-router-dom';

/**
 * The house link — text with a 1px line, never a pill.
 * `retract` (default): the underline retracts on hover, left to right.
 * `retract={false}`: underline draws in on hover instead.
 */
export default function TextLink({
  to,
  href,
  onClick,
  caps = true,
  retract = true,
  className = '',
  children,
  ...rest
}) {
  const cls = [retract ? 'lnk' : 'lnk-in', caps ? 'lnk-caps' : '', className]
    .filter(Boolean)
    .join(' ');

  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls} {...rest}>
      {children}
    </button>
  );
}
