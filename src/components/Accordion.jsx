import { useState } from 'react';
import Reveal from './Reveal';

/**
 * Ruled accordion for the Index page. One item open at a time; the open
 * question turns rust and its sign flips to an em dash.
 */
export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="faq">
      {items.map((item, i) => {
        const open = openIndex === i;
        const bodyId = `faq-a-${i}`;
        return (
          <Reveal key={item.no} className={`faq-item${open ? ' is-open' : ''}`}>
            <h2 style={{ margin: 0 }}>
              <button
                type="button"
                className="faq-q"
                aria-expanded={open}
                aria-controls={bodyId}
                onClick={() => setOpenIndex(open ? -1 : i)}
              >
                <span className="faq-q__num">{item.no}</span>
                <span className="faq-q__text">{item.q}</span>
                <span className="faq-q__sign" aria-hidden="true">
                  {open ? '—' : '+'}
                </span>
              </button>
            </h2>
            <div id={bodyId} className="faq-a" hidden={!open}>
              <p>{item.a}</p>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
