import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export const prerender = true;

export async function GET(context) {
  const blog = await getCollection("blog", ({ data }) => !data.draft);
  const labs = await getCollection("labs", ({ data }) => !data.draft);
  const posts = [
    ...blog.map((post) => ({ post, section: "blog" })),
    ...labs.map((post) => ({ post, section: "labs" })),
  ];
  return rss({
    title: "sinack",
    description: "labs, redes y seguridad",
    site: context.site,
    items: posts
      .sort((a, b) => b.post.data.pubDate.valueOf() - a.post.data.pubDate.valueOf())
      .map(({ post, section }) => ({
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate,
        link: `/${section}/${post.id}/`,
      })),
  });
}
