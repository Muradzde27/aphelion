import Reveal from './Reveal';
import TextLink from './TextLink';
import { nextNewMoons } from '../lib/moon';

const MONTH = new Intl.DateTimeFormat('en-GB', { month: 'long' });
const DAY_MONTH = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long' });
const DAY_SHORT = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short' });

function darkWindow(m) {
  const sameMonth = m.windowStart.getMonth() === m.windowEnd.getMonth();
  if (sameMonth) {
    return `${m.windowStart.getDate()}–${DAY_MONTH.format(m.windowEnd)}`;
  }
  return `${DAY_SHORT.format(m.windowStart)} – ${DAY_SHORT.format(m.windowEnd)}`;
}

/**
 * The next new moons and their nine-night dark windows, computed on the
 * client (truncated Meeus, ±minutes). Departures are set to these dates,
 * so the almanac prints them.
 */
export default function MoonCalendar({ count = 4 }) {
  const moons = nextNewMoons(count);

  return (
    <section className="container py-block">
      <Reveal className="list-head" style={{ marginBottom: 6 }}>
        <h2 className="t-h2">
          <span className="sup-num">03</span>The dark windows
        </h2>
        <p className="meta" style={{ maxWidth: 380 }}>
          Nine nights around each new moon, when the sky is dark enough for deep-sky work. Every
          departure is set to one of these.
        </p>
      </Reveal>
      <div>
        {moons.map((m) => (
          <Reveal key={m.date.toISOString()} className="moon-row">
            <span className="moon-row__month price-serif">{MONTH.format(m.date)}</span>
            <span className="moon-row__facts">
              <span style={{ color: 'var(--ink-body)' }}>
                New moon — {DAY_MONTH.format(m.date)}
              </span>
              <span style={{ color: 'var(--faint)' }}>Dark window — {darkWindow(m)}</span>
            </span>
            <span className="moon-row__cta">
              <TextLink to="/expeditions">Find a departure →</TextLink>
            </span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
