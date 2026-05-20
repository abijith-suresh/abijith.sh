import { Index } from "flexsearch";

import type { SearchIndexPayload, SearchResult } from "@/lib/search/types";

import { cacheIndex, getCachedIndex } from "./cache";
import { calculateRelevanceScore } from "./scoring";

const SEARCH_DEBOUNCE = 150;

let searchIndex: Index | null = null;
let searchData: SearchResult[] = [];
let searchSignature: string | null = null;
let searchTimer: ReturnType<typeof setTimeout> | null = null;
let refreshPromise: Promise<void> | null = null;
let resultsCallback: ((results: SearchResult[]) => void) | null = null;
let loadingCallback: ((loading: boolean) => void) | null = null;
let errorCallback: ((error: string | null) => void) | null = null;
let lastQuery = "";

function buildIndex(): void {
  searchIndex = new Index({
    tokenize: "forward",
  });

  searchData.forEach((item, idx) => {
    const searchableText = [item.title, item.description, item.tags.join(" "), item.content]
      .join(" ")
      .toLowerCase();

    searchIndex?.add(idx, searchableText);
  });
}

function applySearchPayload(payload: SearchIndexPayload, shouldCache: boolean = true): void {
  searchData = payload.results;
  searchSignature = payload.signature;
  buildIndex();

  if (shouldCache) {
    cacheIndex(payload);
  }
}

async function fetchSearchPayload(): Promise<SearchIndexPayload> {
  const response = await fetch("/api/search-index.json", {
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error("Failed to load search index");
  }

  return (await response.json()) as SearchIndexPayload;
}

function emitCurrentResults(): void {
  if (!lastQuery.trim()) {
    resultsCallback?.([]);
    return;
  }

  performSearch(lastQuery);
}

async function refreshSearchIndex(background: boolean = false): Promise<void> {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    if (!background) {
      loadingCallback?.(true);
      errorCallback?.(null);
    }

    try {
      const payload = await fetchSearchPayload();
      const hasChanges = payload.signature !== searchSignature;

      if (hasChanges) {
        applySearchPayload(payload);
        emitCurrentResults();
      }
    } catch (err) {
      if (!searchData.length) {
        console.error("Error loading search index:", err);
        errorCallback?.("Failed to load search. Please try again.");
      }
    } finally {
      if (!background) {
        loadingCallback?.(false);
      }
    }
  })();

  try {
    await refreshPromise;
  } finally {
    refreshPromise = null;
  }
}

export async function initSearchIndex(): Promise<void> {
  const cached = getCachedIndex();
  if (cached && cached.results.length > 0) {
    errorCallback?.(null);
    applySearchPayload(cached, false);
    void refreshSearchIndex(true);
    return;
  }

  await refreshSearchIndex(false);
}

export function setCallbacks(
  onResults: (results: SearchResult[]) => void,
  onLoading: (loading: boolean) => void,
  onError: (error: string | null) => void
): void {
  resultsCallback = onResults;
  loadingCallback = onLoading;
  errorCallback = onError;
}

export function clearCallbacks(): void {
  resultsCallback = null;
  loadingCallback = null;
  errorCallback = null;
}

export function search(query: string): void {
  lastQuery = query;

  if (searchTimer) {
    clearTimeout(searchTimer);
  }

  if (!query.trim()) {
    resultsCallback?.([]);
    return;
  }

  searchTimer = setTimeout(() => {
    performSearch(query);
  }, SEARCH_DEBOUNCE);
}

function performSearch(query: string): void {
  if (!searchIndex || searchData.length === 0) {
    resultsCallback?.([]);
    return;
  }

  const normalizedQuery = query.toLowerCase().trim();

  try {
    let searchResults = searchIndex.search(normalizedQuery, {
      limit: 100,
    });

    if (searchResults.length === 0 && normalizedQuery.length > 2) {
      const words = normalizedQuery.split(/\s+/).filter((word) => word.length > 2);
      const wordResults = new Set<number>();

      for (const word of words) {
        const wordSearch = searchIndex.search(word, { limit: 50 });
        for (const idx of wordSearch) {
          wordResults.add(Number(idx));
        }
      }

      searchResults = Array.from(wordResults);
    }

    const matchedResults = searchResults
      .map((idx: number | string) => searchData[Number(idx)])
      .filter(Boolean);

    const sortedResults = matchedResults
      .map((result) => ({
        result,
        score: calculateRelevanceScore(result, normalizedQuery),
      }))
      .sort((a, b) => b.score - a.score)
      .map((item) => item.result);

    resultsCallback?.(sortedResults);
  } catch (err) {
    console.error("Search error:", err);
    resultsCallback?.([]);
  }
}

export function getAllData(): SearchResult[] {
  return searchData;
}

export function clearSearchIndex(): void {
  searchIndex = null;
  searchData = [];
  searchSignature = null;
  lastQuery = "";

  if (searchTimer) {
    clearTimeout(searchTimer);
    searchTimer = null;
  }
}

export { highlightText } from "./highlighting";
