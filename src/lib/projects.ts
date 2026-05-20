import { type CollectionEntry, getCollection } from "astro:content";

type Project = CollectionEntry<"projects">;

export async function getAllProjects(options?: {
  tags?: string[];
  limit?: number;
}): Promise<Project[]> {
  let projects = await getCollection("projects");

  if (options?.tags && options.tags.length > 0) {
    projects = projects.filter((project) =>
      options.tags!.some((tag) => project.data.tags.includes(tag))
    );
  }

  projects = projects.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  if (options?.limit) {
    projects = projects.slice(0, options.limit);
  }

  return projects;
}

export function sortProjects(projects: Project[], sortBy: "date" | "title" = "date"): Project[] {
  const sorted = [...projects];

  switch (sortBy) {
    case "date":
      return sorted.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
    case "title":
      return sorted.sort((a, b) => a.data.title.localeCompare(b.data.title));
    default:
      return sorted;
  }
}
