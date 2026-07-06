# Contributing

Thanks for taking the time. This is a small, deliberately quiet codebase — please keep it that way.

## Getting started

```bash
npm install
cp .env.example .env   # optional; defaults work without it
npm run dev            # Express mock API on :3001 + Vite on :5173
```

## Before you open a PR

1. `npm run lint` — no errors.
2. `npm run format` — Prettier owns the formatting; don't argue with it.
3. `npm run build` — must pass.
4. If you touched content, read it out loud once. If it sounds like marketing, rewrite it.

## Ground rules

- **Design:** tokens live in `src/styles/tokens.css`. No new colours, no shadows, no border-radius
  beyond 2px, no gradients. Photographs live in `public/images/` (regenerate via
  `scripts/generate-images.mjs`) and must go through the `.ph`/`.ph img` duotone treatment in
  `base.css` — never drop in an un-toned stock photo.
- **Type:** Newsreader for display and reading, Archivo for UI. Don't add a third face.
- **Content:** data lives in `src/data/*.json` and is served by the mock API too — change it in one
  place only.
- **Dependencies:** adding one is a design decision, not a convenience. Explain it in the PR.
- Keep PRs focused; one change per PR.

## Commit messages

Short imperative subject line, body only when the _why_ isn't obvious.
