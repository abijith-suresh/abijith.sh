# abijith.sh — agent brief

Personal portfolio and blog: a static Astro content site for long-form writing, served at abijith.sh.

## The Project

Core promise: a quiet home for ideas written in full sentences — reflections, things I'm learning, and occasional technical notes — authored as markdown in this repo and published with no CMS in the loop.
Non-goals: short-form feeds (reels, stories, threads); a CMS or admin surface; comments, accounts, or analytics; client-side app frameworks — pages are static Astro with no islands.
Status: live (content site) — deployed on Vercel at `abijith.sh`.

## How I Work Here

- Quality gate: `bun run verify` — run before handoff.
- Commits: Conventional Commits; types live in commitlint.config.ts. Squash merges; never commit to main.
- Husky enforces the flow: `commit-msg` → commitlint, `pre-commit` → lint-staged (`biome check --write --unsafe`), `pre-push` → `verify`.
- `verify` runs type-check, lint, format check, vitest, and build — not the Playwright suite. After touching layout, CSS, or client navigation, also run `bun run test:e2e:build` (README § Browser checks).
- Update `CHANGELOG.md` for every notable change under `## Unreleased`, with dated category headings (`### Added — YYYY-MM-DD`, `### Changed`, `### Removed`, `### Fixed`). If a heading for today's date and category exists, append to it — never duplicate it.
- Publishing is a markdown file in `src/content/writing/` or `src/content/projects/`. Frontmatter schemas in `src/content.config.ts` are `.strict()`: an unknown key fails the build. Templates live in `templates/`.
- Use the `@/` path alias for imports from `src/`, and read `src/components/` and `src/lib/` before adding a new abstraction.
- Prefer Goodreads links for book references.

## Sources of Truth

| Fact | Where |
|---|---|
| Product intent | § The Project (this file) |
| Runtime behavior | code + tests |
| Commands & deps | package.json |
| Commit rules | commitlint.config.ts |
| Content frontmatter validation | src/content.config.ts |
| Site-wide config (URLs, social links, nav) | src/consts.ts |
| Route list & SEO metadata | src/lib/route-metadata.ts |
| CSS ownership | README § CSS structure |
| Changelog | CHANGELOG.md |

Code and tests are the authority; this file never overrides executable truth.

## Getting Around

- `src/pages/` — file-based routes: `index`, `about`, `now`, `404`, `rss.xml.ts`, plus `writing/`, `projects/`, and `og/[...slug].png.ts` for generated social cards.
- `src/layouts/Layout.astro` — the single page shell (topbar, footer, client router, motion replay).
- `src/content/` — published markdown: `writing/` and `projects/` entries.
- `src/lib/` — collection loaders (`projects.ts`, `writing.ts`), URL patterns (`routes.ts`), motion timings (`motion.ts`), satori/resvg social images (`og.ts`), plus `route-metadata.ts`, `group-by-year.ts`, `utils.ts`; vitest specs sit beside them.
- `src/components/` — shared Astro components: `ui/` primitives, `seo/`, `MediaCard.astro`, `ContentDetailPage.astro`.
- `src/styles/` — design tokens (`tokens.css`), `motion.css`, and `prose.css` for article pages; ownership is described in README § CSS structure.
- `src/integrations/generated-assets.ts` — regenerates site icons through `src/lib/og.ts` on dev and build.
- `templates/` — authoring templates for new writing and project entries.
- `tests/browser/` — Playwright regression specs, configured by `playwright.config.ts`.
