import { etapas } from '../datos/bitacora'
import { experiencia, freelance } from '../datos/perfil'
import { useEnVista } from './utiles'
import './Trayectoria.css'

function Etapa({ e, i }: { e: (typeof etapas)[number]; i: number }) {
  const { ref, dentro } = useEnVista<HTMLLIElement>()
  return (
    <li
      ref={ref}
      className={`etapa revela ${dentro ? 'dentro' : ''}`}
      style={{ transitionDelay: `${i * 110}ms` }}
    >
      <div className={`etapa-marca t-${e.tono}`}>
        <span className="mono etapa-n">{e.n}</span>
        <span className="etapa-linea" />
      </div>
      <div className="etapa-cuerpo">
        <p className="mono etapa-periodo">{e.periodo}</p>
        <h3 className="etapa-titulo">{e.titulo}</h3>
        <p className="etapa-texto">{e.texto}</p>
        <p className={`etapa-hito t-${e.tono}`}>{e.hito}</p>
      </div>
    </li>
  )
}

export default function Trayectoria() {
  return (
    <section id="trayectoria" className="tray">
      <div className="env">
        <p className="rotulo">
          <b>02</b> La trayectoria
        </p>
        <h2 className="titulo-seccion">El salto no fue gradual.</h2>
        <p className="entradilla">
          De marketing a administrar un servidor Linux hay una distancia que normalmente se cubre
          con un cambio de puesto y un equipo alrededor. <b>Aquí se cubrió sobre la marcha, con
          producción funcionando.</b>
        </p>

        <ol className="etapas">
          {etapas.map((e, i) => (
            <Etapa key={e.n} e={e} i={i} />
          ))}
        </ol>

        <div className="empleos">
          <h3 className="empleos-titulo">Experiencia</h3>
          <ul className="empleos-lista">
            {experiencia.map((p) => (
              <li key={p.empresa + p.desde} className="empleo">
                <div className="empleo-cab">
                  <div>
                    <p className="empleo-rol">{p.rol}</p>
                    <p className="empleo-empresa">
                      {p.empresa} <span>· {p.lugar}</span>
                    </p>
                  </div>
                  <p className="mono empleo-fechas">
                    {p.desde} — {p.hasta}
                  </p>
                </div>
                <ul className="empleo-puntos">
                  {p.puntos.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <div className="freelance">
            <p className="mono freelance-rotulo">También como freelance</p>
            <ul className="freelance-lista">
              {freelance.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
