import { getCollection } from "astro:content";

export const prerender = true;

export async function GET() {
  const posts = await getCollection("posts", ({ data }) => !data.draft);
  const docs = await getCollection("docs", ({ data }) => !data.draft);

  const items = [
    ...posts.map((p) => ({
      title: p.data.title,
      url: `/${p.data.tipo === "blog" ? "blog" : "labs"}/${p.id}`,
      section: p.data.tipo === "blog" ? "blog" : "lab",
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
