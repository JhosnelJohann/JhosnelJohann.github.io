import { useEffect, useState } from 'react'
import './Nav.css'

const SECCIONES = [
  { id: 'evidencia', et: 'Evidencia' },
  { id: 'trayectoria', et: 'Trayectoria' },
  { id: 'proyectos', et: 'Proyectos' },
  { id: 'stack', et: 'Stack' },
  { id: 'diseno', et: 'Diseño' },
  { id: 'contacto', et: 'Contacto' },
]

type Tema = 'auto' | 'claro' | 'oscuro'

export default function Nav() {
  const [pegado, setPegado] = useState(false)
  const [activa, setActiva] = useState('')
  const [progreso, setProgreso] = useState(0)
  const [tema, setTema] = useState<Tema>('auto')

  useEffect(() => {
    const alScroll = () => {
      const y = window.scrollY
      setPegado(y > 90)
      const alto = document.body.scrollHeight - window.innerHeight
      setProgreso(alto > 0 ? Math.min(1, y / alto) : 0)
      // Arriba del todo no hay sección activa: aún estamos en la portada.
      if (y < 220) setActiva('')
    }
    alScroll()
    window.addEventListener('scroll', alScroll, { passive: true })
    return () => window.removeEventListener('scroll', alScroll)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) if (e.isIntersecting) setActiva(e.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    SECCIONES.forEach((s) => {
      const n = document.getElementById(s.id)
      if (n) obs.observe(n)
    })
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const raiz = document.documentElement
    if (tema === 'auto') raiz.removeAttribute('data-theme')
    else raiz.setAttribute('data-theme', tema === 'claro' ? 'light' : 'dark')
  }, [tema])

  const siguienteTema = () =>
    setTema((t) => (t === 'auto' ? 'claro' : t === 'claro' ? 'oscuro' : 'auto'))

  return (
    <>
      <div className="progreso" style={{ transform: `scaleX(${progreso})` }} aria-hidden="true" />

      <nav className={`nav ${pegado ? 'nav-pegado' : ''}`}>
        <div className="env nav-env">
          <a href="#inicio" className="nav-marca">
            <span className="nav-jl mono">JL</span>
            <span className="nav-nombre">Jhosnel Laya</span>
          </a>

          <ul className="nav-lista">
            {SECCIONES.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={`nav-enlace mono ${activa === s.id ? 'activo' : ''}`}
                >
                  {s.et}
                </a>
              </li>
            ))}
          </ul>

          <button
            className="nav-tema mono"
            onClick={siguienteTema}
            aria-label={`Tema: ${tema}. Cambiar.`}
            title={`Tema: ${tema}`}
          >
            {tema === 'auto' ? '◐' : tema === 'claro' ? '☀' : '☾'}
          </button>
        </div>
      </nav>
    </>
  )
}
