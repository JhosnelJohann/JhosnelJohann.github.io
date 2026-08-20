/** Datos del perfil. Todo verificado contra el expediente y su CV original. */

export const perfil = {
  nombre: 'Jhosnel Laya',
  /* El orden importa: es de donde viene y es lo que lleva más años haciendo. */
  rol: 'Diseñador Gráfico y Editor · Desarrollador Full-Stack & Especialista en Automatización',
  rolLinea1: 'Diseñador Gráfico y Editor',
  rolLinea2: 'Desarrollador Full-Stack & Especialista en Automatización',
  subtitulo: 'TSU en Informática · Bases de datos · Sistemas conversacionales con IA · Marketing técnico',
  ubicacion: 'Barquisimeto, Lara — Venezuela',
  disponibilidad: 'Remoto internacional o presencial',
  disponibilidadLarga:
    'Estoy disponible para trabajo remoto internacional, o presencial en el país donde resido.',
  telefono: '+58 414-5355728',
  telefonoWhatsApp: '584145355728',
  instagram: 'jhosneljohann',
  experienciaDesde: 2019,

  resumen:
    'Siete años entre el diseño y el desarrollo, con un recorrido poco común: entré al sector desde ' +
    'la dirección de arte y la edición audiovisual, y hoy construyo la infraestructura que la ' +
    'sostiene. En los últimos trece meses levanté desde cero el CRM corporativo de una empresa de ' +
    'servicios migratorios en Florida —React, TypeScript, Express, Python y PostgreSQL de 85 ' +
    'tablas, en uso diario por el equipo—, puse en producción cuatro asistentes conversacionales ' +
    'de WhatsApp con capa de inteligencia artificial, y migré infraestructura crítica sin pérdida ' +
    'de servicio.',

  resumenCorto:
    'De la dirección de arte al desarrollo full-stack. Construyo sistemas que una empresa usa ' +
    'todos los días, y dejo por escrito cómo verificar que funcionan.',

  metodo:
    'Trabajo con evidencia: cada decisión queda registrada, cada cambio se prueba antes de salir, ' +
    'y lo que no puedo verificar lo declaro como no verificado.',
} as const

/** Cifras de respaldo. Cada una es comprobable. */
export const cifras = [
  { n: '7', que: 'años de trayectoria profesional', desde: 'desde 2019' },
  { n: '179', de: '/ 211', que: 'cambios del servidor registrados a mi nombre', desde: '85 % del total' },
  { n: '131', que: 'tablas de base de datos diseñadas', desde: '5 esquemas' },
  { n: '9', que: 'sistemas construidos en producción', desde: '4 de ellos con IA' },
] as const

export interface Puesto {
  rol: string
  empresa: string
  lugar: string
  desde: string
  hasta: string
  año: string
  actual: boolean
  tipo: 'Desarrollo' | 'Diseño' | 'Marketing'
  resumen: string
  logros: string[]
  herramientas: string[]
}

/** Los cinco puestos, del más reciente al más antiguo. */
export const experiencia: Puesto[] = [
  {
    rol: 'Desarrollador Full-Stack y Especialista en Automatización',
    empresa: 'Tu Agente de Inmigración',
    lugar: 'Florida, Estados Unidos · remoto',
    desde: 'Jul 2025',
    hasta: 'Ago 2026',
    año: '2025 — 2026',
    actual: false,
    tipo: 'Desarrollo',
    resumen:
      'Entré al puesto como responsable de marketing, edición y diseño. A principios de 2026 asumí ' +
      'la administración del servidor y el desarrollo, hasta convertirme en el responsable técnico ' +
      'principal de la plataforma.',
    logros: [
      'Construí desde cero el **CRM corporativo**, hoy en uso diario por el equipo: monorepo con frontend React/Next.js, API en Express, servicio de IA en Python y PostgreSQL de **85 tablas**, con videollamadas propias, sincronización de correo y gestión documental. **243 commits y 21 despliegues automáticos a producción.**',
      'Consolidé los datos de **tres CRM heredados** —Pipedrive, Bitrix24 y Zoho— en el sistema nuevo, junto con 196 818 archivos de Google Drive y el histórico de correo, resolviendo la deduplicación entre sistemas con fusión reversible. Todo **con el sistema en uso**.',
      'Diseñé y puse en producción **cuatro asistentes conversacionales de WhatsApp** sobre n8n, con máquina de estados persistida en PostgreSQL y capa de IA híbrida desplegada en modo sombra. **Siete flujos siguen activos.**',
      'Migré **n8n de SQLite a PostgreSQL** con dos minutos de corte planificado, eliminando la causa raíz de tres corrupciones previas de base de datos.',
      'Implementé el **CI/CD con GitHub Actions** y migré el control de versiones de Gitea autoalojado a GitHub, con despliegue automático a staging y a producción.',
      'Diseñé el modelo de datos con **permisos columna por columna**, de forma que el sistema automatizado no pueda leer respuestas de salud ni datos sensibles de los clientes.',
      'Desarrollé las **landing pages de captación** en Next.js, con cuestionarios de calificación, geocodificación de códigos postales y atribución publicitaria completa vía Meta Conversions API.',
      'Redacté la **biblioteca técnica interna**: 18 documentos con 231 fuentes citadas y verificación adversarial, que hoy es la referencia del equipo.',
      'De los **211 cambios registrados** en la bitácora técnica del servidor desde que existe, **179 son míos**: el mayor contribuyente individual del proyecto.',
    ],
    herramientas: ['React', 'Next.js', 'TypeScript', 'Express', 'FastAPI', 'PostgreSQL', 'n8n', 'Docker', 'GitHub Actions', 'Vertex AI'],
  },
  {
    rol: 'Diseñador Gráfico y Programador Web',
    empresa: 'Duralven C.A.',
    lugar: 'Barquisimeto · semipresencial',
    desde: 'Mar 2022',
    hasta: 'Presente',
    año: '2022 — hoy',
    actual: true,
    tipo: 'Diseño',
    resumen:
      'Llevo la identidad visual y la presencia digital de un distribuidor de repuestos ' +
      'y accesorios automotrices.',
    logros: [
      'Diseñé la dirección de arte y el sistema gráfico de marca del catálogo completo: K&N, Fox, Nitto, Black Rhino, NOCO.',
      'Desarrollo y mantengo el sitio web de la empresa.',
      'Produzco las piezas de campaña para redes sociales y sigo sus resultados.',
    ],
    herramientas: ['Photoshop', 'Illustrator', 'HTML', 'CSS', 'WordPress'],
  },
  {
    rol: 'Community Manager y Digitalizador',
    empresa: 'RF Confecciones y Bordados C.A.',
    lugar: 'Barquisimeto · presencial',
    desde: 'Mar 2021',
    hasta: 'Oct 2021',
    año: '2021',
    actual: false,
    tipo: 'Marketing',
    resumen: 'Gestioné la presencia digital y digitalicé los diseños para producción textil.',
    logros: [
      'Gestioné las redes sociales y produje el contenido de marca.',
      'Digitalicé diseños para máquina de bordado, del boceto al archivo de producción.',
    ],
    herramientas: ['Illustrator', 'Photoshop', 'Meta Business Suite'],
  },
  {
    rol: 'Asistente de Ventas Online y Community Manager',
    empresa: 'Kleos C.A.',
    lugar: 'Barquisimeto · presencial',
    desde: 'Ago 2020',
    hasta: 'Mar 2021',
    año: '2020 — 2021',
    actual: false,
    tipo: 'Marketing',
    resumen: 'Atendí la venta por canales digitales y gestioné el contenido de marca.',
    logros: [
      'Atendí y cerré ventas por canales digitales.',
      'Llevé el calendario de contenido y la publicación en redes.',
    ],
    herramientas: ['Meta Business Suite', 'Photoshop'],
  },
  {
    rol: 'Diseñador Gráfico y Editor Audiovisual · autónomo',
    empresa: 'Ejercicio independiente',
    lugar: 'Barquisimeto · siete marcas atendidas',
    desde: '2019',
    hasta: 'Presente',
    año: '2019 — hoy',
    actual: true,
    tipo: 'Diseño',
    resumen:
      'En paralelo a mis estudios de TSU en Informática empecé a tomar encargos de dirección de ' +
      'arte y edición de vídeo. Es donde arranca mi trayectoria, y la razón de que hoy entienda ' +
      'el embudo comercial completo y no solo el código que lo sostiene.',
    logros: [
      'Hice la dirección de arte y los sistemas gráficos de marca de **siete marcas** de automoción, moda, servicios e inmigración.',
      'Edité **vídeo vertical** para redes sociales, con guion y publicación, incluida la marca personal de un despacho de inmigración en Florida y su canal de YouTube.',
      'Monté campañas en **Meta Ads Manager** y leí sus resultados.',
      'Hice fotografía de producto, mockups y composición editorial para campañas de moda.',
    ],
    herramientas: ['Photoshop', 'Illustrator', 'Premiere Pro', 'Filmora', 'Meta Ads Manager'],
  },
]

export const formacion = [
  {
    titulo: 'Licenciatura en Producción Audiovisual',
    centro: 'UNEARTE — Universidad Nacional Experimental de las Artes',
    años: '2025 — cursando',
    estado: 'curso' as const,
  },
  {
    titulo: 'Técnico Superior Universitario en Informática',
    centro: 'Instituto Universitario Jesús Obrero (IUJO), Barquisimeto',
    años: '2019 — 2023',
    estado: 'egresado' as const,
  },
  {
    titulo: 'Bachiller en Ciencias',
    centro: 'U.E.A.M. «Libertador»',
    años: '2012 — 2017',
    estado: 'egresado' as const,
  },
]

export const certificaciones = [
  { titulo: 'Maze Funnels', detalle: 'Customer journey · Ads Manager · pipelines · adquisición de clientes' },
  { titulo: 'Instituto Universitario Jesús Obrero', detalle: 'Marketing digital' },
  { titulo: 'Centro ART', detalle: 'Edición de material audiovisual y diseño gráfico' },
]

export const idiomas = [
  { idioma: 'Español', nivel: 'Nativo' },
  { idioma: 'Inglés', nivel: 'Intermedio · lectura técnica fluida' },
]

/** Competencias agrupadas por función, no como nube de logos. */
export const stack = [
  {
    grupo: 'Bases de datos',
    nota: 'Su competencia más sólida',
    items: ['PostgreSQL', 'SQL', 'Modelado de esquemas', 'Migraciones versionadas', 'Permisos por columna', 'JSONB', 'pg_dump / pg_restore', 'SQLite', 'Supabase', 'Redis'],
  },
  {
    grupo: 'Lenguajes',
    nota: '',
    items: ['JavaScript', 'TypeScript', 'Node.js', 'Python', 'SQL', 'Bash', 'HTML5', 'CSS3', 'SVG'],
  },
  {
    grupo: 'Frontend',
    nota: '',
    items: ['React', 'Next.js', 'Interfaces de gestión', 'Diseño responsive', 'Componentes SVG animados', 'Optimización de conversión'],
  },
  {
    grupo: 'Backend y arquitectura',
    nota: '',
    items: ['Express', 'FastAPI', 'API REST', 'Monorepo pnpm', 'Socket.io', 'LiveKit / WebRTC', 'Aislamiento por dominio de fallo', 'Auditoría inmutable'],
  },
  {
    grupo: 'Automatización',
    nota: 'Especialista',
    items: ['n8n en modo cola', 'Máquinas de estado', 'Deduplicación', 'Debounce', 'Flujos de error', 'Sub-workflows'],
  },
  {
    grupo: 'Inteligencia artificial',
    nota: '',
    items: ['Google Vertex AI', 'Gemini 2.5', 'Anthropic Claude', 'Claude Code', 'Router + generador', 'Despliegue en modo sombra', 'Cumplimiento BAA HIPAA'],
  },
  {
    grupo: 'Integraciones',
    nota: '',
    items: ['GoHighLevel', 'Meta Conversions API', 'Telegram Bot API', 'Google Drive', 'IMAP / SMTP', 'Webhooks'],
  },
  {
    grupo: 'Infraestructura y DevOps',
    nota: '',
    items: ['Linux (Ubuntu Server)', 'Docker · Compose', 'nginx', 'certbot / TLS', 'PM2', 'Git', 'GitHub Actions', 'SSH'],
  },
  {
    grupo: 'Hosting y dominios',
    nota: '',
    items: ['Hostinger VPS', 'cPanel', 'BanaHosting', 'Namecheap', 'Cloudflare · R2', 'DNS', 'SPF · DKIM · DMARC'],
  },
  {
    grupo: 'Diseño y audiovisual',
    nota: 'Siete años',
    items: ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe Premiere Pro', 'Filmora', 'Lucidchart', 'Meta Ads Manager', 'Dirección de arte', 'Edición vertical'],
  },
]

/** Consta en su formación, sin uso en producción. Va declarado como tal. */
export const declarados = ['Java', 'JavaFX', 'PHP', 'C++', 'C#']
