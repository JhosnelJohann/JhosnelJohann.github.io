import { useEffect, useMemo, useState } from 'react'
import { perfil, cifras } from '../datos/perfil'
import { lineas } from '../datos/bitacora'
import { sinMovimiento } from './utiles'
import './Hero.css'

/** Terminal que teclea líneas reales de su bitácora del servidor. */
function Terminal() {
  const [i, setI] = useState(0)
  const [n, setN] = useState(0)
  const [borrando, setBorrando] = useState(false)
  const quieto = useMemo(sinMovimiento, [])

  const linea = lineas[i % lineas.length]

  useEffect(() => {
    if (quieto) return
    const completo = linea.texto.length

    if (!borrando && n < completo) {
      const t = setTimeout(() => setN(n + 1), 14)
      return () => clearTimeout(t)
    }
    if (!borrando && n >= completo) {
      const t = setTimeout(() => setBorrando(true), 3400)
      return () => clearTimeout(t)
    }
    if (borrando && n > 0) {
      const t = setTimeout(() => setN(0), 320)
      return () => clearTimeout(t)
    }
    setBorrando(false)
    setI((v) => (v + 1) % lineas.length)
  }, [n, borrando, linea.texto.length, quieto])

  const visible = quieto ? linea.texto : linea.texto.slice(0, n)

  return (
    <div className="term" aria-live="off">
      <div className="term-barra">
        <span className="term-punto" />
        <span className="term-punto" />
        <span className="term-punto" />
        <span className="mono term-ruta">dev_coord.cambios</span>
      </div>
      <div className="term-cuerpo mono">
        <div className="term-meta">
          <span className="term-fecha">{linea.fecha}</span>
          <span className={`term-area t-${linea.tono}`}>{linea.area}</span>
        </div>
        <p className="term-texto">
          <span className="term-flecha">›</span> {visible}
          {!quieto && <span className="term-cursor" aria-hidden="true" />}
        </p>
      </div>
      <p className="term-pie mono">
        Registro real del servidor de producción · {lineas.length} de 179 entradas suyas
      </p>
    </div>
  )
}

export default function Hero() {
  return (
    <header className="hero">
      <div className="hero-trama" aria-hidden="true" />

      <div className="env hero-env">
        <div className="hero-alto">
          <div className="hero-izq">
            <p className="mono hero-eyebrow">
              <span className="hero-señal" aria-hidden="true" />
              {perfil.periodo}
            </p>

            <h1 className="hero-nombre">
              <span>Jhosnel</span>
              <span>Laya</span>
            </h1>

            <p className="hero-rol">{perfil.rol}</p>
            <p className="hero-sub">{perfil.subtitulo}</p>

            <p className="hero-tesis">
              De editor de vídeo a <b>responsable técnico de una plataforma en producción</b>.
              Trece meses, sin equipo técnico alrededor del que aprender.
            </p>

            <div className="hero-acciones">
              <a className="btn btn-primario" href="#proyectos">
                Ver los nueve proyectos
              </a>
              <a
                className="btn btn-secundario"
                href={`https://wa.me/${perfil.telefonoWhatsApp}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Hablar por WhatsApp
              </a>
            </div>
          </div>

          <figure className="retrato">
            <img
              src="foto.jpg"
              alt="Jhosnel Laya"
              width={640}
              height={640}
              fetchPriority="high"
            />
            <figcaption className="mono">Barquisimeto, Venezuela</figcaption>
          </figure>

          <div className="hero-der">
            <Terminal />
          </div>
        </div>
      </div>

      <div className="env">
        <ul className="tira">
          {cifras.map((c) => (
            <li key={c.que} className="tira-celda">
              <p className="tira-n mono">
                {c.n}
                {c.de && <small>{c.de}</small>}
              </p>
              <p className="tira-que">{c.que}</p>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
