import { useEffect, useRef } from 'react';
import { observe } from '../lib/reveal';

/**
 * Subtle reveal-on-scroll wrapper. Renders a plain element with [data-reveal];
 * the effect only exists when `html.rvl` is set (JS present, motion allowed).
 */
export default function Reveal({ as: Tag = 'div', children, ...rest }) {
  const ref = useRef(null);

  useEffect(() => observe(ref.current), []);

  return (
    <Tag ref={ref} data-reveal {...rest}>
      {children}
    </Tag>
  );
}
