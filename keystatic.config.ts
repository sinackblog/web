import { config, fields, collection } from "@keystatic/core";

// Lista cerrada a propósito (ver CLAUDE.md → "Reglas de contenido").
// Solo la inicial: en el sitio público solo se muestra esta letra, nunca un nombre.
// El value es el mismo de la letra a propósito, para que tampoco haya nombres en el repo.
const AUTORES = [
  { label: "D", value: "d" },
  { label: "S", value: "s" },
  { label: "A", value: "a" },
];

// import.meta.env, no process.env: este archivo también se empaqueta para el navegador
// (el panel /keystatic es una app React que necesita conocer la configuración).
const isGithub = import.meta.env.PUBLIC_KEYSTATIC_STORAGE_KIND === "github";

export default config({
  storage: isGithub
    ? { kind: "github", repo: "sinackblog/web" }
    : { kind: "local" },

  ui: {
    brand: { name: "sinack" },
  },

  collections: {
    blog: collection({
      label: "Blog",
      path: "src/content/blog/*/",
      slugField: "title",
      format: { contentField: "content" },
      entryLayout: "content",
      schema: {
        title: fields.slug({ name: { label: "Título" } }),
        description: fields.text({
          label: "Descripción",
          description: "Entre 50 y 160 caracteres. Se usa en listados y meta tags.",
          multiline: true,
          validation: { length: { min: 50, max: 160 } },
        }),
        pubDate: fields.date({
          label: "Fecha de publicación",
          defaultValue: { kind: "today" },
        }),
        author: fields.select({
          label: "Autor",
          description: "Se muestra tal cual en el sitio público, junto al post.",
          options: AUTORES,
          defaultValue: AUTORES[0].value,
        }),
        tags: fields.array(fields.text({ label: "Etiqueta" }), {
          label: "Etiquetas",
          itemLabel: (props) => props.value || "—",
        }),
        draft: fields.checkbox({ label: "Borrador", defaultValue: true }),
        content: fields.markdoc({
          label: "Contenido",
          description: "Texto en markdown: títulos, negritas, enlaces, imágenes, listas, bloques de código.",
          extension: "md",
        }),
      },
    }),

    labs: collection({
      label: "Labs",
      path: "src/content/labs/*/",
      slugField: "title",
      format: { contentField: "content" },
      entryLayout: "content",
      schema: {
        title: fields.slug({ name: { label: "Título" } }),
        description: fields.text({
          label: "Descripción",
          description: "Entre 50 y 160 caracteres. Se usa en listados y meta tags.",
          multiline: true,
          validation: { length: { min: 50, max: 160 } },
        }),
        pubDate: fields.date({
          label: "Fecha de publicación",
          defaultValue: { kind: "today" },
        }),
        author: fields.select({
          label: "Autor",
          description: "Se muestra tal cual en el sitio público, junto al post.",
          options: AUTORES,
          defaultValue: AUTORES[0].value,
        }),
        tags: fields.array(fields.text({ label: "Etiqueta" }), {
          label: "Etiquetas",
          itemLabel: (props) => props.value || "—",
        }),
        estado: fields.select({
          label: "Estado",
          options: [
            { label: "Terminado", value: "terminado" },
            { label: "En curso", value: "en-curso" },
          ],
          defaultValue: "terminado",
        }),
        stack: fields.array(
          fields.text({ label: "Herramienta / tecnología" }),
          {
            label: "Stack",
            itemLabel: (props) => props.value || "—",
          }
        ),
        draft: fields.checkbox({ label: "Borrador", defaultValue: true }),
        content: fields.markdoc({
          label: "Contenido",
          description: "Texto en markdown: títulos, negritas, enlaces, imágenes, listas, bloques de código.",
          extension: "md",
        }),
      },
    }),

    docs: collection({
      label: "Documentación",
      path: "src/content/docs/*/",
      slugField: "title",
      format: { contentField: "content" },
      entryLayout: "content",
      schema: {
        title: fields.slug({ name: { label: "Título" } }),
        grupo: fields.text({
          label: "Grupo (carpeta)",
          description: "p.ej. fortinet, redes, ot. Agrupa las fichas en /docs.",
        }),
        description: fields.text({ label: "Descripción corta" }),
        draft: fields.checkbox({ label: "Borrador", defaultValue: true }),
        content: fields.markdoc({ label: "Contenido", extension: "md" }),
      },
    }),

    portfolio: collection({
      label: "Portfolio",
      path: "src/content/portfolio/*/",
      slugField: "title",
      format: { contentField: "content" },
      entryLayout: "content",
      schema: {
        title: fields.slug({ name: { label: "Título" } }),
        tipo: fields.select({
          label: "Tipo",
          options: [
            { label: "Proyecto", value: "proyecto" },
            { label: "Herramienta", value: "herramienta" },
          ],
          defaultValue: "proyecto",
        }),
        estado: fields.select({
          label: "Estado",
          options: [
            { label: "Activo", value: "activo" },
            { label: "En curso", value: "en-curso" },
            { label: "Terminado", value: "terminado" },
          ],
          defaultValue: "activo",
        }),
        description: fields.text({ label: "Descripción", multiline: true }),
        stack: fields.array(fields.text({ label: "Etiqueta" }), {
          label: "Stack / etiquetas",
          itemLabel: (props) => props.value || "—",
        }),
        url: fields.url({
          label: "Enlace (repo, demo…)",
          validation: { isRequired: false },
        }),
        draft: fields.checkbox({ label: "Borrador", defaultValue: true }),
        content: fields.markdoc({ label: "Contenido", extension: "md" }),
      },
    }),
  },
});
