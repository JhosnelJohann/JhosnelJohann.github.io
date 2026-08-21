/**
 * Portafolio de edición de vídeo.
 *
 * Los diez son **verticales 9:16 en origen 4K**, creatividades para Reels,
 * Stories y TikTok. Medidos con ffprobe: entre 41 s y 1:39, 11:30 en total.
 *
 * Los nombres de archivo originales eran internos —«SLT AW CDDN 02»,
 * «PR AW CDDN 01 DEF»— así que llevan título de cara al público. Los pesos
 * y duraciones de aquí salen de la medición real, no de una estimación.
 */

export type Pieza = {
  /** Nombre del archivo en public/video/, sin extensión */
  archivo: string
  titulo: string
  marca: string
  /** Una línea: qué se buscaba con esta pieza */
  nota: string
  /** Duración en segundos, medida con ffprobe */
  segundos: number
  /** Formato de origen, para la ficha */
  formato: string
}

export const video: Pieza[] = [
  {
    archivo: 'manhattanlife-headline',
    titulo: 'ManhattanLife — anuncio con titular',
    marca: 'ManhattanLife · seguros',
    nota:
      'La versión definitiva de la campaña, con el titular incrustado. Es la pieza más larga ' +
      'del conjunto: sostiene la atención minuto y medio en un formato donde lo normal son quince segundos.',
    segundos: 99,
    formato: '4K vertical · 9:16',
  },
  {
    archivo: 'ciudadania-pr-aw',
    titulo: 'Ciudadanía — fase problema',
    marca: 'Tu Agente de Inmigración',
    nota:
      'Dirigido a quien ya sabe que tiene un problema migratorio pero no conoce la solución. ' +
      'El montaje lleva del síntoma al trámite concreto.',
    segundos: 83,
    formato: '4K vertical · 9:16',
  },
  {
    archivo: 'ciudadania-slt-aw',
    titulo: 'Ciudadanía — fase solución',
    marca: 'Tu Agente de Inmigración',
    nota:
      'La otra mitad del par: para quien ya sabe qué trámite necesita y está eligiendo con quién. ' +
      'Mismo producto, argumento distinto.',
    segundos: 71,
    formato: '4K vertical · 9:16',
  },
  {
    archivo: 'secuencia-01',
    titulo: 'Secuencia de apertura',
    marca: 'Tu Agente de Inmigración',
    nota:
      'Pieza de apertura de campaña. Ritmo de corte marcado por la locución, con rotulación ' +
      'animada sobre imagen real.',
    segundos: 68,
    formato: '4K vertical · 9:16',
  },
  {
    archivo: 'medicare-05',
    titulo: 'Medicare — anuncio 05',
    marca: 'Medicare · seguros de salud',
    nota:
      'Creatividad para la campaña de Medicare, con el cuestionario de calificación como destino. ' +
      'La landing que recibe este tráfico también la construí.',
    segundos: 44,
    formato: '4K vertical · 9:16',
  },
  {
    archivo: 'medicare-02',
    titulo: 'Medicare — anuncio 02',
    marca: 'Medicare · seguros de salud',
    nota:
      'Variante en formato 3:4 para las ubicaciones de feed, donde el 9:16 se recorta. ' +
      'Reencuadre pensado, no recorte automático.',
    segundos: 66,
    formato: '4K vertical · 3:4',
  },
  {
    archivo: 'tipos-de-asilo',
    titulo: 'Tipos de asilo — explicativo',
    marca: 'Tu Agente de Inmigración',
    nota:
      'Formato educativo: explica una figura legal en minuto y medio sin perder al espectador. ' +
      'Rotulación de apoyo en cada punto y llamada a la acción al cierre.',
    segundos: 95,
    formato: '4K vertical · 9:16',
  },
  {
    archivo: 'ciudadania-problem-aware',
    titulo: 'Ciudadanía — versión corta',
    marca: 'Tu Agente de Inmigración',
    nota:
      'La versión de 40 segundos del mensaje de problema. Mismo argumento, la mitad de tiempo: ' +
      'el ejercicio de montaje más exigente del conjunto.',
    segundos: 41,
    formato: '4K vertical · 9:16',
  },
  {
    archivo: 'hook-7-cta-5',
    titulo: 'Prueba de gancho y cierre',
    marca: 'Tu Agente de Inmigración',
    nota:
      'Combinación de un gancho y un cierre concretos para probarlos por separado. ' +
      'Así se mide qué parte del anuncio funciona, en vez de adivinarlo.',
    segundos: 61,
    formato: '4K vertical · 9:16',
  },
  {
    archivo: 'video-3-ganador',
    titulo: 'La versión ganadora',
    marca: 'Tu Agente de Inmigración',
    nota:
      'La variante que mejor rindió de su tanda, remontada con un cierre nuevo. ' +
      'De las pruebas sale el ganador; del ganador sale la siguiente prueba.',
    segundos: 57,
    formato: '4K vertical · 9:16',
  },
]

/** «1:39» a partir de los segundos medidos. */
export const duracion = (s: number) =>
  `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

/** Para la cabecera de la sección: 11:30 en total. */
export const duracionTotal = duracion(video.reduce((t, v) => t + v.segundos, 0))
