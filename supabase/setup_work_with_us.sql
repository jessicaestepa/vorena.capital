-- Work with us / talent applications → contact_submissions
-- Run once in Supabase → SQL Editor (safe to re-run)

-- 1) Allow intent = 'talent'
alter table public.contact_submissions
  drop constraint if exists contact_submissions_intent_check;

alter table public.contact_submissions
  add constraint contact_submissions_intent_check
  check (intent in ('business', 'connect', 'talent'));

-- 2) Store which open role they applied to
alter table public.contact_submissions
  add column if not exists role text;

create index if not exists contact_submissions_role_idx
  on public.contact_submissions (role);

-- 3) RLS (if table was created without policies)
alter table public.contact_submissions enable row level security;

drop policy if exists "Allow anonymous insert" on public.contact_submissions;
create policy "Allow anonymous insert"
  on public.contact_submissions
  for insert
  to anon
  with check (true);

drop policy if exists "No public select" on public.contact_submissions;
create policy "No public select"
  on public.contact_submissions
  for select
  to anon
  using (false);
