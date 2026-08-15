/**
 * Content route helpers.
 *
 * Centralises URL construction so that changing a route pattern only
 * requires editing one file.
 */

export function getWritingUrl(id: string): string {
  return `/writing/${id}/`;
}

export function getProjectUrl(id: string): string {
  return `/projects/${id}/`;
}
