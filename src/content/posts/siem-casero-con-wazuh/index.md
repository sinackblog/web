---
title: "SIEM casero con Wazuh"
description: "Agentes, reglas propias y los primeros paneles útiles. Qué se ve el primer día y qué hay que afinar después."
pubDate: "2026-08-05"
tipo: "lab"
author: "autor1"
tags:
  - siem
estado: "terminado"
stack:
  - wazuh
  - siem
draft: false
---

Instalación de un servidor Wazuh y despliegue de agentes en un puñado de máquinas de laboratorio, con el objetivo de tener paneles útiles desde el primer día y no solo una instalación funcionando de puertas para adentro.

## Primer día

Con la configuración por defecto ya llegan alertas de fuerza bruta SSH y cambios en ficheros críticos. La mayoría de las reglas propias añadidas después son para reducir ruido, no para detectar más.

## Reglas propias

Las reglas que más valor aportaron fueron las que correlacionan varios eventos de bajo nivel (varios intentos fallidos seguidos de un éxito) en vez de disparar por cada evento aislado.
