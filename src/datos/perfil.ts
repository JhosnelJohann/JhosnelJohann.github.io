/** Datos personales. Todo verificado contra el expediente y su CV original. */

export const perfil = {
  nombre: 'Jhosnel Laya',
  rol: 'Desarrollador Full-Stack & Especialista en Automatización',
  subtitulo: 'TSU en Informática · Sistemas conversacionales con IA · Bases de datos · Marketing técnico',
  ubicacion: 'Barquisimeto, Lara — Venezuela',
  disponibilidad: 'Remoto internacional o presencial en Venezuela',
  disponibilidadLarga:
    'Disponible para trabajo remoto internacional, o presencial en el país donde reside.',
  telefono: '+58 414-5355728',
  telefonoWhatsApp: '584145355728',
  instagram: 'jhosneljohann',

  resumen:
    'Perfil híbrido poco común: entré al sector desde el marketing y el diseño, y hoy construyo la ' +
    'infraestructura que lo sostiene. En el último año levanté desde cero el CRM corporativo de la ' +
    'empresa —React, TypeScript, Express, Python y PostgreSQL de 85 tablas, en uso diario—, llevé a ' +
    'producción cuatro asistentes conversacionales de WhatsApp con máquina de estados y capa de IA, ' +
    'migré infraestructura crítica sin pérdida de servicio y escribí la biblioteca técnica que hoy ' +
    'usa el equipo.',

  lema:
    'Trabajo con evidencia: cada decisión queda registrada, cada cambio se prueba antes de salir, y ' +
    'lo que no se pudo verificar se declara como no verificado.',

  /** Trece meses exactos: 27-jul-2025 → agosto de 2026. */
  periodo: 'Julio 2025 — Agosto 2026 · trece meses',
} as const

/** La tira de cifras del hero. Cada una es comprobable contra el servidor. */
export const cifras = [
  { n: '179', de: '/ 211', que: 'Cambios del servidor registrados a su nombre' },
  { n: '131', de: '', que: 'Tablas de base de datos diseñadas' },
  { n: '243', de: '', que: 'Commits del CRM corporativo' },
  { n: '4', de: '', que: 'Asistentes de WhatsApp en producción' },
  { n: '18', de: '', que: 'Documentos técnicos · 231 fuentes' },
  { n: '26', de: '', que: 'Diagramas con convención propia' },
] as const

export const experiencia = [
  {
    rol: 'Desarrollador Full-Stack & Especialista en Automatización',
    empresa: 'Tu Agente de Inmigración',
    lugar: 'Florida, EE. UU. · remoto · grupo de empresas de Juan Manuel Concha',
    desde: 'Jul 2025',
    hasta: 'Ago 2026',
    viva: true,
    puntos: [
      'Entré al puesto en marketing, edición y diseño; desde principios de 2026 asumí la administración del servidor y el desarrollo, hasta ser el responsable técnico principal de la plataforma.',
      'Construí desde cero el CRM corporativo, hoy en uso diario: React/Next.js + Express + FastAPI sobre PostgreSQL de 85 tablas, con videollamadas propias, correo y gestión documental.',
      'Consolidé los datos de tres CRM heredados —Pipedrive, Bitrix24 y Zoho— en el sistema nuevo, con el sistema en uso.',
      'Diseñé y puse en producción cuatro asistentes de WhatsApp sobre n8n, con máquina de estados persistida en PostgreSQL y capa de IA híbrida en modo sombra.',
      'Migré n8n de SQLite a PostgreSQL con dos minutos de corte, eliminando la causa raíz de tres corrupciones previas.',
      'Monté el CI/CD con GitHub Actions y migré el control de versiones de Gitea autoalojado a GitHub.',
    ],
  },
  {
    rol: 'Diseñador Gráfico & Programador Web',
    empresa: 'Duralven C.A.',
    lugar: 'Semipresencial',
    desde: 'Mar 2022',
    hasta: 'Presente',
    viva: true,
    puntos: [
      'Identidad visual y campañas para catálogo de repuestos y accesorios automotrices.',
      'Desarrollo y mantenimiento web; piezas gráficas con seguimiento de resultados.',
    ],
  },
  {
    rol: 'Community Manager & Digitalizador',
    empresa: 'RF Confecciones y Bordados C.A.',
    lugar: 'Presencial',
    desde: 'Mar 2021',
    hasta: 'Oct 2021',
    viva: false,
    puntos: ['Gestión de redes, digitalización de diseños para bordado y producción de contenido.'],
  },
  {
    rol: 'Asistente de Ventas Online & Community Manager',
    empresa: 'Kleos C.A.',
    lugar: 'Presencial',
    desde: 'Ago 2020',
    hasta: 'Mar 2021',
    viva: false,
    puntos: ['Atención comercial en canales digitales y gestión de contenido de marca.'],
  },
] as const

/** Clientes atendidos como freelance, de su CV original. */
export const freelance = [
  'Inversiones BFG C.A.',
  'Pizzería Zou Pizza',
  'LSB Clothes',
  'Alfer Autoparts',
  'Ignition Accesorios',
  'Gran Sabana Motors',
] as const

export const formacion = [
  {
    titulo: 'Licenciatura en Producción Audiovisual',
    centro: 'UNEARTE',
    años: '2025 — cursando',
    estado: 'curso',
  },
  {
    titulo: 'TSU en Informática',
    centro: 'Instituto Universitario Jesús Obrero (IUJO), Barquisimeto',
    años: '2019 — 2023',
    estado: 'egresado',
  },
  {
    titulo: 'Bachiller en Ciencias',
    centro: 'U.E.A.M. «Libertador»',
    años: '2012 — 2017',
    estado: 'egresado',
  },
] as const

export const certificaciones = [
  { titulo: 'Maze Funnels', detalle: 'Customer journey · Ads Manager · pipelines · adquisición de clientes' },
  { titulo: 'Instituto Universitario Jesús Obrero', detalle: 'Marketing digital' },
  { titulo: 'Centro ART', detalle: 'Edición de material audiovisual y diseño gráfico' },
] as const

export const idiomas = [
  { idioma: 'Español', nivel: 'Nativo' },
  { idioma: 'Inglés', nivel: 'Intermedio · lectura técnica fluida' },
] as const

/** El stack, agrupado por función y no como nube de logos. */
export const stack = [
  {
    grupo: 'Bases de datos',
    color: 'gris' as const,
    items: ['PostgreSQL', 'SQL', 'Migraciones versionadas', 'Permisos por columna', 'JSONB', 'SQLite', 'Supabase', 'Redis'],
  },
  {
    grupo: 'Lenguajes',
    color: 'azul' as const,
    items: ['JavaScript', 'TypeScript', 'Node.js', 'Python', 'Bash', 'HTML5', 'CSS3', 'SVG'],
  },
  {
    grupo: 'Frontend',
    color: 'verde' as const,
    items: ['React', 'Next.js', 'Componentes SVG animados', 'Responsive 320/390/1280', 'Optimización de conversión'],
  },
  {
    grupo: 'Backend y arquitectura',
    color: 'azul' as const,
    items: ['Express', 'FastAPI', 'Monorepo pnpm', 'Socket.io', 'LiveKit · WebRTC', 'Aislamiento por dominio de fallo'],
  },
  {
    grupo: 'Automatización',
    color: 'amarillo' as const,
    items: ['n8n (modo cola)', 'Máquinas de estado', 'Deduplicación', 'Debounce', 'Flujos de error'],
  },
  {
    grupo: 'Integraciones',
    color: 'azul' as const,
    items: ['GoHighLevel', 'Meta Conversions API', 'Telegram Bot API', 'Google Drive', 'IMAP/SMTP', 'APIs REST'],
  },
  {
    grupo: 'Inteligencia artificial',
    color: 'verde' as const,
    items: ['Google Vertex AI', 'Gemini 2.5', 'Anthropic Claude', 'Claude Code', 'Router + generador', 'Modo sombra', 'BAA HIPAA'],
  },
  {
    grupo: 'Infraestructura',
    color: 'rojo' as const,
    items: ['Linux', 'Docker · Compose', 'nginx', 'certbot · TLS', 'PM2', 'Git', 'GitHub Actions', 'SSH'],
  },
  {
    grupo: 'Hosting y dominios',
    color: 'gris' as const,
    items: ['Hostinger VPS', 'cPanel', 'BanaHosting', 'Namecheap', 'Cloudflare · R2', 'DNS · SPF · DKIM · DMARC'],
  },
  {
    grupo: 'Diseño y audiovisual',
    color: 'amarillo' as const,
    items: ['Photoshop', 'Illustrator', 'Premiere Pro', 'Filmora', 'Lucidchart', 'Meta Ads Manager'],
  },
] as const

/** Lo que consta en su formación pero NO ha usado en producción. Va declarado. */
export const declarados = ['Java', 'JavaFX', 'PHP', 'C++', 'C#'] as const
