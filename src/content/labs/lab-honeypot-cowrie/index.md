---
title: Montar un honeypot SSH con Cowrie sobre Ubuntu
description: >-
  Cómo levantar un señuelo SSH que escucha en el 22 sin exponer el servicio
  real, para registrar quién y cómo intenta entrar.
pubDate: 2026-09-24
author: s
tags:
  - Labs,honeypot,ssh
estado: terminado
stack: []
draft: false
---
# Honeypot SSH: Captura de Conexiones y ataques

Arrancamos nuestra maquina y ejecutamos lo siguiente

`sudo apt update && sudo apt upgrade -y`

para mantener lo mas actualizado nuestro Ubuntu

Antes que nada necesitaremos instalar nuestro servidor ssh con el comando

`apt install openssh-server -y`

## Vamos a proceder a cambiar el puerto SSH administrativo

Para que nuestro Honeypot pueda escuchar en el puerto SSH que es el 22, tenemos que mover el servicio SSH de la maquina a un puerto alternativo, en mi caso al 2222. Para ello ejecutamos lo siguiente

- `sudo nano /etc/ssh/sshd_config` y nos saldra algo tal que asi

  ![](./content/lab-honeypot-cowrie/image.png)

- Como podéis ver la linea del puerto esta comentada, quitamos el # y ponemos el numero que queramos

![](./content/lab-honeypot-cowrie/image.png)

- Guardamos con ctrl + O y reiniciamos el proceso con `systemctl restart ssh`

## Verificación desde putty

Probamos a hacer una conexión SSH y si nos funciona es que todo esta instalado correctamente

![](./content/lab-honeypot-cowrie/image.png)

## Preparar Cowrie

1. Podemos continuar, vamos a preparar Cowrie, para ello necesitamos crear el usuario del HoneyPot con el comando

`sudo adduser --disabled-password cowrie`

le damos ENTER a todo lo que nos aparezca

![](./content/lab-honeypot-cowrie/image.png)

1. Instalar dependencias

copiar y pegar este comando dentro de la maquina

`sudo apt update && sudo apt install git python3-virtualenv libssl-dev libffi-dev build-essential libpython3-dev python3-minimal authbind virtualenv python3-venv -y`

Instalar varias dependencias por lo que puede tardar un poco, no os asustéis veréis algo tal que así

![](./content/lab-honeypot-cowrie/image.png)

1. Clonar Cowrie

Ahora si que si, si todo esta bien vamos a clonar cowrie, primero entramos con el usuario que hemos creado previamente

`sudo su - cowrie`

y clonamos

`git clone <http://github.com/cowrie/cowrie> cd cowrie`

Aseguraros de ver algo tal que asi

![](./content/lab-honeypot-cowrie/image.png)

y para confirmar realizamos un ls

![](./content/lab-honeypot-cowrie/image.png)

Con esto ya tendremos un paso muy importante bien controlado

## Configuración del entorno virtual con Python

1. Creamos el entorno

`python3 -m venv cowrie-env`

1. Lo activamos

`source cowrie-env/bin/activate`

- Para confirmar que esta activado nos tiene que salir algo tal que asi

![](./content/lab-honeypot-cowrie/image.png)

1. Actualizamos el gestor de paquetes: `pip install --upgrade pip`

1. Instalamos librerías internas

   ```
   pip install --upgrade pip
   pip install -r requirements.txt
   
   ```

   ![](./content/lab-honeypot-cowrie/image.png)

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

![](./content/lab-honeypot-cowrie/image.png)

- Modificamos donde sale el hostname y lo hacemos ver como un servidor de base de datos

en el mismo fichero nos vamos al apartado de SSH y en esta linea modificamos el puerto tambien, para aislar nuestro puerto 22 , y que el atacante entre por el 2223

![](./content/lab-honeypot-cowrie/image.png)

y añadimos esto

![](./content/lab-honeypot-cowrie/image.png)

1. Arrancamos cowrie con el comando

`bin/cowrie start`

![](./content/lab-honeypot-cowrie/image.png)

- Ejecutamos lo siguiente para poner el foco de atención en nuestra trampa

`tail -f var/log/cowrie/cowrie.log`

- explicación
  - `tail`: Sirve para ver el final de un archivo.
  - `f`: Significa "follow" Hace que la pantalla se quede abierta y se actualice **automáticamente** cada vez que entre alguien o tú mismo hagas una prueba.
  - `var/log/cowrie/cowrie.log`: Es la ruta donde Cowrie escribe todo lo que pasa.

con este comando activamos la trampa !!

![](./content/lab-honeypot-cowrie/image.png)

## Comienza la trampa:

Aquí empieza la accion

con el tail escuchando haga lo que haga al intentar conectarme por ssh me lo notifica

![](./content/lab-honeypot-cowrie/image.png)

aquí podéis ver como he intentado acceder como varios usuarios

![](./content/lab-honeypot-cowrie/image.png)

con otra conexion en putty te muestra tambien que hay un usuario intentando hacer ssh

![](./content/lab-honeypot-cowrie/image.png)

claramente no nos deja iniciar sesión aunque conozcan la contraseña porque al redirigir el puerto detecta como access denied y como intente unos segundos la propia conexión lo rechazara

![](./content/lab-honeypot-cowrie/image.png)

# Conclusión Final

"Tras las pruebas realizadas, se confirma que el Honeypot Cowrie intercepta correctamente las conexiones entrantes por el puerto 22 (redirigidas internamente al 2223). El sistema registra con éxito los intentos de acceso por fuerza bruta, almacenando metadatos del atacante como la dirección IP, la versión del cliente SSH y las credenciales probadas. Se ha optado por una configuración de denegación por defecto para maximizar la recolección de diccionarios de ataque y garantizar la integridad del sistema anfitrión.”

![](./content/lab-honeypot-cowrie/image.png)

## Si te ha resultado útil este laboratorio o quieres intercambiar ideas sobre ciberseguridad y operaciones SOC, no dudes en seguirme o contactarme:

### **LinkedIn:** [https://www.linkedin.com/in/sergio-garcia-roldan-8677a9339/](https://www.linkedin.com/in/sergio-garcia-roldan-8677a9339/)

### **GitHub:** [https://github.com/uSearchg](https://github.com/uSearchg)
