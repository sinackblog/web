# CLAUDE.md — sinack

Contexto del proyecto para trabajar en este repositorio.

## Qué es

sinack es un sitio sobre ciberseguridad. No es solo un blog: tiene secciones de blog, labs,
documentación y portfolio. Se escribe fuera del horario laboral, sin encargo de nadie.

- Dominio: **sinack.es** (registrado en DonDominio, DNS aún en los nameservers del registrador)
- Repositorio: **github.com/sinackblog/web**
- Autores con permiso de escritura en el repo. En el sitio público nunca aparecen nombres:
  cada entrada lleva solo una inicial (ver "Autores" en Esquema de contenido)

## Stack decidido

- **Astro** como generador estático
- **Keystatic** como panel de edición, en `/keystatic`, con `storage: github`
- **Cloudflare Pages** como hosting, conectado al repo (despliega en cada push a `main`)
- Sin base de datos, sin comentarios, sin analítica, sin cookies

Decisión importante: **no se usa GitHub Pages**. El panel de Keystatic necesita rutas
renderizadas en servidor y GitHub Pages solo sirve estáticos.

El objetivo del panel es que los autores no tengan que tocar git ni la terminal:
entran a `/keystatic`, escriben, guardan y se publica.

## Secciones

| Sección | Comando que se muestra | Contenido |
|---|---|---|
| inicio | `sinack --help` | lista de secciones, últimas entradas, cifras |
| blog | `sinack --blog` | posts, opinión, actualidad comentada |
| labs | `sinack --labs` | laboratorios reproducibles, en contenedores, con repo |
| documentación | `sinack --docs` | fichas cortas de configuración agrupadas por carpeta |
| portfolio | `sinack --portfolio` | proyectos y herramientas propias |
| sobre | `cat sobre.md` | qué es el sitio |

Los labs y el portfolio se muestran como cajas en rejilla de dos columnas.
**Sin nombres de autor en las cajas de labs.**

## Diseño

La referencia visual está en `diseno/sinack-demo-v9.html`. Es una maqueta en un solo
fichero, hecha a mano, y define el aspecto que debe tener el sitio.

Decisiones que hay que respetar:

- **Blanco y negro.** Fondo blanco, tinta `#111114`. Sin color de acento.
- **Dos tipografías.** JetBrains Mono para logo, menú, títulos, fechas, etiquetas y
  código. Source Serif 4 para el texto de lectura.
- **Menú lateral fijo** a la izquierda, con forma de árbol de ficheros (`~/` y ramas).
- **Barra superior fija** con la ruta tipo `sinack@web:~/labs` y enlaces de utilidad.
- **Pie en recuadro gris** (`#f3f3f6`), contenido, sin ocupar todo el ancho.
- **Los bloques de código son la única zona negra** del área de contenido.
- Nada de tarjetas con sombra, gradientes, emojis ni iconos decorativos.
- Fechas en formato ISO (`2026-09-18`).

### Efectos de terminal

Son parte de la identidad, pero contenidos:

1. Al cargar, la cabecera escribe el comando de la sección con efecto de tecleo
   (56 ms por carácter la primera vez, 22 ms al navegar).
2. Dentro de los posts, bloques desplegables que "ejecutan" un comando y escriben
   la salida en negro. Sirven para volcados largos que no deben ocupar la página.
3. Todo se desactiva con `prefers-reduced-motion: reduce`.

No añadir más animaciones. El resto de la página es estática a propósito.

## Marca

En `marca/`:

- `sinack-logo.svg` — logotipo `sinack>_`, texto convertido a trazados
- `sinack-icono.svg` — icono `>ack` con barra
- `sinack-icono-cuadrado.svg` — icono sobre cuadrado oscuro, para avatares
- PNG en 512, 180 y 32 para favicon y redes

## Esquema de contenido

Campos de un post en Keystatic:

- `title` (slug), `description` (50–160 caracteres, obligatoria)
- `pubDate` (por defecto hoy)
- `author` (lista cerrada; ver "Autores" más abajo)
- `tags` (lista cerrada, no texto libre)
- `draft` (booleano, **marcado por defecto**)
- `content` (markdoc)

Las etiquetas y autores son listas cerradas a propósito, para que no acaben con
variaciones del mismo valor.

### Autores

En `keystatic.config.ts`, constante `AUTORES`. A propósito son solo una inicial (`D`, `S`, `A`),
sin nombre completo en ningún sitio: ni en el contenido, ni en el código, ni en el repo (que es
público). Es lo único que se muestra junto a cada entrada cuando hace falta saber quién la
escribió. Si se añade o quita alguien del equipo, se edita esa lista.

## Reglas de contenido

Esto no es cosmética, es el motivo por el que el sitio existe aparte del trabajo
habitual de cada autor:

- Nada de trabajo: ni clientes, ni configuraciones reales, ni direccionamiento
- Nunca IPs, hostnames ni usuarios reales en capturas o ejemplos
- Solo entornos propios; nada probado contra sistemas de terceros
- Credenciales siempre de ejemplo
- Si algo no funcionó, se cuenta
- Se indica la versión de cada herramienta o firmware usado

## Acceso de los autores

Se decidió no montar una interfaz de subida propia: el panel de Keystatic en `/keystatic`
ya cubre esa necesidad. Cada autor entra como colaborador del repo de GitHub (permiso de
escritura) y autentica en el panel con su propia cuenta; cada guardado hace commit directo
a `main`. Detalle paso a paso, incluida la GitHub App que hay que crear, en el README.

## Estado

Hecho:
- Nombre, dominio, organización y repositorio
- Logo, icono y banners
- Maqueta de diseño (v9), en `diseno/sinack-demo-v9.html`
- Proyecto Astro + Keystatic + adaptador de Cloudflare generado y funcionando
- Diseño de la maqueta trasladado a `Layout.astro` + `global.css` (misma tipografía, misma
  paleta, mismo efecto de tecleo en la cabecera, mismo bloque colapsable de "salida" — con
  Astro View Transitions en vez del cambio de vista simulado en JS de la maqueta)
- Colecciones de Keystatic (`posts` con `tipo: blog|lab`, `docs`, `portfolio`) con el esquema
  de "Reglas de contenido" y "Esquema de contenido" de este documento
- Contenido de prueba (9 posts/labs, 8 fichas de docs, 4 entradas de portfolio) **solo para
  ver el sitio con datos mientras se construye — se retira antes de anunciarlo**, ver Pendiente
- Feed RSS en `/rss.xml`
- Autores anonimizados: solo inicial (`D`/`S`/`A`) en `keystatic.config.ts`, sin nombres en
  ningún sitio del código ni del contenido

Pendiente:
- Añadir a los demás autores como colaboradores del repo (con sus cuentas reales de GitHub;
  no hace falta tocar `keystatic.config.ts`, ya usa solo iniciales)
- Crear la GitHub App de Keystatic y configurar las variables de entorno (ver README)
- Desplegar en Cloudflare Pages
- Apuntar `sinack.es` y HTTPS
- Trasladar el logo/icono de `marca/` (pendiente de generar los ficheros) al favicon y la marca
  del sitio — de momento usa el favicon por defecto del scaffold de Astro
- **Antes de anunciar el sitio: borrar las entradas de prueba** en `src/content/posts`,
  `src/content/docs` y `src/content/portfolio`, y escribir contenido real
