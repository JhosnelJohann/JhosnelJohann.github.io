import { useRef, useState } from 'react'
import { video, duracion, img, t, type PiezaVideo } from '../contenido'
import { enlaceOriginal } from '../datos/originales'
import { useEnVista } from '../efectos/movimiento'
import Rico from './Rico'
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
  const original = enlaceOriginal(p.archivo)

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
          /* La descripción larga no se pinta —satura una rejilla de diez— pero
             no se tira: va al `aria-label` y al `title`, así que la tiene un
             lector de pantalla y la ven los buscadores. */
          <button
            className="vid-btn"
            onClick={abrir}
            aria-label={`${t.video.reproducir}: ${p.titulo}. ${p.nota}`}
            title={p.nota}
          >
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
            {/* Que lo que se está viendo es una vista previa se dice sobre la
                propia portada, no solo en una nota al principio de la rejilla:
                quien llega directo a una tarjeta no ha leído la nota. */}
            <span className="vid-previa mono">{t.video.previa}</span>
            {/* Barra de acento que avanza al pasar por encima, como el cursor
                de reproducción de un montador. Puro adorno: aria-hidden. */}
            <span className="vid-scrub" aria-hidden="true" />
          </button>
        )}
      </div>

      <div className="vid-pie">
        <p className="vid-titulo">{p.titulo}</p>
        {/* Solo el nombre de la marca. El sector y el formato hacían que la
            línea llenara los 215 px de la tarjeta y las de columnas contiguas
            se leyeran como un texto corrido. */}
        <p className="vid-marca mono">{p.marca.split(' · ')[0]}</p>

        {/* Al original en Drive. Va en el pie y no sobre la portada porque la
            portada entera ya ES un botón, y un enlace dentro de un botón es
            HTML inválido: el navegador lo saca fuera y la tarjeta se rompe. */}
        {original && (
          <a
            className="vid-original mono"
            href={original}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${t.video.verOriginal}: ${p.titulo} (${p.formato})`}
          >
            <svg viewBox="0 0 24 24" width="11" height="11" aria-hidden="true">
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 4h6v6M20 4l-8.5 8.5M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"
              />
            </svg>
            {t.video.verOriginal}
          </a>
        )}
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
      {/* El texto va dentro de su propio span: `Rico` devuelve varios
          elementos, y sueltos dentro de un flex cada uno sería una columna. */}
      <p className="vids-calidad">
        <span className="vids-calidad-i" aria-hidden="true">ⓘ</span>
        <span className="vids-calidad-txt">
          <Rico texto={t.dis.calidad} />
        </span>
      </p>

      <ul className="vids-rejilla">
        {video.map((p, i) => (
          <Tarjeta key={p.archivo} p={p} i={i} activo={activo === i} reproducir={reproducir} />
        ))}
      </ul>
    </div>
  )
}
