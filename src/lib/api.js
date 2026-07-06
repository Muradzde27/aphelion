/**
 * Thin client for the Express mock API. Page content is imported statically
 * from src/data (no request waterfall for a content site); the API is used
 * where a server actually matters — accepting the enquiry form.
 */
export async function postEnquiry(payload) {
  const res = await fetch('/api/enquiry', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    // non-JSON error body; fall through with data = null
  }

  if (!res.ok) {
    const error = new Error(`Enquiry failed with status ${res.status}`);
    error.status = res.status;
    error.data = data;
    throw error;
  }
  return data;
}
