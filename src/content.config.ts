import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "*/index.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Keystatic escribe la fecha sin comillas en el YAML (2026-01-01), lo que
    // hace que el parser la entregue ya como Date en vez de string. z.coerce
    // acepta los dos casos (fecha escrita a mano como texto, o por Keystatic).
    pubDate: z.coerce.date(),
    author: z.string(),
    tags: z.array(z.string()),
    draft: z.boolean().default(true),
  }),
});

const labs = defineCollection({
  loader: glob({ pattern: "*/index.md", base: "./src/content/labs" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string(),
    tags: z.array(z.string()),
    estado: z.enum(["terminado", "en-curso"]),
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

export const collections = { blog, labs, docs, portfolio };
