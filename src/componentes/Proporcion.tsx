import { useEnVista, useContador } from './utiles'
import { principios } from '../datos/bitacora'
import './Proporcion.css'

/**
 * Un solo dato, a pantalla completa: 179 de 211.
 * Es la afirmación más fuerte del perfil y la única que casi nadie puede hacer.
 */
export default function Proporcion() {
  const { ref, dentro } = useEnVista<HTMLElement>()
  const n = useContador(179, dentro, 1700)
  const pct = (n / 211) * 100

  return (
    <section id="evidencia" className="prop" ref={ref}>
      <div className="env">
        <p className="rotulo">
          <b>01</b> La evidencia
        </p>

        <div className="prop-grande">
          <span className="mono prop-n">{n}</span>
          <span className="mono prop-de">/ 211</span>
        </div>

        <div className="prop-pista" role="img" aria-label={`${n} de 211 cambios`}>
          <div className="prop-relleno" style={{ width: `${pct}%` }} />
        </div>

        <div className="prop-texto">
          <h2 className="titulo-seccion">
            De los 211 cambios registrados del servidor, <span className="t-azul">179 son suyos</span>.
          </h2>
          <p className="entradilla">
            No es una estimación: es el conteo de una tabla. En el servidor de producción hay una
            bitácora llamada <code className="mono">dev_coord.cambios</code> donde queda registrado
            todo lo que se toca, con quién lo hizo y cómo lo verificó. <b>Su antiguo empleador puede
            confirmarlo</b>, y la consulta exacta está en el expediente.
          </p>
          <p className="prop-matiz">
            <b>Y un matiz que él mismo declara:</b> la bitácora no existía antes del 19 de junio de
            2026. Los 179 registros cubren <b>dos meses de los trece</b>. Son un suelo, no un techo.
          </p>
        </div>

        <ul className="principios">
          {principios.map((p) => (
            <li key={p.n} className="principio">
              <span className="mono principio-n">{p.n}</span>
              <p className="principio-frase mono">«{p.frase}»</p>
              <p className="principio-que">{p.que}</p>
            </li>
          ))}
        </ul>
        <p className="principios-pie">
          Cinco frases suyas, sin editar. <b>Ninguna habla de una tecnología.</b>
        </p>
      </div>
    </section>
  )
}
