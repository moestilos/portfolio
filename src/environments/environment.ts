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
  supabaseUrl:  'TU_SUPABASE_URL',
  supabaseKey:  'TU_SUPABASE_ANON_KEY',
  adminEmail:   'gmateosoficial@gmail.com',   // solo este email puede acceder
};
