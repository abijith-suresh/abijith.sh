import { SITE } from "@/consts";

export interface RouteMetadata {
  path: string;
  title: string;
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
    description: "About Abijith S, this site, and the work behind it.",
    type: "profile",
  },
  {
    path: "/writing/",
    title: "Writing",
    description: "Standalone pieces, technical notes, and reflections.",
  },
  {
    path: "/projects/",
    title: "Projects",
    description: "Shipped work, side projects, and experiments.",
  },
  {
    path: "/notes/",
    title: "Notes",
    description: "Short thoughts and quick posts.",
  },
  {
    path: "/now/",
    title: "Now",
    description: "What I'm doing right now.",
  },
  {
    path: "/404/",
    title: "Page Not Found",
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

export function getOgImagePath(pathname: string): string {
  const normalizedPath = normalizePagePath(pathname);
  if (normalizedPath === "/") return "/og/index.png";
  return `/og/${normalizedPath.replace(/^\/|\/$/g, "")}.png`;
}
