import { type CollectionEntry, getCollection } from "astro:content";

type Blog = CollectionEntry<"blog">;

export async function getAllBlogPosts(options?: {
  limit?: number;
  includeDrafts?: boolean;
}): Promise<Blog[]> {
  let posts = await getCollection("blog");

  if (!options?.includeDrafts) {
    posts = posts.filter((post) => !post.data.draft);
  }

  posts = posts.sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());

  if (options?.limit) {
    posts = posts.slice(0, options.limit);
  }

  return posts;
}
