---
title: "Honeypot SSH con Cowrie"
description: "Montaje sobre Debian, redirección de puertos, recogida de logs y volcado a Elasticsearch. Con los datos de tres semanas de capturas."
pubDate: "2026-09-14"
tipo: "lab"
author: "autor1"
tags:
  - honeypot
  - ssh
estado: "terminado"
stack:
  - cowrie
  - debian
  - elastic
draft: false
---

Laboratorio reproducible completo del honeypot usado en el post de blog sobre los tres semanas de capturas: instalación de Cowrie, redirección de puertos con iptables, exportación de logs en JSON y volcado a un índice de Elasticsearch para poder consultarlos.

## Requisitos

- Debian 12 mínimo, 1 vCPU y 1 GB de RAM son suficientes
- Puerto 22 real movido a otro puerto antes de empezar
- Docker si se prefiere levantar Elasticsearch en contenedor en vez de instalarlo aparte

## Pasos

```
$ git clone https://github.com/cowrie/cowrie
$ cd cowrie && python3 -m venv cowrie-env
$ source cowrie-env/bin/activate && pip install -r requirements.txt
$ cp etc/cowrie.cfg.dist etc/cowrie.cfg
```

Con el servicio arrancado, los logs en `var/log/cowrie/cowrie.json` se pueden enviar a Elasticsearch con Filebeat o cualquier shipper de JSON por línea.

El repositorio con la configuración completa y el índice de Elasticsearch usado en este laboratorio está enlazado desde el perfil de GitHub de sinack.
