-- tables
create table if not exists public.roles (
  role text primary key,
  description text,
  precedence int not null default 100
);

create table if not exists public.permissions (
  permission text primary key,
  description text
);

create table if not exists public.role_permissions (
  role text not null references public.roles(role) on delete cascade,
  permission text not null references public.permissions(permission) on delete cascade,
  primary key (role, permission)
);

-- rls
alter table public.roles enable row level security;
alter table public.permissions enable row level security;
alter table public.role_permissions enable row level security;

drop policy if exists "roles_read" on public.roles;
create policy "roles_read" on public.roles for select using (true);

drop policy if exists "permissions_read" on public.permissions;
create policy "permissions_read" on public.permissions for select using (true);

drop policy if exists "role_permissions_read" on public.role_permissions;
create policy "role_permissions_read" on public.role_permissions for select using (true);