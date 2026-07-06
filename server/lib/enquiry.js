/**
 * Enquiry validation & normalisation, shared by the local Express server
 * and the Vercel serverless function — one set of rules, two runtimes.
 */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEnquiry(body) {
  const {
    name = '',
    email = '',
    expedition = '',
    month = '',
    travellers = '',
    message = '',
  } = body || {};

  const errors = {};
  if (typeof name !== 'string' || name.trim().length < 2) {
    errors.name = 'Tell us your name — two letters will do.';
  }
  if (typeof email !== 'string' || !EMAIL_RE.test(email.trim())) {
    errors.email = 'That email does not look right.';
  }
  if (typeof message !== 'string' || message.length > 2000) {
    errors.message = 'A sentence or two is plenty — keep it under 2,000 characters.';
  }
  if (Object.keys(errors).length > 0) {
    return { errors, entry: null };
  }

  return {
    errors: null,
    entry: {
      id: `enq_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`,
      receivedAt: new Date().toISOString(),
      name: name.trim(),
      email: email.trim(),
      expedition: String(expedition).slice(0, 120) || 'Not sure yet — advise me',
      month: String(month).slice(0, 60),
      travellers: String(travellers).slice(0, 20),
      message: String(message).trim(),
    },
  };
}
