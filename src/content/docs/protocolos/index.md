---
title: "protocolos"
grupo: "ot"
description: "Modbus, S7comm y DNP3: qué mirar en cada uno"
draft: false
---

Resumen de referencia rápida de los tres protocolos industriales más habituales en los laboratorios de sinack: qué mirar en cada uno a la hora de detectar tráfico anómalo.

## Modbus

Sin autenticación ni cifrado. Cualquier escritura hacia una dirección de registro fuera del rango esperado merece revisión.

## S7comm

Propietario de Siemens. Las funciones de lectura/escritura de bloques de datos son las que más conviene vigilar.

## DNP3

Habitual en distribución eléctrica. Tiene un modo seguro (DNP3 Secure Authentication) que en la práctica casi nunca está activado.
