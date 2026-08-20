import { experiencia, t, type Puesto } from '../contenido'
import { useEnVista } from '../efectos/movimiento'
import Rico from './Rico'
import './Experiencia.css'

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
          {t.exp.tipos[p.tipo]}
        </span>
        {p.actual && <span className="exp-vivo mono">{t.exp.enCurso}</span>}
      </div>

      <div className="exp-cuerpo">
        <h3 className="exp-rol">{p.rol}</h3>
        <p className="exp-empresa">
          <b>{p.empresa}</b>
          <span> · {p.lugar}</span>
        </p>
        <p className="exp-meta mono">
          <span className="exp-fechas">
            {p.desde} — {p.hasta}
          </span>
          <span className={`exp-modalidad m-${p.modalidad.toLowerCase()}`}>
            {t.exp.modalidades[p.modalidad]}
          </span>
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
            <b>{t.exp.num}</b> {t.exp.rotulo}
          </p>
          <h2 className="cab-titulo">{t.exp.titulo}</h2>
          <p className="cab-nota">
            <Rico texto={t.exp.nota} />
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
