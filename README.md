# Drive backend

Este proyecto es un backend para un sistema de almacenamiento de archivos en la nube. Se ha desarrollado con Node.js y Express.js.

## Instalación

Para instalar las dependencias del proyecto, ejecuta el siguiente comando:

```bash
npm install
```

## Configuración

Para configurar el proyecto, crea un archivo `.env` en la raíz del proyecto con el siguiente contenido,
las claves han sido obtenidas de una base de datos creada en turso:

```env
URL_DATABASE=
DB_AUTH_TOKEN=
JWT_PASSWORD=
AWS_ACCESS_KEY=
AWS_SECRET_ACCESS_KEY=
AWS_BUCKET_REGION=
AWS_BUCKET_NAME=
```

Nota en el caso de estar en desarrollo el archivo de desarrollo es `.env.development`

## Ejecucion modo desarrollo

Para ejecutar el proyecto en modo desarrollo, ejecuta el siguiente comando:

```bash
npm run dev
```

## Hacer el build

Para hacer el build del proyecto, ejecuta el siguiente comando:

```bash
npm run build
```

## Ejecución del build

Para ejecutar el proyecto, ejecuta el siguiente comando:

```bash
npm run start
```

## Ejecución de los tests

Para ejecutar los tests del proyecto, ejecuta el siguiente comando:

```bash
npm run test
```
