-- ── Tabla de proyectos ────────────────────────────────────────────────────────
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

-- ── RLS ───────────────────────────────────────────────────────────────────────
alter table projects enable row level security;

drop policy if exists "projects_public_read" on projects;
drop policy if exists "projects_anon_all"    on projects;

create policy "projects_anon_all"
  on projects for all using (true) with check (true);

-- ── Seed: proyectos iniciales ─────────────────────────────────────────────────
-- Solo inserta si la tabla está vacía
insert into projects (num, name, tagline, description, highlights, image, type, year, demo_url, code_url, tech, position)
select * from (values
  (
    '01',
    'Estiumsew',
    'Landing page para tienda artesanal de costura',
    'Diseño y desarrollo desde cero de la landing page de Estiumsew, un proyecto artesanal de costura y moda. Foco en transmitir la identidad de marca con un diseño visual cuidado, galería de productos y arquitectura de información orientada a conversión.',
    array[
      'Diseño visual 100% personalizado, alineado con la identidad de marca',
      'Arquitectura de información optimizada para conversión y experiencia de usuario',
      'Deploy continuo en Netlify con pipeline automático desde GitHub'
    ],
    'images/estiumsew.png',
    'Landing Page · Frontend',
    '2025',
    'https://estiumsew.netlify.app/',
    'https://github.com/moestilos/estiumsew',
    '[{"name":"HTML","pct":40,"color":"#e34c26"},{"name":"CSS","pct":35,"color":"#264de4"},{"name":"JavaScript","pct":25,"color":"#facc15"}]'::jsonb,
    1
  ),
  (
    '02',
    'FunkMoes',
    'E-commerce de camisetas con panel de admin',
    'Tienda online desarrollada de cero: catálogo, carrito, autenticación JWT, pasarela de pagos Stripe y panel de administración completo. Diseño centrado en conversión con experiencia de compra fluida.',
    array[
      'Pasarela de pagos con Stripe, flujo de checkout completo',
      'Panel de administración con gestión de productos, pedidos y clientes',
      'Autenticación JWT con roles de usuario y rutas protegidas'
    ],
    'images/pro1.png',
    'E-commerce · Full Stack',
    '2024',
    null,
    'https://github.com/moestilos',
    '[{"name":"Laravel / PHP","pct":45,"color":"#f97316"},{"name":"Tailwind CSS","pct":25,"color":"#38bdf8"},{"name":"MySQL","pct":20,"color":"#4ade80"},{"name":"JavaScript","pct":10,"color":"#facc15"}]'::jsonb,
    2
  ),
  (
    '03',
    'Vuela21',
    'Sistema de gestión de envíos para cliente real',
    'Aplicación de gestión de envíos para cliente real (CodeArts SL). API REST desacoplada con Symfony, frontend Angular responsive y flujos operacionales optimizados para reducir fricción en el día a día.',
    array[
      'API REST desacoplada con Symfony, documentada con Swagger',
      'Frontend Angular con gestión de estado reactiva y navegación protegida',
      'Entorno Docker reproducible para desarrollo y producción'
    ],
    'images/vuela21o.png',
    'SaaS · Full Stack',
    '2025',
    null,
    'https://github.com/moestilos',
    '[{"name":"Angular / TS","pct":40,"color":"#c084fc"},{"name":"Symfony","pct":30,"color":"#6366f1"},{"name":"PostgreSQL","pct":20,"color":"#38bdf8"},{"name":"Docker","pct":10,"color":"#60a5fa"}]'::jsonb,
    3
  ),
  (
    '04',
    'Portfolio moestilos',
    'Portfolio personal de alto impacto visual',
    'Portfolio Angular 17 standalone + Tailwind CSS con sistema de diseño editorial completo. Typewriter animado, donut charts SVG, scroll reveal, fondo de blobs animados y optimización para conversión freelance.',
    array[
      'Sistema de diseño propio con tokens CSS y componentes standalone',
      'Animaciones SVG puras sin dependencias — donut charts y scroll reveal',
      'Puntuación Lighthouse 95+ en performance y accesibilidad'
    ],
    'images/tfgfo.webp',
    'Portfolio · Frontend',
    '2025',
    null,
    'https://github.com/moestilos',
    '[{"name":"Angular 17","pct":50,"color":"#c084fc"},{"name":"Tailwind CSS","pct":30,"color":"#38bdf8"},{"name":"TypeScript","pct":20,"color":"#60a5fa"}]'::jsonb,
    4
  )
) as v(num, name, tagline, description, highlights, image, type, year, demo_url, code_url, tech, position)
where not exists (select 1 from projects limit 1);
