import { createHash } from "node:crypto";

import type { APIContext } from "astro";
import { getCollection } from "astro:content";

import { getBlogPostUrl, getProjectUrl } from "@/lib/routes";
import { toSearchableText } from "@/lib/search/text";
import type { SearchIndexPayload, SearchResult } from "@/lib/search/types";

export const prerender = true;

async function generateSearchIndex(): Promise<SearchResult[]> {
  const [blogPosts, projects] = await Promise.all([
    getCollection("blog"),
    getCollection("projects"),
  ]);

  const results: SearchResult[] = [];

  for (const post of blogPosts) {
    if (post.data.draft) continue;

    results.push({
      id: post.id,
      title: post.data.title,
      description: post.data.description,
      date: post.data.publishDate.toISOString(),
      tags: post.data.tags,
      url: getBlogPostUrl(post.id),
      content: toSearchableText(post.body || ""),
      type: "blog",
    });
  }

  for (const project of projects) {
    results.push({
      id: project.id,
      title: project.data.title,
      description: project.data.description,
      date: project.data.date.toISOString(),
      tags: project.data.tags,
      url: getProjectUrl(project.id),
      content: toSearchableText(project.body || ""),
      type: "project",
    });
  }

  return results.sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());
}

function createSignature(results: SearchResult[]): string {
  return createHash("sha1").update(JSON.stringify(results)).digest("hex");
}

export async function GET(_context: APIContext): Promise<Response> {
  const results = await generateSearchIndex();
  const payload: SearchIndexPayload = {
    generatedAt: new Date().toISOString(),
    signature: createSignature(results),
    results,
  };

  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
