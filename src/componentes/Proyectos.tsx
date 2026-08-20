import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { proyectos, disciplinas, type Disciplina, type Proyecto } from '../datos/proyectos'
import Portada from './Portada'
import { useEnVista } from './utiles'
import './Proyectos.css'

function Tarjeta({ p, i, abrir }: { p: Proyecto; i: number; abrir: () => void }) {
  const { ref, dentro } = useEnVista<HTMLLIElement>()
  return (
    <motion.li
      layout
      ref={ref}
      className={`tarjeta revela ${dentro ? 'dentro' : ''} t-${p.color}`}
      style={{ transitionDelay: `${Math.min(i, 5) * 70}ms` }}
      initial={false}
    >
      <button className="tarjeta-btn" onClick={abrir} aria-label={`Abrir ${p.titulo}`}>
        <Portada id={p.id} color={p.color} />

        <div className="tarjeta-cuerpo">
          <div className="tarjeta-cab">
            {p.distintivo && <span className="tarjeta-distintivo mono">{p.distintivo}</span>}
            <span className="mono tarjeta-año">{p.año}</span>
          </div>

          <h3 className="tarjeta-titulo">{p.titulo}</h3>
          <p className="tarjeta-gancho">{p.gancho}</p>

          <ul className="tarjeta-cifras">
            {p.cifras.slice(0, 3).map((c) => (
              <li key={c.que}>
                <b className="mono">{c.n}</b>
                <span>{c.que}</span>
              </li>
            ))}
          </ul>

          <div className="tarjeta-pie">
            <ul className="tarjeta-discs">
              {p.disciplinas.map((d) => (
                <li key={d} className="mono">{d}</li>
              ))}
            </ul>
            <span className="tarjeta-mas mono">Ver ficha →</span>
          </div>
        </div>
      </button>
    </motion.li>
  )
}

function Ficha({ p, cerrar }: { p: Proyecto; cerrar: () => void }) {
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
      className="ficha-fondo"
      onClick={cerrar}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
    >
      <motion.article
        className={`ficha t-${p.color}`}
        role="dialog"
        aria-modal="true"
        aria-label={p.titulo}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 32, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.99 }}
        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
      >
        <button className="ficha-cerrar" onClick={cerrar} aria-label="Cerrar">✕</button>

        <Portada id={p.id} color={p.color} />

        <div className="ficha-cuerpo">
          <div className="tarjeta-cab">
            {p.distintivo && <span className="tarjeta-distintivo mono">{p.distintivo}</span>}
            <span className="mono tarjeta-año">{p.año}</span>
          </div>

          <h3 className="ficha-titulo">{p.titulo}</h3>
          <p className="ficha-gancho">{p.gancho}</p>

          <ul className="ficha-cifras">
            {p.cifras.map((c) => (
              <li key={c.que}>
                <b className="mono">{c.n}</b>
                <span>{c.que}</span>
              </li>
            ))}
          </ul>

          {p.cuerpo.map((t) => (
            <p key={t.slice(0, 24)} className="ficha-parrafo">{t}</p>
          ))}

          {p.cita && (
            <blockquote className="ficha-cita">
              <p className="mono">«{p.cita.texto}»</p>
              <footer className="mono">bitácora del servidor · {p.cita.fecha}</footer>
            </blockquote>
          )}

          <h4 className="ficha-sub">Qué enseñar de este proyecto</h4>
          <ul className="ficha-enseñar">
            {p.enseñar.map((t) => <li key={t}>{t}</li>)}
          </ul>

          <h4 className="ficha-sub">Stack</h4>
          <ul className="ficha-stack">
            {p.stack.map((s) => <li key={s} className="mono">{s}</li>)}
          </ul>
        </div>
      </motion.article>
    </motion.div>
  )
}

export default function Proyectos() {
  const [filtro, setFiltro] = useState<Disciplina | null>(null)
  const [abierto, setAbierto] = useState<Proyecto | null>(null)

  const lista = filtro ? proyectos.filter((p) => p.disciplinas.includes(filtro)) : proyectos

  return (
    <section id="proyectos" className="proys">
      <div className="env">
        <p className="rotulo"><b>03</b> El trabajo</p>
        <h2 className="titulo-seccion">Nueve proyectos, todos en producción.</h2>
        <p className="entradilla">
          Ninguno es un ejercicio. Cada uno resolvió un problema real de una empresa que estaba
          funcionando mientras se construía. <b>Las portadas están dibujadas, no capturadas</b> — los
          sistemas son internos y publicar sus pantallas expondría datos de clientes.
        </p>

        <div className="filtros" role="group" aria-label="Filtrar por disciplina">
          <button
            className={`filtro mono ${!filtro ? 'activo' : ''}`}
            onClick={() => setFiltro(null)}
          >
            Todos <span>{proyectos.length}</span>
          </button>
          {disciplinas.map((d) => {
            const n = proyectos.filter((p) => p.disciplinas.includes(d)).length
            return (
              <button
                key={d}
                className={`filtro mono ${filtro === d ? 'activo' : ''}`}
                onClick={() => setFiltro(filtro === d ? null : d)}
              >
                {d} <span>{n}</span>
              </button>
            )
          })}
        </div>

        <motion.ul layout className="rejilla">
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
