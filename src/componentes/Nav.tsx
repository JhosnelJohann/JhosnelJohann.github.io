import { useEffect, useRef, useState } from 'react'
import { perfil, t } from '../contenido'
import './Nav.css'

const SECCIONES = [
  { id: 'experiencia', et: t.secciones.experiencia, n: '01' },
  { id: 'trabajo', et: t.secciones.trabajo, n: '02' },
  { id: 'habilidades', et: t.secciones.habilidades, n: '03' },
  { id: 'diseno', et: t.secciones.diseno, n: '04' },
  { id: 'contacto', et: t.secciones.contacto, n: '05' },
]

type Tema = 'auto' | 'claro' | 'oscuro'

export default function Nav() {
  const [pegado, setPegado] = useState(false)
  const [activa, setActiva] = useState('')
  const [progreso, setProgreso] = useState(0)
  const [tema, setTema] = useState<Tema>('auto')
  const [abierto, setAbierto] = useState(false)
  const botonMenu = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const alScroll = () => {
      const y = window.scrollY
      setPegado(y > 90)
      const alto = document.body.scrollHeight - window.innerHeight
      setProgreso(alto > 0 ? Math.min(1, y / alto) : 0)
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

  /* Menú abierto: se bloquea el fondo, cierra con Escape y al cerrar el foco
     vuelve al botón, que es de donde salió. */
  useEffect(() => {
    if (!abierto) return
    const antes = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setAbierto(false)
    window.addEventListener('keydown', esc)
    return () => {
      document.body.style.overflow = antes
      window.removeEventListener('keydown', esc)
      botonMenu.current?.focus()
    }
  }, [abierto])

  const siguienteTema = () =>
    setTema((t) => (t === 'auto' ? 'claro' : t === 'claro' ? 'oscuro' : 'auto'))

  const etiquetaTema =
    tema === 'auto' ? 'automático' : tema === 'claro' ? 'claro' : 'oscuro'

  return (
    <>
      <div className="progreso" style={{ transform: `scaleX(${progreso})` }} aria-hidden="true" />

      <nav className={`nav ${pegado ? 'nav-pegado' : ''} ${abierto ? 'nav-abierta' : ''}`}>
        <div className="env nav-env">
          <a href="#inicio" className="nav-marca" onClick={() => setAbierto(false)}>
            <span className="nav-jl mono">JL</span>
            <span className="nav-nombre">Jhosnel Laya</span>
          </a>

          <ul className="nav-lista">
            {SECCIONES.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className={`nav-enlace mono ${activa === s.id ? 'activo' : ''}`}>
                  {s.et}
                </a>
              </li>
            ))}
          </ul>

          <button
            className="nav-tema mono"
            onClick={siguienteTema}
            aria-label={`Tema ${etiquetaTema}. Cambiar.`}
            title={`Tema: ${etiquetaTema}`}
          >
            {tema === 'auto' ? '◐' : tema === 'claro' ? '☀' : '☾'}
          </button>

          <a
            className="nav-idioma mono"
            href={t.irAOtroIdioma}
            title={t.otroIdiomaTitulo}
            hrefLang={t.otroIdioma.toLowerCase()}
          >
            {t.otroIdioma}
          </a>

          <button
            ref={botonMenu}
            className="nav-hamburguesa"
            onClick={() => setAbierto((v) => !v)}
            aria-expanded={abierto}
            aria-controls="menu-movil"
            aria-label={abierto ? t.cerrarMenu : t.abrirMenu}
          >
            <span className="nav-linea" />
            <span className="nav-linea" />
            <span className="nav-linea" />
          </button>
        </div>
      </nav>

      <div
        id="menu-movil"
        className={`mnu ${abierto ? 'mnu-visible' : ''}`}
        hidden={!abierto}
      >
        <ul className="mnu-lista">
          {SECCIONES.map((s, i) => (
            <li key={s.id} style={{ transitionDelay: `${60 + i * 45}ms` }}>
              <a href={`#${s.id}`} onClick={() => setAbierto(false)}>
                <span className="mnu-n mono">{s.n}</span>
                <span className="mnu-et">{s.et}</span>
                <span className="mnu-flecha" aria-hidden="true">→</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mnu-pie">
          <a
            className="btn btn-primario mnu-wa"
            href={`https://wa.me/${perfil.telefonoWhatsApp}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setAbierto(false)}
          >
            WhatsApp · {perfil.telefono}
          </a>
          <div className="mnu-enlaces">
            <a className="mnu-ig mono" href={`mailto:${perfil.correo}`} onClick={() => setAbierto(false)}>
              {perfil.correo}
            </a>
            <a
              className="mnu-ig mono"
              href={`https://instagram.com/${perfil.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setAbierto(false)}
            >
              @{perfil.instagram} ↗
            </a>
          </div>
          <div className="mnu-fila-idioma">
            <p className="mnu-nota mono">{perfil.ubicacion}</p>
            {/* El «EN» de la barra mide 44 px y compite con el tema y la
                hamburguesa. Aquí va con su nombre completo y sitio propio. */}
            <a className="mnu-idioma mono" href={t.irAOtroIdioma} hrefLang={t.otroIdioma.toLowerCase()}>
              {t.otroIdiomaTitulo} ↗
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
