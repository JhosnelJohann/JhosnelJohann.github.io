import { stack, declarados } from '../datos/perfil'
import { useEnVista } from './utiles'
import './Stack.css'

export default function Stack() {
  const { ref, dentro } = useEnVista<HTMLDivElement>()

  return (
    <section id="stack" className="stack">
      <div className="env">
        <p className="rotulo"><b>04</b> Herramientas</p>
        <h2 className="titulo-seccion">Agrupado por función, no como nube de logos.</h2>
        <p className="entradilla">
          En julio de 2025 nada de la mitad superior de esta lista estaba en su repertorio. La ruta
          fue: marketing → landing pages → automatización → bases de datos → arquitectura de
          sistemas → IA aplicada. <b>Trece meses, con producción real de por medio.</b>
        </p>

        <div className="stack-rejilla" ref={ref}>
          {stack.map((g, i) => (
            <div
              key={g.grupo}
              className={`stack-grupo revela ${dentro ? 'dentro' : ''} t-${g.color}`}
              style={{ transitionDelay: `${Math.min(i, 8) * 55}ms` }}
            >
              <h3 className="stack-titulo">
                <span className="stack-punto" aria-hidden="true" />
                {g.grupo}
              </h3>
              <ul className="stack-items">
                {g.items.map((t) => <li key={t} className="mono">{t}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <div className="declarados">
          <h3 className="declarados-titulo mono">Declarado en formación · sin uso en producción</h3>
          <ul className="declarados-lista">
            {declarados.map((d) => <li key={d} className="mono">{d}</li>)}
          </ul>
          <p className="declarados-nota">
            Consta en su TSU en Informática y en su currículum anterior, pero <b>no hay registro de
            uso en este trabajo</b>. Va separado a propósito: en una entrevista técnica, decir «lo
            estudié, no lo he usado en producción» genera más confianza que dejar que lo descubra
            el entrevistador.
          </p>
        </div>
      </div>
    </section>
  )
}
