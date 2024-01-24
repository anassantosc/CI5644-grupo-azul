# Proyecto CI5644 equipo azul

Este proyecto es una aplicación desarrollada por el Equipo Azul utilizando Spring Boot (Kotlin) para el backend y Next.js (TypeScript) para el frontend. La aplicación se ejecuta mediante Docker Compose y cuenta con scripts específicos para configurar y reiniciar el entorno de desarrollo.

## Scripts de Gestión

### Reiniciar la Aplicación
Para reiniciar la aplicación sin borrar la base de datos, ejecute:
```
./run-reset-back.sh
```
Este script detendrá y eliminará los contenedores existentes, construirá nuevamente la aplicación.


### Eliminar Todo (Incluida la Base de Datos)

En casos donde se desee eliminar todo, incluida la base de datos, ejecute:
```
./run-nuke.sh
```
Este script detendrá y eliminará todos los contenedores y volúmenes, proporcionando un reinicio completo del entorno, para luego buildear los tres containers de nuevo.