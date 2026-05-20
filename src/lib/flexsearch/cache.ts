import type { SearchIndexPayload } from "@/lib/search/types";

const INDEX_CACHE_KEY = "search_index_payload";
const LEGACY_INDEX_CACHE_KEY = "search_index_data";
const LEGACY_CACHE_VERSION_KEY = "search_index_version";

function clearLegacyCache(): void {
  localStorage.removeItem(LEGACY_INDEX_CACHE_KEY);
  localStorage.removeItem(LEGACY_CACHE_VERSION_KEY);
}

function isSearchIndexPayload(payload: unknown): payload is SearchIndexPayload {
  if (!payload || typeof payload !== "object") return false;

  const candidate = payload as Partial<SearchIndexPayload>;
  return (
    typeof candidate.generatedAt === "string" &&
    typeof candidate.signature === "string" &&
    Array.isArray(candidate.results)
  );
}

export function getCachedIndex(): SearchIndexPayload | null {
  try {
    clearLegacyCache();

    const cached = localStorage.getItem(INDEX_CACHE_KEY);
    if (!cached) return null;

    const parsed = JSON.parse(cached) as unknown;
    return isSearchIndexPayload(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function cacheIndex(payload: SearchIndexPayload): void {
  try {
    clearLegacyCache();
    localStorage.setItem(INDEX_CACHE_KEY, JSON.stringify(payload));
  } catch {
    // localStorage not available or quota exceeded
  }
}
