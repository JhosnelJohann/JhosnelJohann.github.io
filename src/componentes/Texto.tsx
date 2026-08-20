import { useEnVista, quieto } from '../efectos/movimiento'
import './Texto.css'

/* ══════════════════════════════════════════════════════════════════
   Cuatro animaciones de texto. Todas respetan `prefers-reduced-motion`
   y todas dejan el texto legible para un lector de pantalla: se anima
   el marcado, no el contenido.
   ══════════════════════════════════════════════════════════════════ */

/** Letra a letra, con desenfoque y rotación. Para el nombre del hero. */
export function Letras({
  texto,
  retardo = 0,
  paso = 0.032,
  className = '',
}: {
  texto: string
  retardo?: number
  paso?: number
  className?: string
}) {
  if (quieto()) return <span className={className}>{texto}</span>

  /* Cada palabra va dentro de su propia unidad indivisible. Sin esto el
     navegador puede partir entre dos letras cualesquiera —«Jho / snel»—
     porque cada letra es un bloque independiente. Se veía a 320 px. */
  const palabras = texto.split(' ')
  let n = -1

  return (
    <span className={`cinetica ${className}`} aria-label={texto}>
      {palabras.map((palabra, ip) => (
        <span className="cin-palabra" key={ip}>
          {[...palabra].map((c, i) => {
            n++
            return (
              <span
                key={i}
                aria-hidden="true"
                style={{ animationDelay: `${retardo + n * paso}s` }}
              >
                {c}
              </span>
            )
          })}
          {ip < palabras.length - 1 && (
            <span className="cin-espacio" aria-hidden="true">
              {' '}
            </span>
          )}
        </span>
      ))}
    </span>
  )
}

/** Palabra a palabra al entrar en pantalla. Para párrafos destacados. */
export function Palabras({
  texto,
  className = '',
  paso = 0.028,
}: {
  texto: string
  className?: string
  paso?: number
}) {
  const { ref, dentro } = useEnVista<HTMLParagraphElement>()
  const partes = texto.split(' ')

  /* El espacio va FUERA del span. Dentro de un `inline-block` el navegador
     recorta el espacio final y las palabras salen pegadas: «Sieteañosentre».
     Se veía en el móvil. */
  return (
    <p ref={ref} className={`palabras ${dentro ? 'dentro' : ''} ${className}`}>
      {partes.map((palabra, i) => (
        <span key={i}>
          <span className="pal" style={{ transitionDelay: `${i * paso}s` }}>
            {palabra}
          </span>
          {i < partes.length - 1 ? ' ' : ''}
        </span>
      ))}
    </p>
  )
}

/** Barrido de brillo sobre el texto, en bucle lento. Para cifras grandes. */
export function Brillo({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return <span className={`brillo ${className}`}>{children}</span>
}

/**
 * Cifra que gira como un marcador mecánico al entrar en pantalla.
 * Cada dígito sube por su propia columna.
 */
export function Rodillo({ valor, className = '' }: { valor: string; className?: string }) {
  const { ref, dentro } = useEnVista<HTMLSpanElement>()

  if (quieto()) return <span className={className}>{valor}</span>

  return (
    <span ref={ref} className={`rodillo ${dentro ? 'dentro' : ''} ${className}`} aria-label={valor}>
      {[...valor].map((c, i) => {
        const dig = Number.parseInt(c, 10)
        if (Number.isNaN(dig)) {
          return (
            <span key={i} className="rod-fijo" aria-hidden="true">
              {c === ' ' ? ' ' : c}
            </span>
          )
        }
        return (
          <span key={i} className="rod-col" aria-hidden="true">
            <span
              className="rod-tira"
              style={{
                transitionDelay: `${i * 0.07}s`,
                '--fin': dig,
              } as React.CSSProperties}
            >
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
                <span key={d}>{d}</span>
              ))}
            </span>
          </span>
        )
      })}
    </span>
  )
}
