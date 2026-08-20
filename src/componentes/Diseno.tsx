import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { marcas, youtube, type Marca } from '../datos/marcas'
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
        <p className="rotulo"><b>05</b> Diseño y audiovisual</p>
        <h2 className="titulo-seccion">De donde viene, y no lo ha perdido.</h2>
        <p className="entradilla">
          La tentación de quien cambia de perfil es borrar el pasado. Sería un error: un
          desarrollador que ha comprado anuncios con presupuesto real{' '}
          <b>resuelve problemas que otro desarrollador ni siquiera identifica</b>. Estas son sus
          propias hojas de muestra, recuperadas de su currículum anterior.
        </p>

        <ul className="hojas">
          {marcas.map((m, i) => (
            <Hoja key={m.slug} m={m} i={i} abrir={() => setAbierta(m)} />
          ))}
        </ul>

        <a
          className="youtube"
          href={youtube.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="youtube-icono" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="26" height="18">
              <path
                fill="currentColor"
                d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z"
              />
            </svg>
          </span>
          <span className="youtube-txt">
            <b>{youtube.nombre}</b>
            <span>{youtube.descripcion}</span>
          </span>
          <span className="mono youtube-ir">@{youtube.handle} ↗</span>
        </a>

        <div className="marketing">
          <h3 className="marketing-titulo">Tres decisiones de marketing que nadie le encargó</h3>
          <ol className="marketing-lista">
            <li>
              <b>Detuvo una configuración que habría duplicado el conteo de conversiones.</b> Un
              fallo que nunca se detecta, porque los números suben.
            </li>
            <li>
              <b>Integró las reseñas de Google dentro de un modal</b> en vez de enlazar fuera, para
              no regalar el visitante que se acababa de pagar.
            </li>
            <li>
              <b>Implementó la persistencia de la atribución</b> a lo largo de ocho pasos de
              formulario, para que la inversión publicitaria se pueda medir.
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
