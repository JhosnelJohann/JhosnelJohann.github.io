import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { marcas, canales, type Marca } from '../datos/marcas'
import { useEnVista } from './utiles'
import './Diseno.css'

function Hoja({ m, i, abrir }: { m: Marca; i: number; abrir: () => void }) {
  const { ref, dentro } = useEnVista<HTMLLIElement>()
  return (
    <li
      ref={ref}
      className={`hoja revela ${dentro ? 'dentro' : ''}`}
      style={{ transitionDelay: `${Math.min(i, 6) * 65}ms` }}
    >
      <button className="hoja-btn" onClick={abrir}>
        <div className="hoja-img">
          <img
            src={`diseno/${m.slug}-mini.jpg`}
            alt={`Piezas gráficas para ${m.nombre}`}
            loading="lazy"
            width={900}
            height={1092}
          />
          <span className="hoja-lupa mono">Ampliar</span>
        </div>
        <div className="hoja-pie">
          <p className="hoja-nombre">{m.nombre}</p>
          <p className="hoja-sector">{m.sector}</p>
          <p className="mono hoja-handle">@{m.instagram}</p>
        </div>
      </button>
    </li>
  )
}

function Visor({ m, cerrar }: { m: Marca; cerrar: () => void }) {
  useEffect(() => {
    const antes = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && cerrar()
    window.addEventListener('keydown', esc)
    return () => {
      document.body.style.overflow = antes
      window.removeEventListener('keydown', esc)
    }
  }, [cerrar])

  return (
    <motion.div
      className="visor-fondo"
      onClick={cerrar}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="visor"
        role="dialog"
        aria-modal="true"
        aria-label={`Muestras de ${m.nombre}`}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 26, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 14 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <button className="ficha-cerrar" onClick={cerrar} aria-label="Cerrar">✕</button>
        <img src={`diseno/${m.slug}.jpg`} alt={`Hoja de muestras de ${m.nombre}`} />
        <div className="visor-pie">
          <div>
            <p className="visor-nombre">{m.nombre}</p>
            <p className="visor-sector mono">{m.sector}</p>
          </div>
          <a
            className="visor-enlace mono"
            href={`https://instagram.com/${m.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            @{m.instagram} ↗
          </a>
        </div>
        <p className="visor-texto">{m.trabajo}</p>
      </motion.div>
    </motion.div>
  )
}

export default function Diseno() {
  const [abierta, setAbierta] = useState<Marca | null>(null)

  return (
    <section id="diseno" className="dis">
      <div className="env">
        <div className="cab-seccion">
          <p className="cab-num mono"><b>05</b> Diseño y audiovisual</p>
          <h2 className="cab-titulo">De aquí vengo, y no lo he dejado.</h2>
          <p className="cab-nota">
            La tentación de quien cambia de perfil es borrar el pasado. Sería un error: un
            desarrollador que ha comprado anuncios con presupuesto real{' '}
            <b>resuelve problemas que otro desarrollador ni siquiera identifica</b>. Estas son mis
            hojas de muestra de trabajo, una por marca.
          </p>
        </div>

        <ul className="hojas">
          {marcas.map((m, i) => (
            <Hoja key={m.slug} m={m} i={i} abrir={() => setAbierta(m)} />
          ))}
        </ul>

        <div className="canales">
          <p className="canales-rotulo mono">Los dos canales cuyo contenido edité</p>
          {canales.map((c) => (
            <a
              key={c.handle}
              className={`canal canal-${c.red.toLowerCase()}`}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="canal-icono" aria-hidden="true">
                {c.red === 'YouTube' ? (
                  <svg viewBox="0 0 24 24" width="24" height="17">
                    <path
                      fill="currentColor"
                      d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z"
                    />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path
                      fill="currentColor"
                      d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.6.22 1 .48 1.4.9.43.42.7.82.92 1.4.17.42.37 1.06.42 2.25.06 1.28.07 1.66.07 4.88s-.01 3.6-.07 4.88c-.05 1.2-.25 1.83-.42 2.25-.22.58-.49.98-.91 1.4-.42.42-.82.69-1.4.91-.42.17-1.06.37-2.25.42-1.28.06-1.66.07-4.88.07s-3.6-.01-4.88-.07c-1.2-.05-1.83-.25-2.25-.42-.58-.22-.98-.49-1.4-.91-.42-.42-.69-.82-.91-1.4-.17-.42-.37-1.06-.42-2.25C2.21 15.6 2.2 15.22 2.2 12s.01-3.6.07-4.88c.05-1.2.25-1.83.42-2.25.22-.58.49-.98.91-1.4.42-.42.82-.69 1.4-.91.42-.17 1.06-.37 2.25-.42C8.4 2.21 8.78 2.2 12 2.2Zm0 5.2a4.6 4.6 0 1 0 0 9.2 4.6 4.6 0 0 0 0-9.2Zm0 7.6a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm5.9-7.8a1.08 1.08 0 1 1-2.15 0 1.08 1.08 0 0 1 2.15 0Z"
                    />
                  </svg>
                )}
              </span>
              <span className="canal-txt">
                <b>{c.nombre}</b>
                <span>{c.descripcion}</span>
              </span>
              <span className="mono canal-ir">@{c.handle} ↗</span>
            </a>
          ))}
        </div>

        <div className="marketing">
          <h3 className="marketing-titulo">Tres decisiones de marketing que nadie me encargó</h3>
          <ol className="marketing-lista">
            <li>
              <b>Detuve una configuración que habría duplicado el conteo de conversiones.</b> Es un
              fallo que casi nunca se detecta, porque los números suben.
            </li>
            <li>
              <b>Metí las reseñas de Google dentro de un modal</b> en vez de enlazar fuera, para no
              regalar el visitante que la empresa se acababa de pagar.
            </li>
            <li>
              <b>Implementé la persistencia de la atribución</b> a lo largo de ocho pasos de
              formulario, para que la inversión publicitaria se pueda medir de verdad.
            </li>
          </ol>
        </div>
      </div>

      <AnimatePresence>
        {abierta && <Visor m={abierta} cerrar={() => setAbierta(null)} />}
      </AnimatePresence>
    </section>
  )
}
