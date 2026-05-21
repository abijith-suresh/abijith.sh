import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import readline from "node:readline";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const TOKEN_PATTERN_TEMPLATE = "\\{\\s*\\{\\s*__TOKEN__\\s*\\}\\s*\\}";

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function replaceTemplateToken(template, token, value) {
  const pattern = new RegExp(TOKEN_PATTERN_TEMPLATE.replace("__TOKEN__", escapeRegex(token)), "g");

  return template.replace(pattern, value);
}

export function replaceTemplateTokens(template, values) {
  return Object.entries(values).reduce(
    (result, [token, value]) => replaceTemplateToken(result, token, value),
    template
  );
}

export function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 100);
}

export function getCurrentDate() {
  return new Date().toISOString().split("T")[0];
}

export function renderBlogTemplate(template, { title, description, date, heroImage }) {
  const heroImageLine = heroImage ? `heroImage: "${heroImage}"` : "";
  return replaceTemplateTokens(template, {
    TITLE: title,
    DESCRIPTION: description,
    DATE: date,
    HERO_IMAGE: heroImageLine,
  });
}

/**
 * Create a readline prompt interface.
 * Returns { prompt, close } where prompt(question) returns the trimmed answer.
 */
export function createPrompter() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const prompt = (question) =>
    new Promise((resolve) => {
      rl.question(question, (answer) => resolve(answer.trim()));
    });

  const close = () => rl.close();

  return { prompt, close };
}

/**
 * Read a scaffold template by name (without extension).
 * Resolves from .templates/{name}.mdx.
 */
export function readScaffoldTemplate(name) {
  const templatePath = join(__dirname, "..", ".templates", `${name}.mdx`);

  if (!existsSync(templatePath)) {
    console.error(`❌ Error: Template not found: ${templatePath}`);
    process.exit(1);
  }

  return readFileSync(templatePath, "utf-8");
}

/**
 * Ensure a directory exists and write content to a file.
 */
export async function writeScaffoldFile(dir, filename, content) {
  await mkdir(dir, { recursive: true });
  const targetFile = join(dir, filename);

  if (existsSync(targetFile)) {
    console.error(`❌ Error: File already exists: ${targetFile}`);
    process.exit(1);
  }

  writeFileSync(targetFile, content, "utf-8");
  return targetFile;
}

/**
 * Print a standardised creation-success message.
 */
export function printCreated({ type, filePath, isDraft, extraSteps }) {
  console.log(`\n✅ ${type} created successfully!`);
  console.log(`\n📄 File: ${filePath}`);

  if (isDraft) {
    console.log(`📋 Draft: true (set to false when ready to publish)`);
  }

  console.log(`\n🚀 Next steps:`);
  console.log(`  1. Edit the file: ${filePath}`);
  console.log(`  2. Add your content`);

  if (isDraft) {
    console.log(`  3. Set draft: false when ready`);
    console.log(`  4. Run 'bun run dev' to preview`);
  } else {
    console.log(`  3. Run 'bun run dev' to preview`);
  }

  if (extraSteps) {
    extraSteps.forEach((step) => console.log(`  ${step}`));
  }
}

export function renderProjectTemplate(
  template,
  { title, description, date, githubUrl, demoUrl, heroImage }
) {
  const heroImageLine = heroImage ? `heroImage: "${heroImage}"` : "";

  let result = replaceTemplateTokens(template, {
    TITLE: title,
    DESCRIPTION: description,
    DATE_FULL: date,
    HERO_IMAGE: heroImageLine,
  });

  // Build links section from provided URLs
  const links = [];
  if (githubUrl) {
    links.push(`- **Repository**: [GitHub](${githubUrl})`);
  }
  if (demoUrl) {
    links.push(`- **Live Demo**: [Demo](${demoUrl})`);
  }

  const linksSection = links.length > 0 ? `## Links\n\n${links.join("\n")}` : "";
  result = result.replace(/{{LINKS_SECTION}}/g, linksSection);

  // Clean up excessive blank lines
  return result.replace(/\n{3,}/g, "\n\n");
}
