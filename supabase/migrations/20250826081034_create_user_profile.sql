-- ============================================
-- Extensions
-- ============================================
create extension if not exists citext;
create extension if not exists pg_trgm;

create or replace function public.trg_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- ============================================
-- Check if a user's email is verified
-- Reads from auth.users (confirmed_at or email_confirmed_at)
-- ============================================
create or replace function public.email_is_verified(p_uid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from auth.users u
    where u.id = p_uid
      and coalesce(u.confirmed_at, u.email_confirmed_at) is not null
  );
$$;

comment on function public.email_is_verified is
  'Returns true if the given auth user has a verified email (confirmed_at or email_confirmed_at not null).';

-- ============================================
-- Profiles table
-- ============================================
create table if not exists public.profiles (
  user_id uuid primary key
    references auth.users(id) on delete cascade,

  username citext not null,
  display_name text not null,

  bio text,
  avatar_url text,
  locale text not null default 'en',
  timezone text not null default 'UTC',

  birthdate date,
  gender text check (gender in ('male', 'female', 'other')),

  deleted_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  search_fts tsvector generated always as (
    setweight(to_tsvector('simple', coalesce(username::text, '')), 'A') ||
    setweight(to_tsvector('simple', coalesce(display_name, '')), 'B')
  ) stored,

  constraint username_format_chk
    check (username ~ '^[A-Za-z0-9_\\.]{3,32}$')
);

comment on table public.profiles is 'Public-facing user profiles (1:1 with auth.users).';
comment on column public.profiles.username is 'Unique handle (case-insensitive); reusable after soft delete.';
comment on column public.profiles.birthdate is 'User birth date for age verification and personalization.';
comment on column public.profiles.gender is 'User gender identity (male, female, other).';
comment on column public.profiles.deleted_at is 'Soft-delete marker; when set, profile is hidden and username can be reused.';

-- Allow reuse of deleted usernames
create unique index if not exists profiles_username_unique_active
  on public.profiles (username)
  where deleted_at is null;

-- Search indexes
create index if not exists profiles_search_fts_idx
  on public.profiles using gin (search_fts);

create index if not exists profiles_username_trgm_idx
  on public.profiles using gin (username gin_trgm_ops);

-- Updated at trigger
drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at
before update on public.profiles
for each row execute function public.trg_set_updated_at();

-- ============================================
-- Row Level Security
-- ============================================
alter table public.profiles enable row level security;

-- Public read of non-deleted profiles; owners can read their own even if deleted
drop policy if exists "profiles_public_read" on public.profiles;
create policy "profiles_public_read"
on public.profiles
for select
using (
  deleted_at is null
  or auth.uid() = user_id
);

-- Only the owner can insert their profile,
-- and only if email is verified and they don't already have a profile
drop policy if exists "profiles_owner_insert_verified" on public.profiles;
create policy "profiles_owner_insert_verified"
on public.profiles
for insert
with check (
  auth.uid() = user_id
  and public.email_is_verified(auth.uid())
  and not exists (
    select 1 from public.profiles p where p.user_id = auth.uid()
  )
);

-- Only the owner can update their profile
drop policy if exists "profiles_owner_update" on public.profiles;
create policy "profiles_owner_update"
on public.profiles
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);