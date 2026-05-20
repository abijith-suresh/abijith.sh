---
name: "abijith.sh"
description: "Personal portfolio and blog of Abijith S — one backend engineer's home on the web"
colors:
  evergreen: "#296944"
  evergreen-light: "#6cac83"
  unbleached: "#f9f6f2"
  inkstone: "#150e0a"
  washi: "#f2eee7"
  pith: "#e9e4db"
  sandstone: "#746d68"
  linen-edge: "#ded6cd"
  ironwood: "#0a0806"
  warm-offwhite: "#ece7e1"
  workshop: "#15110e"
  workbench: "#1e1917"
  warm-stone: "#7f7975"
  iron-edge: "#2d2825"
  kiln-red: "#af0021"
  ember-red: "#f1364e"
typography:
  display:
    fontFamily: "Bricolage Grotesque, Satoshi, system-ui, sans-serif"
    fontSize: 60px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.025em
  page-title:
    fontFamily: "Bricolage Grotesque, Satoshi, system-ui, sans-serif"
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.025em
  page-heading:
    fontFamily: "Bricolage Grotesque, Satoshi, system-ui, sans-serif"
    fontSize: 36px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.015em
  section-h2:
    fontFamily: "Bricolage Grotesque, Satoshi, system-ui, sans-serif"
    fontSize: 30px
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: -0.015em
  card-title:
    fontFamily: "Satoshi, system-ui, sans-serif"
    fontSize: 18px
    fontWeight: 500
    lineHeight: 1.4
  body:
    fontFamily: "Satoshi, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.625
  sublabel:
    fontFamily: "Satoshi, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  utility:
    fontFamily: "Satoshi, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.4
  utility-small:
    fontFamily: "Satoshi, system-ui, sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.3
rounded:
  sm: 4px
  md: 8px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
components:
  header-logo:
    textColor: "{colors.evergreen}"
    typography: "{typography.utility}"
  header-border:
    backgroundColor: "{colors.linen-edge}"
  footer-middot:
    textColor: "{colors.evergreen}"
  footer-border:
    backgroundColor: "{colors.linen-edge}"
  navigation-link:
    textColor: "{colors.sandstone}"
  navigation-link-hover:
    textColor: "{colors.inkstone}"
  content-card:
    backgroundColor: "{colors.washi}"
    textColor: "{colors.inkstone}"
    rounded: "{rounded.md}"
    padding: 20px
  content-card-hover:
    backgroundColor: "{colors.pith}"
    rounded: "{rounded.md}"
  tag-pill:
    backgroundColor: "{colors.evergreen}"
    textColor: "{colors.evergreen}"
    rounded: "{rounded.full}"
    padding: 2px 8px
  icon-button:
    textColor: "{colors.evergreen}"
    rounded: "{rounded.sm}"
    padding: 8px
  prose-link:
    textColor: "{colors.evergreen}"
  reading-progress:
    backgroundColor: "{colors.evergreen}"
  toc-active-heading:
    textColor: "{colors.evergreen}"
---

# Design System: abijith.sh

## Overview

Also known as "Brand & Style".

**Creative North Star: "The Craftsman's Desk"**

Warm materials, everything in its place, the tools of someone who takes pride in their work. This system draws from the feeling of a well-organized workshop at different hours of the day: unbleached paper under good afternoon light, the same desk by lamplight in the evening. Every surface is intentional. Nothing is ornamental for its own sake.

**Color reference:** A well-kept workshop at different hours of the day — green-handled precision tools on unbleached paper under good afternoon light, the same bench by lamplight in the evening. Green as the color of systems that work: a successful build, a healthy indicator light, a well-maintained machine. The dark theme uses near-neutral surfaces with a warm bias, so the green accent becomes the dominant chromatic signal — the only color in the room.

The palette uses warm neutrals paired with a deep evergreen accent. The green breaks from the warm-red/terracotta convention and gives the site a grounded, technical identity. The light theme is unbleached paper under good light; the dark theme is the same workshop after sundown, with the amber warmth of the desk lamp casting everything in the same hue family. Green carries identity and interaction; warm neutrals carry the canvas.

**Color strategy: Committed** — Green carries approximately 40% of the site's identity surfaces: hero role text, the horizontal rule below the name, prose links, tag pills, active nav states, icon buttons, TOC active headings, and reading progress. The canvas is never green. Green marks identity and interaction. That is its job.

**Key Characteristics:**

- All colors defined in OKLCH (frontmatter tokens provide approximate hex equivalents). Every neutral is tinted toward warmth (chroma ≥ 0.007); no pure black, no pure white.
- Committed color strategy: Evergreen is the system's voice across both themes. The hue is the same; only the lightness changes between light (L=47%) and dark (L=69%).
- Dark theme is warm-shifted (amber hue 50°), not cool. Both modes feel like the same room.
- Two-family typography system: Bricolage Grotesque for identity surfaces (display, headlines, page titles, section headings), Satoshi for content surfaces (body, cards, nav, meta, breadcrumbs, tags).
- Flat by default. Elevation emerges from tonal layering, not static shadows.

---

## Colors

The palette centers on **Evergreen** as the sole accent color, paired with warm neutrals. The light palette ("Unbleached Paper") uses a barely-warm off-white foundation; the dark palette ("Workshop at Night") uses a warm amber-shifted near-black foundation.

### Accent

- **Evergreen** (`#296944`, OKLCH `oklch(47% 0.09 155)`): The sole accent. Deep forest green, grounded and confident. Used for the logo, horizontal rule, prose links, tag pills, active nav, icon buttons, TOC active headings, and reading progress. Passes WCAG AA on the light background. Never used as a background fill or large surface color.
- **Evergreen Light** (`#6cac83`, OKLCH `oklch(69% 0.09 155)`): Dark theme variant. Same hue family, higher lightness. Passes WCAG AA on the dark background.

### Light Palette — "Unbleached Paper"

- **Unbleached** (`#f9f6f2`, OKLCH `oklch(97.5% 0.007 80)`): Light background. Barely-warm off-white, like quality unbleached paper stock. Never pure white.
- **Inkstone** (`#150e0a`, OKLCH `oklch(17% 0.014 50)`): Light foreground. Warm near-black, green-tinted. Like quality printing ink.
- **Washi** (`#f2eee7`, OKLCH `oklch(95% 0.010 80)`): Card and secondary surfaces. One step deeper than Unbleached.
- **Pith** (`#e9e4db`, OKLCH `oklch(92% 0.013 78)`): Popover and hover surfaces. The deepest light neutral.
- **Sandstone** (`#746d68`, OKLCH `oklch(54% 0.012 65)`): Muted text. Dates, descriptions, metadata. Warm gray. Passes WCAG AA (≈4.7:1 on Unbleached).
- **Linen Edge** (`#ded6cd`, OKLCH `oklch(88% 0.015 74)`): Borders and dividers. Warm, visible, not harsh.
- **Kiln Red** (`#af0021`, OKLCH `oklch(45% 0.22 18)`): Destructive / error states. Pure cardinal red — clearly distinguishable from Evergreen (hue 18° vs 155°).

### Dark Palette — "Workshop at Night"

- **Ironwood** (`#0a0806`, OKLCH `oklch(13.5% 0.006 50)`): Dark background. Near-neutral with warm bias at hue 50. Low chroma avoids the reddish-brown cast, letting the green accent carry the room's color.
- **Warm Off-White** (`#ece7e1`, OKLCH `oklch(93% 0.010 75)`): Dark foreground. Off-white with warmth.
- **Workshop** (`#15110e`, OKLCH `oklch(18% 0.008 50)`): Dark card. Slightly elevated warm surface.
- **Workbench** (`#1e1917`, OKLCH `oklch(22% 0.009 50)`): Dark popover. Deeper warm surface.
- **Warm Stone** (`#7f7975`, OKLCH `oklch(58% 0.010 55)`): Dark muted text. Warm stone. Passes WCAG AA (≈4.7:1 on Ironwood).
- **Iron Edge** (`#2d2825`, OKLCH `oklch(28% 0.010 50)`): Dark borders. Subtle warm trace, just visible against the background.
- **Ember Red** (`#f1364e`, OKLCH `oklch(63% 0.22 20)`): Destructive / error states in dark mode.

### Named Rules

**The Committed Strategy Rule.** Green carries 30–40% of the site's visual weight. It is not a token accent used once in the nav. Every identity surface and interactive state uses green. Diluting it defeats the system.

**The Surface Boundary Rule.** Committed does not mean drenched. Page backgrounds and body text are never green. Green marks things you interact with or things that identify the site. The canvas stays warm neutral.

**The No-Neutrals Rule.** Every color in the system has chroma ≥ 0.007. Pure black (#000) and pure white (#fff) are prohibited. Even the darkest dark and brightest light carry a perceptible tint.

**The Same-Room Rule.** Both light and dark themes use the same warm-amber hue direction (H=50–80° in OKLCH). Neither theme is cool. The dark is not the opposite of the light — it is the same desk at a different hour.

---

## Typography

**Identity font:** Bricolage Grotesque (Satoshi, system-ui, sans-serif fallback) — A variable grotesque (weight 200–800, optical sizing 12–96) with deliberate irregularity: slight ink traps, optically compensated junctions, letterforms that read as made rather than drawn. Used for all identity surfaces.

**Content font:** Satoshi (system-ui, sans-serif fallback) — A refined, warm geometric sans that handles body text and functional UI with clean readability. Used for all content surfaces.

The pairing tells the same story the color system does: intentional craft, not corporate uniformity. Bricolage (rough, expressive, artisanal) for identity surfaces; Satoshi (polished, warm, readable) for content.

### Type Scale

Seven semantic levels. Each maps to one explicit role. No arbitrary sizes.

| Level         | Role                               | Desktop px | Font      |
| ------------- | ---------------------------------- | ---------- | --------- |
| Display       | Hero greeting (homepage only)      | 60px       | Bricolage |
| Page title    | About page h1                      | 48px       | Bricolage |
| Page heading  | Listing / detail page h1           | 36px       | Bricolage |
| Section h2    | Homepage + about section landmarks | 30px       | Bricolage |
| Card title    | Individual item titles             | 18px       | Satoshi   |
| Body          | Running prose                      | 16px       | Satoshi   |
| Sublabel      | Section companion descriptions     | 16px       | Satoshi   |
| Utility       | Nav, meta, tags, actions           | 14px       | Satoshi   |
| Utility small | Small metadata                     | 12px       | Satoshi   |

### Named Rules

**The Two-Family Rule.** Identity surfaces (display, headlines, page titles, section headings) use Bricolage Grotesque. Content surfaces (body, cards, nav, meta, breadcrumbs, tags) use Satoshi. The boundary is identity vs content.

**The Section Heading Rule.** Section landmarks are always two-layered: heading row (full-width Bricolage h2, bold, tracking-tight, Title Case) above a sublabel row (Satoshi text-base muted description on the left, "View all" utility link on the right, items-baseline aligned). Gap between rows: 4px.

**The Page Title Hierarchy Rule.** About page h1 uses 48px — one level above section h2s (30px). This gives a 1.6:1 ratio on desktop. Any page with section h2s visible simultaneously must have its h1 maintain at minimum a 1.5:1 ratio against those h2s.

**The Writing-First Rule.** Blog prose typography takes priority. Body line height (1.625) and line length (65–75ch) are tuned for long-form reading comfort. Everything else accommodates this.

---

## Layout & Spacing

The layout follows a **Fluid Grid** model. Content is centered with a maximum width on larger screens, ensuring reading comfort and focused presentation.

- **Grid:** Single-column content area with flexible width, capped at a comfortable reading measure.
- **Whitespace:** Generous, never crowded. Sections are separated vertically using the spacing scale.
- **Negative Space:** Outer margins maintain a breathing room around content, reinforcing the workshop's uncluttered feel.

### Spacing

The 8px base grid governs all dimensions. Spacing tokens follow a consistent scale.

- **4px (xs):** Micro-adjustments, tight groupings.
- **8px (sm):** Tight padding, small gaps.
- **16px (md):** Default padding, card internal spacing.
- **24px (lg):** Section internal spacing, card gutters.
- **32px (xl):** Section separation.
- **48px (xxl):** Major section boundaries.

---

## Elevation & Depth

Flat by default. Depth from tonal layering, not shadows. Cards (Washi) sit one tonal step deeper than the page (Unbleached); popovers (Pith) sit one step deeper still. The eye reads the tonal step as depth without shadow. Borders (Linen Edge / Iron Edge) provide a clean geometric boundary at rest.

No shadows on any state. Card hover uses scale (1.5% scale-up) and tonal background wash only, with ease-out-quint easing (`cubic-bezier(0.22, 1, 0.36, 1)`) at 250ms.

### Named Rules

**The Flat-By-Default Rule.** Static shadows prohibited. Elevation through tonal surface steps only. No shadows on hover — card interaction uses scale and tonal background wash only.

---

## Shapes

The shape language is minimal and functional. Corner radii follow a compact scale.

- **sm (4px):** Icon buttons, small interactive elements.
- **md (8px):** Cards, content containers, form inputs.
- **full (9999px):** Tag pills, badge elements.

No decorative shape variations. All containers use consistent `md` radius unless their function requires a different treatment.

---

## Components

### Header

- **Logo:** "AS" in Evergreen, 14px, Satoshi semibold. The green anchor of the page.
- **Border:** Bottom 1px solid Linen Edge at 50% opacity.

### Navigation Link

- **Text:** Sandstone at rest. Inkstone (light) / Warm Off-White (dark) on hover.
- **Underline:** Invisible at rest. Grows left-to-right (200ms ease-out) in Evergreen on hover.
- **Active state:** Evergreen text, visible underline.

### Content Card

- **Background:** Washi at rest. Pith on hover (one tonal step deeper).
- **Border:** 1px solid Linen Edge (light) / Iron Edge (dark) at rest. Does not change on hover.
- **Text:** Inkstone at rest. Inherits on hover.
- **Typography:** Card title (Satoshi, 18px, medium). Body text uses standard body typography.
- **Hover behavior:** Card scales 1.5% with ease-out-quint easing, background deepens one tonal step, arrow icon shifts to Evergreen, 250ms duration.

### Tag Pill

- **Shape:** Fully rounded (full).
- **Background:** Evergreen at 10% alpha.
- **Text:** Evergreen.
- **No border.** Padding: 2px 8px.
- **Typography:** Utility (14px).

### Icon Button

- **Text:** Evergreen.
- **Shape:** sm (4px) radius.
- **Padding:** 8px.
- **Hover behavior:** Background fills one tonal step deeper (Pith light / Workbench dark).

### Prose Link

- **Text:** Evergreen.
- **Underline:** Always visible, Evergreen.
- **Hover behavior:** Opacity or brightness shift to indicate interaction.

### Reading Progress

- **Bar color:** Evergreen. Full width at top of viewport.
- **Height:** 3px.
- **Tracks** the scroll position of the article content (`[data-reading-target]` element).

### Footer

- **Middot** between year and author name: Evergreen. The only green in the footer.
- **Border:** Top 1px solid Linen Edge (light) / Iron Edge (dark) at 50% opacity.

---

## Do's and Don'ts

### Do

- Do use green on identity markers (logo, accent rules, section bars), interactive states (card hover tonal shift, nav underlines, back links), prose links, tag pills, icon buttons, reading progress, TOC active headings. Green is the system's voice.
- Do tint every neutral toward warmth (OKLCH hue 50–80°). No surface should feel cold.
- Do make hover states tangible. Cards scale and deepen with ease-out-quint easing. Nav links grow underlines. Arrows shift.
- Do cap body text at 65–75ch. Reading comfort is non-negotiable.
- Do use tonal surface steps (Unbleached > Washi > Pith) instead of shadows for depth.
- Do keep both light and dark themes warm. The dark is not the opposite of the light.
- Do use Bricolage Grotesque for identity surfaces (hero, page titles, section headings, detail titles) and Satoshi for content surfaces (body, cards, nav, meta). The boundary is identity vs content.
- Do pair section labels with a secondary descriptive line in Satoshi (sentence case, softer).

### Don't

- Don't use pure black (#000) or pure white (#fff). Every surface and text color is tinted.
- Don't use terracotta or clay hues as the accent. The system uses an evergreen accent (hue 155°).
- Don't use side-stripe borders (border-left > 1px as accent). Blockquotes use a 2px left border; that is the one exception.
- Don't use gradient text (background-clip: text with a gradient). Emphasis comes from weight or size.
- Don't apply glassmorphism decoratively. All surfaces are opaque and tonal.
- Don't add static shadows to any element. No shadows on hover either — scale and tonal wash only.
- Don't use Evergreen as a large background fill or body text color. It marks identity and interaction, not surfaces.
- Don't let the dark theme go cool. Ironwood (warm amber-shifted dark) is not negotiable.
- Don't add 3D scenes, particle effects, scroll-jacking, or WebGL showcases. The craft shows in precision, not spectacle.
- Don't use Bricolage Grotesque for body text, card titles, or functional UI elements. It is an identity font, not a reading font.
- Don't use Satoshi for page-level titles or section headings. The typographic contrast is the hierarchy.
