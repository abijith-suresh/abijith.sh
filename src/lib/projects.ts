import { type CollectionEntry, getCollection } from "astro:content";

type Project = CollectionEntry<"projects">;

export async function getAllProjects(): Promise<Project[]> {
  const projects = await getCollection("projects");

  return projects.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function sortProjects(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
