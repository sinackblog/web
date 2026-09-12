---
title: "Zero trust con nginx y ufw"
description: "Proxy inverso, autenticación por certificado y cortafuegos por servicio en una sola máquina. Sin comprar nada."
pubDate: "2026-08-28"
tipo: "lab"
author: "d"
tags:
  - nginx
  - zero-trust
estado: "terminado"
stack:
  - nginx
  - ufw
  - ubuntu
draft: false
---

Un montaje pequeño para entender el modelo zero trust por dentro, sin comprar nada y sin depender de ninguna plataforma comercial: un proxy inverso con nginx delante de cada servicio, autenticación por certificado de cliente y un cortafuegos con reglas por servicio con ufw.

## Idea general

Cada servicio queda detrás de nginx, que exige un certificado de cliente válido antes de dejar pasar la petición. ufw solo permite el tráfico hacia nginx; los puertos de los servicios reales quedan cerrados hacia el exterior.

```
$ sudo ufw default deny incoming
$ sudo ufw allow 443/tcp
$ sudo ufw enable
```

## Certificados

Una CA propia, generada con `openssl`, firma los certificados de cliente. nginx valida contra esa CA con `ssl_client_certificate` y `ssl_verify_client on`.

Revocar el acceso de un cliente es tan simple como añadir su certificado a la lista de revocación y recargar nginx.
