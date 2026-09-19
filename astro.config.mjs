// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import keystatic from "@keystatic/astro";
import react from "@astrojs/react";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";

// Markdown en crudo deja pasar HTML tal cual (es el comportamiento estándar
// de Markdown, no algo que hayamos configurado nosotros). Con varias personas
// escribiendo directamente en Keystatic, cualquier <script> o atributo
// onclick/onerror pegado sin querer (o con mala intención) se ejecutaría tal
// cual en el navegador de quien lea el post. Se sanea el HTML resultante,
// permitiendo el estilo en línea que genera el resaltado de código de Astro.
const sanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    "*": [...(defaultSchema.attributes?.["*"] ?? []), "style", "className"],
  },
};

// https://astro.build/config
export default defineConfig({
  site: "https://sinack.es",
  output: "server",
  adapter: cloudflare(),
  integrations: [react(), keystatic()],
  markdown: {
    rehypePlugins: [[rehypeSanitize, sanitizeSchema]],
  },
  vite: {
    ssr: {
      noExternal: ["@keystatic/core", "@keystatic/astro"],
    },
  },
});
