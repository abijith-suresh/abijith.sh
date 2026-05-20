import { groupBy } from "@/lib/group-by";

type YearGroup<T> = {
  year: number;
  items: T[];
};

export function groupByYear<T>(items: T[], getDate: (item: T) => Date): YearGroup<T>[] {
  return groupBy(items, (item) => getDate(item).getFullYear())
    .map((group) => ({
      year: group.key,
      items: group.items,
    }))
    .toSorted((a, b) => b.year - a.year);
}
