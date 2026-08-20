import { useEnVista } from '../efectos/movimiento'
import './Iconos.css'

/* ══════════════════════════════════════════════════════════════════
   Dos familias de iconos, ambas hechas a mano:

   1. Marca3D  — objetos con caras reales en CSS `preserve-3d`. Giran
                 de verdad, cosa que un PNG de stock no puede hacer.
   2. IconoLinea — SVG que se dibuja solo al entrar en pantalla y luego
                 late. El trazo se anima con stroke-dashoffset.
   ══════════════════════════════════════════════════════════════════ */

export type Marca = 'datos' | 'grafo' | 'terminal' | 'lente'

/** Cilindro de base de datos: tres discos apilados que giran. */
function Datos() {
  return (
    <div className="m3-obj m3-cilindro">
      {[0, 1, 2].map((i) => (
        <div className="m3-disco" key={i} style={{ '--i': i } as React.CSSProperties}>
          <span className="m3-tapa" />
          <span className="m3-pared" />
        </div>
      ))}
    </div>
  )
}

/** Grafo de nodos: un tetraedro de puntos unidos, girando. */
function Grafo() {
  const nodos = [
    { x: 0, y: -26, z: 0 },
    { x: -24, y: 14, z: 14 },
    { x: 24, y: 14, z: 14 },
    { x: 0, y: 6, z: -26 },
  ]
  return (
    <div className="m3-obj m3-grafo">
      {nodos.map((n, i) => (
        <span
          key={i}
          className="m3-nodo"
          style={{ '--x': `${n.x}px`, '--y': `${n.y}px`, '--z': `${n.z}px`, '--i': i } as React.CSSProperties}
        />
      ))}
      <svg className="m3-aristas" viewBox="-40 -40 80 80" aria-hidden="true">
        <path d="M0-26 -24 14 24 14Z M0-26 0 6 M-24 14 0 6 M24 14 0 6" />
      </svg>
    </div>
  )
}

/** Cubo de terminal: seis caras, con un prompt en la frontal. */
function Terminal() {
  return (
    <div className="m3-obj m3-cubo">
      <span className="m3-cara m3-frente mono">›_</span>
      <span className="m3-cara m3-atras" />
      <span className="m3-cara m3-der" />
      <span className="m3-cara m3-izq" />
      <span className="m3-cara m3-arriba" />
      <span className="m3-cara m3-abajo" />
    </div>
  )
}

/** Diafragma de cámara: seis hojas que se abren y cierran. */
function Lente() {
  return (
    <div className="m3-obj m3-lente">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <span key={i} className="m3-hoja" style={{ '--i': i } as React.CSSProperties} />
      ))}
      <span className="m3-pupila" />
    </div>
  )
}

const MARCAS = { datos: Datos, grafo: Grafo, terminal: Terminal, lente: Lente }

export function Marca3D({ tipo, color = 'azul' }: { tipo: Marca; color?: string }) {
  const Obj = MARCAS[tipo]
  return (
    <div className={`m3 c-${color}`} aria-hidden="true">
      <div className="m3-escena">
        <Obj />
      </div>
    </div>
  )
}

/* ─────────── Iconos de línea que se dibujan solos ─────────── */

export type Linea =
  | 'codigo' | 'base' | 'nube' | 'chispa' | 'flujo' | 'pincel'
  | 'camara' | 'escudo' | 'cohete' | 'grafico'

const TRAZOS: Record<Linea, string> = {
  codigo: 'M9 8 4 13l5 5 M15 8l5 5-5 5 M13 5l-2 14',
  base: 'M4 6c0-1.5 3.6-2.5 8-2.5S20 4.5 20 6s-3.6 2.5-8 2.5S4 7.5 4 6Z M4 6v6c0 1.5 3.6 2.5 8 2.5s8-1 8-2.5V6 M4 12v6c0 1.5 3.6 2.5 8 2.5s8-1 8-2.5v-6',
  nube: 'M7 18h9.5a3.5 3.5 0 0 0 .4-7A5.5 5.5 0 0 0 6.6 9.4 4.3 4.3 0 0 0 7 18Z',
  chispa: 'M12 3v4 M12 17v4 M3 12h4 M17 12h4 M12 8.5 15.5 12 12 15.5 8.5 12Z',
  flujo: 'M5 6h5 M14 6h5 M5 18h5 M14 18h5 M12 6v12 M10 4a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z M10 20a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z',
  pincel: 'M4 20c0-2.5 1.5-4 3.5-4S11 17.5 11 20H4Z M9 15 18.5 5.5a2.1 2.1 0 0 1 3 3L12 18',
  camara: 'M4 8h3l1.5-2h7L17 8h3v11H4Z M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z',
  escudo: 'M12 3 20 6v6c0 4.5-3.4 7.6-8 9-4.6-1.4-8-4.5-8-9V6Z M9 12l2.2 2.2L15.5 10',
  cohete: 'M12 3c3.5 2.5 5.5 6.5 5.5 11L12 18l-5.5-4C6.5 9.5 8.5 5.5 12 3Z M12 12a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6Z M8 18l-2 3 M16 18l2 3',
  grafico: 'M4 20V9 M9.5 20V4 M15 20v-8 M20.5 20v-5 M3 20h18',
}

export function IconoLinea({
  tipo,
  tam = 26,
  latir = true,
}: {
  tipo: Linea
  tam?: number
  latir?: boolean
}) {
  const { ref, dentro } = useEnVista<HTMLSpanElement>('0px 0px -5% 0px')
  return (
    <span ref={ref} className={`ic ${dentro ? 'ic-dibuja' : ''} ${latir ? 'ic-late' : ''}`}>
      <svg width={tam} height={tam} viewBox="0 0 24 24" aria-hidden="true">
        <path d={TRAZOS[tipo]} />
      </svg>
    </span>
  )
}
