import { visit } from "unist-util-visit";
import { basename, dirname } from "node:path";

// Keystatic guarda las imágenes insertadas en el editor de Contenido en una
// subcarpeta "content/" junto al index.md de cada entrada, pero por defecto
// escribe la referencia en el markdown como el nombre de archivo suelto (sin
// esa carpeta) — comprobado a mano subiendo imágenes en local. Como no hay
// forma fiable de configurar eso bien desde dentro de Keystatic (su opción
// "publicPath" está pensada para otro modelo de carpetas y genera una ruta
// distinta a donde de verdad guarda el archivo), se corrige aquí.
//
// También arregla, por si queda alguna entrada guardada mientras tuvimos
// publicPath mal configurado (o alguien con el panel cacheado en el
// navegador): esa config escribía "content/<slug-de-la-entrada>/archivo",
// duplicando el nombre de la carpeta de la propia entrada dentro de
// "content/", cuando el archivo real está en "content/archivo" a secas.
export default function remarkKeystaticImages() {
  return (tree, file) => {
    const filePath = file.history?.[0] ?? file.path ?? "";
    const entrySlug = filePath ? basename(dirname(filePath)) : "";

    visit(tree, "image", (node) => {
      if (/^(https?:|data:)/.test(node.url)) return;

      let url = node.url.replace(/^\.?\//, ""); // quita "./" o "/" inicial
      if (!url.startsWith("content/")) {
        url = `content/${url}`;
      }
      if (entrySlug) {
        const dupPrefix = `content/${entrySlug}/`;
        if (url.startsWith(dupPrefix)) {
          url = `content/${url.slice(dupPrefix.length)}`;
        }
      }
      node.url = `./${url}`;
    });
  };
}
