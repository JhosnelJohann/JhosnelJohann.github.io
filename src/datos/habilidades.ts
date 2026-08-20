/**
 * Niveles de dominio, en dos paneles.
 *
 * La barra representa un nivel declarado, NO un porcentaje inventado. El nivel
 * va escrito al lado, y sale de la evaluación técnica del expediente, donde
 * cada uno está respaldado por trabajo fechado:
 *
 *   Avanzado        lo diseñé, lo llevé a producción y resolví fallos no evidentes
 *   Intermedio-alto trabajo con autonomía en producción
 *   Intermedio      lo uso con soltura para lo que necesito
 *   Formación       consta en mis estudios, sin uso en producción
 */

export type Nivel = 'Avanzado' | 'Intermedio-alto' | 'Intermedio' | 'Formación'

export const ANCHO_NIVEL: Record<Nivel, number> = {
  Avanzado: 92,
  'Intermedio-alto': 74,
  Intermedio: 56,
  Formación: 28,
}

export interface Habilidad {
  nombre: string
  nivel: Nivel
  /** Qué respalda ese nivel. Se ve al pasar por encima. */
  nota?: string
}

export interface Panel {
  clave: string
  titulo: string
  intro: string
  color: 'azul' | 'amarillo'
  bloques: { grupo: string; items: Habilidad[] }[]
}

export const paneles: Panel[] = [
  {
    clave: 'desarrollo',
    titulo: 'Programación e infraestructura',
    intro:
      'Siete de estas competencias no estaban en mi repertorio en julio de 2025. La ruta fue: ' +
      'landing pages → automatización → bases de datos → arquitectura de sistemas → IA aplicada.',
    color: 'azul',
    bloques: [
      {
        grupo: 'Lenguajes',
        items: [
          { nombre: 'SQL', nivel: 'Avanzado', nota: 'DDL de cinco esquemas, migraciones, permisos por columna, upserts, JSONB' },
          { nombre: 'JavaScript · Node.js', nivel: 'Avanzado', nota: 'Toda la lógica de los asistentes y el backend del CRM' },
          { nombre: 'TypeScript', nivel: 'Intermedio-alto', nota: 'Frontend y API del CRM, landings, scripts de mantenimiento' },
          { nombre: 'Python', nivel: 'Intermedio', nota: 'Arnés de conformidad y el servicio de IA en FastAPI' },
          { nombre: 'HTML5 · CSS3', nivel: 'Avanzado', nota: 'Responsive verificado a 320, 390 y 1280 px' },
          { nombre: 'SVG', nivel: 'Avanzado', nota: 'Componentes vectoriales animados escritos a mano, no exportados' },
          { nombre: 'Bash', nivel: 'Intermedio', nota: 'Scripts de verificación con comprobación de precondiciones' },
        ],
      },
      {
        grupo: 'Bases de datos',
        items: [
          { nombre: 'PostgreSQL', nivel: 'Avanzado', nota: '131 tablas diseñadas · migración de motor sin pérdida de datos' },
          { nombre: 'Modelado y migraciones', nivel: 'Avanzado', nota: 'Numeradas, idempotentes, con su tabla de control' },
          { nombre: 'Supabase', nivel: 'Intermedio', nota: 'Plataforma autoalojada completa' },
          { nombre: 'Redis', nivel: 'Intermedio', nota: 'Cola de trabajos del modo escalado' },
        ],
      },
      {
        grupo: 'Frontend y backend',
        items: [
          { nombre: 'React', nivel: 'Intermedio-alto', nota: 'Interfaz completa de CRM y landings de conversión' },
          { nombre: 'Next.js', nivel: 'Intermedio-alto', nota: 'App Router y modo standalone, en cuatro aplicaciones' },
          { nombre: 'Express', nivel: 'Intermedio-alto', nota: 'La API del CRM, con autorización verificada en servidor' },
          { nombre: 'FastAPI', nivel: 'Intermedio', nota: 'Servicio de IA aislado del resto' },
        ],
      },
      {
        grupo: 'Automatización e integración',
        items: [
          { nombre: 'n8n', nivel: 'Avanzado', nota: 'Modo cola, sub-flujos, máquinas de estado, flujos de error' },
          { nombre: 'GoHighLevel', nivel: 'Avanzado', nota: 'API completa, plantillas de WhatsApp, gestión de cuota' },
          { nombre: 'Meta Conversions API', nivel: 'Avanzado', nota: 'Deduplicación por event_id y hasheo SHA-256' },
          { nombre: 'APIs REST y webhooks', nivel: 'Avanzado', nota: 'Con reintentos, deduplicación y manejo de errores' },
        ],
      },
      {
        grupo: 'Inteligencia artificial',
        items: [
          { nombre: 'Claude Code', nivel: 'Avanzado', nota: 'Con ella construí el CRM entero, bajo método de plan y auditoría' },
          { nombre: 'Google Vertex AI · Gemini', nivel: 'Intermedio-alto', nota: 'Router + generador, con BAA HIPAA aceptado' },
          { nombre: 'Despliegue en modo sombra', nivel: 'Intermedio-alto', nota: 'La IA corre sin actuar hasta tener datos de si acierta' },
        ],
      },
      {
        grupo: 'Infraestructura y DevOps',
        items: [
          { nombre: 'Linux · Ubuntu Server', nivel: 'Intermedio', nota: '29 contenedores, 19 procesos, 22 dominios' },
          { nombre: 'Docker · Compose', nivel: 'Intermedio', nota: 'Con versiones fijadas, redes y volúmenes' },
          { nombre: 'nginx · certbot', nivel: 'Intermedio', nota: 'Proxy inverso y TLS, con diagnóstico de fallos de cobertura' },
          { nombre: 'Git · GitHub Actions', nivel: 'Intermedio-alto', nota: 'CI/CD con despliegue por SSH y bloqueo de concurrencia' },
          { nombre: 'cPanel · DNS · SPF/DKIM', nivel: 'Intermedio', nota: 'Dominios y correo en BanaHosting, Namecheap y Cloudflare' },
        ],
      },
      {
        grupo: 'De mi formación, sin uso en producción',
        items: [
          { nombre: 'Java', nivel: 'Formación' },
          { nombre: 'JavaFX', nivel: 'Formación' },
          { nombre: 'PHP', nivel: 'Formación' },
          { nombre: 'C++', nivel: 'Formación' },
          { nombre: 'C#', nivel: 'Formación' },
        ],
      },
    ],
  },
  {
    clave: 'diseno',
    titulo: 'Diseño gráfico y edición',
    intro:
      'Es de donde vengo, y llevo siete años en ello. No lo he dejado: es la razón de que entienda ' +
      'el embudo comercial completo y no solo el código que lo sostiene.',
    color: 'amarillo',
    bloques: [
      {
        grupo: 'Diseño gráfico',
        items: [
          { nombre: 'Adobe Photoshop', nivel: 'Avanzado', nota: 'Composición, retoque y montaje de producto desde 2019' },
          { nombre: 'Adobe Illustrator', nivel: 'Avanzado', nota: 'Identidad de marca, vectorización, sistemas gráficos' },
          { nombre: 'Dirección de arte', nivel: 'Avanzado', nota: 'Siete marcas, con sistema gráfico propio para cada una' },
          { nombre: 'Sistemas de marca', nivel: 'Avanzado', nota: 'Paleta, tipografía y aplicación en catálogo y campaña' },
          { nombre: 'Diseño para bordado', nivel: 'Intermedio', nota: 'Digitalización del boceto al archivo de producción' },
        ],
      },
      {
        grupo: 'Edición audiovisual',
        items: [
          { nombre: 'Adobe Premiere Pro', nivel: 'Avanzado', nota: 'Edición de vídeo vertical para redes, con guion' },
          { nombre: 'Wondershare Filmora', nivel: 'Avanzado', nota: 'Edición ágil de piezas cortas y contenido de canal' },
          { nombre: 'Guion y publicación', nivel: 'Avanzado', nota: 'Del guion a la publicación, para Instagram y YouTube' },
          { nombre: 'Fotografía de producto', nivel: 'Intermedio-alto', nota: 'Campañas de moda y catálogo automotriz' },
        ],
      },
      {
        grupo: 'Marketing y medición',
        items: [
          { nombre: 'Meta Ads Manager', nivel: 'Avanzado', nota: 'Montaje de campañas y lectura de resultados' },
          { nombre: 'Atribución publicitaria', nivel: 'Avanzado', nota: 'Píxel + CAPI con deduplicación; evité un doble conteo real' },
          { nombre: 'Embudos de conversión', nivel: 'Avanzado', nota: 'Certificación Maze Funnels · del anuncio al CRM' },
          { nombre: 'Lucidchart · diagramación', nivel: 'Avanzado', nota: '26 diagramas con leyenda y convenciones escritas' },
        ],
      },
    ],
  },
]
