import Reveal from '../components/Reveal';
import SectionNumber from '../components/SectionNumber';
import EnquiryForm from '../components/EnquiryForm';
import usePageMeta from '../hooks/usePageMeta';
import studio from '../data/studio.json';

export default function Enquire() {
  usePageMeta({
    title: 'Enquire',
    description:
      'Tell us about the sky you want to find. A guide reads every enquiry and writes back within two days — usually with a question of their own.',
  });

  return (
    <section className="container pt-lg pb-xl">
      <div className="grid-note" style={{ alignItems: 'start', gap: 'clamp(36px, 6vw, 100px)' }}>
        <Reveal>
          <SectionNumber className="mb-overline">Section 06 — Enquire</SectionNumber>
          <h1 className="t-page" style={{ fontSize: 'clamp(38px, 5.2vw, 80px)', marginBottom: 28 }}>
            Tell us about
            <br />
            the sky you
            <br />
            <em>want to find.</em>
          </h1>
          <p className="lead-sm" style={{ maxWidth: 400, marginBottom: 40 }}>
            No forms of pressure, no automatic replies. A guide reads every enquiry and writes back
            within two days — usually with a question of their own.
          </p>
          <p
            style={{
              borderTop: '1px solid var(--hairline-strong)',
              paddingTop: 20,
              fontSize: 14,
              lineHeight: 1.8,
              color: 'var(--ink-mid)',
            }}
          >
            <a href={`mailto:${studio.email}`} className="lnk-in">
              {studio.email}
            </a>
            <br />
            {studio.phone}
            <br />
            {studio.address[0]}, Tromsø
          </p>
        </Reveal>

        <Reveal>
          <EnquiryForm />
        </Reveal>
      </div>
    </section>
  );
}
