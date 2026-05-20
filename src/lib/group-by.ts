type GroupResult<K, T> = {
  key: K;
  items: T[];
};

/**
 * Generic groupBy — groups items by a key extracted via `getKey`.
 *
 * Groups are returned in insertion order (the order each key first appears).
 * Items within each group preserve insertion order.
 *
 * Does not sort — callers that need sorted groups or items should sort
 * the returned array themselves.
 */
export function groupBy<T, K extends number | string>(
  items: T[],
  getKey: (item: T) => K
): GroupResult<K, T>[] {
  const groups = new Map<K, T[]>();

  for (const item of items) {
    const key = getKey(item);
    const group = groups.get(key);
    if (group) {
      group.push(item);
    } else {
      groups.set(key, [item]);
    }
  }

  return Array.from(groups.entries()).map(([key, groupItems]) => ({
    key,
    items: groupItems,
  }));
}
