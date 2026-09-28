---
title: Zero-Trust aplicado en practica
description: >-
  Aplicando de manera simplificada y resumida la importancia del Zero-Trust en
  nuestros servicios
pubDate: 2026-09-28
author: s
tags: []
estado: terminado
stack: []
draft: false
---
> "Algo tan simple puede proteger tu servidor real sin VPN"\
Ubuntu Desktop 24.04 VM Oracle VirtualBox

---

### Resumen técnico

En este proyecto se implementa un entorno Zero Trust real sobre un Ubuntu Desktop. Es algo simple, pero sirve para entender la importancia de las reglas Zero Trust. Aquí encontraréis toda la metodología y herramientas utilizadas, el por qué y cómo se han hecho las cosas. Aparte os dejo un vídeo donde podréis verlo implementado paso a paso.

---

### 1. Introducción y contexto

Las arquitecturas de red tradicionales se basan en un modelo de confianza implícita: todo lo que está dentro del perímetro de red se considera seguro. Este enfoque presenta vulnerabilidades críticas en el contexto actual, donde el trabajo remoto, los entornos híbridos y los ataques sofisticados son habituales.

El modelo Zero Trust surge como respuesta a estas limitaciones. Su principio fundamental es:

> «Nunca confíes, siempre verifica»

En este proyecto se implementa un entorno Zero Trust funcional sobre una máquina virtual Ubuntu Desktop, utilizando únicamente herramientas gratuitas y nativas del sistema.

---

### 2. Objetivos del proyecto

### Objetivo principal

Implementar un entorno Zero Trust real y funcional en Ubuntu Desktop que demuestre los tres pilares fundamentales del modelo mediante herramientas de código abierto.

### Objetivos específicos

- Configurar un servidor web Nginx con autenticación obligatoria para todo acceso
- Implementar un firewall UFW con política de denegación por defecto
- Demostrar el contraste entre un sistema sin protección y uno con Zero Trust aplicado
- Verificar el funcionamiento desde un dispositivo externo (smartphone)
- Documentar el proceso completo de forma reproducible

---

### 3. Marco teórico: Zero Trust

### ¿Qué es Zero Trust?

Zero Trust es un modelo de seguridad informática desarrollado por John Kindervag en 2010 mientras trabajaba en Forrester Research. A diferencia del modelo perimetral tradicional, Zero Trust asume que ninguna entidad — sea un usuario, dispositivo o proceso — es de confianza por defecto, independientemente de su ubicación en la red.

### Los 3 pilares

{% table %}
- Pilar
- Principio
- Implementación en este proyecto
---
- 01
- Verificar Siempre
- Nginx requiere autenticación con usuario y contraseña en cada acceso
---
- 02
- Mínimo Privilegio
- UFW bloquea todo el tráfico por defecto. Solo se permiten las conexiones necesarias
---
- 03
- Asumir la Brecha
- El sistema está diseñado asumiendo que un atacante puede estar en la red. Cada capa añade protección independiente
{% /table %}

---

### 4. Entorno y herramientas utilizadas

### Infraestructura

{% table %}
- Componente
- Descripción
---
- Sistema operativo
- Ubuntu Desktop 24.04 LTS
---
- Virtualización
- Oracle VirtualBox (adaptador puente / Bridge)
---
- Servidor web
- Nginx 1.24
---
- Firewall
- UFW (Uncomplicated Firewall)
---
- Gestión de usuarios
- apache2-utils (htpasswd)
---
- Dispositivo externo
- Teléfono móvil en la misma red WiFi
---
- IP del servidor
- 10.201.3.33
{% /table %}

### Instalación de herramientas

bash

```
sudo apt update
sudo apt install nginx -y
sudo apt install ufw -y
sudo apt install apache2-utils -y

```

---

### 5. Implementación paso a paso

### Fase 1: Modelo tradicional (sin protección)

En primer lugar se configura el servidor en su estado inicial, sin ninguna medida de seguridad, para demostrar el modelo tradicional de confianza implícita.

bash

```
sudo systemctl start nginx
sudo systemctl status nginx

```

> **Problema identificado:** Cualquier usuario en la red puede acceder al servidor sin autenticarse. Si un atacante está en la misma red WiFi, tiene acceso total al servicio.

---

### Fase 2: Verificar Siempre — autenticación con Nginx

Creación del usuario autenticado:

bash

```
sudo htpasswd -c /etc/nginx/.htpasswd zerotrust_user

```

Configuración de Nginx para requerir autenticación:

bash

```
sudo nano /etc/nginx/sites-available/default

```

Añadir dentro del bloque `location /`:

nginx

```
location / {
    auth_basic "Acceso Restringido - Zero Trust";
    auth_basic_user_file /etc/nginx/.htpasswd;
    try_files $uri $uri/ =404;
}

```

Validar y recargar:

bash

```
sudo nginx -t
sudo systemctl reload nginx

```

> **Resultado:** Cualquier intento de acceso solicita usuario y contraseña. Sin credenciales válidas, error 401 Unauthorized.

---

### Fase 3: Mínimo Privilegio — UFW Firewall

bash

```
sudo ufw enable
sudo ufw default deny incoming

# Solo permitir acceso local inicialmente
sudo ufw allow from 127.0.0.1 to any port 80

# Para permitir acceso externo controlado
sudo ufw allow 80

# Verificar estado
sudo ufw status verbose

```

> **Resultado:** UFW bloquea todo el tráfico entrante por defecto. Solo entra el tráfico explícitamente autorizado.

---

### 6. Demostración y resultados

### Prueba desde dispositivo externo

Desde un smartphone conectado a la misma red WiFi se accede a `http://10.201.3.33`

{% table %}
- Escenario
- Resultado
---
- Sin UFW, sin autenticación
- Acceso libre desde cualquier dispositivo
---
- UFW activo, solo localhost
- Bloqueado. La página no carga
---
- UFW abierto + autenticación Nginx
- Pide usuario y contraseña
---
- Credenciales correctas
- Acceso concedido únicamente al usuario autorizado
{% /table %}

---

### Obstáculos encontrados

> **Obstáculo 1: Cloudflare Zero Trust requiere dominio propio**\
La implementación inicial contemplaba usar Cloudflare Zero Trust. Sin embargo, el proceso requiere asociar un dominio a la cuenta.\
**Solución:** implementar lo equivalente con Nginx + UFW, que demuestra los mismos principios Zero Trust sin dependencias externas.

> **Obstáculo 2: VM en red NAT no accesible desde smartphone**\
La máquina virtual estaba en modo NAT por defecto, lo que impide el acceso desde otros dispositivos.\
**Solución:** cambiar el adaptador en VirtualBox a modo Bridge. La VM obtiene una IP real en la red WiFi.

---

### 7. Conclusiones

Con herramientas nativas de Ubuntu y sin coste adicional, es posible implementar un entorno de seguridad que aplique los tres pilares fundamentales de Zero Trust.

- **Verificar Siempre:** Nginx garantiza que ningún acceso se produce sin credenciales válidas
- **Mínimo Privilegio:** UFW asegura que solo el tráfico autorizado llega al servidor
- **Asumir la Brecha:** el diseño en capas garantiza que, aunque una falle, la otra sigue protegiendo

> 💬 *"Nunca confíes, siempre verifica"*

---

### Referencias

- Documentación oficial Nginx: [https://nginx.org/en/docs/](https://nginx.org/en/docs/)
- Ubuntu UFW Guide: [https://help.ubuntu.com/community/UFW](https://help.ubuntu.com/community/UFW)
- NIST Zero Trust Architecture SP 800-207: [https://csrc.nist.gov/publications/detail/sp/800-207/final](https://csrc.nist.gov/publications/detail/sp/800-207/final)
- Verizon DBIR 2024: [https://www.verizon.com/business/resources/reports/dbir/](https://www.verizon.com/business/resources/reports/dbir/)
