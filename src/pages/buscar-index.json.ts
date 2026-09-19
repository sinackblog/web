import { getCollection } from "astro:content";

export const prerender = true;

export async function GET() {
  const blog = await getCollection("blog", ({ data }) => !data.draft);
  const labs = await getCollection("labs", ({ data }) => !data.draft);
  const docs = await getCollection("docs", ({ data }) => !data.draft);

  const items = [
    ...blog.map((p) => ({
      title: p.data.title,
      url: `/blog/${p.id}`,
      section: "blog",
    })),
    ...labs.map((p) => ({
      title: p.data.title,
      url: `/labs/${p.id}`,
      section: "lab",
    })),
    ...docs.map((d) => ({
      title: d.data.title,
      url: `/docs/${d.id}`,
      section: "doc",
    })),
  ];

  return new Response(JSON.stringify(items), {
    headers: { "Content-Type": "application/json" },
  });
}
