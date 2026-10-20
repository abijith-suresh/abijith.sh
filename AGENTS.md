# abijith.sh — agent brief

A personal portfolio and blog for Abijith Suresh.

## The Project

Core promise: a quiet home for ideas written in full sentences, where nothing competes with the text.
What makes it special: the only publishing path is markdown in this repo — no CMS, no accounts, no client-side framework, one page shell. Restraint is the design: additions need a reason, and drafts may stay drafts.
Non-goals: short-form feeds (reels, stories, threads); a CMS or admin surface; comments, accounts, or analytics.
Status: live (content site) — deployed on Vercel at `abijith.sh`.

## How I Work Here

- Quality gate: `bun run verify` — run it before handoff. Focused tests for what you touched; CI owns the full suite.
- Commits: Conventional Commits, squash merge, never straight to `main` — branch, open a PR, leave it for review.
- Every notable change gets a dated entry under `## Unreleased` in `CHANGELOG.md`; append to an existing heading for today rather than adding a second one.
- Prefer Goodreads links for book references.
- Match `src/components` and `src/lib` patterns before inventing an abstraction.

## Sources of Truth

| Fact | Where |
|---|---|
| Product intent | § The Project (this file) |
| Runtime behavior | code + tests |
| Commands & deps | package.json |
| Commit rules | commitlint.config.ts |
| Content frontmatter | src/content.config.ts |
| Site name, URLs, social links | src/consts.ts |
| Changelog | CHANGELOG.md |

Code and tests are the authority; this file never overrides executable truth.

## Getting Around

- New static pages need a row in `src/lib/route-metadata.ts` — the OG route only renders cards for registered paths, and SEO silently falls back to site defaults without one.
- `public/favicon.svg`, `favicon.ico`, and `apple-touch-icon.png` are generated from `src/lib/og.ts` on every dev and build: edit the source, never the files. A test pins the committed favicon bytes.
- `templates/` — both content templates carry a `tags` key the strict schemas reject; drop it before copying.
