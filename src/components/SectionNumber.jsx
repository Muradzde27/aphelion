/**
 * Numbered section overline — “01 — The Lead”.
 */
export default function SectionNumber({ no, children, className = '' }) {
  return (
    <p className={`overline overline--rust ${className}`.trim()}>
      {no && <span>{no} — </span>}
      {children}
    </p>
  );
}
