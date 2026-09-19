---
title: 'el puerto SSH no es seguridad, pero quitar la contraseña sí Slug:'
description: >-
  Mover el 22 a otro puerto quita ruido de los logs, no ataques. Lo que sí
  reduce la superficie, ordenado por lo que cuesta aplicarlo.
pubDate: 2026-09-19
author: s
tags:
  - Ciber
draft: false
---
Es de las primeras recomendaciones que aparece en cualquier guía: cambia el puerto 22. Y funciona, pero no para lo que la gente cree.

Mover el servicio a un puerto alto elimina prácticamente todo el escaneo automático, que es el que va directo al 22. Los logs se quedan limpios y eso tiene valor: si dejas de recibir mil intentos al día, el día que recibas veinte lo vas a ver. Pero cualquier escaneo completo lo encuentra en segundos, así que como medida de seguridad no aporta nada.

Lo que sí reduce la superficie de verdad, de menos a más esfuerzo:

**Desactivar la autenticación por contraseña.** Con `PasswordAuthentication no` y claves públicas, los ataques de fuerza bruta dejan de existir como problema. Es un cambio de una línea y es el que más devuelve.

**Desactivar el acceso directo de root.** `PermitRootLogin no`. Obliga a entrar con un usuario normal y escalar, lo que deja rastro en los logs.

**Limitar quién puede entrar.** `AllowUsers` con la lista concreta. Cualquier cuenta de servicio que exista en la máquina deja de ser una vía.

**Restringir por origen.** Si sabes desde dónde te vas a conectar, una regla de cortafuegos hace más que todo lo anterior junto.

**Y encima, fail2ban o similar.** No para los ataques, que ya no funcionan, sino para que el registro no crezca sin control.

El orden importa: si solo vas a hacer una cosa, haz la primera. Cambiar el puerto déjalo para el final, cuando el resto ya esté, y hazlo por comodidad de lectura de logs, no pensando que estás cerrando nada.
