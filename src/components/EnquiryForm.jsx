import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import expeditions from '../data/expeditions.json';
import { postEnquiry } from '../lib/api';

const NOT_SURE = 'Not sure yet — advise me';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values) {
  const errors = {};
  if (!values.name.trim() || values.name.trim().length < 2) {
    errors.name = 'Tell us your name — two letters will do.';
  }
  if (!EMAIL_RE.test(values.email.trim())) {
    errors.email = 'That email does not look right.';
  }
  if (values.message.length > 2000) {
    errors.message = 'A sentence or two is plenty — keep it under 2,000 characters.';
  }
  return errors;
}

export default function EnquiryForm() {
  const [searchParams] = useSearchParams();
  const preselected = expeditions.find((e) => e.id === searchParams.get('expedition'));

  const [values, setValues] = useState({
    name: '',
    email: '',
    expedition: preselected ? preselected.name : NOT_SURE,
    month: '',
    travellers: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const set = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    setErrors((er) => ({ ...er, [field]: undefined }));
  };

  async function onSubmit(e) {
    e.preventDefault();
    const clientErrors = validate(values);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    setStatus('sending');
    try {
      await postEnquiry(values);
      setStatus('sent');
    } catch (err) {
      if (err.status === 422 && err.data?.errors) {
        setErrors(err.data.errors);
        setStatus('idle');
      } else {
        setStatus('error');
      }
    }
  }

  if (status === 'sent') {
    return (
      <div style={{ borderTop: '2px solid var(--rust)', paddingTop: 34 }} aria-live="polite">
        <p
          className="overline overline--rust"
          style={{ marginBottom: 20, letterSpacing: '0.16em' }}
        >
          Received — thank you
        </p>
        <h2
          className="t-h2"
          style={{ fontSize: 'clamp(30px, 4vw, 52px)', lineHeight: 1.02, marginBottom: 20 }}
        >
          Your enquiry is
          <br />
          <em>in the logbook.</em>
        </h2>
        <p className="lead-sm" style={{ maxWidth: 420 }}>
          A guide will read it and write back within two days. In the meantime, the sky continues to
          turn. See you under it.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="form-grid-2">
        <div className={`field${errors.name ? ' has-error' : ''}`}>
          <label className="label" htmlFor="enq-name">
            Name
          </label>
          <input
            id="enq-name"
            name="name"
            autoComplete="name"
            placeholder="Your name"
            value={values.name}
            onChange={set('name')}
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name && <p className="field-error">{errors.name}</p>}
        </div>
        <div className={`field${errors.email ? ' has-error' : ''}`}>
          <label className="label" htmlFor="enq-email">
            Email
          </label>
          <input
            id="enq-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@email.com"
            value={values.email}
            onChange={set('email')}
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email && <p className="field-error">{errors.email}</p>}
        </div>
      </div>

      <div className="field">
        <label className="label" htmlFor="enq-expedition">
          Expedition of interest
        </label>
        <select
          id="enq-expedition"
          name="expedition"
          value={values.expedition}
          onChange={set('expedition')}
        >
          <option>{NOT_SURE}</option>
          {expeditions.map((exp) => (
            <option key={exp.id}>{exp.name}</option>
          ))}
        </select>
      </div>

      <div className="form-grid-2">
        <div className="field">
          <label className="label" htmlFor="enq-month">
            Preferred month
          </label>
          <input
            id="enq-month"
            name="month"
            placeholder="e.g. October 2026"
            value={values.month}
            onChange={set('month')}
          />
        </div>
        <div className="field">
          <label className="label" htmlFor="enq-travellers">
            Travellers
          </label>
          <input
            id="enq-travellers"
            name="travellers"
            inputMode="numeric"
            placeholder="2"
            value={values.travellers}
            onChange={set('travellers')}
          />
        </div>
      </div>

      <div className={`field${errors.message ? ' has-error' : ''}`} style={{ marginBottom: 36 }}>
        <label className="label" htmlFor="enq-message">
          What are you hoping for?
        </label>
        <textarea
          id="enq-message"
          name="message"
          rows={4}
          placeholder="A sentence or two is plenty."
          value={values.message}
          onChange={set('message')}
          aria-invalid={Boolean(errors.message)}
        />
        {errors.message && <p className="field-error">{errors.message}</p>}
      </div>

      <button type="submit" className="btn" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send enquiry'}
      </button>

      {status === 'error' && (
        <p className="form-status form-status--error" role="alert">
          The enquiry could not reach the studio. Try once more, or simply write to{' '}
          <a href="mailto:hello@aphelion.travel" className="lnk-in">
            hello@aphelion.travel
          </a>
          .
        </p>
      )}
    </form>
  );
}
