# Cómo publicar en sinack.es

Guía rápida para subir contenido al sitio. No hace falta tocar código ni git: todo se hace desde el navegador.

## 1. Entrar al panel

1. Ve a **[sinack.es/keystatic](https://sinack.es/keystatic)**.
2. Dale a **"Log in with GitHub"** y entra con tu cuenta de GitHub (la misma con la que te invitaron al repositorio).
3. La primera vez te pedirá autorizar la aplicación — acéptalo.

Si alguna vez ves "Sign in to Cloudflare" o algo de Cloudflare, te has equivocado de sitio: el panel es `sinack.es/keystatic`, no la dashboard de Cloudflare.

## 2. Las secciones

En el menú de la izquierda hay 4 colecciones:

| Sección | Para qué |
|---|---|
| **Blog** | Opinión, actualidad comentada, artículos que no son un montaje paso a paso |
| **Labs** | Laboratorios: algo que has montado, con pasos, y su resultado |
| **Documentación** | Fichas de referencia rápida (comandos, configuraciones) |
| **Portfolio** | Proyectos o herramientas propias, no artículos |

## 3. Crear una entrada

Entra en la colección que toque y dale a **"Create"** (arriba a la derecha) o al **+** de la colección en el Dashboard. Cada sección tiene sus propios campos:

### Blog

- **Título** — el titular. El **Slug** (la URL) se genera solo a partir del título; no hace falta tocarlo. Ojo al copiar y pegar: que no se cuele texto de más al final (nos pasó con la palabra "Slug" pegada sin querer a un título).
- **Descripción** — resumen corto, entre 50 y 160 caracteres. Es lo que se ve en el listado del blog.
- **Fecha de publicación** — hoy por defecto, cámbiala si hace falta.
- **Autor** — tu inicial (D / S / A).
- **Etiquetas** — las que quieras, texto libre. "Add" para meter más de una.
- **Borrador** — marcada por defecto; mientras esté marcada, no se ve en la web pública.
- **Contenido** — el cuerpo del artículo.

### Labs

Los mismos campos que Blog (Título, Descripción, Fecha, Autor, Etiquetas, Borrador, Contenido), más:

- **Estado** — Terminado o En curso.
- **Stack** — herramientas o tecnologías usadas en el montaje, una por línea.

### Documentación

- **Título** — el nombre de la ficha.
- **Grupo (carpeta)** — agrupa las fichas en `/docs` (p.ej. `fortinet`, `redes`, `ot`). Fichas con el mismo grupo salen juntas.
- **Descripción corta** — resumen de una línea.
- **Borrador**.
- **Contenido**.

### Portfolio

- **Título** — el nombre del proyecto o herramienta.
- **Tipo** — Proyecto o Herramienta.
- **Estado** — Activo, En curso o Terminado.
- **Descripción**.
- **Stack / etiquetas** — tecnologías, una por línea.
- **Enlace (repo, demo…)** — opcional, URL a donde corresponda.
- **Borrador**.
- **Contenido**.

**Nunca pongas tu nombre real en ningún campo** — es la única regla dura del sitio, solo iniciales.

Cuando termines de rellenar, dale a **"Create"** (o "Save" si ya existía) arriba a la derecha.

## 4. Añadir imágenes

Dentro del editor de **Contenido**, en la barra de herramientas hay un icono de imagen — dale y sube el archivo. Se inserta directamente donde tengas el cursor. No hace falta subirla a ningún otro sitio antes.

## 5. Publicar de verdad

Una entrada nueva se guarda **como borrador** aunque le des a Create. Para que se vea en la web:

1. Vuelve a entrar en la entrada.
2. **Desmarca la casilla "Borrador"**.
3. Guarda.

Tarda **1-2 minutos** en aparecer en la web después de guardar (el sitio se reconstruye entero cada vez que se guarda algo).

## 6. Editar o borrar algo publicado

Entra en la entrada desde la lista de la colección, edita lo que haga falta y guarda. Para borrarla, busca la opción de eliminar en el menú `···` de la cabecera del formulario.

## 7. Si sale un aviso de "crea una rama nueva"

Significa que alguien guardó algo más mientras tú tenías el formulario abierto, y no se puede escribir encima sin más. **No hace falta crear la rama**: dale a Cancel, recarga la página (F5), vuelve a entrar y guarda otra vez.

## 8. Si algo va mal

Si al guardar sale un aviso de error en rojo, o si tu entrada no aparece en la web pasados 5 minutos, avisa a Sergio con una captura del error. Que quede claro: **nunca se rompe la web pública** por un fallo al guardar — en el peor caso, simplemente tu cambio no llega a publicarse hasta que se arregla.
