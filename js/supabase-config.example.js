/**
 * Copy to supabase-config.js (gitignored).
 * Dashboard → Settings → API:
 *   - Project URL
 *   - sb_publishable_... (browser / anon key) — NOT sb_secret_
 */
window.VORENA_SUPABASE = {
  url: 'https://vebkqcijfauvmtrblbeq.supabase.co',
  anonKey: 'YOUR_SB_PUBLISHABLE_OR_ANON_KEY',
  table: 'contact_submissions'
};
