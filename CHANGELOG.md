# Changelog

All notable changes to this site are documented in this file.

This changelog follows the categories and intent of [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), but tracks the site as a series of dated milestones instead of package releases.

## Unreleased

### Added

- A Swiss-inspired, dark-only visual system with stronger typography hierarchy, accent rules, noise texture, refreshed monogram/favicon assets, and new shared layout primitives such as `PageShell`, `PageHeader`, `Button`, `Tag`, `Container`, `SplitSection`, and `EmptyState`.
- An animated mobile navigation drawer, a project detail-page table of contents sidebar, scroll-reveal card motion, richer empty states, and semantic MDX callout variants.
- Optional `heroImage` support in the blog and project content schemas, plus updated MDX-first scaffolding templates and scripts for new content.

### Changed

- Rebuilt the home, about, blog, projects, tags, 404, and content detail pages around a more editorial Swiss grid with split sections, stronger page headers, simplified navigation patterns, and a refreshed footer/header system.
- Standardized all content authoring on MDX, converting existing Markdown entries, refreshing template documentation, and updating content-creation scripts to match the live schema.
- Simplified the shared site architecture by centralizing site constants and route construction, extracting reusable content-detail and table-of-contents primitives, and tightening grouping, pagination, and content-tag helpers.
- Refreshed `DESIGN.md` to match the current design direction and replaced brittle scaffold rendering with token-based template generation.

### Fixed

- Improved accessibility and consistency across breadcrumbs, tag handling, project ordering, mobile navigation, button borders, typography scaling, Expressive Code styling, pagination edge cases, and structured-data/type-check hints.

### Removed

- Light mode and the theme picker, along with the older theme-generation infrastructure they depended on.
- Related-post recommendations, tag counts, detail-page back links, and other obsolete components and utilities that no longer fit the streamlined site structure.
- Most automated tests, leaving only a placeholder test while the redesigned codebase settles.

## 2026-05-01 — Repository metadata cleanup

### Changed

- Removed release automation, Git tags, and release-oriented package metadata from the repository.
- Reframed project history as a manual dated changelog instead of GitHub release notes.

### Fixed

- Removed stale GitHub Pages configuration and aligned the repository homepage with the custom domain.

## 2026-04-08 — Workspace setup refresh

### Changed

- Standardized workspace setup files, editor recommendations, and ignore rules for a more consistent local development environment.

## 2026-04-07 — Quality gate standardization

### Changed

- Standardized CI quality gates, PR title validation, and pre-push verification around `bun run verify`.
- Simplified agent instructions and refreshed repository automation to match the current Astro workflow.

## 2026-03-24 — Vercel migration

### Changed

- Migrated deployment from GitHub Pages to Vercel for the `abijith.sh` custom domain.
- Renamed the repository to `abijith.sh` and aligned canonical site references around that identity.

### Fixed

- Prevented draft blog posts from being generated as public pages.
- Restored Astro-aware type checking in CI and added regression coverage for launch readiness.

## 2026-02-21 — Configuration sync

### Changed

- Synchronized repository configuration and shared project standards with the latest personal workspace conventions.

## 2026-02-14 — Dynamic OG image generation

### Added

- Dynamic OG image generation matching the Ink and Paper theme for richer social sharing.

### Changed

- Extended page metadata so the blog and project pages could use generated social preview images.

## 2026-02-12 — Real content and about-page refinement

### Added

- Initial real portfolio and blog content to replace the earlier placeholder-heavy site.

### Changed

- Redesigned the About page with a centered layout, labeled sections, and more personal content.

### Fixed

- Removed dummy blog posts and projects that no longer reflected the live site.
- Handled empty-content states more gracefully across listing pages.

## 2026-02-11 — Content scaffolding and site history

### Added

- Content templates and creation scripts for new blog posts and projects.
- A project changelog to track the Astro-era history of the site.

## 2026-02-10 — Content-model and UI cleanup

### Added

- Font Awesome social icons to better match the visual language of the site.

### Changed

- Improved content collection schemas and cleaned up code structure and comments to make the codebase easier to maintain.

## 2026-02-06 — Ink and Paper redesign

### Added

- The Ink and Paper visual theme with editorial styling, a custom palette, updated typography, and refreshed theme assets.

### Changed

- Reworked the header, cards, search experience, tag pages, and site-wide styling around the new theme direction.

## 2026-02-01 — Search and content organization

### Added

- FlexSearch-powered search, a JSON search index endpoint, year-based blog organization, dual licensing, and refreshed DevContainer support.
- A custom Dockerfile and updated container setup for more consistent development environments.

### Changed

- Replaced Pagefind with FlexSearch and improved the shared search architecture.
- Rewrote the README to better reflect the more personal direction of the site.

## 2026-01-31 — Search empty-state polish

### Added

- A branded empty state for zero-result searches.

## 2026-01-28 — CI hardening and feed reliability

### Added

- Updated social profile links to better reflect the current public presence of the site owner.

### Changed

- Tightened CI with stronger type checking and refreshed dependency automation.

### Fixed

- Added more robust RSS generation error handling.

## 2026-01-26 — Publishing and documentation refinements

### Added

- Comprehensive README documentation for running, understanding, and contributing to the Astro site.
- A simplified two-option theme toggle with smoother theme transitions.

### Changed

- Extracted shared tag utilities and search modal logic to reduce duplication.
- Cleaned up semantic wrappers and centralized transition-duration styling.

### Fixed

- Disabled Jekyll processing on GitHub Pages during the Astro deployment phase.
- Normalized tag casing to avoid duplicates in search and tag pages.
- Corrected the sitemap URL to match the canonical site URL.

## 2026-01-25 — GitHub Pages rollout

### Changed

- Switched deployment from Vercel to GitHub Pages during the early Astro rollout.
- Removed Vercel analytics and updated site settings to work from the repository-hosted deployment.

## 2026-01-24 — Search and tag discovery improvements

### Added

- Tag pages that combine both blog posts and projects.
- Search results that surface tags alongside titles and descriptions.
- A broader set of search modal improvements for discovery and usability.

### Changed

- Refactored shared content patterns and smoothed out SPA-like page motion.
- Improved navigation consistency across tag pages and related flows.

### Fixed

- Closed the search modal after selecting a result.
- Fixed missing color variables and transition settings in light and dark modes.
- Corrected a structured-data reference in the JsonLd component.

## 2026-01-23 — UX and codebase cleanup

### Added

- DevContainer support for more reproducible development setups.
- Additional home, footer, and layout refinements to improve the reading experience.

### Changed

- Extracted components and improved accessibility, SEO, and general code quality across the site.

### Fixed

- Removed the unused LinkCard MDX component.
- Fixed event-listener leaks in the theme picker and search modal.
- Closed a batch of small UX and maintainability issues across the codebase.

## 2026-01-22 — Breadcrumbs, tags, and modal search

### Added

- Breadcrumb navigation across the site.
- An all-tags page for discovery.
- A modal-based search experience with an icon trigger.

### Changed

- Improved the search modal UI and made tag pages more flexible in layout and navigation.

### Fixed

- Corrected header alignment around the logo and theme toggle.
- Fixed breadcrumb structure on tag pages.

## 2026-01-21 — Discovery and editorial redesign

### Added

- Related-post recommendations, Pagefind search, Vercel analytics, and richer code-block line-number configuration.

### Changed

- Redesigned the home and about pages toward a cleaner, more personal editorial layout.
- Removed images from cards and detail pages for a more minimal presentation.

## 2026-01-17 — Automation and reading experience

### Added

- CI automation, Dependabot updates, pre-commit hooks, dark-mode refinements, a reading-progress indicator, and additional static assets.

### Changed

- Simplified agent instructions and removed obsolete image-generation tooling.

### Fixed

- Added the missing RSS dependency required by the Astro site.

## 2026-01-16 — Astro rewrite milestone

### Changed

- Consolidated the Astro rewrite into a stable milestone after the initial migration, publishing, and MDX groundwork landed.

## 2026-01-15 — MDX and writing experience

### Added

- Reading-time calculation for posts.
- MDX support with Expressive Code and improved typography.
- Callout, image, video, and richer MDX content components.
- A table of contents with both header and sidebar treatments.

### Changed

- Refreshed agent documentation and removed obsolete planning files that no longer matched the site workflow.
- Removed heading anchor links to simplify the reading experience.

### Fixed

- Resolved MDX build, lint, and formatting issues.
- Improved LinkCard and typography styling for readability.

## 2026-01-12 — SEO and publishing foundations

### Added

- RSS feed generation, sitemap generation, robots.txt, a custom 404 page, a footer, structured SEO, and view transitions.

### Changed

- Simplified blog and project cards into a more text-first layout.
- Improved navigation prefetching and other performance-oriented behavior.

### Fixed

- Resolved early linting and formatting issues.
- Tightened type annotations for article authors and tags.

## 2026-01-10 — Blog, about page, and local tooling

### Added

- Blog cards, blog and tag pagination, paginated project routes, recent-posts and recent-projects sections, a skills module, a timeline module, and a richer About page.
- ESLint and Prettier configuration, updated package scripts, and better VS Code recommendations for local development.
- Dedicated agent guidance for working on the Astro codebase.

### Changed

- Improved project-card responsiveness and tidied utility styling.

### Fixed

- Resolved early build, linting, and formatting issues in the Astro codebase.

## 2026-01-09 — Content collections and dynamic project pages

### Added

- Zod-backed content collections for blog posts and projects.
- Dynamic project listings, project-detail pages, and shared data utilities for content management.
- Initial seed content to exercise the new Astro content model.

### Changed

- Replaced placeholder homepage content with dynamic recent-project flows.
- Simplified project metadata by removing the old featured and ordering fields.

## 2026-01-04 — Astro reboot

### Added

- A new Astro + Bun foundation for the site.
- Tailwind CSS, shared site configuration, navigation links, social links, header and hero primitives, theming support, and early homepage project scaffolding.
- Path aliases and styling improvements to support the new Astro architecture.

### Removed

- The previous Next.js codebase, workflows, configs, and app-router implementation.

### Changed

- Reoriented the repository around the Astro implementation and updated the README to match the new stack.
