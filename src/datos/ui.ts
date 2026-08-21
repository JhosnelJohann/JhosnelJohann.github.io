/** Todo el texto de interfaz que no vive en los datos, en los dos idiomas. */

export const ui = {
  es: {
    htmlLang: 'es',
    otroIdioma: 'EN',
    otroIdiomaTitulo: 'Read this page in English',
    irAOtroIdioma: '/en/',
    abrirMenu: 'Abrir menú',
    cerrarMenu: 'Cerrar menú',
    cerrar: 'Cerrar',
    menu: 'Menú',
    disponible: 'Disponible para nuevos proyectos',
    verExperiencia: 'Ver mi experiencia',
    secciones: {
      experiencia: 'Experiencia',
      trabajo: 'Portafolio',
      habilidades: 'Herramientas',
      diseno: 'Diseño y edición',
      contacto: 'Contacto',
    },
    datos: {
      ubicacion: 'Ubicación',
      modalidad: 'Modalidad',
      experiencia: 'Experiencia',
      correo: 'Correo',
      nacimiento: 'Fecha de nacimiento',
      titulo: 'Título',
      años: 'años',
      desde: 'Desde',
      sieteAños: 'siete años',
    },
    exp: {
      num: '02',
      rotulo: 'Trayectoria',
      titulo: 'Experiencia laboral',
      nota:
        'Empecé en 2019 haciendo dirección de arte y edición de vídeo, y hoy construyo la ' +
        'infraestructura que sostiene ese trabajo. **El salto no fue gradual**: de marketing a ' +
        'administrar un servidor Linux hay una distancia que normalmente se cubre con un cambio ' +
        'de puesto y un equipo alrededor. Yo la cubrí sobre la marcha, con producción funcionando.',
      enCurso: 'En curso',
      /* Como los niveles: la clave se queda en español —de ella salen el color
         y la clase CSS— y solo se traduce lo que se lee. */
      tipos: { Desarrollo: 'Desarrollo', Diseño: 'Diseño', Marketing: 'Marketing' },
      modalidades: {
        Presencial: 'Presencial',
        Semipresencial: 'Semipresencial',
        Remoto: 'Remoto',
        Freelance: 'Freelance',
      },
    },
    trab: {
      num: '03',
      rotulo: 'Portafolio',
      titulo: 'Trabajo en producción',
      nota:
        'Trece sistemas que resolvieron un problema real de una empresa en marcha. **{n} están en ' +
        'línea y puedes abrirlos ahora mismo** — sus miniaturas son capturas reales, no ' +
        'interpretaciones. De los internos, los de automatización enseñan **el lienzo de sus flujos**, ' +
        'que no muestra ni un contacto; los que operan sobre datos de clientes llevan portada ' +
        'dibujada, porque publicar sus pantallas expondría a personas reales.',
      todo: 'Todo',
      detalle: 'Detalle →',
      verDetalle: 'Ver detalle de {n}',
      filtrar: 'Filtrar por tipo',
      verMas: 'Ver los {n} proyectos restantes ↓',
      visitar: 'Visitar',
      porDentro: 'Por dentro',
      conQue: 'Con qué está hecho',
      avisoCrm:
        'Los datos de clientes y del equipo van difuminados a propósito: son personas reales. ' +
        'La interfaz es la real.',
      avisoMovil:
        'Capturas en móvil, que es de donde llega el tráfico de anuncios y para donde está diseñada.',
      avisoFlujos:
        'Son los lienzos de los flujos, no la operación: no aparece ningún contacto ni ninguna conversación.',
      accesoRestringido: 'acceso restringido',
    },
    hab: {
      num: '04',
      rotulo: 'Herramientas',
      titulo: 'Lo que sé usar, y hasta dónde.',
      nota:
        'La barra representa **un nivel declarado, no un porcentaje inventado**. El nivel va ' +
        'escrito al lado y cada uno está respaldado por trabajo real: «avanzado» significa que lo ' +
        'diseñé, lo llevé a producción y resolví con ello fallos que no eran evidentes.',
      pie:
        '**Java, JavaFX, PHP, C++ y C#** constan en mi TSU en Informática pero no los he usado en ' +
        'producción, y por eso van marcados como formación. En una entrevista técnica prefiero ' +
        'decirlo yo antes de que lo descubra quien me entrevista.',
      niveles: {
        Avanzado: 'Avanzado',
        'Intermedio-alto': 'Intermedio-alto',
        Intermedio: 'Intermedio',
        Formación: 'Formación',
      },
    },
    dis: {
      num: '01',
      rotulo: 'Diseño y edición',
      titulo: 'De aquí vengo, y no lo he dejado.',
      nota:
        'La tentación de quien cambia de perfil es borrar el pasado. Sería un error: un ' +
        'desarrollador que ha comprado anuncios con presupuesto real **resuelve problemas que otro ' +
        'desarrollador ni siquiera identifica**.',
      /* Las cifras de la franja. `valor` es lo que cuenta el contador; `texto`
         lo que se muestra al terminar, para los que no son un número redondo. */
      cifras: [
        { valor: 10, texto: '10', que: 'piezas editadas' },
        { valor: 11, texto: '11:30', que: 'de metraje' },
        { valor: 4, texto: '4K', que: 'de origen' },
        { valor: 7, texto: '7', que: 'marcas atendidas' },
      ],
      edicion: 'Edición',
      disenoGrafico: 'Diseño gráfico',
      calidad:
        'Comprimidos a 1080 para que carguen rápido. **Los originales son 4K verticales y pesan 4,6 GB.**',
      ampliar: 'Ampliar',
      canales: 'Los dos canales cuyo contenido edité',
      marketingTitulo: 'Tres decisiones de marketing que nadie me encargó',
      marketing: [
        '**Detuve una configuración que habría duplicado el conteo de conversiones.** Es un fallo que casi nunca se detecta, porque los números suben.',
        '**Metí las reseñas de Google dentro de un modal** en vez de enlazar fuera, para no regalar el visitante que la empresa se acababa de pagar.',
        '**Implementé la persistencia de la atribución** a lo largo de ocho pasos de formulario, para que la inversión publicitaria se pueda medir de verdad.',
      ],
    },
    video: {
      titulo: 'Portafolio de edición',
      nota:
        'Diez creatividades publicitarias, todas verticales 9:16 en 4K, de 41 segundos a minuto y ' +
        'medio. Son las piezas que recibieron inversión real en Meta Ads, y varias de ellas llevan ' +
        'a landings que también construí. Pulsa para verlas.',
      reproducir: 'Reproducir',
    },
    cont: {
      num: '06',
      rotulo: 'Formación y contacto',
      titulo: 'Hablemos.',
      formacion: 'Formación académica',
      certificaciones: 'Certificaciones',
      idiomas: 'Idiomas',
      egresado: 'Egresado',
      cursando: 'Cursando',
      pieFoto:
        'Etapa de estudiante en el IUJO, donde empecé a tomar mis primeros encargos de diseño y edición.',
      verificar:
        '**Todo lo que digo aquí es comprobable.** Lo que afirmo sobre mi trabajo en Tu Agente de ' +
        'Inmigración se verifica contra la bitácora del servidor de producción, y mi antiguo ' +
        'empleador puede confirmarlo.',
      pieCodigo: 'Esta página la hice yo, en React y Vite. El código está',
      pieEnlace: 'abierto en GitHub',
    },
    cinta: 'Tecnologías que uso',
    /* Textos alternativos: los lee el lector de pantalla, así que también
       tienen que cambiar de idioma. */
    alt: {
      foto: 'Jhosnel Laya',
      iujo: 'Jhosnel Laya durante su etapa de estudiante en el IUJO',
      captura: 'Captura de {n}',
      piezas: 'Piezas gráficas para {n}',
      hoja: 'Hoja de muestras de {n}',
      muestras: 'Muestras de {n}',
    },
    /* Los rótulos dibujados dentro de las portadas SVG. Los nombres de proceso
       —frontend, api, livekit— no se traducen: son identificadores reales. */
    port: {
      aislado: 'aislado',
      diagrama: 'DIAGRAMA',
      flujo: 'FLUJO',
      caja: 'caja',
      nodo: 'nodo',
      crm: '85 tablas · PostgreSQL 15',
      arnes: '3 direcciones · sale ≠ 0 si divergen',
      estados: '13 pasos · 25 transiciones · en PostgreSQL',
      nodos: '186 nodos · 8 versiones en 2 días',
      docs: '18 documentos · 231 fuentes citadas',
      docsMini: '5 afirmaciones refutadas antes de publicar',
      certs: '22 dominios con certificado',
      migracion: '18 tablas · 207 planes · 3 estados de validación',
      diagramas: '26 diagramas · el color responde a una pregunta',
      marcas: '7 marcas · dirección de arte y vídeo',
    },
  },

  en: {
    htmlLang: 'en',
    otroIdioma: 'ES',
    otroIdiomaTitulo: 'Leer esta página en español',
    irAOtroIdioma: '/',
    abrirMenu: 'Open menu',
    cerrarMenu: 'Close menu',
    cerrar: 'Close',
    menu: 'Menu',
    disponible: 'Available for new projects',
    verExperiencia: 'See my experience',
    secciones: {
      experiencia: 'Experience',
      trabajo: 'Portfolio',
      habilidades: 'Toolkit',
      diseno: 'Design & editing',
      contacto: 'Contact',
    },
    datos: {
      ubicacion: 'Location',
      modalidad: 'Work setup',
      experiencia: 'Experience',
      correo: 'Email',
      nacimiento: 'Date of birth',
      titulo: 'Degree',
      años: 'years old',
      desde: 'Since',
      sieteAños: 'seven years',
    },
    exp: {
      num: '02',
      rotulo: 'Track record',
      titulo: 'Work experience',
      nota:
        'I started in 2019 doing art direction and video editing, and today I build the ' +
        'infrastructure that supports that work. **The jump was not gradual**: going from ' +
        'marketing to running a Linux server is usually a distance you cover with a job change ' +
        'and a team around you. I covered it on the move, with production running.',
      enCurso: 'Current',
      tipos: { Desarrollo: 'Development', Diseño: 'Design', Marketing: 'Marketing' },
      modalidades: {
        Presencial: 'On-site',
        Semipresencial: 'Hybrid',
        Remoto: 'Remote',
        Freelance: 'Freelance',
      },
    },
    trab: {
      num: '03',
      rotulo: 'Portfolio',
      titulo: 'Work in production',
      nota:
        'Thirteen systems that solved a real problem for a company already running. **{n} are live ' +
        'and you can open them right now** — their thumbnails are real screenshots, not ' +
        'illustrations. Of the internal ones, the automation systems show **their flow canvases**, ' +
        'which contain no contacts at all; the ones that operate on client data carry a drawn cover, ' +
        'because publishing their screens would expose real people.',
      todo: 'All',
      detalle: 'Details →',
      verDetalle: 'See details for {n}',
      filtrar: 'Filter by type',
      verMas: 'Show the remaining {n} projects ↓',
      visitar: 'Visit',
      porDentro: 'Inside',
      conQue: 'Built with',
      avisoCrm:
        'Client and team data is blurred on purpose: these are real people. The interface is the real one.',
      avisoMovil:
        'Mobile screenshots — that is where the ad traffic comes from, and what these pages are designed for.',
      avisoFlujos:
        'These are the flow canvases, not the live operation: no contact and no conversation appears.',
      accesoRestringido: 'restricted access',
    },
    hab: {
      num: '04',
      rotulo: 'Toolkit',
      titulo: 'What I can use, and how far.',
      nota:
        'The bar shows **a stated level, not an invented percentage**. The level is written next ' +
        'to it and each one is backed by real work: «advanced» means I designed it, shipped it to ' +
        'production and used it to solve failures that were not obvious.',
      pie:
        '**Java, JavaFX, PHP, C++ and C#** are on my Computer Science degree but I have not used ' +
        'them in production, which is why they are marked as coursework. In a technical interview ' +
        'I would rather say it myself than have the interviewer find out.',
      niveles: {
        Avanzado: 'Advanced',
        'Intermedio-alto': 'Upper-intermediate',
        Intermedio: 'Intermediate',
        Formación: 'Coursework',
      },
    },
    dis: {
      num: '01',
      rotulo: 'Design & editing',
      titulo: 'This is where I come from, and I have not left it.',
      nota:
        'The temptation when you switch fields is to erase the past. That would be a mistake: a ' +
        'developer who has bought ads with a real budget **solves problems another developer would ' +
        'not even spot**.',
      cifras: [
        { valor: 10, texto: '10', que: 'pieces edited' },
        { valor: 11, texto: '11:30', que: 'of footage' },
        { valor: 4, texto: '4K', que: 'source' },
        { valor: 7, texto: '7', que: 'brands served' },
      ],
      edicion: 'Editing',
      disenoGrafico: 'Graphic design',
      calidad:
        'Compressed to 1080 so they load fast. **The originals are 4K vertical and weigh 4.6 GB.**',
      ampliar: 'Enlarge',
      canales: 'The two channels whose content I edited',
      marketingTitulo: 'Three marketing calls nobody asked me to make',
      marketing: [
        '**I stopped a configuration that would have double-counted conversions.** It is a failure almost nobody catches, because the numbers go up.',
        '**I put the Google reviews inside a modal** instead of linking away, so we would not hand back the visitor the company had just paid for.',
        '**I implemented attribution persistence** across eight form steps, so the ad spend could actually be measured.',
      ],
    },
    video: {
      titulo: 'Editing portfolio',
      nota:
        'Ten ad creatives, all vertical 9:16 in 4K, from 41 seconds to a minute and a half. These ' +
        'are the pieces that carried real Meta Ads spend, and several of them point at landing ' +
        'pages I also built. Tap to watch.',
      reproducir: 'Play',
    },
    cont: {
      num: '06',
      rotulo: 'Education & contact',
      titulo: 'Let’s talk.',
      formacion: 'Education',
      certificaciones: 'Certifications',
      idiomas: 'Languages',
      egresado: 'Graduated',
      cursando: 'In progress',
      pieFoto:
        'Student years at IUJO, where I started taking on my first design and editing jobs.',
      verificar:
        '**Everything I say here can be checked.** What I claim about my work at Tu Agente de ' +
        'Inmigración can be verified against the production server changelog, and my former ' +
        'employer can confirm it.',
      pieCodigo: 'I built this page myself, in React and Vite. The code is',
      pieEnlace: 'open on GitHub',
    },
    cinta: 'Technologies I use',
    alt: {
      foto: 'Jhosnel Laya',
      iujo: 'Jhosnel Laya during his student years at IUJO',
      captura: 'Screenshot of {n}',
      piezas: 'Graphic work for {n}',
      hoja: 'Work sample sheet for {n}',
      muestras: 'Samples from {n}',
    },
    port: {
      aislado: 'isolated',
      diagrama: 'DIAGRAM',
      flujo: 'FLOW',
      caja: 'box',
      nodo: 'node',
      crm: '85 tables · PostgreSQL 15',
      arnes: '3 directions · exits ≠ 0 if they diverge',
      estados: '13 steps · 25 transitions · in PostgreSQL',
      nodos: '186 nodes · 8 versions in 2 days',
      docs: '18 documents · 231 sources cited',
      docsMini: '5 claims refuted before publishing',
      certs: '22 domains with a certificate',
      migracion: '18 tables · 207 plans · 3 validation states',
      diagramas: '26 diagrams · the colour answers a question',
      marcas: '7 brands · art direction and video',
    },
  },
} as const

export type Idioma = keyof typeof ui
export type Textos = (typeof ui)['es']
