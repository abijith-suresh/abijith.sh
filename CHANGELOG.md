# Changelog

All notable changes to this site are documented in this file.

## Unreleased

### Changed — 2026-05-22

- Clarify changelog category guidance in AGENTS.md — spell out which
  category (`Added`, `Changed`, `Removed`, `Fixed`) fits which scenario
  instead of a single `Changed` example.
- Remove redundant `sortProjects()` call in projects pagination page
  and redundant `sortProjects()` wrapper in tags page — `getAllProjects()`
  already returns projects sorted by date descending.

### Fixed — 2026-05-22

- Prevent flash of unstyled content by setting `data-theme="dark"` directly
  on the `<html>` element instead of via a late inline script at the end of
  `<body>` — the attribute is now present at first paint.
- Harden active-link matching in the header nav: replace brittle
  `startsWith()` with exact match + guarded prefix matching, handle
  `BASE_URL`, and add `aria-current="page"` for accessibility.
- Refactor `attachTocLifecycle()` to use a module-level controller
  registry — registers Astro lifecycle listeners once and shares them
  across all TOC controllers, preventing duplicate anonymous listeners.
- Add `astro:before-swap` observer disconnect to `ScrollReveal` for
  proper teardown during view transitions.
- Hoist anonymous Astro lifecycle event handlers to named functions in
  `ScrollReveal` and `ReadingProgress`, providing a clear cleanup path.

### Removed — 2026-05-22

- Remove stale `clsx` and `tailwind-merge` entries from
  `vite.optimizeDeps.include` in Astro config — these packages were
  removed in a previous cleanup.
- Remove standalone `DESIGN.md` design spec — design tokens are now
  maintained in the source code and Tailwind config.

### Changed — 2026-05-21

- Remove unused `jsdom` and `@vitest/ui` devDependencies.
- Replace `clsx` and `tailwind-merge` with a hand-rolled `cn()` utility,
  removing two unnecessary dependencies.
- Remove unused options (`limit`, `includeDrafts`) from `getAllBlogPosts`
  and unused options (`tags`, `limit`) from `getAllProjects`.
- Remove unused `sortBy` parameter from `sortProjects`; always sort by date.
- Remove redundant TOC heading filter in `TOCList` — callers already
  pre-filter headings.
- Deduplicate social URLs by deriving JSON-LD `sameAs` from `socialLinks`
  instead of separate top-level fields.
- Extract shared prompt, template, and file-writing helpers into
  `scaffold-utils.js`, reducing duplication between content scaffolding
  CLI scripts.
- Unexport `ContentTag`, `ScrollRevealOptions`, and `TocController` types
  that had no external consumers.
- Standardise changelog format around dated entries (`### Changed —
YYYY-MM-DD`) and rewrite AGENTS.md as a lean pointer file.
- Resolve iPhone header transparency issue near the dynamic island where
  the status bar area showed through the navigation bar.
- FlexSearch-powered search modal, search index API endpoint, icon trigger,
  and all related infrastructure to simplify the codebase until more
  content is available.
- Swiss-inspired visual system with refreshed monogram/favicon assets,
  accent rules, noise texture, semantic MDX callout variants, scroll-reveal
  card motion, mobile navigation drawer, project TOC sidebar, and shared UI
  primitives (`PageShell`, `PageHeader`, `Button`, `Tag`, `Container`,
  `SplitSection`, `EmptyState`, `FooterLink`).
- Optional `heroImage` support in both blog and project content schemas,
  plus `RecentProjects` homepage section and MDX-first scaffolding.
- Rebuilt home, about, blog, projects, tags, 404, header, footer, and
  content detail pages around a Swiss editorial grid.
- Standardized content authoring on MDX, converting existing `.md` entries.
- Centralized site constants and route construction, extracted content-detail,
  TOC, grouping, pagination, and search-result primitives.
- Refreshed `DESIGN.md` and replaced regex-based scaffolding with token-based
  template rendering.
- Canonicalized tag pages to slug-only routes.
- Improved consistency and accessibility across breadcrumbs, tag schemas,
  project ordering, mobile nav, buttons, typography, code blocks, pagination
  empty states, and structured data.
- Removed light mode, theme picker, theme-generation infrastructure,
  related-post recommendations, tag counts, detail-page back links, and other
  obsolete components.
- Removed most automated tests, leaving a placeholder.

### Changed — 2026-05-04

- Featured Projects section on the landing page.
- Bricolage Grotesque as display typeface with two-line section-label pattern.
- Rewrote homepage hero voice, spacing, accent rule, and hover affordances.
- Replaced clay accent with deep evergreen; refined card borders and motion.
- Limited entrance animations to first page load per session.
- Redesigned About page layout, copy, and typography hierarchy.
- Updated page sublabels, section headings, and `DESIGN.md`.
- Upgraded Astro to v6.2.1 and updated the Vercel adapter.
- Restored accessible foreground contrast on the About page.
- Removed transition cascade conflict in `Link.astro` / `ContentCard.astro`.

### Changed — 2026-05-03

- Design documentation for Ink & Clay direction (`DESIGN.md`, `DESIGN.json`,
  `PRODUCT.md`).
- Introduced Ink & Clay palette across light and dark themes — links, tag
  pills, navigation underlines, reading progress, card hovers, TOC highlights,
  and OG imagery.

### Changed — 2026-05-01

- Removed release automation, Git tags, and release-oriented package metadata.
- Reframed project history as a manual dated changelog.
- Removed stale GitHub Pages configuration.

### Changed — 2026-04-08

- Standardized workspace setup files, editor recommendations, and ignore rules.

### Changed — 2026-04-07

- Standardized CI quality gates, PR title validation, and pre-push verification
  around `bun run verify`.
- Simplified agent instructions for the Astro workflow.

### Changed — 2026-03-24

- Migrated deployment from GitHub Pages to Vercel for `abijith.sh`.
- Renamed the repository to `abijith.sh`.
- Prevented draft blog posts from being generated as public pages.
- Restored Astro-aware type checking in CI.

### Changed — 2026-02-21

- Synchronized repository configuration with personal workspace conventions.

### Changed — 2026-02-14

- Dynamic OG image generation matching the Ink and Paper theme.
- Extended page metadata for social preview images.

### Changed — 2026-02-12

- Initial real portfolio and blog content replacing placeholder-heavy site.
- Redesigned About page with centered layout and labeled sections.
- Removed dummy blog posts and projects.
- Handled empty-content states across listing pages.

### Changed — 2026-02-11

- Content templates and creation scripts for blog posts and projects.
- Project changelog tracking the Astro-era history.

### Changed — 2026-02-10

- Font Awesome social icons.
- Improved content collection schemas and code structure.

### Changed — 2026-02-06

- Ink and Paper visual theme with editorial styling, custom palette, updated
  typography, and refreshed assets.
- Reworked header, cards, search, tag pages, and site-wide styling.

### Changed — 2026-02-01

- FlexSearch-powered search, JSON search index endpoint, year-based blog
  organization, dual licensing, DevContainer support, and custom Dockerfile.
- Replaced Pagefind with FlexSearch.
- Rewrote README for the personal site direction.

### Changed — 2026-01-31

- Branded empty state for zero-result searches.

### Changed — 2026-01-28

- Updated social profile links.
- Tightened CI with stronger type checking.
- Added robust RSS generation error handling.

### Changed — 2026-01-26

- Comprehensive README documentation.
- Simplified two-option theme toggle with smoother transitions.
- Extracted shared tag utilities and search modal logic.
- Cleaned up semantic wrappers and centralized transition-duration styling.
- Disabled Jekyll processing on GitHub Pages.
- Normalized tag casing to avoid duplicates.
- Corrected sitemap URL to canonical site URL.

### Changed — 2026-01-25

- Switched deployment from Vercel to GitHub Pages.
- Removed Vercel analytics.

### Changed — 2026-01-24

- Tag pages combining blog posts and projects.
- Search results surfacing tags alongside titles and descriptions.
- Search modal improvements for discovery and usability.
- Refactored shared content patterns and SPA-like page motion.
- Improved navigation consistency across tag pages.
- Closed search modal after selecting a result.
- Fixed missing color variables in light and dark modes.
- Corrected structured-data reference in JsonLd.

### Changed — 2026-01-23

- DevContainer support.
- Home, footer, and layout refinements.
- Extracted components, improved accessibility and SEO.
- Removed unused LinkCard MDX component.
- Fixed event-listener leaks in theme picker and search modal.
- Closed batch of small UX and maintainability issues.

### Changed — 2026-01-22

- Breadcrumb navigation across the site.
- All-tags page for discovery.
- Modal-based search experience with icon trigger.
- Improved search modal UI and tag page layouts.
- Corrected header alignment and breadcrumb structure on tag pages.

### Changed — 2026-01-21

- Related-post recommendations, Pagefind search, Vercel analytics, richer
  code-block line-number configuration.
- Redesigned home and about pages toward cleaner editorial layout.
- Removed images from cards and detail pages.

### Changed — 2026-01-17

- CI automation, Dependabot updates, pre-commit hooks, dark-mode refinements,
  reading-progress indicator, static assets.
- Simplified agent instructions, removed obsolete image-generation tooling.
- Added missing RSS dependency.

### Changed — 2026-01-16

- Consolidated Astro rewrite milestone after migration, publishing, and MDX
  groundwork landed.

### Changed — 2026-01-15

- Reading-time calculation for posts.
- MDX support with Expressive Code and improved typography.
- Callout, image, video, and richer MDX content components.
- Table of contents with header and sidebar treatments.
- Refreshed agent documentation, removed obsolete planning files.
- Removed heading anchor links.
- Resolved MDX build, lint, and formatting issues.
- Improved LinkCard and typography styling.

### Changed — 2026-01-12

- RSS feed generation, sitemap, robots.txt, custom 404 page, footer,
  structured SEO, view transitions.
- Simplified blog and project cards into text-first layout.
- Improved navigation prefetching.
- Resolved early linting and formatting issues.
- Tightened type annotations for article authors and tags.

### Changed — 2026-01-10

- Blog cards, blog and tag pagination, paginated project routes,
  recent-posts and recent-projects sections, skills module, timeline module,
  richer About page.
- ESLint and Prettier config, package scripts, VS Code recommendations.
- Dedicated agent guidance for the Astro codebase.
- Improved project-card responsiveness.
- Resolved early build, linting, and formatting issues.

### Changed — 2026-01-09

- Zod-backed content collections for blog posts and projects.
- Dynamic project listings, project-detail pages, shared data utilities.
- Initial seed content to exercise the Astro content model.
- Replaced placeholder homepage content with dynamic recent-project flows.
- Simplified project metadata.

### Changed — 2026-01-04

- Astro + Bun foundation, Tailwind CSS, shared site configuration,
  navigation links, social links, header and hero primitives, theming support,
  homepage project scaffolding, path aliases.
- Reoriented repository around Astro; updated README.
- Removed previous Next.js codebase, workflows, configs, and app-router.
