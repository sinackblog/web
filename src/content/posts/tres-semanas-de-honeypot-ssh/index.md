---
title: "Tres semanas de honeypot SSH: quién llama de verdad a tu puerta"
description: "Un Cowrie abierto en un VPS sin anunciar. Las credenciales que prueban y qué ejecutan en cuanto entran."
pubDate: "2026-09-18"
tipo: "blog"
author: "s"
tags:
  - honeypot
  - ssh
draft: false
---

La idea era simple: levantar un honeypot SSH en un VPS recién creado, no anunciarlo en ningún sitio y esperar. Sin dominio apuntando, sin aparecer en ningún buscador. Solo una IP pública con el puerto 22 abierto.

El primer intento de acceso llegó a los once minutos.

## El montaje

```
$ git clone https://github.com/cowrie/cowrie
$ cd cowrie && python3 -m venv cowrie-env
$ source cowrie-env/bin/activate && pip install -r requirements.txt
# redirigir el 22 real al 2222 del honeypot
$ sudo iptables -t nat -A PREROUTING -p tcp --dport 22 -j REDIRECT --to-port 2222
```

> El SSH de verdad se mueve **antes** de tocar iptables. Si lo haces al revés te quedas fuera de tu propio servidor, que es exactamente lo que pasó la primera vez.

## Qué llegó

En veintiún días se registraron algo más de 41.000 intentos de autenticación desde 1.900 direcciones distintas: unas pocas IP muy insistentes y una cola larguísima de direcciones que prueban una vez y desaparecen.

Las combinaciones más repetidas, ordenadas por frecuencia:

```
6841 root:123456
3120 admin:admin
2887 root:root
1994 root:password
1655 admin:1234
1402 ubuntu:ubuntu
1190 pi:raspberry
 977 oracle:oracle
```

## Qué me llevo

Cualquier máquina con el 22 abierto recibe este tráfico desde el primer minuto, sin que nadie la haya buscado. La conclusión práctica es aburrida y sigue siendo verdad: cambiar el puerto no es una medida de seguridad, pero desactivar la autenticación por contraseña elimina de golpe esos 41.000 intentos.
