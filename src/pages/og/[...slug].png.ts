import { getCollection } from "astro:content";
import type { APIRoute, GetStaticPaths } from "astro";
import { extractExcerpt } from "@/lib/extract-excerpt";
import { type OgRoute, renderOgPng } from "@/lib/og";
import { STATIC_ROUTE_METADATA } from "@/lib/route-metadata";
import { formatDate } from "@/lib/utils";

export const prerender = true;

interface OgStaticPath {
  params: {
    slug: string;
  };
  props: {
    route: OgRoute;
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const writing = await getCollection("writing");
  const projects = await getCollection("projects");
  const notes = await getCollection("notes");

  const paths: OgStaticPath[] = [
    ...STATIC_ROUTE_METADATA.map((route) =>
      path(route.path === "/" ? "index" : route.path.replace(/^\/|\/$/g, ""), {
        title: route.title,
        description: route.description,
        type: "website",
      })
    ),
    ...writing.map((entry) =>
      path(`writing/${entry.id}`, {
        title: entry.data.title,
        description: entry.data.description,
        type: "article",
      })
    ),
    ...projects.map((entry) =>
      path(`projects/${entry.id}`, {
        title: entry.data.title,
        description: entry.data.description,
        type: "website",
      })
    ),
    ...notes.map((entry) => {
      const title = formatDate(entry.data.date);
      return path(`notes/${entry.id}`, {
        title,
        description: extractExcerpt(entry.body ?? "") ?? `A note from ${title}`,
        type: "article",
      });
    }),
  ];

  return paths;
};

export const GET: APIRoute<{ route: OgRoute }> = async ({ props }) => {
  const png = await renderOgPng(props.route);

  return new Response(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};

function path(slug: string, route: OgRoute): OgStaticPath {
  return {
    params: { slug },
    props: { route },
  };
}
