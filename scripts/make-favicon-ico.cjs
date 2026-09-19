// Genera public/favicon.ico (fondo blanco, marca negra) a partir del mismo
// diseño vectorial que public/icon-black.svg, rasterizado a mano en 32x32.
// Sirve de fallback para contextos que no leen el <link rel="icon"> del sitio
// (p.ej. la pestaña de /keystatic, que no pasa por nuestro Layout.astro).
const fs = require("fs");
const path = require("path");

const SIZE = 32;
const SCALE = SIZE / 128;

// Mismo polígono que public/icon-black.svg (viewBox 0 0 128 128), escalado.
const chevron = [
  [39, 20], [87, 64], [39, 108], [33, 100], [73, 64], [33, 28],
].map(([x, y]) => [x * SCALE, y * SCALE]);

const bar = { x: 90 * SCALE, y: 90 * SCALE, w: 24 * SCALE, h: 10 * SCALE };

function pointInPolygon(px, py, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    const intersect =
      yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

function isMark(px, py) {
  // Supersample 3x3 por pixel para suavizar un poco el borde a esta resolución.
  let hits = 0;
  for (let sy = 0; sy < 3; sy++) {
    for (let sx = 0; sx < 3; sx++) {
      const x = px + (sx + 0.5) / 3;
      const y = py + (sy + 0.5) / 3;
      const inBar = x >= bar.x && x <= bar.x + bar.w && y >= bar.y && y <= bar.y + bar.h;
      if (inBar || pointInPolygon(x, y, chevron)) hits++;
    }
  }
  return hits / 9; // 0..1 de cobertura negra
}

// --- Construye el bitmap 32bpp BGRA, fondo negro, marca blanca ---
const pixels = Buffer.alloc(SIZE * SIZE * 4);
for (let y = 0; y < SIZE; y++) {
  for (let x = 0; x < SIZE; x++) {
    const cov = isMark(x, y); // 0 = fondo, 1 = marca
    const v = Math.round(255 * cov);
    // ICO/BMP se guarda de abajo hacia arriba
    const row = SIZE - 1 - y;
    const off = (row * SIZE + x) * 4;
    pixels[off + 0] = v; // B
    pixels[off + 1] = v; // G
    pixels[off + 2] = v; // R
    pixels[off + 3] = 255; // A (opaco)
  }
}

// AND mask: todo ceros (no hay transparencia real, usamos el canal alpha)
const maskRowBytes = Math.ceil(SIZE / 8 / 4) * 4;
const andMask = Buffer.alloc(maskRowBytes * SIZE, 0);

// BITMAPINFOHEADER (40 bytes)
const dib = Buffer.alloc(40);
dib.writeUInt32LE(40, 0); // header size
dib.writeInt32LE(SIZE, 4); // width
dib.writeInt32LE(SIZE * 2, 8); // height = image + mask
dib.writeUInt16LE(1, 12); // planes
dib.writeUInt16LE(32, 14); // bpp
dib.writeUInt32LE(0, 16); // compression BI_RGB
dib.writeUInt32LE(pixels.length + andMask.length, 20);

const imageData = Buffer.concat([dib, pixels, andMask]);

// ICONDIR (6 bytes) + ICONDIRENTRY (16 bytes)
const iconDir = Buffer.alloc(6);
iconDir.writeUInt16LE(0, 0);
iconDir.writeUInt16LE(1, 2); // tipo icono
iconDir.writeUInt16LE(1, 4); // 1 imagen

const entry = Buffer.alloc(16);
entry.writeUInt8(SIZE, 0); // width (32 -> cabe en 1 byte)
entry.writeUInt8(SIZE, 1); // height
entry.writeUInt8(0, 2); // paleta
entry.writeUInt8(0, 3); // reservado
entry.writeUInt16LE(1, 4); // color planes
entry.writeUInt16LE(32, 6); // bpp
entry.writeUInt32LE(imageData.length, 8); // tamaño de la imagen
entry.writeUInt32LE(6 + 16, 12); // offset

const ico = Buffer.concat([iconDir, entry, imageData]);
const out = path.join(__dirname, "..", "public", "favicon.ico");
fs.writeFileSync(out, ico);
console.log("Escrito", out, ico.length, "bytes");
