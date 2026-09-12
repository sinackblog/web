---
title: "Lo que aprendimos leyendo el aviso de CISA de esta semana"
description: "Un vistazo al último aviso sobre dispositivos industriales: qué afecta de verdad y qué se puede hacer sin esperar al fabricante."
pubDate: "2026-09-04"
tipo: "blog"
author: "autor3"
tags:
  - actualidad
  - avisos
draft: false
---

Cada aviso ICS-CERT trae su ración de CVE con puntuación alta y su ración de titulares alarmantes. La parte útil suele estar más abajo, en el detalle de qué versión, qué protocolo y qué mitigación existe mientras no hay parche.

## Qué decía el aviso

Un fallo de autenticación en la interfaz web de gestión de una gama concreta de PLC, explotable sin credenciales si la interfaz es alcanzable desde fuera de la red de control.

## Qué se puede hacer ya

Ninguna de las mitigaciones inmediatas requiere esperar al fabricante: aislar la interfaz de gestión en una VLAN sin salida, o al menos filtrarla por lista de acceso hasta que llegue el parche.

## La parte que no cambia

El aviso de esta semana se parece mucho al de hace tres meses: una interfaz de gestión que nunca debería haber sido alcanzable desde donde lo era.
