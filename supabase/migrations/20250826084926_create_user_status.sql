-- table
create table if not exists public.user_suspensions (
  id bigserial primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  imposed_by uuid not null references auth.users(id),
  reason text,
  starts_at timestamptz not null default now(),
  ends_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists user_suspensions_user_idx
  on public.user_suspensions (user_id, starts_at, ends_at);

-- rls
alter table public.user_suspensions enable row level security;

drop policy if exists "user_suspensions_owner_or_mod_read" on public.user_suspensions;
create policy "user_suspensions_owner_or_mod_read"
on public.user_suspensions
for select
using (auth.uid() = user_id or public.is_moderator());

drop policy if exists "user_suspensions_mod_insert" on public.user_suspensions;
create policy "user_suspensions_mod_insert"
on public.user_suspensions
for insert
with check (public.is_moderator());

drop policy if exists "user_suspensions_mod_update" on public.user_suspensions;
create policy "user_suspensions_mod_update"
on public.user_suspensions
for update
using (public.is_moderator())
with check (public.is_moderator());

drop policy if exists "user_suspensions_mod_delete" on public.user_suspensions;
create policy "user_suspensions_mod_delete"
on public.user_suspensions
for delete
using (public.is_moderator());

create or replace view public.v_user_status as
select
  u.id as user_id,
  exists (
    select 1
    from public.user_suspensions s
    where s.user_id = u.id
      and s.starts_at <= now()
      and (s.ends_at is null or s.ends_at > now())
  ) as is_suspended
from auth.users u;