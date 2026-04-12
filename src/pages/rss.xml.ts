export const prerender = false;

import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const now = new Date();
  const posts = (await getCollection("blog"))
    .filter((p) => p.data.date <= now)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: "JD Fortress AI — Blog",
    description:
      "Insights on secure AI, on-premises deployment, data sovereignty, and the future of private AI infrastructure for UK businesses.",
    site: context.site?.toString() ?? "https://jdfortress.com",
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.excerpt,
      author: post.data.author,
      link: `/blog/${post.id}`,
    })),
  });
}
