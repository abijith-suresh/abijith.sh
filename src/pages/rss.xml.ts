import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";

import { getBlogPostUrl } from "@/lib/routes";
import { SITE } from "@/consts";

export const prerender = true;

export async function GET(context: APIContext) {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  const sortedPosts = posts.sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf()
  );

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site ?? SITE.url,
    xmlns: {
      content: "http://purl.org/rss/1.0/modules/content/",
      atom: "http://www.w3.org/2005/Atom",
    },
    customData: `
      <language>${SITE.locale}</language>
      <author>${SITE.author} (${SITE.url})</author>
    `,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishDate,
      description: post.data.description,
      link: `${getBlogPostUrl(post.id)}/`,
      categories: post.data.tags,
    })),
  });
}
