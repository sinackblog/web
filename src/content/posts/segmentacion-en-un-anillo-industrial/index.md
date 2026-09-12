---
title: "Segmentación en un anillo industrial"
description: "VLAN, listas de acceso y puerto espejo sobre una topología en anillo montada en laboratorio."
pubDate: "2026-08-20"
tipo: "lab"
author: "d"
tags:
  - ot
  - redes
estado: "terminado"
stack:
  - vlan
  - acl
  - span
draft: false
---

Versión de laboratorio, reproducible sin depender de una planta real, del trabajo descrito en el post sobre segmentación de una red industrial en producción.

## Montaje

Un anillo de cuatro switches gestionables con RSTP, tres VLAN (control, supervisión, mantenimiento) y un puerto espejo en el switch núcleo para poder observar todo el tráfico entre zonas durante las pruebas.

## Listas de acceso

Las listas de acceso entre VLAN se escribieron primero en modo `log` sin bloquear, para verificar durante una semana simulada que no cortaban tráfico legítimo antes de pasarlas a modo `deny` real.
