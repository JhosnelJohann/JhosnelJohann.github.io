import { useState } from 'react'
import { paneles, ANCHO_NIVEL, t, type Habilidad } from '../contenido'
import { useEnVista } from '../efectos/movimiento'
import Rico from './Rico'
import './Habilidades.css'

function Barra({ h, i, activo }: { h: Habilidad; i: number; activo: boolean }) {
  /* El nivel se guarda siempre con la clave en español —de ahí salen la clase
     CSS y el ancho de la barra—; solo la etiqueta visible se traduce. */
  const etiqueta = t.hab.niveles[h.nivel]
  return (
    <li className="hab" title={h.nota ?? etiqueta}>
      <div className="hab-fila">
        <span className="hab-nombre">{h.nombre}</span>
        <span className={`hab-nivel mono n-${h.nivel.toLowerCase().replace('-', '')}`}>
          {etiqueta}
        </span>
      </div>
      <div className="hab-pista">
        <i
          className={`n-${h.nivel.toLowerCase().replace('-', '')}`}
          style={{
            width: activo ? `${ANCHO_NIVEL[h.nivel]}%` : '0%',
            transitionDelay: `${Math.min(i, 9) * 55}ms`,
          }}
        />
      </div>
      {h.nota && <p className="hab-nota">{h.nota}</p>}
    </li>
  )
}

export default function Habilidades() {
  const [abierto, setAbierto] = useState(paneles[0].clave)
  const { ref, dentro } = useEnVista<HTMLDivElement>()
  const panel = paneles.find((p) => p.clave === abierto) ?? paneles[0]

  return (
    <section id="habilidades" className="habs">
      <div className="env">
        <div className="cab-seccion">
          <p className="cab-num mono">
            <b>{t.hab.num}</b> {t.hab.rotulo}
          </p>
          <h2 className="cab-titulo">{t.hab.titulo}</h2>
          <p className="cab-nota">
            <Rico texto={t.hab.nota} />
          </p>
        </div>

        <div className="habs-pestanas" role="tablist">
          {paneles.map((p) => (
            <button
              key={p.clave}
              role="tab"
              aria-selected={abierto === p.clave}
              className={`habs-pestana ${abierto === p.clave ? 'activa' : ''} c-${p.color}`}
              onClick={() => setAbierto(p.clave)}
            >
              {p.titulo}
            </button>
          ))}
        </div>

        <div className={`habs-panel c-${panel.color}`} ref={ref}>
          <p className="habs-intro">{panel.intro}</p>

          {/* <details> en vez de estado propio: en escritorio se fuerza abierto
              por CSS y en el móvil el navegador ya sabe plegar y desplegar. */}
          <div className="habs-rejilla">
            {panel.bloques.map((b, ib) => (
              <details key={b.grupo} className="habs-bloque" open={ib === 0}>
                <summary className="habs-grupo mono">
                  <span>{b.grupo}</span>
                  <span className="habs-cuenta">{b.items.length}</span>
                  <span className="habs-chevron" aria-hidden="true">⌄</span>
                </summary>
                <ul className="habs-lista">
                  {b.items.map((h, i) => (
                    <Barra key={h.nombre} h={h} i={i} activo={dentro} />
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </div>

        <p className="habs-pie">
          <Rico texto={t.hab.pie} />
        </p>
      </div>
    </section>
  )
}
