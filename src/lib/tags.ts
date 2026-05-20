export function slugifyTag(tag: string): string {
  return tag
    .trim()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
}

export function getTagHref(tag: string): string {
  return `/tags/${slugifyTag(tag)}`;
}
