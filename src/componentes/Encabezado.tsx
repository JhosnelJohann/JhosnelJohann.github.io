import { useEffect, useRef } from 'react'
import { perfil, cifras } from '../datos/perfil'
import { montarShader } from '../efectos/shader'
import { useEnVista, useMagnetico } from '../efectos/movimiento'
import { Letras, Palabras, Rodillo } from './Texto'
import { Marca3D, IconoLinea, type Marca } from './Iconos'
import './Encabezado.css'

/* A cada cifra le corresponde una marca 3D. No es adorno: el objeto dice
   de qué habla el dato. */
const MARCA_DE: (Marca | null)[] = ['lente', 'terminal', 'datos', 'grafo']
const COLOR_DE = ['amarillo', 'azul', 'gris', 'verde']

function Boton({
  href,
  children,
  clase,
  externo,
}: {
  href: string
  children: React.ReactNode
  clase: string
  externo?: boolean
}) {
  const ref = useMagnetico(0.2)
  return (
    <a
      ref={ref}
      className={clase}
      href={href}
      {...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  )
}

export default function Encabezado() {
  const lienzo = useRef<HTMLCanvasElement>(null)
  const { ref: refBento, dentro } = useEnVista<HTMLUListElement>()

  useEffect(() => {
    if (!lienzo.current) return
    const s = montarShader(lienzo.current)
    return () => s?.destruir()
  }, [])

  return (
    <header className="enc oscuro" id="inicio">
      <canvas ref={lienzo} className="enc-shader" aria-hidden="true" />
      <div className="enc-velo" aria-hidden="true" />

      <div className="env enc-env">
        <div className="enc-fila">
          <figure className="enc-foto">
            <span className="enc-aro" aria-hidden="true" />
            <img src="foto.jpg" alt="Jhosnel Laya" width={640} height={640} fetchPriority="high" />
          </figure>

          <div className="enc-texto">
            <p className="mono enc-estado">
              <span className="enc-punto" aria-hidden="true" />
              Disponible para nuevos proyectos
            </p>

            {/* El nombre entra letra a letra. El apellido NO: lleva degradado
                recortado a texto, y un hijo animado con `filter` rompe el
                recorte. Se anima el bloque entero. */}
            <h1 className="enc-nombre">
              <Letras texto="Jhosnel" retardo={0.1} />
              <br />
              <span className="enc-apellido">Laya</span>
            </h1>

            <p className="enc-rol">
              <span className="enc-rol-1">{perfil.rolLinea1}</span>
              <span className="enc-barra" aria-hidden="true">/</span>
              <span className="enc-rol-2">{perfil.rolLinea2}</span>
            </p>

            <p className="mono enc-sub">{perfil.subtitulo}</p>

            <dl className="enc-datos">
              <div>
                <dt className="mono">Ubicación</dt>
                <dd>{perfil.ubicacion}</dd>
              </div>
              <div>
                <dt className="mono">Modalidad</dt>
                <dd>{perfil.disponibilidad}</dd>
              </div>
              <div>
                <dt className="mono">Experiencia</dt>
                <dd>Desde {perfil.experienciaDesde} · siete años</dd>
              </div>
            </dl>

            <div className="enc-acciones">
              <Boton clase="btn btn-primario" href={`https://wa.me/${perfil.telefonoWhatsApp}`} externo>
                <IconoLinea tipo="chispa" tam={16} latir={false} />
                WhatsApp · {perfil.telefono}
              </Boton>
              <Boton clase="btn btn-borde" href="#experiencia">
                Ver mi experiencia
              </Boton>
              <Boton clase="btn btn-borde" href={`https://instagram.com/${perfil.instagram}`} externo>
                @{perfil.instagram}
              </Boton>
            </div>
          </div>
        </div>

        <div className="enc-perfil">
          <Palabras texto={perfil.resumen} className="enc-resumen" />
          <p className="enc-metodo">
            <IconoLinea tipo="escudo" tam={20} />
            <span>{perfil.metodo}</span>
          </p>
        </div>

        {/* Bento: celdas de tamaños distintos, no una tira uniforme */}
        <ul className="bento" ref={refBento}>
          {cifras.map((c, i) => (
            <li
              key={c.que}
              className={`bento-celda vidrio borde-vivo foco b-${i} c-${COLOR_DE[i]}`}
              style={{ transitionDelay: `${i * 90}ms` }}
              data-dentro={dentro || undefined}
            >
              {MARCA_DE[i] && (
                <div className="bento-marca">
                  <Marca3D tipo={MARCA_DE[i]!} color={COLOR_DE[i]} />
                </div>
              )}
              <p className="bento-n mono">
                <Rodillo valor={c.n} />
                {'de' in c && c.de && <small>{c.de}</small>}
              </p>
              <p className="bento-que">{c.que}</p>
              {c.desde && <p className="mono bento-desde">{c.desde}</p>}
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
