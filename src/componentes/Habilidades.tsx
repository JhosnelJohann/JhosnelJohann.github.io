import { useState } from 'react'
import { paneles, ANCHO_NIVEL, type Habilidad } from '../datos/habilidades'
import { useEnVista } from '../efectos/movimiento'
import './Habilidades.css'

function Barra({ h, i, activo }: { h: Habilidad; i: number; activo: boolean }) {
  return (
    <li className="hab" title={h.nota ?? h.nivel}>
      <div className="hab-fila">
        <span className="hab-nombre">{h.nombre}</span>
        <span className={`hab-nivel mono n-${h.nivel.toLowerCase().replace('-', '')}`}>
          {h.nivel}
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
            <b>04</b> Herramientas
          </p>
          <h2 className="cab-titulo">Lo que sé usar, y hasta dónde.</h2>
          <p className="cab-nota">
            La barra representa <b>un nivel declarado, no un porcentaje inventado</b>. El nivel va
            escrito al lado y cada uno está respaldado por trabajo real: «avanzado» significa que lo
            diseñé, lo llevé a producción y resolví con ello fallos que no eran evidentes.
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

          <div className="habs-rejilla">
            {panel.bloques.map((b) => (
              <div key={b.grupo} className="habs-bloque">
                <h3 className="habs-grupo mono">{b.grupo}</h3>
                <ul className="habs-lista">
                  {b.items.map((h, i) => (
                    <Barra key={h.nombre} h={h} i={i} activo={dentro} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <p className="habs-pie">
          <b>Java, JavaFX, PHP, C++ y C#</b> constan en mi TSU en Informática pero no los he usado
          en producción, y por eso van marcados como formación. En una entrevista técnica prefiero
          decirlo yo antes de que lo descubra quien me entrevista.
        </p>
      </div>
    </section>
  )
}
