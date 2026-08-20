/**
 * Los nueve proyectos.
 *
 * `color` no es decorativo: es el color que ese tipo de trabajo tiene en la
 * leyenda de sus propios diagramas.
 *   verde = camino feliz · rojo = fallo · amarillo = espera/humano
 *   azul  = sistema externo · gris = persistencia
 */

export type Legenda = 'verde' | 'rojo' | 'amarillo' | 'azul' | 'gris'
export type Disciplina =
  | 'Full-stack'
  | 'Automatización'
  | 'Bases de datos'
  | 'Calidad'
  | 'Infraestructura'
  | 'Documentación'
  | 'Diseño'

export interface Proyecto {
  id: string
  titulo: string
  distintivo?: string
  año: string
  disciplinas: Disciplina[]
  color: Legenda
  /** Una línea. Lo que se lee en la tarjeta. */
  gancho: string
  /** Cifras para la portada. Máximo cuatro. */
  cifras: { n: string; que: string }[]
  /** El cuerpo de la ficha, en párrafos. */
  cuerpo: string[]
  /** Lo que enseñar de este proyecto en una entrevista. */
  enseñar: string[]
  stack: string[]
  /** Cita textual de su bitácora, si la hay. */
  cita?: { texto: string; fecha: string }
}

export const proyectos: Proyecto[] = [
  {
    id: 'crm-tadi',
    titulo: 'CRM TADI',
    distintivo: 'El más grande',
    año: '2026',
    disciplinas: ['Full-stack', 'Bases de datos'],
    color: 'azul',
    gancho:
      'Un CRM de empresa completo, construido desde cero. Hoy lo usa el equipo todos los días para trabajar.',
    cifras: [
      { n: '85', que: 'tablas' },
      { n: '31 622', que: 'contactos reales' },
      { n: '243', que: 'commits' },
      { n: '6', que: 'procesos en producción' },
    ],
    cuerpo: [
      'Un CRM parece «una base de datos con formularios» hasta que se construye uno. Éste tiene 85 tablas, 31 622 contactos reales, 7 491 oportunidades, 39 032 tareas, 75 686 mensajes de chat, 9 543 correos sincronizados y 196 818 archivos indexados. Y seis procesos independientes en producción, no uno.',
      'El aislamiento de esos procesos es una decisión de arquitectura, no un accidente: el worker de correo y el agente de seguimiento corren aparte, con el motivo escrito en el propio código — «un flap del mailserver NO puede tumbar crm-api».',
      'Se desarrolló dirigiendo el trabajo con Claude Code bajo un método propio: plan con causa raíz citando archivo:línea → entrega por etapas → auditoría sobre el diff crudo → veredicto explícito. Sin luz verde no hay push; el agente no hace push, ni merge, ni migraciones.',
      'La parte que menos se ve y más difícil es: consolidar los datos de tres CRM heredados —Pipedrive, Bitrix24 y Zoho— en un modelo nuevo, con el sistema en uso. Modelos que no se traducen uno a uno, los mismos clientes repetidos en tres sistemas con el teléfono escrito de tres formas, y campos personalizados sin equivalente. Se resolvió con fusión reversible y registro de la unión, registro de importación por pasada, y archivado lógico en vez de borrado.',
    ],
    enseñar: [
      'La escala: no es un proyecto de portafolio, es un sistema del que depende una empresa.',
      'La arquitectura de procesos aislados — entiende los modos de fallo, no solo el camino feliz.',
      'La autorización verificada en el servidor contra la base de datos, no por el token ni por la interfaz.',
      'La migración de tres CRM heredados: datos ajenos, sucios y duplicados. La situación real de cualquier empresa.',
    ],
    stack: ['React', 'Next.js', 'TypeScript', 'Express', 'FastAPI', 'PostgreSQL', 'LiveKit', 'Socket.io', 'Cloudflare R2'],
  },
  {
    id: 'arnes',
    titulo: 'Arnés de conformidad',
    distintivo: 'El más original',
    año: '2026',
    disciplinas: ['Calidad'],
    color: 'rojo',
    gancho:
      'Una herramienta cuyo único trabajo es encontrar sus propios errores: comprueba que el software cumple su diagrama de diseño.',
    cifras: [
      { n: '3', que: 'direcciones de comprobación' },
      { n: '4', que: 'modos de fallo validados' },
      { n: '2+1', que: 'fallos hallados en su 1ª ejecución' },
    ],
    cuerpo: [
      'Un diagrama que nadie mantiene es peor que no tener diagrama: da confianza falsa. Este arnés en Python compara el diagrama de diseño contra el flujo realmente implementado, en tres direcciones: caja sin nodo (se diseñó y no se construyó), nodo sin caja (se construyó y no está en el diseño) y arista sin conexión (la ruta del diagrama no existe).',
      'Lo validó rompiéndolo a propósito en cuatro modos de fallo distintos, porque un control que nunca ha fallado no está validado: está sin estrenar.',
      'En su primera ejecución encontró dos fallos en el propio arnés y una deriva real — la arista B1→B2, rota al insertar dos nodos nuevos sin reencaminarla. Sale con código distinto de cero, así que se integra en un pipeline.',
    ],
    enseñar: [
      'Casi nadie con trece meses de experiencia construye una herramienta cuyo fin es encontrar sus propios errores.',
      'Las pruebas negativas: romper el control a propósito para comprobar que sabe ponerse en rojo.',
      'Hace que los diagramas no puedan envejecer en silencio. Es documentación que se comprueba sola.',
    ],
    stack: ['Python', 'JSON', 'Códigos de salida', 'CI'],
    cita: {
      texto:
        'En su primera ejecución encontró dos fallos en sí mismo y una deriva real (la arista B1→B2, rota al insertar NORM y DIR sin reencaminarla).',
      fecha: '13 ago 2026',
    },
  },
  {
    id: 'paula-manhattan',
    titulo: 'Bot Paula — ManhattanLife',
    distintivo: 'El más completo',
    año: '2026',
    disciplinas: ['Automatización', 'Bases de datos'],
    color: 'verde',
    gancho:
      'Asistente de WhatsApp que atiende, califica y agenda leads de seguros de salud. Siete flujos activos en producción.',
    cifras: [
      { n: '7', que: 'flujos activos' },
      { n: '13 / 25', que: 'pasos y transiciones' },
      { n: '37 + 8', que: 'pruebas, cero fallos' },
    ],
    cuerpo: [
      'La máquina de estados no vive en el código: vive en la base de datos. Las tablas paula_pasos y paula_transiciones, con clave foránea desde el estado, hacen que un paso que no está en el diseño no se pueda ni escribir.',
      'La capa de IA es híbrida y convive con un guion determinista: un clasificador barato decide, un redactor mejor escribe, y la lógica de negocio nunca vive en el prompt. Salió en modo sombra —corriendo en paralelo sin capacidad de actuar— hasta tener datos de si acertaba. Si la IA falla o se agota la cuota, el bot sigue funcionando: fail-open, probado 10 de 10.',
      'El modelo de datos tiene permisos columna por columna: el sistema automatizado no puede leer las respuestas de salud, ni el motivo de no calificar, ni los consentimientos. Y no tiene DELETE en ninguna tabla.',
    ],
    enseñar: [
      'La máquina de estados persistida como filas, con integridad referencial.',
      'El modo sombra: cómo se despliega IA sin apostar el negocio a que acierte.',
      'Los permisos por columna sobre datos de salud — criterio de cumplimiento, no solo técnico.',
    ],
    stack: ['n8n', 'PostgreSQL', 'Vertex AI', 'Gemini 2.5', 'GoHighLevel', 'Telegram'],
    cita: {
      texto:
        'HALLAZGO CRÍTICO en la prueba V-1: el canal de envío estaba equivocado. Los leads viven en un proveedor externo de WhatsApp, no en el nativo de GHL, así que TODO mensaje de Paula habría fallado. Además, GHL devuelve 200 con messageId y marca failed después: aceptado no es entregado.',
      fecha: '13 ago 2026',
    },
  },
  {
    id: 'paula-feecorte',
    titulo: 'Bot Paula — Fee de Corte',
    distintivo: 'El primero entero',
    año: '2026',
    disciplinas: ['Automatización'],
    color: 'verde',
    gancho:
      'Ocho versiones en producción en dos días, y la lección de ingeniería mejor documentada del año.',
    cifras: [
      { n: '186', que: 'nodos' },
      { n: '8', que: 'versiones en 2 días' },
      { n: '0', que: 'dependencia de la IA para funcionar' },
    ],
    cuerpo: [
      'Antes de construir nada creó un flujo ping INACTIVO cuyo único trabajo era capturar la forma real del webhook. Así descubrió que el mensaje no traía identificador — el dato sobre el que se construye la deduplicación. Asumirlo habría costado días.',
      'El 16 de julio pasó de 117 a 136 nodos en ocho versiones. Entró la capa de IA, se migró de Claude a Gemini sobre la marcha cuando se agotaron los créditos, y en una prueba en vivo cazó al clasificador marcando el mensaje de apertura estándar de la landing como «quiere contratar», saltándose el saludo.',
      'La corrección y la lección quedaron escritas el mismo día: el filtro debe incluir siempre el primer mensaje.',
    ],
    enseñar: [
      'La Fase 0: observar la realidad antes de asumirla.',
      'El fail-open: montó la IA y comprobó que sin IA el bot funcionaba igual.',
      'Anotó una limitación de su propio trabajo que nadie más había visto.',
    ],
    stack: ['n8n', 'PostgreSQL', 'Gemini', 'Anthropic Claude', 'GoHighLevel'],
    cita: {
      texto:
        'BUG cazado en test en vivo: el clasificador IA marcó el OPENER estándar de la landing como contratar_precio → H1 inmediato sin saludo. Lección: el gate debe incluir SIEMPRE el opener.',
      fecha: '16 jul 2026',
    },
  },
  {
    id: 'biblioteca',
    titulo: 'Biblioteca de ingeniería n8n',
    año: '2026',
    disciplinas: ['Documentación'],
    color: 'gris',
    gancho:
      '18 documentos técnicos con un verificador cuyo trabajo era refutar sus propias conclusiones. Refutó cinco.',
    cifras: [
      { n: '18', que: 'documentos' },
      { n: '231', que: 'fuentes citadas' },
      { n: '5', que: 'afirmaciones refutadas' },
    ],
    cuerpo: [
      'Unos 600 KB de documentación técnica generada con investigación multi-agente. Lo interesante no es el volumen: es que sometió sus propias conclusiones a un verificador adversarial, que refutó cinco afirmaciones antes de publicarlas — incluida una deprecación que él había dado por cierta.',
      'El documento 14 revisó 107 agentes conversacionales y 25 fuentes primarias para decidir la arquitectura del bot. Veredicto: híbrido, no agente autónomo total; lógica de negocio en código, nunca en el prompt. Y no se quedó en lo técnico: dejó anotado que WhatsApp prohíbe los asistentes abiertos desde enero de 2026 y el precedente de Air Canada sobre la responsabilidad de la empresa por lo que diga su bot.',
      'Desde el primer registro distingue qué está verificado y qué es solo investigación.',
    ],
    enseñar: [
      'La verificación adversarial: poner a alguien a refutar lo que acabas de escribir.',
      'Consideró la responsabilidad legal de la empresa sin que se lo pidieran.',
      'Hoy es la referencia que usa el equipo para construir automatizaciones robustas.',
    ],
    stack: ['Investigación multi-agente', 'Markdown', 'Verificación adversarial'],
  },
  {
    id: 'infraestructura',
    titulo: 'Infraestructura y DevOps',
    año: '2026',
    disciplinas: ['Infraestructura'],
    color: 'rojo',
    gancho:
      'Dos migraciones críticas sin pérdida de datos, y el diagnóstico de un fallo que no dejaba rastro en ningún registro.',
    cifras: [
      { n: '29', que: 'contenedores' },
      { n: '22', que: 'dominios con TLS' },
      { n: '2 min', que: 'de corte en la migración' },
    ],
    cuerpo: [
      'Migró n8n de SQLite a PostgreSQL con dos minutos de corte planificado. No reparó la tercera corrupción: eliminó su causa. Veinte flujos y once credenciales importados y verificados.',
      'Migró el control de versiones de Gitea autoalojado a GitHub con organización privada, y montó el CI/CD con GitHub Actions: despliegue automático a staging al integrar y a producción al aprobar, con bloqueo de concurrencia.',
      'Y el diagnóstico del año: nginx respondía en dos dominios pero el certificado TLS solo cubría uno. GoHighLevel validaba TLS, cortaba la conexión y no dejaba rastro en el log. Ése era el motivo real de que 54 ejecuciones no llegaran nunca.',
    ],
    enseñar: [
      'Eliminar la causa raíz en vez de reparar el síntoma por tercera vez.',
      'Encontrar un fallo que no aparece en ningún registro.',
      'Protege producción por reflejo: «PROD INTACTA. Reversible con backups.»',
    ],
    stack: ['Ubuntu', 'Docker', 'nginx', 'certbot', 'PM2', 'GitHub Actions', 'Redis'],
    cita: {
      texto:
        'El certificado SOLO cubre el .pro. GHL valida TLS, cortaba la conexión y NO dejaba rastro en el log. Ese fue el motivo real de que las 54 primeras ejecuciones no llegaran nunca.',
      fecha: '5 ago 2026',
    },
  },
  {
    id: 'landings',
    titulo: 'Landings y apps de captación',
    año: '2026',
    disciplinas: ['Full-stack', 'Diseño'],
    color: 'amarillo',
    gancho:
      'Tres aplicaciones Next.js donde se juntan sus dos mitades: el que sabe de conversión y el que sabe de bases de datos.',
    cifras: [
      { n: '18', que: 'tablas · 207 planes' },
      { n: '8', que: 'pasos de cuestionario' },
      { n: '7 KB', que: 'el avatar SVG, a mano' },
    ],
    cuerpo: [
      'La validación de código postal tiene tres estados, no dos: válido, inexistente y no verificable. Y en el tercero deja pasar al usuario. Si el geocodificador se cae, el formulario no bloquea. La alternativa cómoda —tratar «no pude comprobarlo» como «no es válido»— habría perdido leads en silencio, que es la peor forma de perderlos.',
      'El avatar del cuestionario es un componente SVG escrito a mano, no una imagen: unos 7 KB donde cada pieza es un nodo animable, sin peticiones externas. También escribió a mano el logo de Google, una cruz médica y 19 banderas, después de detectar que los emoji de bandera no renderizan en Windows.',
      'Y las reseñas de Google van dentro de un modal en lugar de enlazar fuera, para no regalar el visitante que se acaba de pagar. Eso no es una decisión de programador: es de alguien que ha comprado anuncios.',
    ],
    enseñar: [
      'El tercer estado de la validación: piensa en modos de fallo, no solo en el camino feliz.',
      'El SVG escrito a mano — entiende el formato, no solo exportarlo.',
      'La atribución completa del anuncio al CRM, que es donde su pasado de marketing se vuelve ventaja técnica.',
    ],
    stack: ['Next.js', 'TypeScript', 'React', 'PostgreSQL', 'SVG', 'Meta CAPI'],
  },
  {
    id: 'diagramacion',
    titulo: 'Diagramación técnica',
    año: '2026',
    disciplinas: ['Documentación', 'Diseño'],
    color: 'amarillo',
    gancho:
      '26 diagramas con convenciones escritas, donde el color responde a una pregunta. Es la paleta de esta misma web.',
    cifras: [
      { n: '26', que: 'diagramas' },
      { n: '5', que: 'colores con significado' },
      { n: '00→90', que: 'de panorámica a archivo' },
    ],
    cuerpo: [
      'Lo que distingue este trabajo no son los 26 diagramas: es que tienen convenciones escritas. Numeración de vista general a detalle (00 panorámica, 10 dominio, 20 flujo, 30 detalle, 90 archivo), leyenda dentro del propio diagrama para que siga siendo legible al exportarlo, y una carpeta de versiones superadas para que nadie trabaje sobre un diagrama viejo sin saberlo.',
      'El color no decora: verde es el camino feliz, rojo el fallo, amarillo la espera o la intervención humana, azul un sistema externo, gris donde se escribe en la base de datos. Ver un diagrama con mucho azul dice «esto depende de terceros». Ver poco rojo dice «no hemos pensado en los fallos».',
      'Y al dibujar el sub-flujo de envío en nueve nodos apareció una condición de carrera que el código no delataba. Los diagramas hacen trabajo real.',
    ],
    enseñar: [
      'Definir qué significa cada color y mantenerlo en 26 diagramas.',
      'Dibujar el sistema le hizo encontrar una condición de carrera.',
      'La carpeta de archivo: ha visto el problema de trabajar sobre documentación caducada.',
    ],
    stack: ['Lucidchart', 'Mermaid', 'Draw.io', 'Excalidraw'],
  },
  {
    id: 'diseno',
    titulo: 'Diseño gráfico y audiovisual',
    distintivo: 'De donde viene',
    año: '2020 — 2026',
    disciplinas: ['Diseño'],
    color: 'gris',
    gancho:
      'Dirección de arte y edición de vídeo para siete marcas. No lo ha perdido, y es lo que hace que su perfil técnico valga más.',
    cifras: [
      { n: '7', que: 'marcas' },
      { n: '6', que: 'años' },
      { n: '3', que: 'decisiones de marketing sin encargo' },
    ],
    cuerpo: [
      'La tentación de quien cambia de perfil es borrar el pasado. Sería un error. Un desarrollador que ha comprado anuncios con presupuesto real resuelve problemas que otro desarrollador ni siquiera identifica.',
      'Tres ejemplos de este año, todos con raíz en su etapa de marketing y ninguno encargado: detuvo una configuración que habría duplicado el conteo de conversiones publicitarias; integró las reseñas de Google dentro de un modal en lugar de enlazar fuera; e implementó la persistencia de la atribución a lo largo de ocho pasos de formulario.',
      'Y el dominio de SVG —escribir gráficos vectoriales a mano en lugar de exportarlos— viene directamente de aquí.',
    ],
    enseñar: [
      'Entiende el embudo completo, del anuncio al CRM.',
      'Evitó el doble conteo de conversiones: un fallo que nunca se detecta, porque los números suben.',
      'Es la respuesta a «¿por qué contratar a alguien que viene de marketing?».',
    ],
    stack: ['Photoshop', 'Illustrator', 'Premiere Pro', 'Filmora', 'Meta Ads Manager'],
  },
]

export const disciplinas: Disciplina[] = [
  'Full-stack',
  'Automatización',
  'Bases de datos',
  'Calidad',
  'Infraestructura',
  'Documentación',
  'Diseño',
]
