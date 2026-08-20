/** English profile data. Same shape as the Spanish one — only the copy changes. */
import type { Puesto } from '../perfil'

export const perfil = {
  nombre: 'Jhosnel Laya',
  rol: 'Graphic Designer & Video Editor · Full-Stack Developer & Automation Specialist',
  rolLinea1: 'Graphic Designer & Video Editor',
  rolLinea2: 'Full-Stack Developer & Automation Specialist',
  subtitulo: 'Computer Science (TSU) · Databases · AI conversational systems · Technical marketing',
  ubicacion: 'Barquisimeto, Lara — Venezuela',
  disponibilidad: 'Remote worldwide, or on-site locally',
  disponibilidadLarga:
    'Available for remote work anywhere, or on-site in the country where I live.',
  telefono: '+58 414-5355728',
  telefonoWhatsApp: '584145355728',
  correo: 'soyroas@gmail.com',
  instagram: 'jhosneljohann',
  experienciaDesde: 2019,
  nacimiento: '2001-01-05',
  nacimientoTexto: '5 January 2001',
  /* «TSU» es un título venezolano de tres años. Lo dejo con su nombre propio y
     lo explico, en vez de traducirlo por «Associate Degree» y decir de más. */
  tituloCorto: 'TSU in Computer Science (3-year degree) · IUJO Barquisimeto',

  resumen:
    'Seven years between design and engineering, along an unusual route: I came into the industry ' +
    'through art direction and video editing, and today I build the infrastructure behind it. Over ' +
    'the last thirteen months I built the in-house CRM of an immigration services firm in Florida ' +
    'from scratch — React, TypeScript, Express, Python and an 85-table PostgreSQL database, in ' +
    'daily use by the team — shipped four AI-assisted WhatsApp agents to production, and migrated ' +
    'critical infrastructure with no loss of service.',

  resumenCorto:
    'From art direction to full-stack engineering. I build systems a company uses every day, and ' +
    'I write down how to verify they work.',

  metodo:
    'I work from evidence: every decision gets logged, every change is tested before it ships, and ' +
    'anything I cannot verify I label as unverified.',
} as const

/** Backing numbers. Every one of them is checkable. */
export const cifras = [
  { n: '7', que: 'years of professional experience', desde: 'since 2019' },
  { n: '179', de: '/ 211', que: 'logged server changes under my name', desde: '85 % of the total' },
  { n: '131', que: 'database tables designed', desde: '5 schemas' },
  { n: '9', que: 'systems built and running in production', desde: '4 of them with AI' },
] as const

export const experiencia: Puesto[] = [
  {
    rol: 'Full-Stack Developer & Automation Specialist',
    empresa: 'Tu Agente de Inmigración',
    modalidad: 'Remoto',
    lugar: 'Florida, United States',
    desde: 'Jul 2025',
    hasta: 'Aug 2026',
    año: '2025 — 2026',
    actual: false,
    tipo: 'Desarrollo',
    resumen:
      'I joined to run marketing, editing and design. In early 2026 I took over the server and the ' +
      'development work, and became the lead technical contributor to the platform.',
    logros: [
      'Built the **company CRM from scratch**, now in daily use by the whole team: a monorepo with a React/Next.js frontend, an Express API, a Python AI service and an **85-table** PostgreSQL database, with in-house video calls, mailbox sync and document management. **243 commits and 21 automated production deploys.**',
      'Consolidated the data of **three legacy CRMs** — Pipedrive, Bitrix24 and Zoho — into the new system, along with 196,818 Google Drive files and the email archive, resolving cross-system duplicates with reversible merges. All of it **while the system stayed in use**.',
      'Designed and shipped **four WhatsApp conversational agents** on n8n, with the state machine persisted in PostgreSQL and a hybrid AI layer rolled out in shadow mode. **Seven flows are still live.**',
      'Migrated **n8n from SQLite to PostgreSQL** with two minutes of planned downtime, removing the root cause of three previous database corruptions.',
      'Set up **CI/CD with GitHub Actions** and moved version control from a self-hosted Gitea to GitHub, with automatic deploys to staging and production.',
      'Designed the data model with **column-level permissions**, so the automated system cannot read health answers or sensitive client data.',
      'Built the **lead-capture landing pages** in Next.js, with qualification questionnaires, ZIP-code geocoding and full ad attribution through the Meta Conversions API.',
      'Wrote the **internal engineering library**: 18 documents with 231 cited sources and adversarial review, now the team’s reference.',
      'Of the **211 changes logged** in the server changelog since it existed, **179 are mine** — the single largest contributor to the project.',
    ],
    herramientas: ['React', 'Next.js', 'TypeScript', 'Express', 'FastAPI', 'PostgreSQL', 'n8n', 'Docker', 'GitHub Actions', 'Vertex AI'],
  },
  {
    rol: 'Graphic Designer & Web Developer',
    empresa: 'Duralven C.A.',
    modalidad: 'Semipresencial',
    lugar: 'Barquisimeto, Venezuela',
    desde: 'Mar 2022',
    hasta: 'Jun 2026',
    año: '2022 — 2026',
    actual: false,
    tipo: 'Diseño',
    resumen:
      'For four years I ran the visual identity and the digital presence of an automotive parts ' +
      'and accessories distributor.',
    logros: [
      'Set the art direction and the brand system for the full catalogue: K&N, Fox, Nitto, Black Rhino, NOCO.',
      'Built and maintained the company website.',
      'Produced the social campaign assets and tracked how they performed.',
    ],
    herramientas: ['Photoshop', 'Illustrator', 'HTML', 'CSS', 'WordPress'],
  },
  {
    rol: 'Community Manager & Design Digitiser',
    empresa: 'RF Confecciones y Bordados C.A.',
    modalidad: 'Presencial',
    lugar: 'Barquisimeto, Venezuela',
    desde: 'Mar 2021',
    hasta: 'Oct 2021',
    año: '2021',
    actual: false,
    tipo: 'Marketing',
    resumen: 'I ran the digital presence and digitised the designs for textile production.',
    logros: [
      'Ran the social accounts and produced the brand content.',
      'Digitised designs for the embroidery machine, from sketch to production file.',
    ],
    herramientas: ['Illustrator', 'Photoshop', 'Meta Business Suite'],
  },
  {
    rol: 'Online Sales Assistant & Community Manager',
    empresa: 'Kleos C.A.',
    modalidad: 'Presencial',
    lugar: 'Barquisimeto, Venezuela',
    desde: 'Aug 2020',
    hasta: 'Mar 2021',
    año: '2020 — 2021',
    actual: false,
    tipo: 'Marketing',
    resumen: 'I handled sales through digital channels and managed the brand content.',
    logros: [
      'Handled and closed sales through digital channels.',
      'Ran the content calendar and publishing across social platforms.',
    ],
    herramientas: ['Meta Business Suite', 'Photoshop'],
  },
  {
    rol: 'Graphic Designer & Video Editor · freelance',
    empresa: 'Independent practice',
    modalidad: 'Freelance',
    lugar: 'Barquisimeto · seven brands served',
    desde: '2019',
    hasta: 'Present',
    año: '2019 — today',
    actual: true,
    tipo: 'Diseño',
    resumen:
      'Alongside my Computer Science degree I started taking on art direction and video editing ' +
      'work. It is where my career begins, and the reason I understand the whole commercial ' +
      'funnel and not just the code holding it up.',
    logros: [
      'Art direction and brand systems for **seven brands** across automotive, fashion, services and immigration.',
      'Edited **vertical video** for social — scripting, editing and publishing — including the personal brand of a Florida immigration firm and its YouTube channel.',
      'Built campaigns in **Meta Ads Manager** and read the results.',
      'Product photography, mockups and editorial composition for fashion campaigns.',
    ],
    herramientas: ['Photoshop', 'Illustrator', 'Premiere Pro', 'Filmora', 'Meta Ads Manager'],
  },
]

export const formacion = [
  {
    titulo: 'BA in Audiovisual Production',
    centro: 'UNEARTE — National Experimental University of the Arts',
    años: '2025 — in progress',
    estado: 'curso' as const,
  },
  {
    titulo: 'Higher Technical Degree in Computer Science',
    centro: 'Instituto Universitario Jesús Obrero (IUJO), Barquisimeto',
    años: '2019 — 2023',
    estado: 'egresado' as const,
  },
  {
    titulo: 'High School Diploma, Sciences',
    centro: 'U.E.A.M. «Libertador»',
    años: '2012 — 2017',
    estado: 'egresado' as const,
  },
]

export const certificaciones = [
  { titulo: 'Maze Funnels', detalle: 'Customer journey · Ads Manager · pipelines · client acquisition' },
  { titulo: 'Instituto Universitario Jesús Obrero', detalle: 'Digital marketing' },
  { titulo: 'Centro ART', detalle: 'Video editing and graphic design' },
]

export const idiomas = [
  { idioma: 'Spanish', nivel: 'Native' },
  { idioma: 'English', nivel: 'Intermediate · fluent technical reading' },
]
