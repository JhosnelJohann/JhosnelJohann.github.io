/**
 * Citas textuales de la bitácora `dev_coord.cambios` del servidor de producción.
 * Están tal y como él las escribió — son notas de trabajo, no texto de escaparate.
 * Es el material distintivo de este perfil: la terminal del hero las teclea.
 */

export interface Linea {
  fecha: string
  area: string
  texto: string
  /** El color de la leyenda que le corresponde. */
  tono: 'verde' | 'rojo' | 'amarillo' | 'azul' | 'gris'
}

export const lineas: Linea[] = [
  {
    fecha: '2026-06-23',
    area: 'n8n/workflows',
    texto:
      'Borrado wf-followup-coach-agent (activo pero 569 ejec 100% fallando: 490 crashed / 79 error / 0 éxito). Backend intacto. Backup existe.',
    tono: 'rojo',
  },
  {
    fecha: '2026-07-14',
    area: 'n8n',
    texto:
      'Fase 0: creado workflow ping INACTIVO para capturar el shape real del webhook. Descubierto: sin messageId.',
    tono: 'amarillo',
  },
  {
    fecha: '2026-07-16',
    area: 'n8n',
    texto:
      'BUG cazado en test en vivo: el clasificador IA marcó el OPENER de la landing como contratar_precio. Lección: el gate debe incluir SIEMPRE el opener.',
    tono: 'rojo',
  },
  {
    fecha: '2026-08-05',
    area: 'manhattan-app',
    texto:
      'HALLAZGO PRINCIPAL: la cadena está CORTADA después de la landing. El dato se calcula y se guarda, pero nadie lo lee.',
    tono: 'rojo',
  },
  {
    fecha: '2026-08-05',
    area: 'n8n',
    texto:
      'TRES FALLOS PROPIOS CORREGIDOS EN EL CAMINO: el certificado SOLO cubre el .pro. Cortaba la conexión y NO dejaba rastro en el log.',
    tono: 'rojo',
  },
  {
    fecha: '2026-07-08',
    area: 'crm-staging',
    texto: 'PROD INTACTA (15 usuarios, 2 294 MB, crm-api 0 reinicios; solo lectura).',
    tono: 'verde',
  },
  {
    fecha: '2026-08-12',
    area: 'infraestructura',
    texto:
      'n8n migrado de sqlite a Postgres. Corte de ~2 minutos, autorizado. Desapareció el aviso que era la causa raíz de las 3 corrupciones.',
    tono: 'verde',
  },
  {
    fecha: '2026-08-13',
    area: 'herramientas',
    texto:
      'Arnés de conformidad NIVEL 1 funcionando. En su primera ejecución encontró dos fallos en sí mismo y una deriva real.',
    tono: 'verde',
  },
  {
    fecha: '2026-08-13',
    area: 'n8n',
    texto:
      'Fase 3: el corazón determinista. VAL hace cumplir el diagrama 02 en tiempo de ejecución. 37 pruebas unitarias y 8 de validación, cero fallos.',
    tono: 'verde',
  },
  {
    fecha: '2026-07-10',
    area: 'feecorte / GHL',
    texto:
      'El workflow "Envío a Meta" NO se debe publicar: duplicaría el conteo porque genera otro event_id sin compartirlo con el Pixel.',
    tono: 'amarillo',
  },
]

/** Las cinco frases que mejor describen cómo trabaja. */
export const principios = [
  { n: '01', frase: 'Ping INACTIVO para capturar el shape real', que: 'Mira antes de asumir' },
  { n: '02', frase: 'Root cause: …', que: 'No para en el síntoma' },
  { n: '03', frase: 'TRES FALLOS PROPIOS corregidos en el camino', que: 'Documenta lo suyo' },
  { n: '04', frase: 'PROD INTACTA. Reversible con backups.', que: 'Protege producción por reflejo' },
  { n: '05', frase: 'Queda como hueco abierto', que: 'Declara lo que no resolvió' },
]

/** Las tres etapas. La numeración aquí sí significa algo: es una secuencia real. */
export const etapas = [
  {
    n: '01',
    titulo: 'Marketing, edición y diseño',
    periodo: 'jul 2025 — ene 2026',
    tono: 'gris' as const,
    texto:
      'Entra al puesto para el que fue contratado: manager de marketing, editor y diseñador. Redes de la marca, edición de vídeo vertical, piezas de campaña y Meta Ads Manager.',
    hito: 'Es la base sobre la que se construye todo lo demás.',
  },
  {
    n: '02',
    titulo: 'El VPS y el desarrollo',
    periodo: '≈ feb 2026 — jun 2026',
    tono: 'amarillo' as const,
    texto:
      'El punto de inflexión: asume la administración del servidor y empieza a desarrollar. Entre finales de marzo y mediados de abril levanta prácticamente toda la infraestructura de servicios, y aparece la primera aplicación web propia.',
    hito: 'No hay bitácora de estos meses. Solo quedan las marcas de tiempo de lo que creó.',
  },
  {
    n: '03',
    titulo: 'Ingeniería de sistemas',
    periodo: 'jun 2026 — ago 2026',
    tono: 'verde' as const,
    texto:
      'Cuatro bots en producción, una biblioteca técnica, un arnés de calidad, dos migraciones de infraestructura sin pérdida de datos y el CI/CD. Todo documentado, cambio a cambio.',
    hito: '179 registros en dos meses. Es una aceleración, no el principio.',
  },
]
