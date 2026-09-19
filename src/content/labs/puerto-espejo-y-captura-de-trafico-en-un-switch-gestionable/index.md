---
title: Puerto espejo y captura de tráfico en un switch gestionable
description: >-
  Cómo configurar un SPAN para analizar tráfico sin cortar el servicio, con la
  captura y el análisis básico paso a paso.
pubDate: 2026-09-19
author: s
tags: []
estado: terminado
stack: []
draft: true
---
**Qué se monta**

Un puerto espejo en un switch gestionable, volcando el tráfico de un segmento a una máquina con Wireshark. Es la base de casi cualquier análisis y de cualquier segmentación bien hecha.

**Requisitos**

Un switch que soporte SPAN, un equipo con una interfaz libre y espacio en disco. Ojo con esto último: un segmento con carga llena un disco más rápido de lo que parece.

**Montaje**

Se define el origen, que puede ser un puerto o una VLAN entera, y el destino, que es el puerto donde tienes la máquina de captura. En el destino conviene desactivar todo lo que el switch pueda enviar por su cuenta, para que solo llegue lo espejado.

**A tener en cuenta**

![](0e32be25-6d48-4cd1-b16c-4a0964a4d014.png)

El destino no debe estar en producción: mientras hace de espejo no pasa tráfico normal. Y si el origen es una VLAN con mucha carga, puedes saturar el puerto de destino y perder paquetes sin enterarte; conviene comprobar el contador de descartes antes de fiarte de lo capturado.

**Qué te llevas de aquí**

Una foto real de qué habla con qué en tu red. A partir de ahí puedes diseñar reglas con datos en vez de con suposiciones, que es la diferencia entre segmentar bien y segmentar a ciegas.

**Repositorio:** `sinackblog/lab-span`
