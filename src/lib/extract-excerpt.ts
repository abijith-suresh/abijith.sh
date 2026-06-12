import { markdownToMdast } from "satteri";

interface MdastNode {
  type: string;
  children?: MdastNode[];
  value?: string;
  alt?: string;
}

export function extractExcerpt(markdown: string): string | undefined {
  const tree = markdownToMdast(markdown) as unknown as MdastNode;

  function flatten(node: MdastNode): string {
    if (node.type === "text") return node.value ?? "";
    if (node.type === "image") return node.alt ?? "";
    if (node.type === "link" || node.type === "linkReference")
      return node.children?.map(flatten).join("") ?? "";
    if (node.children) return node.children.map(flatten).join("");
    return "";
  }

  const firstParagraph = tree.children?.find((child) => child.type === "paragraph");
  if (!firstParagraph) return undefined;

  const text = flatten(firstParagraph).trim();
  return text || undefined;
}
