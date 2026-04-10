# Ritmo y Fuerza Studio

Sitio web en Next.js con blog público, panel administrativo y backend completo sobre Supabase.

## Stack

- Next.js 15 App Router
- React 19
- Tailwind CSS 4
- Supabase Auth
- Supabase Postgres
- Supabase Storage
- Tiptap para edición de publicaciones

## Requisitos del servidor y entorno

- Node.js 22.x
- npm 10.x
- proyecto activo de Supabase
- acceso a `SQL Editor`, `Authentication` y `Storage` en Supabase

Si usas `nvm`:

```bash
nvm use
```

Verifica versiones:

```bash
node -v
npm -v
```

## Instalación del proyecto

1. Clona el repositorio.
2. Entra al directorio del proyecto.
3. Instala dependencias.

```bash
npm install
```

## Configuración de Supabase

### 1. Crear el proyecto

1. Ve a [Supabase Dashboard](https://supabase.com/dashboard).
2. Crea un proyecto nuevo.
3. Espera a que termine de provisionarse.

### 2. Obtener las claves

Dentro de tu proyecto:

1. Ve a `Settings`.
2. Abre `API Keys`.
3. Copia:
   - `Project URL`
   - `Publishable key`
   - `Secret key`

Debes mapearlas así:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxxxxxx
SUPABASE_SECRET_KEY=sb_secret_xxxxxxxxx
```

Notas:

- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` es la clave pública para frontend y SSR autenticado.
- `SUPABASE_SECRET_KEY` es solo para backend y scripts administrativos.
- No uses la `publishable key` como `SUPABASE_SECRET_KEY`.

### 3. Configurar Authentication

En Supabase:

1. Ve a `Authentication`.
2. Desactiva registro público si no está desactivado.
3. Habilita recuperación de contraseña por email.

### 4. Configurar variables de entorno

Crea `.env.local` o completa `.env` con:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=5210000000000
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxxxxxx
SUPABASE_SECRET_KEY=sb_secret_xxxxxxxxx
SEED_ADMIN_NAME=Administrador
SEED_ADMIN_EMAIL=admin@ritmoyfuerza.com
SEED_ADMIN_PASSWORD=Admin12345
```

## Migraciones de base de datos

1. Abre tu proyecto en Supabase.
2. Ve a `SQL Editor`.
3. Ejecuta completo el archivo [supabase/migrations.sql](/Users/hectorlealvillavicencio/Documents/Proyectos/ritmobaile/supabase/migrations.sql).

Ese archivo crea:

- `profiles`
- `free_class_requests`
- `categories`
- `posts`
- `post_categories`
- bucket `blog-media`
- vista `published_posts_view`
- triggers de perfil y timestamps
- políticas RLS

Si ya ejecutaste migraciones previas y cambió el esquema, vuelve a correr el archivo completo.

## Seed del admin inicial

El proyecto incluye un seed para crear o actualizar el primer admin.

Variables requeridas:

```env
SEED_ADMIN_NAME=Administrador
SEED_ADMIN_EMAIL=admin@ritmoyfuerza.com
SEED_ADMIN_PASSWORD=Admin12345
```

Ejecuta:

```bash
npm run seed:admin
```

Ese comando:

- crea el usuario en `auth.users` si no existe
- actualiza su contraseña y metadata si ya existe
- crea o actualiza el registro en `public.profiles`
- deja el rol como `admin`
- deja `is_active = true`

Si falla con `This endpoint requires a valid Bearer token`, revisa que:

- `SUPABASE_SECRET_KEY` exista
- la key empiece con `sb_secret_`
- no hayas puesto ahí la `publishable key`

## Ejecución local

Levanta el entorno de desarrollo:

```bash
npm run dev
```

El sitio quedará normalmente en:

```text
http://localhost:3000
```

## Build de producción

Para validar producción localmente:

```bash
npm run build
npm start
```

## Rutas principales

### Sitio público

- `/`
- `/blog`
- `/blog/[slug]`
- `/ensenanza`
- `/costos`
- `/contacto`

### Panel administrativo

- `/admin/login`
- `/admin`
- `/admin/categories`
- `/admin/posts`
- `/admin/posts/new`
- `/admin/posts/edit/[slug]`
- `/admin/users`

## Inicio de sesión y usuarios

### Login

El acceso al panel se hace en:

```text
/admin/login
```

Si ya existe una sesión activa válida, esa ruta redirige automáticamente a:

```text
/admin
```

### Logout

El cierre de sesión se hace por `fetch` hacia el endpoint interno y luego redirige al login. La ruta técnica no debe quedar visible en la barra.

### Crear usuarios manualmente en Supabase

También puedes crear un usuario manualmente desde:

1. `Authentication`
2. `Users`
3. `Create user`

Luego puedes promoverlo a admin con SQL:

```sql
update public.profiles
set role = 'admin'
where email = 'tu-email@dominio.com';
```

O dejarlo como editor:

```sql
update public.profiles
set role = 'editor'
where email = 'editor@dominio.com';
```

## Blog y editor

- `/blog` funciona como archive con filtros y búsqueda.
- cada publicación pública vive en `/blog/[slug]`
- el panel permite CRUD completo de categorías y publicaciones
- el editor guarda:
  - JSON estructurado para re-edición
  - HTML final para render público
- las imágenes del contenido usan preview temporal y se suben a Supabase Storage al guardar
- la imagen destacada muestra preview local antes de subir

## Storage

El bucket esperado es:

```text
blog-media
```

Las políticas de storage vienen incluidas en [supabase/migrations.sql](/Users/hectorlealvillavicencio/Documents/Proyectos/ritmobaile/supabase/migrations.sql).

## Solución de problemas comunes

### `column posts.content_html does not exist`

Tu base no tiene el esquema actualizado. Reejecuta [supabase/migrations.sql](/Users/hectorlealvillavicencio/Documents/Proyectos/ritmobaile/supabase/migrations.sql).

### `cannot change name of view column`

Debes eliminar y recrear la vista `published_posts_view`. El archivo de migraciones actual ya lo hace correctamente.

### `Invalid Version` en `npm install`

Usa Node 22 y npm 10. Si el árbol local quedó corrupto, elimina `node_modules` y `package-lock.json` y reinstala.

### conflicto de `/favicon.ico`

El proyecto usa `app/favicon.ico`. No debes tener también `public/favicon.ico`.

## Archivos importantes

- [README.md](/Users/hectorlealvillavicencio/Documents/Proyectos/ritmobaile/README.md)
- [supabase/README.md](/Users/hectorlealvillavicencio/Documents/Proyectos/ritmobaile/supabase/README.md)
- [supabase/migrations.sql](/Users/hectorlealvillavicencio/Documents/Proyectos/ritmobaile/supabase/migrations.sql)
- [scripts/seed-admin.mjs](/Users/hectorlealvillavicencio/Documents/Proyectos/ritmobaile/scripts/seed-admin.mjs)
- [components/admin/PostEditor.tsx](/Users/hectorlealvillavicencio/Documents/Proyectos/ritmobaile/components/admin/PostEditor.tsx)

## Notas finales

- El proyecto ya no usa Prisma ni MySQL.
- Toda la persistencia, auth, storage y gestión de usuarios corre sobre Supabase.
- La documentación específica de Supabase también está en [supabase/README.md](/Users/hectorlealvillavicencio/Documents/Proyectos/ritmobaile/supabase/README.md).
