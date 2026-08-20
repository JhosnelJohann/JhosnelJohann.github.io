import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { trabajo, categorias, type Categoria, type Pieza } from '../datos/trabajo'
import Portada from './Portada'
import { useEnVista, useInclinacion } from '../efectos/movimiento'
import './Trabajo.css'

const dominio = (u: string) => u.replace(/^https?:\/\//, '').replace(/\/$/, '')
/** Solo se enlaza lo que un visitante puede abrir hoy sin tropezar. */
const abrible = (p: Pieza) => !!p.url && !p.pendiente
/** La galería del CRM vive en /crm; la de las landings, en /landings. */
const carpeta = (p: Pieza) => (p.id === 'crm-tadi' ? 'crm' : 'landings')

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
              {abrible(p) ? dominio(p.url!) : p.restringido ?? 'acceso restringido'}
            </span>
          </div>
          <img
            src={`trabajo/${p.captura}.jpg`}
            alt={`Captura de ${p.titulo}`}
            loading="lazy"
            width={1280}
            height={800}
          />
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
      <button className="tj-btn" onClick={abrir} aria-label={`Ver detalle de ${p.titulo}`}>
        <Miniatura p={p} />

        <div className="tj-cuerpo">
          <div className="tj-cab">
            <span className="tj-cat mono">{p.categoria}</span>
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
          Detalle →
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
        <button className="fi-cerrar" onClick={cerrar} aria-label="Cerrar">
          ✕
        </button>

        <Miniatura p={p} />

        <div className="fi-cuerpo">
          <div className="tj-cab">
            <span className="tj-cat mono">{p.categoria}</span>
            <span className="tj-año mono">{p.año}</span>
          </div>

          <h3 className="fi-titulo">{p.titulo}</h3>
          <p className="fi-gancho">{p.gancho}</p>

          {abrible(p) && (
            <div className="fi-acceso">
              <a className="btn btn-primario" href={p.url} target="_blank" rel="noopener noreferrer">
                Visitar {dominio(p.url!)} ↗
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

          {p.detalle.map((t) => (
            <p key={t.slice(0, 24)} className="fi-parrafo">
              {t}
            </p>
          ))}

          {p.galeria && (
            <>
              <h4 className="fi-sub mono">Por dentro</h4>
              <ul className={`fi-galeria ${carpeta(p) === 'landings' ? 'fi-galeria-movil' : ''}`}>
                {p.galeria.map((g) => (
                  <li key={g.archivo}>
                    <img src={`${carpeta(p)}/${g.archivo}.jpg`} alt={g.pie} loading="lazy" />
                    <span>{g.pie}</span>
                  </li>
                ))}
              </ul>
              {carpeta(p) === 'crm' ? (
                <p className="fi-aviso mono">
                  Los datos de clientes y del equipo van difuminados a propósito: son personas
                  reales. La interfaz es la real.
                </p>
              ) : (
                <p className="fi-aviso mono">
                  Capturas en móvil, que es de donde llega el tráfico de anuncios y para donde está
                  diseñada.
                </p>
              )}
            </>
          )}

          <h4 className="fi-sub mono">Con qué está hecho</h4>
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

export default function Trabajo() {
  const [filtro, setFiltro] = useState<Categoria | null>(null)
  const [abierto, setAbierto] = useState<Pieza | null>(null)
  const lista = filtro ? trabajo.filter((p) => p.categoria === filtro) : trabajo
  const conEnlace = trabajo.filter(abrible).length

  return (
    <section id="trabajo" className="trab oscuro">
      <div className="env">
        <div className="cab-seccion">
          <p className="cab-num mono">
            <b>03</b> Portafolio
          </p>
          <h2 className="cab-titulo">Trabajo en producción</h2>
          <p className="cab-nota">
            Doce sistemas que resolvieron un problema real de una empresa en marcha.{' '}
            <b>{conEnlace} están en línea y puedes abrirlos ahora mismo</b> — sus miniaturas son
            capturas reales, no interpretaciones. Los demás son sistemas internos: llevan portada
            dibujada y van marcados como restringidos, porque publicar sus pantallas expondría datos
            de clientes.
          </p>
        </div>

        <div className="trab-filtros" role="group" aria-label="Filtrar por tipo">
          <button
            className={`trab-filtro mono ${!filtro ? 'activo' : ''}`}
            onClick={() => setFiltro(null)}
          >
            Todo <span>{trabajo.length}</span>
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
                {c} <span>{n}</span>
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
      </div>

      <AnimatePresence>
        {abierto && <Ficha p={abierto} cerrar={() => setAbierto(null)} />}
      </AnimatePresence>
    </section>
  )
}
