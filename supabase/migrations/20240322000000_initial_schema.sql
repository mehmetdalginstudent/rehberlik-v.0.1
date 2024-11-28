-- Create appointments table
create table if not exists public.appointments (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    date date not null,
    time text not null,
    client_name text not null,
    type text not null,
    summary text,
    status text default 'pending' not null,
    constraint appointments_status_check check (status in ('pending', 'confirmed', 'cancelled'))
);

-- Create announcements table
create table if not exists public.announcements (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    title text not null,
    content text not null,
    expires_at timestamp with time zone not null,
    is_active boolean default true not null
);

-- Create blocked_slots table
create table if not exists public.blocked_slots (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    date date not null,
    time text not null,
    unique(date, time)
);

-- Set up Row Level Security (RLS)
alter table public.appointments enable row level security;
alter table public.announcements enable row level security;
alter table public.blocked_slots enable row level security;

-- Create policies
create policy "Enable read access for all users" on public.appointments
    for select using (true);

create policy "Enable read access for all users" on public.announcements
    for select using (true);

create policy "Enable read access for all users" on public.blocked_slots
    for select using (true);

-- Grant access to authenticated users
grant usage on schema public to authenticated;
grant all on public.appointments to authenticated;
grant all on public.announcements to authenticated;
grant all on public.blocked_slots to authenticated;

-- Grant access to anonymous users
grant usage on schema public to anon;
grant select on public.appointments to anon;
grant select on public.announcements to anon;
grant select on public.blocked_slots to anon;