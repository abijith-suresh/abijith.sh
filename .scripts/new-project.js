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

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import readline from "node:readline";
import { fileURLToPath } from "node:url";

import { getCurrentDate, renderProjectTemplate, slugify } from "./scaffold-utils.js";

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
 * Main function
 */
export async function main() {
  console.log("\n🚀 Create New Project\n");

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

  const format = await prompt("Format (md/mdx) [mdx]: ");
  const fileExtension = format.toLowerCase() === "md" ? "md" : "mdx";

  const githubUrl = await prompt("GitHub URL (optional): ");
  const demoUrl = await prompt("Demo URL (optional): ");
  const heroImage = await prompt("Hero image path (optional): ");

  // Generate slug and paths
  const slug = slugify(title);
  const targetDir = join(process.cwd(), "src", "content", "projects");
  const targetFile = join(targetDir, `${slug}.${fileExtension}`);

  // Check if file already exists
  if (existsSync(targetFile)) {
    console.error(`❌ Error: File already exists: ${targetFile}`);
    process.exit(1);
  }

  // Read template
  const templatePath = join(__dirname, "..", ".templates", `project.${fileExtension}`);

  if (!existsSync(templatePath)) {
    console.error(`❌ Error: Template not found: ${templatePath}`);
    process.exit(1);
  }

  const template = readFileSync(templatePath, "utf-8");
  const renderedTemplate = renderProjectTemplate(template, {
    title,
    description,
    date: getCurrentDate(),
    githubUrl: githubUrl || undefined,
    demoUrl: demoUrl || undefined,
    heroImage: heroImage || undefined,
  });

  // Write file
  writeFileSync(targetFile, renderedTemplate, "utf-8");

  console.log("\n✅ Project created successfully!");
  console.log(`\n📄 File: ${targetFile}`);
  console.log(`\n🚀 Next steps:`);
  console.log(`   1. Edit the file: ${targetFile}`);
  console.log(`   2. Add your project details`);
  console.log(`   3. Run 'bun run dev' to preview`);

  rl.close();
}

const isDirectRun = process.argv[1] && resolve(process.argv[1]) === __filename;

if (isDirectRun) {
  main().catch((error) => {
    console.error("❌ Error:", error.message);
    process.exit(1);
  });
}
