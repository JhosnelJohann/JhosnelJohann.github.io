import { t } from '../contenido'
import './Portada.css'

/**
 * Portadas compuestas en código con el material real de cada proyecto.
 * No fingen ser capturas de pantalla: son el sistema, dibujado.
 */

const V = { w: 400, h: 240 }

/** CRM: los seis procesos de producción, dos de ellos aislados a propósito. */
function CRM() {
  const procesos = [
    { x: 26, y: 34, w: 104, et: 'frontend', p: ':3100' },
    { x: 148, y: 34, w: 104, et: 'api', p: ':4100' },
    { x: 270, y: 34, w: 104, et: 'ai', p: ':8100' },
    { x: 26, y: 132, w: 104, et: 'email-worker', p: t.port.aislado },
    { x: 148, y: 132, w: 104, et: 'followup', p: t.port.aislado },
    { x: 270, y: 132, w: 104, et: 'livekit', p: ':7880' },
  ]
  return (
    <svg viewBox={`0 0 ${V.w} ${V.h}`} className="port-svg" aria-hidden="true">
      {procesos.map((s, i) => (
        <g key={s.et}>
          <rect
            x={s.x} y={s.y} width={s.w} height={54} rx="2"
            className={i >= 3 && i <= 4 ? 'p-caja p-aislada' : 'p-caja'}
          />
          <text x={s.x + 12} y={s.y + 24} className="p-et">{s.et}</text>
          <text x={s.x + 12} y={s.y + 40} className="p-mini">{s.p}</text>
        </g>
      ))}
      <line x1="130" y1="61" x2="148" y2="61" className="p-hilo" />
      <line x1="252" y1="61" x2="270" y2="61" className="p-hilo" />
      <text x="26" y="212" className="p-pie">{t.port.crm}</text>
      <line x1="26" y1="196" x2="374" y2="196" className="p-regla" />
    </svg>
  )
}

/** Arnés: la comprobación en tres direcciones. */
function Arnes() {
  const filas = [
    { y: 52, a: t.port.caja, b: t.port.nodo, ok: true },
    { y: 104, a: t.port.caja, b: '—', ok: false },
    { y: 156, a: '—', b: t.port.nodo, ok: false },
  ]
  return (
    <svg viewBox={`0 0 ${V.w} ${V.h}`} className="port-svg" aria-hidden="true">
      <text x="26" y="30" className="p-mini">{t.port.diagrama}</text>
      <text x="286" y="30" className="p-mini">{t.port.flujo}</text>
      {filas.map((f) => (
        <g key={f.y}>
          <rect x="26" y={f.y} width="92" height="34" rx="2"
            className={f.a === '—' ? 'p-caja p-vacia' : 'p-caja'} />
          <text x="72" y={f.y + 22} className="p-et p-centro">{f.a}</text>
          <rect x="282" y={f.y} width="92" height="34" rx="2"
            className={f.b === '—' ? 'p-caja p-vacia' : 'p-caja'} />
          <text x="328" y={f.y + 22} className="p-et p-centro">{f.b}</text>
          <line x1="118" y1={f.y + 17} x2="282" y2={f.y + 17}
            className={f.ok ? 'p-hilo p-ok' : 'p-hilo p-mal'}
            strokeDasharray={f.ok ? undefined : '5 5'} />
          <circle cx="200" cy={f.y + 17} r="8" className={f.ok ? 'p-sello p-ok-f' : 'p-sello p-mal-f'} />
          <text x="200" y={f.y + 21} className="p-signo">{f.ok ? '✓' : '✕'}</text>
        </g>
      ))}
      <text x="26" y="216" className="p-pie">{t.port.arnes}</text>
    </svg>
  )
}

/** Máquina de estados: 13 pasos, 25 transiciones. */
function Estados() {
  const nodos = [
    [46, 60], [116, 44], [186, 66], [256, 46], [326, 68],
    [72, 128], [142, 146], [212, 124], [282, 148], [344, 126],
    [104, 196], [200, 190], [292, 198],
  ]
  const aristas: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8], [8, 9],
    [1, 6], [2, 7], [3, 8], [5, 10], [6, 11], [7, 11], [8, 12], [10, 11],
    [11, 12], [4, 9], [9, 12], [2, 6], [0, 6], [4, 8], [1, 5], [3, 9],
  ]
  return (
    <svg viewBox={`0 0 ${V.w} ${V.h}`} className="port-svg" aria-hidden="true">
      {aristas.map(([a, b], i) => (
        <line key={i} x1={nodos[a][0]} y1={nodos[a][1]} x2={nodos[b][0]} y2={nodos[b][1]}
          className="p-arista" />
      ))}
      {nodos.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 0 ? 9 : i === 12 ? 9 : 6}
          className={i === 0 ? 'p-nodo p-entrada' : i === 12 ? 'p-nodo p-final' : 'p-nodo'} />
      ))}
      <text x="26" y="226" className="p-pie">{t.port.estados}</text>
    </svg>
  )
}

/** 186 nodos: la densidad como imagen. */
function Densidad() {
  const puntos = Array.from({ length: 186 }, (_, i) => {
    const col = i % 31
    const fil = Math.floor(i / 31)
    return { x: 28 + col * 11.4, y: 42 + fil * 26, act: i % 17 === 0 }
  })
  return (
    <svg viewBox={`0 0 ${V.w} ${V.h}`} className="port-svg" aria-hidden="true">
      {puntos.map((p, i) => (
        <rect key={i} x={p.x} y={p.y} width="7" height="7" rx="1"
          className={p.act ? 'p-celda p-celda-viva' : 'p-celda'} />
      ))}
      <text x="28" y="226" className="p-pie">{t.port.nodos}</text>
    </svg>
  )
}

/** 18 documentos, como lomos de libro. */
function Lomos() {
  return (
    <svg viewBox={`0 0 ${V.w} ${V.h}`} className="port-svg" aria-hidden="true">
      {Array.from({ length: 18 }, (_, i) => {
        const h = 96 + ((i * 37) % 62)
        return (
          <rect key={i} x={28 + i * 19.4} y={172 - h} width="13" height={h} rx="1"
            className={i === 13 ? 'p-lomo p-lomo-viva' : 'p-lomo'} />
        )
      })}
      <line x1="26" y1="174" x2="374" y2="174" className="p-regla" />
      <text x="26" y="204" className="p-pie">{t.port.docs}</text>
      <text x="26" y="222" className="p-mini">{t.port.docsMini}</text>
    </svg>
  )
}

/** Infraestructura: las capas del servidor. */
function Capas() {
  const capas = ['nginx · TLS', 'PM2 · 19 procesos', 'Docker · 29 contenedores', 'Ubuntu Server']
  return (
    <svg viewBox={`0 0 ${V.w} ${V.h}`} className="port-svg" aria-hidden="true">
      {capas.map((c, i) => (
        <g key={c}>
          <rect x={26 + i * 9} y={34 + i * 42} width={348 - i * 18} height="34" rx="2"
            className="p-caja" />
          <text x={40 + i * 9} y={56 + i * 42} className="p-et">{c}</text>
        </g>
      ))}
      <text x="26" y="226" className="p-pie">{t.port.certs}</text>
    </svg>
  )
}

/** Embudo de 8 pasos. */
function Embudo() {
  return (
    <svg viewBox={`0 0 ${V.w} ${V.h}`} className="port-svg" aria-hidden="true">
      {Array.from({ length: 8 }, (_, i) => {
        const w = 330 - i * 34
        return (
          <g key={i}>
            <rect x={26 + i * 17} y={24 + i * 21} width={w} height="15" rx="1"
              className={i === 7 ? 'p-barra p-barra-fin' : 'p-barra'} />
            <text x={30 + i * 17 + w + 8} y={36 + i * 21} className="p-mini">{`0${i + 1}`}</text>
          </g>
        )
      })}
      <text x="26" y="226" className="p-pie">{t.port.migracion}</text>
    </svg>
  )
}

/** La leyenda de color: el sistema que da paleta a esta web. */
function Leyenda() {
  const l = [
    { c: 'verde', t: 'camino feliz' },
    { c: 'rojo', t: 'fallo' },
    { c: 'amarillo', t: 'espera / humano' },
    { c: 'azul', t: 'sistema externo' },
    { c: 'gris', t: 'persistencia' },
  ]
  return (
    <svg viewBox={`0 0 ${V.w} ${V.h}`} className="port-svg" aria-hidden="true">
      {l.map((x, i) => (
        <g key={x.c}>
          <rect x="26" y={26 + i * 36} width="46" height="24" rx="2" className={`p-muestra m-${x.c}`} />
          <text x="86" y={43 + i * 36} className="p-et">{x.t}</text>
        </g>
      ))}
      <text x="26" y="226" className="p-pie">{t.port.diagramas}</text>
    </svg>
  )
}

/** Diseño: retícula de piezas. */
function Reticula() {
  return (
    <svg viewBox={`0 0 ${V.w} ${V.h}`} className="port-svg" aria-hidden="true">
      {Array.from({ length: 12 }, (_, i) => {
        const col = i % 4
        const fil = Math.floor(i / 4)
        return (
          <rect key={i} x={30 + col * 88} y={26 + fil * 60} width="76" height="48" rx="2"
            className={`p-pieza p-pieza-${i % 4}`} />
        )
      })}
      <text x="30" y="226" className="p-pie">{t.port.marcas}</text>
    </svg>
  )
}

const MOTIVOS: Record<string, () => React.JSX.Element> = {
  'crm-tadi': CRM,
  arnes: Arnes,
  'paula-manhattan': Estados,
  'paula-feecorte': Densidad,
  biblioteca: Lomos,
  infraestructura: Capas,
  landings: Embudo,
  diagramacion: Leyenda,
  diseno: Reticula,
}

export default function Portada({ id, color }: { id: string; color: string }) {
  const Motivo = MOTIVOS[id] ?? Leyenda
  return (
    <div className={`portada c-${color}`}>
      <Motivo />
    </div>
  )
}
