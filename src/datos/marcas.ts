/**
 * Las marcas para las que hizo dirección de arte, piezas gráficas y vídeo.
 * Las imágenes son sus propias hojas de muestra de trabajo, recuperadas del
 * PDF de su currículum original.
 */

export interface Marca {
  slug: string
  nombre: string
  sector: string
  instagram: string
  /** Qué hizo exactamente para esta marca. */
  trabajo: string
}

export const marcas: Marca[] = [
  {
    slug: 'tu-impulso-latino',
    nombre: 'Tu Agente de Inmigración',
    sector: 'Inmigración · Florida, EE. UU.',
    instagram: 'juanmanueltuagente',
    trabajo:
      'La marca personal del negocio. Guion, grabación y edición de vídeo vertical para redes, piezas de campaña y creatividades publicitarias. Es el trabajo que hizo durante su primera etapa, y el que sostiene la captación de clientes.',
  },
  {
    slug: 'duralven',
    nombre: 'Duralven C.A.',
    sector: 'Repuestos y accesorios automotrices',
    instagram: 'duralvenca',
    trabajo:
      'Identidad visual y campañas de catálogo: K&N, Fox, Nitto, Black Rhino, NOCO. Dirección de arte con producto sobre fondo trabajado y llamada a la acción con QR.',
  },
  {
    slug: 'gran-sabana-motors',
    nombre: 'Gran Sabana Motors',
    sector: 'Automoción · todoterreno',
    instagram: 'gransabana_motors',
    trabajo:
      'Piezas de lanzamiento y catálogo para Toyo Tires, Nitto, BFGoodrich y Fuel Off-Road, con composición fotográfica y tipografía de impacto.',
  },
  {
    slug: 'alfer-autoparts',
    nombre: 'Alfer Autoparts',
    sector: 'Repuestos · accesorios de pickup',
    instagram: 'autoparts_alfer',
    trabajo:
      'Sistema gráfico completo para las líneas Ruged Cover, WatherPro y Flash Cover: fichas de producto, listas de precios y piezas de características.',
  },
  {
    slug: 'ignition',
    nombre: 'Ignition Accesorios',
    sector: 'Accesorios off-road y autopartes',
    instagram: 'ignitionvzla',
    trabajo:
      'Dirección de arte con una identidad roja muy marcada: luces LED, mesetas Camburg, stops para Hilux y bidones. Composiciones de alto contraste para venta directa.',
  },
  {
    slug: 'lsb-clothes',
    nombre: 'LSB Clothes',
    sector: 'Moda · camisetas de autor',
    instagram: 'lsb.clothes_',
    trabajo:
      'Ediciones especiales y campañas de producto. Composición con mockups, tratamiento de color y sistema de marca aplicado a etiqueta y presentación.',
  },
  {
    slug: 'realeza-bqto',
    nombre: 'Realeza BQTO',
    sector: 'Moda · arte aplicado',
    instagram: 'realeza_bqto',
    trabajo:
      'Campañas de la línea «Follow your art»: Picasso, Van Gogh, Monet. Fotografía de producto en calle, tipografía rota y clave editorial tipo revista.',
  },
]

/** El canal de YouTube que editaba. */
export const youtube = {
  handle: 'juanmanuelconchatuagente',
  nombre: 'Juan Manuel Concha | Your Agent',
  url: 'https://www.youtube.com/@juanmanuelconchatuagente',
  descripcion:
    'Además del formato vertical para Instagram, editaba el contenido del canal de YouTube de la marca.',
}
