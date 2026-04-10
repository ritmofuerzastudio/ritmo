create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  name text not null,
  role text not null default 'editor' check (role in ('admin', 'editor')),
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists public.free_class_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  interest text not null,
  created_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  description text,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content_json jsonb not null default '{"type":"doc","content":[]}'::jsonb,
  content_html text not null default '<p></p>',
  featured_image_url text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  seo_title text,
  seo_description text,
  canonical_url text,
  robots_index boolean not null default true,
  robots_follow boolean not null default true,
  og_title text,
  og_description text,
  og_image_url text,
  published_at timestamptz,
  author_id uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

alter table public.posts
add column if not exists content_html text not null default '<p></p>';

create table if not exists public.post_categories (
  post_id uuid not null references public.posts(id) on delete cascade,
  category_id uuid not null references public.categories(id) on delete restrict,
  created_at timestamptz not null default timezone('utc'::text, now()),
  primary key (post_id, category_id)
);

create index if not exists idx_posts_status_published_at on public.posts(status, published_at desc);
create index if not exists idx_posts_slug on public.posts(slug);
create index if not exists idx_categories_slug on public.categories(slug);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, name, role)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data->>'name', split_part(coalesce(new.email, ''), '@', 1)),
    coalesce(new.raw_user_meta_data->>'role', 'editor')
  )
  on conflict (id) do update
  set
    email = excluded.email,
    name = excluded.name,
    role = excluded.role,
    updated_at = timezone('utc'::text, now());

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert or update on auth.users
for each row execute function public.handle_new_user();

drop trigger if exists categories_set_updated_at on public.categories;
create trigger categories_set_updated_at
before update on public.categories
for each row execute function public.set_updated_at();

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists posts_set_updated_at on public.posts;
create trigger posts_set_updated_at
before update on public.posts
for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.free_class_requests enable row level security;
alter table public.categories enable row level security;
alter table public.posts enable row level security;
alter table public.post_categories enable row level security;

create or replace function public.current_user_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid()
$$;

create or replace function public.current_user_is_active()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce((select is_active from public.profiles where id = auth.uid()), false)
$$;

drop policy if exists "profiles read own/admin" on public.profiles;
create policy "profiles read own/admin"
on public.profiles
for select
using (
  auth.uid() = id
  or (public.current_user_role() = 'admin' and public.current_user_is_active())
);

drop policy if exists "profiles update admin" on public.profiles;
create policy "profiles update admin"
on public.profiles
for update
using (public.current_user_role() = 'admin' and public.current_user_is_active())
with check (public.current_user_role() = 'admin' and public.current_user_is_active());

drop policy if exists "free class insert public" on public.free_class_requests;
create policy "free class insert public"
on public.free_class_requests
for insert
with check (true);

drop policy if exists "free class read admin" on public.free_class_requests;
create policy "free class read admin"
on public.free_class_requests
for select
using (public.current_user_role() = 'admin' and public.current_user_is_active());

drop policy if exists "categories public read" on public.categories;
create policy "categories public read"
on public.categories
for select
using (true);

drop policy if exists "categories editor write" on public.categories;
create policy "categories editor write"
on public.categories
for all
using (public.current_user_role() in ('admin', 'editor') and public.current_user_is_active())
with check (public.current_user_role() in ('admin', 'editor') and public.current_user_is_active());

drop policy if exists "posts public read published" on public.posts;
create policy "posts public read published"
on public.posts
for select
using (status = 'published');

drop policy if exists "posts editor write" on public.posts;
create policy "posts editor write"
on public.posts
for all
using (public.current_user_role() in ('admin', 'editor') and public.current_user_is_active())
with check (public.current_user_role() in ('admin', 'editor') and public.current_user_is_active());

drop policy if exists "post categories public read" on public.post_categories;
create policy "post categories public read"
on public.post_categories
for select
using (true);

drop policy if exists "post categories editor write" on public.post_categories;
create policy "post categories editor write"
on public.post_categories
for all
using (public.current_user_role() in ('admin', 'editor') and public.current_user_is_active())
with check (public.current_user_role() in ('admin', 'editor') and public.current_user_is_active());

insert into storage.buckets (id, name, public)
values ('blog-media', 'blog-media', true)
on conflict (id) do nothing;

drop policy if exists "blog media public read" on storage.objects;
create policy "blog media public read"
on storage.objects
for select
using (bucket_id = 'blog-media');

drop policy if exists "blog media editor write" on storage.objects;
create policy "blog media editor write"
on storage.objects
for insert
with check (
  bucket_id = 'blog-media'
  and public.current_user_role() in ('admin', 'editor')
  and public.current_user_is_active()
);

drop policy if exists "blog media editor update" on storage.objects;
create policy "blog media editor update"
on storage.objects
for update
using (
  bucket_id = 'blog-media'
  and public.current_user_role() in ('admin', 'editor')
  and public.current_user_is_active()
)
with check (
  bucket_id = 'blog-media'
  and public.current_user_role() in ('admin', 'editor')
  and public.current_user_is_active()
);

drop policy if exists "blog media editor delete" on storage.objects;
create policy "blog media editor delete"
on storage.objects
for delete
using (
  bucket_id = 'blog-media'
  and public.current_user_role() in ('admin', 'editor')
  and public.current_user_is_active()
);

drop view if exists public.published_posts_view;

create view public.published_posts_view as
select
  p.id,
  p.title,
  p.slug,
  p.excerpt,
  p.content_json,
  p.content_html,
  p.featured_image_url,
  p.status,
  p.seo_title,
  p.seo_description,
  p.canonical_url,
  p.robots_index,
  p.robots_follow,
  p.og_title,
  p.og_description,
  p.og_image_url,
  p.published_at,
  p.created_at,
  p.updated_at,
  p.author_id,
  coalesce(array_agg(distinct c.name) filter (where c.name is not null), '{}') as category_names,
  coalesce(array_agg(distinct c.slug) filter (where c.slug is not null), '{}') as category_slugs
from public.posts p
left join public.post_categories pc on pc.post_id = p.id
left join public.categories c on c.id = pc.category_id
where p.status = 'published'
group by p.id;
