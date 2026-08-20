import type { Marca } from '../marcas'

export const marcas: Marca[] = [
  {
    slug: 'tu-impulso-latino',
    nombre: 'Tu Agente de Inmigración',
    sector: 'Immigration services · Florida, USA',
    instagram: 'juanmanueltuagente',
    trabajo:
      'The personal brand behind the business. Scripting, filming and vertical video editing for social, campaign assets and ad creative. This is the work I did in my first stage there, and it is what feeds the client pipeline.',
  },
  {
    slug: 'duralven',
    nombre: 'Duralven C.A.',
    sector: 'Automotive parts and accessories',
    instagram: 'duralvenca',
    trabajo:
      'Visual identity and catalogue campaigns: K&N, Fox, Nitto, Black Rhino, NOCO. Art direction with the product over a worked background and a QR-led call to action.',
  },
  {
    slug: 'gran-sabana-motors',
    nombre: 'Gran Sabana Motors',
    sector: 'Automotive · off-road',
    instagram: 'gransabana_motors',
    trabajo:
      'Launch and catalogue pieces for Toyo Tires, Nitto, BFGoodrich and Fuel Off-Road, with photographic composition and high-impact typography.',
  },
  {
    slug: 'alfer-autoparts',
    nombre: 'Alfer Autoparts',
    sector: 'Parts · pickup accessories',
    instagram: 'autoparts_alfer',
    trabajo:
      'A complete graphic system for the Ruged Cover, WatherPro and Flash Cover lines: product sheets, price lists and feature breakdowns.',
  },
  {
    slug: 'ignition',
    nombre: 'Ignition Accesorios',
    sector: 'Off-road accessories and parts',
    instagram: 'ignitionvzla',
    trabajo:
      'Art direction with a hard red identity: LED headlights, Camburg control arms, Hilux tail lights and jerrycans. High-contrast compositions built for direct sale.',
  },
  {
    slug: 'lsb-clothes',
    nombre: 'LSB Clothes',
    sector: 'Fashion · author tees',
    instagram: 'lsb.clothes_',
    trabajo:
      'Special editions and product campaigns. Mockup composition, colour treatment and a brand system applied across label and presentation.',
  },
  {
    slug: 'realeza-bqto',
    nombre: 'Realeza BQTO',
    sector: 'Fashion · applied art',
    instagram: 'realeza_bqto',
    trabajo:
      'Campaigns for the «Follow your art» line: Picasso, Van Gogh, Monet. Street product photography, torn typography and an editorial, magazine-like register.',
  },
]

export const canales = [
  {
    red: 'YouTube' as const,
    handle: 'juanmanuelconchatuagente',
    nombre: 'Juan Manuel Concha | Your Agent',
    url: 'https://www.youtube.com/@juanmanuelconchatuagente',
    descripcion: 'The brand’s channel. I edited its long-form content.',
  },
  {
    red: 'Instagram' as const,
    handle: 'juanmanueltuagente',
    nombre: 'Juan Manuel · Tu Agente de Inmigración',
    url: 'https://instagram.com/juanmanueltuagente',
    descripcion: 'The brand’s main account. Scripting, vertical editing and daily publishing.',
  },
]
