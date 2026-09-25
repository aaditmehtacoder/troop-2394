-- ===========================================================================
-- TROOP 394 DATABASE SCHEMA
-- ===========================================================================
-- Run this once in the Supabase SQL editor:
--   Dashboard → SQL Editor → New query → paste → Run
--
-- Safe to re-run: every statement is guarded.
--
-- The site reads with the publishable (anon) key, so row-level security is
-- the only thing standing between the public and your data. The rule is:
--   • anyone may READ rows marked published
--   • only a signed-in profile with role 'leader' or 'admin' may WRITE
-- ===========================================================================

-- ---------------------------------------------------------------------------
-- 1. PROFILES, one row per signed-in account
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id          uuid primary key references auth.users on delete cascade,
  email       text,
  full_name   text,
  avatar_url  text,
  role        text not null default 'viewer'
              check (role in ('viewer', 'member', 'leader', 'admin')),
  created_at  timestamptz not null default now()
);

-- New sign-ins get a profile automatically. The very first person to sign in
-- becomes the admin so the dashboard is usable straight away.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  first_user boolean;
begin
  select not exists (select 1 from public.profiles where role in ('leader','admin'))
    into first_user;

  insert into public.profiles (id, email, full_name, avatar_url, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'),
    new.raw_user_meta_data ->> 'avatar_url',
    case when first_user then 'admin' else 'viewer' end
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- "Is the caller allowed to edit?" Used by every write policy below.
-- security definer so the check itself is not subject to RLS on profiles.
create or replace function public.is_staff()
returns boolean
language sql
stable
security definer set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('leader', 'admin')
  );
$$;

-- ---------------------------------------------------------------------------
-- 2. CONTENT TABLES
-- ---------------------------------------------------------------------------

-- Blog / trip reports
create table if not exists public.posts (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  title       text not null,
  excerpt     text,
  body        text not null default '',
  author      text,
  kind        text not null default 'Trip report',
  event_date  date,
  cover_url   text,
  source_url  text,
  published   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Calendar
create table if not exists public.events (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  kind        text not null default 'Campout',
  starts_on   date not null,
  ends_on     date,
  location    text,
  note        text,
  published   boolean not null default true,
  created_at  timestamptz not null default now()
);

-- Short notices for the feed
create table if not exists public.announcements (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  body        text,
  link        text,
  pinned      boolean not null default false,
  published   boolean not null default true,
  created_at  timestamptz not null default now()
);

-- Eagle Scout honour roll
create table if not exists public.eagles (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  year        integer,
  troop       text default '394',
  project     text,
  source_url  text,
  published   boolean not null default true,
  created_at  timestamptz not null default now()
);

-- Youth and adult leadership
create table if not exists public.leaders (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  role        text not null,
  kind        text not null default 'adult' check (kind in ('youth', 'adult')),
  email       text,
  sort        integer not null default 0,
  published   boolean not null default true
);

-- Photo albums (metadata only; images stay where they live)
create table if not exists public.albums (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  year        integer,
  external_id text,
  cover_url   text,
  photo_count integer default 0,
  published   boolean not null default true
);

-- Forms and useful links
create table if not exists public.resources (
  id          uuid primary key default gen_random_uuid(),
  label       text not null,
  href        text not null,
  category    text not null default 'Form',
  description text,
  sort        integer not null default 0,
  published   boolean not null default true
);

-- ---------------------------------------------------------------------------
-- 3. ROW-LEVEL SECURITY
-- ---------------------------------------------------------------------------
alter table public.profiles      enable row level security;
alter table public.posts         enable row level security;
alter table public.events        enable row level security;
alter table public.announcements enable row level security;
alter table public.eagles        enable row level security;
alter table public.leaders       enable row level security;
alter table public.albums        enable row level security;
alter table public.resources     enable row level security;

-- Profiles: you can see and edit your own row; staff can see everyone.
drop policy if exists "own profile readable" on public.profiles;
create policy "own profile readable" on public.profiles
  for select using (auth.uid() = id or public.is_staff());

drop policy if exists "own profile updatable" on public.profiles;
create policy "own profile updatable" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id and role = (select role from public.profiles where id = auth.uid()));

drop policy if exists "staff manage profiles" on public.profiles;
create policy "staff manage profiles" on public.profiles
  for update using (public.is_staff()) with check (public.is_staff());

-- Content: public reads published rows, staff does everything.
do $$
declare t text;
begin
  foreach t in array array['posts','events','announcements','eagles','leaders','albums','resources']
  loop
    execute format('drop policy if exists "public reads published" on public.%I', t);
    execute format(
      'create policy "public reads published" on public.%I for select using (published or public.is_staff())', t);

    execute format('drop policy if exists "staff writes" on public.%I', t);
    execute format(
      'create policy "staff writes" on public.%I for all using (public.is_staff()) with check (public.is_staff())', t);
  end loop;
end $$;

-- ---------------------------------------------------------------------------
-- 4. HOUSEKEEPING
-- ---------------------------------------------------------------------------
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;

drop trigger if exists posts_touch on public.posts;
create trigger posts_touch before update on public.posts
  for each row execute function public.touch_updated_at();

create index if not exists posts_published_idx  on public.posts (published, event_date desc nulls last);
create index if not exists events_starts_idx    on public.events (starts_on);
create index if not exists eagles_year_idx      on public.eagles (year desc nulls last);

-- ---------------------------------------------------------------------------
-- 5. MAKE YOURSELF AN ADMIN
-- ---------------------------------------------------------------------------
-- Sign in with Google on the site once, then run this with your address:
--
--   update public.profiles set role = 'admin' where email = 'you@example.com';
--
-- Until you do, /admin will tell you your account is waiting for access.
-- ===========================================================================
