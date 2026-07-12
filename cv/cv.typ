// ============================================================
//  cv.typ — Guillermo Mateos de los Santos Aguilera
//  Compilar:  typst compile cv.typ "Guillermo Mateos Santos CV.pdf"
// ============================================================

// --- Tema (autónomo) ---
#let acento      = rgb("#2b50aa")
#let acento-2    = rgb("#4a6fc0")
#let tinta       = rgb("#1a1a1a")
#let gris        = rgb("#6b7280")
#let gris-claro  = rgb("#e5e7eb")
#let fuente-texto = ("Inter", "Open Sans", "Noto Sans", "Liberation Sans", "DejaVu Sans")

#let chip(txt, color: acento) = box(
  fill: color.lighten(85%),
  inset: (x: 6pt, y: 2pt),
  radius: 3pt,
)[#text(size: 8pt, weight: "medium", fill: color.darken(10%))[#txt]]

#let cv(
  nombre: "",
  titular: "",
  contacto: (),
  lateral: [],
  body,
) = {
  set document(title: nombre + " — CV", author: nombre)
  set page(paper: "a4", margin: (x: 0pt, y: 0pt))
  set text(font: fuente-texto, size: 9.5pt, fill: tinta, lang: "es")
  set par(justify: true, leading: 0.6em)

  grid(columns: (32%, 68%),
    // ----- Barra lateral -----
    block(fill: acento, height: 100%, inset: 18pt, width: 100%)[
      #set text(fill: white)
      #text(size: 19pt, weight: "bold")[#nombre]
      #v(2pt)
      #text(size: 11pt, fill: white.darken(8%))[#titular]
      #v(18pt)
      #text(size: 9pt, weight: "bold", tracking: 1pt)[CONTACTO]
      #v(-4pt)
      #line(length: 100%, stroke: 0.5pt + white.darken(15%))
      #set text(size: 9pt)
      #for (etiqueta, valor) in contacto [
        #text(fill: white.darken(12%))[#etiqueta] \ #valor
        #v(6pt)
      ]
      #lateral
    ],
    // ----- Columna principal -----
    block(inset: 18pt, width: 100%)[
      #show heading: it => {
        v(4pt)
        text(size: 12.5pt, weight: "bold", fill: acento)[#it.body]
        v(-5pt)
        line(length: 100%, stroke: 1pt + gris-claro)
        v(2pt)
      }
      #body
    ],
  )
}

#let entrada(cargo, lugar, periodo, desc) = {
  grid(columns: (1fr, auto),
    text(weight: "bold")[#cargo], align(right, text(fill: gris, size: 9pt)[#periodo]),
  )
  text(fill: acento-2, size: 9pt)[#lugar]
  v(1pt)
  text(size: 9pt)[#desc]
  v(6pt)
}

#let seccion-lateral(titulo, cuerpo) = [
  #v(12pt)
  #text(size: 9pt, weight: "bold", tracking: 1pt)[#titulo]
  #v(-4pt)
  #line(length: 100%, stroke: 0.5pt + white.darken(15%))
  #set text(size: 9pt)
  #cuerpo
]

// =================== CONTENIDO ===================
#show: cv.with(
  nombre: "Guillermo Mateos de los Santos Aguilera",
  titular: "Desarrollador Full Stack · Automatización e integraciones CRM/ERP",
  contacto: (
    ("Teléfono", "+34 658 08 27 63"),
    ("Email", "guillermo.moestilos@gmail.com"),
    ("GitHub", "github.com/moestilos"),
    ("LinkedIn", "linkedin.com/in/guillermo-mateos"),
    ("Portfolio", "moestilos.github.io/portfolio"),
    ("Ubicación", "Bormujos, Sevilla"),
  ),
  lateral: [
    #seccion-lateral("IDIOMAS")[
      Español — nativo \
      Inglés — profesional
    ]
    #seccion-lateral("OTROS")[
      Carné de conducir B \
      #v(4pt)
      Subcampeón mundial de gimnasia acrobática (Copa MIAC 2022) y campeón nacional 2022 — disciplina y trabajo en equipo de competición.
    ]
    #seccion-lateral("REFERENCIAS")[
      Guadaltech Professional Cloud \
      #text(fill: white.darken(12%))[juanalberto.galera\@guadaltect.es]
    ]
  ],
)

= Perfil
Desarrollador full stack especializado en *automatización de procesos e
integraciones entre CRMs/ERPs* (HubSpot, Odoo) con Python y n8n, además de
desarrollo web a medida con Angular y Laravel. Trabajo como freelance con
clientes reales: migraciones de datos conservando histórico y relaciones,
scraping con Playwright y webs de alto rendimiento. Linux como entorno
diario y foco en entregar soluciones verificadas de punta a punta.

= Experiencia
#entrada("Desarrollador Web Freelance", "Proyectos independientes · Remoto", "2025 — actualidad")[
  Proyectos web y de automatización para clientes reales:
  - *Migración de CRM HubSpot → Odoo* para una empresa agroalimentaria:
    extracción vía HubSpot API v3 y carga en Odoo por XML-RPC conservando
    histórico completo (correos, notas, tareas, adjuntos y relaciones).
    Incluye auditoría automática de exports que detectó IDs corruptos antes de migrar.
  - Automatizaciones *n8n* en producción y scripts Python para sincronización de datos e informes.
  - Web scraping con *Playwright* y desarrollo web a medida (Angular, Laravel).
]
#entrada("Desarrollador Full Stack — Prácticas", "CodeArts Solutions · Sevilla", "2025")[
  Desarrollo con Angular, Symfony, Tailwind CSS, Docker y PostgreSQL en
  proyectos reales para clientes, sobre Linux y con metodologías ágiles.
  Diseño con Figma e Illustrator.
]
#entrada("Desarrollador Web — Prácticas", "Guadaltech Professional Cloud · Sevilla", "2022 — 2023")[
  400 h de formación práctica en desarrollo web y sistemas: WordPress, Odoo
  y Adobe Creative Cloud en proyectos reales.
]

= Formación
#entrada("Grado Superior — Desarrollo de Aplicaciones Web (DAW)", "Cesur Sevilla", "2023 — 2025")[
  Java, PHP, JavaScript, Spring Boot, Laravel, Tailwind CSS y bases de datos.
]
#entrada("Grado Medio — Sistemas Microinformáticos y Redes (SMR)", "Obicex Implika", "2020 — 2022")[
  Fundamentos de sistemas, redes y programación. Primeros pasos en desarrollo web.
]

= Habilidades
#text(size: 9pt, weight: "bold", fill: gris)[Automatización & Datos] \
#chip("n8n") #chip("Python") #chip("HubSpot API") #chip("Odoo (XML-RPC)") #chip("Playwright") #chip("Web scraping") #chip("APIs REST")
#v(4pt)
#text(size: 9pt, weight: "bold", fill: gris)[Frontend] \
#chip("Angular") #chip("TypeScript") #chip("JavaScript") #chip("Tailwind CSS") #chip("React") #chip("HTML5/CSS3")
#v(4pt)
#text(size: 9pt, weight: "bold", fill: gris)[Backend] \
#chip("Laravel") #chip("PHP") #chip("Symfony") #chip("Spring Boot") #chip("NestJS")
#v(4pt)
#text(size: 9pt, weight: "bold", fill: gris)[DB & DevOps] \
#chip("PostgreSQL") #chip("MySQL") #chip("Docker") #chip("Git") #chip("Linux")
