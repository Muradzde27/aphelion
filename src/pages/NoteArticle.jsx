import { Link, useParams } from 'react-router-dom';
import Reveal from '../components/Reveal';
import ReadingProgress from '../components/ReadingProgress';
import Photo from '../components/Photo';
import usePageMeta from '../hooks/usePageMeta';
import notes from '../data/notes.json';
import NotFound from './NotFound';

function Block({ block }) {
  if (block.t === 'h') return <p className="article-sub">{block.x}</p>;
  if (block.t === 'pull') return <blockquote>{block.x}</blockquote>;
  return <p className="body-serif">{block.x}</p>;
}

export default function NoteArticle() {
  const { slug } = useParams();
  const note = notes.find((n) => n.slug === slug);

  usePageMeta(
    note
      ? {
          title: note.title,
          description: note.dek,
          ogImage: `/og/field-notes/${note.slug}.jpg`,
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: note.title,
            description: note.dek,
            author: { '@type': 'Person', name: note.author },
            publisher: { '@type': 'Organization', name: 'Aphelion' },
            articleSection: note.cat,
          },
        }
      : { title: 'Off the map', description: 'This note does not exist.' }
  );

  if (!note) return <NotFound />;

  const more = notes.filter((n) => n.slug !== slug).slice(0, 2);

  return (
    <>
      <ReadingProgress />
      <article className="container pt-md">
        <Reveal
          as="nav"
          aria-label="Breadcrumb"
          className="label"
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 12,
            fontSize: 12,
            marginBottom: 'clamp(30px, 4vw, 50px)',
          }}
        >
          <Link to="/field-notes" className="lnk" style={{ color: 'var(--ink)' }}>
            Field Notes
          </Link>
          <span aria-hidden="true">/</span>
          <span style={{ color: 'var(--rust)' }}>{note.cat}</span>
        </Reveal>

        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <Reveal as="p" className="label" style={{ fontSize: 12, marginBottom: 26 }}>
            {note.cat} · {note.read} · {note.date}
          </Reveal>
          <Reveal as="h1" className="t-article" style={{ marginBottom: 28 }}>
            {note.title}
          </Reveal>
          <Reveal
            as="p"
            style={{
              fontSize: 13,
              letterSpacing: '0.06em',
              color: 'var(--grey)',
              paddingBottom: 'clamp(30px, 4vw, 44px)',
            }}
          >
            By {note.author}
          </Reveal>
        </div>
      </article>

      <Reveal as="figure" style={{ maxWidth: 1080, margin: '0 auto', padding: '0 var(--gutter)' }}>
        <div className="ph ph--article">
          <Photo
            k={note.photo}
            alt={`Photograph accompanying ${note.title}`}
            sizes="(min-width: 1144px) 1080px, 100vw"
            priority
          />
        </div>
        <figcaption
          className="caption"
          style={{ marginTop: 14, textAlign: 'center', color: 'var(--faint)' }}
        >
          Photograph — {note.author}, from the expedition archive.
        </figcaption>
      </Reveal>

      <section
        className="article-body"
        style={{
          maxWidth: 680,
          margin: '0 auto',
          padding: 'clamp(44px, 6vw, 84px) clamp(20px, 4vw, 32px) clamp(50px, 6vw, 90px)',
        }}
      >
        {note.body.map((block, i) => (
          <Block key={i} block={block} />
        ))}
        <p
          className="rule-top"
          style={{
            marginTop: 20,
            paddingTop: 22,
            fontSize: 13,
            letterSpacing: '0.06em',
            color: 'var(--grey)',
          }}
        >
          {note.author} — {note.date}
        </p>
      </section>

      <section className="container pb-xl">
        <p
          className="label"
          style={{
            letterSpacing: '0.16em',
            borderTop: '1px solid var(--hairline-strong)',
            paddingTop: 22,
            marginBottom: 32,
          }}
        >
          Continue reading
        </p>
        <div className="grid-2">
          {more.map((n) => (
            <Link key={n.slug} to={`/field-notes/${n.slug}`} className="more-row">
              <figure>
                <span className="ph ph--more" style={{ display: 'block' }}>
                  <Photo k={n.photo} sizes="140px" />
                </span>
              </figure>
              <span>
                <span
                  className="label"
                  style={{
                    fontSize: 11,
                    letterSpacing: '0.1em',
                    display: 'block',
                    marginBottom: 8,
                  }}
                >
                  {n.cat}
                </span>
                <span
                  className="row-title"
                  style={{ fontSize: 22, lineHeight: 1.14, display: 'block' }}
                >
                  {n.title}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
