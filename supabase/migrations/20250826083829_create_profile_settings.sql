-- table
create table if not exists public.profile_settings (
  user_id uuid primary key references public.profiles(user_id) on delete cascade,
  preferences jsonb not null default '{}'::jsonb,
  marketing_opt_in boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- triggers
drop trigger if exists trg_profile_settings_updated_at on public.profile_settings;
create trigger trg_profile_settings_updated_at
before update on public.profile_settings
for each row execute function public.trg_set_updated_at();

-- rls
alter table public.profile_settings enable row level security;

drop policy if exists "profile_settings_owner_read" on public.profile_settings;
create policy "profile_settings_owner_read"
on public.profile_settings
for select
using (auth.uid() = user_id);

drop policy if exists "profile_settings_owner_insert" on public.profile_settings;
create policy "profile_settings_owner_insert"
on public.profile_settings
for insert
with check (auth.uid() = user_id);

drop policy if exists "profile_settings_owner_update" on public.profile_settings;
create policy "profile_settings_owner_update"
on public.profile_settings
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "profile_settings_owner_delete" on public.profile_settings;
create policy "profile_settings_owner_delete"
on public.profile_settings
for delete
using (auth.uid() = user_id);