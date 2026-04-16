-- =============================================================================
-- moestilos portfolio — Supabase setup
-- Ejecutar en: Supabase Dashboard → SQL Editor → New query
-- =============================================================================

-- ─── 1. Tablas ────────────────────────────────────────────────────────────────

-- Visitas a la web
CREATE TABLE IF NOT EXISTS page_views (
  id         uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now()             NOT NULL,
  path       text        DEFAULT '/',
  referrer   text
);

-- Descargas del CV
CREATE TABLE IF NOT EXISTS cv_downloads (
  id         uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now()             NOT NULL
);

-- ─── 2. Row Level Security ────────────────────────────────────────────────────

ALTER TABLE page_views   ENABLE ROW LEVEL SECURITY;
ALTER TABLE cv_downloads ENABLE ROW LEVEL SECURITY;

-- Cualquier visitante (anon) puede insertar — necesario para el tracking
CREATE POLICY "anon_insert_views" ON page_views
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "anon_insert_cv" ON cv_downloads
  FOR INSERT TO anon WITH CHECK (true);

-- Solo usuarios autenticados pueden leer (admin)
CREATE POLICY "auth_read_views" ON page_views
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "auth_read_cv" ON cv_downloads
  FOR SELECT TO authenticated USING (true);

-- ─── 3. Funciones RPC para los gráficos del dashboard ────────────────────────

-- Visitas agrupadas por día (últimos N días)
CREATE OR REPLACE FUNCTION views_by_day(days_back integer DEFAULT 14)
RETURNS TABLE(day text, count bigint)
LANGUAGE sql SECURITY DEFINER
AS $$
  SELECT
    TO_CHAR(DATE(created_at), 'YYYY-MM-DD') AS day,
    COUNT(*) AS count
  FROM page_views
  WHERE created_at >= NOW() - (days_back || ' days')::interval
  GROUP BY DATE(created_at)
  ORDER BY DATE(created_at) ASC;
$$;

-- Descargas de CV agrupadas por día
CREATE OR REPLACE FUNCTION cv_by_day(days_back integer DEFAULT 14)
RETURNS TABLE(day text, count bigint)
LANGUAGE sql SECURITY DEFINER
AS $$
  SELECT
    TO_CHAR(DATE(created_at), 'YYYY-MM-DD') AS day,
    COUNT(*) AS count
  FROM cv_downloads
  WHERE created_at >= NOW() - (days_back || ' days')::interval
  GROUP BY DATE(created_at)
  ORDER BY DATE(created_at) ASC;
$$;

-- ─── 4. Índices para performance ──────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_page_views_created   ON page_views   (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_cv_downloads_created ON cv_downloads (created_at DESC);

-- =============================================================================
-- CONFIGURACIÓN MANUAL (hacer en Supabase Dashboard):
--
-- A) Auth → URL Configuration:
--    Site URL:        https://TU-DOMINIO.netlify.app
--    Redirect URLs:   https://TU-DOMINIO.netlify.app/admin
--                     http://localhost:4200/admin  (para local)
--
-- B) Auth → Providers → Google → Enable:
--    Client ID y Secret desde Google Cloud Console:
--    https://console.cloud.google.com/apis/credentials
--    Authorized redirect URI: https://<ref>.supabase.co/auth/v1/callback
--
-- C) Settings → API → copiar:
--    Project URL  → environment.ts → supabaseUrl
--    anon key     → environment.ts → supabaseKey
--
-- D) Netlify → Site settings → Environment variables:
--    SUPABASE_URL      = https://xxxx.supabase.co
--    SUPABASE_ANON_KEY = eyJhbGci...
-- =============================================================================
