---
title: 'VLAN y trunk: configuración base'
grupo: Redes
description: >-
  Ficha de referencia para crear VLAN, asignar puertos de acceso y levantar un
  trunk en un switch gestionable, con los errores habituales.
draft: false
---
**Para qué**

Separar dominios de difusión y preparar el terreno para aplicar políticas entre zonas.

**Pasos**

1. Crear la VLAN y ponerle nombre descriptivo. El nombre se consulta más de lo que parece.
1. Asignar los puertos de acceso a su VLAN.
1. Configurar el trunk hacia el siguiente switch o hacia el cortafuegos, permitiendo solo las VLAN que tienen que pasar.
1. Definir la VLAN nativa y que coincida en los dos extremos.
1. Guardar la configuración.

**Errores habituales**

- **Permitir todas las VLAN en el trunk.** Funciona, y por eso se queda así. Limita la lista desde el principio.
- **VLAN nativa distinta en cada extremo.** El enlace parece funcionar y algunas cosas no pasan, que es el peor escenario para diagnosticar.
- **Dejar la VLAN 1 en uso.** Muévete a otra y deja la 1 sin puertos.
- **No guardar.** El día que se reinicie el switch te acordarás.

**Comprobación**

Ver el estado del trunk y las VLAN permitidas, y hacer una prueba de conectividad desde cada VLAN hacia donde debe y hacia donde no debe llegar. Las dos pruebas, no solo la primera.
