# Supabase

Este directorio contiene la configuración operativa del backend Supabase del proyecto.

Para instalación completa de la app, comandos locales y rutas, consulta el [README principal](/Users/hectorlealvillavicencio/Documents/Proyectos/ritmobaile/README.md).

## Archivos de este directorio

- [migrations.sql](/Users/hectorlealvillavicencio/Documents/Proyectos/ritmobaile/supabase/migrations.sql): esquema, triggers, políticas RLS, storage y vista pública del blog

## Variables que usa Supabase

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxxxxxx
SUPABASE_SECRET_KEY=sb_secret_xxxxxxxxx
SEED_ADMIN_NAME=Administrador
SEED_ADMIN_EMAIL=admin@ritmoyfuerza.com
SEED_ADMIN_PASSWORD=Admin12345
```

## Qué debes configurar en Supabase

### Proyecto

1. Crea el proyecto.
2. Ve a `Settings` → `API Keys`.
3. Copia:
   - `Project URL`
   - `Publishable key`
   - `Secret key`

### Authentication

1. Ve a `Authentication`.
2. Desactiva registro público.
3. Habilita recuperación de contraseña por email.

### Base de datos

1. Ve a `SQL Editor`.
2. Ejecuta completo [migrations.sql](/Users/hectorlealvillavicencio/Documents/Proyectos/ritmobaile/supabase/migrations.sql).

La migración crea:

- `profiles`
- `free_class_requests`
- `categories`
- `posts`
- `post_categories`
- bucket `blog-media`
- vista `published_posts_view`
- triggers de timestamps y sincronización de perfiles
- políticas RLS para panel, frontend y storage

## Seed del primer admin

Con las variables de entorno ya configuradas:

```bash
npm run seed:admin
```

Ese comando:

- crea o actualiza el usuario en `auth.users`
- crea o actualiza el perfil en `public.profiles`
- fija el rol como `admin`
- deja el usuario activo

## Promoción manual de admin

Si prefieres crear el usuario manualmente desde `Authentication` → `Users`, luego puedes promoverlo con:

```sql
update public.profiles
set role = 'admin'
where email = 'tu-email@dominio.com';
```

## Storage usado por el editor

El editor y la imagen destacada usan el bucket:

```text
blog-media
```

Las políticas del bucket se crean desde [migrations.sql](/Users/hectorlealvillavicencio/Documents/Proyectos/ritmobaile/supabase/migrations.sql).

## Notas

- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` es para frontend y SSR autenticado.
- `SUPABASE_SECRET_KEY` es solo para backend y scripts administrativos.
- No uses la `publishable key` como `SUPABASE_SECRET_KEY`.
