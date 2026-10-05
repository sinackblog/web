---
title: 'OSPF: Configuracion base'
grupo: Redes
description: >-
  Ficha de referencia para levantar OSPF en un area 0, activar el proceso,
  anunciar redes ajustar la métrica y los errores
draft: false
---
## Para qué

Enrutamiento dinámico dentro de un dominio: los routers aprenden solos las rutas y reaccionan a los cambios de topología, sin mantener rutas estáticas a mano. Esta ficha cubre el caso más común, una sola área (la 0, backbone).

## Pasos

1. **Activar el proceso OSPF.** `router ospf <id-proceso>`

1. **Anunciar las redes** con su wildcard y el área: `network <red> <wildcard> area 0`. La wildcard es la inversa de la máscara: para una /24 (255.255.255.0) la wildcard es 0.0.0.255.

1. **Fijar el router-id** de forma explícita: `router-id <x.x.x.x>`. Si no lo pones, OSPF lo elige solo y puede cambiar en un reinicio, lo que te desmonta las adyacencias.

1. **Marcar como pasivas las interfaces** donde hay equipos finales: `passive-interface <interfaz>`. Evita enviar saludos OSPF donde no hace falta y cierra una vía de exposición.

1. **Guardar** la configuración.

## Errores habituales

- **Wildcard mal calculada.** Es el fallo número uno. Si pones la máscara normal en vez de la inversa, la red no se anuncia y no entiendes por qué. Para /24 → 0.0.0.255, para /30 → 0.0.0.3.
- **Áreas que no coinciden.** Dos routers en el mismo enlace tienen que estar en la misma área o nunca formarán adyacencia.
- **MTU distinta en los dos extremos.** La adyacencia se queda atascada en el estado EXSTART/EXCHANGE y no pasa de ahí. Es un clásico que cuesta diagnosticar.
- **Temporizadores hello/dead distintos.** Si no cuadran entre vecinos, no se ven.
- **Olvidar el router-id fijo.** Funciona hasta que reinicias y de repente las adyacencias bailan.

## Comprobación

- `show ip ospf neighbor` — los vecinos deben aparecer en estado FULL. Si están en INIT, EXSTART o 2WAY atascado, hay algo mal (mira MTU y temporizadores).
- `show ip route ospf` — las rutas aprendidas por OSPF salen marcadas con O.
- `show ip ospf interface brief` — confirma en qué interfaces está activo y en cuáles es pasivo.

## Nota de seguridad

En un entorno real, autentica las adyacencias OSPF (con MD5 o, mejor, SHA). Sin autenticación, cualquiera que se conecte a un segmento con OSPF activo puede inyectar rutas falsas y desviar tráfico. Y repasa que las interfaces hacia equipos finales estén como pasivas: no hay motivo para anunciar OSPF donde no hay otro router escuchando.
