# Content Templates

This directory contains templates for creating new blog posts and projects.

## Quick Start

Use the following commands to create new content:

```bash
# Create a new blog post
bun run new:blog

# Create a new project
bun run new:project
```

## Available Templates

### Blog Template

- **`blog-post.mdx`** - MDX template with Callout component import pre-configured

### Project Template

- **`project.mdx`** - MDX template with Callout component import pre-configured

### Reference

- **`mdx-cheatsheet.md`** - Quick reference for all available MDX components

## Manual Usage

If you prefer not to use the scripts, you can copy these templates manually:

1. Copy the appropriate template file
2. Rename it with your content slug (e.g., `my-new-post.mdx`)
3. Place it in the correct directory:
   - Blog posts: `src/content/blog/YYYY/`
   - Projects: `src/content/projects/`
4. Update the frontmatter fields
5. Write your content

## Frontmatter Fields

### Blog Posts

| Field         | Type     | Required | Default      |
| ------------- | -------- | -------- | ------------ |
| `title`       | string   | Yes      | -            |
| `description` | string   | Yes      | -            |
| `publishDate` | date     | Yes      | Current date |
| `tags`        | string[] | No       | []           |
| `draft`       | boolean  | No       | true         |
| `heroImage`   | string   | No       | -            |

### Projects

| Field         | Type     | Required | Default      |
| ------------- | -------- | -------- | ------------ |
| `title`       | string   | Yes      | -            |
| `description` | string   | Yes      | -            |
| `date`        | date     | Yes      | Current date |
| `tags`        | string[] | Yes      | -            |
| `github`      | URL      | No       | -            |
| `demo`        | URL      | No       | -            |
| `heroImage`   | string   | No       | -            |

## Tips

- Set `draft: false` when you're ready to publish
- Use kebab-case for file names (e.g., `my-awesome-post.mdx`)
- Keep descriptions under 160 characters for SEO
- Use 3-5 relevant tags for better discoverability
