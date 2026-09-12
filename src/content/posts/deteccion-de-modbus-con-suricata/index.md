---
title: "Detección de Modbus con Suricata en un anillo simulado"
description: "Tres PLC simulados, un puerto espejo y reglas afinadas hasta quitar los falsos positivos."
pubDate: "2026-09-14"
tipo: "lab"
author: "autor3"
tags:
  - ot
estado: "en-curso"
stack:
  - suricata
  - modbus
  - gns3
draft: false
---

Un anillo industrial simulado en GNS3 con tres PLC virtuales hablando Modbus/TCP, un puerto espejo hacia una máquina con Suricata y un juego de reglas propio para detectar operaciones de escritura fuera de horario y funciones Modbus poco habituales.

## Topología

Tres PLC simulados con `openplc`, un switch virtual con puerto espejo y una máquina Suricata en modo IDS puro, sin inline.

## Reglas

El primer juego de reglas generaba demasiado ruido: cualquier escritura se marcaba como sospechosa, incluidas las legítimas del ciclo normal de control. El ajuste consistió en distinguir por function code y por rango horario esperado.

Este laboratorio sigue en curso: falta afinar la detección de secuencias de lectura anómalas que podrían indicar reconocimiento previo a un ataque.
