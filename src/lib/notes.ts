import { type CollectionEntry, getCollection } from "astro:content";

type Note = CollectionEntry<"notes">;

export async function getAllNotes(): Promise<Note[]> {
  const notes = await getCollection("notes");

  return notes.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
