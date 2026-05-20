# MDX Components Cheatsheet

Quick reference for all available MDX components in this project.

## Table of Contents

- [Callout](#callout)
- [Image](#image)
- [Video](#video)

---

## Callout

Import:

```mdx
import { Callout } from "@/components/mdx";
```

### Basic Usage

```mdx
<Callout variant="note">This is a note callout.</Callout>
```

### Variants

- `variant="note"` - Informational
- `variant="tip"` - Helpful suggestions
- `variant="warning"` - Cautions
- `variant="danger"` - Critical warnings

### Custom Title

```mdx
<Callout variant="tip" title="Pro Tip">
  Content here
</Callout>
```

### Collapsible

```mdx
<Callout variant="note" title="Click to expand" collapsible>
  Hidden content here
</Callout>
```

---

## Image

Import:

```mdx
import { Image } from "astro:assets";
```

### Basic Usage

Images must be imported locally for optimization:

```mdx
import hero from "./hero.png";

<Image src={hero} alt="Descriptive text" />
```

### With Alt Text

```mdx
import hero from "./hero.png";

<Image src={hero} alt="Descriptive alt text" />
```

---

## Video

Import:

```mdx
import { Video } from "@/components/mdx";
```

### YouTube Embed

```mdx
<Video id="dsTXcSeAZq8" title="Video Title" />
```

The `id` prop accepts both raw YouTube video IDs and full YouTube URLs. The component automatically extracts the video ID from any supported URL format.

**Examples:**

- Raw ID: `dsTXcSeAZq8`
- Watch URL: `https://www.youtube.com/watch?v=dsTXcSeAZq8`
- Short URL: `https://youtu.be/dsTXcSeAZq8`

---

## Combining Components

You can use multiple components in the same file:

```mdx
---
title: "My Post"
description: "Description here"
publishDate: 2026-01-01
tags: []
draft: true
---

import { Callout, Video } from "@/components/mdx";
import hero from "./hero.png";
import { Image } from "astro:assets";

## Introduction

<Callout variant="tip">This post covers advanced techniques.</Callout>

## Visual Demo

<Image src={hero} alt="Demo screenshot" />

## Video Tutorial

<Video id="dsTXcSeAZq8" title="Step-by-step guide" />
```

---

## Markdown Within Components

All components support Markdown formatting inside:

```mdx
<Callout variant="note">
  You can use **bold**, *italic*, `code`, and [links](https://example.com).
</Callout>
```

## Tips

1. **Always** include component imports at the top after frontmatter
2. **Use descriptive** alt text for images
3. **Keep callouts** concise and focused
4. **Test locally** before setting `draft: false`
5. **Do not use curly braces** (`{` and `}`) in plain MDX content — they are parsed as expressions. Escape them with `{'{'}` and `{'}'}` if needed.
