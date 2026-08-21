/**
 * El trabajo publicado.
 *
 * Las miniaturas son capturas REALES de cada sitio, tomadas en vivo el 20 de
 * agosto de 2026. Lo que se ve es lo que hay.
 *
 * Los sistemas internos (los bots, el arnés, la biblioteca) no tienen URL
 * publica y llevan portada dibujada en codigo. Se marcan como tales.
 */

export type Categoria =
  | 'Web corporativa'
  | 'Landing de captación'
  | 'Aplicación'
  | 'Automatización'
  | 'Herramienta'
  | 'Documentación'

export interface Pieza {
  id: string
  titulo: string
  categoria: Categoria
  /** URL publica. Si falta, no se enlaza. */
  url?: string
  /**
   * La URL existe pero todavia NO sirve: staging sin pasar a produccion, o
   * certificado que no cubre el dominio. Se muestra como texto, no como
   * enlace, para no mandar a nadie a un aviso de seguridad. El dia que
   * funcione, se borra esta linea y ya queda enlazada.
   */
  pendiente?: boolean
  /** Etiqueta cuando no hay enlace. */
  restringido?: string
  /** Captura real en public/trabajo/. Si falta, se dibuja la portada. */
  captura?: string
  /** Galería interior, en public/crm/. Con datos personales difuminados. */
  galeria?: { archivo: string; pie: string }[]
  /** Portada dibujada, por id, cuando no hay captura. */
  motivo?: string
  color: 'verde' | 'rojo' | 'amarillo' | 'azul' | 'gris'
  año: string
  gancho: string
  detalle: string[]
  cifras: { n: string; que: string }[]
  stack: string[]
}

export const trabajo: Pieza[] = [
  {
    id: 'crm-tadi',
    titulo: 'CRM TADI',
    categoria: 'Aplicación',
    restringido: 'Acceso restringido · sistema interno',
    captura: 'crm-tadi',
    galeria: [
      { archivo: 'crm-panel', pie: 'Panel de control con datos en vivo' },
      { archivo: 'crm-oportunidades', pie: 'Pipeline de 7 498 casos, arrastrable entre etapas' },
      { archivo: 'crm-tareas', pie: 'Tablero de tareas por vencimiento' },
      { archivo: 'crm-chat', pie: 'Chat interno con archivos y videollamada' },
      { archivo: 'crm-asistencia', pie: 'Control de jornada del equipo' },
    ],
    color: 'azul',
    año: '2026',
    gancho:
      'El CRM corporativo de la empresa. Lo construí desde cero y hoy lo usa todo el equipo, cada día.',
    detalle: [
      'Monorepo con tres aplicaciones: frontend en React y Next.js, API en Express y TypeScript, y un servicio de inteligencia artificial en Python. Seis procesos independientes en producción, con el worker de correo y el agente de seguimiento aislados a propósito para que un fallo del servidor de correo no pueda tumbar la API.',
      'Sobre PostgreSQL de 85 tablas: 7 498 oportunidades en el embudo, 3 811 contactos activos —31 622 registros de contacto en la base contando el histórico importado—, 39 032 tareas y 196 818 archivos indexados. Videollamadas propias con LiveKit, sincronización de correo y gestión documental sobre Cloudflare R2.',
      'Incluyó consolidar tres CRM heredados —Pipedrive, Bitrix24 y Zoho— en el modelo nuevo, con el sistema en uso: deduplicación entre plataformas con fusión reversible, campos personalizados sin equivalente y registro de importación por pasada.',
    ],
    cifras: [
      { n: '85', que: 'tablas' },
      { n: '7 498', que: 'oportunidades' },
      { n: '243', que: 'commits' },
    ],
    stack: ['React', 'Next.js', 'TypeScript', 'Express', 'FastAPI', 'PostgreSQL', 'LiveKit', 'Cloudflare R2'],
  },
  {
    id: 'web-corporativa',
    titulo: 'Tu Agente de Inmigración',
    categoria: 'Web corporativa',
    url: 'https://tuagentedeinmigracion.org',
    captura: 'web-corporativa',
    color: 'verde',
    año: '2026',
    gancho:
      'La web corporativa de la empresa. Next.js, servida desde el VPS que yo mismo administro.',
    detalle: [
      'El escaparate principal del negocio: servicios de trámites migratorios, prueba social y captación por WhatsApp. Construida en Next.js y desplegada con PM2 detrás de nginx, en el servidor que administro.',
      'El formulario de contacto no muere en un correo: dispara un webhook que entra en la cadena de automatización y crea el contacto en el CRM con su atribución.',
    ],
    cifras: [
      { n: 'Next.js', que: 'sobre el VPS propio' },
      { n: '+426', que: 'familias atendidas' },
    ],
    stack: ['Next.js', 'React', 'nginx', 'PM2', 'n8n'],
  },
  {
    id: 'ciudadania',
    titulo: 'Ciudadanía USA',
    categoria: 'Landing de captación',
    url: 'https://ciudadania.tuagentedeinmigracion.com',
    captura: 'ciudadania',
    color: 'amarillo',
    año: '2026',
    gancho: 'Landing del curso de ciudadanía: capta el lead y lo lleva a la agenda.',
    detalle: [
      'Página de captación con embudo completo: propuesta, prueba social, formulario de calificación y paso a la agenda comercial.',
      'La atribución publicitaria sobrevive todo el recorrido —`_fbp`, `_fbc`, UTM y `fbclid`— para que la inversión en anuncios se pueda medir de verdad.',
    ],
    cifras: [
      { n: 'Next.js 16', que: 'en producción' },
      { n: '0', que: 'reinicios del proceso' },
    ],
    stack: ['Next.js', 'React', 'PostgreSQL', 'Meta CAPI'],
  },
  {
    id: 'feedecorte',
    titulo: 'Guía del Fee de Corte',
    categoria: 'Landing de captación',
    url: 'https://feedecorte.tuagentedeinmigracion.com',
    captura: 'feedecorte',
    color: 'amarillo',
    año: '2026',
    gancho:
      'Landing con entrega de guía en PDF, conectada al asistente de WhatsApp que atiende al lead.',
    detalle: [
      'Pido el teléfono dos veces a propósito: un número mal escrito convierte un lead pagado en basura y no hay forma de recuperarlo.',
      'Al registrarse, el visitante recibe la guía como documento nativo de WhatsApp mediante plantilla aprobada, y entra en la conversación con el asistente automatizado.',
      'Añadí parámetros de vista previa para que el cliente revise la página sin que sus visitas se registren como leads ni contaminen las métricas.',
    ],
    cifras: [
      { n: '2×', que: 'confirmación de teléfono' },
      { n: '186', que: 'nodos en el bot que la atiende' },
    ],
    stack: ['Next.js', 'TypeScript', 'n8n', 'GoHighLevel', 'PostgreSQL'],
  },
  {
    id: 'link-bio',
    titulo: 'Página de enlaces',
    categoria: 'Aplicación',
    url: 'https://link.tuagentedeinmigracion.com',
    captura: 'link-bio',
    color: 'gris',
    año: '2026',
    gancho:
      'El destino del enlace de Instagram de la marca: reparte el tráfico entre servicios y canales.',
    detalle: [
      'Sitio estático servido por nginx con caché de imágenes a 30 días. Pequeño, pero es la puerta por la que entra el tráfico social de la marca.',
    ],
    cifras: [{ n: '30 d', que: 'de caché de imágenes' }],
    stack: ['HTML', 'CSS', 'nginx'],
  },
  {
    id: 'contacto-vcard',
    titulo: 'Tarjeta de contacto digital',
    categoria: 'Aplicación',
    url: 'https://contacto.tuagentedeinmigracion.com',
    captura: 'contacto-vcard',
    color: 'gris',
    año: '2026',
    gancho: 'Tarjeta de visita digital con descarga directa del contacto al teléfono.',
    detalle: [
      'Sirvo el archivo `.vcf` con el tipo MIME correcto, de forma que el móvil ofrece guardar el contacto en lugar de descargar un archivo suelto. Un detalle pequeño que decide si funciona o no.',
    ],
    cifras: [{ n: 'vCard', que: 'con MIME correcto' }],
    stack: ['HTML', 'CSS', 'nginx'],
  },
  {
    id: 'paula-manhattan',
    titulo: 'Asistentes de WhatsApp «Paula»',
    categoria: 'Automatización',
    restringido: 'Sistema interno · sin interfaz pública',
    /* Antes llevaba portada dibujada porque las capturas de la operación
       exponían datos de clientes. Estas son lienzos de flujo: no muestran
       ni un nombre ni una conversación. */
    captura: 'n8n-setter',
    galeria: [
      { archivo: 'n8n-setter', pie: 'El agente con sus herramientas y las cinco salidas al CRM' },
      { archivo: 'n8n-seguros-inbound', pie: 'Entrada, corte de cadencia, cortesía y aviso al operador' },
      { archivo: 'n8n-paula-manhattan', pie: 'El conversacional de Manhattan, publicado' },
      { archivo: 'n8n-seguimiento-scan', pie: 'La sonda de seguimiento, cada 15 minutos' },
      { archivo: 'n8n-extra', pie: 'Uno de los flujos de apoyo' },
    ],
    color: 'verde',
    año: '2026',
    gancho:
      'Cuatro asistentes que atienden, califican y agendan leads. Siete flujos siguen activos en producción.',
    detalle: [
      'La máquina de estados no vive en el código: vive en la base de datos, con clave foránea, de forma que un paso que no está en el diseño no se puede ni escribir.',
      'La capa de inteligencia artificial es híbrida y convive con un guion determinista: un modelo barato clasifica, uno mejor redacta, y la lógica de negocio nunca vive en el prompt. Salió en modo sombra —corriendo en paralelo sin poder actuar— hasta tener datos de si acertaba.',
      'Si la IA falla o se agota la cuota, el bot sigue funcionando con el guion. Verificado en 10 de 10 casos.',
    ],
    cifras: [
      { n: '7', que: 'flujos activos' },
      { n: '13 / 25', que: 'pasos y transiciones' },
      { n: '37 + 8', que: 'pruebas, cero fallos' },
    ],
    stack: ['n8n', 'PostgreSQL', 'Vertex AI', 'Gemini 2.5', 'GoHighLevel'],
  },
  {
    id: 'ghl',
    titulo: 'Automatización en GoHighLevel',
    categoria: 'Automatización',
    restringido: 'CRM comercial · acceso restringido',
    captura: 'ghl-sistema-ventas',
    galeria: [
      { archivo: 'ghl-sistema-ventas', pie: 'Sistema de ventas: tres disparadores y nueve ramas por etapa' },
      { archivo: 'ghl-seguimientos', pie: 'Sistema de seguimientos, con limpieza previa en cada rama' },
      { archivo: 'ghl-puente-n8n', pie: 'El puente a n8n, ya publicado y filtrado por etiqueta' },
      { archivo: 'ghl-envio-api', pie: 'Envío del evento de conversión a la API de Meta' },
      { archivo: 'ghl-membresia-bot', pie: 'De la landing de membresía al bot y al pipeline' },
      { archivo: 'ghl-extra-1', pie: 'Otro de los flujos en producción' },
      { archivo: 'ghl-extra-2', pie: 'Otro de los flujos en producción' },
    ],
    color: 'azul',
    año: '2026',
    gancho:
      'La capa comercial que conecta los anuncios, los bots y el equipo humano. 22 endpoints usados y 12 flujos de n8n colgando de ella.',
    detalle: [
      'Las etiquetas del contacto no son categorías: son el motor. Alguien del equipo pone una etiqueta desde el panel y eso dispara un webhook que activa un plan de pagos, genera ocho cuotas y desbloquea el acceso a un curso. Es una interfaz de operación para gente que no toca código.',
      'El puente hacia los bots tardó en encenderse por una asimetría difícil de ver: los mensajes salían por un proveedor externo y entraban como SMS de proveedor personalizado, no como WhatsApp, así que el disparador nunca se activaba. Se resolvió capturando un envío real en lugar de suponer la correspondencia entre el vocabulario de la interfaz y el de la API.',
      'El disparador del puente estaba sin filtros y acumuló 1 197 ejecuciones de pago, muchas por mensajes que no había que procesar. Filtrarlo por etiqueta es la diferencia entre una integración y una factura.',
      'Su límite de peticiones obligó a construir un portero propio en Node, Express y Redis, que encola y prioriza: lo que responde a un cliente pasa siempre; los sondeos esperan.',
    ],
    cifras: [
      { n: '22', que: 'endpoints usados' },
      { n: '12', que: 'flujos de n8n conectados' },
      { n: '17', que: 'webhooks de entrada' },
    ],
    stack: ['GoHighLevel', 'n8n', 'Meta CAPI', 'Node.js', 'Redis', 'PostgreSQL'],
  },
  {
    id: 'arnes',
    titulo: 'Arnés de conformidad',
    categoria: 'Herramienta',
    restringido: 'Herramienta interna de calidad',
    motivo: 'arnes',
    color: 'rojo',
    año: '2026',
    gancho:
      'Comprueba sola que el software que construyo cumple su diagrama de diseño, en tres direcciones.',
    detalle: [
      'Caja sin nodo (se diseñó y no se construyó), nodo sin caja (se construyó y no está en el diseño) y arista sin conexión (la ruta del diagrama no existe). Sale con código distinto de cero si divergen, así que se integra en un pipeline.',
      'La validé rompiéndola a propósito en cuatro modos de fallo, porque un control que nunca ha fallado no está validado: está sin estrenar. En su primera ejecución encontró dos fallos en sí misma y una desviación real.',
    ],
    cifras: [
      { n: '3', que: 'direcciones' },
      { n: '4', que: 'modos de fallo probados' },
    ],
    stack: ['Python', 'JSON', 'CI'],
  },
  {
    id: 'medicare',
    titulo: 'Cuestionario Medicare',
    categoria: 'Landing de captación',
    url: 'https://juanmanueltuagente.com',
    pendiente: true,
    restringido: 'Pendiente de pasar a producción',
    captura: 'medicare',
    galeria: [
      { archivo: 'medicare-1', pie: 'Apertura: agente licenciado, dos minutos, sin compromiso' },
      { archivo: 'medicare-3', pie: 'Pregunta 1 de 11 — condiciones de salud' },
      { archivo: 'medicare-2', pie: 'Los tres pasos y el aviso legal obligatorio de Medicare' },
    ],
    color: 'amarillo',
    año: '2026',
    gancho:
      'Cuestionario de once preguntas sobre un catálogo de 207 planes, con geocodificación de código postal a condado.',
    detalle: [
      'Once preguntas con lógica de calificación sobre 18 tablas y 207 planes cargados, y geocodificación de código postal a condado para saber qué aplica en cada área.',
      'La validación de código postal tiene tres estados, no dos: válido, inexistente y no verificable. En el tercero dejo pasar al usuario. Si el geocodificador se cae, el formulario no bloquea — la alternativa cómoda habría perdido leads en silencio.',
      'El avatar del cuestionario es un componente SVG que escribí a mano, unos 7 KB, donde cada pieza es un nodo animable y sin una sola petición externa.',
    ],
    cifras: [
      { n: '18', que: 'tablas · 207 planes' },
      { n: '11', que: 'preguntas' },
      { n: '7 KB', que: 'el avatar SVG' },
    ],
    stack: ['Next.js', 'TypeScript', 'React', 'PostgreSQL', 'SVG', 'Meta CAPI'],
  },
  {
    id: 'manhattan',
    titulo: 'ManhattanLife',
    categoria: 'Landing de captación',
    url: 'https://juanmanueltuagente.com',
    pendiente: true,
    restringido: 'Pendiente de pasar a producción',
    captura: 'manhattan',
    galeria: [
      { archivo: 'manhattan-1', pie: 'Apertura: «déjame conocer tu caso» antes de recomendar nada' },
      { archivo: 'manhattan-3', pie: 'Licencia de Florida verificable — no una promesa' },
      { archivo: 'manhattan-4', pie: 'Cuestionario de calificación, paso a paso' },
      { archivo: 'manhattan-2', pie: 'Cómo funciona, en tres pasos' },
    ],
    color: 'amarillo',
    año: '2026',
    gancho:
      'Landing y cuestionario de seguros de salud, construidos en tres días y conectados al asistente que atiende al lead.',
    detalle: [
      'Landing, cuestionario y avatar SVG animado en tres días, con auditoría responsive verificada a 320, 390 y 1280 píxeles hasta quedar limpia.',
      'Las reseñas de Google van dentro de un modal en lugar de enlazar fuera: el visitante ve la prueba social y no abandona la página que la empresa acaba de pagar.',
      'Terminada la landing fui a mirar qué pasaba después del formulario, y encontré dos cosas que nadie me había pedido revisar: la cadena estaba cortada —los datos llegaban a la base y ahí se quedaban— y una purga automática borraba a las 72 horas los registros sin procesar. Cualquier lead que entrara un viernes desaparecía el lunes.',
    ],
    cifras: [
      { n: '3', que: 'días de construcción' },
      { n: '16', que: 'tablas' },
      { n: '19', que: 'banderas SVG a mano' },
    ],
    stack: ['Next.js', 'TypeScript', 'React', 'PostgreSQL', 'SVG', 'Meta CAPI'],
  },
  {
    id: 'infraestructura',
    titulo: 'Infraestructura y DevOps',
    categoria: 'Herramienta',
    restringido: 'Servidor de producción',
    motivo: 'infraestructura',
    color: 'rojo',
    año: '2026',
    gancho:
      'Administro el servidor donde vive todo lo anterior. Dos migraciones críticas, sin pérdida de datos.',
    detalle: [
      'Ubuntu Server con 29 contenedores, 19 procesos y 22 dominios con certificado. nginx como proxy inverso, PM2 para los procesos Node, certbot para el TLS.',
      'Migré n8n de SQLite a PostgreSQL con dos minutos de corte: no reparé la tercera corrupción, eliminé su causa. Y moví el control de versiones de Gitea autoalojado a GitHub, con CI/CD nuevo.',
      'El diagnóstico del que más orgulloso estoy: nginx respondía en dos dominios pero el certificado solo cubría uno. La plataforma externa validaba TLS, cortaba la conexión y no dejaba rastro en ningún registro. Ése era el motivo real de que 54 ejecuciones no llegaran nunca.',
    ],
    cifras: [
      { n: '29', que: 'contenedores' },
      { n: '22', que: 'dominios con TLS' },
      { n: '2 min', que: 'de corte en la migración' },
    ],
    stack: ['Ubuntu', 'Docker', 'nginx', 'certbot', 'PM2', 'GitHub Actions'],
  },
  {
    id: 'biblioteca',
    titulo: 'Biblioteca de ingeniería n8n',
    categoria: 'Documentación',
    restringido: 'Documentación interna',
    motivo: 'biblioteca',
    color: 'gris',
    año: '2026',
    gancho:
      '18 documentos técnicos sometidos a un verificador cuyo trabajo era refutar sus propias conclusiones.',
    detalle: [
      'Unos 600 KB de documentación con 231 fuentes citadas, que escribí con investigación multi-agente. Puse un verificador adversarial a refutar mis propias conclusiones: tumbó cinco afirmaciones antes de que las publicara, incluida una deprecación que yo había dado por cierta.',
      'En el documento más ambicioso revisé 107 agentes conversacionales y 25 fuentes primarias para decidir la arquitectura del bot, y dejé anotado el marco de cumplimiento aplicable: la política de WhatsApp sobre asistentes abiertos y el precedente de responsabilidad de la empresa por lo que diga su bot.',
    ],
    cifras: [
      { n: '18', que: 'documentos' },
      { n: '231', que: 'fuentes' },
      { n: '5', que: 'afirmaciones refutadas' },
    ],
    stack: ['Investigación multi-agente', 'Verificación adversarial'],
  },
]

export const categorias: Categoria[] = [
  'Web corporativa',
  'Landing de captación',
  'Aplicación',
  'Automatización',
  'Herramienta',
  'Documentación',
]
