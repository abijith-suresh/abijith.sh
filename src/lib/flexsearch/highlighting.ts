export function highlightText(text: string, query: string): string {
  if (!query.trim() || !text) return text;

  try {
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escapedQuery})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  } catch {
    return text;
  }
}
