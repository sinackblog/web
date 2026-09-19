// Astro empotra en línea (no como archivo externo) los <script> compartidos
// del Layout, incluso pasándoles `src`. Eso choca con una CSP sin
// 'unsafe-inline' en script-src. En vez de debilitar la CSP, este paso de
// postbuild calcula el hash SHA-256 real de cada <script> en línea (sin
// atributo src) del HTML ya generado y lo añade a script-src en _headers,
// para que solo ese contenido exacto pueda ejecutarse.
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const clientDir = path.join(__dirname, "..", "dist", "client");
const indexHtml = path.join(clientDir, "index.html");
const headersPath = path.join(clientDir, "_headers");

const html = fs.readFileSync(indexHtml, "utf8");
const hashes = new Set();
const scriptRe = /<script([^>]*)>([\s\S]*?)<\/script>/g;
let m;
while ((m = scriptRe.exec(html))) {
  const attrs = m[1];
  const content = m[2];
  if (/\bsrc\s*=/.test(attrs)) continue; // externo, no necesita hash
  if (!content.trim()) continue;
  const hash = crypto.createHash("sha256").update(content, "utf8").digest("base64");
  hashes.add(`'sha256-${hash}'`);
}

if (hashes.size === 0) {
  console.log("[patch-csp-hashes] No se encontraron <script> en línea, nada que parchear.");
  process.exit(0);
}

let headers = fs.readFileSync(headersPath, "utf8");
const before = headers;
headers = headers.replace(
  /(script-src 'self')/,
  `$1 ${[...hashes].join(" ")}`
);

if (headers === before) {
  console.error("[patch-csp-hashes] No se encontró 'script-src 'self'' en _headers, revisa public/_headers.");
  process.exit(1);
}

fs.writeFileSync(headersPath, headers);
console.log(`[patch-csp-hashes] Añadidos ${hashes.size} hash(es) a script-src:`, [...hashes]);
