---
title: oneypot SSH con Cowrie sobre Debian
description: >-
  Montaje completo de un honeypot SSH en un VPS: instalación, redirección de
  puertos, recogida de logs y qué se ve en las primeras semanas
pubDate: 2026-09-19
author: s
tags: []
estado: terminado
stack: []
draft: false
---
**Qué se monta**

Un honeypot SSH en una máquina aislada, sin nada más encima, para ver qué tráfico automático llega a una IP pública cualquiera.

**Requisitos**

Un VPS con Debian 12, acceso root y la posibilidad de cambiar el puerto del SSH real. Nada más.

**Montaje**

Lo primero y más importante: mueve el SSH de verdad a otro puerto y comprueba que entras por él **antes** de tocar nada más. Si haces la redirección primero, te quedas fuera de la máquina.

Después se instala Cowrie en su entorno virtual y se redirige el 22 al puerto donde escucha el honeypot. La configuración por defecto vale para empezar; lo único que conviene tocar es el nombre de host que muestra, para que no delate que es un señuelo.

**Qué mirar**

Los intentos fallidos son lo menos interesante. Lo que merece la pena son las sesiones aceptadas: los comandos que ejecutan, los binarios que intentan descargar y los mecanismos de persistencia que dejan.

**Qué te llevas de aquí**

Ver de primera mano que cualquier máquina expuesta recibe este tráfico desde el primer minuto cambia bastante la percepción de "esto es un servidor de pruebas, no pasa nada". Y sobre todo: comprobar qué medidas lo cortan de verdad, que es lo que luego aplicas en las máquinas que sí importan.
