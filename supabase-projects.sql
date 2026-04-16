-- Tabla de proyectos
create table if not exists projects (
  id          uuid primary key default gen_random_uuid(),
  num         text not null,
  name        text not null,
  tagline     text not null default '',
  description text not null default '',
  highlights  text[] not null default '{}',
  image       text not null default '',
  type        text not null default '',
  year        text not null default '',
  demo_url    text,
  code_url    text,
  tech        jsonb not null default '[]',
  position    int not null default 0,
  created_at  timestamptz default now()
);

-- RLS
alter table projects enable row level security;

-- Lectura pública
create policy "projects_public_read"
  on projects for select using (true);

-- Solo autenticados pueden escribir (usamos service_role desde el frontend con la anon key es suficiente para select)
-- Para insert/update/delete lo haremos sin RLS restriction en anonimo (panel privado con password)
create policy "projects_anon_all"
  on projects for all using (true) with check (true);
