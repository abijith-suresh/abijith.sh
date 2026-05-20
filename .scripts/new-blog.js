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

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import readline from "node:readline";
import { fileURLToPath } from "node:url";

import { getCurrentDate, renderBlogTemplate, slugify } from "./scaffold-utils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * Prompt user for input
 */
function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

/**
 * Get current year for directory path
 */
export function getCurrentYear() {
  return new Date().getFullYear().toString();
}

/**
 * Main function
 */
export async function main() {
  console.log("\n📝 Create New Blog Post\n");

  // Get user input
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

  // Generate slug and paths
  const slug = slugify(title);
  const year = getCurrentYear();
  const targetDir = join(process.cwd(), "src", "content", "blog", year);
  const targetFile = join(targetDir, `${slug}.mdx`);

  // Check if file already exists
  if (existsSync(targetFile)) {
    console.error(`❌ Error: File already exists: ${targetFile}`);
    process.exit(1);
  }

  // Read template
  const templatePath = join(__dirname, "..", ".templates", "blog-post.mdx");

  if (!existsSync(templatePath)) {
    console.error(`❌ Error: Template not found: ${templatePath}`);
    process.exit(1);
  }

  const template = readFileSync(templatePath, "utf-8");
  const renderedTemplate = renderBlogTemplate(template, {
    title,
    description,
    date: getCurrentDate(),
    heroImage: heroImage || undefined,
  });

  // Ensure directory exists
  await mkdir(targetDir, { recursive: true });

  // Write file
  writeFileSync(targetFile, renderedTemplate, "utf-8");

  console.log("\n✅ Blog post created successfully!");
  console.log(`\n📄 File: ${targetFile}`);
  console.log(`📋 Draft: true (set to false when ready to publish)`);
  console.log(`\n🚀 Next steps:`);
  console.log(`   1. Edit the file: ${targetFile}`);
  console.log(`   2. Add your content`);
  console.log(`   3. Set draft: false when ready`);
  console.log(`   4. Run 'bun run dev' to preview`);

  rl.close();
}

const isDirectRun = process.argv[1] && resolve(process.argv[1]) === __filename;

if (isDirectRun) {
  main().catch((error) => {
    console.error("❌ Error:", error.message);
    process.exit(1);
  });
}
