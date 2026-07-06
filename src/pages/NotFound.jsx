import Reveal from '../components/Reveal';
import TextLink from '../components/TextLink';
import usePageMeta from '../hooks/usePageMeta';

export default function NotFound() {
  usePageMeta({
    title: '404 — Off the map',
    description: 'This page has drifted beyond the last known star.',
  });

  return (
    <section
      className="container notfound"
      style={{ padding: 'clamp(80px, 14vw, 200px) var(--gutter)' }}
    >
      <Reveal as="p" className="overline overline--rust" style={{ marginBottom: 30 }}>
        Error — Off the map
      </Reveal>
      <Reveal as="h1" className="notfound__code" style={{ marginBottom: 24 }}>
        404
      </Reveal>
      <Reveal
        as="p"
        className="lead-italic"
        style={{
          fontSize: 'clamp(22px, 3vw, 36px)',
          lineHeight: 1.3,
          maxWidth: 560,
          marginBottom: 40,
        }}
      >
        This page has drifted beyond the last known star. Even the darkest sky has an edge.
      </Reveal>
      <Reveal>
        <TextLink to="/">Return to the cover →</TextLink>
      </Reveal>
    </section>
  );
}
