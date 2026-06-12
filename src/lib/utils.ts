export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function calculateReadingTime(content: string, wordsPerMinute = 200): number {
  if (!content.trim()) return 0;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export function formatReadingTime(minutes: number): string {
  return `${new Intl.NumberFormat("en-US").format(minutes)} min read`;
}
