import { type CollectionEntry, getCollection } from "astro:content";

type Writing = CollectionEntry<"writing">;

export async function getAllWriting(): Promise<Writing[]> {
  const posts = await getCollection("writing");

  return posts.sort((a, b) => b.data.publishedDate.valueOf() - a.data.publishedDate.valueOf());
}
