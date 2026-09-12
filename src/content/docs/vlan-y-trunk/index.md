---
title: "vlan-y-trunk"
grupo: "redes"
description: "configuración base en switch gestionable"
draft: false
---

Configuración base de VLAN y puertos trunk en un switch gestionable genérico: creación de VLAN, asignación de puertos de acceso y trunk con VLAN nativa explícita.

## VLAN nativa

Dejar la VLAN nativa por defecto (normalmente la 1) en un puerto trunk es una fuente habitual de fugas de tráfico entre VLAN. Se recomienda fijarla explícitamente a una VLAN sin uso.
