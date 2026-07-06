/**
 * Aphelion mock API.
 *
 * Serves the same JSON that lives in src/data (single source of truth) and
 * accepts the enquiry form. Enquiries are validated, logged to stdout and
 * appended to server/enquiries.log (gitignored) — enough to develop and
 * demo the front end against something real.
 */
import express from 'express';
import cors from 'cors';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateEnquiry } from './lib/enquiry.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'src', 'data');
const LOG_FILE = path.join(__dirname, 'enquiries.log');
const PORT = process.env.API_PORT || 3001;

const readData = (file) => JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf8'));

const app = express();
app.use(cors());
app.use(express.json({ limit: '32kb' }));

// ---- content -------------------------------------------------------------

app.get('/api/expeditions', (req, res) => {
  const { kind } = req.query;
  let list = readData('expeditions.json');
  if (kind && kind !== 'all') list = list.filter((e) => e.kind === kind);
  res.json(list);
});

app.get('/api/expeditions/:id', (req, res) => {
  const expedition = readData('expeditions.json').find((e) => e.id === req.params.id);
  if (!expedition) return res.status(404).json({ error: 'No such expedition. Off the map.' });
  res.json(expedition);
});

app.get('/api/notes', (req, res) => {
  // List view: everything except the full body.
  const list = readData('notes.json').map(({ body: _body, ...rest }) => rest);
  res.json(list);
});

app.get('/api/notes/:slug', (req, res) => {
  const note = readData('notes.json').find((n) => n.slug === req.params.slug);
  if (!note) return res.status(404).json({ error: 'No such note. Off the map.' });
  res.json(note);
});

app.get('/api/places', (req, res) => res.json(readData('places.json')));
app.get('/api/faq', (req, res) => res.json(readData('faq.json')));
app.get('/api/studio', (req, res) => res.json(readData('studio.json')));

// ---- enquiry form ----------------------------------------------------------

app.post('/api/enquiry', (req, res) => {
  const { errors, entry } = validateEnquiry(req.body);
  if (errors) {
    return res.status(422).json({ ok: false, errors });
  }

  fs.appendFile(LOG_FILE, JSON.stringify(entry) + '\n', (err) => {
    if (err) console.error('Could not write the logbook:', err.message);
  });
  console.log(`Enquiry ${entry.id} — ${entry.name} <${entry.email}> re: ${entry.expedition}`);

  res.status(201).json({ ok: true, id: entry.id });
});

// ---- misc --------------------------------------------------------------------

app.use('/api', (req, res) => res.status(404).json({ error: 'Off the map.' }));

app.use((err, req, res, _next) => {
  console.error(err);
  res
    .status(err.type === 'entity.parse.failed' ? 400 : 500)
    .json({ error: 'Something broke on the wire.' });
});

app.listen(PORT, () => {
  console.log(`Aphelion mock API listening on http://localhost:${PORT}`);
});
