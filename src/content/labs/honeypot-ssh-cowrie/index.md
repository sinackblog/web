---
title: Honeypot-SSH-Cowrie
description: >-
  Montaje de un honeypot SSH con Cowrie sobre Ubuntu: mover el SSH real,
  redirigir el puerto 22 a la trampa y registrar los intentos de acceso.
pubDate: 2026-09-27
author: s
tags:
  - SSH
  - Cowrie
  - Ciber
estado: terminado
stack: []
draft: false
---
# Honeypot SSH: Captura de Conexiones y ataques

Descargar Ubuntu Server : [https://ubuntu.com/download/server](https://ubuntu.com/download/server)

En este proyecto vamos a desplegar **Cowrie**, un Honeypot de media-alta interacción diseñado para simular un servidor SSH y Telnet. El objetivo es exponer este servicio "vulnerable" a internet para atraer y analizar el comportamiento de atacantes y bots.

A diferencia de un servidor real, Cowrie funciona como un entorno controlado que registrará:

- **Credenciales:** Diccionario de nombres de usuario y contraseñas utilizados en los intentos de intrusión.
- **Sesiones:** Grabación íntegra de la actividad del atacante en la terminal falsa (logs de tty).
- **Captura de Malware:** Intercepción de cualquier archivo o script que el atacante intente descargar para su posterior análisis.

### **-Requisitos del Laboratorio**

- **Máquina Víctima:** Instancia de **Ubuntu Server**.
- **Red:** Conexión a internet con capacidad de redireccionamiento de puertos (Port Forwarding).
- **Herramientas:** Python 3, entorno virtual (`venv`), Git y librerías de dependencias.

### **(Importante) Medidas de Seguridad**

La VM se encuentra en una red segmentada para evitar movimientos laterales hacia la red real. El Honeypot lo realizaremos bajo un usuario dedicado sin permisos de `sudo`. Muy importante tambien que el servicio de administración real de la máquina se haya desplazado a un puerto no estándar para evitar conflictos y ataques directos. Esto os lo explicare mas adelante

Arrancamos nuestra maquina y ejecutamos lo siguiente

`sudo apt update && sudo apt upgrade -y`

para mantener lo mas actualizado nuestro Ubuntu

Antes que nada necesitaremos instalar nuestro servidor ssh con el comando

`apt install openssh-server -y`

## Vamos a proceder a cambiar el puerto SSH administrativo

Para que nuestro Honeypot pueda escuchar en el puerto SSH que es el 22, tenemos que mover el servicio SSH de la maquina a un puerto alternativo, en mi caso al 2222. Para ello ejecutamos lo siguiente

- `sudo nano /etc/ssh/sshd_config` y nos saldra algo tal que asi

![](muk7oonp-759xxk8r.png)

- Como podéis ver la linea del puerto esta comentada, quitamos el # y ponemos el numero que queramos

![](muk7ov93-iky7o3s5.png)

- Guardamos con ctrl + O y reiniciamos el proceso con `systemctl restart ssh`

## Verificación desde putty

Probamos a hacer una conexión SSH y si nos funciona es que todo esta instalado correctamente

![](muk7pby4-zt0xkrgv.png)

## Preparar Cowrie

1. Podemos continuar, vamos a preparar Cowrie, para ello necesitamos crear el usuario del HoneyPot con el comando

`sudo adduser --disabled-password cowrie`

le damos ENTER a todo lo que nos aparezca

![](muk7pg4u-95aymw2q.png)

1. Instalar dependencias

copiar y pegar este comando dentro de la maquina

`sudo apt update && sudo apt install git python3-virtualenv libssl-dev libffi-dev build-essential libpython3-dev python3-minimal authbind virtualenv python3-venv -y`

Instalar varias dependencias por lo que puede tardar un poco, no os asustéis veréis algo tal que así

![](muk7pjk4-v47rrive.png)

1. Clonar Cowrie

Ahora si que si, si todo esta bien vamos a clonar cowrie, primero entramos con el usuario que hemos creado previamente

`sudo su - cowrie`

y clonamos

`git clone <http://github.com/cowrie/cowrie> cd cowrie`

Aseguraros de ver algo tal que asi

![](muk7pndo-6g7gfcmr.png)

y para confirmar realizamos un ls

![](muk7ppk4-vf21z4e4.png)

Con esto ya tendremos un paso muy importante bien controlado

## Configuración del entorno virtual con Python

1. Creamos el entorno

`python3 -m venv cowrie-env`

1. Lo activamos

`source cowrie-env/bin/activate`

- Para confirmar que esta activado nos tiene que salir algo tal que asi

![](muk7pt58-ol6xrcp8.png)

1. Actualizamos el gestor de paquetes: `pip install --upgrade pip`

1. Instalamos librerías internas

   ```
   pip install --upgrade pip
   pip install -r requirements.txt
   
   ```

   ![](muk7q4vu-xj6kk54q.png)

1. Registramos Cowrie en el entorno (PASO CRÍTICO): Este paso es fundamental para que el sistema reconozca los módulos internos de Cowrie. Sin esto, el comando de arranque fallará.

   `pip install -e .`

1. Redireccionamos el trafico con iptables

Como Cowrie no debe ejecutarse como root por seguridad, no puede escuchar directamente en el puerto 22.

```
sudo iptables -t nat -A PREROUTING -p tcp --dport 22 -j REDIRECT --to-port 2223

```

1. Personalizar el Nombre falso del servidor

- Vamos a modificar el nombre para que el servidor parezca real para el atacante

`cp etc/cowrie.cfg.dist etc/cowrie.cfg`

`nano etc/cowrie.cfg`

- Nos aparecerá algo asi

![](muk7q9b6-w9h2053k.png)

- Modificamos donde sale el hostname y lo hacemos ver como un servidor de base de datos

  ![](muk7qdzg-wcpys25w.png)

en el mismo fichero nos vamos al apartado de SSH y en esta linea modificamos el puerto tambien, para aislar nuestro puerto 22 , y que el atacante entre por el 2223

![](muk7qio3-qajv0lsf.png)

y añadimos esto

![](muk7qmz8-rvvo498p.png)

1. Arrancamos cowrie con el comando

`bin/cowrie start`

![](muk7qqvv-im2vyto9.png)

- Ejecutamos lo siguiente para poner el foco de atención en nuestra trampa

`tail -f var/log/cowrie/cowrie.log`

- explicación
  - `tail`: Sirve para ver el final de un archivo.
  - `f`: Significa "follow" Hace que la pantalla se quede abierta y se actualice **automáticamente** cada vez que entre alguien o tú mismo hagas una prueba.
  - `var/log/cowrie/cowrie.log`: Es la ruta donde Cowrie escribe todo lo que pasa.

con este comando activamos la trampa !!

![](muk7qupa-7lp7pv6n.png)

## Comienza la trampa:

Aquí empieza la accion

con el tail escuchando haga lo que haga al intentar conectarme por ssh me lo notifica

![](muk7qyvp-3whogrsv.png)

aquí podéis ver como he intentado acceder como varios usuarios

![](muk7r1eg-ps41nlpv.png)

con otra conexion en putty te muestra tambien que hay un usuario intentando hacer ssh

![](muk7r5j9-56ug8gpr.png)

claramente no nos deja iniciar sesión aunque conozcan la contraseña porque al redirigir el puerto detecta como access denied y como intente unos segundos la propia conexión lo rechazara

![](muk7r8it-co1u9ygj.png)

# Conclusión Final

"Tras las pruebas realizadas, se confirma que el Honeypot Cowrie intercepta correctamente las conexiones entrantes por el puerto 22 (redirigidas internamente al 2223). El sistema registra con éxito los intentos de acceso por fuerza bruta, almacenando metadatos del atacante como la dirección IP, la versión del cliente SSH y las credenciales probadas. Se ha optado por una configuración de denegación por defecto para maximizar la recolección de diccionarios de ataque y garantizar la integridad del sistema anfitrión.”

![](muk7reml-akugdne8.png)
