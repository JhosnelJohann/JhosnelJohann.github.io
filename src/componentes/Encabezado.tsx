import { perfil, cifras } from '../datos/perfil'
import './Encabezado.css'

export default function Encabezado() {
  return (
    <header className="enc" id="inicio">
      <div className="env">
        <div className="enc-fila">
          <figure className="enc-foto">
            <img src="foto.jpg" alt="Jhosnel Laya" width={640} height={640} fetchPriority="high" />
          </figure>

          <div className="enc-texto">
            <p className="enc-estado mono">
              <span className="enc-punto" aria-hidden="true" />
              Disponible para nuevos proyectos
            </p>

            <h1 className="enc-nombre">Jhosnel Laya</h1>
            <p className="enc-rol">{perfil.rol}</p>
            <p className="enc-sub mono">{perfil.subtitulo}</p>

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
              <a
                className="btn btn-primario"
                href={`https://wa.me/${perfil.telefonoWhatsApp}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp · {perfil.telefono}
              </a>
              <a className="btn btn-borde" href="#experiencia">
                Ver mi experiencia
              </a>
              <a
                className="btn btn-borde"
                href={`https://instagram.com/${perfil.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                @{perfil.instagram}
              </a>
            </div>
          </div>
        </div>

        <div className="enc-perfil">
          <p className="enc-resumen">{perfil.resumen}</p>
          <p className="enc-metodo">{perfil.metodo}</p>
        </div>

        <ul className="enc-cifras">
          {cifras.map((c) => (
            <li key={c.que}>
              <p className="enc-n mono">
                {c.n}
                {'de' in c && c.de && <small>{c.de}</small>}
              </p>
              <p className="enc-que">{c.que}</p>
              {c.desde && <p className="enc-desde mono">{c.desde}</p>}
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
