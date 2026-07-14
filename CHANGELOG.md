# Changelog

All notable changes to this site are documented in this file.

## Unreleased

### Changed — 2026-07-14

- Refresh the about page subtitle and related metadata to "My life in a minute."
- Update the now page with current games (Call of Duty: Modern Warfare 2019, The Division)
  and reading (Deep Work by Cal Newport).

### Changed — 2026-07-14

- Migrate to Astro v7 (upgrade from v6.4.6). Change `trailingSlash` from `"always"`
  to `"ignore"` to fix `NoMatchingStaticPathFound` error with prerendered OG
  image endpoints, which no longer support forced trailing slashes on file-type
  routes.

### Changed — 2026-06-14

- Update the about page to use the same top-level page layout as other static
  pages, removing the article-style divider and extra header spacing.

### Changed — 2026-06-13

- Refresh static page copy, route metadata, and social preview titles around a
  backend-engineer positioning while keeping page headings concise.

### Added — 2026-06-12

- New `/notes` route with full-content-inline listing and individual permalink
  pages. Notes use their own content collection (`src/content/notes/`) with
  `date`, `updatedDate`, and `tags` fields. Listing follows the Ledger block
  pattern (clickable full-width rows, ruled bottom-border, hover tint). Markdown
  rendered via satteri to HTML strings (avoids `<Content />` component issues
  inside `<a>` tags). Date serves as the primary note identifier (no title
  field). Landing page link added. No nav link (text-link only).
- Static route-mapped Open Graph PNG generation through a prerendered Astro
  endpoint backed by content collections.
- Local Astro integration for generated `AS` monogram favicon assets:
  `favicon.svg`, `favicon.ico`, and Apple touch icon.
- Dedicated `/about/` page linked from the homepage sentence navigation.
- Route metadata manifest for static page SEO fallbacks and generated OG image
  metadata.
- Root content templates for writing, project, and note entries.

### Changed — 2026-06-12

- Introduce fluid Utopia-inspired typography and spacing tokens, semantic rhythm
  tokens, and a base margin reset so page headers, landing content, list pages,
  and prose spacing are driven by the design system instead of browser defaults.
- Reuse shared page/header primitives on the landing and now pages, and replace
  repeated inline text-link styling with a token-backed `.text-link` class.
- Increase page top placement through a dedicated `--page-block-start`
  semantic token shared by landing, list, detail, and now pages.
- Replace runtime OG image generation with generated static OG image URLs while
  preserving the existing SEO `image` override API.
- Flatten writing content paths, use filename-derived trailing-slash URLs, and
  standardize writing/project frontmatter on `publishedDate`.
- Simplify content schemas to strict minimal fields and require at least one tag
  for every content entry.
- Keep notes titleless with full datetime frontmatter, timestamp filenames,
  sitemap inclusion, and lightweight `h-entry` markup.
- Resolve SEO and JSON-LD metadata through shared route metadata fallbacks while
  preserving explicit page overrides.
- Configure Astro trailing slash handling explicitly with canonical internal page
  links and URL helpers.
- Update generated site icons only when file contents change.

### Fixed — 2026-06-12

- Prevent page containers with inline padding from causing horizontal scrolling
  on mobile viewports.
- Restore CI compatibility with Biome 2.5 by migrating the Biome config,
  removing unsupported ARIA from the empty-state container, and adding an
  accessible title to the generated favicon SVG.

### Removed — 2026-06-12

- Remove the dynamic `/api/og.png` endpoint, `@astrojs/vercel`, and
  `@vercel/og`; the site now builds as fully static output and can use
  standard `astro preview` again.
- Remove unused project hero image assets and project frontmatter fields for
  `heroImage`, `github`, and `demo`; project links now live in Markdown content.

### Removed — 2026-06-11

- Remove tag pages (`/tags/`, `/tags/[tag]`), `TagList`, `Tag` component,
  `content-tags.ts`, `tags.ts`, `group-by-letter.ts`, and all tag-related UI
  from `ContentCard`, `BlogCard`, `ProjectCard`, `ContentDetailPage`,
  project/writing detail pages, SEO, JSON-LD, and RSS feed.
- Make `tags` optional in projects schema (`default([])`).
- Remove `@astrojs/mdx` dependency; migrate all content from `.mdx` to `.md`.
- Remove `@iconify-json/fa6-brands` dependency; strip unused brand icons from
  icon configuration.
- Remove About page from nav links and about content from site config.
- Remove dead exports from `consts.ts`: `SITE.greeting`, `SITE.heroIntro`, `NAV_LINKS`.
- Remove stale `.scripts/**/*.js` override block from `eslint.config.ts`.
- Remove `astro-icon` dependency (unused after pagination and MDX component removal).
- Remove stale scaffolding/template references from `AGENTS.md`.
- Remove unused `eslint-plugin-jsx-a11y` devDependency.
- Remove Tailwind CSS and all Tailwind utility classes from all files.
- Remove Prettier (`prettier`, `prettier-plugin-astro`) — consolidated to Biome.
- Remove `astro-expressive-code`; replaced with `satteri-expressive-code`.
- Remove `@tailwindcss/vite` and `tailwindcss` devDependencies.
- Remove `cn()` utility (no longer needed after Tailwind removal).
- Remove `src/lib/group-by.ts` (inlined into `groupByYear`).
- Remove placeholder test file `src/test/placeholder.test.ts`.
- Remove ESLint + Prettier + Tailwind VS Code extension recommendations.
- Remove Google Fonts HTTP request for Manrope (now self-hosted).
- Remove `Link.astro` component (no longer used after ContentCard rewrite).
- Remove `.card-hover` CSS class from `global.css` (replaced by Ledger row hover).
- Remove `/playground` route.
- Remove `BlogCard.astro` (renamed to `WritingCard.astro`).

### Changed — 2026-06-11

- Redesign toward authentic Swiss / International Typographic Style principles:
  - Replace `@tailwindcss/typography` plugin with fully hand-written prose CSS
    for explicit control over every element.
  - Introduce strict modular type scale using Major Third ratio (1.25×) with
    `--text-xs` through `--text-4xl` tokens.
  - Introduce 4px base spacing scale (`--space-1` through `--space-16`) and
    line-height tokens (`--leading-tight`, `--leading-normal`,
    `--leading-relaxed`, `--leading-none`).
  - Replace warm amber accent (`#f5a623`) with Basel Orange (`#ec6b2d`) for
    better contrast on dark backgrounds and stronger Swiss heritage.
  - Remove `--color-warning` and `--color-danger` tokens; reduce palette to
    base + text + accent + muted + border.
  - Remove decorative fractal-noise SVG overlay from `body::before`.
  - Remove all decorative motion — scroll-reveal animations, page-enter
    staggered fades, and Astro view transitions. Keep only functional hover
    states (50ms instant transitions).
  - Formalize border tokens (`--radius-none: 0`, `--border-width: 1px`).
  - Enforce flush-left text alignment for body text and headings.
  - Update callout-config warning/danger variants to use accent color.
  - Delete `ScrollReveal.astro` component and `scroll-reveal.ts` utility.
  - Implement 12-column grid system (max-w-[1440px], gap-x-8) across all
    pages. Content detail pages use col-span-6 col-start-4 for articles.
  - Replace `Container` with grid-based container (12 columns, 1440px).
  - Remove `SplitSection` component. About page uses h2 headings; listing
    pages use eyebrow labels for year groups.
  - Remove `ReadingProgress` component. Decorative progress bar.
  - Update TOC sidebar to grid-aligned col-span-2 col-start-1.
  - Update Hero padding to token-based values (--space-12 top, --space-8
    bottom).
  - Update card padding to --space-4 (16px) instead of p-6 (24px).
  - Update pagination spacing to token-based values.
  - Revert 12-column grid to single centered container (max-w-[900px], px-6).
  - Remove all TOC components (desktop + mobile). No TOC needed.
  - Remove hero images from article/project detail pages.
  - Reduce hero title size from clamp(3.5rem, 8vw, 6rem) to clamp(2rem, 4vw, 3rem).
  - Remove all Button components. Replace with text links using border-bottom.
  - Fix prose link underline: 1px muted color instead of 2px accent.
  - Fix tag hover: subtle background shift instead of accent color.
  - Fix footer and "View all" links: border-bottom underline style.
  - Add subtle page-enter fade-in animation (400ms).
  - Unify CSS design tokens with Tailwind v4 namespaces: rename `--space-*`
    to `--spacing-*`, `--color-base` to `--color-bg`, and switch `@theme
inline` to `@theme static` so utilities generate correctly.
  - Migrate blog routes from `/blog/` to `/writing/` for URL consistency.
  - Migrate all content files (blog posts, project pages) from `.mdx` to `.md`;
    convert `.mdx` content templates to `.md`.
  - Suppress deprecation warning by migrating `markdown.remarkPlugins` to
    explicit `markdown.processor: unified()` in `astro.config.ts`.
- Migrate from `astro-expressive-code` (Astro integration) to `satteri-expressive-code` (satteri HAST plugin); eliminates the rehype plugin mismatch warning.
- Consolidate linting and formatting to Biome for all file types including `.astro`.
- Fix husky `pre-commit` and `pre-push` hooks (were not executable, silently skipped).
- Convert all Tailwind utility classes across 13 `.astro` files to inline `style` attributes and `<style>` blocks.
- Replace `@theme static` block with plain `:root` custom properties in `global.css`.
- Remove `@layer base` and `@layer components` wrappers (standard CSS cascade).
- Inline `groupBy()` logic into `groupByYear()`; delete `group-by.ts`.
- Update VS Code settings and DevContainer config for Biome-only tooling.
- Remove stale `eslint.config.ts` and remaining scaffolding references from `AGENTS.md`.
- Replace `ContentCard` boxed-card pattern with The Ledger — ruled full-width rows
  with hover tint (`--color-surface-strong`).
- Rename internal collection key, components, and helpers from `blog` to `writing`
  (`BlogCard` → `WritingCard`, `getBlogPostUrl` → `getWritingUrl`,
  `getAllBlogPosts` → `getAllWriting`, `getCollection("blog")` → `getCollection("writing")`).

### Added — 2026-06-11

- New `/now` page for current-status ("what I'm doing now") updates.
- New `/writing/` routes (paginated listing + detail pages) replacing former
  `/blog/` routes.
- Self-host IBM Plex Sans (variable, Roman + Italic) and IBM Plex Mono
  (Regular, Italic, Medium, Medium Italic) fonts from `public/fonts/`;
  remove Google Fonts HTTP request.
- Add `satteri-expressive-code` HAST plugin for native satteri expressive-code
  integration.
- Add real unit tests (17 tests) for all `src/lib/` utility functions.
- Add `.vscode/extensions.json` with curated recommendations.

### Added — 2026-05-24

- Project pages: Reshrimp, Interleaf, Microbreak, Tailory, Skills, Prompts
  with placeholder hero images and basic descriptions.
- Skip-to-content link for keyboard accessibility.
- `touch-action: manipulation` on interactive elements to prevent
  double-tap zoom delay on mobile.
- `overscroll-behavior: contain` on mobile navigation drawer to prevent
  background scroll bleed.
- 200ms slide-down animation for mobile table of contents dropdown,
  matching the site's view-transition duration.

### Removed — 2026-05-24

- Personal Portfolio Website project page.

### Fixed — 2026-05-24

- Removed `!important` from card hover cascade; CSS custom property
  reassignments handle text color propagation without specificity wars.
- Eliminated duplicate theme variable block (`:root` duplicating
  `@theme inline`); merged `--color-card-hover-text` into `@theme inline`.
- Replaced 4 hardcoded `#111111` values with `var(--color-base)` across
  tag-link, tag-link-label, button, and icon-button hover states.
- Removed dead code: empty `.btn:hover` block, unnecessary `opacity: 1`
  on body noise pseudo-element, orphan `position: relative` on `body`.
- Extracted 6 shared design tokens: `--transition-fast` (150ms ease),
  `--letter-spacing-uppercase` (0.04em), `--color-surface`,
  `--color-surface-strong`, `--color-text-muted`, `--font-mono`.
- Standardized font sizes to Tailwind scale — `xs` (0.75rem) for
  eyebrow/tag-pill/arrow, `sm` (0.875rem) for nav/btn/link, `lg`
  (1.125rem) for split-label.
- Added explanatory comment for `scroll-margin-top: 6rem` heading anchor
  offset.
  - Apply `aria-hidden="true"` to decorative icons in `ContentCard`,
    `FooterLink`, `TOCHeader`, `Callout`, and `Header` components.
- Update URL hash via `history.replaceState` on TOC link clicks to
  preserve deep-linking while maintaining smooth-scroll behavior.
- Replace hardcoded `formatDate` with `Intl.DateTimeFormat` and
  hardcoded reading-time string with `Intl.NumberFormat`.
- Add `fetchpriority="high"` and `aspect-video` to hero images for CLS
  prevention.
- Add `<meta name="theme-color">` matching the dark background.
- Replace hyphen with em-dash and straight quotes with curly quotes in
  site description and tag-page metadata.
- Remove unused `getOrdinalSuffix` utility.
- Raise body noise/grain overlay z-index to 100 so the header
  shares the same texture as the rest of the page.
- Fix mobile TOC current-heading detection by switching from layout-
  dependent `offsetTop` to viewport-relative `getBoundingClientRect`,
  and suppress scroll-driven updates after the `<details>` toggles.
- Redesign `.btn-secondary` to use a subtle muted fill instead of a
  white border, and implement the previously declared `.btn-ghost`
  variant (amber text, translucent accent tint on hover).
- Remove amber background fill from `.prose` link hover — instead
  increase underline thickness from 2px to 3px on hover.

### Changed — 2026-05-24

- Replaced ~200 lines of hand-written `.prose` content typography CSS
  with the `@tailwindcss/typography` plugin, retaining custom accent
  link underlines, heading sizes, code styling, and scroll-margin
  offsets via plugin overrides.

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
- Remove `PRODUCT.md` and `CLAUDE.md` (symlink to `AGENTS.md`) from
  repository root — superseded by `AGENTS.md`.

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
