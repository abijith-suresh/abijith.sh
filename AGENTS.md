# Agent Instructions

Personal portfolio and blog built with Astro.

## Quick Start

- `bun install` — install dependencies
- `bun run dev` — start dev server
- `bun run verify` — run type-check, lint, format check, tests, and build

## Sources of Truth

| What                                                   | Where                                                |
| ------------------------------------------------------ | ---------------------------------------------------- |
| Content schemas (frontmatter validation)               | `src/content.config.ts`                              |
| Site-wide config (URLs, social links, nav, pagination) | `src/consts.ts`                                      |
| Changelog — add dated entries under `## Unreleased`    | `CHANGELOG.md`                                       |
| Scaffolding CLI scripts                                | `.scripts/new-blog.js`, `.scripts/new-project.js`    |
| Content templates                                      | `.templates/blog-post.mdx`, `.templates/project.mdx` |

Browse `src/components/` and `src/lib/` for existing patterns before introducing new abstractions.

## Rules

- Use `@/` path alias for all imports from `src/`.
- Update `CHANGELOG.md` for every notable change. Add entries under
  `## Unreleased`, grouped by category (`### Added`, `### Changed`,
  `### Fixed`, `### Removed`). Each category header must include today's
  date: `### Changed — YYYY-MM-DD`. If a subsection with today's date
  already exists, append to it instead of creating a duplicate.
- Run `bun run verify` before every push.
- Commit and PR titles must use Conventional Commits (`feat`, `fix`, `refactor`, `chore`, `docs`, `test`, `ci`).
- Branch from the latest `main`; never commit directly to `main`.
- Squash merge is the expected merge strategy.
