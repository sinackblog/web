---
title: "alta-disponibilidad"
grupo: "fortinet"
description: "clúster activo-pasivo, puertos y monitorización"
draft: false
---

Configuración de referencia para un clúster FortiGate en modo activo-pasivo: puertos de heartbeat dedicados, sincronización de sesión y qué monitorizar para detectar un failover silencioso.

## Puertos de heartbeat

Se recomiendan dos interfaces dedicadas, en VLAN distinta a la del tráfico de datos, para evitar que la congestión de tráfico normal retrase la detección de caída del nodo activo.

## Monitorización

El evento de failover queda en el log del sistema, pero conviene además una comprobación externa periódica que confirme cuál de los dos nodos responde como activo.
