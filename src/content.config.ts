import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({
    pattern: "*.md",
    base: "./src/content/projects",
  }),
  schema: z
    .object({
      title: z.string(),
      description: z.string(),
      publishedDate: z.coerce.date(),
      /** Where the project lives — deployed URL or repo */
      url: z.string().url().optional(),
    })
    .strict(),
});

const writing = defineCollection({
  loader: glob({
    pattern: "*.md",
    base: "./src/content/writing",
  }),
  schema: z
    .object({
      title: z.string(),
      description: z.string(),
      publishedDate: z.coerce.date(),
    })
    .strict(),
});

export const collections = { projects, writing };
