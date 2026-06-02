-- Run in Supabase → SQL Editor
-- Stores both contact flows: business + connect

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  intent text not null check (intent in ('business', 'connect')),
  name text not null,
  email text not null,
  company text,
  message text not null,
  locale text default 'en',
  page_path text,
  referrer text,
  user_agent text,
  created_at timestamptz not null default now()
);

create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);

create index if not exists contact_submissions_intent_idx
  on public.contact_submissions (intent);

alter table public.contact_submissions enable row level security;

-- Allow anonymous inserts from the public site (anon key)
drop policy if exists "Allow anonymous insert" on public.contact_submissions;
create policy "Allow anonymous insert"
  on public.contact_submissions
  for insert
  to anon
  with check (true);

-- No public reads — view rows in Supabase dashboard only
drop policy if exists "No public select" on public.contact_submissions;
create policy "No public select"
  on public.contact_submissions
  for select
  to anon
  using (false);
