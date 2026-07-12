// ============================================================
//  cv.typ — Guillermo Mateos de los Santos Aguilera
//  Compilar:  typst compile cv.typ "Guillermo Mateos Santos CV.pdf"
// ============================================================

// --- Paleta ---
#let marino      = rgb("#0f1e38")   // fondo barra lateral
#let marino-2    = rgb("#182b4d")   // paneles dentro de la barra
#let cielo       = rgb("#4cc3ff")   // acento en la barra (cian)
#let acento      = rgb("#1d63d8")   // acento principal (azul)
#let tinta       = rgb("#1c2333")
#let gris        = rgb("#5b6474")
#let gris-claro  = rgb("#e4e8ef")
#let hueso       = rgb("#f7f9fc")

#let fuente-texto = ("Inter", "Open Sans", "Noto Sans", "Liberation Sans", "DejaVu Sans")

// --- Helpers ---
#let chip(txt) = box(
  fill: acento.lighten(88%),
  stroke: 0.5pt + acento.lighten(60%),
  inset: (x: 6pt, y: 2.5pt),
  radius: 8pt,
)[#text(size: 7.8pt, weight: "medium", fill: acento.darken(15%))[#txt]]

// Barra de nivel para la barra lateral (0–100)
#let barra(nombre, nivel) = {
  text(size: 8.5pt, fill: white.darken(5%), weight: "medium")[#nombre]
  v(2.5pt)
  box(width: 100%, height: 4pt, fill: white.transparentize(85%), radius: 2pt)[
    #box(width: nivel * 1%, height: 4pt, fill: gradient.linear(cielo, cielo.lighten(30%)), radius: 2pt)
  ]
  v(5pt)
}

// Título de sección en la barra lateral
#let titulo-lateral(t) = {
  v(7pt)
  text(size: 8.5pt, weight: "bold", tracking: 1.6pt, fill: cielo)[#upper(t)]
  v(3pt)
  box(width: 22pt, height: 2pt, fill: cielo, radius: 1pt)
  v(4pt)
}

// Línea de contacto
#let dato(etiqueta, valor) = {
  text(size: 7.5pt, weight: "bold", tracking: 1pt, fill: cielo.lighten(20%))[#upper(etiqueta)]
  linebreak()
  text(size: 8.8pt, fill: white.darken(4%))[#valor]
  v(3pt)
}

// Entrada de experiencia/formación con hito de línea temporal
#let entrada(cargo, lugar, periodo, desc) = {
  grid(
    columns: (14pt, 1fr),
    column-gutter: 6pt,
    // hito + línea vertical
    box(width: 9pt, height: 9pt, radius: 50%, fill: white, stroke: 2.5pt + acento),
    {
      grid(columns: (1fr, auto), column-gutter: 6pt,
        text(weight: "bold", size: 10.5pt)[#cargo],
        align(right)[#box(fill: hueso, stroke: 0.5pt + gris-claro, inset: (x: 6pt, y: 2.5pt), radius: 8pt)[
          #text(fill: acento, size: 7.8pt, weight: "semibold")[#periodo]]],
      )
      v(1pt)
      text(fill: gris, size: 9pt, weight: "medium")[#lugar]
      v(3pt)
      text(size: 9pt)[#desc]
      v(11pt)
    },
  )
}

// --- Documento ---
#set document(title: "Guillermo Mateos de los Santos Aguilera — CV")
#set page(paper: "a4", margin: (x: 0pt, y: 0pt))
#set text(font: fuente-texto, size: 9.5pt, fill: tinta, lang: "es")
#set par(justify: true, leading: 0.6em)

#show heading: it => {
  v(3pt)
  grid(columns: (auto, 1fr), column-gutter: 8pt, align: horizon,
    {
      box(width: 4pt, height: 13pt, fill: gradient.linear(angle: 90deg, acento, cielo), radius: 2pt)
      h(7pt)
      text(size: 13.5pt, weight: "bold", fill: marino)[#it.body]
    },
    line(length: 100%, stroke: 1pt + gris-claro),
  )
  v(4pt)
}

#grid(columns: (33%, 67%),

  // ══════════ BARRA LATERAL ══════════
  block(fill: marino, height: 100%, inset: (x: 16pt, top: 20pt, bottom: 12pt), width: 100%)[
    #set text(fill: white)
    #set par(justify: false)

    // Foto con doble anillo
    #align(center)[
      #box(
        width: 88pt, height: 88pt, radius: 50%,
        stroke: 2pt + cielo, inset: 3.5pt,
      )[
        #box(width: 100%, height: 100%, radius: 50%, clip: true,
          image("foto.jpg", width: 100%, height: 100%, fit: "cover"))
      ]
    ]
    #v(10pt)
    #align(center)[
      #text(size: 15.5pt, weight: "bold")[Guillermo Mateos]
      #v(-3pt)
      #text(size: 11pt, weight: "medium", fill: white.darken(10%))[de los Santos Aguilera]
      #v(5pt)
      #box(fill: cielo.transparentize(82%), stroke: 0.5pt + cielo.transparentize(40%), inset: (x: 8pt, y: 4pt), radius: 9pt)[
        #text(size: 8.2pt, weight: "semibold", fill: cielo.lighten(25%))[FULL STACK · AUTOMATIZACIÓN CRM/ERP]
      ]
    ]

    #titulo-lateral("Contacto")
    #dato("Teléfono", "+34 658 08 27 63")
    #dato("Email", "guillermo.moestilos@gmail.com")
    #dato("GitHub", "github.com/moestilos")
    #dato("LinkedIn", "linkedin.com/in/guillermo-mateos")
    #dato("Portfolio", "moestilos.github.io/portfolio")
    #dato("Ubicación", "Bormujos, Sevilla")

    #titulo-lateral("Especialidades")
    #barra("Automatización · n8n / Python", 88)
    #barra("Integraciones HubSpot / Odoo", 82)
    #barra("Frontend · Angular / Tailwind", 90)
    #barra("Backend · Laravel / Symfony", 80)
    #barra("Scraping · Playwright", 78)

    #titulo-lateral("Idiomas")
    #text(size: 9pt)[Español nativo · Inglés profesional]

    #titulo-lateral("Extras")
    #text(size: 8.6pt, fill: white.darken(6%))[
      Carné de conducir B · Subcampeón mundial de gimnasia acrobática (2022)
    ]
  ],

  // ══════════ COLUMNA PRINCIPAL ══════════
  block(inset: (x: 20pt, top: 24pt, bottom: 16pt), width: 100%)[

    = Perfil
    #text(size: 9.5pt)[
      Desarrollador full stack especializado en *automatización de procesos e
      integraciones entre CRMs/ERPs* (HubSpot, Odoo) con Python y n8n, además de
      desarrollo web a medida con Angular y Laravel. Trabajo freelance con clientes
      reales: migraciones de datos conservando histórico y relaciones, scraping con
      Playwright y webs de alto rendimiento. Linux como entorno diario y foco en
      entregar soluciones verificadas de punta a punta.
    ]
    #v(6pt)

    = Experiencia
    #v(2pt)
    #entrada("Desarrollador Web Freelance", "Proyectos independientes · Remoto", "2025 — actualidad")[
      Proyectos web y de automatización para clientes reales:
      - *Migración de CRM HubSpot → Odoo* para una empresa agroalimentaria:
        extracción vía HubSpot API v3 y carga por XML-RPC conservando histórico
        completo (correos, notas, tareas, adjuntos y relaciones). Auditoría
        automática de exports que detectó IDs corruptos antes de migrar.
      - Automatizaciones *n8n* en producción y scripts Python para sincronización
        de datos e informes.
      - Web scraping con *Playwright* y desarrollo web a medida (Angular, Laravel).
    ]
    #entrada("Desarrollador Full Stack — Prácticas", "CodeArts Solutions · Sevilla", "2025")[
      Angular, Symfony, Tailwind CSS, Docker y PostgreSQL en proyectos reales para
      clientes, sobre Linux y con metodologías ágiles. Diseño con Figma e Illustrator.
    ]
    #entrada("Desarrollador Web — Prácticas", "Guadaltech Professional Cloud · Sevilla", "2022 — 2023")[
      400 h de formación práctica en desarrollo web y sistemas: WordPress, Odoo y
      Adobe Creative Cloud en proyectos reales.
    ]

    = Formación
    #v(2pt)
    #entrada("Grado Superior — Desarrollo de Aplicaciones Web", "Cesur Sevilla", "2023 — 2025")[
      Java, PHP, JavaScript, Spring Boot, Laravel, Tailwind CSS y bases de datos.
    ]
    #entrada("Grado Medio — Sistemas Microinformáticos y Redes", "Obicex Implika", "2020 — 2022")[
      Fundamentos de sistemas, redes y programación.
    ]

    = Stack técnico
    #v(2pt)
    #grid(columns: (auto, 1fr), column-gutter: 10pt, row-gutter: 7pt, align: (right, left),
      text(size: 8.5pt, weight: "bold", fill: gris)[Automatización],
      [#chip("n8n") #chip("Python") #chip("HubSpot API") #chip("Odoo XML-RPC") #chip("Playwright") #chip("APIs REST")],
      text(size: 8.5pt, weight: "bold", fill: gris)[Frontend],
      [#chip("Angular") #chip("TypeScript") #chip("JavaScript") #chip("Tailwind CSS") #chip("React")],
      text(size: 8.5pt, weight: "bold", fill: gris)[Backend],
      [#chip("Laravel") #chip("PHP") #chip("Symfony") #chip("Spring Boot") #chip("NestJS")],
      text(size: 8.5pt, weight: "bold", fill: gris)[DB & DevOps],
      [#chip("PostgreSQL") #chip("MySQL") #chip("Docker") #chip("Git") #chip("Linux")],
    )
  ],
)
