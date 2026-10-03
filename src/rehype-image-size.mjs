import { visit } from "unist-util-visit";

// Keystatic no tiene un control de "tamaño" para las imágenes del editor,
// pero sí deja poner un "title" en la imagen (campo "Tamaño" en
// keystatic.config.ts), que Markdown escribe como `![alt](src "valor")`.
// Aquí se interpreta ese texto y se traduce a un ancho máximo real.
const SIZES = {
  pequeña: 320, pequena: 320, peque: 320, p: 320, s: 320, small: 320,
  mediana: 560, media: 560, m: 560, medium: 560,
  grande: 760, g: 760, l: 760, large: 760,
  completa: null, full: null, "100%": null, c: null,
};

export default function rehypeImageSize() {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (node.tagName !== "img" || !node.properties) return;
      const title = node.properties.title;
      if (typeof title !== "string") return;
      const key = title.trim().toLowerCase();
      if (!(key in SIZES)) return;
      const maxWidth = SIZES[key];
      if (maxWidth) {
        const existing = typeof node.properties.style === "string" ? node.properties.style : "";
        node.properties.style = `${existing}max-width:${maxWidth}px;`.trim();
      }
      // El title ya cumplió su función; si se deja, el navegador lo muestra
      // como tooltip al pasar el ratón, que no es lo que se pretendía.
      delete node.properties.title;
    });
  };
}
