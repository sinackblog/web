import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({ pattern: "*/index.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.string().transform((s) => new Date(s)),
    tipo: z.enum(["blog", "lab"]),
    author: z.string(),
    tags: z.array(z.string()),
    estado: z.enum(["terminado", "en-curso"]).optional(),
    stack: z.array(z.string()).default([]),
    draft: z.boolean().default(true),
  }),
});

const docs = defineCollection({
  loader: glob({ pattern: "*/index.md", base: "./src/content/docs" }),
  schema: z.object({
    title: z.string(),
    grupo: z.string(),
    description: z.string(),
    draft: z.boolean().default(true),
  }),
});

const portfolio = defineCollection({
  loader: glob({ pattern: "*/index.md", base: "./src/content/portfolio" }),
  schema: z.object({
    title: z.string(),
    tipo: z.enum(["proyecto", "herramienta"]),
    estado: z.enum(["activo", "en-curso", "terminado"]),
    description: z.string(),
    stack: z.array(z.string()).default([]),
    url: z.string().optional(),
    draft: z.boolean().default(true),
  }),
});

export const collections = { posts, docs, portfolio };
