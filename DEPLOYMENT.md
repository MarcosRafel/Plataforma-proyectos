# Despliegue

## Antes de publicar

La captura compartida muestra la contraseña de Aiven. Rótala desde Aiven antes
de conectar la base de datos y usa únicamente la nueva contraseña en Render.
Descarga también el certificado CA del servicio Aiven; la conexión de
producción valida el certificado y no acepta TLS sin verificar.

El servicio mostrado usa MySQL en `defaultdb`. Importa el esquema de
`Backend/database/gestion_proyectos.sql` en esa base existente. Si Aiven no
permite crear otra base, omite las instrucciones `CREATE DATABASE` y `USE
gestion_proyectos` del inicio del SQL antes de importarlo.

## Render (backend)

1. En el servicio existente `https://plataforma-proyectos-lv32.onrender.com`,
   configura `Backend` como Root Directory, `npm install` como Build Command y
   `npm start` como Start Command. No crees otro servicio.
2. Completa las variables de entorno del servicio:
   - `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD` y `DB_NAME`: datos de Aiven.
   - `DB_SSL_CA`: contenido del certificado CA de Aiven.
   - `FRONTEND_URL`: `https://plataforma-proyectos-eight.vercel.app`.
   - `EMAIL_USER` y `EMAIL_PASS`: cuenta Gmail y su contraseña de aplicación.
3. Configura `SESSION_SECRET` con un valor largo y aleatorio.

## Vercel (frontend)

1. Importa el repositorio en Vercel y configura `Frontend` como Root Directory.
2. Usa `npm run build` como Build Command y `dist` como Output Directory.
3. `Frontend/vercel.json` reenvía las peticiones `/api` a
   `https://plataforma-proyectos-lv32.onrender.com`.
4. Configura `FRONTEND_URL` como
   `https://plataforma-proyectos-eight.vercel.app` en el servicio de Render y
   reinícialo para que CORS y los enlaces de recuperación usen el dominio correcto.

El proxy de Vercel permite que el navegador se comunique con la API bajo el
mismo origen, lo que evita depender de cookies de terceros para iniciar sesión.
