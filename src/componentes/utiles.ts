import { useEffect, useRef, useState } from 'react'

/** Revela un elemento cuando entra en pantalla. Una sola vez. */
export function useEnVista<T extends HTMLElement>(margen = '0px 0px -12% 0px') {
  const ref = useRef<T>(null)
  const [dentro, setDentro] = useState(false)

  useEffect(() => {
    const nodo = ref.current
    if (!nodo) return
    if (typeof IntersectionObserver === 'undefined') {
      setDentro(true)
      return
    }
    const obs = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setDentro(true)
          obs.disconnect()
        }
      },
      { rootMargin: margen, threshold: 0.08 },
    )
    obs.observe(nodo)
    return () => obs.disconnect()
  }, [margen])

  return { ref, dentro }
}

export function sinMovimiento() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/** Cuenta de 0 a `hasta` cuando el elemento entra en pantalla. */
export function useContador(hasta: number, activo: boolean, ms = 1600) {
  const [valor, setValor] = useState(activo ? hasta : 0)

  useEffect(() => {
    if (!activo) return
    if (sinMovimiento()) {
      setValor(hasta)
      return
    }
    let bruto = 0
    const inicio = performance.now()
    const paso = (ahora: number) => {
      const t = Math.min(1, (ahora - inicio) / ms)
      // salida suave: rápido al principio, se asienta al final
      const suave = 1 - Math.pow(1 - t, 3)
      setValor(Math.round(hasta * suave))
      if (t < 1) bruto = requestAnimationFrame(paso)
    }
    bruto = requestAnimationFrame(paso)
    return () => cancelAnimationFrame(bruto)
  }, [hasta, activo, ms])

  return valor
}

export const claseColor = (c: string) => `t-${c}`
