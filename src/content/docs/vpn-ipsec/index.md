---
title: "vpn-ipsec"
grupo: "fortinet"
description: "túnel sitio a sitio con selectores múltiples"
draft: false
---

Plantilla de túnel IPsec sitio a sitio entre dos FortiGate, con varios selectores de tráfico (varias subredes por extremo) en vez de un único selector "any".

## Por qué varios selectores

Un único selector "any-any" simplifica la configuración pero complica el diagnóstico: no se puede saber qué combinación concreta de subredes está fallando cuando el túnel no levanta una fase 2 en concreto.

## Fase 2

Cada par de subredes debe tener su propia fase 2, con su propio contador de tráfico, para poder aislar el problema por selector.
