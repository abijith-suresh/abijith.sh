#!/usr/bin/env node

/**
 * New Project Generator
 *
 * Creates a new project from template with user input.
 *
 * Usage:
 *   bun run new:project
 *   node .scripts/new-project.js
 */

import { join } from "node:path";

import {
  createPrompter,
  getCurrentDate,
  printCreated,
  readScaffoldTemplate,
  renderProjectTemplate,
  slugify,
  writeScaffoldFile,
} from "./scaffold-utils.js";

export async function main() {
  const { prompt, close } = createPrompter();

  console.log("\n🚀 Create New Project\n");

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

  const githubUrl = await prompt("GitHub URL (optional): ");
  const demoUrl = await prompt("Demo URL (optional): ");
  const heroImage = await prompt("Hero image path (optional): ");

  const slug = slugify(title);
  const targetDir = join(process.cwd(), "src", "content", "projects");

  const template = readScaffoldTemplate("project");
  const content = renderProjectTemplate(template, {
    title,
    description,
    date: getCurrentDate(),
    githubUrl: githubUrl || undefined,
    demoUrl: demoUrl || undefined,
    heroImage: heroImage || undefined,
  });

  const targetFile = await writeScaffoldFile(targetDir, `${slug}.mdx`, content);

  printCreated({
    type: "Project",
    filePath: targetFile,
  });

  close();
}

const isDirectRun = process.argv[1]?.endsWith("/new-project.js");

if (isDirectRun) {
  main().catch((error) => {
    console.error("❌ Error:", error.message);
    process.exit(1);
  });
}
