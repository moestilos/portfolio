// ─────────────────────────────────────────────────────────────────────────────
// Rellena estos valores con los de tu proyecto Supabase:
//   Dashboard → Settings → API
//   SUPABASE_URL  = https://xxxx.supabase.co
//   SUPABASE_ANON = public anon key (safe to expose en frontend)
//
// Para Google OAuth:
//   Supabase Dashboard → Auth → Providers → Google → Enable
//   Google Cloud Console → OAuth credentials → redirect URI:
//     https://<ref>.supabase.co/auth/v1/callback
//
// Para Netlify, añade en Site settings → Environment variables:
//   SUPABASE_URL  y  SUPABASE_ANON_KEY
// ─────────────────────────────────────────────────────────────────────────────

export const environment = {
  production: false,
  supabaseUrl:  'https://xzcnaozzmxavbkpytdri.supabase.co',
  supabaseKey:  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6Y25hb3p6bXhhdmJrcHl0ZHJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzMDQxNTUsImV4cCI6MjA5MTg4MDE1NX0.vQM2AdAdIXSd4eVCrnx1vOijc8Qi6hHfrgE-ejJa1Bc',
  adminEmail:   'gmateosoficial@gmail.com',
  adminUser:     'momo',
  adminPassword: '123321',
};
