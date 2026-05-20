/**
 * SVG icons for search result types.
 * Extracted from SearchModal for testability and reuse.
 */

export function getSearchResultIconSvg(type: string): string {
  if (type === "code") {
    return `<svg class="w-4 h-4" style="color: var(--color-muted);" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>`;
  }
  return `<svg class="w-4 h-4" style="color: var(--color-muted);" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>`;
}
