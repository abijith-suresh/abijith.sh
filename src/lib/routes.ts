/**
 * Content route helpers.
 *
 * Centralises URL construction so that changing a route pattern only
 * requires editing one file.
 */

export function getBlogPostUrl(id: string): string {
  return `/blog/${id}`;
}

export function getProjectUrl(id: string): string {
  return `/projects/${id}`;
}
