import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Keystatic escribe los valores en YAML sin comillas cuando puede. Si el
// texto que alguien escribe coincide con una palabra especial de YAML
// (fechas sin comillas, o "si"/"no"/"true"/"null"/un número puro como
// etiqueta o título), el parser lo entrega ya convertido a Date/boolean/
// number en vez de string, y z.string() lo rechaza y rompe el build entero
// para todo el mundo. z.coerce.string()/z.coerce.date() aceptan los dos
// casos sin perder nada (recuperan el texto tal cual se escribió).
const text = z.coerce.string();

const blog = defineCollection({
  loader: glob({ pattern: "*/index.md", base: "./src/content/blog" }),
  schema: z.object({
    title: text,
    description: text,
    pubDate: z.coerce.date(),
    author: text,
    tags: z.array(text).default([]),
    draft: z.boolean().default(true),
  }),
});

const labs = defineCollection({
  loader: glob({ pattern: "*/index.md", base: "./src/content/labs" }),
  schema: z.object({
    title: text,
    description: text,
    pubDate: z.coerce.date(),
    author: text,
    tags: z.array(text).default([]),
    estado: z.enum(["terminado", "en-curso"]),
    stack: z.array(text).default([]),
    draft: z.boolean().default(true),
  }),
});

const docs = defineCollection({
  loader: glob({ pattern: "*/index.md", base: "./src/content/docs" }),
  schema: z.object({
    title: text,
    grupo: text,
    description: text,
    draft: z.boolean().default(true),
  }),
});

const portfolio = defineCollection({
  loader: glob({ pattern: "*/index.md", base: "./src/content/portfolio" }),
  schema: z.object({
    title: text,
    tipo: z.enum(["proyecto", "herramienta"]),
    estado: z.enum(["activo", "en-curso", "terminado"]),
    description: text,
    stack: z.array(text).default([]),
    url: text.optional(),
    draft: z.boolean().default(true),
  }),
});

export const collections = { blog, labs, docs, portfolio };
