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

## Aplicar cambios del esquema a la base de datos

Se pueden generar los cambios de la base de datos con el comando:

```bash
npx drizzle-kit generate:sqlite
```

Se pueden pushear los cambios directamente los cambios a la base de datos con el comando:

```bash
npx drizzle-kit push:sqlite
```

## Migrar a la base de datos de producción

Para migrar la base de datos a producción, ejecuta el siguiente comando:

```bash
npm run drizzle:migrate:prod
```

## Migrar a la base de datos de desarrollo

Para migrar la base de datos a desarrollo, ejecuta el siguiente comando:

```bash
npm run drizzle:migrate:dev
```

## Poblar la base de datos

Para poblar la base de datos, ejecuta el siguiente comando:

```bash
npm run drizzle:populatedb:dev
```

## Poblar la base de datos en producción

Para poblar la base de datos en producción, ejecuta el siguiente comando:

```bash
npm run drizzle:populatedb:prod
```

## Ejecución modo desarrollo

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
