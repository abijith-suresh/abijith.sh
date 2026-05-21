import { getCollection } from "astro:content";
import { slugifyTag } from "@/lib/tags";

type ContentTag = {
  slug: string;
  label: string;
};

function pickPreferredLabel(currentLabel: string, candidateLabel: string): string {
  return currentLabel.localeCompare(candidateLabel, undefined, { sensitivity: "base" }) <= 0
    ? currentLabel
    : candidateLabel;
}

export async function getAllContentTags(): Promise<ContentTag[]> {
  const [posts, projects] = await Promise.all([getCollection("blog"), getCollection("projects")]);

  const tagMap = new Map<string, string>();

  for (const post of posts) {
    if (!post.data.draft) {
      for (const tag of post.data.tags) {
        const slug = slugifyTag(tag);
        const existing = tagMap.get(slug);
        tagMap.set(slug, existing ? pickPreferredLabel(existing, tag) : tag);
      }
    }
  }

  for (const project of projects) {
    for (const tag of project.data.tags) {
      const slug = slugifyTag(tag);
      const existing = tagMap.get(slug);
      tagMap.set(slug, existing ? pickPreferredLabel(existing, tag) : tag);
    }
  }

  return Array.from(tagMap.entries())
    .map(([slug, label]) => ({ slug, label }))
    .sort((a, b) => a.label.localeCompare(b.label));
}
