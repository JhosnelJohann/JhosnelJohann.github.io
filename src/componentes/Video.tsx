import { useRef, useState } from 'react'
import { video, duracion, img, t, type PiezaVideo } from '../contenido'
import { useEnVista } from '../efectos/movimiento'
import './Video.css'

/**
 * Portafolio de edición.
 *
 * Los diez son verticales 9:16, así que la rejilla es de tarjetas altas, no
 * apaisadas. Nada se descarga hasta que se pulsa: `preload="none"` más una
 * portada, para que abrir la página no cueste 190 MB.
 */

function Tarjeta({
  p,
  i,
  activo,
  reproducir,
}: {
  p: PiezaVideo
  i: number
  activo: boolean
  reproducir: (v: HTMLVideoElement | null) => void
}) {
  const { ref, dentro } = useEnVista<HTMLLIElement>()
  const vid = useRef<HTMLVideoElement>(null)
  const [abierto, setAbierto] = useState(false)

  function abrir() {
    setAbierto(true)
    /* En el mismo tick el <video> aún no existe: se espera al pintado. */
    requestAnimationFrame(() => {
      reproducir(vid.current)
      vid.current?.play().catch(() => {
        /* Si el navegador bloquea la reproducción, quedan los controles. */
      })
    })
  }

  return (
    <li
      ref={ref}
      className={`vid revela ${dentro ? 'dentro' : ''}`}
      style={{ transitionDelay: `${Math.min(i, 5) * 60}ms` }}
    >
      <div className="vid-marco">
        {abierto ? (
          <video
            ref={vid}
            className="vid-video"
            src={img(`video/${p.archivo}.mp4`)}
            poster={img(`video/${p.archivo}.jpg`)}
            controls
            playsInline
            preload="metadata"
            onPlay={() => reproducir(vid.current)}
          />
        ) : (
          <button className="vid-btn" onClick={abrir} aria-label={`${t.video.reproducir}: ${p.titulo}`}>
            <img
              src={img(`video/${p.archivo}.jpg`)}
              alt={p.titulo}
              loading="lazy"
              width={540}
              height={960}
            />
            <span className="vid-play" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="22" height="22">
                <path fill="currentColor" d="M8 5.14v13.72L19 12 8 5.14Z" />
              </svg>
            </span>
            <span className="vid-dur mono">{duracion(p.segundos)}</span>
          </button>
        )}
      </div>

      <div className="vid-pie">
        <p className="vid-titulo">{p.titulo}</p>
        <p className="vid-marca mono">{p.marca}</p>
        <p className="vid-nota">{p.nota}</p>
        <p className="vid-formato mono">{p.formato}</p>
      </div>
      {activo && <span className="vid-activo" aria-hidden="true" />}
    </li>
  )
}

export default function Video() {
  const [activo, setActivo] = useState<number | null>(null)
  const abiertos = useRef<Set<HTMLVideoElement>>(new Set())

  /** Solo uno suena a la vez: al arrancar uno, se pausan los demás. */
  function reproducir(v: HTMLVideoElement | null) {
    if (!v) return
    abiertos.current.add(v)
    abiertos.current.forEach((otro) => {
      if (otro !== v && !otro.paused) otro.pause()
    })
    setActivo(video.findIndex((p) => v.src.includes(p.archivo)))
  }

  return (
    <div className="vids">
      <div className="vids-cab">
        <h3 className="vids-titulo">{t.video.titulo}</h3>
        <p className="vids-nota">{t.video.nota}</p>
      </div>

      <ul className="vids-rejilla">
        {video.map((p, i) => (
          <Tarjeta key={p.archivo} p={p} i={i} activo={activo === i} reproducir={reproducir} />
        ))}
      </ul>
    </div>
  )
}
