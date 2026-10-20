# Contributing

## Working agreements

- Quality gate: run `bun run verify` before handoff. Add focused tests for what you touched; CI owns the full suite.
- Commits: Conventional Commits — the allowed types and subject rules live in `commitlint.config.ts`. Branch, open a PR, and squash merge; never commit straight to `main`.
- Every notable change gets one dated entry under `## Unreleased` in `CHANGELOG.md`. Append to the existing heading for today rather than adding a second one: one change, one entry.
- Prefer Goodreads links for book references.
- Match the existing `src/components` and `src/lib` patterns before inventing an abstraction.

## Traps

- New static pages need a row in `src/lib/route-metadata.ts` — the OG route only renders cards for registered paths, and SEO silently falls back to site defaults without one.
- `public/favicon.svg`, `favicon.ico`, and `apple-touch-icon.png` are generated from `src/lib/og.ts` on every dev and build: edit the source, never the files. A test pins the committed favicon bytes.
- `templates/` — both content templates carry a `tags` key the strict schemas reject; drop it before copying.
