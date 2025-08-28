-- assignment table
create table if not exists public.user_roles (
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null references public.roles(role) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, role)
);

create index if not exists user_roles_role_idx on public.user_roles (role);
create index if not exists user_roles_user_idx on public.user_roles (user_id);

-- helpers
create or replace function public.has_role(p_role text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles ur
    where ur.user_id = auth.uid() and ur.role = p_role
  );
$$;

create or replace function public.has_permission(p_perm text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles ur
    join public.role_permissions rp on rp.role = ur.role
    where ur.user_id = auth.uid() and rp.permission = p_perm
  );
$$;

create or replace function public.is_moderator()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.has_role('moderator');
$$;

-- rls
alter table public.user_roles enable row level security;

drop policy if exists "user_roles_owner_read_or_mod" on public.user_roles;
create policy "user_roles_owner_read_or_mod"
on public.user_roles
for select
using (auth.uid() = user_id or public.is_moderator());

drop policy if exists "user_roles_mod_insert" on public.user_roles;
create policy "user_roles_mod_insert"
on public.user_roles
for insert
with check (public.is_moderator());

drop policy if exists "user_roles_mod_update" on public.user_roles;
create policy "user_roles_mod_update"
on public.user_roles
for update
using (public.is_moderator())
with check (public.is_moderator());

drop policy if exists "user_roles_mod_delete" on public.user_roles;
create policy "user_roles_mod_delete"
on public.user_roles
for delete
using (public.is_moderator());

drop policy if exists "roles_write_mod" on public.roles;
create policy "roles_write_mod" on public.roles
for insert with check (public.is_moderator());
drop policy if exists "roles_update_mod" on public.roles;
create policy "roles_update_mod" on public.roles
for update using (public.is_moderator())
with check (public.is_moderator());
drop policy if exists "roles_delete_mod" on public.roles;
create policy "roles_delete_mod" on public.roles
for delete using (public.is_moderator());

drop policy if exists "permissions_write_mod" on public.permissions;
create policy "permissions_write_mod" on public.permissions
for insert with check (public.is_moderator());
drop policy if exists "permissions_update_mod" on public.permissions;
create policy "permissions_update_mod" on public.permissions
for update using (public.is_moderator())
with check (public.is_moderator());
drop policy if exists "permissions_delete_mod" on public.permissions;
create policy "permissions_delete_mod" on public.permissions
for delete using (public.is_moderator());

drop policy if exists "role_permissions_write_mod" on public.role_permissions;
create policy "role_permissions_write_mod" on public.role_permissions
for insert with check (public.is_moderator());
drop policy if exists "role_permissions_update_mod" on public.role_permissions;
create policy "role_permissions_update_mod" on public.role_permissions
for update using (public.is_moderator())
with check (public.is_moderator());
drop policy if exists "role_permissions_delete_mod" on public.role_permissions;
create policy "role_permissions_delete_mod" on public.role_permissions
for delete using (public.is_moderator());

-- default role on signup -> 'learner'
create or replace function public.on_auth_user_created_assign_default_role()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.user_roles (user_id, role)
  values (new.id, 'learner')
  on conflict do nothing;
  return new;
end;
$$;

drop trigger if exists trg_assign_default_role on auth.users;
create trigger trg_assign_default_role
after insert on auth.users
for each row execute function public.on_auth_user_created_assign_default_role();