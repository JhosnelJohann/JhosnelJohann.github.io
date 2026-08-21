import { useEffect, useRef, useState } from 'react'

export const quieto = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Scroll suave con Lenis, cargado en diferido para no pesar en el arranque. */
export function useScrollSuave() {
  useEffect(() => {
    if (quieto()) {
      document.documentElement.classList.add('sin-lenis')
      return
    }
    let lenis: { raf(t: number): void; destroy(): void; scrollTo(t: unknown, o?: unknown): void } | null = null
    let cuadro = 0
    let vivo = true

    import('lenis').then(({ default: Lenis }) => {
      if (!vivo) return
      lenis = new Lenis({ duration: 1.05, lerp: 0.1, smoothWheel: true })
      const bucle = (t: number) => {
        lenis?.raf(t)
        cuadro = requestAnimationFrame(bucle)
      }
      cuadro = requestAnimationFrame(bucle)

      // Los anclas del menú tienen que seguir funcionando con Lenis puesto
      const alClic = (e: MouseEvent) => {
        const a = (e.target as HTMLElement)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null
        if (!a) return
        const id = a.getAttribute('href')!.slice(1)
        const destino = document.getElementById(id)
        if (!destino) return
        e.preventDefault()
        lenis?.scrollTo(destino, { offset: -70 })
      }
      document.addEventListener('click', alClic)
      ;(lenis as unknown as { _alClic: typeof alClic })._alClic = alClic
    })

    return () => {
      vivo = false
      cancelAnimationFrame(cuadro)
      const l = lenis as unknown as { _alClic?: (e: MouseEvent) => void } | null
      if (l?._alClic) document.removeEventListener('click', l._alClic)
      lenis?.destroy()
      document.documentElement.classList.add('sin-lenis')
    }
  }, [])
}

/* ── Red de seguridad para los revelados ──────────────────────────────────
 *
 * `IntersectionObserver` avisa cuando un elemento CRUZA el umbral. Si el
 * usuario SALTA por encima de él —pulsa una entrada del menú, llega con un
 * enlace con ancla, o el desplazamiento suave está desactivado— el elemento
 * pasa de «debajo de la ventana» a «encima de la ventana» sin que haya un
 * solo fotograma en el que intersecte, así que el aviso no llega nunca.
 *
 * Consecuencia real: 21 de 35 elementos se quedaban con `opacity: 0` para
 * siempre. Contenido invisible, no una animación que falta.
 *
 * Esto lo resuelve con UN solo oyente de scroll compartido, no uno por
 * elemento, que con 35 elementos provocaría recálculos de maquetación en
 * cada fotograma. */
type Aviso = () => void
const enEspera = new Set<Aviso>()
let cuadroRevision = 0

function revisarTodos() {
  cuadroRevision = 0
  for (const avisar of [...enEspera]) avisar()
}

function programarRevision() {
  if (cuadroRevision) return
  cuadroRevision = requestAnimationFrame(revisarTodos)
}

function registrar(avisar: Aviso) {
  if (enEspera.size === 0 && typeof window !== 'undefined') {
    window.addEventListener('scroll', programarRevision, { passive: true })
    window.addEventListener('resize', programarRevision, { passive: true })
  }
  enEspera.add(avisar)
}

function olvidar(avisar: Aviso) {
  enEspera.delete(avisar)
  if (enEspera.size === 0 && typeof window !== 'undefined') {
    window.removeEventListener('scroll', programarRevision)
    window.removeEventListener('resize', programarRevision)
    cancelAnimationFrame(cuadroRevision)
    cuadroRevision = 0
  }
}

/** Revela un elemento cuando entra en pantalla —o cuando ya se ha pasado. */
export function useEnVista<T extends HTMLElement>(margen = '0px 0px -10% 0px') {
  const ref = useRef<T>(null)
  const [dentro, setDentro] = useState(false)

  useEffect(() => {
    const nodo = ref.current
    if (!nodo) return
    if (typeof IntersectionObserver === 'undefined') {
      setDentro(true)
      return
    }

    let listo = false
    const marcar = () => {
      if (listo) return
      listo = true
      setDentro(true)
      obs.disconnect()
      olvidar(comprobar)
    }

    /** Ha entrado por abajo, o ya quedó por encima: en los dos casos se ve. */
    const comprobar = () => {
      const r = nodo.getBoundingClientRect()
      if (r.top < window.innerHeight * 0.92 || r.bottom < 0) marcar()
    }

    const obs = new IntersectionObserver(
      ([e]) => {
        // `boundingClientRect.bottom < 0` cubre el aviso inicial de un
        // elemento que ya nace por encima de la ventana.
        if (e.isIntersecting || e.boundingClientRect.bottom < 0) marcar()
      },
      /* threshold 0, no 0.06: un elemento más alto que la ventana nunca llega
         a un 6 % de intersección y se quedaría invisible para siempre. */
      { rootMargin: margen, threshold: 0 },
    )
    obs.observe(nodo)

    comprobar()                     // por si ya está visible al montar
    if (!listo) registrar(comprobar)

    return () => {
      obs.disconnect()
      olvidar(comprobar)
    }
  }, [margen])

  return { ref, dentro }
}

/** Cuenta de 0 a `hasta` cuando se activa. */
export function useContador(hasta: number, activo: boolean, ms = 1500) {
  const [valor, setValor] = useState(activo ? hasta : 0)

  useEffect(() => {
    if (!activo) return
    if (quieto()) {
      setValor(hasta)
      return
    }
    let id = 0
    const inicio = performance.now()
    const paso = (ahora: number) => {
      const t = Math.min(1, (ahora - inicio) / ms)
      setValor(Math.round(hasta * (1 - Math.pow(1 - t, 3))))
      if (t < 1) id = requestAnimationFrame(paso)
    }
    id = requestAnimationFrame(paso)
    return () => cancelAnimationFrame(id)
  }, [hasta, activo, ms])

  return valor
}

/**
 * Inclinación 3D al pasar el cursor. Devuelve las props a esparcir sobre el
 * elemento; escribe variables CSS en vez de re-renderizar.
 */
export function useInclinacion(intensidad = 9) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const nodo = ref.current
    if (!nodo || quieto()) return
    if (window.matchMedia('(hover: none)').matches) return

    let cuadro = 0
    const alMover = (e: PointerEvent) => {
      cancelAnimationFrame(cuadro)
      cuadro = requestAnimationFrame(() => {
        const r = nodo.getBoundingClientRect()
        const x = (e.clientX - r.left) / r.width - 0.5
        const y = (e.clientY - r.top) / r.height - 0.5
        nodo.style.setProperty('--rx', `${(-y * intensidad).toFixed(2)}deg`)
        nodo.style.setProperty('--ry', `${(x * intensidad).toFixed(2)}deg`)
        nodo.style.setProperty('--mx', `${(x * 100 + 50).toFixed(1)}%`)
        nodo.style.setProperty('--my', `${(y * 100 + 50).toFixed(1)}%`)
      })
    }
    const alSalir = () => {
      cancelAnimationFrame(cuadro)
      nodo.style.setProperty('--rx', '0deg')
      nodo.style.setProperty('--ry', '0deg')
    }

    nodo.addEventListener('pointermove', alMover)
    nodo.addEventListener('pointerleave', alSalir)
    return () => {
      cancelAnimationFrame(cuadro)
      nodo.removeEventListener('pointermove', alMover)
      nodo.removeEventListener('pointerleave', alSalir)
    }
  }, [intensidad])

  return ref
}

/** Botón magnético: se acerca levemente al cursor. */
export function useMagnetico(fuerza = 0.22) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null)

  useEffect(() => {
    const nodo = ref.current
    if (!nodo || quieto()) return
    if (window.matchMedia('(hover: none)').matches) return

    let cuadro = 0
    const alMover = (e: PointerEvent) => {
      cancelAnimationFrame(cuadro)
      cuadro = requestAnimationFrame(() => {
        const r = nodo.getBoundingClientRect()
        const dx = (e.clientX - (r.left + r.width / 2)) * fuerza
        const dy = (e.clientY - (r.top + r.height / 2)) * fuerza
        nodo.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`
      })
    }
    const alSalir = () => {
      cancelAnimationFrame(cuadro)
      nodo.style.transform = ''
    }

    nodo.addEventListener('pointermove', alMover)
    nodo.addEventListener('pointerleave', alSalir)
    return () => {
      cancelAnimationFrame(cuadro)
      nodo.removeEventListener('pointermove', alMover)
      nodo.removeEventListener('pointerleave', alSalir)
    }
  }, [fuerza])

  return ref
}
