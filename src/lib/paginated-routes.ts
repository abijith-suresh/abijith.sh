import { paginate } from "@/lib/pagination";

/**
 * Generate static paths for paginated collection pages.
 * Returns an array of { params, props } suitable for getStaticPaths().
 */
export function generatePaginatedPaths<T>(
  items: T[],
  perPage: number
): {
  params: { page: string | undefined };
  props: {
    items: T[];
    currentPage: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}[] {
  const firstPage = paginate(items, 1, perPage);

  return Array.from({ length: firstPage.totalPages }, (_, i) => {
    const page = i + 1;
    const paginatedResult = page === 1 ? firstPage : paginate(items, page, perPage);

    return {
      params: { page: page === 1 ? undefined : String(page) },
      props: { ...paginatedResult },
    };
  });
}

/**
 * Build previous/next pagination URLs for a given base path.
 */
export function buildPaginationUrls(
  basePath: string,
  currentPage: number,
  hasPrev: boolean,
  hasNext: boolean
): {
  prevUrl: string | null;
  nextUrl: string | null;
} {
  const prevUrl = hasPrev
    ? currentPage === 2
      ? basePath
      : `${basePath}/${currentPage - 1}`
    : null;

  const nextUrl = hasNext ? `${basePath}/${currentPage + 1}` : null;

  return { prevUrl, nextUrl };
}
