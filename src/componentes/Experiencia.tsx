import { experiencia, type Puesto } from '../datos/perfil'
import { useEnVista } from './utiles'
import './Experiencia.css'

/** Convierte **negritas** y `código` del texto plano a marcado. */
function Rico({ texto }: { texto: string }) {
  const trozos = texto.split(/(\*\*[^*]+\*\*|`[^`]+`)/g)
  return (
    <>
      {trozos.map((t, i) => {
        if (t.startsWith('**') && t.endsWith('**')) return <b key={i}>{t.slice(2, -2)}</b>
        if (t.startsWith('`') && t.endsWith('`')) return <code key={i}>{t.slice(1, -1)}</code>
        return <span key={i}>{t}</span>
      })}
    </>
  )
}

function Fila({ p, i }: { p: Puesto; i: number }) {
  const { ref, dentro } = useEnVista<HTMLLIElement>()
  return (
    <li
      ref={ref}
      className={`exp revela ${dentro ? 'dentro' : ''}`}
      style={{ transitionDelay: `${Math.min(i, 4) * 80}ms` }}
    >
      <div className="exp-tiempo">
        <p className="exp-año mono">{p.año}</p>
        <span className={`et exp-tipo ${p.tipo === 'Desarrollo' ? 'c-azul' : p.tipo === 'Diseño' ? 'c-amarillo' : 'c-gris'}`}>
          {p.tipo}
        </span>
        {p.actual && <span className="exp-vivo mono">En curso</span>}
      </div>

      <div className="exp-cuerpo">
        <h3 className="exp-rol">{p.rol}</h3>
        <p className="exp-empresa">
          <b>{p.empresa}</b>
          <span> · {p.lugar}</span>
        </p>
        <p className="exp-fechas mono">
          {p.desde} — {p.hasta}
        </p>

        <p className="exp-resumen">{p.resumen}</p>

        <ul className="exp-logros">
          {p.logros.map((l) => (
            <li key={l.slice(0, 30)}>
              <Rico texto={l} />
            </li>
          ))}
        </ul>

        <ul className="exp-tools">
          {p.herramientas.map((h) => (
            <li key={h} className="mono">
              {h}
            </li>
          ))}
        </ul>
      </div>
    </li>
  )
}

export default function Experiencia() {
  return (
    <section id="experiencia" className="exps">
      <div className="env">
        <div className="cab-seccion">
          <p className="cab-num mono">
            <b>02</b> Trayectoria
          </p>
          <h2 className="cab-titulo">Experiencia laboral</h2>
          <p className="cab-nota">
            Empecé en 2019 haciendo dirección de arte y edición de vídeo, y hoy construyo la
            infraestructura que sostiene ese trabajo. <b>El salto no fue gradual</b>: de marketing a
            administrar un servidor Linux hay una distancia que normalmente se cubre con un cambio
            de puesto y un equipo alrededor. Yo la cubrí sobre la marcha, con producción funcionando.
          </p>
        </div>

        <ol className="exp-lista">
          {experiencia.map((p, i) => (
            <Fila key={p.empresa + p.desde} p={p} i={i} />
          ))}
        </ol>
      </div>
    </section>
  )
}
