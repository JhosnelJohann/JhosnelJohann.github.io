import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { trabajo, categorias, t, con, img, etiquetaCategoria, type Categoria, type Pieza } from '../contenido'
import Portada from './Portada'
import Rico from './Rico'
import { useEnVista, useInclinacion } from '../efectos/movimiento'
import './Trabajo.css'

const dominio = (u: string) => u.replace(/^https?:\/\//, '').replace(/\/$/, '')
/** Solo se enlaza lo que un visitante puede abrir hoy sin tropezar. */
const abrible = (p: Pieza) => !!p.url && !p.pendiente
/** Cada familia de galería vive en su carpeta dentro de public/. */
const CARPETAS: Record<string, string> = {
  'crm-tadi': 'crm',
  'paula-manhattan': 'n8n',
  ghl: 'ghl',
}
const carpeta = (p: Pieza) => CARPETAS[p.id] ?? 'landings'

/**
 * La captura, presentada como un panel de navegador flotando en perspectiva.
 * Es el tratamiento 3D aplicado a SU material, no a clipart de stock.
 */
function Miniatura({ p }: { p: Pieza }) {
  if (p.captura) {
    return (
      <div className="mini">
        <div className="panel">
          <div className="panel-barra" aria-hidden="true">
            <span className="panel-punto" />
            <span className="panel-punto" />
            <span className="panel-punto" />
            <span className="panel-url mono">
              {abrible(p) ? dominio(p.url!) : p.restringido ?? t.trab.accesoRestringido}
            </span>
          </div>
          {/* En el teléfono se sirve la captura de móvil: la de escritorio
              recortada a una franja no dice nada en una pantalla pequeña. */}
          <picture>
            <source
              media="(max-width: 700px)"
              srcSet={img(`trabajo/${p.captura}-movil.jpg`)}
            />
            <img
              src={img(`trabajo/${p.captura}.jpg`)}
              alt={con(t.alt.captura, p.titulo)}
              loading="lazy"
              width={1280}
              height={800}
            />
          </picture>
          <span className="panel-brillo" aria-hidden="true" />
        </div>
        {!abrible(p) && p.restringido && <span className="mini-candado mono">🔒 {p.restringido}</span>}
      </div>
    )
  }
  return (
    <div className="mini mini-dibujo">
      <Portada id={p.motivo ?? p.id} color={p.color} />
      {p.restringido && <span className="mini-candado mono">🔒 {p.restringido}</span>}
    </div>
  )
}

function Tarjeta({ p, i, abrir }: { p: Pieza; i: number; abrir: () => void }) {
  const { ref, dentro } = useEnVista<HTMLLIElement>()
  const tilt = useInclinacion(7)
  return (
    <motion.li
      layout
      ref={ref}
      className={`tj revela tilt-escena ${dentro ? 'dentro' : ''} c-${p.color}`}
      style={{ transitionDelay: `${Math.min(i, 5) * 60}ms` }}
      initial={false}
    >
      <div ref={tilt} className="tj-tilt tilt borde-vivo foco">
      <button className="tj-btn" onClick={abrir} aria-label={con(t.trab.verDetalle, p.titulo)}>
        <Miniatura p={p} />

        <div className="tj-cuerpo">
          <div className="tj-cab">
            <span className="tj-cat mono">{etiquetaCategoria(p.categoria)}</span>
            <span className="tj-año mono">{p.año}</span>
          </div>

          <h3 className="tj-titulo">{p.titulo}</h3>
          <p className="tj-gancho">{p.gancho}</p>

          <ul className="tj-cifras">
            {p.cifras.map((c) => (
              <li key={c.que}>
                <b className="mono">{c.n}</b>
                <span>{c.que}</span>
              </li>
            ))}
          </ul>
        </div>
      </button>

      <div className="tj-pie">
        {abrible(p) ? (
          <a
            className="tj-url mono"
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            {dominio(p.url!)} ↗
          </a>
        ) : (
          <span className="tj-url tj-url-off mono">{p.restringido}</span>
        )}
        <button className="tj-mas mono" onClick={abrir}>
          {t.trab.detalle}
        </button>
      </div>
      </div>
    </motion.li>
  )
}

function Ficha({ p, cerrar }: { p: Pieza; cerrar: () => void }) {
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
      className="fi-fondo"
      onClick={cerrar}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.article
        className={`fi c-${p.color}`}
        role="dialog"
        aria-modal="true"
        aria-label={p.titulo}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 26, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 14 }}
        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
      >
        <button className="fi-cerrar" onClick={cerrar} aria-label={t.cerrar}>
          ✕
        </button>

        <Miniatura p={p} />

        <div className="fi-cuerpo">
          <div className="tj-cab">
            <span className="tj-cat mono">{etiquetaCategoria(p.categoria)}</span>
            <span className="tj-año mono">{p.año}</span>
          </div>

          <h3 className="fi-titulo">{p.titulo}</h3>
          <p className="fi-gancho">{p.gancho}</p>

          {abrible(p) && (
            <div className="fi-acceso">
              <a className="btn btn-primario" href={p.url} target="_blank" rel="noopener noreferrer">
                {t.trab.visitar} {dominio(p.url!)} ↗
              </a>
              {p.restringido && <span className="fi-nota-acceso mono">🔒 {p.restringido}</span>}
            </div>
          )}
          {!abrible(p) && p.restringido && (
            <p className="fi-restringido mono">
              🔒 {p.restringido}
              {p.url && <span className="fi-futura"> · {dominio(p.url)}</span>}
            </p>
          )}

          <ul className="fi-cifras">
            {p.cifras.map((c) => (
              <li key={c.que}>
                <b className="mono">{c.n}</b>
                <span>{c.que}</span>
              </li>
            ))}
          </ul>

          {p.detalle.map((d) => (
            <p key={d.slice(0, 24)} className="fi-parrafo">
              {d}
            </p>
          ))}

          {p.galeria && (
            <>
              <h4 className="fi-sub mono">{t.trab.porDentro}</h4>
              <ul className={`fi-galeria ${carpeta(p) === 'landings' ? 'fi-galeria-movil' : ''}`}>
                {p.galeria.map((g) => (
                  <li key={g.archivo}>
                    <img src={img(`${carpeta(p)}/${g.archivo}.jpg`)} alt={g.pie} loading="lazy" />
                    <span>{g.pie}</span>
                  </li>
                ))}
              </ul>
              <p className="fi-aviso mono">
                {
                  {
                    crm: t.trab.avisoCrm,
                    n8n: t.trab.avisoFlujos,
                    ghl: t.trab.avisoFlujos,
                    landings: t.trab.avisoMovil,
                  }[carpeta(p)]
                }
              </p>
            </>
          )}

          <h4 className="fi-sub mono">{t.trab.conQue}</h4>
          <ul className="fi-stack">
            {p.stack.map((s) => (
              <li key={s} className="mono">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </motion.article>
    </motion.div>
  )
}

/** En el teléfono se muestran de seis en seis: 12 tarjetas seguidas son
 *  una travesía de varias pantallas antes de llegar a lo siguiente. */
const TANDA = 6

export default function Trabajo() {
  const [filtro, setFiltro] = useState<Categoria | null>(null)
  const [abierto, setAbierto] = useState<Pieza | null>(null)
  const [todas, setTodas] = useState(false)
  const [movil, setMovil] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 700px)')
    const ver = () => setMovil(mq.matches)
    ver()
    mq.addEventListener('change', ver)
    return () => mq.removeEventListener('change', ver)
  }, [])

  const filtrada = filtro ? trabajo.filter((p) => p.categoria === filtro) : trabajo
  const recorta = movil && !todas && filtrada.length > TANDA
  const lista = recorta ? filtrada.slice(0, TANDA) : filtrada
  const conEnlace = trabajo.filter(abrible).length

  return (
    <section id="trabajo" className="trab oscuro">
      <div className="env">
        <div className="cab-seccion">
          <p className="cab-num mono">
            <b>{t.trab.num}</b> {t.trab.rotulo}
          </p>
          <h2 className="cab-titulo">{t.trab.titulo}</h2>
          <p className="cab-nota">
            <Rico texto={con(t.trab.nota, conEnlace)} />
          </p>
        </div>

        <div className="trab-filtros" role="group" aria-label={t.trab.filtrar}>
          <button
            className={`trab-filtro mono ${!filtro ? 'activo' : ''}`}
            onClick={() => setFiltro(null)}
          >
            {t.trab.todo} <span>{trabajo.length}</span>
          </button>
          {categorias.map((c) => {
            const n = trabajo.filter((p) => p.categoria === c).length
            if (!n) return null
            return (
              <button
                key={c}
                className={`trab-filtro mono ${filtro === c ? 'activo' : ''}`}
                onClick={() => setFiltro(filtro === c ? null : c)}
              >
                {etiquetaCategoria(c)} <span>{n}</span>
              </button>
            )
          })}
        </div>

        <motion.ul layout className="trab-rejilla">
          <AnimatePresence mode="popLayout">
            {lista.map((p, i) => (
              <Tarjeta key={p.id} p={p} i={i} abrir={() => setAbierto(p)} />
            ))}
          </AnimatePresence>
        </motion.ul>

        {recorta && (
          <button className="btn btn-borde trab-mas" onClick={() => setTodas(true)}>
            {con(t.trab.verMas, filtrada.length - TANDA)}
          </button>
        )}
      </div>

      <AnimatePresence>
        {abierto && <Ficha p={abierto} cerrar={() => setAbierto(null)} />}
      </AnimatePresence>
    </section>
  )
}
