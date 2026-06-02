-- Run once if contact_submissions already exists with the old intent check
alter table public.contact_submissions
  drop constraint if exists contact_submissions_intent_check;

alter table public.contact_submissions
  add constraint contact_submissions_intent_check
  check (intent in ('business', 'connect', 'talent'));
