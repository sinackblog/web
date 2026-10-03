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

// Sin esto, dos imágenes subidas con el mismo nombre de archivo (p.ej. dos
// capturas llamadas "image.png") se pisan la una a la otra: Keystatic usa el
// nombre de archivo original tal cual si no le decimos lo contrario. Genera
// un nombre único por subida, conservando la extensión.
function uniqueFilename(originalFilename: string) {
  const match = originalFilename.match(/\.[^.]+$/);
  const ext = match ? match[0] : "";
  const random = Math.random().toString(36).slice(2, 10);
  return `${Date.now().toString(36)}-${random}${ext}`;
}

// Opciones compartidas por el campo de imagen dentro del contenido (en los
// 4 "Contenido" de Blog/Labs/Documentación/Portfolio). El campo "Tamaño" no
// es nativo de Keystatic: aprovechamos el campo "title" de la imagen (que si
// existe en el editor) como una forma sencilla de que quien escribe pida un
// tamaño sin tener que tocar CSS — la web lo interpreta al compilar.
const imageOptions = {
  transformFilename: uniqueFilename,
  schema: {
    alt: fields.text({ label: "Texto alternativo (accesibilidad)", validation: { isRequired: false } }),
    title: fields.text({
      label: "Tamaño",
      description: 'Opcional. Escribe: pequeña, mediana, grande o completa. Si lo dejas vacío, se adapta sola.',
      validation: { isRequired: false },
    }),
  },
};

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
        portada: fields.image({
          label: "Portada",
          description: "Imagen de cabecera, se ve en el listado del blog. Opcional.",
          validation: { isRequired: false },
          transformFilename: uniqueFilename,
        }),
        draft: fields.checkbox({ label: "Borrador", defaultValue: true }),
        content: fields.markdoc({
          label: "Contenido",
          description: "Texto en markdown: títulos, negritas, enlaces, imágenes, listas, bloques de código.",
          extension: "md",
          options: { image: imageOptions },
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
          options: { image: imageOptions },
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
        content: fields.markdoc({
          label: "Contenido",
          extension: "md",
          options: { image: imageOptions },
        }),
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
        content: fields.markdoc({
          label: "Contenido",
          extension: "md",
          options: { image: imageOptions },
        }),
      },
    }),
  },
});
