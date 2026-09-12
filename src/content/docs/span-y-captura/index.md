---
title: "span-y-captura"
grupo: "redes"
description: "puerto espejo para analizar sin cortar tráfico"
draft: false
---

Configuración de un puerto espejo (SPAN) para capturar tráfico con fines de análisis sin necesidad de un dispositivo inline que pueda cortar la producción si falla.

## Limitaciones

Un puerto espejo puede perder tráfico si el enlace de destino tiene menos ancho de banda que la suma de los puertos origen. Para enlaces troncales muy cargados conviene filtrar qué VLAN se espejan.
