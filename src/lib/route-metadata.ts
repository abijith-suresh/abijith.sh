import { SITE } from "@/consts";

export interface RouteMetadata {
  path: string;
  title: string;
  seoTitle?: string;
  description: string;
  type?: "website" | "article" | "profile";
}

export const STATIC_ROUTE_METADATA = [
  {
    path: "/",
    title: SITE.title,
    description: SITE.description,
  },
  {
    path: "/about/",
    title: "About",
    seoTitle: `About - ${SITE.title}`,
    description: "My life in a minute.",
    type: "profile",
  },
  {
    path: "/writing/",
    title: "Writing",
    seoTitle: `Writing - ${SITE.title}`,
    description: "Things I've written.",
  },
  {
    path: "/projects/",
    title: "Projects",
    seoTitle: `Projects - ${SITE.title}`,
    description: "Things I've built and shipped.",
  },
  {
    path: "/notes/",
    title: "Notes",
    seoTitle: `Notes - ${SITE.title}`,
    description: "Short thoughts.",
  },
  {
    path: "/now/",
    title: "Now",
    seoTitle: `Now - ${SITE.title}`,
    description: "What I'm currently up to.",
  },
  {
    path: "/404/",
    title: "Page Not Found",
    seoTitle: `Page Not Found - ${SITE.title}`,
    description: "The page you are looking for does not exist.",
  },
] satisfies RouteMetadata[];

export function normalizePagePath(pathname: string): string {
  if (!pathname || pathname === "/") return "/";
  const [pathOnly] = pathname.split(/[?#]/);
  const trimmed = pathOnly.replace(/^\/+|\/+$/g, "");
  return trimmed ? `/${trimmed}/` : "/";
}

export function getRouteMetadata(pathname: string): RouteMetadata | undefined {
  const normalizedPath = normalizePagePath(pathname);
  return STATIC_ROUTE_METADATA.find((route) => route.path === normalizedPath);
}

export function getStaticRouteMetadata(pathname: string): RouteMetadata {
  const metadata = getRouteMetadata(pathname);
  if (!metadata) throw new Error(`Missing static route metadata for ${pathname}`);
  return metadata;
}

export function getOgImagePath(pathname: string): string {
  const normalizedPath = normalizePagePath(pathname);
  if (normalizedPath === "/") return "/og/index.png";
  return `/og/${normalizedPath.replace(/^\/|\/$/g, "")}.png`;
}
