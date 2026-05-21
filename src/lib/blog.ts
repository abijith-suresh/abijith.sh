import { type CollectionEntry, getCollection } from "astro:content";

type Blog = CollectionEntry<"blog">;

export async function getAllBlogPosts(): Promise<Blog[]> {
  const posts = await getCollection("blog");

  return posts
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());
}
