-- Run once if contact_submissions already exists without role tracking
alter table public.contact_submissions
  add column if not exists role text;

create index if not exists contact_submissions_role_idx
  on public.contact_submissions (role);
