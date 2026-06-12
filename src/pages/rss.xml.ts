import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { SITE } from "@/consts";
import { getWritingUrl } from "@/lib/routes";

export const prerender = true;

export async function GET(context: APIContext) {
  const posts = await getCollection("writing");
  const sortedPosts = posts.sort(
    (a, b) => b.data.publishedDate.valueOf() - a.data.publishedDate.valueOf()
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
      pubDate: post.data.publishedDate,
      description: post.data.description,
      link: getWritingUrl(post.id),
    })),
  });
}
