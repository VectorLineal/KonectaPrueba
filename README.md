# KonectaPrueba
Prueba técnica para Konecta

## Requisitos de Instalación
- Docker.

## Pasos de instalación y ejecución
- Activar Docker.
- En el root del proyecto ejecutar `docker compose --env-file .env up --build`.

### Consideraciones
- Este proyecto fue creado para usarse en localhost por lo tanto, la aplicación debería desplegarse en `localhost:3000`.
- El superusuario creado en la base de datos tiene usuario: superuser y clave: superuser. Dicho usuario es el único administrador creado, por defecto todo usuario creado tendrá rol de empleado, solo un administrador puede cambiar dichos roles.
## Prácticas
- Se siguió una arquitectura MVC.
- Se aplicaron los principios de SOLID y varios patrones de programación.

## Seguridad
- Se cuenta con una autenticación por JWT.
- Las contraseñas no son almacenadas, en su lugar se guarda un hash de las mismas.
- Se cuenta con 2 tipos de permisos, usuario y administrador, que tienen cierto rango y dependiendo de eso la aplicación permite ciertas operaciones para cada rango.
