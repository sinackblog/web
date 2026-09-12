# sinack

Sitio de sinack: blog, labs, documentación y portfolio. Astro + Keystatic + Cloudflare Pages.
Ver [CLAUDE.md](./CLAUDE.md) para el contexto completo de decisiones de diseño y contenido.

## Empezar en local

```sh
npm install
npm run dev
```

Abre `http://localhost:4321`.

## Editar contenido

Todo el contenido (`posts`, `docs`, `portfolio`) vive como ficheros Markdown en `src/content/`,
con el esquema definido en [`keystatic.config.ts`](./keystatic.config.ts). Se puede editar:

- **A mano**, directamente en esos ficheros.
- **Con el panel visual** en `/keystatic` (ver más abajo).

### Panel de Keystatic en local

⚠️ **Limitación conocida:** el adaptador de Cloudflare hace que `astro dev` ejecute todo dentro
del runtime `workerd`, que no tiene acceso al sistema de ficheros local. Por eso, con
`PUBLIC_KEYSTATIC_STORAGE_KIND=local` (el valor por defecto), el panel `/keystatic` no consigue
leer ni guardar entradas en local y muestra un error.

Dos formas de evitarlo mientras se trabaja en local:

1. **Rápido, para probar el panel ya:** comenta temporalmente la línea `adapter: cloudflare()`
   en [`astro.config.mjs`](./astro.config.mjs) y vuelve a lanzar `npm run dev`. Sin el adaptador,
   Astro usa su servidor de desarrollo normal (Node) y el panel funciona con storage local sin
   problema. Recuerda descomentarla antes de compilar para producción.
2. **Definitivo, una vez creada la GitHub App (ver abajo):** pon
   `PUBLIC_KEYSTATIC_STORAGE_KIND=github` en `.env`. Con storage de GitHub, Keystatic solo hace
   llamadas HTTP a la API de GitHub (no toca el disco), así que funciona igual en local que en
   producción, con el adaptador de Cloudflare puesto.

## Dar acceso a los demás autores

El repo es de una sola cuenta, pero el panel lo va a usar todo el equipo. La forma de hacerlo:

1. **Añadir a los demás como colaboradores** del repo `sinackblog/web` en GitHub, con permiso
   de escritura (Settings → Collaborators).
2. **Crear una GitHub App** para Keystatic en <https://github.com/settings/apps> → "New GitHub App":
   - Homepage URL: `https://sinack.es`
   - Callback URL: `https://sinack.es/api/keystatic/github/oauth/callback`
   - Desmarca "Expire user authorization tokens" si aparece, o déjalo como esté por defecto
   - Permisos del repositorio: **Contents** (read & write), **Metadata** (read-only)
   - Genera un **Client secret**
3. Copia el `Client ID`, el `Client secret` y el slug de la app a las variables de entorno
   (ver [`.env.example`](./.env.example)) — en local en un `.env`, y en Cloudflare Pages como
   variables/secretos del proyecto.
4. Genera `KEYSTATIC_SECRET` con `openssl rand -base64 32` y ponlo también.
5. Cada autor entra en `https://sinack.es/keystatic`, autentica con su cuenta de GitHub (la app
   solo le deja hacerlo si tiene acceso de colaborador al repo) y ya puede escribir, subir
   imágenes/archivos y guardar — cada guardado es un commit directo a `main`.

## Estructura de contenido

- `src/content/posts/<slug>/index.md` — blog y labs (campo `tipo`: `blog` | `lab`)
- `src/content/docs/<slug>/index.md` — fichas de documentación, agrupadas por `grupo`
- `src/content/portfolio/<slug>/index.md` — proyectos y herramientas

Los autores y las etiquetas son listas cerradas definidas en `keystatic.config.ts`
(constantes `AUTORES` y `TAGS`) — hay que editarlas ahí para añadir gente o etiquetas nuevas.
Los autores son solo una inicial (`D`/`S`/`A`); no se pone ningún nombre en el repo, y es lo
único que se muestra públicamente junto a cada entrada cuando hace falta distinguir quién la
escribió.

⚠️ **Antes de anunciar el sitio:** todo lo que hay ahora mismo en `src/content/` es contenido
de prueba para poder ver el diseño con datos reales mientras se construye. Bórralo (o
sustitúyelo) antes de hacer público el sitio.

## Desplegar en Cloudflare Pages

1. En el dashboard de Cloudflare → Workers & Pages → Create → conecta el repo `sinackblog/web`.
2. Framework preset: Astro. Build command: `npm run build`. Output: `dist`.
3. Añade las variables de entorno de Keystatic (las mismas del `.env`) en el proyecto de Pages.
4. Apunta `sinack.es` (comprado en DonDominio) al proyecto de Pages: añade el dominio personalizado
   desde el propio proyecto de Cloudflare Pages y sigue las instrucciones de DNS que te dé
   (si el dominio se gestiona desde Cloudflare DNS, lo hace automático; si no, tendrás que crear
   los registros CNAME/A que indique en el panel de DonDominio).

## Comandos

| Comando           | Qué hace                                      |
| :---------------- | :--------------------------------------------- |
| `npm install`      | Instala dependencias                           |
| `npm run dev`      | Servidor de desarrollo en `localhost:4321`     |
| `npm run build`    | Build de producción en `./dist/`               |
| `npm run preview`  | Previsualiza el build antes de desplegar       |
