import { visit } from "unist-util-visit";

// Keystatic guarda las imágenes insertadas en el editor de Contenido en una
// subcarpeta "content/" junto al index.md de cada entrada, pero por defecto
// escribe la referencia en el markdown como el nombre de archivo suelto (sin
// esa carpeta) — comprobado a mano subiendo imágenes en local. Como no hay
// forma fiable de configurar eso bien desde dentro de Keystatic (su opción
// "publicPath" está pensada para otro modelo de carpetas y genera una ruta
// distinta a donde de verdad guarda el archivo), se corrige aquí: cualquier
// referencia de imagen "local" (no una URL http(s), no ya dentro de content/)
// se reescribe para que apunte a esa carpeta.
export default function remarkKeystaticImages() {
  return (tree) => {
    visit(tree, "image", (node) => {
      if (/^(https?:|data:|\.?\/?content\/)/.test(node.url)) return;
      node.url = `./content/${node.url}`;
    });
  };
}
