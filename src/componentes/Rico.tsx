/**
 * Convierte `**negritas**` y `` `código` `` del texto plano a marcado.
 *
 * Los textos viven en `datos/ui.ts` como cadenas, para poder traducirlos sin
 * duplicar el JSX de cada sección. Esto los devuelve a marcado al pintarlos.
 */
export default function Rico({ texto }: { texto: string }) {
  const trozos = texto.split(/(\*\*[^*]+\*\*|`[^`]+`)/g)
  return (
    <>
      {trozos.map((t, i) => {
        if (t.startsWith('**') && t.endsWith('**')) return <b key={i}>{t.slice(2, -2)}</b>
        if (t.startsWith('`') && t.endsWith('`')) return <code key={i}>{t.slice(1, -1)}</code>
        return <span key={i}>{t}</span>
      })}
    </>
  )
}
