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
