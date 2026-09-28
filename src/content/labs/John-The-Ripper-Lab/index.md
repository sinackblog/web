---
title: Crackeo de contraseñas con John the Ripper
description: Crackeo de contraseñas utilizando John the Ripper en un escenario ubuntu
pubDate: 2026-09-28
author: s
tags:
  - Crackeo
  - Lab
estado: terminado
stack: []
draft: false
---
## 

> Guía de instalación y uso en Ubuntu

---

### Introducción

Esta guía documenta el proceso completo para instalar John the Ripper en Ubuntu y realizar una demostración de crackeo de contraseñas usando un diccionario de palabras reales. El objetivo es entender por qué las contraseñas débiles son un riesgo real.

---

### 1. Instalación

#### Actualizar repositorios

bash

`sudo apt update`

#### Instalar John the Ripper

bash

`sudo apt install john -y sudo snap install john-the-ripper`

> La versión snap (Jumbo) soporta más de 400 formatos de hash. Es la que usamos en la demo.

#### Descargar el diccionario rockyou.txt

rockyou.txt contiene 14 millones de contraseñas reales filtradas de brechas de seguridad. Es el diccionario más usado en pruebas de penetración.

bash

`wget <https://github.com/brannondorsey/naive-hashcat/releases/download/data/rockyou.txt`\>

Verificar que se ha descargado correctamente:

bash

`wc -l /root/rockyou.txt head -20 /root/rockyou.txt`

> `wc -l` debería mostrar 14.344.391 líneas. `head -20` muestra las primeras contraseñas: 123456, password, iloveyou...

---

### 2. Preparar la demo

#### Crear usuarios de prueba

Creamos tres usuarios con contraseñas de diferente fortaleza para ver la diferencia en el resultado.

bash

`sudo useradd -M sserch1 sudo useradd -M sserch2 sudo useradd -M sserch3`

Asignar contraseñas manualmente:

bash

`sudo passwd sserch1`

> Contraseña: `12345678` — muy débil

bash

`sudo passwd sserch2`

> Contraseña: `password123!` — débil

bash

`sudo passwd sserch3`

> Contraseña: `X9#mK2pL!` — fuerte

#### Generar hashes MD5

Los sistemas no guardan contraseñas en texto plano, sino como hashes. Simulamos eso generando el hash MD5 de cada contraseña.

bash

`echo -n "12345678" | md5sum | awk '{print "sserch1:"$1}' > /root/hashes_demo.txt echo -n "password123!" | md5sum | awk '{print "sserch2:"$1}' >> /root/hashes_demo.txt echo -n "X9#mK2pL!" | md5sum | awk '{print "sserch3:"$1}' >> /root/hashes_demo.txt`

Verificar:

bash

`cat /root/hashes_demo.txt`

> Muestra tres líneas con formato usuario:hash. Son ilegibles a simple vista — esto es lo que vería un atacante en una base de datos comprometida.

---

### 3. Ejecutar el ataque

#### Lanzar John the Ripper

John compara el hash de cada contraseña del diccionario con los hashes del archivo. Cuando encuentra coincidencia, la contraseña queda al descubierto.

bash

`sudo john-the-ripper --wordlist=/root/rockyou.txt --format=Raw-MD5 /root/hashes_demo.txt`

> `--wordlist` especifica el diccionario. `--format=Raw-MD5` indica el tipo de hash.

#### Ver resultados

bash

`sudo john-the-ripper --show --format=Raw-MD5 /root/hashes_demo.txt`

> Resultado esperado: sserch1 y sserch2 crackeadas en menos de un segundo. sserch3 no cae.

---

### 4. Resultados obtenidos

{% table %}
- Usuario
- Contraseña
- Nivel
- Resultado
---
- sserch1
- 12345678
- Muy débil
- ❌ Crackeada al instante
---
- sserch2
- password123!
- Débil
- ❌ Crackeada al instante
---
- sserch3
- X9#mK2pL!
- Fuerte
- ✅ No ha caído
{% /table %}

La diferencia entre estar comprometido y estar seguro es la elección de contraseña.

---

### 5. Recomendaciones

- Usa contraseñas de al menos 12 caracteres con mayúsculas, minúsculas, números y símbolos
- No uses palabras del diccionario ni variantes obvias (password1, admin123...)
- No reutilices contraseñas entre servicios distintos
- Usa un gestor de contraseñas: **Bitwarden** (gratuito), **KeePassXC** (local), **1Password**
- Activa autenticación multifactor (MFA) siempre que sea posible

---

### 6. Referencias

- John the Ripper Jumbo: [https://github.com/openwall/john](https://github.com/openwall/john)
- rockyou.txt: [https://github.com/brannondorsey/naive-hashcat](https://github.com/brannondorsey/naive-hashcat)
- HaveIBeenPwned: [https://haveibeenpwned.com](https://haveibeenpwned.com)
- How Secure Is My Password: [https://howsecureismypassword.net](https://howsecureismypassword.net)
