import { getCollection } from "astro:content";
import type { APIRoute, GetStaticPaths } from "astro";
import { type OgRoute, renderOgPng } from "@/lib/og";
import { STATIC_ROUTE_METADATA } from "@/lib/route-metadata";

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
  ];

  return paths;
};

export const GET: APIRoute<{ route: OgRoute }> = async ({ props }) => {
  const png = await renderOgPng(props.route);

  return new Response(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
};

function path(slug: string, route: OgRoute): OgStaticPath {
  return {
    params: { slug },
    props: { route },
  };
}
