---
title: "Segmentar una red industrial sin parar la planta"
description: "Zonas y conductos sobre papel es fácil. Sobre un anillo de doce años, menos."
pubDate: "2026-09-11"
tipo: "blog"
author: "d"
tags:
  - ot
  - redes
draft: false
---

Dibujar zonas y conductos en una pizarra lleva media hora. Aplicarlo a una red que lleva doce años funcionando sin interrupciones, sin documentación fiable y sin ventana de mantenimiento que dure más de dos horas, es otro problema por completo.

## El punto de partida

Un anillo de fibra con una decena de switches gestionables, tres PLC, dos HMI y un servidor SCADA que nadie recuerda haber tocado desde su instalación. Sin VLAN, sin listas de acceso, todo en el mismo dominio de broadcast.

## Lo que se hizo

Primero, escuchar antes de tocar nada: un puerto espejo durante una semana para ver qué habla con qué. Después, zonas por función (control, supervisión, mantenimiento) y un conducto único entre zonas, con lista de acceso explícita.

> El cambio se hizo zona a zona, en ventanas de una hora, con vuelta atrás preparada antes de cada corte.

## Qué se aprendió

La documentación que existía no coincidía con la topología real en al menos tres puntos. Sin la fase de escucha pasiva, la segmentación habría cortado tráfico legítimo del que nadie tenía constancia.
