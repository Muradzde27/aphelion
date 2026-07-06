import Reveal from '../components/Reveal';
import SectionNumber from '../components/SectionNumber';
import PlaceItem from '../components/PlaceItem';
import usePageMeta from '../hooks/usePageMeta';
import places from '../data/places.json';

export default function Places() {
  usePageMeta({
    title: 'Places',
    description:
      'A working index of the darkest skies we return to — Aoraki Mackenzie, NamibRand, Atacama, La Palma, Lofoten, Kerry — ordered by darkness on the Bortle scale.',
  });

  return (
    <>
      <section className="container pt-lg pb-xs">
        <Reveal>
          <SectionNumber className="mb-overline">Section 03 — Places</SectionNumber>
        </Reveal>
        <div className="grid-split">
          <Reveal as="h1" className="t-page">
            The last dark
            <br />
            places, <em>catalogued.</em>
          </Reveal>
          <Reveal
            as="p"
            className="lead"
            style={{ fontSize: 'clamp(17px, 1.6vw, 21px)', paddingBottom: 8 }}
          >
            A working index of the skies we return to, ordered by darkness. The Bortle scale runs
            from 1, a truly black sky, to 9, the centre of a city.
          </Reveal>
        </div>
      </section>

      <section className="container pb-xl">
        {places.map((pl, i) => (
          <PlaceItem key={pl.name} place={pl} flip={i % 2 === 1} />
        ))}
      </section>
    </>
  );
}
