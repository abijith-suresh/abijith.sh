#!/usr/bin/env node

/**
 * New Blog Post Generator
 *
 * Creates a new blog post from template with user input.
 *
 * Usage:
 *   bun run new:blog
 *   node .scripts/new-blog.js
 */

import { join } from "node:path";

import {
  createPrompter,
  getCurrentDate,
  printCreated,
  readScaffoldTemplate,
  renderBlogTemplate,
  slugify,
  writeScaffoldFile,
} from "./scaffold-utils.js";

function getCurrentYear() {
  return new Date().getFullYear().toString();
}

export async function main() {
  const { prompt, close } = createPrompter();

  console.log("\n📝 Create New Blog Post\n");

  const title = await prompt("Title: ");
  if (!title) {
    console.error("❌ Error: Title is required");
    process.exit(1);
  }

  const description = await prompt("Description: ");
  if (!description) {
    console.error("❌ Error: Description is required");
    process.exit(1);
  }

  const heroImage = await prompt("Hero image path (optional): ");

  const slug = slugify(title);
  const year = getCurrentYear();
  const targetDir = join(process.cwd(), "src", "content", "blog", year);

  const template = readScaffoldTemplate("blog-post");
  const content = renderBlogTemplate(template, {
    title,
    description,
    date: getCurrentDate(),
    heroImage: heroImage || undefined,
  });

  const targetFile = await writeScaffoldFile(targetDir, `${slug}.md`, content);

  printCreated({
    type: "Blog post",
    filePath: targetFile,
    isDraft: true,
  });

  close();
}

const isDirectRun = process.argv[1]?.endsWith("/new-blog.js");

if (isDirectRun) {
  main().catch((error) => {
    console.error("❌ Error:", error.message);
    process.exit(1);
  });
}
